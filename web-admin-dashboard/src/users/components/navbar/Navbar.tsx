import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "./../../../assets/dashboard/logo.svg";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import SettingsDropdown from "./settings-dropdown/SettingsDropdown";
import EndBtn from "./end-btn/EndBtn";
import MatchBtn from "./match-btn/MatchBtn";

function Navbar() {
  const location = useLocation();

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col">
      <NavigationMenu className="h-13 w-full flex max-w-none justify-between align-center px-5 bg-white pt-[10px] pb-[10px] pl-[25px] pr-[25px]">
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
            {location.pathname === "/session" ? (
              <EndBtn openDialog={openDialog} setOpenDialog={setOpenDialog} />
            ) : (
              <MatchBtn openDialog={openDialog} setOpenDialog={setOpenDialog} />
            )}
          </NavigationMenuItem>
          <NavigationMenuItem className="">
            <SettingsDropdown />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <Outlet />
    </div>
  );
}
export default Navbar;
