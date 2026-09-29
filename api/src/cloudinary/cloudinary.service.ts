import { Injectable } from '@nestjs/common'
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'
import streamifier from 'streamifier'

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File, folder = 'uploads'): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder, resource_type: 'image' },
        (error?: UploadApiErrorResponse, result?: UploadApiResponse) => {
          if (error || !result) return reject(error)
          resolve(result)
        },
      )

      streamifier.createReadStream(file.buffer).pipe(uploadStream)
    })
  }

  uploadFiles(files: Express.Multer.File[], folder?: string) {
    return Promise.all(files.map((file) => this.uploadFile(file, folder)))
  }
}
