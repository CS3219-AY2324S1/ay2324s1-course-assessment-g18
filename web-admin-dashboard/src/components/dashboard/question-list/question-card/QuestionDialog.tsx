import CustomDialog from "@/components/dialog/CustomDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Question, QuestionDifficulty } from "@/questionrepo/question.model";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useState } from "react";

interface Props {
  question: Question;
}
function QuestionDialog({ question }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer">{question.title}</div>
      </DialogTrigger>
      <CustomDialog dialogTitle={`${question.qId}. ${question.title}`}>
        <div
          className={` h-full w-20 rounded-md p-1 text-center ${
            question.complexity == QuestionDifficulty.Easy
              ? "bg-green-200 text-green-600"
              : question.complexity == QuestionDifficulty.Medium
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {question.complexity}
        </div>
        <DialogDescription>{question.description}</DialogDescription>
      </CustomDialog>
    </Dialog>
  );
}

export default QuestionDialog;
