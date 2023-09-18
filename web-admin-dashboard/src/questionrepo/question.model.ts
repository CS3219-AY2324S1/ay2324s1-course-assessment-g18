export interface Question {
  qId: number;
  title: string;
  category: string[];
  complexity: QuestionDifficulty;
  link: string;
  description: string;
}

export enum QuestionDifficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}
