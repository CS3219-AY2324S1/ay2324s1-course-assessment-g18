import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from '../questions/question.module';
import { Question, QuestionSchema } from '../questions/question.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [    MongooseModule.forRoot(
    'mongodb+srv://CS3219G18:XGrPYdDUo4ivoMIU@peerprep.e87nhmv.mongodb.net/questions',
    ),
    MongooseModule.forFeature([{name: Question.name, schema: QuestionSchema}]),
    QuestionModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
