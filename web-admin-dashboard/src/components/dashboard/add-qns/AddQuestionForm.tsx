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
import { QuestionDifficulty } from "@/questionrepo/question.model";
import DifficultySelect from "@/components/form/DifficultySelect";
import CustomTextArea from "@/components/form/CustomTextArea";
import "./AddQuestionForm.css";
import { useToast } from "@/components/ui/use-toast";
import { QuestionRepoContext } from "@/context/QuestionRepoContext";
import { CustomSelect } from "@/components/form/CustomSelect";

interface Props {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}
function AddQuestionForm({ setOpen, setIsChanged }: Props) {
  // const { setIsChanged } = useContext(IsChangedContext);
  const { questionRepo } = useContext(QuestionRepoContext);
  const { toast } = useToast();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [complexity, setComplexity] = useState<QuestionDifficulty>(
    QuestionDifficulty.Easy
  );
  const [categories, setCategories] = useState<string[]>([]);

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsChanged(false);
    const error = invalidForm();
    if (error) {
      return toast({
        variant: "destructive",
        title: "Uh oh!",
        description: error,
      });
    }
    try {
      await questionRepo.saveQuestion(title, description, [], complexity);
      setIsChanged(true);
      setOpen(false);
      return toast({
        title: "Success!",
        description: "A question has successfully been added.",
      });
    } catch (err) {
      console.log(err);
      return toast({
        variant: "destructive",
        title: "Uh oh!",
        description: err.response.data.message,
      });
    }
  };

  function invalidForm() {
    if (title.length === 0 || description.length === 0) {
      return "All fields are required.";
    }
  }

  useEffect(() => {
    console.log(categories);
  }, [categories]);

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

        {categories.map((c) => (
          <div key={c}>{c}</div>
        ))}
        <CustomSelect
          setSelectedArray={setCategories}
          selectedArray={categories}
        />
        <Button type="submit">Add Question</Button>
      </form>
    </div>
  );
}

export default AddQuestionForm;
