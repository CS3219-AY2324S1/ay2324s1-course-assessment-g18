import { QuestionDifficulty } from "@/questionrepo/question.model";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./MatchDialog.css";
import CustomDialog from "@/components/dialog/CustomDialog";
import ChooseMatch from "./ChooseMatch";
import WaitingMatch from "./WaitingMatch";
import ReMatch from "./ReMatch";
interface Props {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;

  openDialog: boolean;
}
function MatchDialog({ setOpenDialog, openDialog }: Props) {
  // hard code the preferences selected for now
  const [difficulty, setDifficulty] = useState(QuestionDifficulty.Easy);
  const [chosen, setchosen] = useState(false);
  const [rematch, setRematch] = useState(false);

  useEffect(() => {
    if (!openDialog) {
      setchosen(false);
      setRematch(false);
    }
  }, [openDialog]);
  return (
    <CustomDialog dialogTitle="">
      {rematch ? (
        <ReMatch
          setRematch={setRematch}
          setChosen={setchosen}
          setOpenDialog={setOpenDialog}
        />
      ) : !chosen ? (
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
          setRematch={setRematch}
        />
      )}
    </CustomDialog>
  );
}

export default MatchDialog;
