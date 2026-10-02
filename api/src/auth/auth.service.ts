import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateAuthDto } from './dto/create-auth.dto.js'
import { UpdateAuthDto } from './dto/update-auth.dto.js'
import { PrismaService } from '../prisma/prisma.service.js'
import bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async register(createAuthDto: CreateAuthDto) {
    const userIsExist = await this.prismaService.auth.findFirst({
      where: {
        userName: createAuthDto.userName,
      },
    })

    if (userIsExist) throw new ConflictException()

    const hashedPassword = await bcrypt.hash(createAuthDto.password, 10)
    await this.prismaService.auth.create({
      data: {
        ...createAuthDto,
        password: hashedPassword,
      },
    })

    return 'This action adds a new user'
  }

  async login(createAuthDto: CreateAuthDto, res: Response) {
    const userIsExist = await this.prismaService.auth.findFirst({
      where: {
        userName: createAuthDto.userName,
      },
    })
    if (!userIsExist) throw new UnauthorizedException('Не вірний логін або пароль')
    const checkPassword = await bcrypt.compare(createAuthDto.password, userIsExist.password)
    if (!checkPassword) throw new UnauthorizedException('Не вірний логін або пароль')
  }
}
