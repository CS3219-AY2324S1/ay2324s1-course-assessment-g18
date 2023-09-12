import "./DashboardPage.css";
import DashboardStats from "../components/dashboard/statistics/DashboardStats";
import Sidebar from "../components/dashboard/sidebar/Sidebar";
import { useState } from "react";

function DashboardPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <div className="dashboard-main">
      <DashboardStats />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        openSidebar={openSidebar}
      />
    </div>
  );
}

export default DashboardPage;
