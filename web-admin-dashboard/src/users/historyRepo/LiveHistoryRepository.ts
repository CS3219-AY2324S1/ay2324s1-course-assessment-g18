import { History } from './history.model';
import api from '@/utils/api';

class LiveHistoryRepository {
  config;

  constructor() {
    this.config = {
      baseUrl: import.meta.env.VITE_BASE_HISTORY_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
  }

  async getHistory(): Promise<History[]> {
    try {
      // get userEmail from localStorage
      const userInfoJSON = localStorage.getItem('userInfo');

      if (userInfoJSON) {
        const userInfo = JSON.parse(userInfoJSON);
        const userEmail = userInfo.email;
        const res = await api.get(`/history/${userEmail}`, this.config);
        const data: History[] = res.data;
        console.log(data);
        return data;
      } else {
        console.log('User info not found in localStorage');
        return [] as History[];
      }
    } catch (error) {
      console.log(error);
      return [] as History[];
    }
  }

  async saveHistory(
    userEmail: string,
    questionId: string,
    questionTitle: string,
    questionDescription: string,
    questionDifficulty: string,
    chatHistory: string,
    codeExecuted: string,
  ): Promise<History> {
    const res = await api.post(
      '/history',
      {
        userEmail,
        questionId,
        questionTitle,
        questionDescription,
        questionDifficulty,
        chatHistory,
        codeExecuted,
      },
      this.config,
    );
    const parsed = res.data as History;
    return parsed;
  }
}

export default LiveHistoryRepository;
