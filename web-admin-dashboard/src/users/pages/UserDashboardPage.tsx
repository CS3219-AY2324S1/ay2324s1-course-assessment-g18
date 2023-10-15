import "./UserDashboardPage.css";
import UserDashboardStats from "@/users/components/user-dashboard/statistics/UserDashboardStats";
import HistoryList from "@/users/components/user-dashboard/history-list/HistoryList";
import FallbackHistoryRepository from "@/users/userHistoryRepo/FallbackHistoryRepository";

function UserDashboardPage() {
  return (
    <div className="w-full h-full">
      <UserDashboardStats />
      <HistoryList data={FallbackHistoryRepository.getHistory()} />
    </div>
  );
}

export default UserDashboardPage;
