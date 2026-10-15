import { Test, TestingModule } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './guard/auth.guard.js';

describe('AuthController', () => {
  let controller: AuthController;
  let app: INestApplication;
  const authService = { login: vi.fn(), refresh: vi.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app?.close();
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('does not expose public registration', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ login: 'new-user', password: 'test-password' })
      .expect(404);
  });

  it('still accepts login requests', async () => {
    const credentials = { login: 'existing-user', password: 'test-password' };
    await request(app.getHttpServer())
      .post('/auth/login')
      .send(credentials)
      .expect(201);
    expect(authService.login).toHaveBeenCalledWith(credentials, expect.anything());
  });
});
