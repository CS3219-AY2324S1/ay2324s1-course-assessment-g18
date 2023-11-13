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
    }

    getDataBackend();
  }, [historyRepo]);

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
