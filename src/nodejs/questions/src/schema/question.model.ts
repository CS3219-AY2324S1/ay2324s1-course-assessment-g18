export interface QuestionDto {
    id: string;
    questionId: number;
    questionTitle: string;
    questionCategories: Array<string>;
    questionComplexity: string;
    questionLink: string;
    questionDescription: string;
}