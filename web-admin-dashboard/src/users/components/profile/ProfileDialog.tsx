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
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { ChevronLeftIcon } from "lucide-react";
interface Props {
  isSettingsOpen: boolean;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
}
function ProfileDialog({ isSettingsOpen, setIsSettingsOpen }: Props) {
  const { authState } = useContext(AuthContext);
  const user = authState.userInfo;
  const [username, setUsername] = useState(user.username);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPwChange, setPwChange] = useState(false);
  const [currPw, setCurrPw] = useState("");
  const [rePw, setRePw] = useState("");
  const [pw, setPw] = useState("");
  const isValid = () => {
    if (username === user.username) {
      return "Your new username must be different from your current.";
    }
    if (username.length === 0) {
      return "Username cannot be empty.";
    }
    return null;
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    // logic here
    const errors = isValid();

    if (!errors) {
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
        description: errors,
      });
    }
  };

  return (
    <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      <CustomDialog dialogTitle="Settings">
        <div>
          {!openPwChange ? (
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
                  variant="outline"
                  className="text-[#5562eb] w-[240px] hover:text-[#5562eb]"
                >
                  Update Username
                </Button>
              </div>
              <Button
                type="button"
                variant="outline"
                className=""
                onClick={() => setPwChange(true)}
              >
                Change Password
              </Button>
              <Button
                type="button"
                variant="outline"
                className="text-red-500 hover:text-red-500"
                onClick={() => setOpenDelete(true)}
              >
                Delete account
              </Button>
            </form>
          ) : (
            // change password
            <form>
              <div className="flex items-center gap-[10px]">
                <Button
                  variant="ghost"
                  onClick={() => setPwChange(false)}
                  className="w-[50px]"
                >
                  <ChevronLeftIcon />
                </Button>
                <div className="font-semibold">Change Password</div>
              </div>

              <CustomInput
                setData={setCurrPw}
                data={currPw}
                label="Current Password"
              />
              <CustomInput setData={setPw} data={pw} label="New Password" />
              <CustomInput
                setData={setRePw}
                data={rePw}
                label="Re-enter Password"
              />
              <Button className="bg-[#5562eb] hover:bg-[#6470ee]">
                Change Password
              </Button>
            </form>
          )}
        </div>
      </CustomDialog>
      {openDelete && <ConfirmDeleteDialog setIsOpen={setOpenDelete} />}
    </Dialog>
  );
}

export default ProfileDialog;
