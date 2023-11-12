import CustomDialog from "@/components/dialog/CustomDialog";
import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import {
  changePassword,
  getMyself,
  updateUsername,
} from "@/users/auth/authentication";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import { ChevronLeftIcon } from "lucide-react";
import HiddenPwInput from "../form/HiddenPwInput";
import passwordValidator from 'password-validator';
interface Props {
  isSettingsOpen: boolean;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
}
function ProfileDialog({ isSettingsOpen, setIsSettingsOpen }: Props) {
  const { authState, setAuthState } = useContext(AuthContext);
  const user = authState.userInfo;
  const [username, setUsername] = useState(user.username);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPwChange, setPwChange] = useState(false);
  const [currPw, setCurrPw] = useState("");
  const [rePw, setRePw] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const isValid = () => {
    if (username === user.username) {
      return "Your new username must be different from your current.";
    }
    if (username.length < 5) {
      return "Username must be at least 5 characters long.";
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
        const newInfo = await getMyself(user.email);
        if (newInfo) {
          setAuthState({ userInfo: newInfo, loggedIn: true });
          localStorage.setItem("userInfo", JSON.stringify(newInfo));
          return toast({
            title: "Success!",
            description: "You have successfully changed your username",
          });
        }
      } catch (e: any) {
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

  // Create a schema
  var schema = new passwordValidator();
  
  // Add properties to it
  schema
  .is().min(8)                                    // Minimum length 8
  .is().max(100)                                  // Maximum length 100
  .has().uppercase()                              // Must have uppercase letters
  .has().lowercase()                              // Must have lowercase letters
  .has().digits(1)                                // Must have at least 1 digits
  .has().not().spaces()                           // Should not have spaces
  .is().not().oneOf(['Passw0rd', 'Password123']) // Blacklist these values
  .has().symbols(1);
  
  const checkPasswords = () => {
    if (currPw === pw) {
      return "New password cannot be the same as current password.";
    }
    if (pw !== rePw) {
      return "New and re-entered passwords do not match.";
    }
    const pwerror = schema.validate(pw, { list: true });
    if (Array.isArray(pwerror) && pwerror.length > 0) {
      console.log(pwerror);
      return "Password must be at least 8 characters long, have at least 1 uppercase letter, 1 lowercase letter, 1 digit and no spaces";
    }
    return null;
  };

  const changePw = async (e: SyntheticEvent) => {
    e.preventDefault();
    const errors = checkPasswords();
    if (!errors) {
      try {
        await changePassword(currPw, pw, user.email);
        setPw("");
        setCurrPw("");
        setRePw("");
        return toast({
          title: "Success!",
          description: "You have successfully changed your password.",
        });
      } catch (e: any) {
        console.log(e);
        return toast({
          variant: "destructive",
          title: "Oops!",
          description: e.response.data.message,
        });
      }
    } else {
      setErr(errors);
    }
  };

  return (
    <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
      <div>
        {!openPwChange ? (
          <CustomDialog dialogTitle="Your Profile">
            <form onSubmit={handleSubmit} className="pt-[10px] gap-[20px] flex">
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
          </CustomDialog>
        ) : (
          <CustomDialog dialogTitle="">
            <div className="flex items-center gap-[10px]">
              <Button
                variant="ghost"
                onClick={() => setPwChange(false)}
                className="w-[50px]"
              >
                <ChevronLeftIcon />
              </Button>
              <DialogTitle>Change Password</DialogTitle>
            </div>

            <div className="flex flex-col gap-[15px] pt-2">
              <CustomInput
                setData={setCurrPw}
                data={currPw}
                label="Current Password"
              />
              <HiddenPwInput setData={setPw} data={pw} label="New Password" />
              <HiddenPwInput
                setData={setRePw}
                data={rePw}
                label="Re-enter Password"
              />
              <div className="text-red-500 mt-2 mb-2">{err}</div>
              <Button
                className="bg-[#5562eb] hover:bg-[#6470ee]"
                onClick={changePw}
              >
                Change Password
              </Button>
            </div>
          </CustomDialog>
        )}
      </div>
      {/* </CustomDialog> */}
      {openDelete && <ConfirmDeleteDialog setIsOpen={setOpenDelete} />}
    </Dialog>
  );
}

export default ProfileDialog;
