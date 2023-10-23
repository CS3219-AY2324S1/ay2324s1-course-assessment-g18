import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class History {
  @Prop({ default: uuidv4 })
  historyId: string;

  @Prop()
  userId: string;

  @Prop()
  questionId: string;

  @Prop()
  questionTitle: string;

  @Prop()
  questionDescription: string;

  @Prop()
  questionDifficulty: string;

  @Prop()
  chatHistory: string;

  @Prop()
  codeExecuted: string;

  @Prop()
  dateSubmitted: string;
}

export const HistorySchema = SchemaFactory.createForClass(History);

HistorySchema.pre('save', function (next) {
  this.dateSubmitted = new Date().toLocaleString();
  next();
});
