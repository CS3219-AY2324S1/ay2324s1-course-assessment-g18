import { Question } from "@/questionrepo/question.model";
import axios from "axios";

class MongoQuestionRepository {
  static baseUrl = "https://oceanic-will-398716.et.r.appspot.com/questions";
  static async getQuestions(): Promise<Question[]> {
    try {
      const res = await axios.get(this.baseUrl);
      const data: Question[] = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return [] as Question[];
    }
  }

  static async getQuestion(id: string): Promise<Question | null> {
    try {
      const res = await axios.get(`${this.baseUrl}/${id}`);
      const data: Question = res.data;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async updateQuestion(
    questionTitle: string,
    questionDescription: string,
    questionCategories: string[],
    questionDifficulty: string,
    id: string
  ): Promise<Question> {
    const res = await axios.put(`${this.baseUrl}/${id}`, {
      questionTitle,
      questionDescription,
      questionCategories,
      questionDifficulty,
    });
    const question = res.data as Question;
    return question;
  }

  static async deleteQuestion(id: string) {
    try {
      await axios.delete(`${this.baseUrl}/${id}`);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async saveQuestion(
    questionTitle: string,
    questionDescription: string,
    questionCategories: string[],
    questionDifficulty: string
  ): Promise<Question> {
    const res = await axios.post(this.baseUrl, {
      questionTitle,
      questionDescription,
      questionCategories,
      questionDifficulty,
    });
    const parsed = res.data as Question;
    return parsed;
  }
}

export default MongoQuestionRepository;
