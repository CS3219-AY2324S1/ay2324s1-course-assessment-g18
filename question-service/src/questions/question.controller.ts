import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards} from "@nestjs/common"
import { QuestionDto } from "./question.model";
import { QuestionService } from "./question.service";
import { AccessTokenGuard } from "./guards/accessToken.guard";
import { RolesGuard } from "./guards/roles.guard";
import { Roles } from "./decorator/roles.decorator";
import { UserRole } from "./user-role.enum";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller('questions')
@UseGuards(AccessTokenGuard)
export class QuestionController {

    constructor(private questionService:QuestionService){}

    @Get()
    async getAllQuestions(): Promise<QuestionDto[]>
    {
        return await this.questionService.getAllQuestions();
    }

    @Get('/:questionId')
    async getQuestionById(@Param('questionId') questionId: string) {
        return await this.questionService.getQuestionById(questionId);
    }

    @MessagePattern({cmd: 'random'})
    @Get('/random/:questionDifficulty')
    async getRandomQuestionWithDifficulty(@Param('questionDifficulty') questionDifficulty: String, @Payload() data) {
        const difficulty = data.difficulty;
        return await this.questionService.getRandomQuestionWithDifficulty(difficulty);
    }

    @UseGuards(RolesGuard)
    @Roles([UserRole.Admin])
    @Post()
    async addQuestion(@Body() questionDto: QuestionDto) {
        return await this.questionService.addQuestion(questionDto);
    }

    @UseGuards(RolesGuard)
    @Roles([UserRole.Admin])
    @Delete('/:questionId')
    async deleteQuestion(@Param("questionId") questionId: string) {
        await this.questionService.deleteQuestion(questionId);
    }

    @UseGuards(RolesGuard)
    @Roles([UserRole.Admin])
    @Put('/:questionId')
    async editQuestion(@Param("questionId") questionId: string, @Body() questionDto: QuestionDto) {
        return await this.questionService.editQuestion(questionId, questionDto);
    }

}