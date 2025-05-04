import { Test, TestingModule } from '@nestjs/testing';
import { RefrralController } from './refrral.controller';

describe('RefrralController', () => {
  let controller: RefrralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RefrralController],
    }).compile();

    controller = module.get<RefrralController>(RefrralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
