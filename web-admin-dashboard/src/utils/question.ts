import { Question } from "@/questionrepo/question.model";

export function areQuestionsEqual(q1: Question, q2: Question): boolean {
  return (
    q1.complexity === q2.complexity &&
    q1.description === q2.description &&
    q1.title === q2.title &&
    q1.link === q2.link
  );
}
