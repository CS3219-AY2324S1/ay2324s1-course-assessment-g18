import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from "@nestjs/common"
import { QuestionDto } from "./question.model";
import { QuestionService } from "./question.service";

@Controller('questions')
export class QuestionController {

    constructor(private questionService:QuestionService){}

    @Get()
    async getAllQuestions(): Promise<QuestionDto[]>
    {
        return await this.questionService.getAllQuestions();
    }

    @Get('/:objectId')
    async getQuestionById(@Param('questionId') objectId: string) {
        return await this.questionService.getQuestionByObjectId(objectId);
    }

    @Post()
    async addQuestion(@Body() questionDto: QuestionDto) {
        return await this.questionService.addQuestion(questionDto);
    }

    @Delete('/:objectId')
    async deleteQuestion(@Param("objectId") objectId: string) {
        await this.questionService.deleteQuestion(objectId);
    }

    @Put('/:objectId')
    async editQuestion(@Param("objectId") objectId: string, @Body() questionDto: QuestionDto) {
        return await this.questionService.editQuestion(objectId, questionDto);
    }
}