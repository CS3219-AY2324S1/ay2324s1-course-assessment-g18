import "./DashboardPage.css";
import DashboardStats from "@/components/dashboard/statistics/DashboardStats";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import { useState } from "react";
import UserList from "@/components/dashboard/users/UserList";

function DashboardPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  function handleClickUsers() {
    setShowUsers(!showUsers);
  }

  return (
    <div className="dashboard-main">
      <DashboardStats />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        openSidebar={openSidebar}
        handleClickUsers={handleClickUsers}
      />
      {showUsers && <UserList />}
    </div>
  );
}

export default DashboardPage;
