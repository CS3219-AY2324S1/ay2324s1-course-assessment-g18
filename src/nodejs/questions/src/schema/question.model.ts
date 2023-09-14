export interface QuestionDto {
    questionId: number;
    questionTitle: string;
    questionCategories: Array<string>;
    questionDifficulty: string;
    questionDescription: string;
}