import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards} from "@nestjs/common"
import { QuestionDto } from "./question.model";
import { QuestionService } from "./question.service";
import { AccessTokenGuard } from "./guards/accessToken.guard";

@Controller('questions')
export class QuestionController {

    constructor(private questionService:QuestionService){}

    @UseGuards(AccessTokenGuard)
    @Get()
    async getAllQuestions(): Promise<QuestionDto[]>
    {
        return await this.questionService.getAllQuestions();
    }

    @UseGuards(AccessTokenGuard)
    @Get('/:questionId')
    async getQuestionById(@Param('questionId') questionId: string) {
        return await this.questionService.getQuestionById(questionId);
    }

    @Post()
    async addQuestion(@Body() questionDto: QuestionDto) {
        return await this.questionService.addQuestion(questionDto);
    }

    @Delete('/:questionId')
    async deleteQuestion(@Param("questionId") questionId: string) {
        await this.questionService.deleteQuestion(questionId);
    }

    @Put('/:questionId')
    async editQuestion(@Param("questionId") questionId: string, @Body() questionDto: QuestionDto) {
        return await this.questionService.editQuestion(questionId, questionDto);
    }
}