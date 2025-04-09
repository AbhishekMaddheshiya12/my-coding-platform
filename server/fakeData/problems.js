const problems = [
    {
      id: "1",
      title: "Longest Increasing Subsequence",
      difficulty: "Medium",
      likes: 1024,
      dislikes: 256,
      description: `Given an integer array nums, return the length of the longest strictly increasing subsequence.
        A subsequence is a sequence derived from an array by deleting some or no elements without changing the order of the remaining elements.`,
      examples: [
        {
          input: "nums = [10,9,2,5,3,7,101,18]",
          output: "4",
          explanation: "The longest increasing subsequence is [2,3,7,101].",
        },
      ],
      constraints: ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],
      testCases: [
        { id: 1, input: "5\n1 3 5 4 7", expectedOutput: "4" },
        { id: 2, input: "5\n2 2 2 2 2", expectedOutput: "1" },
        { id: 3, input: "6\n10 20 30 1 2 3", expectedOutput: "3" },
        { id: 4, input: "6\n1 10 2 20 3 30", expectedOutput: "4" },
        { id: 5, input: "1\n1", expectedOutput: "1" },
        { id: 6, input: "5\n5 4 3 2 1", expectedOutput: "1" },
        { id: 7, input: "6\n1 3 2 4 3 5", expectedOutput: "4" },
        { id: 8, input: "5\n1 2 3 4 5", expectedOutput: "5" },
        { id: 9, input: "7\n2 6 8 3 4 5 7", expectedOutput: "5" },
        { id: 10, input: "7\n7 6 5 4 3 2 1", expectedOutput: "1" },
      ],
    },
    {
      id: "2",
      title: "Two Sum",
      difficulty: "Easy",
      likes: 15321,
      dislikes: 1023,
      description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.`,
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
        },
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
      ],
      testCases: [
        {
          id: 1,
          input: "[1, 2, 3, 4], target = 5",
          expectedOutput: "[0,3]",
        },
      ],
    },
    {
      id: "3",
      title: "Valid Parentheses",
      difficulty: "Easy",
      likes: 8451,
      dislikes: 450,
      description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
      examples: [
        {
          input: "s = '()'",
          output: "true",
          explanation:
            "The string is valid because it contains matched parentheses.",
        },
      ],
      constraints: ["1 <= s.length <= 10^4"],
      testCases: [
        { id: 1, input: "s = '()'", expectedOutput: "true" },
        { id: 2, input: "s = '()[]{}'", expectedOutput: "true" },
        { id: 3, input: "s = '(]'", expectedOutput: "false" },
        { id: 4, input: "s = '([)]'", expectedOutput: "false" },
        { id: 5, input: "s = '{[]}'", expectedOutput: "true" },
        { id: 6, input: "s = '['", expectedOutput: "false" },
        { id: 7, input: "s = '])'", expectedOutput: "false" },
        { id: 8, input: "s = '[[{{(())}}]]'", expectedOutput: "true" },
        { id: 9, input: "s = '{[()]}'", expectedOutput: "true" },
        { id: 10, input: "s = '{[(])}'", expectedOutput: "false" },
      ],
    },
    {
      id: "4",
      title: "Palindrome Number",
      difficulty: "Easy",
      likes: 6523,
      dislikes: 741,
      description: `Given an integer x, return true if x is a palindrome, and false otherwise.`,
      examples: [
        {
          input: "x = 121",
          output: "true",
          explanation: "121 is a palindrome because it reads the same backward as forward.",
        },
        {
          input: "x = -121",
          output: "false",
          explanation: "-121 is not a palindrome because the negative sign causes it to read differently backward.",
        },
        {
          input: "x = 10",
          output: "false",
          explanation: "10 is not a palindrome because it does not read the same backward.",
        },
        {
          input: "x = 0",
          output: "true",
          explanation: "0 is a palindrome because it reads the same backward and forward.",
        },
        {
          input: "x = 12321",
          output: "true",
          explanation: "12321 is a palindrome because it reads the same backward as forward.",
        },
        {
          input: "x = 12345",
          output: "false",
          explanation: "12345 is not a palindrome because it does not read the same backward.",
        },
        {
          input: "x = 1221",
          output: "true",
          explanation: "1221 is a palindrome because it reads the same backward as forward.",
        },
        {
          input: "x = 1001",
          output: "true",
          explanation: "1001 is a palindrome because it reads the same backward as forward.",
        },
        {
          input: "x = 99",
          output: "true",
          explanation: "99 is a palindrome because it reads the same backward as forward.",
        },
        {
          input: "x = 1010",
          output: "false",
          explanation: "1010 is not a palindrome because it does not read the same backward.",
        },
      ],
      
      constraints: ["-2^31 <= x <= 2^31 - 1"],
      testCases: [
        { id: 1, input: "-121", expectedOutput: "false" },
        { id: 2, input: "121", expectedOutput: "true" },
        { id: 3, input: "10", expectedOutput: "false" },
        { id: 4, input: "0", expectedOutput: "true" },
        { id: 5, input: "1221", expectedOutput: "true" },
        { id: 6, input: "121", expectedOutput: "true" },
        { id: 7, input: "12345", expectedOutput: "false" },
        { id: 8, input: "1001", expectedOutput: "true" },
        { id: 9, input: "99", expectedOutput: "true" },
        { id: 10, input: "1010", expectedOutput: "false" },
      ],
    },
    {
      id: "5",
      title: "Reverse Integer",
      difficulty: "Medium",
      likes: 7531,
      dislikes: 421,
      description: `Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], return 0.`,
      examples: [
        {
          input: "x = 123",
          output: "321",
          explanation: "Reversing the digits of 123 gives 321.",
        },
      ],
      constraints: ["-2^31 <= x <= 2^31 - 1"],
      testCases: [{ id: 1, input: "123", expectedOutput: "321" }],
    },
  ];
  
  export default problems;
  