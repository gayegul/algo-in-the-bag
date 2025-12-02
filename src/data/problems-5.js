// Batch 2: More essential patterns - Heaps, Graphs, Backtracking, advanced Arrays

export const PROBLEMS_5 = [
  // ==========================================
  // ARRAYS & HASHING (continued)
  // ==========================================
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    difficulty: 'medium',
    topics: ['Arrays', 'Hash Table', 'Sorting'],
    description: 'Given an array of strings strs, group the anagrams together. You can return the answer in any order.',
    examples: [
      'Input: strs = ["eat","tea","tan","ate","nat","bat"]\nOutput: [["bat"],["nat","tan"],["ate","eat","tea"]]',
      'Input: strs = [""]\nOutput: [[""]]'
    ],
    approach: `**The Problem**
Group words that are anagrams of each other.

**Key Insight**
Anagrams have the same letters → same sorted version.
"eat", "tea", "ate" all sort to "aet"

**The Pattern**
Use sorted string as dictionary key.
All anagrams map to the same key.

\`groups = defaultdict(list)\`
\`for word: groups[sorted(word)].append(word)\``,
    solution: `from collections import defaultdict

def groupAnagrams(strs):
    groups = defaultdict(list)  # sorted_string -> list of anagrams
    
    for s in strs:
        key = ''.join(sorted(s))  # anagrams share same sorted form
        groups[key].append(s)
    
    return list(groups.values())`,
    testCases: [
      { input: { strs: ["eat","tea","tan","ate","nat","bat"] }, expected: [["bat"],["nat","tan"],["ate","eat","tea"]] },
    ],
    starterCode: `def groupAnagrams(strs):
    # Your code here`,
    timeComplexity: 'O(n × k log k) - k is max string length',
    spaceComplexity: 'O(n × k)',
    youtubeUrl: 'https://www.youtube.com/watch?v=vzdNOK2oB2E',
  },
  {
    id: 'top-k-frequent',
    title: 'Top K Frequent Elements',
    difficulty: 'medium',
    topics: ['Arrays', 'Hash Table', 'Heap'],
    description: 'Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.',
    examples: [
      'Input: nums = [1,1,1,2,2,3], k = 2\nOutput: [1,2]',
      'Input: nums = [1], k = 1\nOutput: [1]'
    ],
    approach: `**The Problem**
Find the k numbers that appear most often.

**Approach 1: Heap**
Count frequencies, use min-heap of size k.

**Approach 2: Bucket Sort (O(n))**
Create buckets where index = frequency.
bucket[3] = numbers that appear 3 times.
Walk backwards to get top k.

**The Pattern**
\`count = Counter(nums)\`
\`buckets[freq].append(num)\``,
    solution: `from collections import Counter

def topKFrequent(nums, k):
    count = Counter(nums)
    # bucket[i] = numbers that appear i times
    buckets = [[] for _ in range(len(nums) + 1)]
    
    for num, freq in count.items():
        buckets[freq].append(num)
    
    # walk backwards from highest frequency
    result = []
    for i in range(len(buckets) - 1, 0, -1):
        for num in buckets[i]:
            result.append(num)
            if len(result) == k:
                return result
    
    return result`,
    testCases: [
      { input: { nums: [1,1,1,2,2,3], k: 2 }, expected: [1,2] },
    ],
    starterCode: `def topKFrequent(nums, k):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=YPTqKIgVk-k',
  },
  {
    id: 'product-except-self',
    title: 'Product of Array Except Self',
    difficulty: 'medium',
    topics: ['Arrays', 'Prefix Sum'],
    description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. You must write an algorithm that runs in O(n) time and without using division.',
    examples: [
      'Input: nums = [1,2,3,4]\nOutput: [24,12,8,6]',
      'Input: nums = [-1,1,0,-3,3]\nOutput: [0,0,9,0,0]'
    ],
    approach: `**The Problem**
Product of everything except current element.
Can't use division. Must be O(n).

**Key Insight: Prefix × Suffix**
answer[i] = (product of all left) × (product of all right)

**Two Pass Solution**
Pass 1: Build prefix products going left→right
Pass 2: Multiply by suffix products going right→left

**Example: [1, 2, 3, 4]**
Prefix: [1, 1, 2, 6]
Suffix: [24, 12, 4, 1]
Result: [24, 12, 8, 6]`,
    solution: `def productExceptSelf(nums):
    n = len(nums)
    result = [1] * n
    
    # result[i] = product of everything LEFT of i
    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]
    
    # multiply by product of everything RIGHT of i
    suffix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]
    
    return result`,
    testCases: [
      { input: { nums: [1,2,3,4] }, expected: [24,12,8,6] },
    ],
    starterCode: `def productExceptSelf(nums):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1) - output array not counted',
    youtubeUrl: 'https://www.youtube.com/watch?v=bNvIQI2wAjk',
  },

  // ==========================================
  // TWO POINTERS (continued)
  // ==========================================
  {
    id: 'two-sum-ii',
    title: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'medium',
    topics: ['Arrays', 'Two Pointers'],
    description: 'Given a 1-indexed sorted array, find two numbers that add up to target. Return their indices (1-indexed). Each input has exactly one solution.',
    examples: [
      'Input: numbers = [2,7,11,15], target = 9\nOutput: [1,2] (2 + 7 = 9)',
      'Input: numbers = [2,3,4], target = 6\nOutput: [1,3]'
    ],
    approach: `**Key Difference from Two Sum**
Array is SORTED. Use two pointers instead of hashmap.

**The Algorithm**
Left pointer at start, right at end.
- Sum too small? Move left pointer right
- Sum too big? Move right pointer left
- Equal? Found it!

**Why It Works**
Sorted order means moving pointers adjusts sum predictably.`,
    solution: `def twoSum(numbers, target):
    left, right = 0, len(numbers) - 1
    
    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return [left + 1, right + 1]  # 1-indexed
        elif total < target:
            left += 1  # need bigger sum
        else:
            right -= 1  # need smaller sum
    
    return []`,
    testCases: [
      { input: { numbers: [2,7,11,15], target: 9 }, expected: [1,2] },
      { input: { numbers: [2,3,4], target: 6 }, expected: [1,3] },
    ],
    starterCode: `def twoSum(numbers, target):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=cQ1Oz4ckceM',
  },

  // ==========================================
  // STACK (continued)
  // ==========================================
  {
    id: 'min-stack',
    title: 'Min Stack',
    difficulty: 'medium',
    topics: ['Stack', 'Design'],
    description: 'Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.',
    examples: [
      'MinStack minStack = new MinStack();\nminStack.push(-2); minStack.push(0); minStack.push(-3);\nminStack.getMin(); // return -3\nminStack.pop();\nminStack.top();    // return 0\nminStack.getMin(); // return -2'
    ],
    approach: `**The Problem**
Normal stack ops + getMin() in O(1).

**The Trick: Two Stacks**
Main stack: stores values
Min stack: stores minimum at each level

**Why It Works**
When you push, also push current min.
When you pop, also pop from min stack.
Min stack top is always current minimum.`,
    solution: `class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []  # tracks min at each level
    
    def push(self, val):
        self.stack.append(val)
        # store current min (smallest of val or previous min)
        min_val = min(val, self.min_stack[-1] if self.min_stack else val)
        self.min_stack.append(min_val)
    
    def pop(self):
        self.stack.pop()
        self.min_stack.pop()  # keep stacks in sync
    
    def top(self):
        return self.stack[-1]
    
    def getMin(self):
        return self.min_stack[-1]  # O(1) min lookup`,
    starterCode: `class MinStack:
    def __init__(self):
        pass
    
    def push(self, val):
        pass
    
    def pop(self):
        pass
    
    def top(self):
        pass
    
    def getMin(self):
        pass`,
    timeComplexity: 'O(1) for all operations',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=qkLl7nAwDPo',
  },

  // ==========================================
  // BINARY SEARCH (continued)
  // ==========================================
  {
    id: 'search-2d-matrix',
    title: 'Search a 2D Matrix',
    difficulty: 'medium',
    topics: ['Binary Search', 'Matrix'],
    description: 'Write an efficient algorithm that searches for a value target in an m x n integer matrix. Each row is sorted left to right, and first integer of each row is greater than last integer of previous row.',
    examples: [
      'Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3\nOutput: true',
      'Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13\nOutput: false'
    ],
    approach: `**Key Insight**
Matrix is essentially a sorted 1D array split into rows.

**Treat as 1D Array**
Total elements = m × n
For index i:
- row = i // n
- col = i % n

**Standard Binary Search**
Now just do normal binary search on indices 0 to m×n-1.`,
    solution: `def searchMatrix(matrix, target):
    m, n = len(matrix), len(matrix[0])
    left, right = 0, m * n - 1
    
    while left <= right:
        mid = (left + right) // 2
        row, col = mid // n, mid % n
        val = matrix[row][col]
        
        if val == target:
            return True
        elif val < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return False`,
    testCases: [
      { input: { matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 3 }, expected: true },
      { input: { matrix: [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target: 13 }, expected: false },
    ],
    starterCode: `def searchMatrix(matrix, target):
    # Your code here`,
    timeComplexity: 'O(log(m × n))',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=Ber2pi2C0j0',
  },

  // ==========================================
  // TREES (continued)
  // ==========================================
  {
    id: 'lca-bst',
    title: 'Lowest Common Ancestor of BST',
    difficulty: 'medium',
    topics: ['Trees', 'BST'],
    description: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes p and q.',
    examples: [
      'Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8\nOutput: 6',
      'Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4\nOutput: 2'
    ],
    approach: `**Use BST Property**
Left subtree < node < right subtree

**The Algorithm**
At each node:
- Both p,q smaller? LCA is in left subtree
- Both p,q larger? LCA is in right subtree
- Split (one left, one right)? Current node IS the LCA!

**No recursion needed**
Just walk down the tree.`,
    solution: `def lowestCommonAncestor(root, p, q):
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left
        elif p.val > root.val and q.val > root.val:
            root = root.right
        else:
            return root
    
    return None`,
    starterCode: `def lowestCommonAncestor(root, p, q):
    # Your code here`,
    timeComplexity: 'O(h) - height of tree',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=gs2LMfuOR9k',
  },
  {
    id: 'level-order-traversal',
    title: 'Binary Tree Level Order Traversal',
    difficulty: 'medium',
    topics: ['Trees', 'BFS'],
    description: 'Given the root of a binary tree, return the level order traversal of its nodes values (i.e., from left to right, level by level).',
    examples: [
      'Input: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]',
      'Input: root = [1]\nOutput: [[1]]'
    ],
    approach: `**BFS with Level Tracking**
Use a queue. Process level by level.

**The Trick**
At each level, record queue size.
Process exactly that many nodes.
All their children form the next level.

**The Pattern**
\`while queue:\`
\`  level_size = len(queue)\`
\`  level = []\`
\`  for _ in range(level_size):\`
\`    process node, add children\``,
    solution: `from collections import deque

def levelOrder(root):
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level = []
        # process all nodes at current level
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            # add children for next level
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    
    return result`,
    starterCode: `def levelOrder(root):
    # Your code here`,
    testCases: [
      { input: { root: [3,9,20,null,null,15,7] }, expected: [[3],[9,20],[15,7]] },
      { input: { root: [1] }, expected: [[1]] },
      { input: { root: [] }, expected: [] },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=6ZnyEApgFYg',
  },

  // ==========================================
  // HEAP / PRIORITY QUEUE
  // ==========================================
  {
    id: 'kth-largest-stream',
    title: 'Kth Largest Element in a Stream',
    difficulty: 'easy',
    topics: ['Heap', 'Design'],
    description: 'Design a class to find the kth largest element in a stream. Note that it is the kth largest in the sorted order, not the kth distinct element.',
    examples: [
      'KthLargest kthLargest = new KthLargest(3, [4,5,8,2]);\nkthLargest.add(3);  // return 4\nkthLargest.add(5);  // return 5\nkthLargest.add(10); // return 5\nkthLargest.add(9);  // return 8'
    ],
    approach: `**Use a Min-Heap of Size k**
Keep only the k largest elements.
The smallest of these (heap top) is the kth largest!

**Why Min-Heap?**
We want quick access to the SMALLEST of our k elements.
When adding, if new element > heap top, swap them.

**The Pattern**
\`heappush, if len > k: heappop\`
\`return heap[0]\``,
    solution: `import heapq

class KthLargest:
    def __init__(self, k, nums):
        self.k = k
        self.heap = nums  # min-heap of k largest elements
        heapq.heapify(self.heap)
        # trim to k elements
        while len(self.heap) > k:
            heapq.heappop(self.heap)
    
    def add(self, val):
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)  # remove smallest
        return self.heap[0]  # kth largest = smallest in our k`,
    starterCode: `class KthLargest:
    def __init__(self, k, nums):
        pass
    
    def add(self, val):
        pass`,
    timeComplexity: 'O(log k) per add',
    spaceComplexity: 'O(k)',
    youtubeUrl: 'https://www.youtube.com/watch?v=hOjcdrqMoQ8',
  },
  {
    id: 'last-stone-weight',
    title: 'Last Stone Weight',
    difficulty: 'easy',
    topics: ['Heap'],
    description: 'You are given an array of stones where stones[i] is the weight. Each turn, choose the two heaviest stones and smash them. If x == y, both destroyed. If x != y, stone of weight y - x remains. Return the weight of the last stone, or 0 if none.',
    examples: [
      'Input: stones = [2,7,4,1,8,1]\nOutput: 1\n(7,8→1, 2,4→2, 1,2→1, 1,1→0, left with 1)',
    ],
    approach: `**Always Need Two Heaviest**
→ Use a max-heap!

**Python Trick**
Python only has min-heap.
Store negative values to simulate max-heap.

**The Pattern**
\`while len(heap) > 1:\`
\`  first = -heappop(heap)\`
\`  second = -heappop(heap)\`
\`  if first != second:\`
\`    heappush(heap, -(first - second))\``,
    solution: `import heapq

def lastStoneWeight(stones):
    # python has min-heap, negate for max-heap behavior
    heap = [-s for s in stones]
    heapq.heapify(heap)
    
    while len(heap) > 1:
        first = -heapq.heappop(heap)  # heaviest
        second = -heapq.heappop(heap)  # second heaviest
        if first != second:
            heapq.heappush(heap, -(first - second))  # remainder
    
    return -heap[0] if heap else 0`,
    testCases: [
      { input: { stones: [2,7,4,1,8,1] }, expected: 1 },
    ],
    starterCode: `def lastStoneWeight(stones):
    # Your code here`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=B-QCq79-Vfw',
  },

  // ==========================================
  // GRAPHS
  // ==========================================
  {
    id: 'number-of-islands',
    title: 'Number of Islands',
    difficulty: 'medium',
    topics: ['Graph', 'DFS', 'BFS', 'Matrix'],
    description: 'Given an m x n 2D grid map of "1"s (land) and "0"s (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
    examples: [
      'Input: grid = [\n  ["1","1","0","0","0"],\n  ["1","1","0","0","0"],\n  ["0","0","1","0","0"],\n  ["0","0","0","1","1"]\n]\nOutput: 3'
    ],
    approach: `**Classic DFS/BFS on Grid**
When you find a "1", that's a new island.
DFS to mark all connected land as visited.
Count how many times you start a new DFS.

**Mark Visited**
Either use a set, or modify grid in place (set to "0").

**The Pattern**
\`for each cell:\`
\`  if cell == "1":\`
\`    count += 1\`
\`    dfs to mark entire island\``,
    solution: `def numIslands(grid):
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        # out of bounds or not land
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        if grid[r][c] != "1":
            return
        
        grid[r][c] = "0"  # mark as visited
        # explore all 4 directions
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == "1":
                count += 1  # found new island
                dfs(r, c)  # mark entire island
    
    return count`,
    starterCode: `def numIslands(grid):
    # Your code here`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n) worst case recursion',
    youtubeUrl: 'https://www.youtube.com/watch?v=pV2kpPD66nE',
  },

  // ==========================================
  // BACKTRACKING
  // ==========================================
  {
    id: 'subsets',
    title: 'Subsets',
    difficulty: 'medium',
    topics: ['Backtracking', 'Arrays'],
    description: 'Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.',
    examples: [
      'Input: nums = [1,2,3]\nOutput: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]',
      'Input: nums = [0]\nOutput: [[],[0]]'
    ],
    approach: `**The Backtracking Pattern**
For each element, two choices:
1. Include it
2. Don't include it

**Decision Tree**
Start empty. At each index, branch into include/exclude.
When index reaches end, that path is one subset.

**The Pattern**
\`def backtrack(index, current):\`
\`  if index == len(nums):\`
\`    result.append(current.copy())\`
\`    return\`
\`  # include nums[index]\`
\`  current.append(nums[index])\`
\`  backtrack(index + 1, current)\`
\`  # exclude (backtrack)\`
\`  current.pop()\`
\`  backtrack(index + 1, current)\``,
    solution: `def subsets(nums):
    result = []
    
    def backtrack(index, current):
        # reached end of array = one complete subset
        if index == len(nums):
            result.append(current.copy())
            return
        
        # choice 1: include nums[index]
        current.append(nums[index])
        backtrack(index + 1, current)
        
        # choice 2: exclude nums[index] (backtrack)
        current.pop()
        backtrack(index + 1, current)
    
    backtrack(0, [])
    return result`,
    testCases: [
      { input: { nums: [1,2,3] }, expected: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]] },
    ],
    starterCode: `def subsets(nums):
    # Your code here`,
    timeComplexity: 'O(n × 2^n)',
    spaceComplexity: 'O(n) - recursion depth',
    youtubeUrl: 'https://www.youtube.com/watch?v=REOH22Xwdkk',
  },
]
