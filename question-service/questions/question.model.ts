import {IsString, IsArray, isBase32} from 'class-validator'


export class QuestionDto {
    id: string;

    @IsString()
    questionId: string;

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