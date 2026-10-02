import { Module } from '@nestjs/common'
import { AuthService } from './auth.service.js'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller.js'

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [JwtModule.register({})],
})
export class AuthModule {}
