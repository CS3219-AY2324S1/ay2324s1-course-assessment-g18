import React, { useState } from 'react';
import { BsGrid1X2Fill, BsPeopleFill, BsFillGearFill } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';
import '../../../pages/DashboardPage.css';
import './Sidebar.css';
import logo from '../../../assets/dashboard/logo.svg';
import { Link, useResolvedPath, useMatch } from 'react-router-dom';
import { ReactNode } from 'react';
import LogoutDialog from './LogoutDialog'; // Import the LogoutDialog component

interface Props {
  openSidebar: () => void;
  openSidebarToggle: boolean;
}

function Sidebar({ openSidebarToggle, openSidebar }: Props) {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const openLogoutDialog = () => {
    setIsLogoutDialogOpen(true);
  };

  const closeLogoutDialog = () => {
    setIsLogoutDialogOpen(false);
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
      <div className="sidebar-title">
        <img src={logo} />
        <span className="icon close_icon" onClick={openSidebar}>
          X
        </span>
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

      {isLogoutDialogOpen && <LogoutDialog onCancel={closeLogoutDialog} />}
    </aside>
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
    <li className={isActive ? 'active' : 'inactive'}>
      <Link className={'link'} to={to}>
        {children}
      </Link>
    </li>
  );
}

export default Sidebar;

