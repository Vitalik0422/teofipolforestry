import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { GeoModule } from './geo/geo.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { GalleryModule } from './gallery/gallery.module.js';
import { CloudinaryModule } from './cloudinary/cloudinary.module.js';
import { AuthGateway } from './auth/auth.gateway.js';
import { AuthModule } from './auth/auth.module.js';

export const { ObserveModule, ObserveInstrument } = createObserveModule();

@Module({
  imports: [
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    ObserveModule.forRoot({
      appKey: 'YOUR_APP_KEY',
      appSecret: 'YOUR_APP_SECRET',
      serviceId: 'api',
    }),
    PrismaModule,
    GeoModule,
    GalleryModule,
    CloudinaryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthGateway],
})
export class AppModule {}
