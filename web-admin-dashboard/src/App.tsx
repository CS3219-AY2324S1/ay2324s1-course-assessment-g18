import DashboardPage from "./pages/DashboardPage";
import "./App.css";
import UserPage from "./pages/UserPage";
import { useEffect, useState } from "react";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [showDashboardPage, setShowDashboardPage] = useState(
    localStorage.getItem("currentPage") === "UserPage" ? false : true
  );
  const [showUserPage, setShowUserPage] = useState(!showDashboardPage);

  useEffect(() => {
    localStorage.setItem(
      "currentPage",
      showDashboardPage ? "DashboardPage" : "UserPage"
    );
  }, [showDashboardPage]);

  function handleClickDashboard(event: React.MouseEvent) {
    event.preventDefault();
    setShowDashboardPage(true);
    setShowUserPage(false);
  }

  function handleClickUser(event: React.MouseEvent) {
    event.preventDefault();
    setShowDashboardPage(false);
    setShowUserPage(true);
  }

  return (
    <div>
      {showDashboardPage && (
        <DashboardPage
          handleClickDashboard={handleClickDashboard}
          handleClickUser={handleClickUser}
        />
      )}
      {showUserPage && (
        <UserPage
          handleClickDashboard={handleClickDashboard}
          handleClickUser={handleClickUser}
        />
      )}
      <Toaster />
    </div>
  );
}

export default App;
