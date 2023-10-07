import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { QuestionDto } from "./question.model";
import { Question, QuestionDocument } from "./question.schema";

export interface QuestionRepository {
    getAllQuestions(): Promise<QuestionDto[]>;
    getQuestionById(objectId: string);
    addQuestion(questionDto: QuestionDto);
    deleteQuestion(objectId: string);
    editQuestion(objectId: string, questionDto: QuestionDto); 
    getQuestionbyQuestionId(questionId: number);
}


@Injectable()
export class QuestionMongoRepository implements QuestionRepository {

    constructor(@InjectModel(Question.name) private questionModel: Model<QuestionDocument>){}


    async getAllQuestions(): Promise<QuestionDto[]> {
        const questions = await this.questionModel.find().lean().exec();
        console.log(questions);
        return questions.map((question: QuestionDto) => ({
          _id: question._id,
          questionId: Number(question.questionId),
          questionTitle: question.questionTitle,
          questionCategories: question.questionCategories,
          questionDifficulty: question.questionDifficulty,
          questionLink: question.questionLink,
          questionDescription: question.questionDescription,
        }));
      }
      
    async getQuestionById(objectId: string) {
        return await this.questionModel.findById(objectId);
    }
    async addQuestion(questionDto: QuestionDto) {
    // If questionId is not provided, generate a new one
    if (!questionDto.questionId) {
        const maxQuestionIdDocument = await this.questionModel.findOne({}, { questionId: 1 }, { sort: { questionId: -1 } });
  
        let nextQuestionId;
        if (maxQuestionIdDocument) {
          // Increment the maximum questionId by 1
          nextQuestionId = maxQuestionIdDocument.questionId + 1;
        } else {
          // If no documents exist, start from 1
          nextQuestionId = 1;
        }
  
        questionDto.questionId = nextQuestionId;
      }
  
      return this.questionModel.create(questionDto);
    }
  

    async deleteQuestion(objectId: string) {
        return await this.questionModel.findByIdAndDelete(objectId);
    }
    async editQuestion(objectId: string, questionDto: QuestionDto) {
        return await this.questionModel.findByIdAndUpdate(objectId, questionDto);
    }

    async getQuestionByTitle(questionTitle: string) {
        return await this.questionModel.findOne({questionTitle});
    }

    async getQuestionbyQuestionId(questionId: number) {
      return await this.questionModel.findOne({questionId});
    }

}