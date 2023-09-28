import LiveQuestionRepository from "@/questionrepo/LiveQuestionRepository";
import { createContext } from "react";

export const QuestionRepoContext = createContext({
  questionRepo: new LiveQuestionRepository(),
  setQuestionRepo: (questionRepo: LiveQuestionRepository) => {},
});
