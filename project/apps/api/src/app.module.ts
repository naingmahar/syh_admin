import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { QuizModule } from './quiz/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Admin } from './admin/model/admin.model';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './transform.interceptor';
import { ErrorsInterceptor } from './errors.interceptor';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { FirebaseModule } from './firebase/firebase.module';
import { HistoryModule } from './history/history.module';
import { CoinModule } from './coin/coin.module';
import { RefrralModule } from './refrral/refrral.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'ls-da8fe443327722858b7ee303bca19b69421913aa.cta4g00eiv1j.ap-southeast-1.rds.amazonaws.com',
      port: 3306,
      username: 'dbmasteruser',
      password: '}VY5OXff;+;c{>9VB5Dy`_M#-[0hW(SQ',
      database: 'SYH_DB',
      entities: [Admin],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AdminModule, QuizModule,AuthModule,FileModule, CategoryModule, UserModule, FirebaseModule, HistoryModule, CoinModule, RefrralModule],
  controllers: [AppController],
  providers: [
      {
        provide: APP_INTERCEPTOR,
        useClass: TransformInterceptor,
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: ErrorsInterceptor,
  
      }
    ,AppService],
})
export class AppModule {}
