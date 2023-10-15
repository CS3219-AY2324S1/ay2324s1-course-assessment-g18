import "./UserDashboardPage.css";
import UserDashboardStats from "@/components/user-dashboard/statistics/UserDashboardStats";
import HistoryList from "@/components/user-dashboard/history-list/HistoryList";
import FallbackHistoryRepository from "@/userHistoryRepo/FallbackHistoryRepository";

function UserDashboardPage() {
  return (
    <div className="user-dashboard-main">
      <div>NAVBAR HERE</div>
      <UserDashboardStats />
      <HistoryList data={FallbackHistoryRepository.getHistory()} />
    </div>
  );
}

export default UserDashboardPage;
