import { Injectable } from '@nestjs/common'
import { CreateAuthDto } from '../dto/create-auth.dto.js'
import { JwtService } from '@nestjs/jwt'

export interface JwtPayload {
  sub: number
  email: string
}

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}
  async generateAccessToken(user: CreateAuthDto) {
    const accessToken = await this.jwtService.signAsync(user, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    })
    return accessToken
  }
  async generateRefreshToken(user: CreateAuthDto) {
    const refreshToken = await this.jwtService.signAsync(user, {
      secret: process.env.JWT_REFRESH_SECRET,
    })
    return refreshToken
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    const verifyRefreshToken = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    })
    return verifyRefreshToken
  }
}
