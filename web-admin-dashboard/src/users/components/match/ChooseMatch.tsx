import DifficultySelect from "@/components/form/DifficultySelect";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { QuestionDifficulty } from "@/questionrepo/question.model";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { matchingSocket } from "./sockets";
import { AuthContext } from "@/context/AuthProvider";
import { Card, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

function ChooseMatch() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const [difficulty, setDifficulty] = useState<QuestionDifficulty>(
    QuestionDifficulty.Easy
  );
  const user = authState.userInfo;
  const [error, setError] = useState<string>("");
  const handleSubmit = () => {
    // matching logic here
    matchingSocket.emit("match", {
      difficulty: difficulty,
      userId: user.username,
    });
    navigate("/waiting-match", { state: { difficulty: difficulty } });
  };
  return (
    <div className="flex w-screen h-screen items-center justify-center">
      <Card className="p-5 w-[500px]">
        <CardTitle className="pb-3">Select your Preferences</CardTitle>
        <div className="">
          PeerPrep will attempt to pair you with another user who shares the
          same preferences.
        </div>
        <form onSubmit={handleSubmit} className="pt-3 pb-3 mt-3">
          <Label>Question difficulty:</Label>
          <DifficultySelect data={difficulty} setData={setDifficulty} />
          <Button type="submit">Confirm</Button>
        </form>
      </Card>
    </div>
  );
}

export default ChooseMatch;
