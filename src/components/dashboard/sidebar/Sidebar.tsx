import { BsGrid1X2Fill, BsPeopleFill, BsFillGearFill } from "react-icons/bs";
import "../../../pages/DashboardPage.css";
import "./Sidebar.css";
import logo from "../../../assets/dashboard/logo.svg";

interface Props {
  openSidebar: () => void;
  openSidebarToggle: boolean;
  handleClickDashboard: (event: React.MouseEvent) => void;
  handleClickUser: (event: React.MouseEvent) => void;
}
function Sidebar({
  openSidebarToggle,
  openSidebar,
  handleClickDashboard,
  handleClickUser,
}: Props) {
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
        <li
          className="sidebar-list-item"
          onClick={(e) => handleClickDashboard(e)}
        >
          <a href="">
            <BsGrid1X2Fill className="icon" />
            Dashboard
          </a>
        </li>
        <li className="sidebar-list-item" onClick={(e) => handleClickUser(e)}>
          <a href="">
            <BsPeopleFill className="icon" /> Users
          </a>
        </li>
        <li className="sidebar-list-item">
          <a href="">
            <BsFillGearFill className="icon" /> Setting
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
