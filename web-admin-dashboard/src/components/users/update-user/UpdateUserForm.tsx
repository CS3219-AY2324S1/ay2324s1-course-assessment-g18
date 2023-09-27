import CustomInput from "@/components/form/CustomInput";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UserRepoContext } from "@/context/UserRepoContext";
import { User } from "@/userRepo/user.model";
import {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useState,
} from "react";

interface Props {
  user: User;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

function UpdateUserForm({ user, setOpen, setIsChanged }: Props) {
  const { userRepo } = useContext(UserRepoContext);

  const { toast } = useToast();

  const [userName, setUsername] = useState<string>(user.userName);
  const [userEmail, setUserEmail] = useState<string>(user.userEmail);

  async function onSubmit(e: SyntheticEvent) {
    setIsChanged(false);
    e.preventDefault();
    const error = invalidForm();
    if (error) {
      return toast({
        variant: "destructive",
        title: "Uh oh!",
        description: error,
      });
    }

    try {
      await userRepo.updateUser(user.userEmail, userName, userEmail, user.userRole);
      setIsChanged(true);
      setOpen(false);
      return toast({
        title: "Success!",
        description: "A user has successfully been updated.",
      });
    } catch (err) {
      console.error(err);
      return toast({
        variant: "destructive",
        title: "Uh oh!",
      });
    }
  }

  function invalidForm() {
    if (userName.length === 0 || userEmail.length === 0) {
      return "All fields are required.";
    }
  }

  return (
    <div className="form-div">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="flex items-end gap-[10px]">
          <CustomInput label="Username" setData={setUsername} data={userName} />
        </div>
        <div className="flex items-end gap-[10px]">
          <CustomInput
            label="User email"
            setData={setUserEmail}
            data={userEmail}
          />
        </div>
        <div className="flex items-end gap-[10px]">
          <Button type="submit">Update User</Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserForm;
