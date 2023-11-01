import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { chatSocket, matchingSocket } from "../match/sockets";

function EndDialog() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [openDialog, setOpenDialog] = useState(false);
  const handleEnd = () => {
    navigate("/user-dashboard");
    console.log("leaving session");
    matchingSocket.emit("leaveSession", {
      roomId: localStorage.getItem("roomId"),
    });
    chatSocket.emit("leaveSession", { roomId: localStorage.getItem("roomId") });
    localStorage.removeItem("roomId");
    toast({
      title: "Session ended!",
      description:
        "Congratulations, you have successfully completed a session.",
    });
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>End Session</AlertDialogTitle>
        <AlertDialogDescription>
          Are you sure you want to end the session with your peer?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setOpenDialog(false)}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction onClick={handleEnd}>Confirm</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
export default EndDialog;
