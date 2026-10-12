import {NestFactory} from '@nestjs/core';
import {AppModule, ObserveInstrument} from './app.module.js';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });
  app.use(cookieParser());
  app.enableCors({
    origin: [
      'https://teofipolforestry-client-tau.vercel.app',
      'http://192.168.0.102:3000',
      'http://192.168.100.135:3000',
    ],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3001);
}
await bootstrap();
