import { Document } from 'mongoose';
export interface IHistory extends Document {
  historyId: number;
  readonly roomId: string;
  readonly userEmail: string;
  readonly questionId: number;
  readonly questionTitle: string;
  readonly questionCategories: string[];
  readonly questionDifficulty: string;
  readonly questionDescription: string;
  readonly questionExamples: string[][];
  readonly questionConstraints: string;
  readonly questionImages: string;
  readonly chatHistory: Array<any>;
  readonly codeExecuted: string;
  readonly dateSubmitted: string;
}
