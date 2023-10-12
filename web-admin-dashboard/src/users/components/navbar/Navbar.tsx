import React from "react";
import "./Navbar.css";
import logo from "./../../../assets/dashboard/logo.svg";
import profileIcon from "../../assets/profile-icon.jpeg";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Navbar() {
  return (
    <div className="w-screen h-screen flex p-5">
      <NavigationMenu className="h-11 w-full flex max-w-none justify-between align-center px-5">
        {/* left side */}
        <NavigationMenuList className="w-full">
          <NavigationMenuItem className="flex gap-5 items-center">
            <img src={logo} className="logo" />
            <div className="">PeerPrep</div>
          </NavigationMenuItem>
        </NavigationMenuList>
        {/* right side */}
        <NavigationMenuList className="gap-5">
          <NavigationMenuItem>
            <button className="match-btn">Match</button>
          </NavigationMenuItem>
          <NavigationMenuItem className="">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
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
                <DropdownMenuItem className="flex gap-3 cursor-pointer">
                  {" "}
                  <BiLogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

export default Navbar;
