import { History } from './history.model';
import api from '@/utils/api';

class LiveHistoryRepository {
  config;

  constructor() {
    this.config = {
      baseURL: import.meta.env.VITE_BASE_HISTORY_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
  }

  async getHistory(): Promise<History[]> {
    try {
      const res = await api.get('/history', this.config);
      const data: History[] = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return [] as History[];
    }
  }

  async getHistoryByEmail(): Promise<History[]> {
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

  async updateCode(roomId: string, codeExecuted: string) {
    const res = await api.put(
      `/history/updateCodeExecutedByRoomId/${roomId}`,
      {
        codeExecuted,
      },
      this.config,
    );
    const history = res.data as History;
    return history;
  }

  async updateHistoryById(
    _id: string,
    historyId: number,
    userEmail: string,
    questionId: string,
    questionTitle: string,
    questionDescription: string,
    questionDifficulty: string,
    chatHistory: string,
    codeExecuted: string,
    dateSubmitted: string,
  ) {
    const res = await api.put(
      `/history/${_id}`,
      {
        historyId,
        userEmail,
        questionId,
        questionTitle,
        questionDescription,
        questionDifficulty,
        chatHistory,
        codeExecuted,
        dateSubmitted,
      },
      this.config,
    );
    const history = res.data as History;
    return history;
  }

  async deleteHistoryByEmail() {
    try {
      // get userEmail from localStorage
      const userInfoJSON = localStorage.getItem('userInfo');

      if (userInfoJSON) {
        const userInfo = JSON.parse(userInfoJSON);
        const userEmail = userInfo.email;
        await api.delete(`/history/${userEmail}`, this.config);
        return true;
      } else {
        console.log('User info not found in localStorage');
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
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
