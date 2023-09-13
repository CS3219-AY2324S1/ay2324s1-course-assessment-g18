import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuestionDifficulty } from "@/models/question.model";
import { Dispatch, SetStateAction } from "react";
import "./Input.css";
interface Props {
  setData: Dispatch<SetStateAction<QuestionDifficulty>>;
  data: string;
}
export default function DifficultySelect({ setData }: Props) {
  return (
    <div className="input-div">
      <Select
        onValueChange={(value) => {
          const val: QuestionDifficulty = value as QuestionDifficulty;
          setData(val);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Difficulty" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={QuestionDifficulty[QuestionDifficulty.Easy]}>
            Easy
          </SelectItem>
          <SelectItem value={QuestionDifficulty[QuestionDifficulty.Medium]}>
            Medium
          </SelectItem>
          <SelectItem value={QuestionDifficulty[QuestionDifficulty.Hard]}>
            Hard
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
