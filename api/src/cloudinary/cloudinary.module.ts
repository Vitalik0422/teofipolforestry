import { Module } from '@nestjs/common'
import { CloudinaryService } from './cloudinary.service.js'
import { CloudinaryProvider } from './cloudinary/cloudinary.js'

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
