import { Question, QuestionDifficulty} from "@/questionrepo/question.model";

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
        qId: 1,
        title: "Two Sum",
        category: ["array"],
        complexity: QuestionDifficulty.Easy,
        link: "www.leetcode.com",
        description:
          "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
      },
      {
        qId: 2,
        title: "3Sum",
        category: ["array"],
        complexity: QuestionDifficulty.Medium,
        link: "www.leetcode.com",
        description:
          "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0",
      },
      {
        qId: 3,
        title: "Container With Most Water",
        category: ["array", "sliding"],
        complexity: QuestionDifficulty.Medium,
        link: "www.leetcode.com",
        description: "",
      },
      {
        qId: 4,
        title: "Integer to Roman",
        category: ["array"],
        complexity: QuestionDifficulty.Easy,
        link: "www.leetcode.com",
        description: "",
      },
];
