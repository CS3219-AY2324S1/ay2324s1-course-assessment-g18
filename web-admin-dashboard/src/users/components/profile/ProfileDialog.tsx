import CustomDialog from "@/components/dialog/CustomDialog";
import { Dialog } from "@/components/ui/dialog";
import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useState,
} from "react";
import { AuthContext } from "@/context/AuthProvider";
import CustomInput from "@/components/form/CustomInput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import profileIcon from "../../assets/profile-icon.jpeg";
import { toast } from "@/components/ui/use-toast";
import { updateUsername } from "@/users/auth/authentication";
interface Props {
  isSettingsOpen: boolean;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
}
function ProfileDialog({ isSettingsOpen, setIsSettingsOpen }: Props) {
  const { authState } = useContext(AuthContext);
  const user = authState.userInfo;
  const [username, setUsername] = useState(user.username);
  const [err, setErr] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // logic here
    if (isValid()) {
      try {
        await updateUsername(user.email, username);
        return toast({
          title: "Success!",
          description: "You have successfully changed your username",
        });
      } catch (e) {
        console.log(e);
        return toast({
          variant: "destructive",
          title: "Oops!",
          description: e.response.data.message,
        });
      }
    } else {
      return toast({
        variant: "destructive",
        title: "Oops!",
        description: err,
      });
    }
  };

  const isValid = () => {
    if (username === user.username) {
      return false;
    }
    if (username.length === 0) {
      setErr("Username cannot be empty.");
      return false;
    }
    return true;
  };

  return (
    <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      <CustomDialog dialogTitle="Settings">
        <div>
          <form onSubmit={handleSubmit} className="mt-[10px] gap-[20px] flex">
            <div className="flex flex-row gap-[30px] items-center">
              <img
                src={profileIcon}
                className="w-[80px] h-[80px] rounded-full"
              />
              <div className="w-full flex flex-col gap-[10px]">
                <Label>Registered email</Label>
                <div className="text-sm p-3 bg-slate-100 rounded-sm">
                  {user.email}
                </div>
              </div>
            </div>
            <div className="flex items-end gap-[20px]">
              <CustomInput
                setData={setUsername}
                data={username}
                label="Username"
              />
              <Button
                type="submit"
                className="hover:bg-[#6470ee] bg-[#5562eb] w-[250px]"
              >
                Update Username
              </Button>
            </div>

            <div>{err}</div>

            {/* <Button>Change Password</Button>
            <Separator />
            <Button type="button" className="bg-red-400 hover:bg-[#6470ee]">
              Delete account
            </Button> */}
          </form>
        </div>
      </CustomDialog>
    </Dialog>
  );
}

export default ProfileDialog;
