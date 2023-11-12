import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class History {
  @Prop()
  historyId: number;

  @Prop()
  userEmail: string;

  @Prop()
  matchedPeer: string;

  @Prop()
  questionId: number;

  @Prop()
  roomId: string;

  @Prop()
  questionTitle: string;

  @Prop()
  questionCategories: Array<string>;

  @Prop()
  questionDifficulty: string;

  @Prop()
  questionDescription: string;

  @Prop()
  questionExamples: Array<Array<string>>;

  @Prop()
  questionConstraints: string;

  @Prop()
  questionImages: string;

  @Prop()
  chatHistory: Array<string>;

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
