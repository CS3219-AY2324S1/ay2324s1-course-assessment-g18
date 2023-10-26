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

    @IsArray()
    questionExamples: Array<Array<String>>;

    @IsString()
    questionConstraints: String;

    @IsString()
    questionImages: String;

    @IsString()
    questionDescription: string; 
}