import React, { useState } from "react";
import { BsGrid1X2Fill, BsPeopleFill, BsFillGearFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";
import "../../../pages/DashboardPage.css";
import "./Sidebar.css";
import logo from "../../../assets/dashboard/logo.svg";
import { Link, useResolvedPath, useMatch, Outlet } from "react-router-dom";
import { ReactNode } from "react";
import LogoutDialog from "./LogoutDialog"; // Import the LogoutDialog component
import { UserRepoContext } from "@/context/UserRepoContext";

interface Props {
  openSidebar: () => void;
  openSidebarToggle: boolean;
}

function Sidebar() {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const openLogoutDialog = () => {
    setIsLogoutDialogOpen(true);
  };

  const closeLogoutDialog = () => {
    setIsLogoutDialogOpen(false);
  };

  return (
    <div className="w-screen h-screen flex flex-row">
      <aside className="flex-col h-13 w-[280px] flex align-center px-5 bg-white pt-[10px]">
        <div className="sidebar-title">
          <img src={logo} />
          <span className="icon close_icon">X</span>
        </div>

        <ul className="sidebar-list">
          <CustomLink to="/dashboard">
            <BsGrid1X2Fill className="icon" />
            Dashboard
          </CustomLink>
          <CustomLink to="/users">
            <BsPeopleFill className="icon" /> Users
          </CustomLink>
          <CustomLink to="/setting">
            <BsFillGearFill className="icon" /> Settings
          </CustomLink>

          <li className="inactive" onClick={openLogoutDialog}>
            <span className="link">
              <BiLogOut className="icon" /> Logout
            </span>
          </li>
        </ul>

        {isLogoutDialogOpen && (
          <LogoutDialog setIsLogoutDialogOpen={closeLogoutDialog} />
        )}
      </aside>
      <Outlet />
    </div>
  );
}

interface CustomLinkProps {
  to: string;
  children: ReactNode;
}

function CustomLink({ to, children }: CustomLinkProps) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : "inactive"}>
      <Link className={"link"} to={to}>
        {children}
      </Link>
    </li>
  );
}

export default Sidebar;
