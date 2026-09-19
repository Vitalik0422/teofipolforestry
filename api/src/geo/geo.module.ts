import { Module } from '@nestjs/common';
import { GeoService } from './geo.service.js';
import { GeoController } from './geo.controller.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({
  controllers: [GeoController],
  providers: [GeoService],
})
export class GeoModule {}
