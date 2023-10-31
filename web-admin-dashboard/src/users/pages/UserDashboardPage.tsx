import "./UserDashboardPage.css";
import UserDashboardStats from "@/users/components/user-dashboard/statistics/UserDashboardStats";
import HistoryList from "@/users/components/user-dashboard/history-list/HistoryList";
import FallbackHistoryRepository from "@/users/userHistoryRepo/FallbackHistoryRepository";
import { useContext, useEffect } from "react";
import { matchingSocket } from "../components/match/sockets";
import { AuthContext } from "@/context/AuthProvider";

function UserDashboardPage() {
  const { authState } = useContext(AuthContext);
  const user = authState.userInfo;
  useEffect(() => {
    const leaveRoom = () => {
      if (localStorage.getItem("roomId")) {
        matchingSocket.emit("leaveSession", {
          roomId: localStorage.getItem("roomId"),
        });
        console.log("left session");
      }
    };
    const leaveQueue = () => {
      matchingSocket.emit("matchingCancel", {
        userId: user.username,
      });
      console.log("matching cancelled");
    };
    leaveRoom();
    leaveQueue();
  }, []);

  return (
    <HistoryRepoContext.Provider value={{ historyRepo, setHistoryRepo }}>
      <div className="user-dashboard-main">
        <UserDashboardStats />
        <HistoryList data={data} />
      </div>
    </HistoryRepoContext.Provider>
  );
}

export default UserDashboardPage;
