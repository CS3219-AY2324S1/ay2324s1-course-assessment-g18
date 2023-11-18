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
    questionDescription: string;

    @Prop()
    questionExamples: Array<Array<String>>;

    @Prop()
    questionConstraints: String;

    @Prop()
    questionImages: String;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);