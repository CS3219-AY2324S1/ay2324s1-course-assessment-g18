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
import { UserRole } from "@/userRepo/user.model";
import RoleSelect from "@/components/form/RoleSelect";

interface Props {
  user: User;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

function UpdateUserForm({ user, setOpen, setIsChanged }: Props) {
  const { userRepo } = useContext(UserRepoContext);

  const { toast } = useToast();

  const [username, setUsername] = useState<string>(user.username);
  const [email, setEmail] = useState<string>(user.email);
  const [role, setRole] = useState<string>(user.role);

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
      await userRepo.updateUser(user.email, username, email, role as UserRole);
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
    if (username.length === 0 || email.length === 0) {
      return "All fields are required.";
    }
  }

  return (
    <div className="form-div">
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="flex items-end gap-[10px]">
          <CustomInput label="Username" setData={setUsername} data={username} />
        </div>
        <div className="flex items-end gap-[10px]">
          <CustomInput label="User email" setData={setEmail} data={email} />
        </div>
        <div className="flex items-end gap-[10px]">
          <RoleSelect label="User role" setData={setRole} role={role} />
        </div>
        <div className="flex items-end gap-[10px]">
          <Button type="submit">Update User</Button>
        </div>
      </form>
    </div>
  );
}

export default UpdateUserForm;
