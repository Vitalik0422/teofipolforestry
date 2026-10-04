import {Test, TestingModule} from '@nestjs/testing';
import {GeoService} from './geo.service.js';
import {PrismaService} from '../prisma/prisma.service.js';

describe('GeoService', () => {
  let service: GeoService;

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
      providers: [GeoService, {provide: PrismaService, useValue: prismaMock}],
    }).compile();

    service = module.get<GeoService>(GeoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
