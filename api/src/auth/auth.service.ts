import {
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
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken)
      throw new UnauthorizedException('Користувач не авторизований');
    let verifiedToken;
    try {
      verifiedToken = await this.tokenService.verifyRefreshToken(refreshToken);
    } catch {
      throw new UnauthorizedException('Користувач не авторизований');
    }

    if (!verifiedToken)
      throw new UnauthorizedException('Користувач не авторизований');
    const storedToken = await this.prismaService.refreshToken.findUnique({
      where: {
        token: refreshToken,
      },
    });

    if (!storedToken || storedToken.authId !== verifiedToken.id)
      throw new UnauthorizedException('Користувач не авторизований');

    const {id, login} = verifiedToken;

    const newRefreshToken = await this.tokenService.generateRefreshToken({
      id,
      login,
    });
    const newAccessToken = await this.tokenService.generateAccessToken({
      id,
      login,
    });
    await this.prismaService.refreshToken.update({
      where: {token: refreshToken},
      data: {
        token: newRefreshToken,
      },
    });
    await this.cookieService.setJwtCookie(res, newRefreshToken, newAccessToken);
  }
}
