import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.model';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { IFindUser } from './interface/user';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly authService:AuthService,
      ) {}
    
      findAll(): Promise<User[]> {
        return this.usersRepository.find();
      }
    
      findById(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
      }
    
      async createUser(user:CreateUserDto): Promise<any>{
        const saveUser =  await this.usersRepository.save(user);
        const res= await this.authService.generateToken(saveUser.name,String(saveUser.id),saveUser.phone)
        return {...saveUser,...{token:res.access_token}}
      }

      async deleteUser(user_id:number,phone:string): Promise<any>{
        const saveUser =  await this.usersRepository.delete({id:user_id,phone});
        return saveUser
      }
    
    
      async findOne(query:IFindUser): Promise<User | undefined> {
    
        let data = await this.usersRepository.find({
          where:query
        }) 
        
        console.log("Data",data)
        return data[0] || undefined
        //  ({publicKey});
      }
}
