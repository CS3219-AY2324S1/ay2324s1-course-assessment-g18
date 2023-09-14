import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common"
import { QuestionDto } from "src/schema/question.model";
import { QuestionService } from "src/service/question.service";

@Controller('questions')
export class QuestionController {

    constructor(private questionService:QuestionService){}

    @Get()
    async getAllQuestions(): Promise<QuestionDto[]> {
        console.log("get all questions");
        return this.questionService.getAllQuestions();
    }

    @Get('/:questionId')
    async getQuestionById(@Param('questionId') questionId: string) {
        return await this.questionService.getQuestionById(questionId);
    }

    @Post()
    async addQuestion(@Body() questionDto: QuestionDto) {
        this.questionService.addQuestion(questionDto);
    }

    @Delete("/:questionId")
    async deleteQuestion(@Param("questionId") questionId: string) {
        await this.questionService.deleteQuestion(questionId);
    }

    @Put("/:questionId")
    async editQuestion(@Param("questionId") questionId: string, @Body() questionDto: QuestionDto) {
        await this.questionService.editQuestion(questionId, questionDto);
    }
}