import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UploadedFile,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { memoryStorage } from 'multer'
import { GalleryService } from './gallery.service.js'
import { CreateGalleryDto } from './dto/create-gallery.dto.js'
import { UpdateGalleryDto } from './dto/update-gallery.dto.js'

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
          return callback(new Error('Дозволені тільки фото'), false)
        }

        callback(null, true)
      },
    }),
  )
  async create(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files)
    return await this.galleryService.create(files)
  }

  @Get()
  findAll() {
    return this.galleryService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGalleryDto: UpdateGalleryDto) {
    return this.galleryService.update(+id, updateGalleryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(+id)
  }
}
