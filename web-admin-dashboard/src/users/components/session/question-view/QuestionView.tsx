import { Question, QuestionDifficulty } from "@/questionrepo/question.model";
import React from "react";
import DifficultyBtn from "../../buttons/DifficultyBtn";

interface Props {
  question: Question;
}
function QuestionView({ question }: Props) {
  return (
    <div>
      <div className="font-bold text-lg mb-5">{question.questionTitle}</div>
      <DifficultyBtn level={question.questionDifficulty} />
      <div className="mt-5">{question.questionDescription}</div>
    </div>
  );
}

export default QuestionView;
