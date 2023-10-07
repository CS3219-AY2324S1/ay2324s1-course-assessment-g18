import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { IsNotEmpty } from 'class-validator';

export type QuestionDocument = Question & Document;


@Schema()
export class Question {
    @Prop()
    _id: string;

    @Prop({ type: Number, unique: true })
    @IsNotEmpty()
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