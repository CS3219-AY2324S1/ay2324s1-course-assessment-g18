import { DialogTitle } from "@/components/ui/dialog";
import { QuestionDifficulty } from "@/questionrepo/question.model";
import React, { SetStateAction, useState } from "react";
import "./MatchDialogue.css";
import { Separator } from "@/components/ui/separator";
interface Props {
  difficulty: QuestionDifficulty;
  setChose: Dispatch<SetStateAction<boolean>>;
}
function WaitingMatch({ difficulty, setChose }: Props) {
  // hard code the preferences selected for now
  return (
    <div>
      <DialogTitle className="">New Session Started</DialogTitle>
      <div className="ellipses">PeerPrep is matching you with a peer...</div>
      <Separator className="w-3/4" />
      <div className="flex flex-col gap-2 pt-3">
        <div className="text-slate-500">You have selected:</div>
        <div className="flex flex-row w-full items-center gap-3 text-slate-500">
          Difficulty:{" "}
          <div
            className={`w-20 rounded-md p-1 text-center ${
              difficulty == QuestionDifficulty.Easy
                ? "bg-green-200 text-green-600"
                : difficulty == QuestionDifficulty.Medium
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-200 text-red-600"
            }`}
          >
            {difficulty}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitingMatch;
