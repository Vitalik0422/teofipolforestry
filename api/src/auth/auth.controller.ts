import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common'
import { AuthService } from './auth.service.js'
import { CreateAuthDto } from './dto/create-auth.dto.js'
import { UpdateAuthDto } from './dto/update-auth.dto.js'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto)
  }

  @Post()
  login(@Body() createAuthDto: CreateAuthDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(createAuthDto, res)
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.logout(id)
  // }
}
