import { Module } from '@nestjs/common';
import { QuestionController } from './questions/question.controller';
import { QuestionService } from './questions/question.service';
import { QuestionMongoRepository } from './questions/question.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from './questions/question.schema';
import { Question } from './questions/question.schema';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UserModule } from './users/user.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { QuestionModule } from './questions/question.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    QuestionModule,
    // TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
