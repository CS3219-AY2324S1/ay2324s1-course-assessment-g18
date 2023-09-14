import "./DashboardStats.css";
import "../../../pages/DashboardPage.css";
import qnsIcon from "../../../assets/dashboard/total-qns.svg";
import activeIcon from "../../../assets/dashboard/active-now.svg";
import membersIcon from "../../../assets/dashboard/members.svg";

interface Props {
  dataLen: number;
}
function DashboardStats({ dataLen }: Props) {
  return (
    <div className="dashboard-stats">
      <div className="main-content">
        <div className="sub-div">
          <img src={qnsIcon} />
          <div className="text-container">
            <div className="heading">Total Questions</div>
            <div className="stats-number">{dataLen}</div>
            <div className="sub-text">16% this month</div>
          </div>
        </div>
        <div className="sub-div">
          <img src={membersIcon} />
          <div className="text-container">
            <div className="heading">Members</div>
            <div className="stats-number">150</div>
            <div className="sub-text">16% this month</div>
          </div>
        </div>
        <div className="sub-div">
          <img src={activeIcon} />
          <div className="text-container">
            <div className="heading">Active Now</div>
            <div className="stats-number">53</div>
            <div className="sub-text">16% this month</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
