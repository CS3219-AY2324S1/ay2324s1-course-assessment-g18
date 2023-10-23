import './UserDashboardPage.css';
import UserDashboardStats from '@/users/components/user-dashboard/statistics/UserDashboardStats';
import HistoryList from '@/users/components/user-dashboard/history-list/HistoryList';
import { useEffect, useState } from 'react';
import LiveHistoryRepository from '../historyRepo/LiveHistoryRepository';
import { History } from '../historyRepo/history.model';
import { HistoryRepoContext } from '@/context/HistoryRepoContext';

function UserDashboardPage() {
  const [data, setData] = useState<History[]>([]);
  const [historyRepo, setHistoryRepo] = useState<LiveHistoryRepository>(
    new LiveHistoryRepository(),
  );

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
