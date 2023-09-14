import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'

export type QuestionDocument = Question & Document;


@Schema()
export class Question {
    @Prop()
    questionId: number;

    @Prop()
    questionTitle: string;

    @Prop()
    questionCategories: Array<string>;

    @Prop()
    questionDifficulty: string;

    @Prop()
    questionDescription: string;
}