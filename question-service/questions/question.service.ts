import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { QuestionMongoRepository } from "./question.repository";
import { QuestionDto } from "./question.model";


@Injectable()
export class QuestionService {

    constructor(private questionRepository: QuestionMongoRepository) {}

    async getAllQuestions(): Promise<QuestionDto[]> {
        return await this.questionRepository.getAllQuestions();
    }
    
    async getQuestionByObjectId(objectId: string) {
        return await this.questionRepository.getQuestionById(objectId);
    }

    async addQuestion(questionDto: QuestionDto) {
        var existingQuestion = await this.questionRepository.getQuestionByTitle(questionDto.questionTitle);
        if (existingQuestion) {
            throw new HttpException(
                'Question with the given title already exists', HttpStatus.BAD_REQUEST
            )
        }
        if (questionDto.questionId){
            existingQuestion  = await this.questionRepository.getQuestionbyQuestionId(questionDto.questionId);
            if (existingQuestion) {
                throw new HttpException(
                    'Question with the given id already exists', HttpStatus.BAD_REQUEST
                )
            }
        }
        return await this.questionRepository.addQuestion(questionDto);
    }


    async deleteQuestion(objectId: string) {
        await this.questionRepository.deleteQuestion(objectId);
    }

    async editQuestion(objectId: string, questionDto: QuestionDto) {
        const existingQuestion = await this.questionRepository.getQuestionByTitle(questionDto.questionTitle);
        if (existingQuestion && existingQuestion._id.toString() !== objectId) {
            throw new HttpException(
                'Question with the given title already exists', HttpStatus.BAD_REQUEST
            )
        }
        await this.questionRepository.editQuestion(objectId, questionDto);
        return questionDto;
    }

}