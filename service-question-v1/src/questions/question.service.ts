import { Injectable } from "@nestjs/common";
import { QuestionMongoRepository } from "src/questions/question.repository";
import { QuestionDto } from "./question.model";


@Injectable()
export class QuestionService {

    constructor(private questionRepository: QuestionMongoRepository) {}

    async getAllQuestions(): Promise<QuestionDto[]> {
        
        return await this.questionRepository.getAllQuestions();
    }
    async getQuestionById(questionId: string) {
        return await this.questionRepository.getQuestionById(questionId);
    }
    async addQuestion(questionDto: QuestionDto) {
        this.questionRepository.addQuestion(questionDto);
    }
    async deleteQuestion(questionId: string) {
        await this.questionRepository.deleteQuestion(questionId);
    }
    async editQuestion(questionId: string, questionDto: QuestionDto) {
        await this.questionRepository.editQuestion(questionId, questionDto);
    }
}