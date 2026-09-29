import { Module } from '@nestjs/common'
import { GalleryService } from './gallery.service.js'
import { GalleryController } from './gallery.controller.js'
import { CloudinaryModule } from '../cloudinary/cloudinary.module.js'

@Module({
  controllers: [GalleryController],
  providers: [GalleryService],
  imports: [CloudinaryModule],
})
export class GalleryModule {}
