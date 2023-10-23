import { DialogTitle } from "@/components/ui/dialog";
import { QuestionDifficulty } from "@/questionrepo/question.model";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./MatchDialog.css";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import DifficultyBtn from "../buttons/DifficultyBtn";
import { chatSocket, matchingSocket } from "./sockets";


interface Props {
  difficulty: QuestionDifficulty;
  setChosen: Dispatch<SetStateAction<boolean>>;
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}
function WaitingMatch({ difficulty, setChosen, setOpenDialog }: Props) {
  const navigate = useNavigate();
  matchingSocket.on("matchSuccess", (payload) => {
    const { roomId } = payload;
    chatSocket.emit('joinRoom', {roomId, toLeaveRoom: ""});
    navigate("/session", {state: {roomId: roomId}});
    setOpenDialog(false);
  });
//   useEffect(() => {
//     setTimeout(() => {
//       navigate("/session");
//       setOpenDialog(false);
//     }, 3000);
//   }, []);

  return (
    <div>
      <DialogTitle className="">New Session Started</DialogTitle>
      <div className="ellipses">PeerPrep is matching you with a peer...</div>
      <Separator className="w-3/4" />
      <div className="flex flex-col gap-2 pt-3">
        <div className="text-slate-500">You have selected:</div>
        <div className="flex flex-row w-full items-center gap-3 text-slate-500">
          Difficulty: <DifficultyBtn level={difficulty} />
        </div>
      </div>
    </div>
  );
}

export default WaitingMatch;
