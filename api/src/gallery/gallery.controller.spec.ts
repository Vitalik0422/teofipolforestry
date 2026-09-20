import { Test, TestingModule } from '@nestjs/testing';
import { GalleryController } from './gallery.controller.js';
import { GalleryService } from './gallery.service.js';

describe('GalleryController', () => {
  let controller: GalleryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GalleryController],
      providers: [GalleryService],
    }).compile();

    controller = module.get<GalleryController>(GalleryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
