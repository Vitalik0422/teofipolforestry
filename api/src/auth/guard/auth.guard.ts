import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {JwtPayload, TokenService} from '../token/token.service.js';
import {Request} from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = await this.extractToken(request);

    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.tokenService.verifyAccessToken(token);
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  async extractToken(request: Request): Promise<string | undefined> {
    if (request.cookies?.access_token) return request.cookies.access_token;

    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
