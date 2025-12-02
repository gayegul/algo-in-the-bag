// Problem definitions - each problem has explanation, solution, and metadata
// Organized by topic for easier navigation

export const PROBLEMS = [
  // ==========================================
  // ARRAYS & HASHING
  // ==========================================
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'easy',
    topics: ['Arrays', 'Hash Table'],
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target. You may assume each input has exactly one solution, and you may not use the same element twice.',
    examples: [
      'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: nums[0] + nums[1] = 2 + 7 = 9',
      'Input: nums = [3,2,4], target = 6\nOutput: [1,2]'
    ],
    approach: `**The Problem**
Find two numbers that add up to target.

**Brute Force**
Check every pair. O(n²). Too slow for interviews.

**Smart Way: Use a Hashmap**
As you walk through, ask: "Have I seen my complement?"

For each number:
→ complement = target - current
→ If complement in map → found it!
→ Otherwise, save current to map

**Example** (target = 9)
See 2 → need 7 → not in map → save {2: 0}
See 7 → need 2 → found at index 0! → return [0, 1]`,
    solution: `def twoSum(nums, target):
    seen = {}  # num -> index
    for i, num in enumerate(nums):
        complement = target - num  # what we need
        if complement in seen:     # found it!
            return [seen[complement], i]
        seen[num] = i              # save for later`,
    testCases: [
      { input: { nums: [2,7,11,15], target: 9 }, expected: [0,1] },
      { input: { nums: [3,2,4], target: 6 }, expected: [1,2] },
      { input: { nums: [3,3], target: 6 }, expected: [0,1] },
    ],
    starterCode: `def twoSum(nums, target):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=KLlXCFG5TnA',
  },
  {
    id: 'contains-duplicate',
    title: 'Contains Duplicate',
    difficulty: 'easy',
    topics: ['Arrays', 'Hash Table'],
    description: 'Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.',
    examples: [
      'Input: nums = [1,2,3,1]\nOutput: true',
      'Input: nums = [1,2,3,4]\nOutput: false'
    ],
    approach: `**The Problem**
Check if any number appears more than once.

**Brute Force**
Compare every pair. O(n²). Don't do this.

**Smart Way: Use a Set**
Sets only keep unique values.

One-liner: \`len(nums) != len(set(nums))\`

If the set is smaller, there were duplicates!`,
    solution: `def containsDuplicate(nums):
    # set removes duplicates - if sizes differ, had dupes
    return len(nums) != len(set(nums))`,
    testCases: [
      { input: { nums: [1,2,3,1] }, expected: true },
      { input: { nums: [1,2,3,4] }, expected: false },
    ],
    starterCode: `def containsDuplicate(nums):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=3OamzN90kPg',
  },
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'easy',
    topics: ['Strings', 'Hash Table'],
    description: 'Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram uses the same letters the same number of times.',
    examples: [
      'Input: s = "anagram", t = "nagaram"\nOutput: true',
      'Input: s = "rat", t = "car"\nOutput: false'
    ],
    approach: `**The Problem**
Do two words have exactly the same letters?

**Simple Way: Sort**
Sort both strings and compare. O(n log n).

**Better Way: Count**
Count letters in each string. Compare counts.

\`Counter(s) == Counter(t)\`

Same letters + same frequency = anagram.`,
    solution: `from collections import Counter

def isAnagram(s, t):
    # Counter counts each char - anagrams have same counts
    return Counter(s) == Counter(t)`,
    testCases: [
      { input: { s: 'anagram', t: 'nagaram' }, expected: true },
      { input: { s: 'rat', t: 'car' }, expected: false },
    ],
    starterCode: `def isAnagram(s, t):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) - max 26 letters',
    youtubeUrl: 'https://www.youtube.com/watch?v=9UtInBqnCgA',
  },

  // ==========================================
  // TWO POINTERS
  // ==========================================
  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    difficulty: 'easy',
    topics: ['Strings', 'Two Pointers'],
    description: 'Given a string s, return true if it is a palindrome after converting to lowercase and removing non-alphanumeric characters.',
    examples: [
      'Input: s = "A man, a plan, a canal: Panama"\nOutput: true',
      'Input: s = "race a car"\nOutput: false'
    ],
    approach: `**The Problem**
Does the string read the same forwards and backwards?
Ignore spaces, punctuation, and case.

**Two Pointer Approach**
Left pointer at start, right at end.
Skip non-alphanumeric characters.
Compare and move inward.

**The Pattern**
\`while left < right:\`
\`  skip non-letters\`
\`  compare s[left].lower() vs s[right].lower()\`
\`  move pointers\``,
    solution: `def isPalindrome(s):
    left, right = 0, len(s) - 1
    
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1                # skip non-letters
        while left < right and not s[right].isalnum():
            right -= 1               # skip non-letters
        if s[left].lower() != s[right].lower():
            return False             # mismatch!
        left += 1
        right -= 1
    
    return True`,
    testCases: [
      { input: { s: 'A man, a plan, a canal: Panama' }, expected: true },
      { input: { s: 'race a car' }, expected: false },
    ],
    starterCode: `def isPalindrome(s):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=jJXJ16kPFWg',
  },
  {
    id: '3sum',
    title: '3Sum',
    difficulty: 'medium',
    topics: ['Arrays', 'Two Pointers'],
    description: 'Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] such that i != j != k and nums[i] + nums[j] + nums[k] == 0. No duplicate triplets.',
    examples: [
      'Input: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]',
      'Input: nums = [0,0,0]\nOutput: [[0,0,0]]'
    ],
    approach: `**The Problem**
Find all unique triplets that sum to zero.

**The Trick: Sort + Two Pointers**
1. Sort the array
2. Fix one number (i)
3. Use two pointers to find pairs that sum to -nums[i]

**Skip Duplicates**
After finding a triplet, skip duplicate values to avoid repeats.

**The Pattern**
\`for i, fix one number\`
\`  left = i + 1, right = end\`
\`  while left < right: two-pointer search\``,
    solution: `def threeSum(nums):
    nums.sort()  # sorting lets us skip duplicates and use two pointers
    result = []
    
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i-1]:
            continue  # same number = same triplets, skip
        
        # two pointers find pairs that sum to -nums[i]
        left, right = i + 1, len(nums) - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total < 0:
                left += 1  # need bigger sum
            elif total > 0:
                right -= 1  # need smaller sum
            else:
                result.append([nums[i], nums[left], nums[right]])
                # skip duplicates after finding valid triplet
                while left < right and nums[left] == nums[left+1]:
                    left += 1
                while left < right and nums[right] == nums[right-1]:
                    right -= 1
                left += 1
                right -= 1
    
    return result`,
    starterCode: `def threeSum(nums):
    # Your code here`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1) - excluding output',
    youtubeUrl: 'https://www.youtube.com/watch?v=jzZsG8n2R9A',
  },

  // ==========================================
  // SLIDING WINDOW
  // ==========================================
  {
    id: 'best-time-to-buy-sell',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'easy',
    topics: ['Arrays', 'Sliding Window'],
    description: 'Given an array prices where prices[i] is the stock price on day i, find the maximum profit from one buy and one sell. You must buy before you sell.',
    examples: [
      'Input: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy at 1, sell at 6 = profit 5',
      'Input: prices = [7,6,4,3,1]\nOutput: 0\nExplanation: No profit possible'
    ],
    approach: `**The Problem**
Find the best day to buy and sell for max profit.

**Key Insight**
Track the minimum price seen so far.
At each day, check: what if I sold today?

**The Pattern**
\`min_price = infinity\`
\`max_profit = 0\`
\`for price in prices:\`
\`  min_price = min(min_price, price)\`
\`  max_profit = max(max_profit, price - min_price)\``,
    solution: `def maxProfit(prices):
    min_price = float('inf')  # cheapest so far
    max_profit = 0
    
    for price in prices:
        min_price = min(min_price, price)           # update min
        max_profit = max(max_profit, price - min_price)  # best if sold today
    
    return max_profit`,
    testCases: [
      { input: { prices: [7,1,5,3,6,4] }, expected: 5 },
      { input: { prices: [7,6,4,3,1] }, expected: 0 },
    ],
    starterCode: `def maxProfit(prices):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=1pkOgXD63yU',
  },
  {
    id: 'longest-substring',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'medium',
    topics: ['Strings', 'Sliding Window', 'Hash Table'],
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [
      'Input: s = "abcabcbb"\nOutput: 3\nExplanation: "abc" is the longest',
      'Input: s = "bbbbb"\nOutput: 1'
    ],
    approach: `**The Problem**
Find the longest stretch with all unique characters.

**Sliding Window**
Expand window by adding characters.
When you hit a duplicate, shrink from the left.

**Use a Set**
Track characters in current window.
When adding a duplicate, remove from left until it's gone.

**The Pattern**
\`left = 0\`
\`for right in range(len(s)):\`
\`  while s[right] in window:\`
\`    remove s[left], left += 1\`
\`  add s[right]\`
\`  max_len = max(max_len, right - left + 1)\``,
    solution: `def lengthOfLongestSubstring(s):
    seen = set()  # tracks chars in current window
    left = 0
    max_len = 0
    
    for right in range(len(s)):
        # shrink window until duplicate is gone
        while s[right] in seen:
            seen.remove(s[left])
            left += 1
        seen.add(s[right])
        # window [left:right+1] has all unique chars
        max_len = max(max_len, right - left + 1)
    
    return max_len`,
    starterCode: `def lengthOfLongestSubstring(s):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(n, 26))',
    youtubeUrl: 'https://www.youtube.com/watch?v=wiGpQwVHdE0',
  },
]
