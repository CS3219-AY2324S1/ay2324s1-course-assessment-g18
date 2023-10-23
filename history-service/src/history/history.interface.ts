import { Document } from 'mongoose';
export interface IHistory extends Document {
  readonly historyId: string;
  readonly userId: string;
  readonly questionId: string;
  readonly questionTitle: string;
  readonly questionDescription: string;
  readonly questionDifficulty: string;
  readonly chatHistory: string;
  readonly codeExecuted: string;
  readonly dateSubmitted: string;
}
