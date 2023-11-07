import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteMyself } from "@/users/auth/authentication";
import { AuthContext } from "@/context/AuthProvider";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

interface ConfirmDeleteDialog {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function ConfirmDeleteDialog({ setIsOpen }: ConfirmDeleteDialog) {
  const { authState, setAuthState } = useContext(AuthContext);
  const user = authState.userInfo;
  const navigate = useNavigate();
  const deleteAccount = async () => {
    try {
      await deleteMyself(user.email);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      // TO CHANGE ONCE MY PR MERGE
      navigate("/login");
      setAuthState({
        userInfo: {},
        loggedIn: false,
      });
      toast({
        title: "Success!",
        description: "Your account has been deleted.",
      });
    } catch (e) {
      console.log(e);
      toast({
        title: "Oops",
        variant: "destructive",
        description: "Something went wrong while deleting your accont.",
      });
    }
  };
  const [openDialog, setOpenDialog] = useState(true);

  return (
    <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
      <AlertDialogTrigger asChild>
        <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"></div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Account Confirmation</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete your account?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={deleteAccount}
            className="bg-accent text-red-500 hover:bg-red-500 hover:text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmDeleteDialog;
