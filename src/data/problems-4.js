// Dynamic Programming, Bit Manipulation, Math, and Intervals

export const PROBLEMS_4 = [
  // ==========================================
  // DYNAMIC PROGRAMMING
  // ==========================================
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    difficulty: 'easy',
    topics: ['Dynamic Programming'],
    description: 'You are climbing a staircase with n steps. Each time you can climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
    examples: [
      'Input: n = 2\nOutput: 2 (1+1 or 2)',
      'Input: n = 3\nOutput: 3 (1+1+1, 1+2, 2+1)'
    ],
    approach: `**The Problem**
How many ways to reach step n?

**Key Insight: It's Fibonacci!**
To reach step n, you either:
- Came from step n-1 (took 1 step)
- Came from step n-2 (took 2 steps)

So: ways(n) = ways(n-1) + ways(n-2)

**Base Cases**
ways(1) = 1, ways(2) = 2`,
    solution: `def climbStairs(n):
    if n <= 2:
        return n
    
    # fibonacci: ways[n] = ways[n-1] + ways[n-2]
    prev, curr = 1, 2
    for _ in range(3, n + 1):
        prev, curr = curr, prev + curr
    
    return curr`,
    testCases: [
      { input: { n: 2 }, expected: 2 },
      { input: { n: 3 }, expected: 3 },
      { input: { n: 5 }, expected: 8 },
    ],
    starterCode: `def climbStairs(n):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=Y0lT9Fck7qI',
  },
  {
    id: 'min-cost-climbing-stairs',
    title: 'Min Cost Climbing Stairs',
    difficulty: 'easy',
    topics: ['Dynamic Programming'],
    description: 'Given an array cost where cost[i] is the cost of step i, find minimum cost to reach the top. You can start at step 0 or 1, and can climb 1 or 2 steps.',
    examples: [
      'Input: cost = [10,15,20]\nOutput: 15 (start at index 1)',
      'Input: cost = [1,100,1,1,1,100,1,1,100,1]\nOutput: 6'
    ],
    approach: `**The Problem**
Each step has a cost. Minimize total cost to reach the top.

**DP Formula**
minCost(i) = cost[i] + min(minCost(i-1), minCost(i-2))

**Bottom-Up**
Build from step 0 and 1 upward.
Answer is min of last two steps.`,
    solution: `def minCostClimbingStairs(cost):
    # each step: pay its cost + cheapest way to get here
    for i in range(2, len(cost)):
        cost[i] += min(cost[i-1], cost[i-2])
    
    # can reach top from either of last two steps
    return min(cost[-1], cost[-2])`,
    testCases: [
      { input: { cost: [10,15,20] }, expected: 15 },
      { input: { cost: [1,100,1,1,1,100,1,1,100,1] }, expected: 6 },
    ],
    starterCode: `def minCostClimbingStairs(cost):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=ktmzAZWkEZ0',
  },
  {
    id: 'house-robber',
    title: 'House Robber',
    difficulty: 'medium',
    topics: ['Dynamic Programming'],
    description: 'You are a robber planning to rob houses along a street. Each house has money, but you cannot rob two adjacent houses. Find maximum money you can rob.',
    examples: [
      'Input: nums = [1,2,3,1]\nOutput: 4 (rob house 0 and 2)',
      'Input: nums = [2,7,9,3,1]\nOutput: 12 (rob house 0, 2, and 4)'
    ],
    approach: `**The Problem**
Max money without robbing adjacent houses.

**At Each House**
Two choices:
- Skip it: keep previous max
- Rob it: add value to max from 2 houses ago

**DP Formula**
dp[i] = max(dp[i-1], dp[i-2] + nums[i])

**Space Optimization**
Just track two values: prev and curr.`,
    solution: `def rob(nums):
    prev, curr = 0, 0  # max money at i-2, i-1
    
    for num in nums:
        # skip this house OR rob it + best from 2 ago
        prev, curr = curr, max(curr, prev + num)
    
    return curr`,
    testCases: [
      { input: { nums: [1,2,3,1] }, expected: 4 },
      { input: { nums: [2,7,9,3,1] }, expected: 12 },
    ],
    starterCode: `def rob(nums):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=73r3KWiEvyk',
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    difficulty: 'medium',
    topics: ['Dynamic Programming'],
    description: 'Given an array of coin denominations and a target amount, return the fewest number of coins needed to make that amount. Return -1 if impossible.',
    examples: [
      'Input: coins = [1,2,5], amount = 11\nOutput: 3 (5+5+1)',
      'Input: coins = [2], amount = 3\nOutput: -1'
    ],
    approach: `**The Problem**
Minimum coins to make the amount.

**Bottom-Up DP**
dp[i] = minimum coins needed for amount i

**For Each Amount**
Try each coin. If coin <= amount:
dp[amount] = min(dp[amount], dp[amount - coin] + 1)

**Base Case**
dp[0] = 0 (zero coins for amount 0)`,
    solution: `def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)  # min coins for each amount
    dp[0] = 0  # 0 coins for amount 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                # use this coin + best way to make remainder
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1`,
    starterCode: `def coinChange(coins, amount):
    # Your code here`,
    timeComplexity: 'O(amount × coins)',
    spaceComplexity: 'O(amount)',
    youtubeUrl: 'https://www.youtube.com/watch?v=H9bfqozjoqs',
  },

  // ==========================================
  // BIT MANIPULATION
  // ==========================================
  {
    id: 'single-number',
    title: 'Single Number',
    difficulty: 'easy',
    topics: ['Bit Manipulation'],
    description: 'Given a non-empty array where every element appears twice except for one, find that single one. Must use O(1) space.',
    examples: [
      'Input: nums = [2,2,1]\nOutput: 1',
      'Input: nums = [4,1,2,1,2]\nOutput: 4'
    ],
    approach: `**The Magic: XOR**
XOR properties:
- a ^ a = 0 (same numbers cancel)
- a ^ 0 = a (XOR with 0 keeps number)
- XOR is commutative

**The Trick**
XOR all numbers together.
Pairs cancel out, leaving the single one!

2 ^ 2 ^ 1 = 0 ^ 1 = 1`,
    solution: `def singleNumber(nums):
    result = 0
    for num in nums:
        result ^= num  # pairs cancel out (a^a=0), single remains
    return result`,
    testCases: [
      { input: { nums: [2,2,1] }, expected: 1 },
      { input: { nums: [4,1,2,1,2] }, expected: 4 },
    ],
    starterCode: `def singleNumber(nums):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=qMPX1AOa83k',
  },
  {
    id: 'number-of-1-bits',
    title: 'Number of 1 Bits',
    difficulty: 'easy',
    topics: ['Bit Manipulation'],
    description: 'Write a function that returns the number of 1 bits in the binary representation of an unsigned integer (Hamming weight).',
    examples: [
      'Input: n = 11 (binary: 1011)\nOutput: 3',
      'Input: n = 128 (binary: 10000000)\nOutput: 1'
    ],
    approach: `**Brian Kernighan's Trick**
n & (n-1) removes the rightmost 1 bit!

**Why It Works**
n-1 flips the rightmost 1 and all bits after it.
AND with n clears that rightmost 1.

**The Pattern**
Count how many times until n becomes 0.`,
    solution: `def hammingWeight(n):
    count = 0
    while n:
        n &= n - 1  # clears rightmost 1 bit
        count += 1
    return count`,
    testCases: [
      { input: { n: 11 }, expected: 3 },
      { input: { n: 128 }, expected: 1 },
    ],
    starterCode: `def hammingWeight(n):
    # Your code here`,
    timeComplexity: 'O(k) - k is number of 1 bits',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=5Km3utixwZs',
  },
  {
    id: 'counting-bits',
    title: 'Counting Bits',
    difficulty: 'easy',
    topics: ['Dynamic Programming', 'Bit Manipulation'],
    description: 'Given an integer n, return an array ans of length n+1 such that ans[i] is the number of 1s in the binary representation of i.',
    examples: [
      'Input: n = 2\nOutput: [0,1,1]',
      'Input: n = 5\nOutput: [0,1,1,2,1,2]'
    ],
    approach: `**The DP Trick**
bits[i] = bits[i >> 1] + (i & 1)

**Why?**
i >> 1 is i divided by 2 (remove last bit).
i & 1 is 1 if last bit is 1, else 0.

**Example: i = 5 (101)**
bits[5] = bits[2] + 1 = 1 + 1 = 2`,
    solution: `def countBits(n):
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        # i>>1 removes last bit, i&1 checks if last bit is 1
        dp[i] = dp[i >> 1] + (i & 1)
    return dp`,
    starterCode: `def countBits(n):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=RyBM56RIWrM',
  },
  {
    id: 'reverse-bits',
    title: 'Reverse Bits',
    difficulty: 'easy',
    topics: ['Bit Manipulation'],
    description: 'Reverse the bits of a given 32-bit unsigned integer.',
    examples: [
      'Input: 00000010100101000001111010011100\nOutput: 00111001011110000010100101000000'
    ],
    approach: `**The Algorithm**
1. Start with result = 0
2. For each of 32 bits:
   - Shift result left by 1
   - Add the last bit of n to result
   - Shift n right by 1

**The Pattern**
result = (result << 1) | (n & 1)
n >>= 1`,
    solution: `def reverseBits(n):
    result = 0
    for _ in range(32):
        # shift result left, add last bit of n
        result = (result << 1) | (n & 1)
        n >>= 1  # move to next bit
    return result`,
    starterCode: `def reverseBits(n):
    # Your code here`,
    timeComplexity: 'O(1) - always 32 iterations',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=UcoN6UjAI64',
  },
  {
    id: 'missing-number',
    title: 'Missing Number',
    difficulty: 'easy',
    topics: ['Bit Manipulation', 'Math'],
    description: 'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing.',
    examples: [
      'Input: nums = [3,0,1]\nOutput: 2',
      'Input: nums = [0,1]\nOutput: 2'
    ],
    approach: `**Math Approach**
Expected sum = n*(n+1)/2
Actual sum = sum(nums)
Missing = Expected - Actual

**XOR Approach**
XOR all indices 0 to n.
XOR all numbers in array.
Result is the missing one.`,
    solution: `def missingNumber(nums):
    n = len(nums)
    expected = n * (n + 1) // 2  # sum of 0 to n
    return expected - sum(nums)  # difference is the missing one`,
    testCases: [
      { input: { nums: [3,0,1] }, expected: 2 },
      { input: { nums: [0,1] }, expected: 2 },
    ],
    starterCode: `def missingNumber(nums):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=WnPLSRLSANE',
  },

  // ==========================================
  // MATH
  // ==========================================
  {
    id: 'happy-number',
    title: 'Happy Number',
    difficulty: 'easy',
    topics: ['Math', 'Hash Table'],
    description: 'A happy number: replace the number by the sum of squares of its digits. Repeat until it equals 1 (happy) or loops forever (not happy).',
    examples: [
      'Input: n = 19\nOutput: true (19→82→68→100→1)',
      'Input: n = 2\nOutput: false (loops forever)'
    ],
    approach: `**Cycle Detection**
If we see the same number twice, we're in a loop.
Use a Set to track seen numbers.

**Or: Floyd's Algorithm**
Slow does one step, fast does two.
If they meet and it's not 1 → cycle.`,
    solution: `def isHappy(n):
    seen = set()  # detect cycles
    
    while n != 1 and n not in seen:
        seen.add(n)
        # sum of squares of digits
        n = sum(int(d) ** 2 for d in str(n))
    
    return n == 1  # reached 1 = happy`,
    testCases: [
      { input: { n: 19 }, expected: true },
      { input: { n: 2 }, expected: false },
    ],
    starterCode: `def isHappy(n):
    # Your code here`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(log n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=ljz85bxOYJ0',
  },
  {
    id: 'plus-one',
    title: 'Plus One',
    difficulty: 'easy',
    topics: ['Math', 'Arrays'],
    description: 'Given a large integer represented as an array of digits, increment the integer by one and return the resulting array.',
    examples: [
      'Input: digits = [1,2,3]\nOutput: [1,2,4]',
      'Input: digits = [9,9,9]\nOutput: [1,0,0,0]'
    ],
    approach: `**Handle Carry**
Start from the end.
If digit is 9, it becomes 0 and carry 1.
If digit < 9, just add 1 and done.

**Edge Case**
All 9s (like 999) → add 1 at front.`,
    solution: `def plusOne(digits):
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits  # no carry, done
        digits[i] = 0  # 9 becomes 0, carry continues
    
    return [1] + digits  # all 9s, need extra digit`,
    testCases: [
      { input: { digits: [1,2,3] }, expected: [1,2,4] },
      { input: { digits: [9,9,9] }, expected: [1,0,0,0] },
    ],
    starterCode: `def plusOne(digits):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=jIaA8boiG1s',
  },

  // ==========================================
  // INTERVALS
  // ==========================================
  {
    id: 'merge-intervals',
    title: 'Merge Intervals',
    difficulty: 'medium',
    topics: ['Arrays', 'Sorting'],
    description: 'Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.',
    examples: [
      'Input: intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]',
      'Input: intervals = [[1,4],[4,5]]\nOutput: [[1,5]]'
    ],
    approach: `**Sort First**
Sort by start time. Overlapping intervals will be adjacent.

**Merge Logic**
If current start <= previous end → overlap!
Extend previous end to max of both ends.
Otherwise, add new interval.

**The Pattern**
\`if start <= merged[-1][1]:\`
\`  merged[-1][1] = max(merged[-1][1], end)\`
\`else:\`
\`  merged.append([start, end])\``,
    solution: `def merge(intervals):
    intervals.sort()  # sort by start time
    merged = [intervals[0]]
    
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:  # overlaps with previous
            merged[-1][1] = max(merged[-1][1], end)  # extend
        else:
            merged.append([start, end])  # no overlap, new interval
    
    return merged`,
    starterCode: `def merge(intervals):
    # Your code here`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=44H3cEC2fFM',
  },
  {
    id: 'meeting-rooms',
    title: 'Meeting Rooms',
    difficulty: 'easy',
    topics: ['Arrays', 'Sorting', 'Intervals'],
    description: 'Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings (i.e., no two meetings overlap).',
    examples: [
      'Input: intervals = [[0,30],[5,10],[15,20]]\nOutput: false\nExplanation: [0,30] overlaps with both [5,10] and [15,20]',
      'Input: intervals = [[7,10],[2,4]]\nOutput: true\nExplanation: No overlaps after sorting: [2,4], [7,10]'
    ],
    approach: `**Sort First**
Sort by start time. If any meeting starts before the previous ends, there's a conflict.

**Key Insight**
After sorting, we only need to check adjacent meetings.
If current.start < prev.end → conflict!

**The Pattern**
\`intervals.sort()\`
\`for i in range(1, len(intervals)):\`
\`  if intervals[i][0] < intervals[i-1][1]:\`
\`    return False\``,
    solution: `def canAttendMeetings(intervals):
    # sort by start time
    intervals.sort()
    
    # check if any meeting starts before previous ends
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i-1][1]:
            return False  # overlap found
    
    return True`,
    testCases: [
      { input: { intervals: [[0,30],[5,10],[15,20]] }, expected: false },
      { input: { intervals: [[7,10],[2,4]] }, expected: true },
      { input: { intervals: [[1,5],[8,10]] }, expected: true },
    ],
    starterCode: `def canAttendMeetings(intervals):
    # Your code here`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=PaJxqZVPhbg',
  },
]
