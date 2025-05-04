import { Test, TestingModule } from '@nestjs/testing';
import { RefrralService } from './refrral.service';

describe('RefrralService', () => {
  let service: RefrralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefrralService],
    }).compile();

    service = module.get<RefrralService>(RefrralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
