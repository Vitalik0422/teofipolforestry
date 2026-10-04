import {ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {TokenService} from '../token/token.service.js';
import {JwtAuthGuard} from './auth.guard.js';

describe('authGuard', () => {
  let guard: JwtAuthGuard;
  const user = {
    id: 1,
    user: '1@1.@mail',
  };
  const tokenService = {verifyAccessToken: vi.fn()};
  const makeContext = (req: object) =>
    ({
      getHandler: () => ({}), // 1
      getClass: () => ({}), // 2
      switchToHttp: () => ({getRequest: () => req}), // 3
    }) as unknown as ExecutionContext;

  beforeEach(async () => {
    vi.resetAllMocks();
    guard = new JwtAuthGuard(tokenService as any);
  });

  it('перевірка на на 401', async () => {
    await expect(guard.canActivate(makeContext({headers: {}}))).rejects.toThrow(
      UnauthorizedException,
    );
  });
  it('кидає 401 при невалідному токені', async () => {
    tokenService.verifyAccessToken.mockRejectedValue(new Error('bad'));
    const req = {headers: {authorization: 'Bearer bad'}};
    await expect(guard.canActivate(makeContext(req))).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('перевіряє токен і ложить user в request', async () => {
    tokenService.verifyAccessToken.mockResolvedValue(user);

    const req: any = {headers: {authorization: 'Bearer good'}};

    await expect(guard.canActivate(makeContext(req))).resolves.toBe(true);
    expect(tokenService.verifyAccessToken).toHaveBeenCalledWith('good');
    expect(req.user).toEqual(user);
  });

  it('бере  токен з кукісів ', async () => {
    tokenService.verifyAccessToken.mockResolvedValue(user);
    const req: any = {headers: {}, cookies: {access_token: 'from-cookie'}};
    await expect(guard.canActivate(makeContext(req))).resolves.toBe(true);
    expect(tokenService.verifyAccessToken).toHaveBeenCalledWith('from-cookie');
  });
});
