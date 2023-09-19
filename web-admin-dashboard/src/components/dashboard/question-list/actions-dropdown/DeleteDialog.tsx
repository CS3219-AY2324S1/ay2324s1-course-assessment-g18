import { AlertDialog, AlertDialogContent,AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Question } from "@/questionrepo/question.model";
import { useState } from "react";
import DeleteQuestionDialog from "../../delete-qns/DeleteQuestionDialog";

interface Props {
    question: Question;
}

function DeleteDialog({question}: Props) {
    const [open, setOpen] = useState(false);
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                    Delete
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <DeleteQuestionDialog question={question} setOpen={setOpen}/>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteDialog;


  