import { Document } from 'mongoose';
export interface IHistory extends Document {
  readonly historyId: number;
  readonly userEmail: string;
  readonly questionId: string;
  readonly questionTitle: string;
  readonly questionDescription: string;
  readonly questionDifficulty: string;
  readonly chatHistory: string;
  readonly codeExecuted: string;
  readonly dateSubmitted: string;
}
