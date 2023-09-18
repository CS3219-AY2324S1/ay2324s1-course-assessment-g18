import { Button } from "@/components/ui/button";
import {
  useState,
  SyntheticEvent,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import CustomInput from "@/components/form/CustomInput";
import { Question, QuestionDifficulty } from "@/questionrepo/question.model";
import DifficultySelect from "@/components/form/DifficultySelect";
import CustomTextArea from "@/components/form/CustomTextArea";
import "./AddQuestionForm.css";
import LocalQuestionRepository from "@/questionrepo/LocalQuestionRepository";
import { useToast } from "@/components/ui/use-toast";
import { IsChangedContext } from "@/context/IsChangedContext";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
function AddQuestionForm({ setOpen }: Props) {
  const { setIsChanged } = useContext(IsChangedContext);
  const { toast } = useToast();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [complexity, setComplexity] = useState<QuestionDifficulty>(
    QuestionDifficulty.Easy
  );
  const [link, setLink] = useState<string>("");
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
          category: [],
          qId: 0, // just set a dummy value first will think of how to do this better later
        };

        // Use the LocalQuestionRepository to save the question
        const isSaved = LocalQuestionRepository.saveQuestion(newQuestion);

        if (isSaved) {
          console.log("Successfully added");
          setIsChanged(true);
          setOpen(false);
          return toast({
            title: "Success!",
            description: "A question has successfully been added.",
          });
        } else {
          setIsChanged(false); // Handle the error state
        }
      } catch (err) {
        console.error(err);
        setError(JSON.stringify(err));
        setIsChanged(false);
      }
    } else {
      setError("All fields are required.");
    }
  };

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
        <Button type="submit">Add Question</Button>
      </form>
    </div>
  );
}

export default AddQuestionForm;
