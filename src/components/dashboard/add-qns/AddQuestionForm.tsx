import { Button } from "@/components/ui/button";
import { useState, SyntheticEvent, Dispatch, SetStateAction } from "react";
import CustomInput from "@/components/form/CustomInput";
import { Question, QuestionDifficulty } from "@/questionrepo/question.model";
import DifficultySelect from "@/components/form/DifficultySelect";
import CustomTextArea from "@/components/form/CustomTextArea";
import "./AddQuestionForm.css";
import LocalQuestionRepository from "@/questionrepo/LocalQuestionRepository";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  setIsAdding: Dispatch<SetStateAction<boolean>>;
}

function AddQuestionForm({ setIsAdding }: Props) {
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
          setIsAdding(false);
          return toast({
            title: "Success!",
            description: "A question has successfully been added.",
          });
        } else {
          setIsAdding(true); // Handle the error state
        }
      } catch (err) {
        console.error(err);
        setError(JSON.stringify(err));
        setIsAdding(true);
      }
    } else {
      setError("All fields are required.");
    }
  };

  return (
    <div className="form-div">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="text-lg font-semibold pb-2">Add a new Question</div>
        <CustomInput label="Question Title" setData={setTitle} data={title} />
        <DifficultySelect setData={setComplexity} data={complexity} />
        <CustomTextArea
          label="Description"
          setData={setDescription}
          data={description}
          inputStyling={{ height: "200px" }}
        />

        <CustomInput label="Link" setData={setLink} data={link} />
        <div className="text-red-800">{err}</div>
        <Button type="submit">Add Question</Button>
      </form>
    </div>
  );
}

export default AddQuestionForm;
