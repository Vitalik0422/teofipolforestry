import {Module} from '@nestjs/common';
import {AuthService} from './auth.service.js';
import {JwtModule} from '@nestjs/jwt';
import {AuthController} from './auth.controller.js';
import {TokenService} from './token/token.service.js';
import {CookieService} from './cookies/cookie.service.js';

@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService, CookieService],
  imports: [JwtModule.register({})],
  exports: [AuthService],
})
export class AuthModule {}
