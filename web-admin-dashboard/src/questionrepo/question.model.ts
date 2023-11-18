export interface Question {
  _id: string;
  questionId: number;
  questionTitle: string;
  questionCategories: string[];
  questionDifficulty: QuestionDifficulty;
  questionDescription: string;
  // 0: input, 1: output, 2: explanation, 3: img
  questionExamples: string[][];
  questionConstraints: string;
  questionImages: string;
}

export enum QuestionDifficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}
