import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { QuestionDto } from "./question.model";
import { Question, QuestionDocument } from "./question.schema";

export interface QuestionRepository {
    getAllQuestions(): Promise<QuestionDto[]>;
    getQuestionById(questionId: string);
    addQuestion(questionDto: QuestionDto);
    deleteQuestion(questionId: string);
    editQuestion(questionId: string, questionDto: QuestionDto); 
}


@Injectable()
export class QuestionMongoRepository implements QuestionRepository {

    constructor(@InjectModel(Question.name) private questionModel: Model<QuestionDocument>){}


    async getAllQuestions(): Promise<QuestionDto[]> {
        return await this.questionModel.find().exec();
    }
    async getQuestionById(questionId: string) {
        return await this.questionModel.findById(questionId);
    }
    async addQuestion(questionDto: QuestionDto) {
        return this.questionModel.create(questionDto);
    }
    async deleteQuestion(questionId: string) {
        return await this.questionModel.findByIdAndDelete(questionId);
    }
    async editQuestion(questionId: string, questionDto: QuestionDto) {
        return await this.questionModel.findByIdAndUpdate(questionId, questionDto);
    }

    async getMaximumId() {
        return await this.questionModel.find().sort({questionId: -1}).limit(1);
    }

    async getQuestionByTitle(questionTitle: string) {
        return await this.questionModel.findOne({questionTitle});
    }

}