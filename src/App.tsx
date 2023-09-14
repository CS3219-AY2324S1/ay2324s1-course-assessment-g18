import DashboardPage from "./pages/DashboardPage";
import "./App.css";
import UserPage from "./pages/UserPage";
import { useState } from "react";

function App() {
  const [showDashboardPage, setShowDashboardPage] = useState(true);
  const [showUserPage, setShowUserPage] = useState(false);

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
    </div>
  );
}

export default App;
