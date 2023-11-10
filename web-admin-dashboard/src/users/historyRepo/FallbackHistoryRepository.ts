// import { History, QuestionDifficulty } from "./history.model";

// class FallbackHistoryRepository {
//   static getHistory() {
//     const historyStringify = localStorage.getItem("history");
//     if (!historyStringify) {
//       localStorage.setItem("history", JSON.stringify(fallbackHistory));
//       return fallbackHistory;
//     } else {
//       return JSON.parse(historyStringify);
//     }
//   }
// }

// export default FallbackHistoryRepository;

// const fallbackHistory: History[] = [
//   {
//     _id: "1",
//     email: "sw@.com",
//     questionTitle: "Two Sum",
//     questionDifficulty: QuestionDifficulty.Easy,
//     questionDescription:
//       "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
//     dateSubmitted: new Date(2023, 9, 15, 8, 45).toLocaleString(
//       navigator.language
//     ),
//     submission: "function twoSum(nums, target) {\n}",
//   },
//   {
//     _id: "2",
//     questionTitle: "3Sum",
//     questionDifficulty: QuestionDifficulty.Medium,
//     questionDescription:
//       "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k.",
//     dateSubmitted: new Date().toLocaleString(navigator.language),
//     submission: "function threeSum(nums) {\n}",
//   },
// ];
