import { QuestionDifficulty } from "@/questionrepo/question.model";
import React from "react";

interface Props {
  level: string;
}
function DifficultyBtn({ level }: Props) {
  return (
    <div
      className={`w-20 rounded-md p-1 text-center ${
        level == QuestionDifficulty.Easy
          ? "bg-green-200 text-green-600"
          : level == QuestionDifficulty.Medium
          ? "bg-yellow-100 text-yellow-600"
          : "bg-red-200 text-red-600"
      }`}
    >
      {level}
    </div>
  );
}

export default DifficultyBtn;
