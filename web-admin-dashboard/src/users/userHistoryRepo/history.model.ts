export interface History {
  _id: string;
  email: string;
  questionTitle: string;
  questionDifficulty: QuestionDifficulty;
  questionDescription: string;
  dateSubmitted: string;
  submission: string;
}

export enum QuestionDifficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}
