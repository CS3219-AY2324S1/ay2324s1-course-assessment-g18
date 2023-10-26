import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { chatSocket, matchingSocket } from "../../match/sockets";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  peer: string;
}
function PeerLeftDialog({ peer }: Props) {
  const [openDialog, setOpenDialog] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const handleEnd = () => {
    navigate("/user-dashboard");
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
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{peer} has left the session</AlertDialogTitle>
          <AlertDialogDescription>
            Continue staying in this session?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpenDialog(false)}>
            Stay
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleEnd}>Leave</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PeerLeftDialog;
