import {Test, TestingModule} from '@nestjs/testing';
import {GalleryService} from './gallery.service.js';
import {PrismaService} from '../prisma/prisma.service.js';
import {CloudinaryService} from '../cloudinary/cloudinary.service.js';

describe('GalleryService', () => {
  let service: GalleryService;

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
      providers: [
        GalleryService,
        {provide: PrismaService, useValue: prismaMock},
        {provide: CloudinaryService, useValue: cloudinaryMock},
      ],
    }).compile();

    service = module.get<GalleryService>(GalleryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
