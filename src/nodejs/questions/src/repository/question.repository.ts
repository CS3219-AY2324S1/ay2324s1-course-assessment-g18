import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { QuestionDto } from "src/schema/question.model";
import { Question, QuestionDocument } from "src/schema/question.schema";

export interface QuestionRepository {
    getAllQuestions(): Promise<QuestionDto[]>;
    getQuestionById(questionId: number);
    addQuestion(questionDto: QuestionDto);
    deleteQuestion(questionId: number);
    editQuestion(questionId: number, questionDto: QuestionDto); 
}


@Injectable()
export class QuestionMongoRepository implements QuestionRepository {

    constructor(@InjectModel(Question.name) private questionModel: Model<QuestionDocument>){}


    async getAllQuestions(): Promise<QuestionDto[]> {
        return await this.questionModel.find().exec();
    }
    async getQuestionById(questionId: number) {
        return await this.questionModel.findById(questionId);
    }
    async addQuestion(questionDto: QuestionDto) {
        this.questionModel.create(questionDto);
    }
    async deleteQuestion(questionId: number) {
        await this.questionModel.findByIdAndDelete(questionId);
    }
    async editQuestion(questionId: number, questionDto: QuestionDto) {
        await this.questionModel.findByIdAndDelete(questionId, questionDto);
    }

}