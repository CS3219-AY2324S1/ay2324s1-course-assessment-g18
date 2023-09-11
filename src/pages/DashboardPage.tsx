import React from "react";
import "./DashboardPage.css";
import DashboardStats from "@/components/dashboard/statistics/DashboardStats";
import "./DashboardPage.css";
function DashboardPage() {
  return (
    <div className="dashboard-main">
      <div className="dashboard-content">
        <DashboardStats />
      </div>
    </div>
  );
}

export default DashboardPage;
