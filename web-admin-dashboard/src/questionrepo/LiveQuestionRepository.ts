import { Question } from '@/questionrepo/question.model';
import api from '@/utils/api';
import FallbackQuestionRepository from './FallbackQuestionRepository';

class LiveQuestionRepository {
  config;

  constructor() {
    this.config = {
      baseURL: import.meta.env.VITE_BASE_QUESTION_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };
  }

  async getQuestions(): Promise<Question[]> {
    try {
      // const res = await axios.get("/questions", this.config);
      const res = await api.get('/questions', this.config);
      const data: Question[] = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return FallbackQuestionRepository.getQuestions() as Question[];
    }
  }

  async getQuestion(id: string): Promise<Question | null> {
    try {
      const res = await api.get(`questions/${id}`, this.config);
      const data: Question = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async updateQuestion(
    questionTitle: string,
    questionDescription: string,
    questionCategories: string[],
    questionDifficulty: string,
    questionExamples: string[][],
    questionConstraints: string,
    questionImages: string,
    id: string,
  ): Promise<Question> {
    const res = await api.put(
      `questions/${id}`,
      {
        questionTitle,
        questionDescription,
        questionCategories,
        questionDifficulty,
        questionExamples,
        questionConstraints,
        questionImages,
      },
      this.config,
    );
    const question = res.data as Question;
    return question;
  }

  async deleteQuestion(id: string) {
    try {
      await api.delete(`questions/${id}`, this.config);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async saveQuestion(
    questionTitle: string,
    questionDescription: string,
    questionCategories: string[],
    questionDifficulty: string,
    questionExamples: string[][],
    questionConstraints: string,
    questionImages: string,
  ): Promise<Question> {
    const res = await api.post(
      '/questions',
      {
        questionTitle,
        questionDescription,
        questionCategories,
        questionDifficulty,
        questionExamples,
        questionConstraints,
        questionImages,
      },
      this.config,
    );
    const parsed = res.data as Question;
    return parsed;
  }
}

export default LiveQuestionRepository;
