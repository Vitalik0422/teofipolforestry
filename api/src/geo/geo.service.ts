import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateGeoKvDto } from './dto/create-geo.dto.js'
import { UpdateGeoDto } from './dto/update-geo.dto.js'
import { PrismaService } from '../prisma/prisma.service.js'

@Injectable()
export class GeoService {
  constructor(private map: PrismaService) {}
  async createKV(createGeoDto: CreateGeoKvDto) {
    const isExistKv = await this.map.kV.findFirst({
      where: {
        number: createGeoDto.number,
      },
    })

    if (isExistKv) throw new ConflictException(`Квадрат ${createGeoDto.number} вже існує`)

    await this.map.kV.create({
      data: {
        number: createGeoDto.number,
      },
    })

    return 'This action adds a new geo'
  }

  async findAll() {
    const response = await this.map.kV.findMany({
      include: { vidInKv: true },
    })

    return response
  }

  findOne(id: number) {
    return `This action returns a #${id} geo`
  }

  async update(id: string, updateGeoDto: UpdateGeoDto) {
    const isExistVid = await this.map.vid.findFirst({
      where: {
        vid_num: updateGeoDto.vid_num,
        KVId: id,
      },
    })
    if (isExistVid) {
      throw new ConflictException(`Виділ ${updateGeoDto.vid_num} вже існує у цьому квадраті`)
    }
    const response = await this.map.kV.update({
      where: { id },
      data: {
        vidInKv: {
          create: {
            vid_num: updateGeoDto.vid_num!,
            coords: updateGeoDto.coords!,
          },
        },
      },
      include: { vidInKv: true },
    })
    return response
  }

  async removeVid(id: string) {
    const isExistVid = await this.map.vid.findFirst({
      where: { id: id },
    })

    if (!isExistVid) {
      throw new NotFoundException(`Такого виділу не існує`)
    }
    await this.map.vid.delete({ where: { id: id } })

    return `Виділ id-${id} видалено`
  }
}
