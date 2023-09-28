import {IsString, IsArray, isNumber} from 'class-validator'


export class QuestionDto {
    id: string;

    @isNumber()
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