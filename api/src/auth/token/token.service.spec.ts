import {JwtModule, JwtService} from '@nestjs/jwt';
import {TokenService} from './token.service.js';
import {Test} from '@nestjs/testing';

describe('TokenService', async () => {
  let jwt: JwtService;
  let service: TokenService;
  const user = {userName: '123@gmail.com', password: '1232112'};

  beforeEach(async () => {
    vi.stubEnv('JWT_ACCESS_SECRET', 'jwt_access_secret');
    vi.stubEnv('JWT_REFRESH_SECRET', 'jwt_refresh_secret');

    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      providers: [TokenService],
    }).compile();

    service = await moduleRef.get(TokenService);
    jwt = await moduleRef.get(JwtService);

    afterEach(() => {
      vi.unstubAllEnvs();
      vi.useRealTimers();
    });
  });

  it('Токен складається з трьох частин', async () => {
    const token = await service.generateAccessToken(user);
    expect(token.split('.')).toHaveLength(3);
  });
});
