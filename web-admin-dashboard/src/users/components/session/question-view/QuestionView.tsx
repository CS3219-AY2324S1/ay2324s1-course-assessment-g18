import { Question, QuestionDifficulty } from "@/questionrepo/question.model";
import React from "react";
import DifficultyBtn from "../../buttons/DifficultyBtn";
import QuestionExamples from "@/components/dashboard/question-list/question-card/QuestionExamples";

interface Props {
  question: any;
  // Change to Question type when question model is updated
}
function QuestionView({ question }: Props) {
  return (
    <div className="flex flex-col gap-[25px]">
      <div className="font-bold text-lg">{question.questionTitle}</div>
      <DifficultyBtn level={question.questionDifficulty} />
      <div className="">{question.questionDescription}</div>
      <QuestionExamples examples={question.questionExamples} />
      <div>
        <div className="font-bold">Constraints:</div>
        <div>{question.questionConstraints}</div>
      </div>
    </div>
  );
}

export default QuestionView;
