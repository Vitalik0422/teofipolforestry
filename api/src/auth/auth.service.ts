import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {CreateAuthDto} from './dto/create-auth.dto.js';
import {PrismaService} from '../prisma/prisma.service.js';
import bcrypt from 'bcrypt';
import {TokenService} from './token/token.service.js';
import {CookieService} from './cookies/cookie.service.js';
import {Request, Response} from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
    private readonly cookieService: CookieService,
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    if (!createAuthDto?.login || !createAuthDto?.password) {
      throw new BadRequestException('Username and password are required');
    }
    const userIsExist = await this.prismaService.auth.findFirst({
      where: {
        login: createAuthDto.login,
      },
    });

    if (userIsExist) throw new ConflictException();

    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);
    await this.prismaService.auth.create({
      data: {
        ...createAuthDto,
        password: hashedPassword,
      },
      select: {id: true, login: true, password: true},
    });

    return {message: 'Користувача успішно створено'};
  }

  async login(createAuthDto: CreateAuthDto, res: Response) {
    const userIsExist = await this.prismaService.auth.findFirst({
      where: {
        login: createAuthDto.login,
      },
    });
    if (!userIsExist)
      throw new NotFoundException('Такого користувача не існує');
    const checkPassword = await bcrypt.compare(
      createAuthDto.password,
      userIsExist.password,
    );
    if (!checkPassword)
      throw new UnauthorizedException('Не вірний логін або пароль');
    const {password, ...safeUser} = userIsExist;
    const access = await this.tokenService.generateAccessToken(safeUser);
    const refresh = await this.tokenService.generateRefreshToken(safeUser);

    await this.prismaService.auth.update({
      where: {id: userIsExist.id},
      data: {
        refreshTokens: {
          create: {token: refresh},
        },
      },
    });
    await this.cookieService.setJwtCookie(res, refresh, access);
  }

  async refresh(req: Request, res: Response) {
    const {refreshToken} = await req.cookies;
    if (!refreshToken)
      throw new UnauthorizedException('Користувач не авторизований');
    const verifiedToken =
      await this.tokenService.verifyRefreshToken(refreshToken);

    if (!verifiedToken)
      throw new UnauthorizedException('Користувач не авторизований');
    this.cookieService.clearJwtCookie(res);
    await this.prismaService.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });

    const {id, login} = verifiedToken;

    const newRefreshToken = await this.tokenService.generateRefreshToken({
      id,
      login,
    });
    const newAccessToken = await this.tokenService.generateAccessToken({
      id,
      login,
    });
    await this.prismaService.auth.update({
      where: {id: id},
      data: {
        refreshTokens: {
          create: {
            token: refreshToken,
          },
        },
      },
    });
    this.cookieService.setJwtCookie(res, newAccessToken, newRefreshToken);
  }
}
