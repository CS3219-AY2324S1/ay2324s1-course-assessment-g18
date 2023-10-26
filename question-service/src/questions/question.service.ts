import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { QuestionMongoRepository } from "./question.repository";
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
        const existingQuestion = await this.questionRepository.getQuestionByTitle(questionDto.questionTitle);
        if (existingQuestion) {
            throw new HttpException(
                'Question with the given title already exists', HttpStatus.BAD_REQUEST
            )
        }

        const MaxId = await this.questionRepository.getMaximumId();

        if (MaxId.length == 0) {
            questionDto.questionId = "1";
        } else {
            questionDto.questionId = String(Number(MaxId[0].questionId) + 1);
        }

        return await this.questionRepository.addQuestion(questionDto);
    }

    async deleteQuestion(questionId: string) {
        await this.questionRepository.deleteQuestion(questionId);
    }

    async editQuestion(questionId: string, questionDto: QuestionDto) {
        const existingQuestion = await this.questionRepository.getQuestionByTitle(questionDto.questionTitle);
        if (existingQuestion && existingQuestion._id.toString() !== questionId) {
            throw new HttpException(
                'Question with the given title already exists', HttpStatus.BAD_REQUEST
            )
        }
        await this.questionRepository.editQuestion(questionId, questionDto);
        return questionDto;
    }

}