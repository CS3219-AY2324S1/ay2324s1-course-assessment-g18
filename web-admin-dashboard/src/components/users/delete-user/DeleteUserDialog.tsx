import {
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { UserRepoContext } from "@/context/UserRepoContext";
import { User } from "@/userRepo/user.model";

import { SetStateAction, useContext } from "react";
import { Dispatch } from "react";
import { useState } from "react";

interface Props {
  user: User;
  setOpen: (open: boolean) => void;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

function DeleteUserDialog({ user, setOpen, setIsChanged }: Props) {
  const { userRepo } = useContext(UserRepoContext);
  const [setOpenDialog] = useState(false);
  const [err] = useState("");

  const { toast } = useToast();

  async function onDelete() {
    try {
      setIsChanged(false);
      const isDeleted = await userRepo.deleteUser(user.email);

      if (isDeleted) {
        console.log("Successfully deleted");
        setIsChanged(true);
        setOpen(false);
        toast({
          title: "Success!",
          description: "The user has been successfully deleted.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "A problem occured while deleting the user.",
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
      });
    }
  }

  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the user.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={() => setOpen(false)}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction
          onClick={onDelete}
          className="bg-[#5562eb] hover:bg-[#6470ee]"
        >
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
      {err && <div className="text=red-800">{err}</div>}
    </>
  );
}

export default DeleteUserDialog;
