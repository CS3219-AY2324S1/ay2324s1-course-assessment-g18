import DifficultySelect from "@/components/form/DifficultySelect";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { QuestionDifficulty } from "@/questionrepo/question.model";
import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  difficulty: QuestionDifficulty;
  setDifficulty: Dispatch<SetStateAction<QuestionDifficulty>>;
  setChose: Dispatch<SetStateAction<boolean>>;
}
function ChooseMatch({ difficulty, setDifficulty, setChose }: Props) {
  const [error, setError] = useState<string>("");
  const handleSubmit = () => {
    // matching logic here
    console.log("choose");
    setChose(true);
  };
  return (
    <div>
      <DialogTitle className="pb-3">Select your Preferences</DialogTitle>
      <div className="">
        PeerPrep will attempt to pair you with another user who shares the same
        preferences.
      </div>
      <form onSubmit={handleSubmit} className="pt-3 pb-3 mt-3">
        <Label>Question difficulty:</Label>
        <DifficultySelect data={difficulty} setData={setDifficulty} />
        <Button type="submit">Confirm</Button>
      </form>
    </div>
  );
}

export default ChooseMatch;
