import {IsString, IsArray, IsNumber} from 'class-validator'


export class QuestionDto {
    id: string;

    @IsNumber()
    questionId: number;

    @IsString()
    questionTitle: string;

    @IsArray()
    questionCategories: Array<string>;

    @IsString()
    questionDifficulty: string;

    @IsString()
    questionLink: string;

    @IsString()
    questionDescription: string; 
}