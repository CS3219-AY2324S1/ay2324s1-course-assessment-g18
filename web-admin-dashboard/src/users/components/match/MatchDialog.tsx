import { QuestionDifficulty } from "@/questionrepo/question.model";
import React, { Dispatch, SetStateAction, useState } from "react";
import "./MatchDialog.css";
import CustomDialog from "@/components/dialog/CustomDialog";
import ChooseMatch from "./ChooseMatch";
import WaitingMatch from "./WaitingMatch";
interface Props {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}
function MatchDialog({ setOpenDialog }: Props) {
  // hard code the preferences selected for now
  const [difficulty, setDifficulty] = useState(QuestionDifficulty.Easy);
  const [chosen, setchosen] = useState(false);
  return (
    <CustomDialog dialogTitle="">
      {!chosen ? (
        <ChooseMatch
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          setChosen={setchosen}
        />
      ) : (
        <WaitingMatch
          difficulty={difficulty}
          setChosen={setchosen}
          setOpenDialog={setOpenDialog}
        />
      )}
    </CustomDialog>
  );
}

export default MatchDialog;
