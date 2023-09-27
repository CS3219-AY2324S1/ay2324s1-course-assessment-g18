import { Module } from "@nestjs/common";
import { QuestionController } from "./question.controller";
import { QuestionService } from "./question.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Question, QuestionSchema } from "./question.schema";
import { QuestionMongoRepository } from "./question.repository";


@Module({
    imports: [MongooseModule.forRoot(
        'mongodb+srv://CS3219G18:XGrPYdDUo4ivoMIU@peerprep.e87nhmv.mongodb.net/questions',
    ),
    MongooseModule.forFeature([{name: Question.name, schema: QuestionSchema}]),],
    controllers: [QuestionController],
    providers: [QuestionService, QuestionMongoRepository],
})

export class QuestionModule{};