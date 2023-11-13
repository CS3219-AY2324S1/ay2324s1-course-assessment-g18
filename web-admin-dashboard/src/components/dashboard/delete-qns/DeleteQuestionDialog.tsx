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
  const [err] = useState("");

  const { toast } = useToast();

  const onDelete = async () => {
    try {
      setIsChanged(false);
      const isDeleted = await questionRepo.deleteQuestion(question._id);
      const substring_to_remove = "https://storage.googleapis.com/peerprep-questions/"

      for (let i = 0; i < question.questionExamples.length; i++) {
        const response = await fetch(
          import.meta.env.VITE_BASE_UPLOAD_URL +"/upload/" + question.questionExamples[i][3].replace(substring_to_remove, ""),
          {
            method: "DELETE",
          }
        );
        console.log(response)
      }

      const response = await fetch(
        import.meta.env.VITE_BASE_UPLOAD_URL +"/upload/" + question.questionImages.replace(substring_to_remove, ""),
        {
          method: "DELETE",
        }
      );
      console.log(response)

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
    } catch (err: any) {
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
        <AlertDialogCancel onClick={() => setOpen(false)}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={onDelete}
          className="bg-[#5562eb] hover:bg-[#6470ee]"
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
      {err && <div className="text-red-800">{err}</div>}
    </>
  );
}

export default DeleteQuestionDialog;
