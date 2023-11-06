import { Document } from 'mongoose';
export interface IHistory extends Document {
  historyId: number;
  readonly roomId: string;
  readonly userEmail: string;
  readonly questionId: number;
  readonly questionTitle: string;
  readonly questionDescription: string;
  readonly questionDifficulty: string;
  readonly chatHistory: Array<any>;
  readonly codeExecuted: string;
  readonly dateSubmitted: string;
}
