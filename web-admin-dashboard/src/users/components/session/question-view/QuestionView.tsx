import { Question } from "@/questionrepo/question.model";
import DifficultyBtn from "../../buttons/DifficultyBtn";
import QuestionExamples from "@/components/dashboard/question-list/question-card/QuestionExamples";

interface Props {
  question: Question;
  // Change to Question type when question model is updated
}
function QuestionView({ question }: Props) {
  return (
    <div className="flex overflow-y-auto h-full p-2">
      <div className="flex flex-col gap-[10px]">
        <div className="flex gap-[15px] items-center">
          <div className="font-bold text-lg">{question.questionTitle}</div>
          <DifficultyBtn level={question.questionDifficulty} />
        </div>
        <div className="whitespace-pre-line">
          {question.questionDescription}
        </div>

        <QuestionExamples examples={question.questionExamples} />
        <div>
          <div className="font-bold">Constraints:</div>
          <div className="whitespace-pre-line">
            {question.questionConstraints}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionView;
