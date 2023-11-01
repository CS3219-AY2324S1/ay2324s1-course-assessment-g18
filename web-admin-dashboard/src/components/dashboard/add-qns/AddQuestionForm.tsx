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
import QnExampleInputs from "@/components/form/QnExampleInputs";
import CustomInputArray from "@/components/form/CustomInputArray";

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
  const [categories, setCategories] = useState<string[]>([""]);
  const [complexity, setComplexity] = useState<QuestionDifficulty>(
    QuestionDifficulty.Easy
  );
  const [example1, setExample1] = useState<string[]>(["", ""]);
  const [example2, setExample2] = useState<string[]>(["", ""]);
  const [example3, setExample3] = useState<string[]>(["", ""]);
  const [constraints, setConstraints] = useState<string>("");
  const [img, setImg] = useState<string>("");

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
      await questionRepo.saveQuestion(
        title,
        description,
        categories.map((c) => c.trim()),
        complexity,
        [example1, example2, example3],
        constraints,
        img
      );
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
      return "Title and description fields are required.";
    }
  }

  return (
    <div className="form-div">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="flex items-end gap-[10px]">
          <CustomInput label="Question Title" setData={setTitle} data={title} />
          <DifficultySelect setData={setComplexity} data={complexity} />
        </div>
        <CustomInputArray
          label="Category"
          setData={setCategories}
          data={categories}
          delimiter=","
        />
        <CustomTextArea
          label="Description"
          setData={setDescription}
          data={description}
        />
        <div className="flex flex-col gap-[10px] mb-[15px]">
          <QnExampleInputs
            example={example1}
            setExample={setExample1}
            exampleNum={1}
          />
          <QnExampleInputs
            example={example2}
            setExample={setExample2}
            exampleNum={2}
          />
          <QnExampleInputs
            example={example3}
            setExample={setExample3}
            exampleNum={3}
          />
        </div>
        <CustomTextArea
          label="Constraints"
          setData={setConstraints}
          data={constraints}
        />
        <CustomInput label="Image link" data={img} setData={setImg} />

        <Button type="submit" className="bg-[#5562eb] hover:bg-[#6470ee]">
          Add Question
        </Button>
      </form>
    </div>
  );
}

export default AddQuestionForm;
