import {Injectable} from '@nestjs/common';
import {CreateAuthDto} from '../dto/create-auth.dto.js';
import {JwtService} from '@nestjs/jwt';
import {PublicUserDto} from '../dto/login-auth.dto.js';

export interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}
  async generateAccessToken(user: PublicUserDto) {
    const accessToken = await this.jwtService.signAsync(user, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });
    return accessToken;
  }
  async generateRefreshToken(user: PublicUserDto) {
    const refreshToken = await this.jwtService.signAsync(user, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });
    return refreshToken;
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    const verifyRefreshToken = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });
    return verifyRefreshToken;
  }
  async verifyAccessToken(token: string): Promise<JwtPayload> {
    const verifyAccessToken = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_ACCESS_SECRET,
    });
    return verifyAccessToken;
  }
}
