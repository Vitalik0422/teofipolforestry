import {UnauthorizedException} from '@nestjs/common';
import type {Request, Response} from 'express';
import {AuthService} from './auth.service.js';
import type {PrismaService} from '../prisma/prisma.service.js';
import type {TokenService} from './token/token.service.js';
import type {CookieService} from './cookies/cookie.service.js';

describe('refresh session', () => {
  const user = {id: 'user-id', login: 'staff'};
  const prisma = {refreshToken: {findUnique: vi.fn(), update: vi.fn()}};
  const tokens = {
    verifyRefreshToken: vi.fn(),
    generateRefreshToken: vi.fn(),
    generateAccessToken: vi.fn(),
  };
  const cookies = {setJwtCookie: vi.fn()};
  const service = new AuthService(
    prisma as unknown as PrismaService,
    tokens as unknown as TokenService,
    cookies as unknown as CookieService,
  );
  const req = {cookies: {refreshToken: 'old-refresh'}} as Request;
  const res = {} as Response;

  beforeEach(() => {
    vi.resetAllMocks();
    tokens.verifyRefreshToken.mockResolvedValue(user);
    prisma.refreshToken.findUnique.mockResolvedValue({authId: user.id});
    tokens.generateRefreshToken.mockResolvedValue('new-refresh');
    tokens.generateAccessToken.mockResolvedValue('new-access');
  });

  it('rotates the stored token and sets the correct cookies', async () => {
    await service.refresh(req, res);
    expect(prisma.refreshToken.update).toHaveBeenCalledWith({
      where: {token: 'old-refresh'}, data: {token: 'new-refresh'},
    });
    expect(cookies.setJwtCookie).toHaveBeenCalledWith(res, 'new-refresh', 'new-access');
  });

  it('rejects missing cookies', async () => {
    await expect(service.refresh({} as Request, res)).rejects.toThrow(UnauthorizedException);
  });

  it('rejects invalid tokens', async () => {
    tokens.verifyRefreshToken.mockRejectedValue(new Error('expired'));
    await expect(service.refresh(req, res)).rejects.toThrow(UnauthorizedException);
  });

  it('rejects revoked tokens without setting cookies', async () => {
    prisma.refreshToken.findUnique.mockResolvedValue(null);
    await expect(service.refresh(req, res)).rejects.toThrow(UnauthorizedException);
    expect(cookies.setJwtCookie).not.toHaveBeenCalled();
  });
});
