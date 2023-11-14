import { Question, QuestionDifficulty } from "@/questionrepo/question.model";

class LocalQuestionRepository {
  // Function to retrieve questions from localStorage
  static getQuestions() {
    const currStringify = localStorage.getItem("questions");
    return currStringify ? JSON.parse(currStringify) : [];
  }

  // Function to update a question in localStorage
  static updateQuestion(question: Question, id: string) {
    try {
      const currArr: Question[] = LocalQuestionRepository.getQuestions();
      const newQuestion: Question = {
        _id: question._id,
        questionId: question.questionId,
        questionTitle: question.questionTitle,
        questionDescription: question.questionDescription,
        questionDifficulty: QuestionDifficulty[question.questionDifficulty],
        questionConstraints: question.questionConstraints,
        questionExamples: question.questionExamples,
        questionImages: question.questionImages,
        questionCategories: [],
      };
      // Find index of the question with questionId
      const indexOfQuestion = currArr.findIndex((q) => q._id === id);
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
      const updatedArr = currArr.filter(
        (question) => question.questionId !== questionId
      );

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

      const newQuestion: Question = {
        _id: String(curr.length ? curr.length + 1 : 1),
        questionId: curr.length ? curr.length + 1 : 1,
        questionTitle: question.questionTitle,
        questionDescription: question.questionDescription,
        questionDifficulty: QuestionDifficulty[question.questionDifficulty],
        questionCategories: [],
        questionConstraints: question.questionConstraints,
        questionExamples: question.questionExamples,
        questionImages: question.questionImages,
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
