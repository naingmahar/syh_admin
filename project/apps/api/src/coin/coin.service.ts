import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coin } from './model/coin.model';
import { Repository } from 'typeorm';
import { CreateCoinDto } from './dto/coin.dto';
import { FirebaseRepository } from 'src/firebase/firebase.service';

@Injectable()
export class CoinService {

    constructor(
        @InjectRepository(Coin)
        private coinRepository: Repository<Coin>,
        private readonly firebaseService:FirebaseRepository,
    ) {}
    async update(amount:number,user:string,date:string){
        const old = await this.coinRepository.findOne({where:{user},order:{id:"DESC"}})
        console.log("OLD",user,old)
        const currentAmount = old ? amount+old.amount : amount
        // let res:Coin|undefined;
        console.log("DATE",date)
        this.firebaseService.setCoin(user,currentAmount)
        this.firebaseService.setCount(user,0,date)
        if(!currentAmount || !old){
            let res = await this.coinRepository.save({amount:currentAmount,user});
            console.log("RES",res)
        }else{
            let update = await this.coinRepository.update(old.id,{amount:currentAmount})
        }
        
        return {updated:true}
    }

    async getCoinByUserId(user:String){
        const old = await this.coinRepository.findOne({where:{user:user.toString()}})
        return old.amount
    }
}
