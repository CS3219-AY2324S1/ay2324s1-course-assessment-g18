import { Button } from "@/components/ui/button";
import {
  useState,
  SyntheticEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import CustomInput from "@/components/form/CustomInput";
import { Question, QuestionDifficulty } from "@/questionrepo/question.model";
import DifficultySelect from "@/components/form/DifficultySelect";
import CustomTextArea from "@/components/form/CustomTextArea";
import "./../add-qns/AddQuestionForm.css";
import LocalQuestionRepository from "@/questionrepo/LocalQuestionRepository";
import { useToast } from "@/components/ui/use-toast";
import { IsChangedContext } from "@/context/IsChangedContext";
import { areQuestionsEqual } from "@/utils/question";

interface Props {
  question: Question;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
function UpdateQuestionForm({ question, setOpen }: Props) {
  const { setIsChanged } = useContext(IsChangedContext);

  const { toast } = useToast();
  const [title, setTitle] = useState<string>(question.title);
  const [description, setDescription] = useState<string>(question.description);
  const [complexity, setComplexity] = useState<QuestionDifficulty>(
    question.complexity
  );
  const [link, setLink] = useState<string>(question.link);
  const [err, setError] = useState<string>("");

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (title.length !== 0 && description.length !== 0 && link.length !== 0) {
      try {
        const newQuestion: Question = {
          title,
          description,
          complexity,
          link,
          category: question.category,
          qId: question.qId, // just set a dummy value first will think of how to do this better later
        };
        // If no change, close
        if (areQuestionsEqual(newQuestion, question)) {
          setOpen(false);
          return toast({
            title: "You have not made any new changes",
          });
        }

        // Use the LocalQuestionRepository to save the question
        const isSaved = LocalQuestionRepository.updateQuestion(
          newQuestion,
          question.qId
        );

        if (isSaved) {
          console.log("Successfully updated");
          setIsChanged(true);
          setOpen(false);
          return toast({
            title: "Success!",
            description: "A question has successfully been updated.",
          });
        } else {
          return toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "A problem occurred  while updating the question.",
          });
        }
      } catch (err) {
        console.error(err);
        setError(JSON.stringify(err));
      }
    } else {
      setError("All fields are required.");
    }
  };
  useEffect(() => setIsChanged(false), []);

  return (
    <div className="form-div">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="flex items-end gap-[10px]">
          <CustomInput label="Question Title" setData={setTitle} data={title} />
          <DifficultySelect setData={setComplexity} data={complexity} />
        </div>
        <CustomTextArea
          label="Description"
          setData={setDescription}
          data={description}
        />

        <CustomInput label="Link" setData={setLink} data={link} />
        <div className="text-red-800">{err}</div>
        <Button type="submit">Update Question</Button>
      </form>
    </div>
  );
}

export default UpdateQuestionForm;
