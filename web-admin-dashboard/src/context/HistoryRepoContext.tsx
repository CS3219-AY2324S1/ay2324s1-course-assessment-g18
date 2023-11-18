import LiveHistoryRepository from '@/users/historyRepo/LiveHistoryRepository';
import { createContext } from 'react';

export const HistoryRepoContext = createContext({
  historyRepo: new LiveHistoryRepository(),
  setHistoryRepo: (historyRepo: LiveHistoryRepository) => {},
});
