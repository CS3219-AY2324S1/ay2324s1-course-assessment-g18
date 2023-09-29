import { BsGrid1X2Fill, BsPeopleFill, BsFillGearFill } from "react-icons/bs";
import "../../../pages/DashboardPage.css";
import "./Sidebar.css";
import logo from "../../../assets/dashboard/logo.svg";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  openSidebar: () => void;
  openSidebarToggle: boolean;
}
function Sidebar({ openSidebarToggle, openSidebar }: Props) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <img src={logo} />
        <span className="icon close_icon" onClick={openSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <CustomLink to="/">
          <BsGrid1X2Fill className="icon" />
          Dashboard
        </CustomLink>
        <CustomLink to="/users">
          <BsPeopleFill className="icon" /> Users
        </CustomLink>
        <CustomLink to="/setting">
          <BsFillGearFill className="icon" /> Settings
        </CustomLink>

        <CustomLink to="/login">
          <div>Login</div>
        </CustomLink>
      </ul>
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
    <li className={isActive ? "active" : "inactive"}>
      <Link className={"link"} to={to}>
        {children}
      </Link>
    </li>
  );
}

export default Sidebar;
