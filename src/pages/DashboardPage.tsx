import "./DashboardPage.css";
import DashboardStats from "@/components/dashboard/statistics/DashboardStats";
import Sidebar from "@/components/dashboard/sidebar/SideBar";
import { useState } from "react";

function DashboardPage() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className="dashboard-main">
      <DashboardStats />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
    </div>
  );
}

export default DashboardPage;
