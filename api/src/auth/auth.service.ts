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
import {Response} from 'express';

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
    await this.cookieService.setAccessTokenCookie(res, access);
    await this.cookieService.setRefreshTokenCookie(res, refresh);
  }

  async refresh(res: Response) {}
}
