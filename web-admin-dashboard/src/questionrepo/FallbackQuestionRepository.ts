import { Question, QuestionDifficulty } from "@/questionrepo/question.model";

class FallbackQuestionRepository {
  // Function to get questions from localStorage or use fallback questions
  static getQuestions() {
    const qnsStringify = localStorage.getItem("questions");
    if (!qnsStringify) {
      // Load and store fallback questions to localstorage
      localStorage.setItem("questions", JSON.stringify(fallbackQuestions));
      return fallbackQuestions;
    } else {
      return JSON.parse(qnsStringify);
    }
  }
}

export default FallbackQuestionRepository;

const fallbackQuestions: Question[] = [
  {
    questionId: 1,
    _id: "e0bd7857-17b3-4811-9434-3f623efa78ae",
    questionTitle: "Two Sum",
    questionCategories: ["array"],
    questionDifficulty: QuestionDifficulty.Easy,
    questionDescription:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
  },
  {
    questionId: 2,
    _id: "543a8b55-3b11-4d0c-a07b-980a1b2c6fba",
    questionTitle: "3Sum",
    questionCategories: ["array"],
    questionDifficulty: QuestionDifficulty.Medium,
    questionDescription:
      "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0",
  },
  {
    questionId: 3,
    _id: "0c8efdb7-8073-45a8-b8de-819be068f1b2",
    questionTitle: "Container With Most Water",
    questionCategories: ["array", "sliding"],
    questionDifficulty: QuestionDifficulty.Medium,
    questionDescription: "",
  },
  {
    _id: "62729888-8c94-4554-ad6f-1938bf69b779",
    questionId: 4,
    questionTitle: "Integer to Roman",
    questionCategories: ["array"],
    questionDifficulty: QuestionDifficulty.Easy,
    questionDescription: "",
  },
];
