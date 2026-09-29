import { Injectable, NotFoundException } from '@nestjs/common'
import { UpdateGalleryDto } from './dto/update-gallery.dto.js'
import { CloudinaryService } from '../cloudinary/cloudinary.service.js'
import { PrismaService } from '../prisma/prisma.service.js'

@Injectable()
export class GalleryService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly prismaService: PrismaService,
  ) {}
  async create(files: Express.Multer.File[]) {
    const uploadImages = await this.cloudinaryService.uploadFiles(files)
    await this.prismaService.image.createMany({
      data: uploadImages.map((image) => ({
        cloudinary_id: image.public_id,
        secure_url: image.secure_url,
      })),
    })
  }

  async findAll() {
    const images = await this.prismaService.image.findMany()

    if (images.length < 1) throw new NotFoundException('Галарея зоображень порожня')
    return images
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
