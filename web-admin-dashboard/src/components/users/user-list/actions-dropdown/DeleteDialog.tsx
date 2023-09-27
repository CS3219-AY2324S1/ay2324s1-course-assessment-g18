import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { User } from "@/userRepo/user.model";
import { Dispatch, SetStateAction, useState } from "react";
import DeleteUserDialog from "../../delete-user/DeleteUserDialog";

interface Props {
  user: User;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

function DeleteDialog({ user, setIsChanged }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTitle asChild>
        <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Delete
        </div>
      </AlertDialogTitle>
      <AlertDialogContent>
        <DeleteUserDialog
          user={user}
          setOpen={setOpen}
          setIsChanged={setIsChanged}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteDialog;
