import {IsString, IsArray, IsOptional} from 'class-validator'


export class QuestionDto {
    id: string;

    @IsOptional()
    questionId?: number;

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