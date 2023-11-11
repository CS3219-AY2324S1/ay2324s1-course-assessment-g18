import { Question, QuestionDifficulty } from '@/questionrepo/question.model';

class FallbackQuestionRepository {
  // Function to get questions from localStorage or use fallback questions
  static getQuestions() {
    const qnsStringify = localStorage.getItem('questions');
    if (!qnsStringify) {
      // Load and store fallback questions to localstorage
      localStorage.setItem('questions', JSON.stringify(fallbackQuestions));
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
    questionTitle: 'Reverse a String',
    questionCategories: [''],
    questionDifficulty: 'Medium',
    questionDescription:
      'Write a function that reverses a string. The input string is given as an array of characters s.\nYou must do this by modifying the input array in-place with O(1) extra memory',
    questionExamples: [
      ['', ''],
      ['', ''],
      ['', ''],
    ],
    questionConstraints: '',
    questionImages: '',
  },
  {
    questionId: 2,
    questionTitle: 'Trips and Users',
    questionCategories: ['DB', 'SQL'],
    questionDifficulty: 'Hard',
    questionDescription:
      "SQL Schema Pandas Schema\n\nTable: \nTrips +-------------+----------+\n| Column Name | Type | +-------------+----------+\n| id | int\n|\n|\n| |\n| client_id | driver_id | city_id\n| status\n| int | int\n| int\n|\n| enum | request_at | date\n|\n+-------------+----------+\nid is the primary key (column with unique values) for this table.\nThe table holds all taxi trips. Each trip has a unique id, while client_id and driver_id are foreign keys to the users_id at the Users table.\nStatus is an ENUM (category) type of ('completed', 'cancelled_by_driver', 'cancelled_by_client').\nTable: Users\n+-------------+----------+\n| Column Name | Type | +-------------+----------+\n| users_id\n| banned\n| role\n+-------------+----------+\nusers_id is the primary key (column with unique values) for this table. The table holds all users. Each user has a unique users_id, and role is an ENUM type of ('client', 'driver', 'partner').\nbanned is an ENUM (category) type of ('Yes', 'No').\nThe cancellation rate is computed by dividing the number of canceled (by client or driver) requests with unbanned users by the total number of requests with unbanned users on that day.\nWrite a solution to find the cancellation rate of requests with unbanned users (both client and driver must not be banned) each day between \"2013- 10-01\" and \"2013-10-03\". Round Cancellation Rate to two decimal points.\nReturn the result table in any order.",
    questionExamples: [
      [
        'Trips table: +----+-----------+-----------+---------+---------------------+------------+\n| id | client_id | driver_id | city_id | status | request_at | +----+-----------+-----------+---------+---------------------+------------+\n|1 |1\n|2 |2\n|3 |3\n|4 |4\n|5 |1\n|6 |2\n|7 |3\n|8 |2\n|9 |3\n| 10 | 4 +----+-----------+-----------+---------+---------------------+------------+ Users table:\n+----------+--------+--------+\n| users_id | banned | role | +----------+--------+--------+\n| No | Yes | No | No\n| client | | client | | client | | client |\n| No | No | No | No\n| driver | | driver | | driver | | driver |\n|10 |11 |12 |13 |10 |11 |12 |12 |10\n|1 |1 |6 |6 |1 |6 |6 |12 | 12\n|completed |2013-10-01|\n| cancelled_by_driver | 2013-10-01 | | completed | 2013-10-01 |\n| cancelled_by_client | 2013-10-01 |\n| 13\n| 12\n| 2013-10-03 |\n| cancelled_by_driver | 2013-10-03 |\n| 1\n| 2\n| 3\n| 4\n| 10\n| 11\n| 12\n| 13\n+----------+--------+--------+',
        '+------------+-------------------+\n| Day | Cancellation Rate |\n| completed | completed | completed\n| 2013-10-02 | | 2013-10-02 | | 2013-10-02 |\n| completed | completed\n| 2013-10-03 |\nPage 27 of 28\n+------------+-------------------+ | 2013-10-01 | 0.33 | | 2013-10-02 | 0.00 | | 2013-10-03 | 0.50 | +------------+-------------------+',
      ],
      ['', ''],
      ['', ''],
    ],
    questionConstraints: '',
    questionImages: '',
  },
  {
    questionId: 3,
    questionTitle: 'Linked List Cycle Detection',
    questionCategories: ['Linked List'],
    questionDifficulty: 'Easy',
    questionDescription:
      "Given head, the head of a linked list, determine if the linked list has a cycle in it.\nThere is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.\nReturn true if there is a cycle in the linked list. Otherwise, return false.",
    questionExamples: [
      ['head = [3,2,0,-4], pos = -1', 'true'],
      ['head = [1,2], pos = 0', 'true'],
      ['head = [1], pos = -1', 'false'],
    ],
    questionConstraints:
      'The number of the nodes in the list is in the range [0, 104].\n-105 <= Node.val <= 105\npos is -1 or a valid index in the linked-list.',
    questionImages: '',
  },
  {
    questionId: 4,
    questionTitle: 'Chalkboard XOR Game',
    questionCategories: ['Bit Manipulation'],
    questionDifficulty: 'Hard',
    questionDescription:
      'You are given an array of integers nums represents the numbers written on a chalkboard.\nAlice and Bob take turns erasing exactly one number from the chalkboard, with Alice starting first. If erasing a number causes the bitwise XOR of all the elements of the chalkboard to become 0, then that player loses. The bitwise XOR of one element is that element itself, and the bitwise XOR of no elements is 0.\nAlso, if any player starts their turn with the bitwise XOR of all the elements of the chalkboard equal to 0, then that player wins.\nReturn true if and only if Alice wins the game, assuming both players play optimally.\n\njust testing',
    questionExamples: [
      ['', ''],
      ['', ''],
      ['', ''],
    ],
    questionConstraints: '',
    questionImages: '',
  },
  {
    questionId: 5,
    questionTitle: 'Roman to Integer',
    questionCategories: ['Math', ' String'],
    questionDifficulty: 'Easy',
    questionDescription:
      'Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\nSymbol Value I1 V5\nX 10\nL 50\nC 100\nD 500\nM 1000\nFor example, 2 is written as II in Roman numeral, just two ones added together. 12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V+ II.\nRoman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:\nI can be placed before V(5) and X(10) to make 4 and 9.\nX can be placed before L (50) and C (100) to make 40 and 90.\nC can be placed before D (500) and M (1000) to make 400 and 900. Given a roman numeral, convert it to an integer.',
    questionExamples: [
      ['s = "III"', '3'],
      [' s = "LVIII"', '58'],
      ['s = "MCMXCIV"', '1994'],
    ],
    questionConstraints:
      "1 <= s.length <= 15\ns contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').\nIt is guaranteed that s is a valid roman numeral in the range [1, 3999].",
    questionImages: '',
  },
  {
    questionId: 6,
    questionTitle: 'Wildcard Matching',
    questionCategories: [],
    questionDifficulty: 'Hard',
    questionDescription:
      "Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:\n- '?' Matches any single character.\n- '*' Matches any sequence of characters (including the empty\nsequence).\nThe matching should cover the entire input string (not partial).",
    questionExamples: [
      [' s = "aa", p = "a"', 'false'],
      ['s = "aa", p = "*"', 'true'],
      ['s = "cb", p = "?a"', 'false'],
    ],
    questionConstraints:
      "0 <= s.length, p.length <= 2000\ns contains only lowercase English letters.\np contains only lowercase English letters, '?' or '*'.",
    questionImages: '',
  },
  {
    questionId: 7,
    questionTitle: 'Add Binary',
    questionCategories: [],
    questionDifficulty: 'Easy',
    questionDescription:
      'Given two binary strings a and b, return their sum as a binary string.',
    questionExamples: [
      ['a = "11", b = "1"', '"100"'],
      ['a = "1010", b = "1011"', '"10101"'],
      ['', ''],
    ],
    questionConstraints:
      "1 <= a.length, b.length <= 104\na and b consist only of '0' or '1' characters.\nEach string does not contain leading zeros except for the zero itself.",
    questionImages: '',
  },
  {
    questionId: 8,
    questionTitle: 'Serialize and Deserialize a Binary Tree',
    questionCategories: [],
    questionDifficulty: 'Hard',
    questionDescription:
      'Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.\nClarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.\n',
    questionExamples: [
      ['root = []', '[]'],
      ['', ''],
      ['', ''],
    ],
    questionConstraints:
      'The number of nodes in the tree is in the range [0, 104].\n-1000 <= Node.val <= 1000',
    questionImages: '',
  },
  {
    questionId: 9,
    questionTitle: 'N-Queen Problem',
    questionCategories: [],
    questionDifficulty: 'Hard',
    questionDescription:
      "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.\nGiven an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.\nEach solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.\n",
    questionExamples: [
      ['', ''],
      ['', ''],
      ['', ''],
    ],
    questionConstraints: '',
    questionImages: '',
  },
  {
    questionId: 10,
    questionTitle: 'Fibonacci Number',
    questionCategories: [],
    questionDifficulty: 'Easy',
    questionDescription:
      'The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding\nones, starting from 0 and 1. \n\nThat is,\nF(0)=0,F(1)=1\nF(n) = F(n - 1) + F(n - 2), for n > 1. Given n, calculate F(n).',
    questionExamples: [
      ['n = 2', '1'],
      ['n = 3', '2'],
      ['n = 4', '3'],
    ],
    questionConstraints: '0<=n<=30',
    questionImages: '',
  },
  {
    questionId: 11,
    questionTitle: 'Sliding Window Maximum',
    questionCategories: [],
    questionDifficulty: 'Hard',
    questionDescription:
      'You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.\nReturn the max sliding window.\n',
    questionExamples: [
      ['nums = [1,3,-1,-3,5,3,6,7], k = 3', '[3,3,5,5,6,7]'],
      ['nums = [1], k = 1', '[1]'],
      ['', ''],
    ],
    questionConstraints:
      '1 <= nums.length <= 105\n-104 <= nums[i] <= 104\n1 <= k <= nums.length',
    questionImages: '',
  },
  {
    questionId: 12,
    questionTitle: 'Validate Binary Search Tree',
    questionCategories: [],
    questionDifficulty: 'Medium',
    questionDescription:
      "Given the root of a binary tree, determine if it is a valid binary search tree (BST).\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys less than\nthe node's key.\n- The right subtree of a node contains only nodes with keys greater\nthan the node's key.\n- Both the left and right subtrees must also be binary search trees.",
    questionExamples: [
      ['root = [2,1,3]', 'true'],
      ['root = [5,1,4,null,null,3,6]', 'false'],
      ['', ''],
    ],
    questionConstraints:
      'The number of nodes in the tree is in the range [1, 104].\n-231 <= Node.val <= 231 - 1',
    questionImages: '',
  },
  {
    questionId: 13,
    questionTitle: 'Implement Stack using Queues',
    questionCategories: [],
    questionDifficulty: 'Easy',
    questionDescription:
      "Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push,\ntop, pop, and empty). Implement the MyStack class:\nvoid push(int x) Pushes element x to the top of the stack.\nint pop() Removes the element on the top of the stack and returns it. int top() Returns the element on the top of the stack.\nboolean empty() Returns true if the stack is empty, false otherwise. \n\nNotes:\nYou must use only standard operations of a queue, which means that only push to back, peek/pop from front, size and is empty operations are valid. Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.\n",
    questionExamples: [
      ['', ''],
      ['', ''],
      ['', ''],
    ],
    questionConstraints: '',
    questionImages: '',
  },
  {
    questionId: 14,
    questionTitle: 'Combine Two Tables',
    questionCategories: [],
    questionDifficulty: 'Easy',
    questionDescription:
      'SQL Schema\nTable: Person\n+-------------+---------+\n| Column Name | Type |\n+-------------+---------+\n| personId | int |\n| lastName | varchar |\n|firstName |varchar|\n+-------------+---------+\npersonId is the primary key (column with unique values) for this table.\nThis table contains information about the ID of some persons and their first and last names.\nTable: Address\n+-------------+---------+\n| Column Name | Type |\n+-------------+---------+\n| addressId | int |\n| personId | int |\n| city | varchar |\n| state | varchar |\n+-------------+---------+\naddressId is the primary key (column with unique values) for this table. Each row of this table contains information about the city and state of one person with ID = PersonId.\n\n\n\nWrite a solution to report the first name, last name, city, and state of each person in the Person table. If the address of a personId is not present in the Address table, report null instead.\nReturn the result table in any order.\nThe result format is in the following example.',
    questionExamples: [
      [
        'Person table:\n+----------+----------+-----------+\n| personId | lastName | firstName |\n+----------+----------+-----------+\n|1 |Wang |Allen |\n|2 |Alice |Bob |\n+----------+----------+-----------+\nAddress table:\n+-----------+----------+---------------+------------+\n| addressId | personId | city | state | +-----------+----------+---------------+------------+\n|1 |2 |NewYorkCity|NewYork |\n| 2 | 3 | Leetcode | California | +-----------+----------+---------------+------------+',
        '+-----------+----------+---------------+----------+\n| firstName | lastName | city | state | +-----------+----------+---------------+----------+\n| Allen | Wang | Null | Null |\n|Bob |Alice |NewYorkCity|NewYork| +-----------+----------+---------------+----------+',
      ],
      ['', ''],
      ['', ''],
    ],
    questionConstraints: '',
    questionImages: '',
  },
  {
    questionId: 15,
    questionTitle: 'Airplane Seat Assignment Probability',
    questionCategories: [],
    questionDifficulty: 'Medium',
    questionDescription:
      'n passengers board an airplane with exactly n seats. The first passenger has lost the ticket and picks a seat randomly. But after that, the rest of the passengers will:\nTake their own seat if it is still available, and\nPick other seats randomly when they find their seat occupied Return the probability that the nth person gets his own seat.',
    questionExamples: [
      ['', ''],
      ['', ''],
      ['', ''],
    ],
    questionConstraints: '',
    questionImages: '',
  },
  {
    questionId: 16,
    questionTitle: 'Repeated DNA Sequences',
    questionCategories: [],
    questionDifficulty: 'Medium',
    questionDescription:
      "The DNA sequence is composed of a series of nucleotides abbreviated as 'A', 'C', 'G', and 'T'.\nFor example, \"ACGAATTCCG\" is a DNA sequence.\nWhen studying DNA, it is useful to identify repeated sequences within the DNA.\nGiven a string s that represents a DNA sequence, return all the 10-letter- long sequences (substrings) that occur more than once in a DNA molecule. You may return the answer in any order.\n",
    questionExamples: [
      [
        's = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"',
        '["AAAAACCCCC","CCCCCAAAAA"]\n',
      ],
      [' s = "AAAAAAAAAAAAA"', ' ["AAAAAAAAAA"]'],
      ['', ''],
    ],
    questionConstraints:
      "1 <= s.length <= 105\ns[i] is either 'A', 'C', 'G', or 'T'.",
    questionImages: '',
  },
  {
    questionId: 17,
    questionTitle: 'Course Schedule',
    questionCategories: [],
    questionDifficulty: 'Medium',
    questionDescription:
      'There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i]\n= [ai, bi] indicates that you must take course bi first if you want to take course ai.\nFor example, the pair [0, 1], indicates that to take course 0 you have to first take course 1.\nReturn true if you can finish all courses. Otherwise, return false.',
    questionExamples: [
      ['numCourses = 2, prerequisites = [[1,0]]', 'true'],
      ['numCourses = 2, prerequisites = [[1,0],[0,1]]', 'false'],
      ['', ''],
    ],
    questionConstraints:
      '1 <= numCourses <= 2000\n0 <= prerequisites.length <= 5000\nprerequisites[i].length == 2\n0 <= ai, bi < numCourses\nAll the pairs prerequisites[i] are unique.',
    questionImages: '',
  },
  {
    questionId: 18,
    questionTitle: 'LRU Cache Design',
    questionCategories: [],
    questionDifficulty: 'Medium',
    questionDescription:
      'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\nImplement the LRUCache class:\nLRUCache(int capacity) Initialize the LRU cache with positive size capacity. int get(int key) Return the value of the key if the key exists, otherwise return -1.\n\nvoid put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key. The functions get and put must each run in O(1) average time complexity.',
    questionExamples: [
      [
        '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"] [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        '[null, null, null, 1, null, -1, null, -1, 3, 4]',
      ],
      ['', ''],
      ['', ''],
    ],
    questionConstraints:
      '1 <= capacity <= 3000 \n0<=key<=104\n0 <= value <= 105\nAt most 2 * 105 calls will be made to get and put.',
    questionImages: '',
  },
  {
    questionId: 19,
    questionTitle: 'Longest Common Subsequence',
    questionCategories: [],
    questionDifficulty: 'Medium',
    questionDescription:
      'Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.\nFor example, "ace" is a subsequence of "abcde".\nA common subsequence of two strings is a subsequence that is common to both strings.',
    questionExamples: [
      ['text1 = "abcde", text2 = "ace"', '3'],
      ['text1 = "abc", text2 = "abc"', '3'],
      ['text1 = "abc", text2 = "def"', '0'],
    ],
    questionConstraints:
      '1 <= text1.length, text2.length <= 1000\ntext1 and text2 consist of only lowercase English characters.',
    questionImages: '',
  },
  {
    questionId: 20,
    questionTitle: 'Rotate Image',
    questionCategories: [],
    questionDifficulty: 'Medium',
    questionDescription:
      'You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).\nYou have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.',
    questionExamples: [
      ['matrix = [[1,2,3],[4,5,6],[7,8,9]]', '[[7,4,1],[8,5,2],[9,6,3]]'],
      [
        'matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]',
        '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]',
      ],
      ['', ''],
    ],
    questionConstraints:
      'n == matrix.length == matrix[i].length\n1<=n<=20\n-1000 <= matrix[i][j] <= 1000',
    questionImages: '',
  },
];
