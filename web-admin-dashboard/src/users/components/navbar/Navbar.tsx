import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "./../../../assets/dashboard/logo.svg";
import profileIcon from "../../assets/profile-icon.jpeg";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, Outlet } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import MatchDialogue from "../match/MatchDialogue";
import LogoutDialog from "@/components/dashboard/sidebar/LogoutDialog";

function Navbar() {
  const [openDialogue, setOpenDialogue] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [chose, setChose] = useState(false);

  return (
    <div className="w-screen h-screen flex p-5 flex-col">
      <NavigationMenu className="h-11 w-full flex max-w-none justify-between align-center px-5">
        {/* left side */}
        <NavigationMenuList className="w-full">
          <NavigationMenuItem className="flex gap-5 items-center">
            <img src={logo} className="logo" />
            <Link to="/user-dashboard" className="">
              PeerPrep
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
        {/* right side */}
        <NavigationMenuList className="gap-5">
          <NavigationMenuItem>
            <Dialog open={openDialogue} onOpenChange={setOpenDialogue}>
              <DialogTrigger>
                <div className="match-btn">Match</div>
              </DialogTrigger>
              <MatchDialogue setChose={setChose} chose={chose} />
            </Dialog>
          </NavigationMenuItem>
          <NavigationMenuItem className="">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <img src={profileIcon} className="profile-icon" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-7 mr-5">
                <div className="user-details">
                  <img src={profileIcon} className="profile-img" />
                  <div className="">
                    <DropdownMenuLabel>Mary Tan</DropdownMenuLabel>
                    <DropdownMenuItem>mary@gmail.com</DropdownMenuItem>
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
            </DropdownMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      {isLogoutDialogOpen && (
        <LogoutDialog setIsLogoutDialogOpen={setIsLogoutDialogOpen} />
      )}

      <Outlet />
    </div>
  );
}
export default Navbar;
