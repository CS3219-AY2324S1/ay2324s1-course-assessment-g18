import { Question, QuestionDifficulty } from "@/models/question.model";

class LocalQuestionRepository {
  // Function to retrieve questions from localStorage
  static getQuestions() {
    const currStringify = localStorage.getItem("questions");
    return currStringify ? JSON.parse(currStringify) : [];
  }

  // Function to save a question to localStorage
  static saveQuestion(question: Question) {
    try {
      const curr = LocalQuestionRepository.getQuestions();

      const newQuestion = {
        qId: curr.length ? curr.length + 1 : 1,
        title: question.title,
        description: question.description, 
        complexity: QuestionDifficulty[question.complexity], 
        link: question.link, 
        category: [],
      };
      const newArr = curr.concat(newQuestion);
      localStorage.setItem("questions", JSON.stringify(newArr));

      return true; // Successfully saved
    } catch (error) {
      console.error(error);
      return false; // Failed to save
    }
  }
}

export default LocalQuestionRepository;