export interface History {
  _id: string;
  historyId: number;
  userEmail: string;
  questionId: number;
  questionTitle: string;
  questionDescription: string;
  questionDifficulty: QuestionDifficulty;
  chatHistory: string;
  codeExecuted: string;
  dateSubmitted: string;
}

export enum QuestionDifficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}
