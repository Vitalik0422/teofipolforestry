import { Injectable } from '@nestjs/common'
import { CreateGalleryDto } from './dto/create-gallery.dto.js'
import { UpdateGalleryDto } from './dto/update-gallery.dto.js'

@Injectable()
export class GalleryService {
  create(files: Express.Multer.File[]) {
    return 'This action adds a new gallery'
  }

  findAll() {
    return `This action returns all gallery`
  }

  findOne(id: number) {
    return `This action returns a #${id} gallery`
  }

  update(id: number, updateGalleryDto: UpdateGalleryDto) {
    return `This action updates a #${id} gallery`
  }

  remove(id: number) {
    return `This action removes a #${id} gallery`
  }
}
