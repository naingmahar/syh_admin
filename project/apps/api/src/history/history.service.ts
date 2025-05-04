import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { History } from './model/history.model';
import { Repository } from 'typeorm';
import { CreatHistoryDto } from './dto/history.dto';
import { CoinService } from 'src/coin/coin.service';
import * as moment from 'moment';
import { groupBy } from 'rxjs';

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

      async getDshboard(user: String,date:string) : Promise<any | undefined> {
        // let data = await this.historyRepository
        //                         .createQueryBuilder()
        //                           .select("Count(date) as value,date as label")
        //                           .where({user:user.toString()})
        //                           .groupBy("date")
        //                           .getRawMany()

        console.log(user,date)
        let todayCount = await this.historyRepository.count({where:{user:user.toString(),date}})
        let totalCoin = await this.coinService.getCoinByUserId(user)
        const DAILY_TSK_COUNT = 20 
        return {
          my:{
            todayCount,
            totalCoin,
            taskCompleted: todayCount >= DAILY_TSK_COUNT,
            todayCoin: todayCount >= DAILY_TSK_COUNT ? todayCount : 0,
          },
          referral:{
            todayCount:0,
            totalCoin:0,
            taskCompleted: 0,
            todayCoin: 0,
          }
        }
      }
}
