import { Question } from "@/questionrepo/question.model";

export function areQuestionsContentEqual(q1: Question, q2: Question): boolean {
  return (
    q1.questionDifficulty === q2.questionDifficulty &&
    q1.questionDescription === q2.questionDescription &&
    q1.questionTitle === q2.questionTitle
  );
}
