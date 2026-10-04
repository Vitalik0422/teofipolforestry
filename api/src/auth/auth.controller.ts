import {Controller, Post, Body, Res, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service.js';
import {CreateAuthDto} from './dto/create-auth.dto.js';
import {UpdateAuthDto} from './dto/update-auth.dto.js';
import type {Response} from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(
    @Body() createAuthDto: CreateAuthDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.authService.register(createAuthDto);
  }

  @Post('/login')
  login(
    @Body() createAuthDto: CreateAuthDto,
    @Res({passthrough: true}) res: Response,
  ) {
    return this.authService.login(createAuthDto, res);
  }
  @UseGuards()
  @Post('/refresh')
  refresh(@Res({passthrough: true}) res: Response) {
    return this.authService.refresh(res);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.logout(id)
  // }
}
