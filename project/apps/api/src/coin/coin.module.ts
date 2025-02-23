import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coin } from './model/coin.model';

@Module({
  providers: [CoinService],
  exports:[CoinService],
  imports:[FirebaseModule,TypeOrmModule.forFeature([Coin]),]
})
export class CoinModule {}
