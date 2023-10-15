import "./UserDashboardStats.css";
import "../../../pages/UserDashboardPage.css";
import qnsIcon from "../../../assets/dashboard/total-qns.svg";
import activeIcon from "../../../assets/dashboard/active-now.svg";
import membersIcon from "../../../assets/dashboard/members.svg";

function UserDashboardStats() {
  return (
    <div className="user-dashboard-stats">
      <div className="main-content">
        <div className="sub-div">
          <img src={qnsIcon} />
          <div className="text-container">
            <div className="difficulty">Easy</div>
            <div className="questions-completed">6</div>
            <div className="sub-text">16% this month</div>
          </div>
        </div>
        <div className="sub-div">
          <img src={membersIcon} />
          <div className="text-container">
            <div className="difficulty">Medium</div>
            <div className="questions-completed">18</div>
            <div className="sub-text">16% this month</div>
          </div>
        </div>
        <div className="sub-div">
          <img src={activeIcon} />
          <div className="text-container">
            <div className="difficulty">Hard</div>
            <div className="questions-completed">19</div>
            <div className="sub-text">16% this month</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboardStats;
