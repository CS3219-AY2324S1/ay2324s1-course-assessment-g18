import { useState, useContext, useEffect } from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { IsChangedContext } from "@/context/IsChangedContext";
import { Question } from "@/questionrepo/question.model";
import MongoQuestionRepository from "@/questionrepo/MongoQuestionRepository";

interface Props {
  question: Question;
  setOpen: (open: boolean) => void;
}

function DeleteQuestionDialog({ question, setOpen }: Props) {
  const { setIsChanged } = useContext(IsChangedContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [err, setError] = useState("");

  const { toast } = useToast();

  const onDelete = async () => {
    try {
      // Use the LocalQuestionRepository to delete the question
      // const isDeleted = LocalQuestionRepository.deleteQuestion(
      //   question.questionId
      // );
      const isDeleted = await MongoQuestionRepository.deleteQuestion(
        question._id
      );

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

  useEffect(() => setIsChanged(false), []);
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
