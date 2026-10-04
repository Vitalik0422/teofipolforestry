import {Test, TestingModule} from '@nestjs/testing';
import {AuthService} from './auth.service.js';
import {PrismaService} from '../prisma/prisma.service.js';
import {create} from 'domain';
import {TokenService} from './token/token.service.js';
import {CookieService} from './cookies/cookie.service.js';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const prismaMock = {
      auth: {
        findFirst: vi.fn(),
        create: vi.fn(),
      },
    };
    const tokenMock = {
      generateAccessToken: vi.fn(),
      generateRefreshToken: vi.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {provide: PrismaService, useValue: prismaMock},
        {provide: TokenService, useValue: tokenMock},
        {provide: CookieService, useValue: () => vi.fn()},
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
