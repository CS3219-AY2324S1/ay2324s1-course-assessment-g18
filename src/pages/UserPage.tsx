import "./UserPage.css";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import UserList from "@/components/users/UserList";
import { useState } from "react";

function UserPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="user-main">
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        openSidebar={openSidebar}
      />
      <UserList />
    </div>
  );
}

export default UserPage;
