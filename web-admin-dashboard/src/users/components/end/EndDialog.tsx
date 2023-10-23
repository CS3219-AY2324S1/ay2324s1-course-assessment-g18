import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EndDialog() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [openDialog, setOpenDialog] = useState(false);
  const handleEnd = () => {
    // end session logic
    navigate("/user-dashboard");
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
