import {Controller, Get, Post, Body, Res, UseGuards, Req} from '@nestjs/common';
import {AuthService} from './auth.service.js';
import {CreateAuthDto} from './dto/create-auth.dto.js';
import type {Request, Response} from 'express';
import {JwtAuthGuard} from './guard/auth.guard.js';
import type {JwtPayload} from './token/types.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(
    @Body() createAuthDto: CreateAuthDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.authService.login(createAuthDto, res);
  }
  @Post('/refresh')
  async refresh(@Req() req: Request, @Res({passthrough: true}) res: Response) {
    await this.authService.refresh(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/session')
  checkSession(@Req() req: Request & {user: JwtPayload}) {
    const {id, login} = req.user;
    return {user: {id, login}};
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.logout(id)
  // }
}
