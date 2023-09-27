import "./UserPage.css";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import UserList from "@/components/users/user-list/UserList";
import { useState } from "react";

interface Props {
  handleClickDashboard: (event: React.MouseEvent) => void;
  handleClickUser: (event: React.MouseEvent) => void;
}

function UserPage({ handleClickDashboard, handleClickUser }: Props) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="user-main">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        openSidebar={openSidebar}
        handleClickDashboard={handleClickDashboard}
        handleClickUser={handleClickUser}
      />
      <UserList />
    </div>
  );
}

export default UserPage;
