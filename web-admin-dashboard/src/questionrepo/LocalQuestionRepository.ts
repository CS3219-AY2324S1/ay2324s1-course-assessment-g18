import { Question, QuestionDifficulty } from "@/questionrepo/question.model";

class LocalQuestionRepository {
  // Function to retrieve questions from localStorage
  static getQuestions() {
    const currStringify = localStorage.getItem("questions");
    return currStringify ? JSON.parse(currStringify) : [];
  }

  // Function to update a question in localStorage
  static updateQuestion(question: Question, questionId: number) {
    try {
      const currArr: Question[] = LocalQuestionRepository.getQuestions();
      const newQuestion = {
        qId: questionId,
        title: question.title,
        description: question.description,
        complexity: QuestionDifficulty[question.complexity],
        link: question.link,
        category: [],
      };
      // Find index of the question with questionId
      const indexOfQuestion = currArr.findIndex((q) => q.qId === questionId);
      currArr[indexOfQuestion] = newQuestion;
      localStorage.setItem("questions", JSON.stringify(currArr));

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // Function to delete a question from localStorage
  static deleteQuestion(questionId: number) {
    try {
      const currArr: Question[] = LocalQuestionRepository.getQuestions();

      // Filter out the question with the specified questionId
      const updatedArr = currArr.filter((question) => question.qId !== questionId);

      localStorage.setItem("questions", JSON.stringify(updatedArr));

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
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
