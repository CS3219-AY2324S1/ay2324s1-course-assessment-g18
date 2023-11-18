import './UserDashboardPage.css';
import UserDashboardStats from '@/users/components/user-dashboard/statistics/UserDashboardStats';
import HistoryList from '@/users/components/user-dashboard/history-list/HistoryList';
import { useContext, useEffect, useState } from 'react';
import { matchingSocket } from '../components/match/sockets';
import { AuthContext } from '@/context/AuthProvider';
import LiveHistoryRepository from '../historyRepo/LiveHistoryRepository';
import { HistoryRepoContext } from '@/context/HistoryRepoContext';
import { History } from '../historyRepo/history.model';

function UserDashboardPage() {
  const { authState } = useContext(AuthContext);
  const user = authState.userInfo;
  const [data, setData] = useState<History[]>([]);
  const [historyRepo, setHistoryRepo] = useState<LiveHistoryRepository>(
    new LiveHistoryRepository(),
  );
  const [easy, setEasy] = useState<number>(0);
  const [medium, setMedium] = useState<number>(0);
  const [hard, setHard] = useState<number>(0);

  useEffect(() => {
    const leaveRoom = () => {
      if (localStorage.getItem('roomId')) {
        matchingSocket.emit('leaveSession', {
          roomId: localStorage.getItem('roomId'),
        });
        console.log('left session');
      }
    };
    leaveRoom();
  }, []);

  useEffect(() => {
    async function getDataBackend() {
      const res: History[] = await historyRepo.getHistoryByEmail();
      setData(res);

      let easyCount = 0;
      let mediumCount = 0;
      let hardCount = 0;

      res.forEach((historyItem) => {
        const difficulty = historyItem.questionDifficulty.toLowerCase();
        if (difficulty === 'easy') {
          easyCount++;
        } else if (difficulty === 'medium') {
          mediumCount++;
        } else if (difficulty === 'hard') {
          hardCount++;
        }
      });

      setEasy(easyCount);
      setMedium(mediumCount);
      setHard(hardCount);
    }

    getDataBackend();
  }, [historyRepo]);

  return (
    <HistoryRepoContext.Provider value={{ historyRepo, setHistoryRepo }}>
      <div className="user-dashboard-main">
        <UserDashboardStats easy={easy} medium={medium} hard={hard} />
        <HistoryList data={data} />
      </div>
    </HistoryRepoContext.Provider>
  );
}

export default UserDashboardPage;
