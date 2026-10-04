import {Test, TestingModule} from '@nestjs/testing';
import {GeoController} from './geo.controller.js';
import {GeoService} from './geo.service.js';
import {PrismaService} from '../prisma/prisma.service.js';

describe('GeoController', () => {
  let controller: GeoController;

  beforeEach(async () => {
    const prismaMock = {
      kV: {
        findFirst: vi.fn(),
        create: vi.fn(),
        findMany: vi.fn(),
        update: vi.fn(),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoController],
      providers: [GeoService, {provide: PrismaService, useValue: prismaMock}],
    }).compile();

    controller = module.get<GeoController>(GeoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
