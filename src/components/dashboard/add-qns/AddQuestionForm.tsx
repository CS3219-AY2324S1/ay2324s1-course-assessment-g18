import { Button } from "@/components/ui/button";
import { useState, SyntheticEvent, Dispatch, SetStateAction } from "react";
import CustomInput from "@/components/form/CustomInput";
import { Question, QuestionDifficulty } from "@/models/question.model";
import DifficultySelect from "@/components/form/DifficultySelect";
import CustomTextArea from "@/components/form/CustomTextArea";
import "./AddQuestionForm.css";
interface Props {
  setIsAdding: Dispatch<SetStateAction<boolean>>;
}
function AddQuestionForm({ setIsAdding }: Props) {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [complexity, setComplexity] = useState<QuestionDifficulty>(
    QuestionDifficulty.Easy
  );
  const [link, setLink] = useState<string>("");
  const [err, setError] = useState<string>("");

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (title.length != 0 && description.length != 0 && link.length != 0) {
      try {
        const currStringify = localStorage.getItem("questions");
        let curr: Question[] = [];
        if (!currStringify) {
          curr = [];
        } else {
          curr = JSON.parse(currStringify);
        }

        const newQuestion: Question = {
          qId: curr.length ? curr.length + 1 : 1,
          title,
          description,
          complexity: QuestionDifficulty[complexity],
          link,
          category: [],
        };
        const newArr = curr.concat(newQuestion);
        localStorage.setItem("questions", JSON.stringify(newArr));
        console.log("Successfully added");
        setIsAdding(false);
      } catch (err) {
        console.log(err);
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
