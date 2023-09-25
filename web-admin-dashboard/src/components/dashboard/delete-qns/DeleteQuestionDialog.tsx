import { useState, Dispatch, SetStateAction, useContext } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Question } from "@/questionrepo/question.model";
import { QuestionRepoContext } from "@/context/QuestionRepoContext";

interface Props {
  question: Question;
  setOpen: (open: boolean) => void;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

function DeleteQuestionDialog({ question, setOpen, setIsChanged }: Props) {
  const { questionRepo } = useContext(QuestionRepoContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [err, setError] = useState("");

  const { toast } = useToast();

  const onDelete = async () => {
    try {
      // Use the LocalQuestionRepository to delete the question
      // const isDeleted = LocalQuestionRepository.deleteQuestion(
      //   question.questionId
      // );
      const isDeleted = await questionRepo.deleteQuestion(question._id);

      if (isDeleted) {
        console.log("Successfully deleted");
        setIsChanged(true);
        setOpen(false);
        toast({
          title: "Success!",
          description: "The question has been successfully deleted.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "A problem occurred while deleting the question.",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err.response.data.message,
      });
    }
  };

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the
          question.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setOpenDialog(false)}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
      </AlertDialogFooter>
      {err && <div className="text-red-800">{err}</div>}
    </>
  );
}

export default DeleteQuestionDialog;
