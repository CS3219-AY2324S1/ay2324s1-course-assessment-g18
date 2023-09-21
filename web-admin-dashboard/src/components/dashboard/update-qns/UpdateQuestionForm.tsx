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
import MongoQuestionRepository from "@/questionrepo/MongoQuestionRepository";

interface Props {
  question: Question;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
function UpdateQuestionForm({ question, setOpen }: Props) {
  console.log(question._id);

  const { setIsChanged } = useContext(IsChangedContext);

  const { toast } = useToast();

  const [title, setTitle] = useState<string>(question.questionTitle);
  const [description, setDescription] = useState<string>(
    question.questionDescription
  );
  const [complexity, setComplexity] = useState<QuestionDifficulty>(
    question.questionDifficulty
  );
  const [link, setLink] = useState<string>("");

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const error = invalidForm();
    if (error) {
      return toast({
        variant: "destructive",
        title: "Uh oh!",
        description: error,
      });
    }

    try {
      // const newQuestion: Question = {
      //   _id: question._id,
      //   questionTitle: title,
      //   questionDescription: description,
      //   questionDifficulty: complexity,
      //   questionCategories: question.questionCategories,
      //   questionId: question.questionId, // just set a dummy value first will think of how to do this better later
      // };
      // // If no change, close
      // if (areQuestionsEqual(newQuestion, question)) {
      //   setOpen(false);
      //   return toast({
      //     title: "You have not made any new changes",
      //   });
      // }

      // Use the LocalQuestionRepository to save the question
      // const isSaved = LocalQuestionRepository.updateQuestion(
      //   newQuestion,
      //   question._id
      // );
      // const isSaved = await MongoQuestionRepository.updateQuestion(
      //   newQuestion,
      //   question._id
      // );
      await MongoQuestionRepository.updateQuestion(
        title,
        description,
        [],
        complexity,
        question._id
      );
      setIsChanged(true);
      setOpen(false);
      return toast({
        title: "Success!",
        description: "A question has successfully been updated.",
      });
    } catch (err) {
      console.error(err);
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
        <Button type="submit">Update Question</Button>
      </form>
    </div>
  );
}

export default UpdateQuestionForm;
