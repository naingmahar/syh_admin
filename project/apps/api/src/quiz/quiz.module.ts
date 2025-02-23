import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { Quiz } from './model/quiz.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryModule } from 'src/history/history.module';

@Module({
  imports:[TypeOrmModule.forFeature([Quiz]),HistoryModule],
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {}
