export interface QuestionDto {
    id: string;
    questionTitle: string;
    questionCategories: Array<string>;
    questionDifficulty: string;
    questionDescription: string;
}