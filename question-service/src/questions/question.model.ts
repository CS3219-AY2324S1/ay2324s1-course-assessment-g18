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

    @IsArray()
    questionExamples: Array<Array<String>>;

    @IsString()
    questionConstraints: String;

    @IsString()
    questionImages: String;

    @IsString()
    questionDescription: string; 
}