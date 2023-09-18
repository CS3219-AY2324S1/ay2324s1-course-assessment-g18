import CustomDialog from "@/components/dialog/CustomDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import UpdateQuestionForm from "../../update-qns/UpdateQuestionForm";
import { Question } from "@/questionrepo/question.model";
import { useState } from "react";

interface Props {
  question: Question;
}
function UpdateDialog({ question }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Edit
        </div>
      </DialogTrigger>
      <CustomDialog dialogTitle="Edit Question">
        <UpdateQuestionForm question={question} setOpen={setOpen} />
      </CustomDialog>
    </Dialog>
  );
}

export default UpdateDialog;
