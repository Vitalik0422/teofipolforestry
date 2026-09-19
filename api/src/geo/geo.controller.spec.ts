import { Test, TestingModule } from '@nestjs/testing';
import { GeoController } from './geo.controller.js';
import { GeoService } from './geo.service.js';

describe('GeoController', () => {
  let controller: GeoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeoController],
      providers: [GeoService],
    }).compile();

    controller = module.get<GeoController>(GeoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
