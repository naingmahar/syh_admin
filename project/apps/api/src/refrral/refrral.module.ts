import { Module } from '@nestjs/common';
import { RefrralController } from './refrral.controller';
import { RefrralService } from './refrral.service';

@Module({
  controllers: [RefrralController],
  providers: [RefrralService]
})
export class RefrralModule {}
