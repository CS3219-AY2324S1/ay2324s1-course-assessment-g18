export interface Question {
  _id: string;
  questionId: number;
  questionTitle: string;
  questionCategories: string[];
  questionDifficulty: QuestionDifficulty;
  questionDescription: string;
}

export enum QuestionDifficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}
