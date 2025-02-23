import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './model/history.model';
import { Repository } from 'typeorm';
import { CreatHistoryDto } from './dto/history.dto';
import { CoinService } from 'src/coin/coin.service';
import * as moment from 'moment';

@Injectable()
export class HistoryService {
    constructor(
        @InjectRepository(History)
        private historyRepository: Repository<History>,
        private readonly coinService:CoinService,
      ) {}
    
      findAll(): Promise<History[]> {
        return this.historyRepository.find();
      }

      async getViewCountByDate(user:string): Promise<{view:number}> {
        const count = await this.historyRepository.count({where:{user,date:this.getCurrentDate()}});
        return {view:count}
      }
    
      findById(id: number): Promise<History | null> {
        return this.historyRepository.findOneBy({ id });
      }

      private getCurrentDate(){
        return moment().format("DD-MM-YYYY")
      }
    
      async createHistory(history:CreatHistoryDto,user:string){
        try {
          await this.coinService.update(history.coin,user,this.getCurrentDate())
          await this.historyRepository.save({coin:history.coin,quiz:history.quiz,user:user,date: this.getCurrentDate()});
        } catch (error) {
          console.log("HISTORY ERROR",error)
        }
      }
    
    
      async findOne(user: string): Promise<History | undefined> {
        let data = await this.historyRepository.find({
          where:{user}
        }) 
        return data[0] || undefined
      }

      async findLastRecord(user: String): Promise<History | undefined> {
        let data = await this.historyRepository.find({
          where:{user:user.toString()},
          order:{id:"DESC"},
          take:1
        }) 
        return data[0] || undefined
      }
}
