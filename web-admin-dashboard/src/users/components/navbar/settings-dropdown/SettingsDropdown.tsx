import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import profileIcon from "../../../assets/profile-icon.jpeg";
import LogoutDialog from "@/components/dashboard/sidebar/LogoutDialog";
import { AuthContext } from "@/context/AuthProvider";

function SettingsDropdown() {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const { authState } = useContext(AuthContext);
  const user = authState.userInfo;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <img src={profileIcon} className="profile-icon" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-7 mr-5">
        <div className="user-details">
          <img src={profileIcon} className="profile-img" />
          <div className="">
            <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
            <DropdownMenuItem>{user.email}</DropdownMenuItem>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-3 cursor-pointer">
          <FiSettings />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-3 cursor-pointer"
          onClick={() => setIsLogoutDialogOpen(true)}
        >
          <BiLogOut />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
      {isLogoutDialogOpen && (
        <LogoutDialog setIsLogoutDialogOpen={setIsLogoutDialogOpen} />
      )}
    </DropdownMenu>
  );
}

export default SettingsDropdown;
