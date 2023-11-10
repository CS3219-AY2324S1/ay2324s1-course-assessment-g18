export interface History {
  _id: string;
  historyId: number;
  userEmail: string;
  questionId: number;
  questionTitle: string;
  questionCategories: string[];
  questionDifficulty: QuestionDifficulty;
  questionDescription: string;
  questionExamples: string[][];
  questionConstraints: string;
  questionImages: string;
  chatHistory: Array<any>;
  codeExecuted: string;
  dateSubmitted: string;
}

export enum QuestionDifficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}
