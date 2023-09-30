import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'

export type QuestionDocument = Question & Document;


@Schema()
export class Question {
    @Prop()
    id: string;

    @Prop()
    questionId: number;

    @Prop()
    questionTitle: string;

    @Prop()
    questionCategories: Array<string>;

    @Prop()
    questionDifficulty: string;

    @Prop()
    questionLink: string;

    @Prop()
    questionDescription: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);