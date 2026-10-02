import { Injectable } from '@nestjs/common'
import { Response } from 'express'

@Injectable()
export class CookieService {
  async setRefreshTokenCookie(res: Response, token: string) {
    res.cookie('refreshToken', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
  }
  async setAccessTokenCookie(res: Response, token: string) {
    res.cookie('accessToken', token, {
      maxAge: 15 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    })
  }
  async clearRefreshTokenCookie(res: Response) {
    res.cookie('refreshToken', undefined)
  }

  async clearAccessTokenCookie(res: Response) {
    res.cookie('refreshToken', undefined)
  }
}
