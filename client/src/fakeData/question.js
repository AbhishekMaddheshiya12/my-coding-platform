const problemData = {
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    likes: 1024,
    dislikes: 256,
    description: `Given an integer array nums, return the length of the longest strictly increasing subsequence.
  A subsequence is a sequence derived from an array by deleting some or no elements without changing the order of the remaining elements. For example, [3, 6, 2, 7] is a subsequence of the array [0, 3, 1, 6, 2, 2, 7].`,
    examples: [
      {
        input: "nums = [10,9,2,5,3,7,101,18]",
        output: "4",
        explanation: "The longest increasing subsequence is [2,3,7,101], therefore the length is 4."
      },
      {
        input: "nums = [0,1,0,3,2,3]",
        output: "4",
        explanation: "The longest increasing subsequence is [0,1,2,3], therefore the length is 4."
      },
      {
        input: "nums = [7,7,7,7,7,7,7]",
        output: "1",
        explanation: "The longest increasing subsequence is [7], therefore the length is 1."
      }
    ],
    constraints: [
      "1 <= nums.length <= 2500",
      "-10^4 <= nums[i] <= 10^4"
    ]
  };
  
  export default problemData;
  