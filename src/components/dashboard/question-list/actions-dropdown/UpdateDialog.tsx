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
        <div>Edit question</div>
      </DialogTrigger>
      <CustomDialog dialogTitle="Edit Question">
        <UpdateQuestionForm question={question} setOpen={setOpen} />
      </CustomDialog>
    </Dialog>
  );
}

export default UpdateDialog;
