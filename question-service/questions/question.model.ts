import {IsString, IsArray} from 'class-validator'


export class QuestionDto {
    id: string;

    @IsString()
    questionTitle: string;

    @IsArray()
    questionCategories: Array<string>;

    @IsString()
    questionDifficulty: string;

    @IsString()
    questionDescription: string; 
}