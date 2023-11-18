import CustomDialog from "@/components/dialog/CustomDialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { User } from "@/userRepo/user.model";
import { Dispatch, SetStateAction } from "react";
import UpdateUserForm from "../../update-user/UpdateUserForm";
import { useState } from "react";

interface Props {
  user: User;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

function UpdateDialog({ user, setIsChanged }: Props) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
          Edit
        </div>
      </DialogTrigger>
      <CustomDialog dialogTitle="Edit User">
        <UpdateUserForm
          user={user}
          setOpen={setOpen}
          setIsChanged={setIsChanged}
        />
      </CustomDialog>
    </Dialog>
  );
}

export default UpdateDialog;
