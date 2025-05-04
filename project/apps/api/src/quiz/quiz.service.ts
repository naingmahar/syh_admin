import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './model/quiz.model';
import { Repository } from 'typeorm';
import { CreateQuizDto, QuizDto } from './dto/quiz.dto';
import { IQuiz } from './interface/quiz';
import { IPagination } from 'src/utils/paginationTemplate';
import { HistoryService } from 'src/history/history.service';

@Injectable()
export class QuizService {

  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    private readonly historyService:HistoryService,
  ) {}

  async findAll(param:any,skip:number): Promise<IPagination<Quiz[]>> {
    const dataLimit = 20
    try {
      const quizzes = await this.quizRepository.find({where:param,skip:skip||0,take:dataLimit});
      const quizCount = await this.quizRepository.count({where:param});
      return {
        data:quizzes,
        limit:dataLimit,
        skip,
        index:0,
        id:0,
        total:quizCount
      }
    } catch (error) {
      return {
        data:[],
        limit:dataLimit,
        index:0,
        id:0,
        skip,
        total:0
      }
    }
  }

  findById(id: number): Promise<Quiz | null> {
    return this.quizRepository.findOneBy({ id });
  }

  async createQuiz(quiz:IQuiz):Promise<IQuiz & Quiz>{
    const res = (await this.quizRepository.save(quiz));
    return res
  }


  async findOne(id: number): Promise<Quiz | undefined> {

    let data = await this.quizRepository.find({
      relations:["id"],
      where:{id}
    }) 
    
    console.log("Data",data)
    return data[0] || undefined
    //  ({publicKey});
  }
}
