import { QuestionDifficulty } from "@/questionrepo/question.model";
import React, { Dispatch, SetStateAction, useState } from "react";
import "./MatchDialogue.css";
import CustomDialog from "@/components/dialog/CustomDialog";
import ChooseMatch from "./ChooseMatch";
import WaitingMatch from "./WaitingMatch";
interface Props {
  chose: boolean;
  setChose: Dispatch<SetStateAction<boolean>>;
}
function MatchDialogue({ chose, setChose }: Props) {
  // hard code the preferences selected for now
  const [difficulty, setDifficulty] = useState(QuestionDifficulty.Easy);
  return (
    <CustomDialog dialogTitle="">
      {!chose ? (
        <ChooseMatch
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          setChose={setChose}
        />
      ) : (
        <WaitingMatch difficulty={difficulty} setChose={setChose} />
      )}
    </CustomDialog>
  );
}

export default MatchDialogue;
