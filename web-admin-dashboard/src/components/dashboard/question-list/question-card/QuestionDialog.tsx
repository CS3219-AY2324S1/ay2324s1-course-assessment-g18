import CustomDialog from "@/components/dialog/CustomDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Question, QuestionDifficulty } from "@/questionrepo/question.model";
import { useState } from "react";
import QuestionExamples from "./QuestionExamples";
import QuestionConstraints from "./QuestionConstraints";

interface Props {
  question: Question;
}

function QuestionDialog({ question }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">{question.questionTitle}</div>
      </DialogTrigger>
      <CustomDialog dialogTitle={question.questionTitle}>
        <div className="h-[450px] overflow-y-auto flex flex-col gap-[20px] p-[20px]">
          <div className="flex items-center gap-2">
            <div
              className={`w-20 rounded-md p-1 text-center ${
                question.questionDifficulty == QuestionDifficulty.Easy
                  ? "bg-green-200 text-green-600"
                  : question.questionDifficulty == QuestionDifficulty.Medium
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-200 text-red-600"
              }`}
            >
              {question.questionDifficulty}
            </div>
            {question.questionCategories[0].length > 0 && (
              <div className="flex items-center">
                <span className="text-gray-500">Categories:</span>
                <span className="ml-2">
                  {question.questionCategories.join(", ")}
                </span>
              </div>
            )}
          </div>
          <div className="whitespace-pre-line">
            {question.questionDescription}
          </div>
          <QuestionExamples examples={question.questionExamples} />
          {question.questionConstraints.length > 0 && (
            <div>
              <QuestionConstraints constraints={question.questionConstraints} />
            </div>
          )}
        </div>
      </CustomDialog>
    </Dialog>
  );
}

export default QuestionDialog;
