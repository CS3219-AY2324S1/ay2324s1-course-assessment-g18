import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class History {
  @Prop()
  historyId: number;

  @Prop()
  userEmail: string;

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
