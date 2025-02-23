import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './model/history.model';
import { CoinModule } from 'src/coin/coin.module';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  imports:[TypeOrmModule.forFeature([History]),CoinModule],
  exports:[HistoryService],
})
export class HistoryModule {}
