export interface History {
  _id: string;
  email: string;
  questionTitle: string;
  questionDifficulty: QuestionDifficulty;
  questionDescription: string;
  dateSubmitted: Date;
  submission: string;
}

export enum QuestionDifficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}
