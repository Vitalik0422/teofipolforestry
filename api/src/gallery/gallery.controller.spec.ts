import {Test, TestingModule} from '@nestjs/testing';
import {GalleryController} from './gallery.controller.js';
import {GalleryService} from './gallery.service.js';
import {PrismaService} from '../prisma/prisma.service.js';
import {CloudinaryService} from '../cloudinary/cloudinary.service.js';

describe('GalleryController', () => {
  let controller: GalleryController;

  beforeEach(async () => {
    const prismaMock = {
      image: {
        createMany: vi.fn(),
        findMany: vi.fn(),
      },
    };
    const cloudinaryMock = {
      cloudinaryService: {
        uploadFiles: vi.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GalleryController],
      providers: [
        GalleryService,
        {provide: PrismaService, useValue: prismaMock},
        {provide: CloudinaryService, useValue: cloudinaryMock},
      ],
    }).compile();

    controller = module.get<GalleryController>(GalleryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
