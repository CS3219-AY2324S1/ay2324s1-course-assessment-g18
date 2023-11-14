import './UserDashboardStats.css';
import '../../../pages/UserDashboardPage.css';
import qnsIcon from '../../../../assets/dashboard/total-qns.svg';
import activeIcon from '../../../../assets/dashboard/active-now.svg';
import membersIcon from '../../../../assets/dashboard/members.svg';

interface Props {
  easy: number;
  medium: number;
  hard: number;
}

function UserDashboardStats({ easy, medium, hard }: Props) {
  return (
    <div className="user-dashboard-stats">
      <div className="main-content">
        <div className="sub-div">
          <img src={qnsIcon} />
          <div className="text-container">
            <div className="difficulty">Easy</div>
            <div className="questions-completed">{easy}</div>
            <div className="sub-text">Questions attempted</div>
          </div>
        </div>
        <div className="sub-div">
          <img src={membersIcon} />
          <div className="text-container">
            <div className="difficulty">Medium</div>
            <div className="questions-completed">{medium}</div>
            <div className="sub-text">Questions attempted</div>
          </div>
        </div>
        <div className="sub-div">
          <img src={activeIcon} />
          <div className="text-container">
            <div className="difficulty">Hard</div>
            <div className="questions-completed">{hard}</div>
            <div className="sub-text">Questions attempted</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboardStats;
