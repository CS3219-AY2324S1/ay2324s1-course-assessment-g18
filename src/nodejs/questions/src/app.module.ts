import { Module } from '@nestjs/common';
import { QuestionController } from './controller/question.controller';
import { QuestionService } from './service/question.service';
import { QuestionMongoRepository } from './repository/question.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from './schema/question.schema';
import { Question } from './schema/question.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
        'mongodb+srv://CS3219G18:XGrPYdDUo4ivoMIU@peerprep.e87nhmv.mongodb.net/questions',
    ),
    MongooseModule.forFeature([{name: Question.name, schema: QuestionSchema}])

  ],
  controllers: [QuestionController],
  providers: [QuestionService, QuestionMongoRepository],
})
export class AppModule {}
