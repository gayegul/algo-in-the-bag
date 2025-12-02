// Batch 3: More easy problems - foundational patterns

export const PROBLEMS_6 = [
  // ==========================================
  // ARRAYS
  // ==========================================
  {
    id: 'longest-consecutive',
    title: 'Longest Consecutive Sequence',
    difficulty: 'medium',
    topics: ['Arrays', 'Hash Table'],
    description: 'Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. Must run in O(n) time.',
    examples: [
      'Input: nums = [100,4,200,1,3,2]\nOutput: 4 (sequence is [1,2,3,4])',
      'Input: nums = [0,3,7,2,5,8,4,6,0,1]\nOutput: 9'
    ],
    approach: `**The Problem**
Find longest streak of consecutive numbers.
Must be O(n) - can't sort!

**Key Insight: Use a Set**
Put all numbers in a set.
Only start counting from sequence START (no left neighbor).

**How to Find Start**
If num-1 is NOT in set, then num is a start.

**The Pattern**
\`for num in set:\`
\`  if num-1 not in set:  # it's a start\`
\`    count streak length\``,
    solution: `def longestConsecutive(nums):
    num_set = set(nums)
    longest = 0
    
    for num in num_set:
        # only start counting from sequence beginnings
        if num - 1 not in num_set:
            length = 1
            while num + length in num_set:
                length += 1
            longest = max(longest, length)
    
    return longest`,
    testCases: [
      { input: { nums: [100,4,200,1,3,2] }, expected: 4 },
      { input: { nums: [0,3,7,2,5,8,4,6,0,1] }, expected: 9 },
    ],
    starterCode: `def longestConsecutive(nums):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=P6RZZMu_maU',
  },
  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    difficulty: 'medium',
    topics: ['Arrays', 'Dynamic Programming', 'Greedy'],
    description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
    examples: [
      'Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6 (subarray [4,-1,2,1])',
      'Input: nums = [1]\nOutput: 1'
    ],
    approach: `**Kadane's Algorithm**
Track current sum as you go.
If current sum goes negative, reset to 0.

**Why?**
A negative prefix never helps.
Better to start fresh.

**The Pattern**
\`current = 0, max_sum = nums[0]\`
\`for num:\`
\`  current = max(num, current + num)\`
\`  max_sum = max(max_sum, current)\``,
    solution: `def maxSubArray(nums):
    max_sum = nums[0]
    current = 0
    
    for num in nums:
        # either extend current subarray or start fresh
        current = max(num, current + num)
        max_sum = max(max_sum, current)
    
    return max_sum`,
    testCases: [
      { input: { nums: [-2,1,-3,4,-1,2,1,-5,4] }, expected: 6 },
      { input: { nums: [1] }, expected: 1 },
      { input: { nums: [-1] }, expected: -1 },
    ],
    starterCode: `def maxSubArray(nums):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=5WZl3MMT0Eg',
  },

  // ==========================================
  // TWO POINTERS
  // ==========================================
  {
    id: 'container-with-most-water',
    title: 'Container With Most Water',
    difficulty: 'medium',
    topics: ['Arrays', 'Two Pointers', 'Greedy'],
    description: 'Given n non-negative integers height[i] representing vertical lines, find two lines that together with the x-axis form a container that holds the most water.',
    examples: [
      'Input: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49 (between index 1 and 8)',
    ],
    approach: `**Two Pointers from Outside**
Start with widest container (left=0, right=end).
Water = min(height[left], height[right]) × width

**Which Pointer to Move?**
Move the SHORTER one.
Why? Moving the taller one can only decrease area.

**The Pattern**
\`while left < right:\`
\`  area = min(h[left], h[right]) * (right - left)\`
\`  if h[left] < h[right]: left += 1\`
\`  else: right -= 1\``,
    solution: `def maxArea(height):
    left, right = 0, len(height) - 1
    max_water = 0
    
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        
        # move the shorter side (moving taller can only hurt us)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_water`,
    testCases: [
      { input: { height: [1,8,6,2,5,4,8,3,7] }, expected: 49 },
    ],
    starterCode: `def maxArea(height):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=UuiTKBwPgAo',
  },

  // ==========================================
  // LINKED LIST
  // ==========================================
  {
    id: 'remove-nth-from-end',
    title: 'Remove Nth Node From End of List',
    difficulty: 'medium',
    topics: ['Linked List', 'Two Pointers'],
    description: 'Given the head of a linked list, remove the nth node from the end of the list and return its head.',
    examples: [
      'Input: head = [1,2,3,4,5], n = 2\nOutput: [1,2,3,5]',
      'Input: head = [1], n = 1\nOutput: []'
    ],
    approach: `**Two Pointer Gap Trick**
Move fast pointer n steps ahead.
Then move both until fast hits end.
Now slow is at the node BEFORE the one to delete.

**Use Dummy Node**
Handles edge case of removing head.

**The Pattern**
\`fast = head, move n steps\`
\`slow = dummy\`
\`while fast: move both\`
\`slow.next = slow.next.next\``,
    solution: `def removeNthFromEnd(head, n):
    dummy = ListNode(0, head)  # handles edge case of removing head
    fast = head
    slow = dummy
    
    # create n-node gap between fast and slow
    for _ in range(n):
        fast = fast.next
    
    # when fast hits end, slow is right before target
    while fast:
        fast = fast.next
        slow = slow.next
    
    slow.next = slow.next.next  # skip the target node
    
    return dummy.next`,
    starterCode: `def removeNthFromEnd(head, n):
    # Your code here`,
    testCases: [
      { input: { head: [1,2,3,4,5], n: 2 }, expected: [1,2,3,5], expectedType: 'list' },
      { input: { head: [1], n: 1 }, expected: [], expectedType: 'list' },
      { input: { head: [1,2], n: 1 }, expected: [1], expectedType: 'list' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=XVuQxVej6y8',
  },
  {
    id: 'reorder-list',
    title: 'Reorder List',
    difficulty: 'medium',
    topics: ['Linked List', 'Two Pointers'],
    description: 'Given head of a singly linked list L0→L1→...→Ln, reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→... You may not modify node values.',
    examples: [
      'Input: head = [1,2,3,4]\nOutput: [1,4,2,3]',
      'Input: head = [1,2,3,4,5]\nOutput: [1,5,2,4,3]'
    ],
    approach: `**Three Steps**
1. Find middle (slow/fast pointers)
2. Reverse second half
3. Merge alternating

**Step 1: Find Middle**
Slow moves 1, fast moves 2.
When fast hits end, slow is at middle.

**Step 2: Reverse**
Standard reverse linked list on second half.

**Step 3: Merge**
Take one from first, one from second, alternate.`,
    solution: `def reorderList(head):
    if not head or not head.next:
        return
    
    # step 1: find middle with slow/fast pointers
    slow, fast = head, head
    while fast.next and fast.next.next:
        slow = slow.next
        fast = fast.next.next
    
    # step 2: reverse second half
    prev, curr = None, slow.next
    slow.next = None  # cut the list
    while curr:
        next_node = curr.next
        curr.next = prev
        prev = curr
        curr = next_node
    
    # step 3: merge two halves alternating
    first, second = head, prev
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second
        second.next = tmp1
        first, second = tmp1, tmp2`,
    starterCode: `def reorderList(head):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=S5bfdUTrKLM',
  },

  // ==========================================
  // TREES
  // ==========================================
  {
    id: 'validate-bst',
    title: 'Validate Binary Search Tree',
    difficulty: 'medium',
    topics: ['Trees', 'BST', 'DFS'],
    description: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
    examples: [
      'Input: root = [2,1,3]\nOutput: true',
      'Input: root = [5,1,4,null,null,3,6]\nOutput: false (4 is in right subtree but < 5)'
    ],
    approach: `**The Trap**
Just checking node > left and node < right is NOT enough.
Every node in right subtree must be > root, not just immediate child.

**Solution: Pass Valid Range**
Each node has a valid range (min, max).
Root: (-∞, +∞)
Left child: (min, parent)
Right child: (parent, max)

**The Pattern**
\`def valid(node, min_val, max_val):\`
\`  if node.val <= min_val or node.val >= max_val:\`
\`    return False\`
\`  return valid(left, min, node.val) and valid(right, node.val, max)\``,
    solution: `def isValidBST(root):
    def valid(node, min_val, max_val):
        if not node:
            return True
        # every node must be within its valid range
        if node.val <= min_val or node.val >= max_val:
            return False
        # left child: must be less than current (update max)
        # right child: must be greater than current (update min)
        return (valid(node.left, min_val, node.val) and 
                valid(node.right, node.val, max_val))
    
    return valid(root, float('-inf'), float('inf'))`,
    starterCode: `def isValidBST(root):
    # Your code here`,
    testCases: [
      { input: { root: [2,1,3] }, expected: true },
      { input: { root: [5,1,4,null,null,3,6] }, expected: false },
      { input: { root: [1] }, expected: true },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    youtubeUrl: 'https://www.youtube.com/watch?v=s6ATEkipzow',
  },
  {
    id: 'kth-smallest-bst',
    title: 'Kth Smallest Element in a BST',
    difficulty: 'medium',
    topics: ['Trees', 'BST', 'DFS'],
    description: 'Given the root of a BST and an integer k, return the kth smallest value (1-indexed) in the tree.',
    examples: [
      'Input: root = [3,1,4,null,2], k = 1\nOutput: 1',
      'Input: root = [5,3,6,2,4,null,null,1], k = 3\nOutput: 3'
    ],
    approach: `**Key Insight: Inorder = Sorted**
Inorder traversal of BST gives sorted order!
Left → Node → Right

**The Algorithm**
Do inorder traversal.
Count nodes visited.
When count == k, that's the answer.

**Can Use Stack or Recursion**
Stack version lets you stop early.`,
    solution: `def kthSmallest(root, k):
    stack = []
    curr = root
    count = 0
    
    # inorder traversal gives BST nodes in sorted order
    while stack or curr:
        # go all the way left first
        while curr:
            stack.append(curr)
            curr = curr.left
        
        # visit smallest unvisited node
        curr = stack.pop()
        count += 1
        if count == k:
            return curr.val
        
        # check right subtree next
        curr = curr.right
    
    return -1`,
    starterCode: `def kthSmallest(root, k):
    # Your code here`,
    testCases: [
      { input: { root: [3,1,4,null,2], k: 1 }, expected: 1 },
      { input: { root: [5,3,6,2,4,null,null,1], k: 3 }, expected: 3 },
      { input: { root: [1], k: 1 }, expected: 1 },
    ],
    timeComplexity: 'O(H + k) - H is height',
    spaceComplexity: 'O(H)',
    youtubeUrl: 'https://www.youtube.com/watch?v=5LUXSvjmGCw',
  },

  // ==========================================
  // GRAPHS
  // ==========================================
  {
    id: 'clone-graph',
    title: 'Clone Graph',
    difficulty: 'medium',
    topics: ['Graph', 'DFS', 'BFS', 'Hash Table'],
    description: 'Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node contains a value and a list of neighbors.',
    examples: [
      'Input: adjList = [[2,4],[1,3],[2,4],[1,3]]\nOutput: [[2,4],[1,3],[2,4],[1,3]]'
    ],
    approach: `**The Problem**
Create a complete copy. Every node must be new.

**Use a HashMap**
Map original node → cloned node.
Prevents infinite loops on cycles.

**DFS Approach**
If already cloned, return from map.
Otherwise, create clone, add to map, clone all neighbors.

**The Pattern**
\`def clone(node):\`
\`  if node in map: return map[node]\`
\`  copy = Node(node.val)\`
\`  map[node] = copy\`
\`  for neighbor: copy.neighbors.append(clone(neighbor))\``,
    solution: `def cloneGraph(node):
    if not node:
        return None
    
    cloned = {}  # original node -> cloned node
    
    def dfs(node):
        if node in cloned:
            return cloned[node]  # already cloned, avoid cycles
        
        copy = Node(node.val)
        cloned[node] = copy  # map before recursing
        
        for neighbor in node.neighbors:
            copy.neighbors.append(dfs(neighbor))
        
        return copy
    
    return dfs(node)`,
    starterCode: `def cloneGraph(node):
    # Your code here`,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    youtubeUrl: 'https://www.youtube.com/watch?v=mQeF6bN8hMk',
  },
  {
    id: 'course-schedule',
    title: 'Course Schedule',
    difficulty: 'medium',
    topics: ['Graph', 'DFS', 'Topological Sort'],
    description: 'There are numCourses courses labeled 0 to numCourses-1. Given prerequisites array where prerequisites[i] = [a, b] means you must take b before a. Return true if you can finish all courses.',
    examples: [
      'Input: numCourses = 2, prerequisites = [[1,0]]\nOutput: true (take 0 then 1)',
      'Input: numCourses = 2, prerequisites = [[1,0],[0,1]]\nOutput: false (cycle!)'
    ],
    approach: `**The Problem**
Can we take all courses? Only impossible if there's a cycle.

**Build Adjacency List**
Map each course to its prerequisites.

**DFS Cycle Detection**
Track visiting (in current path) vs visited (done).
If we see a "visiting" node → cycle!

**The Pattern**
\`def dfs(course):\`
\`  if course in visiting: return False  # cycle\`
\`  if course in visited: return True\`
\`  visiting.add(course)\`
\`  for prereq: if not dfs(prereq): return False\`
\`  visiting.remove(course)\`
\`  visited.add(course)\``,
    solution: `def canFinish(numCourses, prerequisites):
    graph = {i: [] for i in range(numCourses)}
    for course, prereq in prerequisites:
        graph[course].append(prereq)
    
    visiting = set()  # currently in DFS path (cycle detection)
    visited = set()   # completely done
    
    def dfs(course):
        if course in visiting:
            return False  # cycle found
        if course in visited:
            return True
        
        visiting.add(course)
        for prereq in graph[course]:
            if not dfs(prereq):
                return False
        visiting.remove(course)  # backtrack
        visited.add(course)
        return True
    
    for course in range(numCourses):
        if not dfs(course):
            return False
    return True`,
    starterCode: `def canFinish(numCourses, prerequisites):
    # Your code here`,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    youtubeUrl: 'https://www.youtube.com/watch?v=EgI5nU9etnU',
  },

  // ==========================================
  // BACKTRACKING
  // ==========================================
  {
    id: 'combination-sum',
    title: 'Combination Sum',
    difficulty: 'medium',
    topics: ['Backtracking', 'Arrays'],
    description: 'Given an array of distinct integers candidates and a target, return all unique combinations where the chosen numbers sum to target. Same number may be used unlimited times.',
    examples: [
      'Input: candidates = [2,3,6,7], target = 7\nOutput: [[2,2,3],[7]]',
      'Input: candidates = [2,3,5], target = 8\nOutput: [[2,2,2,2],[2,3,3],[3,5]]'
    ],
    approach: `**Backtracking with Reuse**
Unlike subsets, we can reuse the same number.

**Key: Start Index**
To avoid duplicates like [2,3] and [3,2], only pick from current index onward.

**The Pattern**
\`def backtrack(start, target, path):\`
\`  if target == 0: save path\`
\`  if target < 0: return\`
\`  for i from start to end:\`
\`    backtrack(i, target - candidates[i], path + [candidates[i]])\``,
    solution: `def combinationSum(candidates, target):
    result = []
    
    def backtrack(start, remaining, path):
        if remaining == 0:
            result.append(path.copy())  # found valid combination
            return
        if remaining < 0:
            return  # overshot
        
        for i in range(start, len(candidates)):
            path.append(candidates[i])
            # pass i not i+1 because we can reuse same number
            backtrack(i, remaining - candidates[i], path)
            path.pop()  # backtrack
    
    backtrack(0, target, [])
    return result`,
    testCases: [
      { input: { candidates: [2,3,6,7], target: 7 }, expected: [[2,2,3],[7]] },
    ],
    starterCode: `def combinationSum(candidates, target):
    # Your code here`,
    timeComplexity: 'O(n^(target/min))',
    spaceComplexity: 'O(target/min)',
    youtubeUrl: 'https://www.youtube.com/watch?v=GBKI9VSKdGg',
  },
  {
    id: 'permutations',
    title: 'Permutations',
    difficulty: 'medium',
    topics: ['Backtracking', 'Arrays'],
    description: 'Given an array nums of distinct integers, return all possible permutations in any order.',
    examples: [
      'Input: nums = [1,2,3]\nOutput: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]',
      'Input: nums = [0,1]\nOutput: [[0,1],[1,0]]'
    ],
    approach: `**Different from Subsets**
Subsets: include/exclude decisions.
Permutations: arrangements of ALL elements.

**The Trick**
Track which elements are "used".
Try each unused element at current position.

**The Pattern**
\`def backtrack(path):\`
\`  if len(path) == len(nums): save\`
\`  for num in nums:\`
\`    if num not in path:\`
\`      backtrack(path + [num])\``,
    solution: `def permute(nums):
    result = []
    
    def backtrack(path):
        if len(path) == len(nums):
            result.append(path.copy())  # complete permutation
            return
        
        for num in nums:
            if num not in path:  # only use each number once
                path.append(num)
                backtrack(path)
                path.pop()  # backtrack
    
    backtrack([])
    return result`,
    testCases: [
      { input: { nums: [1,2,3] }, expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
    ],
    starterCode: `def permute(nums):
    # Your code here`,
    timeComplexity: 'O(n × n!)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=s7AvT7cGdSo',
  },
  {
    id: 'word-search',
    title: 'Word Search',
    difficulty: 'medium',
    topics: ['Backtracking', 'Matrix'],
    description: 'Given an m x n grid of characters board and a string word, return true if word exists in the grid. Word can be constructed from letters of adjacent cells (horizontal or vertical).',
    examples: [
      'Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"\nOutput: true',
    ],
    approach: `**Grid Backtracking**
Try each cell as starting point.
DFS in 4 directions, marking visited cells.

**Mark Visited Trick**
Temporarily change cell to '#' to mark visited.
Restore after backtracking.

**The Pattern**
\`def dfs(r, c, i):\`
\`  if i == len(word): return True\`
\`  if out of bounds or board[r][c] != word[i]: return False\`
\`  temp = board[r][c]\`
\`  board[r][c] = '#'\`
\`  found = dfs(r+1,c,i+1) or dfs(r-1,c,i+1) or ...\`
\`  board[r][c] = temp\`
\`  return found\``,
    solution: `def exist(board, word):
    rows, cols = len(board), len(board[0])
    
    def dfs(r, c, i):
        if i == len(word):
            return True  # matched entire word
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return False
        if board[r][c] != word[i]:
            return False
        
        temp = board[r][c]
        board[r][c] = '#'  # mark visited
        
        # try all 4 directions
        found = (dfs(r+1, c, i+1) or dfs(r-1, c, i+1) or
                 dfs(r, c+1, i+1) or dfs(r, c-1, i+1))
        
        board[r][c] = temp  # restore for other paths
        return found
    
    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True
    return False`,
    starterCode: `def exist(board, word):
    # Your code here`,
    timeComplexity: 'O(m × n × 4^L) - L is word length',
    spaceComplexity: 'O(L) - recursion depth',
    youtubeUrl: 'https://www.youtube.com/watch?v=pfiQ_PS1g8E',
  },

  // ==========================================
  // MATRIX
  // ==========================================
  {
    id: 'rotate-image',
    title: 'Rotate Image',
    difficulty: 'medium',
    topics: ['Arrays', 'Matrix', 'Math'],
    description: 'You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees clockwise. You must rotate in-place.',
    examples: [
      'Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [[7,4,1],[8,5,2],[9,6,3]]',
      'Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]\nOutput: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]'
    ],
    approach: `**Two-Step Trick**
1. Transpose (swap rows/cols)
2. Reverse each row

**Why It Works**
Transpose flips diagonally.
Reverse flips horizontally.
Combined = 90° clockwise rotation!

**The Pattern**
\`# Transpose\`
\`for i, j: swap matrix[i][j], matrix[j][i]\`
\`# Reverse rows\`
\`for row: row.reverse()\``,
    solution: `def rotate(matrix):
    n = len(matrix)
    
    # step 1: transpose (swap across diagonal)
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    
    # step 2: reverse each row
    for row in matrix:
        row.reverse()`,
    testCases: [
      { input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] }, expected: [[7,4,1],[8,5,2],[9,6,3]] },
      { input: { matrix: [[1,2],[3,4]] }, expected: [[3,1],[4,2]] },
    ],
    starterCode: `def rotate(matrix):
    # Your code here`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=fMSJSS7eO1w',
  },
  {
    id: 'spiral-matrix',
    title: 'Spiral Matrix',
    difficulty: 'medium',
    topics: ['Arrays', 'Matrix'],
    description: 'Given an m x n matrix, return all elements of the matrix in spiral order.',
    examples: [
      'Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [1,2,3,6,9,8,7,4,5]',
      'Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]\nOutput: [1,2,3,4,8,12,11,10,9,5,6,7]'
    ],
    approach: `**Track Boundaries**
Keep 4 pointers: top, bottom, left, right.
After each direction, shrink that boundary.

**Spiral Order**
1. Go right along top row → top++
2. Go down along right col → right--
3. Go left along bottom row → bottom--
4. Go up along left col → left++

**Stop When**
Boundaries cross each other.`,
    solution: `def spiralOrder(matrix):
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    
    while top <= bottom and left <= right:
        # go right
        for col in range(left, right + 1):
            result.append(matrix[top][col])
        top += 1
        
        # go down
        for row in range(top, bottom + 1):
            result.append(matrix[row][right])
        right -= 1
        
        # go left (check if row still exists)
        if top <= bottom:
            for col in range(right, left - 1, -1):
                result.append(matrix[bottom][col])
            bottom -= 1
        
        # go up (check if col still exists)
        if left <= right:
            for row in range(bottom, top - 1, -1):
                result.append(matrix[row][left])
            left += 1
    
    return result`,
    testCases: [
      { input: { matrix: [[1,2,3],[4,5,6],[7,8,9]] }, expected: [1,2,3,6,9,8,7,4,5] },
      { input: { matrix: [[1,2],[3,4]] }, expected: [1,2,4,3] },
    ],
    starterCode: `def spiralOrder(matrix):
    # Your code here`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=BJnMZNwUk1M',
  },

  // ==========================================
  // STACK
  // ==========================================
  {
    id: 'daily-temperatures',
    title: 'Daily Temperatures',
    difficulty: 'medium',
    topics: ['Arrays', 'Stack', 'Monotonic Stack'],
    description: 'Given an array of integers temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day, use 0.',
    examples: [
      'Input: temperatures = [73,74,75,71,69,72,76,73]\nOutput: [1,1,4,2,1,1,0,0]',
      'Input: temperatures = [30,40,50,60]\nOutput: [1,1,1,0]'
    ],
    approach: `**Monotonic Decreasing Stack**
Stack stores indices of temps waiting for warmer day.
When we find warmer temp, pop and calculate wait time.

**Key Insight**
Process right to left or use stack left to right.
Stack keeps decreasing temps (unsolved days).

**The Pattern**
\`for i, temp:\`
\`  while stack and temp > temps[stack[-1]]:\`
\`    idx = stack.pop()\`
\`    answer[idx] = i - idx\`
\`  stack.append(i)\``,
    solution: `def dailyTemperatures(temperatures):
    n = len(temperatures)
    answer = [0] * n
    stack = []  # indices of temps waiting for warmer day
    
    for i, temp in enumerate(temperatures):
        # current temp is warmer than stack tops
        while stack and temp > temperatures[stack[-1]]:
            prev_idx = stack.pop()
            answer[prev_idx] = i - prev_idx
        stack.append(i)
    
    return answer`,
    testCases: [
      { input: { temperatures: [73,74,75,71,69,72,76,73] }, expected: [1,1,4,2,1,1,0,0] },
      { input: { temperatures: [30,40,50,60] }, expected: [1,1,1,0] },
      { input: { temperatures: [30,30,30] }, expected: [0,0,0] },
    ],
    starterCode: `def dailyTemperatures(temperatures):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=cTBiBSnjO3c',
  },

  // ==========================================
  // BACKTRACKING
  // ==========================================
  {
    id: 'generate-parentheses',
    title: 'Generate Parentheses',
    difficulty: 'medium',
    topics: ['Backtracking', 'Recursion'],
    description: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
    examples: [
      'Input: n = 3\nOutput: ["((()))","(()())","(())()","()(())","()()()"]',
      'Input: n = 1\nOutput: ["()"]'
    ],
    approach: `**Backtracking with Constraints**
Track open and close counts.
Can add '(' if open < n.
Can add ')' if close < open.

**Why These Rules?**
- Never more than n opens
- Never more closes than opens (would be invalid)

**Base Case**
When open == close == n, we have valid combo.`,
    solution: `def generateParenthesis(n):
    result = []
    
    def backtrack(current, open_count, close_count):
        # base case: used all parentheses
        if open_count == close_count == n:
            result.append(current)
            return
        
        # can add open if haven't used n yet
        if open_count < n:
            backtrack(current + '(', open_count + 1, close_count)
        
        # can add close if it won't exceed opens
        if close_count < open_count:
            backtrack(current + ')', open_count, close_count + 1)
    
    backtrack('', 0, 0)
    return result`,
    testCases: [
      { input: { n: 3 }, expected: ["((()))","(()())","(())()","()(())","()()()"] },
      { input: { n: 1 }, expected: ["()"] },
      { input: { n: 2 }, expected: ["(())","()()"] },
    ],
    starterCode: `def generateParenthesis(n):
    # Your code here`,
    timeComplexity: 'O(4^n / √n) - Catalan number',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=s9fokUqJ76A',
  },

  // ==========================================
  // BINARY SEARCH
  // ==========================================
  {
    id: 'find-min-rotated',
    title: 'Find Minimum in Rotated Sorted Array',
    difficulty: 'medium',
    topics: ['Arrays', 'Binary Search'],
    description: 'Given a sorted rotated array of unique elements, return the minimum element. Must run in O(log n) time.',
    examples: [
      'Input: nums = [3,4,5,1,2]\nOutput: 1\nExplanation: Original array was [1,2,3,4,5] rotated 3 times',
      'Input: nums = [4,5,6,7,0,1,2]\nOutput: 0'
    ],
    approach: `**Binary Search the Pivot**
The minimum is at the rotation point.
Compare mid to right to find which half has the pivot.

**Key Insight**
If nums[mid] > nums[right], min is in right half.
Otherwise, min is in left half (including mid).

**The Pattern**
\`while left < right:\`
\`  if nums[mid] > nums[right]:\`
\`    left = mid + 1  # min in right\`
\`  else:\`
\`    right = mid  # min in left\``,
    solution: `def findMin(nums):
    left, right = 0, len(nums) - 1
    
    while left < right:
        mid = (left + right) // 2
        
        # if mid > right, rotation point is in right half
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            # min could be at mid or left of mid
            right = mid
    
    return nums[left]`,
    testCases: [
      { input: { nums: [3,4,5,1,2] }, expected: 1 },
      { input: { nums: [4,5,6,7,0,1,2] }, expected: 0 },
      { input: { nums: [1] }, expected: 1 },
    ],
    starterCode: `def findMin(nums):
    # Your code here`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=nIVW4P8b1VA',
  },

  // ==========================================
  // MORE DP
  // ==========================================
  {
    id: 'house-robber-ii',
    title: 'House Robber II',
    difficulty: 'medium',
    topics: ['Dynamic Programming', 'Arrays'],
    description: 'Houses are arranged in a circle. You cannot rob two adjacent houses. Given an array representing money in each house, return the maximum amount you can rob.',
    examples: [
      'Input: nums = [2,3,2]\nOutput: 3\nExplanation: Cannot rob house 1 (2) and house 3 (2) since they are adjacent in circle',
      'Input: nums = [1,2,3,1]\nOutput: 4\nExplanation: Rob house 1 (1) + house 3 (3) = 4'
    ],
    approach: `**Circular = Two Linear Problems**
First and last house are neighbors in circle.
So we can't rob both.

**Split Into Two Cases**
1. Rob houses 0 to n-2 (skip last)
2. Rob houses 1 to n-1 (skip first)
Take the max of both!

**Each case is just House Robber I**`,
    solution: `def rob(nums):
    if len(nums) == 1:
        return nums[0]
    
    def rob_linear(houses):
        prev2, prev1 = 0, 0
        for money in houses:
            current = max(prev1, prev2 + money)
            prev2, prev1 = prev1, current
        return prev1
    
    # skip last house OR skip first house
    return max(rob_linear(nums[:-1]), rob_linear(nums[1:]))`,
    testCases: [
      { input: { nums: [2,3,2] }, expected: 3 },
      { input: { nums: [1,2,3,1] }, expected: 4 },
      { input: { nums: [1] }, expected: 1 },
    ],
    starterCode: `def rob(nums):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=rWAJCfYYOvM',
  },
  {
    id: 'longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    difficulty: 'medium',
    topics: ['Dynamic Programming', 'Two Pointers', 'Strings'],
    description: 'Given a string s, return the longest palindromic substring in s.',
    examples: [
      'Input: s = "babad"\nOutput: "bab" (or "aba")',
      'Input: s = "cbbd"\nOutput: "bb"'
    ],
    approach: `**Expand Around Center**
Every palindrome has a center.
Expand outward while chars match.

**Two Types of Centers**
- Odd length: single char center ("aba")
- Even length: between two chars ("abba")

**For Each Position**
Try both odd and even expansions.
Track the longest found.`,
    solution: `def longestPalindrome(s):
    def expand(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return s[left + 1:right]
    
    result = ""
    for i in range(len(s)):
        # odd length palindrome
        odd = expand(i, i)
        # even length palindrome  
        even = expand(i, i + 1)
        
        if len(odd) > len(result):
            result = odd
        if len(even) > len(result):
            result = even
    
    return result`,
    testCases: [
      { input: { s: "babad" }, expected: "bab" },
      { input: { s: "cbbd" }, expected: "bb" },
      { input: { s: "a" }, expected: "a" },
    ],
    starterCode: `def longestPalindrome(s):
    # Your code here`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=XYQecbcd6_c',
  },
  {
    id: 'max-product-subarray',
    title: 'Maximum Product Subarray',
    difficulty: 'medium',
    topics: ['Dynamic Programming', 'Arrays'],
    description: 'Given an integer array nums, find a subarray that has the largest product, and return the product.',
    examples: [
      'Input: nums = [2,3,-2,4]\nOutput: 6\nExplanation: [2,3] has the largest product',
      'Input: nums = [-2,0,-1]\nOutput: 0'
    ],
    approach: `**Track Both Min and Max**
Negative × negative = positive!
So minimum can become maximum.

**At Each Step**
- New max = max(num, num×prevMax, num×prevMin)
- New min = min(num, num×prevMax, num×prevMin)

**Why Track Min?**
A very negative min times a negative = big positive!`,
    solution: `def maxProduct(nums):
    result = max(nums)
    cur_max, cur_min = 1, 1
    
    for num in nums:
        # save cur_max before updating
        temp = cur_max * num
        cur_max = max(num, temp, cur_min * num)
        cur_min = min(num, temp, cur_min * num)
        result = max(result, cur_max)
    
    return result`,
    testCases: [
      { input: { nums: [2,3,-2,4] }, expected: 6 },
      { input: { nums: [-2,0,-1] }, expected: 0 },
      { input: { nums: [-2,3,-4] }, expected: 24 },
    ],
    starterCode: `def maxProduct(nums):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=lXVy6YWFcRM',
  },
  {
    id: 'unique-paths',
    title: 'Unique Paths',
    difficulty: 'medium',
    topics: ['Dynamic Programming', 'Math'],
    description: 'A robot is on an m x n grid at top-left corner. It can only move right or down. How many unique paths are there to reach the bottom-right corner?',
    examples: [
      'Input: m = 3, n = 7\nOutput: 28',
      'Input: m = 3, n = 2\nOutput: 3\nExplanation: Right→Right→Down, Right→Down→Right, Down→Right→Right'
    ],
    approach: `**2D DP**
dp[i][j] = number of ways to reach cell (i,j)

**Base Case**
First row and first column: only 1 way (all right or all down)

**Recurrence**
dp[i][j] = dp[i-1][j] + dp[i][j-1]
(from above + from left)`,
    solution: `def uniquePaths(m, n):
    # use 1D array optimization
    dp = [1] * n  # first row is all 1s
    
    for i in range(1, m):
        for j in range(1, n):
            dp[j] = dp[j] + dp[j-1]  # above + left
    
    return dp[-1]`,
    testCases: [
      { input: { m: 3, n: 7 }, expected: 28 },
      { input: { m: 3, n: 2 }, expected: 3 },
      { input: { m: 1, n: 1 }, expected: 1 },
    ],
    starterCode: `def uniquePaths(m, n):
    # Your code here`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=IlEsdxuD4lY',
  },
  {
    id: 'jump-game',
    title: 'Jump Game',
    difficulty: 'medium',
    topics: ['Greedy', 'Dynamic Programming', 'Arrays'],
    description: 'Given an array where nums[i] represents max jump length from position i, determine if you can reach the last index starting from index 0.',
    examples: [
      'Input: nums = [2,3,1,1,4]\nOutput: true\nExplanation: Jump 1→2→last or 1→3→last',
      'Input: nums = [3,2,1,0,4]\nOutput: false\nExplanation: Always stuck at index 3'
    ],
    approach: `**Greedy: Track Reachable**
Track the farthest index we can reach.
If current index > reachable, we're stuck!

**The Pattern**
\`reachable = 0\`
\`for i, jump in enumerate(nums):\`
\`  if i > reachable: return False\`
\`  reachable = max(reachable, i + jump)\``,
    solution: `def canJump(nums):
    reachable = 0
    
    for i, jump in enumerate(nums):
        if i > reachable:
            return False  # can't reach this index
        reachable = max(reachable, i + jump)
    
    return True`,
    testCases: [
      { input: { nums: [2,3,1,1,4] }, expected: true },
      { input: { nums: [3,2,1,0,4] }, expected: false },
      { input: { nums: [0] }, expected: true },
    ],
    starterCode: `def canJump(nums):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=Yan0cv2cLy8',
  },
  {
    id: 'set-matrix-zeroes',
    title: 'Set Matrix Zeroes',
    difficulty: 'medium',
    topics: ['Arrays', 'Matrix'],
    description: 'Given an m x n matrix, if an element is 0, set its entire row and column to 0. Must do it in-place.',
    examples: [
      'Input: matrix = [[1,1,1],[1,0,1],[1,1,1]]\nOutput: [[1,0,1],[0,0,0],[1,0,1]]',
      'Input: matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]\nOutput: [[0,0,0,0],[0,4,5,0],[0,3,1,0]]'
    ],
    approach: `**Use First Row/Col as Markers**
Instead of extra space, mark zeros in first row/col.

**Steps**
1. Check if first row/col have zeros (save this)
2. Mark zeros: if matrix[i][j]=0, set matrix[i][0]=0, matrix[0][j]=0
3. Zero out cells based on markers
4. Handle first row/col last`,
    solution: `def setZeroes(matrix):
    m, n = len(matrix), len(matrix[0])
    first_row_zero = any(matrix[0][j] == 0 for j in range(n))
    first_col_zero = any(matrix[i][0] == 0 for i in range(m))
    
    # mark zeros in first row/col
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0
    
    # zero out cells based on markers
    for i in range(1, m):
        for j in range(1, n):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0
    
    # handle first row and column
    if first_row_zero:
        for j in range(n):
            matrix[0][j] = 0
    if first_col_zero:
        for i in range(m):
            matrix[i][0] = 0`,
    testCases: [
      { input: { matrix: [[1,1,1],[1,0,1],[1,1,1]] }, expected: [[1,0,1],[0,0,0],[1,0,1]] },
      { input: { matrix: [[0,1],[1,1]] }, expected: [[0,0],[0,1]] },
    ],
    starterCode: `def setZeroes(matrix):
    # Your code here`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=T41rL0L3Pnw',
  },
  {
    id: 'koko-eating-bananas',
    title: 'Koko Eating Bananas',
    difficulty: 'medium',
    topics: ['Binary Search', 'Arrays'],
    description: 'Koko has n piles of bananas. She can eat k bananas per hour. Each hour she picks a pile and eats k bananas (or finishes the pile). Find minimum k to eat all bananas within h hours.',
    examples: [
      'Input: piles = [3,6,7,11], h = 8\nOutput: 4',
      'Input: piles = [30,11,23,4,20], h = 5\nOutput: 30'
    ],
    approach: `**Binary Search on Speed**
Answer is between 1 and max(piles).
Binary search for minimum k that works.

**Check Function**
For a given k, calculate total hours needed:
hours = sum(ceil(pile / k) for pile in piles)

**If hours <= h, try smaller k**`,
    solution: `def minEatingSpeed(piles, h):
    import math
    
    def hours_needed(k):
        return sum(math.ceil(p / k) for p in piles)
    
    left, right = 1, max(piles)
    
    while left < right:
        mid = (left + right) // 2
        if hours_needed(mid) <= h:
            right = mid  # try smaller speed
        else:
            left = mid + 1  # need faster
    
    return left`,
    testCases: [
      { input: { piles: [3,6,7,11], h: 8 }, expected: 4 },
      { input: { piles: [30,11,23,4,20], h: 5 }, expected: 30 },
      { input: { piles: [30,11,23,4,20], h: 6 }, expected: 23 },
    ],
    starterCode: `def minEatingSpeed(piles, h):
    # Your code here`,
    timeComplexity: 'O(n × log(max(piles)))',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=U2SozAs9RzA',
  },
  {
    id: 'search-rotated-array',
    title: 'Search in Rotated Sorted Array',
    difficulty: 'medium',
    topics: ['Binary Search', 'Arrays'],
    description: 'Given a rotated sorted array with unique values, search for target and return its index. Return -1 if not found. Must be O(log n).',
    examples: [
      'Input: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4',
      'Input: nums = [4,5,6,7,0,1,2], target = 3\nOutput: -1'
    ],
    approach: `**Modified Binary Search**
One half is always sorted!
Check which half is sorted, then check if target is in that range.

**Key Logic**
If left half sorted (nums[left] <= nums[mid]):
  - If target in [left, mid): search left
  - Else: search right
Otherwise right half is sorted:
  - If target in (mid, right]: search right
  - Else: search left`,
    solution: `def search(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if nums[mid] == target:
            return mid
        
        # left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # right half is sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    
    return -1`,
    testCases: [
      { input: { nums: [4,5,6,7,0,1,2], target: 0 }, expected: 4 },
      { input: { nums: [4,5,6,7,0,1,2], target: 3 }, expected: -1 },
      { input: { nums: [1], target: 1 }, expected: 0 },
    ],
    starterCode: `def search(nums, target):
    # Your code here`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=U8XENwh8Oy8',
  },
  {
    id: 'eval-reverse-polish',
    title: 'Evaluate Reverse Polish Notation',
    difficulty: 'medium',
    topics: ['Stack', 'Math'],
    description: 'Evaluate an arithmetic expression in Reverse Polish Notation (postfix). Valid operators are +, -, *, /. Division truncates toward zero.',
    examples: [
      'Input: tokens = ["2","1","+","3","*"]\nOutput: 9\nExplanation: ((2 + 1) * 3) = 9',
      'Input: tokens = ["4","13","5","/","+"]\nOutput: 6\nExplanation: (4 + (13 / 5)) = 6'
    ],
    approach: `**Stack-Based Evaluation**
Numbers go on stack.
Operators pop two numbers, compute, push result.

**The Pattern**
\`for token:\`
\`  if operator: pop b, pop a, push a op b\`
\`  else: push number\`

**Note**: Pop order matters! Second popped is left operand.`,
    solution: `def evalRPN(tokens):
    stack = []
    
    for token in tokens:
        if token in "+-*/":
            b, a = stack.pop(), stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            else:
                stack.append(int(a / b))  # truncate toward zero
        else:
            stack.append(int(token))
    
    return stack[0]`,
    testCases: [
      { input: { tokens: ["2","1","+","3","*"] }, expected: 9 },
      { input: { tokens: ["4","13","5","/","+"] }, expected: 6 },
      { input: { tokens: ["10","6","9","3","+","-11","*","/","*","17","+","5","+"] }, expected: 22 },
    ],
    starterCode: `def evalRPN(tokens):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=iu0082c4HDE',
  },
  {
    id: 'rotting-oranges',
    title: 'Rotting Oranges',
    difficulty: 'medium',
    topics: ['Graphs', 'BFS', 'Matrix'],
    description: 'In a grid, 0=empty, 1=fresh orange, 2=rotten. Every minute, fresh oranges adjacent to rotten become rotten. Return minutes until no fresh oranges remain, or -1 if impossible.',
    examples: [
      'Input: grid = [[2,1,1],[1,1,0],[0,1,1]]\nOutput: 4',
      'Input: grid = [[2,1,1],[0,1,1],[1,0,1]]\nOutput: -1\nExplanation: Bottom-left orange can never be reached'
    ],
    approach: `**Multi-source BFS**
Start BFS from ALL rotten oranges at once.
Each BFS level = 1 minute.

**Steps**
1. Add all rotten to queue, count fresh
2. BFS: spread rot to neighbors
3. Track minutes (BFS levels)
4. Return -1 if fresh remain`,
    solution: `def orangesRotting(grid):
    from collections import deque
    
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0
    
    # find all rotten and count fresh
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1
    
    minutes = 0
    while queue and fresh > 0:
        minutes += 1
        for _ in range(len(queue)):
            r, c = queue.popleft()
            for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    queue.append((nr, nc))
    
    return minutes if fresh == 0 else -1`,
    testCases: [
      { input: { grid: [[2,1,1],[1,1,0],[0,1,1]] }, expected: 4 },
      { input: { grid: [[2,1,1],[0,1,1],[1,0,1]] }, expected: -1 },
      { input: { grid: [[0,2]] }, expected: 0 },
    ],
    starterCode: `def orangesRotting(grid):
    # Your code here`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=y704fEOx0s0',
  },

  // ==========================================
  // MORE BFS/DFS GRAPH PROBLEMS
  // ==========================================
  {
    id: 'max-area-island',
    title: 'Max Area of Island',
    difficulty: 'medium',
    topics: ['Graphs', 'DFS', 'Matrix'],
    description: 'Given a binary grid where 1 represents land and 0 represents water, return the maximum area of an island. An island is surrounded by water and formed by connecting adjacent lands horizontally or vertically.',
    examples: [
      'Input: grid = [[0,0,1,0,0],[0,0,0,0,0],[0,1,1,0,0],[0,1,0,0,0]]\nOutput: 3',
      'Input: grid = [[0,0,0,0,0]]\nOutput: 0'
    ],
    approach: `**DFS to Count Island Size**
Similar to Number of Islands, but count cells as we explore.

**For Each Unvisited Land Cell**
Run DFS, mark visited, count cells.
Track maximum area found.

**The Pattern**
\`def dfs(r, c):\`
\`  if out of bounds or water or visited: return 0\`
\`  mark visited\`
\`  return 1 + dfs(all 4 directions)\``,
    solution: `def maxAreaOfIsland(grid):
    rows, cols = len(grid), len(grid[0])
    visited = set()
    
    def dfs(r, c):
        if (r < 0 or r >= rows or c < 0 or c >= cols or
            grid[r][c] == 0 or (r, c) in visited):
            return 0
        visited.add((r, c))
        return 1 + dfs(r+1, c) + dfs(r-1, c) + dfs(r, c+1) + dfs(r, c-1)
    
    max_area = 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 1 and (r, c) not in visited:
                max_area = max(max_area, dfs(r, c))
    
    return max_area`,
    testCases: [
      { input: { grid: [[0,0,1,0,0],[0,0,0,0,0],[0,1,1,0,0],[0,1,0,0,0]] }, expected: 3 },
      { input: { grid: [[0,0,0,0,0]] }, expected: 0 },
      { input: { grid: [[1,1],[1,1]] }, expected: 4 },
    ],
    starterCode: `def maxAreaOfIsland(grid):
    # Your code here`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=iJGr1OtmH0c',
  },
  {
    id: 'pacific-atlantic',
    title: 'Pacific Atlantic Water Flow',
    difficulty: 'medium',
    topics: ['Graphs', 'DFS', 'Matrix'],
    description: 'Given an m×n matrix of heights, water can flow to adjacent cells with equal or lower height. The Pacific ocean touches the left and top edges. The Atlantic touches the right and bottom edges. Return all cells where water can flow to both oceans.',
    examples: [
      'Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]\nOutput: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]',
      'Input: heights = [[1]]\nOutput: [[0,0]]'
    ],
    approach: `**Reverse DFS from Oceans**
Instead of flowing down, flow UP from ocean edges.
Find cells reachable from Pacific AND Atlantic.

**Two DFS Passes**
1. DFS from Pacific edges (top + left)
2. DFS from Atlantic edges (bottom + right)
Return intersection of both sets.`,
    solution: `def pacificAtlantic(heights):
    rows, cols = len(heights), len(heights[0])
    pacific, atlantic = set(), set()
    
    def dfs(r, c, visited, prev_height):
        if (r < 0 or r >= rows or c < 0 or c >= cols or
            (r, c) in visited or heights[r][c] < prev_height):
            return
        visited.add((r, c))
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            dfs(r + dr, c + dc, visited, heights[r][c])
    
    # DFS from Pacific (top and left edges)
    for c in range(cols):
        dfs(0, c, pacific, 0)
    for r in range(rows):
        dfs(r, 0, pacific, 0)
    
    # DFS from Atlantic (bottom and right edges)
    for c in range(cols):
        dfs(rows - 1, c, atlantic, 0)
    for r in range(rows):
        dfs(r, cols - 1, atlantic, 0)
    
    return list(pacific & atlantic)`,
    testCases: [
      { input: { heights: [[1,1],[1,1]] }, expected: [[0,0],[0,1],[1,0],[1,1]] },
      { input: { heights: [[1]] }, expected: [[0,0]] },
    ],
    starterCode: `def pacificAtlantic(heights):
    # Your code here`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=s-VkcjHqkGI',
  },
  {
    id: 'surrounded-regions',
    title: 'Surrounded Regions',
    difficulty: 'medium',
    topics: ['Graphs', 'DFS', 'Matrix'],
    description: "Given an m×n board with 'X' and 'O', capture all regions surrounded by 'X'. A region is captured by flipping all 'O's to 'X's. Regions connected to the border cannot be captured.",
    examples: [
      'Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]\nOutput: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]',
      'Input: board = [["X"]]\nOutput: [["X"]]'
    ],
    approach: `**Reverse Thinking**
Instead of finding surrounded O's, find UN-surrounded O's!

**Algorithm**
1. DFS from border O's, mark them as safe (e.g., 'T')
2. Flip remaining O's to X (they're surrounded)
3. Flip T's back to O (border-connected)`,
    solution: `def solve(board):
    if not board:
        return
    
    rows, cols = len(board), len(board[0])
    
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != 'O':
            return
        board[r][c] = 'T'  # temporarily mark as safe
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)
    
    # mark border-connected O's as safe
    for r in range(rows):
        dfs(r, 0)
        dfs(r, cols - 1)
    for c in range(cols):
        dfs(0, c)
        dfs(rows - 1, c)
    
    # flip: O→X (surrounded), T→O (safe)
    for r in range(rows):
        for c in range(cols):
            if board[r][c] == 'O':
                board[r][c] = 'X'
            elif board[r][c] == 'T':
                board[r][c] = 'O'`,
    testCases: [
      { input: { board: [["X","X","X"],["X","O","X"],["X","X","X"]] }, expected: [["X","X","X"],["X","X","X"],["X","X","X"]] },
      { input: { board: [["O","O"],["O","O"]] }, expected: [["O","O"],["O","O"]] },
    ],
    starterCode: `def solve(board):
    # Your code here`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=9z2BunfoZ5Y',
  },
  {
    id: 'course-schedule-ii',
    title: 'Course Schedule II',
    difficulty: 'medium',
    topics: ['Graphs', 'DFS', 'Topological Sort'],
    description: 'There are numCourses courses labeled 0 to numCourses-1. Given prerequisites pairs [a,b] meaning you must take b before a, return the ordering of courses to finish all. Return empty array if impossible.',
    examples: [
      'Input: numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]\nOutput: [0,2,1,3] or [0,1,2,3]',
      'Input: numCourses = 2, prerequisites = [[1,0],[0,1]]\nOutput: [] (cycle exists)'
    ],
    approach: `**Topological Sort via DFS**
Process nodes in post-order (after all dependencies).
Detect cycles during traversal.

**Three States**
- Unvisited (0)
- Visiting (1) - currently in DFS path
- Visited (2) - completed

**If we see a "visiting" node → cycle!**`,
    solution: `def findOrder(numCourses, prerequisites):
    graph = {i: [] for i in range(numCourses)}
    for course, prereq in prerequisites:
        graph[course].append(prereq)
    
    result = []
    state = [0] * numCourses  # 0=unvisited, 1=visiting, 2=visited
    
    def dfs(course):
        if state[course] == 1:  # cycle detected
            return False
        if state[course] == 2:  # already processed
            return True
        
        state[course] = 1  # mark visiting
        for prereq in graph[course]:
            if not dfs(prereq):
                return False
        
        state[course] = 2  # mark visited
        result.append(course)
        return True
    
    for course in range(numCourses):
        if not dfs(course):
            return []
    
    return result`,
    testCases: [
      { input: { numCourses: 2, prerequisites: [[1,0]] }, expected: [0,1] },
      { input: { numCourses: 1, prerequisites: [] }, expected: [0] },
    ],
    starterCode: `def findOrder(numCourses, prerequisites):
    # Your code here`,
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    youtubeUrl: 'https://www.youtube.com/watch?v=Akt3glAwyfY',
  },
  {
    id: 'binary-tree-right-side',
    title: 'Binary Tree Right Side View',
    difficulty: 'medium',
    topics: ['Trees', 'BFS'],
    description: 'Given the root of a binary tree, return the values of the nodes you can see from the right side, ordered from top to bottom.',
    examples: [
      'Input: root = [1,2,3,null,5,null,4]\nOutput: [1,3,4]',
      'Input: root = [1,null,3]\nOutput: [1,3]'
    ],
    approach: `**BFS Level by Level**
For each level, take the rightmost node.

**Alternative: DFS**
Visit right subtree first.
Add node if it's the first at that depth.

**BFS Pattern**
\`for each level:\`
\`  last node in level = right side view\``,
    solution: `def rightSideView(root):
    if not root:
        return []
    
    from collections import deque
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        for i in range(level_size):
            node = queue.popleft()
            if i == level_size - 1:  # rightmost node
                result.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    
    return result`,
    testCases: [
      { input: { root: [1,2,3,null,5,null,4] }, expected: [1,3,4] },
      { input: { root: [1,null,3] }, expected: [1,3] },
      { input: { root: [] }, expected: [] },
    ],
    starterCode: `def rightSideView(root):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=d4zLyf32e3I',
  },
  {
    id: 'count-good-nodes',
    title: 'Count Good Nodes in Binary Tree',
    difficulty: 'medium',
    topics: ['Trees', 'DFS'],
    description: 'Given a binary tree root, a node X is good if there are no nodes with value greater than X on the path from root to X. Return the number of good nodes.',
    examples: [
      'Input: root = [3,1,4,3,null,1,5]\nOutput: 4\nExplanation: Root 3, node 4, both 3s are good',
      'Input: root = [3,3,null,4,2]\nOutput: 3'
    ],
    approach: `**DFS with Max Tracking**
Pass down the maximum value seen so far.
If current node >= max, it's a good node.

**The Pattern**
\`def dfs(node, max_so_far):\`
\`  if node.val >= max_so_far: count++\`
\`  dfs(left, max(max_so_far, node.val))\`
\`  dfs(right, max(max_so_far, node.val))\``,
    solution: `def goodNodes(root):
    def dfs(node, max_val):
        if not node:
            return 0
        
        good = 1 if node.val >= max_val else 0
        max_val = max(max_val, node.val)
        
        return good + dfs(node.left, max_val) + dfs(node.right, max_val)
    
    return dfs(root, root.val)`,
    testCases: [
      { input: { root: [3,1,4,3,null,1,5] }, expected: 4 },
      { input: { root: [3,3,null,4,2] }, expected: 3 },
      { input: { root: [1] }, expected: 1 },
    ],
    starterCode: `def goodNodes(root):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h) - height of tree',
    youtubeUrl: 'https://www.youtube.com/watch?v=7cp5imvDzl4',
  },
  {
    id: 'walls-and-gates',
    title: 'Walls and Gates',
    difficulty: 'medium',
    topics: ['Graphs', 'BFS', 'Matrix'],
    description: 'Given a grid where -1 is a wall, 0 is a gate, and INF (2147483647) is an empty room, fill each empty room with distance to its nearest gate. If impossible, leave as INF.',
    examples: [
      'Input: rooms = [[2147483647,-1,0,2147483647],[2147483647,2147483647,2147483647,-1],[2147483647,-1,2147483647,-1],[0,-1,2147483647,2147483647]]\nOutput: [[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]'
    ],
    approach: `**Multi-source BFS from Gates**
Start BFS from ALL gates simultaneously.
First time we reach a room = shortest distance.

**Why BFS?**
BFS explores level by level.
Level = distance from gates.

**Pattern**
Add all gates to queue, then BFS outward.`,
    solution: `def wallsAndGates(rooms):
    if not rooms:
        return
    
    from collections import deque
    rows, cols = len(rooms), len(rooms[0])
    INF = 2147483647
    queue = deque()
    
    # add all gates to queue
    for r in range(rows):
        for c in range(cols):
            if rooms[r][c] == 0:
                queue.append((r, c))
    
    # BFS from gates
    while queue:
        r, c = queue.popleft()
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and rooms[nr][nc] == INF:
                rooms[nr][nc] = rooms[r][c] + 1
                queue.append((nr, nc))`,
    testCases: [
      { input: { rooms: [[2147483647,0],[0,2147483647]] }, expected: [[1,0],[0,1]] },
      { input: { rooms: [[0]] }, expected: [[0]] },
    ],
    starterCode: `def wallsAndGates(rooms):
    # Your code here`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=e69C6xhiSQE',
  },
  {
    id: 'redundant-connection',
    title: 'Redundant Connection',
    difficulty: 'medium',
    topics: ['Graphs', 'Union Find'],
    description: 'Given a graph that was a tree with one extra edge added, find and return that edge. The edge returned should be the one that appears last in the input.',
    examples: [
      'Input: edges = [[1,2],[1,3],[2,3]]\nOutput: [2,3]',
      'Input: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]\nOutput: [1,4]'
    ],
    approach: `**Union Find (Disjoint Set)**
Process edges one by one.
If both nodes already in same set → cycle found!

**Union Find Operations**
- find(x): find root of x's set
- union(x,y): merge sets of x and y

**The redundant edge creates the cycle.**`,
    solution: `def findRedundantConnection(edges):
    parent = list(range(len(edges) + 1))
    rank = [0] * (len(edges) + 1)
    
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])  # path compression
        return parent[x]
    
    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return False  # already connected = cycle!
        if rank[px] < rank[py]:
            px, py = py, px
        parent[py] = px
        if rank[px] == rank[py]:
            rank[px] += 1
        return True
    
    for a, b in edges:
        if not union(a, b):
            return [a, b]`,
    testCases: [
      { input: { edges: [[1,2],[1,3],[2,3]] }, expected: [2,3] },
      { input: { edges: [[1,2],[2,3],[3,4],[1,4],[1,5]] }, expected: [1,4] },
    ],
    starterCode: `def findRedundantConnection(edges):
    # Your code here`,
    timeComplexity: 'O(n × α(n)) ≈ O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=FXWRE67PLL0',
  },
  {
    id: 'graph-valid-tree',
    title: 'Graph Valid Tree',
    difficulty: 'medium',
    topics: ['Graphs', 'Union Find', 'DFS'],
    description: 'Given n nodes labeled 0 to n-1 and a list of undirected edges, determine if these edges form a valid tree. A valid tree has no cycles and all nodes are connected.',
    examples: [
      'Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]\nOutput: true',
      'Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]\nOutput: false (has cycle)'
    ],
    approach: `**Tree Properties**
1. Exactly n-1 edges for n nodes
2. All nodes connected (no isolated nodes)
3. No cycles

**Union Find Approach**
Check edge count = n-1.
Union all edges; if union fails → cycle exists.`,
    solution: `def validTree(n, edges):
    if len(edges) != n - 1:
        return False
    
    parent = list(range(n))
    
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    
    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return False  # cycle
        parent[px] = py
        return True
    
    for a, b in edges:
        if not union(a, b):
            return False
    
    return True`,
    testCases: [
      { input: { n: 5, edges: [[0,1],[0,2],[0,3],[1,4]] }, expected: true },
      { input: { n: 5, edges: [[0,1],[1,2],[2,3],[1,3],[1,4]] }, expected: false },
      { input: { n: 1, edges: [] }, expected: true },
    ],
    starterCode: `def validTree(n, edges):
    # Your code here`,
    timeComplexity: 'O(n × α(n)) ≈ O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=bXsUuownnoQ',
  },
  {
    id: 'num-connected-components',
    title: 'Number of Connected Components',
    difficulty: 'medium',
    topics: ['Graphs', 'Union Find', 'DFS'],
    description: 'Given n nodes labeled 0 to n-1 and a list of undirected edges, return the number of connected components in the graph.',
    examples: [
      'Input: n = 5, edges = [[0,1],[1,2],[3,4]]\nOutput: 2\nExplanation: Components: {0,1,2} and {3,4}',
      'Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]\nOutput: 1'
    ],
    approach: `**Union Find**
Start with n components (each node is its own).
Each successful union reduces count by 1.

**Alternative: DFS**
Count number of DFS traversals needed to visit all nodes.

**Union Find is cleaner here.**`,
    solution: `def countComponents(n, edges):
    parent = list(range(n))
    
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    
    def union(x, y):
        px, py = find(x), find(y)
        if px == py:
            return 0  # already same component
        parent[px] = py
        return 1  # merged two components
    
    components = n
    for a, b in edges:
        components -= union(a, b)
    
    return components`,
    testCases: [
      { input: { n: 5, edges: [[0,1],[1,2],[3,4]] }, expected: 2 },
      { input: { n: 5, edges: [[0,1],[1,2],[2,3],[3,4]] }, expected: 1 },
      { input: { n: 3, edges: [] }, expected: 3 },
    ],
    starterCode: `def countComponents(n, edges):
    # Your code here`,
    timeComplexity: 'O(n × α(n)) ≈ O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=8f1XPm4WOUc',
  },

  // ==========================================
  // MORE BFS/DFS PROBLEMS - BATCH 2
  // ==========================================
  {
    id: 'network-delay-time',
    title: 'Network Delay Time',
    difficulty: 'medium',
    topics: ['Graphs', 'Dijkstra', 'BFS'],
    description: 'Given a network of n nodes and times[i] = (u, v, w) meaning signal from u to v takes w time, find how long for signal from node k to reach all nodes. Return -1 if impossible.',
    examples: [
      'Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2\nOutput: 2',
      'Input: times = [[1,2,1]], n = 2, k = 2\nOutput: -1 (can\'t reach node 1)'
    ],
    approach: `**Dijkstra's Algorithm**
Find shortest path from source to ALL nodes.
Answer = max of all shortest paths.

**Why Dijkstra?**
Weighted graph (times vary).
BFS only works for unweighted graphs.

**Min-Heap Pattern**
Always process node with smallest distance first.`,
    solution: `def networkDelayTime(times, n, k):
    import heapq
    from collections import defaultdict
    
    # build adjacency list
    graph = defaultdict(list)
    for u, v, w in times:
        graph[u].append((v, w))
    
    # dijkstra from node k
    min_heap = [(0, k)]  # (time, node)
    visited = {}
    
    while min_heap:
        time, node = heapq.heappop(min_heap)
        
        if node in visited:
            continue
        visited[node] = time
        
        for neighbor, weight in graph[node]:
            if neighbor not in visited:
                heapq.heappush(min_heap, (time + weight, neighbor))
    
    if len(visited) != n:
        return -1
    
    return max(visited.values())`,
    testCases: [
      { input: { times: [[2,1,1],[2,3,1],[3,4,1]], n: 4, k: 2 }, expected: 2 },
      { input: { times: [[1,2,1]], n: 2, k: 2 }, expected: -1 },
      { input: { times: [[1,2,1]], n: 2, k: 1 }, expected: 1 },
    ],
    starterCode: `def networkDelayTime(times, n, k):
    # Your code here`,
    timeComplexity: 'O(E log V)',
    spaceComplexity: 'O(V + E)',
    youtubeUrl: 'https://www.youtube.com/watch?v=EaphyqKU4PQ',
  },
  {
    id: 'cheapest-flights-k-stops',
    title: 'Cheapest Flights Within K Stops',
    difficulty: 'medium',
    topics: ['Graphs', 'BFS', 'Dynamic Programming'],
    description: 'Given n cities connected by flights where flights[i] = [from, to, price], find the cheapest price from src to dst with at most k stops. Return -1 if no such route exists.',
    examples: [
      'Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1\nOutput: 700 (0→1→3)',
      'Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0\nOutput: 500 (direct flight)'
    ],
    approach: `**Bellman-Ford Variant**
Relax edges k+1 times (k stops = k+1 edges).
Track prices at each round separately.

**Why not Dijkstra?**
Dijkstra finds absolute shortest path.
We need shortest with constraint (k stops).

**BFS with Levels**
Each level = one more stop used.`,
    solution: `def findCheapestPrice(n, flights, src, dst, k):
    # bellman-ford with k+1 iterations
    prices = [float('inf')] * n
    prices[src] = 0
    
    for _ in range(k + 1):
        temp = prices.copy()
        for u, v, price in flights:
            if prices[u] != float('inf'):
                temp[v] = min(temp[v], prices[u] + price)
        prices = temp
    
    return prices[dst] if prices[dst] != float('inf') else -1`,
    testCases: [
      { input: { n: 4, flights: [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src: 0, dst: 3, k: 1 }, expected: 700 },
      { input: { n: 3, flights: [[0,1,100],[1,2,100],[0,2,500]], src: 0, dst: 2, k: 0 }, expected: 500 },
      { input: { n: 3, flights: [[0,1,100],[1,2,100],[0,2,500]], src: 0, dst: 2, k: 1 }, expected: 200 },
    ],
    starterCode: `def findCheapestPrice(n, flights, src, dst, k):
    # Your code here`,
    timeComplexity: 'O(k × E)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=5eIK3zUdYmE',
  },
  {
    id: 'construct-tree-preorder-inorder',
    title: 'Construct Binary Tree from Preorder and Inorder',
    difficulty: 'medium',
    topics: ['Trees', 'DFS', 'Recursion'],
    description: 'Given two integer arrays preorder and inorder where preorder is the preorder traversal and inorder is the inorder traversal of a binary tree, construct and return the binary tree.',
    examples: [
      'Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]\nOutput: [3,9,20,null,null,15,7]',
      'Input: preorder = [-1], inorder = [-1]\nOutput: [-1]'
    ],
    approach: `**Key Insight**
Preorder: [root, ...left..., ...right...]
Inorder:  [...left..., root, ...right...]

**Algorithm**
1. First element of preorder = root
2. Find root in inorder → splits left/right subtrees
3. Recursively build left and right

**Use hashmap for O(1) inorder lookup.**`,
    solution: `def buildTree(preorder, inorder):
    inorder_map = {val: idx for idx, val in enumerate(inorder)}
    pre_idx = [0]  # use list to maintain state across calls
    
    def build(left, right):
        if left > right:
            return None
        
        root_val = preorder[pre_idx[0]]
        pre_idx[0] += 1
        
        root = TreeNode(root_val)
        mid = inorder_map[root_val]
        
        root.left = build(left, mid - 1)
        root.right = build(mid + 1, right)
        
        return root
    
    return build(0, len(inorder) - 1)`,
    testCases: [
      { input: { preorder: [3,9,20,15,7], inorder: [9,3,15,20,7] }, expected: [3,9,20,null,null,15,7] },
      { input: { preorder: [-1], inorder: [-1] }, expected: [-1] },
      { input: { preorder: [1,2], inorder: [2,1] }, expected: [1,2] },
    ],
    starterCode: `def buildTree(preorder, inorder):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=ihj4IQGZ2zc',
  },
  {
    id: 'min-cost-connect-points',
    title: 'Min Cost to Connect All Points',
    difficulty: 'medium',
    topics: ['Graphs', 'MST', 'Union Find'],
    description: 'Given an array of points where points[i] = [xi, yi], return the minimum cost to connect all points. The cost to connect two points is their Manhattan distance |xi - xj| + |yi - yj|.',
    examples: [
      'Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]\nOutput: 20',
      'Input: points = [[3,12],[-2,5],[-4,1]]\nOutput: 18'
    ],
    approach: `**Minimum Spanning Tree**
Connect all points with minimum total edge weight.

**Prim's Algorithm**
Start from any point.
Always add cheapest edge to unvisited point.
Use min-heap for efficiency.

**Alternative: Kruskal's with Union Find**`,
    solution: `def minCostConnectPoints(points):
    import heapq
    
    n = len(points)
    visited = set()
    min_heap = [(0, 0)]  # (cost, point_index)
    total_cost = 0
    
    def manhattan(i, j):
        return abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1])
    
    while len(visited) < n:
        cost, i = heapq.heappop(min_heap)
        
        if i in visited:
            continue
        
        visited.add(i)
        total_cost += cost
        
        for j in range(n):
            if j not in visited:
                heapq.heappush(min_heap, (manhattan(i, j), j))
    
    return total_cost`,
    testCases: [
      { input: { points: [[0,0],[2,2],[3,10],[5,2],[7,0]] }, expected: 20 },
      { input: { points: [[3,12],[-2,5],[-4,1]] }, expected: 18 },
      { input: { points: [[0,0]] }, expected: 0 },
    ],
    starterCode: `def minCostConnectPoints(points):
    # Your code here`,
    timeComplexity: 'O(n² log n)',
    spaceComplexity: 'O(n²)',
    youtubeUrl: 'https://www.youtube.com/watch?v=f7JOBJIC-NA',
  },

  // ==========================================
  // MORE MEDIUM PROBLEMS - BATCH 3
  // ==========================================
  {
    id: 'decode-ways',
    title: 'Decode Ways',
    difficulty: 'medium',
    topics: ['Dynamic Programming', 'String'],
    description: "A message containing letters A-Z can be encoded as numbers 1-26. Given a string s containing only digits, return the number of ways to decode it. '12' could be 'AB' (1,2) or 'L' (12).",
    examples: [
      'Input: s = "12"\nOutput: 2\nExplanation: "AB" (1 2) or "L" (12)',
      'Input: s = "226"\nOutput: 3\nExplanation: "BZ" (2 26), "VF" (22 6), "BBF" (2 2 6)',
      'Input: s = "06"\nOutput: 0\nExplanation: Leading zero is invalid'
    ],
    approach: `**Dynamic Programming**
Similar to climbing stairs, but with constraints.

**dp[i] = ways to decode s[0:i]**
- If s[i-1] != '0': dp[i] += dp[i-1] (single digit)
- If s[i-2:i] is 10-26: dp[i] += dp[i-2] (two digits)

**Edge Cases**
'0' alone is invalid. Leading zeros are invalid.`,
    solution: `def numDecodings(s):
    if not s or s[0] == '0':
        return 0
    
    n = len(s)
    dp = [0] * (n + 1)
    dp[0] = 1  # empty string
    dp[1] = 1  # first char (already checked not '0')
    
    for i in range(2, n + 1):
        # single digit (1-9)
        if s[i-1] != '0':
            dp[i] += dp[i-1]
        
        # two digits (10-26)
        two_digit = int(s[i-2:i])
        if 10 <= two_digit <= 26:
            dp[i] += dp[i-2]
    
    return dp[n]`,
    testCases: [
      { input: { s: "12" }, expected: 2 },
      { input: { s: "226" }, expected: 3 },
      { input: { s: "06" }, expected: 0 },
      { input: { s: "11106" }, expected: 2 },
    ],
    starterCode: `def numDecodings(s):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=6aEyTjOwlJU',
  },
  {
    id: 'palindromic-substrings',
    title: 'Palindromic Substrings',
    difficulty: 'medium',
    topics: ['Dynamic Programming', 'Two Pointers', 'String'],
    description: 'Given a string s, return the number of palindromic substrings in it. A substring is palindromic if it reads the same forward and backward.',
    examples: [
      'Input: s = "abc"\nOutput: 3\nExplanation: "a", "b", "c"',
      'Input: s = "aaa"\nOutput: 6\nExplanation: "a", "a", "a", "aa", "aa", "aaa"'
    ],
    approach: `**Expand Around Center**
For each position, expand outward while palindrome.

**Two Cases**
1. Odd length: center at i
2. Even length: center between i and i+1

**Count while expanding**
Each valid expansion = one more palindrome.`,
    solution: `def countSubstrings(s):
    count = 0
    
    def expand(left, right):
        nonlocal count
        while left >= 0 and right < len(s) and s[left] == s[right]:
            count += 1
            left -= 1
            right += 1
    
    for i in range(len(s)):
        expand(i, i)      # odd length
        expand(i, i + 1)  # even length
    
    return count`,
    testCases: [
      { input: { s: "abc" }, expected: 3 },
      { input: { s: "aaa" }, expected: 6 },
      { input: { s: "a" }, expected: 1 },
    ],
    starterCode: `def countSubstrings(s):
    # Your code here`,
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=4RACzI5-du8',
  },
  {
    id: 'letter-combinations',
    title: 'Letter Combinations of a Phone Number',
    difficulty: 'medium',
    topics: ['Backtracking', 'String'],
    description: 'Given a string containing digits 2-9, return all possible letter combinations that the number could represent (like phone keypad). Return in any order.',
    examples: [
      'Input: digits = "23"\nOutput: ["ad","ae","af","bd","be","bf","cd","ce","cf"]',
      'Input: digits = ""\nOutput: []'
    ],
    approach: `**Backtracking**
Map digits to letters (2→abc, 3→def, etc.)
For each digit, try all possible letters.

**Pattern**
\`backtrack(index, current_combo)\`
\`  if index == len(digits): add combo\`
\`  for letter in mapping[digits[index]]:\`
\`    backtrack(index + 1, combo + letter)\``,
    solution: `def letterCombinations(digits):
    if not digits:
        return []
    
    mapping = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    }
    result = []
    
    def backtrack(index, combo):
        if index == len(digits):
            result.append(combo)
            return
        
        for letter in mapping[digits[index]]:
            backtrack(index + 1, combo + letter)
    
    backtrack(0, '')
    return result`,
    testCases: [
      { input: { digits: "23" }, expected: ["ad","ae","af","bd","be","bf","cd","ce","cf"] },
      { input: { digits: "" }, expected: [] },
      { input: { digits: "2" }, expected: ["a","b","c"] },
    ],
    starterCode: `def letterCombinations(digits):
    # Your code here`,
    timeComplexity: 'O(4^n × n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=0snEunUacZY',
  },
  {
    id: 'subsets-ii',
    title: 'Subsets II',
    difficulty: 'medium',
    topics: ['Backtracking', 'Arrays'],
    description: 'Given an integer array nums that may contain duplicates, return all possible subsets. The solution must not contain duplicate subsets.',
    examples: [
      'Input: nums = [1,2,2]\nOutput: [[],[1],[1,2],[1,2,2],[2],[2,2]]',
      'Input: nums = [0]\nOutput: [[],[0]]'
    ],
    approach: `**Backtracking with Skip Duplicates**
Sort array first to group duplicates.
Skip duplicate elements at same level.

**Key Rule**
If nums[i] == nums[i-1] and we didn't use i-1,
skip i to avoid duplicate subsets.`,
    solution: `def subsetsWithDup(nums):
    nums.sort()
    result = []
    
    def backtrack(start, subset):
        result.append(subset[:])
        
        for i in range(start, len(nums)):
            # skip duplicates at same level
            if i > start and nums[i] == nums[i-1]:
                continue
            
            subset.append(nums[i])
            backtrack(i + 1, subset)
            subset.pop()
    
    backtrack(0, [])
    return result`,
    testCases: [
      { input: { nums: [1,2,2] }, expected: [[],[1],[1,2],[1,2,2],[2],[2,2]] },
      { input: { nums: [0] }, expected: [[],[0]] },
    ],
    starterCode: `def subsetsWithDup(nums):
    # Your code here`,
    timeComplexity: 'O(n × 2^n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=Vn2v6ajA7U0',
  },
  {
    id: 'combination-sum-ii',
    title: 'Combination Sum II',
    difficulty: 'medium',
    topics: ['Backtracking', 'Arrays'],
    description: 'Given a collection of candidate numbers and a target, find all unique combinations where candidate numbers sum to target. Each number may only be used once. No duplicate combinations.',
    examples: [
      'Input: candidates = [10,1,2,7,6,1,5], target = 8\nOutput: [[1,1,6],[1,2,5],[1,7],[2,6]]',
      'Input: candidates = [2,5,2,1,2], target = 5\nOutput: [[1,2,2],[5]]'
    ],
    approach: `**Backtracking with Skip Duplicates**
Sort array. Each element used at most once.
Skip duplicates at same recursion level.

**Key Difference from Combination Sum I**
- Use each element only once (i+1 not i)
- Skip duplicates (if i > start and same as prev)`,
    solution: `def combinationSum2(candidates, target):
    candidates.sort()
    result = []
    
    def backtrack(start, target, combo):
        if target == 0:
            result.append(combo[:])
            return
        
        for i in range(start, len(candidates)):
            if candidates[i] > target:
                break
            # skip duplicates at same level
            if i > start and candidates[i] == candidates[i-1]:
                continue
            
            combo.append(candidates[i])
            backtrack(i + 1, target - candidates[i], combo)
            combo.pop()
    
    backtrack(0, target, [])
    return result`,
    testCases: [
      { input: { candidates: [10,1,2,7,6,1,5], target: 8 }, expected: [[1,1,6],[1,2,5],[1,7],[2,6]] },
      { input: { candidates: [2,5,2,1,2], target: 5 }, expected: [[1,2,2],[5]] },
    ],
    starterCode: `def combinationSum2(candidates, target):
    # Your code here`,
    timeComplexity: 'O(2^n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=rSA3t6BDDwg',
  },
  {
    id: 'task-scheduler',
    title: 'Task Scheduler',
    difficulty: 'medium',
    topics: ['Greedy', 'Heap', 'Arrays'],
    description: 'Given tasks represented by letters and a cooling time n, return the minimum time to finish all tasks. Same tasks must be separated by at least n intervals.',
    examples: [
      'Input: tasks = ["A","A","A","B","B","B"], n = 2\nOutput: 8\nExplanation: A→B→idle→A→B→idle→A→B',
      'Input: tasks = ["A","A","A","B","B","B"], n = 0\nOutput: 6'
    ],
    approach: `**Greedy with Max Heap**
Always schedule the most frequent task first.
Use heap to track remaining counts.

**Alternative Formula**
\`max_freq = most frequent task count\`
\`idle_slots = (max_freq - 1) * n\`
\`Fill idle slots with other tasks\``,
    solution: `def leastInterval(tasks, n):
    from collections import Counter
    import heapq
    
    counts = Counter(tasks)
    max_heap = [-c for c in counts.values()]
    heapq.heapify(max_heap)
    
    time = 0
    queue = []  # (available_time, count)
    
    while max_heap or queue:
        time += 1
        
        if max_heap:
            count = heapq.heappop(max_heap) + 1  # do one task
            if count < 0:
                queue.append((time + n, count))
        
        if queue and queue[0][0] == time:
            heapq.heappush(max_heap, queue.pop(0)[1])
    
    return time`,
    testCases: [
      { input: { tasks: ["A","A","A","B","B","B"], n: 2 }, expected: 8 },
      { input: { tasks: ["A","A","A","B","B","B"], n: 0 }, expected: 6 },
      { input: { tasks: ["A","A","A","A","A","A","B","C","D","E","F","G"], n: 2 }, expected: 16 },
    ],
    starterCode: `def leastInterval(tasks, n):
    # Your code here`,
    timeComplexity: 'O(n × m) where m = unique tasks',
    spaceComplexity: 'O(m)',
    youtubeUrl: 'https://www.youtube.com/watch?v=s8p8ukTyA2I',
  },
  {
    id: 'lru-cache',
    title: 'LRU Cache',
    difficulty: 'medium',
    topics: ['Design', 'Hash Map', 'Linked List'],
    description: 'Design a data structure that follows LRU (Least Recently Used) cache constraints. Implement get(key) and put(key, value) in O(1) time.',
    examples: [
      'LRUCache(2)\nput(1,1), put(2,2), get(1)→1\nput(3,3) evicts key 2\nget(2)→-1, get(3)→3'
    ],
    approach: `**Hash Map + Doubly Linked List**
- HashMap: key → node (O(1) lookup)
- Doubly Linked List: track usage order

**Operations**
- get: move node to front (most recent)
- put: add to front, evict from back if full

**Dummy head/tail simplify edge cases.**`,
    solution: `class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.cache = {}  # key -> node
        # dummy head and tail
        self.head = Node(0, 0)
        self.tail = Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def get(self, key):
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add(node)
            return node.val
        return -1
    
    def put(self, key, value):
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self.cache[key] = node
        self._add(node)
        if len(self.cache) > self.cap:
            lru = self.head.next
            self._remove(lru)
            del self.cache[lru.key]
    
    def _add(self, node):  # add before tail
        prev = self.tail.prev
        prev.next = node
        node.prev = prev
        node.next = self.tail
        self.tail.prev = node
    
    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

class Node:
    def __init__(self, key, val):
        self.key, self.val = key, val
        self.prev = self.next = None`,
    testCases: [
      { input: { operations: ["LRUCache","put","put","get","put","get","put","get","get","get"], values: [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]] }, expected: [null,null,null,1,null,-1,null,-1,3,4] },
    ],
    starterCode: `class LRUCache:
    def __init__(self, capacity):
        pass
    
    def get(self, key):
        pass
    
    def put(self, key, value):
        pass`,
    timeComplexity: 'O(1) for both operations',
    spaceComplexity: 'O(capacity)',
    youtubeUrl: 'https://www.youtube.com/watch?v=7ABFKPK2hD4',
  },
  {
    id: 'time-based-key-value',
    title: 'Time Based Key-Value Store',
    difficulty: 'medium',
    topics: ['Design', 'Binary Search', 'Hash Map'],
    description: 'Design a time-based key-value store. set(key, value, timestamp) stores key-value at given timestamp. get(key, timestamp) returns value with largest timestamp <= given timestamp.',
    examples: [
      'set("foo", "bar", 1)\nget("foo", 1) → "bar"\nget("foo", 3) → "bar"\nset("foo", "bar2", 4)\nget("foo", 4) → "bar2"\nget("foo", 5) → "bar2"'
    ],
    approach: `**HashMap + Binary Search**
Store: {key: [(timestamp, value), ...]}
Timestamps are strictly increasing → sorted!

**get operation**
Binary search for largest timestamp ≤ query.
Use bisect_right - 1 for "floor" operation.`,
    solution: `class TimeMap:
    def __init__(self):
        self.store = {}  # key -> [(timestamp, value)]
    
    def set(self, key, value, timestamp):
        if key not in self.store:
            self.store[key] = []
        self.store[key].append((timestamp, value))
    
    def get(self, key, timestamp):
        if key not in self.store:
            return ""
        
        values = self.store[key]
        # binary search for largest ts <= timestamp
        left, right = 0, len(values) - 1
        result = ""
        
        while left <= right:
            mid = (left + right) // 2
            if values[mid][0] <= timestamp:
                result = values[mid][1]
                left = mid + 1
            else:
                right = mid - 1
        
        return result`,
    testCases: [
      { input: { operations: ["TimeMap","set","get","get","set","get","get"], values: [[],["foo","bar",1],["foo",1],["foo",3],["foo","bar2",4],["foo",4],["foo",5]] }, expected: [null,null,"bar","bar",null,"bar2","bar2"] },
    ],
    starterCode: `class TimeMap:
    def __init__(self):
        pass
    
    def set(self, key, value, timestamp):
        pass
    
    def get(self, key, timestamp):
        pass`,
    timeComplexity: 'O(1) set, O(log n) get',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=fu2cD_6E8Hw',
  },
  {
    id: 'car-fleet',
    title: 'Car Fleet',
    difficulty: 'medium',
    topics: ['Stack', 'Sorting'],
    description: 'N cars travel to a destination at mile "target". Car i starts at position[i] with speed[i]. A car can never pass another; they become a fleet at the slower speed. Return number of fleets arriving at target.',
    examples: [
      'Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]\nOutput: 3',
      'Input: target = 10, position = [3], speed = [3]\nOutput: 1'
    ],
    approach: `**Sort by Position, Stack for Fleets**
Calculate time to reach target for each car.
Process from closest to target.

**Key Insight**
If car behind takes less time, it catches up → same fleet.
If car behind takes more time, it's a new fleet.

**Stack tracks fleet times.**`,
    solution: `def carFleet(target, position, speed):
    # pair and sort by position descending
    cars = sorted(zip(position, speed), reverse=True)
    stack = []  # times to reach target
    
    for pos, spd in cars:
        time = (target - pos) / spd
        
        # if this car takes longer, it's a new fleet
        if not stack or time > stack[-1]:
            stack.append(time)
        # else it catches up to car ahead (same fleet)
    
    return len(stack)`,
    testCases: [
      { input: { target: 12, position: [10,8,0,5,3], speed: [2,4,1,1,3] }, expected: 3 },
      { input: { target: 10, position: [3], speed: [3] }, expected: 1 },
      { input: { target: 100, position: [0,2,4], speed: [4,2,1] }, expected: 1 },
    ],
    starterCode: `def carFleet(target, position, speed):
    # Your code here`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=Pr6T-3yB9RM',
  },
  {
    id: 'longest-repeating-char-replacement',
    title: 'Longest Repeating Character Replacement',
    difficulty: 'medium',
    topics: ['Sliding Window', 'String'],
    description: 'Given a string s and integer k, you can change at most k characters to any other character. Return the length of the longest substring with all same characters.',
    examples: [
      'Input: s = "ABAB", k = 2\nOutput: 4\nExplanation: Change both As to Bs (or vice versa)',
      'Input: s = "AABABBA", k = 1\nOutput: 4\nExplanation: Change middle B to A → "AAAAABA"'
    ],
    approach: `**Sliding Window**
Track count of most frequent char in window.
Window valid if: length - maxFreq ≤ k

**Key Formula**
\`changes needed = window_size - max_char_count\`
If changes > k, shrink window from left.

**Don't need to decrease maxFreq when shrinking!**`,
    solution: `def characterReplacement(s, k):
    count = {}
    max_freq = 0
    left = 0
    result = 0
    
    for right in range(len(s)):
        count[s[right]] = count.get(s[right], 0) + 1
        max_freq = max(max_freq, count[s[right]])
        
        # window invalid: need more than k changes
        while (right - left + 1) - max_freq > k:
            count[s[left]] -= 1
            left += 1
        
        result = max(result, right - left + 1)
    
    return result`,
    testCases: [
      { input: { s: "ABAB", k: 2 }, expected: 4 },
      { input: { s: "AABABBA", k: 1 }, expected: 4 },
      { input: { s: "AAAA", k: 0 }, expected: 4 },
    ],
    starterCode: `def characterReplacement(s, k):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(26) = O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=gqXU1UyA8pk',
  },

  // ==========================================
  // MORE MEDIUM PROBLEMS - BATCH 4
  // ==========================================
  {
    id: 'permutation-in-string',
    title: 'Permutation in String',
    difficulty: 'medium',
    topics: ['Sliding Window', 'Hash Map'],
    description: 'Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1\'s permutations is a substring of s2.',
    examples: [
      'Input: s1 = "ab", s2 = "eidbaooo"\nOutput: true\nExplanation: s2 contains "ba" which is a permutation of "ab"',
      'Input: s1 = "ab", s2 = "eidboaoo"\nOutput: false'
    ],
    approach: `**Sliding Window with Frequency Match**
Window size = len(s1). Slide across s2.
Compare character frequencies.

**Optimization**
Track "matches" count (chars with equal freq).
When matches == 26, found permutation!`,
    solution: `def checkInclusion(s1, s2):
    if len(s1) > len(s2):
        return False
    
    s1_count = [0] * 26
    s2_count = [0] * 26
    
    for i in range(len(s1)):
        s1_count[ord(s1[i]) - ord('a')] += 1
        s2_count[ord(s2[i]) - ord('a')] += 1
    
    matches = sum(1 for i in range(26) if s1_count[i] == s2_count[i])
    
    for i in range(len(s1), len(s2)):
        if matches == 26:
            return True
        
        # add right char
        idx = ord(s2[i]) - ord('a')
        s2_count[idx] += 1
        if s2_count[idx] == s1_count[idx]:
            matches += 1
        elif s2_count[idx] == s1_count[idx] + 1:
            matches -= 1
        
        # remove left char
        idx = ord(s2[i - len(s1)]) - ord('a')
        s2_count[idx] -= 1
        if s2_count[idx] == s1_count[idx]:
            matches += 1
        elif s2_count[idx] == s1_count[idx] - 1:
            matches -= 1
    
    return matches == 26`,
    testCases: [
      { input: { s1: "ab", s2: "eidbaooo" }, expected: true },
      { input: { s1: "ab", s2: "eidboaoo" }, expected: false },
      { input: { s1: "a", s2: "a" }, expected: true },
    ],
    starterCode: `def checkInclusion(s1, s2):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=UbyhOgBN834',
  },
  {
    id: 'add-two-numbers',
    title: 'Add Two Numbers',
    difficulty: 'medium',
    topics: ['Linked List', 'Math'],
    description: 'Given two non-empty linked lists representing two non-negative integers in reverse order, add them and return the sum as a linked list.',
    examples: [
      'Input: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]\nExplanation: 342 + 465 = 807',
      'Input: l1 = [0], l2 = [0]\nOutput: [0]'
    ],
    approach: `**Simulate Addition with Carry**
Process both lists digit by digit.
Track carry for next position.

**Pattern**
\`sum = l1.val + l2.val + carry\`
\`digit = sum % 10\`
\`carry = sum // 10\`

**Don't forget final carry!**`,
    solution: `def addTwoNumbers(l1, l2):
    dummy = ListNode(0)
    curr = dummy
    carry = 0
    
    while l1 or l2 or carry:
        val1 = l1.val if l1 else 0
        val2 = l2.val if l2 else 0
        
        total = val1 + val2 + carry
        carry = total // 10
        curr.next = ListNode(total % 10)
        curr = curr.next
        
        l1 = l1.next if l1 else None
        l2 = l2.next if l2 else None
    
    return dummy.next`,
    testCases: [
      { input: { l1: [2,4,3], l2: [5,6,4] }, expected: [7,0,8] },
      { input: { l1: [0], l2: [0] }, expected: [0] },
      { input: { l1: [9,9,9], l2: [1] }, expected: [0,0,0,1] },
    ],
    starterCode: `def addTwoNumbers(l1, l2):
    # Your code here`,
    timeComplexity: 'O(max(m, n))',
    spaceComplexity: 'O(max(m, n))',
    youtubeUrl: 'https://www.youtube.com/watch?v=wgFPrzTjm7s',
  },
  {
    id: 'copy-list-random-pointer',
    title: 'Copy List with Random Pointer',
    difficulty: 'medium',
    topics: ['Linked List', 'Hash Map'],
    description: 'A linked list has nodes with next pointer and a random pointer to any node or null. Construct a deep copy of the list.',
    examples: [
      'Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]\nOutput: [[7,null],[13,0],[11,4],[10,2],[1,0]]',
      'Input: head = [[1,1],[2,1]]\nOutput: [[1,1],[2,1]]'
    ],
    approach: `**Two-Pass with HashMap**
Pass 1: Create all new nodes, map old→new.
Pass 2: Set next and random pointers using map.

**Alternative: Interweaving**
Insert copy after each original node.
Set random pointers, then separate lists.`,
    solution: `def copyRandomList(head):
    if not head:
        return None
    
    # map old nodes to new nodes
    old_to_new = {}
    
    # first pass: create all nodes
    curr = head
    while curr:
        old_to_new[curr] = Node(curr.val)
        curr = curr.next
    
    # second pass: set pointers
    curr = head
    while curr:
        new_node = old_to_new[curr]
        new_node.next = old_to_new.get(curr.next)
        new_node.random = old_to_new.get(curr.random)
        curr = curr.next
    
    return old_to_new[head]`,
    testCases: [
      { input: { head: [[7,null],[13,0],[11,4],[10,2],[1,0]] }, expected: [[7,null],[13,0],[11,4],[10,2],[1,0]] },
      { input: { head: [[1,1],[2,1]] }, expected: [[1,1],[2,1]] },
    ],
    starterCode: `def copyRandomList(head):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=5Y2EiZST97Y',
  },
  {
    id: 'find-duplicate-number',
    title: 'Find the Duplicate Number',
    difficulty: 'medium',
    topics: ['Linked List', 'Two Pointers', 'Binary Search'],
    description: 'Given an array of n+1 integers where each integer is in range [1, n], find the one duplicate number. Must not modify array and use O(1) space.',
    examples: [
      'Input: nums = [1,3,4,2,2]\nOutput: 2',
      'Input: nums = [3,1,3,4,2]\nOutput: 3'
    ],
    approach: `**Floyd's Cycle Detection**
Treat array as linked list: index → nums[index].
Duplicate creates a cycle!

**Algorithm**
1. Find cycle intersection (slow/fast pointers)
2. Find cycle start (two slow pointers)

**Why it works**
Multiple indices point to same value = cycle.`,
    solution: `def findDuplicate(nums):
    # phase 1: find intersection point
    slow = fast = nums[0]
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break
    
    # phase 2: find cycle start
    slow2 = nums[0]
    while slow != slow2:
        slow = nums[slow]
        slow2 = nums[slow2]
    
    return slow`,
    testCases: [
      { input: { nums: [1,3,4,2,2] }, expected: 2 },
      { input: { nums: [3,1,3,4,2] }, expected: 3 },
      { input: { nums: [2,2,2,2,2] }, expected: 2 },
    ],
    starterCode: `def findDuplicate(nums):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=wjYnzkAhcNk',
  },
  {
    id: 'valid-sudoku',
    title: 'Valid Sudoku',
    difficulty: 'medium',
    topics: ['Matrix', 'Hash Set'],
    description: 'Determine if a 9x9 Sudoku board is valid. Only filled cells need to be validated: each row, column, and 3x3 box must contain digits 1-9 without repetition.',
    examples: [
      'Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]\nOutput: true'
    ],
    approach: `**Hash Sets for Each Constraint**
- 9 sets for rows
- 9 sets for columns
- 9 sets for 3x3 boxes

**Box Index Formula**
\`box_idx = (row // 3) * 3 + (col // 3)\`

**Check duplicates as we scan.**`,
    solution: `def isValidSudoku(board):
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    
    for r in range(9):
        for c in range(9):
            val = board[r][c]
            if val == '.':
                continue
            
            box_idx = (r // 3) * 3 + (c // 3)
            
            if val in rows[r] or val in cols[c] or val in boxes[box_idx]:
                return False
            
            rows[r].add(val)
            cols[c].add(val)
            boxes[box_idx].add(val)
    
    return True`,
    testCases: [
      { input: { board: [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]] }, expected: true },
    ],
    starterCode: `def isValidSudoku(board):
    # Your code here`,
    timeComplexity: 'O(81) = O(1)',
    spaceComplexity: 'O(81) = O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=TjFXEUCMqI8',
  },
  {
    id: 'implement-trie',
    title: 'Implement Trie (Prefix Tree)',
    difficulty: 'medium',
    topics: ['Design', 'Trie'],
    description: 'Implement a trie with insert(word), search(word) that returns true if word exists, and startsWith(prefix) that returns true if any word starts with prefix.',
    examples: [
      'Trie trie = new Trie();\ntrie.insert("apple");\ntrie.search("apple"); // true\ntrie.search("app"); // false\ntrie.startsWith("app"); // true'
    ],
    approach: `**Trie Structure**
Each node has:
- children: dict of char → TrieNode
- is_end: boolean marking word end

**Insert**: Create nodes for each char.
**Search**: Follow path, check is_end.
**StartsWith**: Follow path, no is_end check.`,
    solution: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
    
    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end
    
    def startsWith(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True`,
    testCases: [
      { input: { operations: ["Trie","insert","search","search","startsWith","insert","search"], values: [[],["apple"],["apple"],["app"],["app"],["app"],["app"]] }, expected: [null,null,true,false,true,null,true] },
    ],
    starterCode: `class Trie:
    def __init__(self):
        pass
    
    def insert(self, word):
        pass
    
    def search(self, word):
        pass
    
    def startsWith(self, prefix):
        pass`,
    timeComplexity: 'O(m) per operation, m = word length',
    spaceComplexity: 'O(total chars)',
    youtubeUrl: 'https://www.youtube.com/watch?v=oobqoCJlHA0',
  },
  {
    id: 'coin-change-ii',
    title: 'Coin Change II',
    difficulty: 'medium',
    topics: ['Dynamic Programming'],
    description: 'Given an array of coins and an amount, return the number of combinations that make up that amount. If impossible, return 0. You have infinite coins of each type.',
    examples: [
      'Input: amount = 5, coins = [1,2,5]\nOutput: 4\nExplanation: 5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1',
      'Input: amount = 3, coins = [2]\nOutput: 0'
    ],
    approach: `**Unbounded Knapsack DP**
dp[i] = number of ways to make amount i.

**Key: Process Coins Outer Loop**
For each coin, update all amounts.
This avoids counting permutations.

**Transition**
\`dp[amt] += dp[amt - coin]\``,
    solution: `def change(amount, coins):
    dp = [0] * (amount + 1)
    dp[0] = 1  # one way to make 0
    
    for coin in coins:
        for amt in range(coin, amount + 1):
            dp[amt] += dp[amt - coin]
    
    return dp[amount]`,
    testCases: [
      { input: { amount: 5, coins: [1,2,5] }, expected: 4 },
      { input: { amount: 3, coins: [2] }, expected: 0 },
      { input: { amount: 0, coins: [7] }, expected: 1 },
    ],
    starterCode: `def change(amount, coins):
    # Your code here`,
    timeComplexity: 'O(amount × coins)',
    spaceComplexity: 'O(amount)',
    youtubeUrl: 'https://www.youtube.com/watch?v=Mjy4hd2xgrs',
  },
  {
    id: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    difficulty: 'medium',
    topics: ['Dynamic Programming', 'Binary Search'],
    description: 'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
    examples: [
      'Input: nums = [10,9,2,5,3,7,101,18]\nOutput: 4\nExplanation: [2,3,7,101]',
      'Input: nums = [0,1,0,3,2,3]\nOutput: 4'
    ],
    approach: `**DP Approach O(n²)**
dp[i] = LIS ending at index i.
For each j < i: if nums[j] < nums[i], dp[i] = max(dp[i], dp[j] + 1)

**Binary Search O(n log n)**
Maintain sorted array of smallest tail elements.
Binary search to find position to update.`,
    solution: `def lengthOfLIS(nums):
    # O(n log n) solution with binary search
    from bisect import bisect_left
    
    tails = []
    
    for num in nums:
        pos = bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num
    
    return len(tails)`,
    testCases: [
      { input: { nums: [10,9,2,5,3,7,101,18] }, expected: 4 },
      { input: { nums: [0,1,0,3,2,3] }, expected: 4 },
      { input: { nums: [7,7,7,7,7] }, expected: 1 },
    ],
    starterCode: `def lengthOfLIS(nums):
    # Your code here`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=cjWnW0hdF1Y',
  },
  {
    id: 'non-overlapping-intervals',
    title: 'Non-overlapping Intervals',
    difficulty: 'medium',
    topics: ['Greedy', 'Intervals', 'Sorting'],
    description: 'Given an array of intervals, return the minimum number of intervals you need to remove to make the rest non-overlapping.',
    examples: [
      'Input: intervals = [[1,2],[2,3],[3,4],[1,3]]\nOutput: 1\nExplanation: Remove [1,3] to make others non-overlapping',
      'Input: intervals = [[1,2],[1,2],[1,2]]\nOutput: 2'
    ],
    approach: `**Greedy: Sort by End Time**
Always keep interval that ends earliest.
This leaves most room for future intervals.

**Algorithm**
Sort by end time.
If current start < prev end → overlap, remove current.
Else update prev end.`,
    solution: `def eraseOverlapIntervals(intervals):
    if not intervals:
        return 0
    
    intervals.sort(key=lambda x: x[1])  # sort by end
    
    removals = 0
    prev_end = intervals[0][1]
    
    for i in range(1, len(intervals)):
        if intervals[i][0] < prev_end:
            # overlap - remove current (has later end)
            removals += 1
        else:
            prev_end = intervals[i][1]
    
    return removals`,
    testCases: [
      { input: { intervals: [[1,2],[2,3],[3,4],[1,3]] }, expected: 1 },
      { input: { intervals: [[1,2],[1,2],[1,2]] }, expected: 2 },
      { input: { intervals: [[1,2],[2,3]] }, expected: 0 },
    ],
    starterCode: `def eraseOverlapIntervals(intervals):
    # Your code here`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=nONCGxWoUfM',
  },
  {
    id: 'meeting-rooms-ii',
    title: 'Meeting Rooms II',
    difficulty: 'medium',
    topics: ['Heap', 'Intervals', 'Sorting'],
    description: 'Given an array of meeting time intervals, find the minimum number of conference rooms required.',
    examples: [
      'Input: intervals = [[0,30],[5,10],[15,20]]\nOutput: 2',
      'Input: intervals = [[7,10],[2,4]]\nOutput: 1'
    ],
    approach: `**Min Heap for End Times**
Sort by start time.
Heap tracks end times of ongoing meetings.

**Algorithm**
For each meeting:
- If earliest end ≤ current start, pop (room freed)
- Push current end time
- Heap size = rooms needed

**Alternative: Event Points**
+1 at start, -1 at end, track max overlap.`,
    solution: `def minMeetingRooms(intervals):
    import heapq
    
    if not intervals:
        return 0
    
    intervals.sort(key=lambda x: x[0])  # sort by start
    
    heap = []  # end times of ongoing meetings
    
    for start, end in intervals:
        # if earliest meeting ended, free that room
        if heap and heap[0] <= start:
            heapq.heappop(heap)
        
        heapq.heappush(heap, end)
    
    return len(heap)`,
    testCases: [
      { input: { intervals: [[0,30],[5,10],[15,20]] }, expected: 2 },
      { input: { intervals: [[7,10],[2,4]] }, expected: 1 },
      { input: { intervals: [[1,5],[2,6],[3,7]] }, expected: 3 },
    ],
    starterCode: `def minMeetingRooms(intervals):
    # Your code here`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=FdzJmTCVyJU',
  },

  // ==========================================
  // MORE MEDIUM PROBLEMS - BATCH 5
  // ==========================================
  {
    id: 'word-break',
    title: 'Word Break',
    difficulty: 'medium',
    topics: ['Dynamic Programming', 'Trie'],
    description: 'Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of dictionary words.',
    examples: [
      'Input: s = "leetcode", wordDict = ["leet","code"]\nOutput: true\nExplanation: "leetcode" = "leet" + "code"',
      'Input: s = "applepenapple", wordDict = ["apple","pen"]\nOutput: true',
      'Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]\nOutput: false'
    ],
    approach: `**Dynamic Programming**
dp[i] = true if s[0:i] can be segmented.

**Transition**
For each position i, check all j < i:
If dp[j] is true AND s[j:i] is in dict → dp[i] = true

**Base Case**
dp[0] = true (empty string)`,
    solution: `def wordBreak(s, wordDict):
    word_set = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True  # empty string
    
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    
    return dp[len(s)]`,
    testCases: [
      { input: { s: "leetcode", wordDict: ["leet","code"] }, expected: true },
      { input: { s: "applepenapple", wordDict: ["apple","pen"] }, expected: true },
      { input: { s: "catsandog", wordDict: ["cats","dog","sand","and","cat"] }, expected: false },
    ],
    starterCode: `def wordBreak(s, wordDict):
    # Your code here`,
    timeComplexity: 'O(n³)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=Sx9NNgInc3A',
  },
  {
    id: 'partition-equal-subset-sum',
    title: 'Partition Equal Subset Sum',
    difficulty: 'medium',
    topics: ['Dynamic Programming'],
    description: 'Given an integer array nums, return true if you can partition the array into two subsets such that the sum of elements in both subsets is equal.',
    examples: [
      'Input: nums = [1,5,11,5]\nOutput: true\nExplanation: [1,5,5] and [11]',
      'Input: nums = [1,2,3,5]\nOutput: false'
    ],
    approach: `**0/1 Knapsack Variant**
If total sum is odd → impossible.
Otherwise, find subset with sum = total/2.

**DP**
dp[i] = true if we can make sum i.
For each num: dp[i] = dp[i] or dp[i - num]

**Process nums backward to avoid reuse!**`,
    solution: `def canPartition(nums):
    total = sum(nums)
    if total % 2 != 0:
        return False
    
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    
    for num in nums:
        # iterate backward to avoid using same num twice
        for i in range(target, num - 1, -1):
            dp[i] = dp[i] or dp[i - num]
    
    return dp[target]`,
    testCases: [
      { input: { nums: [1,5,11,5] }, expected: true },
      { input: { nums: [1,2,3,5] }, expected: false },
      { input: { nums: [1,1] }, expected: true },
    ],
    starterCode: `def canPartition(nums):
    # Your code here`,
    timeComplexity: 'O(n × sum)',
    spaceComplexity: 'O(sum)',
    youtubeUrl: 'https://www.youtube.com/watch?v=IsvocB5BJhw',
  },
  {
    id: 'target-sum',
    title: 'Target Sum',
    difficulty: 'medium',
    topics: ['Dynamic Programming', 'Backtracking'],
    description: 'Given an integer array nums and an integer target, return the number of ways to assign + or - to each number such that the sum equals target.',
    examples: [
      'Input: nums = [1,1,1,1,1], target = 3\nOutput: 5\nExplanation: -1+1+1+1+1, +1-1+1+1+1, +1+1-1+1+1, +1+1+1-1+1, +1+1+1+1-1',
      'Input: nums = [1], target = 1\nOutput: 1'
    ],
    approach: `**Convert to Subset Sum**
Let P = sum of positive, N = sum of negative.
P - N = target, P + N = total
So P = (target + total) / 2

**Now find subsets summing to P!**
Same as Partition Equal Subset Sum.`,
    solution: `def findTargetSumWays(nums, target):
    total = sum(nums)
    
    # P = (target + total) / 2
    if (target + total) % 2 != 0 or abs(target) > total:
        return 0
    
    subset_sum = (target + total) // 2
    
    dp = [0] * (subset_sum + 1)
    dp[0] = 1
    
    for num in nums:
        for i in range(subset_sum, num - 1, -1):
            dp[i] += dp[i - num]
    
    return dp[subset_sum]`,
    testCases: [
      { input: { nums: [1,1,1,1,1], target: 3 }, expected: 5 },
      { input: { nums: [1], target: 1 }, expected: 1 },
      { input: { nums: [1,0], target: 1 }, expected: 2 },
    ],
    starterCode: `def findTargetSumWays(nums, target):
    # Your code here`,
    timeComplexity: 'O(n × sum)',
    spaceComplexity: 'O(sum)',
    youtubeUrl: 'https://www.youtube.com/watch?v=g0npyaQtAQM',
  },
  {
    id: 'design-add-search-words',
    title: 'Design Add and Search Words',
    difficulty: 'medium',
    topics: ['Design', 'Trie', 'DFS'],
    description: "Design a data structure that supports adding words and searching with '.' as wildcard that matches any single character.",
    examples: [
      'addWord("bad")\naddWord("dad")\naddWord("mad")\nsearch("pad") → false\nsearch("bad") → true\nsearch(".ad") → true\nsearch("b..") → true'
    ],
    approach: `**Trie + DFS for Wildcards**
Same as basic Trie for addWord.
For search with '.': try all children (DFS).

**Search Function**
If char is '.': recursively search all children.
Else: follow normal trie path.`,
    solution: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class WordDictionary:
    def __init__(self):
        self.root = TrieNode()
    
    def addWord(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
    
    def search(self, word):
        def dfs(node, i):
            if i == len(word):
                return node.is_end
            
            char = word[i]
            if char == '.':
                for child in node.children.values():
                    if dfs(child, i + 1):
                        return True
                return False
            else:
                if char not in node.children:
                    return False
                return dfs(node.children[char], i + 1)
        
        return dfs(self.root, 0)`,
    testCases: [
      { input: { operations: ["WordDictionary","addWord","addWord","search","search","search"], values: [[],["bad"],["dad"],["pad"],[".ad"],["b.."]] }, expected: [null,null,null,false,true,true] },
    ],
    starterCode: `class WordDictionary:
    def __init__(self):
        pass
    
    def addWord(self, word):
        pass
    
    def search(self, word):
        pass`,
    timeComplexity: 'O(m) add, O(26^m) search worst case',
    spaceComplexity: 'O(total chars)',
    youtubeUrl: 'https://www.youtube.com/watch?v=BTf05gs_8iU',
  },
  {
    id: 'k-closest-points',
    title: 'K Closest Points to Origin',
    difficulty: 'medium',
    topics: ['Heap', 'Sorting'],
    description: 'Given an array of points and an integer k, return the k closest points to the origin (0, 0). Distance is Euclidean distance.',
    examples: [
      'Input: points = [[1,3],[-2,2]], k = 1\nOutput: [[-2,2]]\nExplanation: dist([1,3])=√10, dist([-2,2])=√8',
      'Input: points = [[3,3],[5,-1],[-2,4]], k = 2\nOutput: [[3,3],[-2,4]]'
    ],
    approach: `**Max Heap of Size K**
Keep k closest points using max heap.
If new point closer than max, replace it.

**Alternative: QuickSelect O(n) average**

**Heap Trick**
Use negative distance for max heap in Python.`,
    solution: `def kClosest(points, k):
    import heapq
    
    # max heap of size k (use negative distance)
    heap = []
    
    for x, y in points:
        dist = -(x*x + y*y)  # negative for max heap
        
        if len(heap) < k:
            heapq.heappush(heap, (dist, x, y))
        elif dist > heap[0][0]:
            heapq.heapreplace(heap, (dist, x, y))
    
    return [[x, y] for (_, x, y) in heap]`,
    testCases: [
      { input: { points: [[1,3],[-2,2]], k: 1 }, expected: [[-2,2]] },
      { input: { points: [[3,3],[5,-1],[-2,4]], k: 2 }, expected: [[3,3],[-2,4]] },
    ],
    starterCode: `def kClosest(points, k):
    # Your code here`,
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(k)',
    youtubeUrl: 'https://www.youtube.com/watch?v=rI2EBUEMfTk',
  },
  {
    id: 'insert-interval',
    title: 'Insert Interval',
    difficulty: 'medium',
    topics: ['Intervals', 'Arrays'],
    description: 'Given a sorted array of non-overlapping intervals and a new interval, insert the new interval and merge if necessary. Return the resulting array.',
    examples: [
      'Input: intervals = [[1,3],[6,9]], newInterval = [2,5]\nOutput: [[1,5],[6,9]]',
      'Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]\nOutput: [[1,2],[3,10],[12,16]]'
    ],
    approach: `**Three Phases**
1. Add all intervals ending before new starts
2. Merge overlapping intervals with new
3. Add all intervals starting after new ends

**Merge Condition**
Overlap if: interval[0] <= newInterval[1]`,
    solution: `def insert(intervals, newInterval):
    result = []
    i = 0
    n = len(intervals)
    
    # add all intervals before newInterval
    while i < n and intervals[i][1] < newInterval[0]:
        result.append(intervals[i])
        i += 1
    
    # merge overlapping intervals
    while i < n and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1
    result.append(newInterval)
    
    # add remaining intervals
    while i < n:
        result.append(intervals[i])
        i += 1
    
    return result`,
    testCases: [
      { input: { intervals: [[1,3],[6,9]], newInterval: [2,5] }, expected: [[1,5],[6,9]] },
      { input: { intervals: [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval: [4,8] }, expected: [[1,2],[3,10],[12,16]] },
      { input: { intervals: [], newInterval: [5,7] }, expected: [[5,7]] },
    ],
    starterCode: `def insert(intervals, newInterval):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=A8NUOmlwOlM',
  },

  // ==========================================
  // MISSING NEETCODE 150 MEDIUMS
  // ==========================================
  {
    id: 'encode-decode-strings',
    title: 'Encode and Decode Strings',
    difficulty: 'medium',
    topics: ['Arrays', 'String'],
    description: 'Design an algorithm to encode a list of strings to a single string, and decode it back. The encoded string is sent over the network and decoded back.',
    examples: [
      'Input: ["lint","code","love","you"]\nEncode: "4#lint4#code4#love3#you"\nDecode: ["lint","code","love","you"]',
      'Input: ["we","say","#","yes"]\nEncode: "2#we3#say1##3#yes"\nDecode: ["we","say","#","yes"]'
    ],
    approach: `**Length Prefix Encoding**
Prefix each string with its length + delimiter.
Format: "length#string"

**Why this works**
Even if string contains "#", we know exact length.
Read length, then read exactly that many chars.`,
    solution: `class Codec:
    def encode(self, strs):
        result = ""
        for s in strs:
            result += str(len(s)) + "#" + s
        return result
    
    def decode(self, s):
        result = []
        i = 0
        
        while i < len(s):
            # find the #
            j = i
            while s[j] != '#':
                j += 1
            
            length = int(s[i:j])
            result.append(s[j+1:j+1+length])
            i = j + 1 + length
        
        return result`,
    testCases: [
      { input: { strs: ["lint","code","love","you"] }, expected: ["lint","code","love","you"] },
      { input: { strs: ["we","say","#","yes"] }, expected: ["we","say","#","yes"] },
      { input: { strs: [""] }, expected: [""] },
    ],
    starterCode: `class Codec:
    def encode(self, strs):
        pass
    
    def decode(self, s):
        pass`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=B1k_sxOSgv8',
  },
  {
    id: 'design-twitter',
    title: 'Design Twitter',
    difficulty: 'medium',
    topics: ['Design', 'Heap', 'Hash Map'],
    description: 'Design a simplified Twitter where users can post tweets, follow/unfollow users, and see the 10 most recent tweets in their feed.',
    examples: [
      'twitter.postTweet(1, 5) // User 1 posts tweet 5\ntwitter.getNewsFeed(1) // [5]\ntwitter.follow(1, 2) // User 1 follows User 2\ntwitter.postTweet(2, 6) // User 2 posts tweet 6\ntwitter.getNewsFeed(1) // [6, 5]'
    ],
    approach: `**Data Structures**
- tweets: {userId: [(time, tweetId)]}
- follows: {userId: set(followeeIds)}
- Global timestamp for ordering

**getNewsFeed**
Merge k sorted lists (user + followees).
Use min heap, return top 10.`,
    solution: `class Twitter:
    def __init__(self):
        self.time = 0
        self.tweets = {}  # userId -> [(time, tweetId)]
        self.follows = {}  # userId -> set(followeeIds)
    
    def postTweet(self, userId, tweetId):
        if userId not in self.tweets:
            self.tweets[userId] = []
        self.tweets[userId].append((self.time, tweetId))
        self.time += 1
    
    def getNewsFeed(self, userId):
        import heapq
        
        # get all users to check (self + followees)
        users = self.follows.get(userId, set()) | {userId}
        
        # max heap of (-time, tweetId)
        heap = []
        for user in users:
            for time, tweetId in self.tweets.get(user, []):
                heapq.heappush(heap, (-time, tweetId))
        
        result = []
        while heap and len(result) < 10:
            result.append(heapq.heappop(heap)[1])
        return result
    
    def follow(self, followerId, followeeId):
        if followerId not in self.follows:
            self.follows[followerId] = set()
        self.follows[followerId].add(followeeId)
    
    def unfollow(self, followerId, followeeId):
        if followerId in self.follows:
            self.follows[followerId].discard(followeeId)`,
    testCases: [
      { input: { operations: ["Twitter","postTweet","getNewsFeed","follow","postTweet","getNewsFeed","unfollow","getNewsFeed"], values: [[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]] }, expected: [null,null,[5],null,null,[6,5],null,[5]] },
    ],
    starterCode: `class Twitter:
    def __init__(self):
        pass
    
    def postTweet(self, userId, tweetId):
        pass
    
    def getNewsFeed(self, userId):
        pass
    
    def follow(self, followerId, followeeId):
        pass
    
    def unfollow(self, followerId, followeeId):
        pass`,
    timeComplexity: 'O(n log n) for getNewsFeed',
    spaceComplexity: 'O(users × tweets)',
    youtubeUrl: 'https://www.youtube.com/watch?v=pNichitDD2E',
  },
  {
    id: 'palindrome-partitioning',
    title: 'Palindrome Partitioning',
    difficulty: 'medium',
    topics: ['Backtracking', 'String', 'DP'],
    description: 'Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitionings.',
    examples: [
      'Input: s = "aab"\nOutput: [["a","a","b"],["aa","b"]]',
      'Input: s = "a"\nOutput: [["a"]]'
    ],
    approach: `**Backtracking**
At each position, try all possible palindrome prefixes.
If prefix is palindrome, recurse on remainder.

**Optimization**
Precompute isPalindrome[i][j] with DP.
Or check on the fly with two pointers.`,
    solution: `def partition(s):
    result = []
    
    def is_palindrome(sub):
        return sub == sub[::-1]
    
    def backtrack(start, path):
        if start == len(s):
            result.append(path[:])
            return
        
        for end in range(start + 1, len(s) + 1):
            prefix = s[start:end]
            if is_palindrome(prefix):
                path.append(prefix)
                backtrack(end, path)
                path.pop()
    
    backtrack(0, [])
    return result`,
    testCases: [
      { input: { s: "aab" }, expected: [["a","a","b"],["aa","b"]] },
      { input: { s: "a" }, expected: [["a"]] },
      { input: { s: "aba" }, expected: [["a","b","a"],["aba"]] },
    ],
    starterCode: `def partition(s):
    # Your code here`,
    timeComplexity: 'O(n × 2^n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=3jvWodd7ht0',
  },
  {
    id: 'longest-common-subsequence',
    title: 'Longest Common Subsequence',
    difficulty: 'medium',
    topics: ['Dynamic Programming', '2D DP'],
    description: 'Given two strings text1 and text2, return the length of their longest common subsequence. A subsequence is a sequence derived by deleting some characters without changing order.',
    examples: [
      'Input: text1 = "abcde", text2 = "ace"\nOutput: 3\nExplanation: LCS is "ace"',
      'Input: text1 = "abc", text2 = "abc"\nOutput: 3',
      'Input: text1 = "abc", text2 = "def"\nOutput: 0'
    ],
    approach: `**2D DP**
dp[i][j] = LCS of text1[0:i] and text2[0:j]

**Transition**
If text1[i-1] == text2[j-1]:
  dp[i][j] = dp[i-1][j-1] + 1
Else:
  dp[i][j] = max(dp[i-1][j], dp[i][j-1])`,
    solution: `def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]`,
    testCases: [
      { input: { text1: "abcde", text2: "ace" }, expected: 3 },
      { input: { text1: "abc", text2: "abc" }, expected: 3 },
      { input: { text1: "abc", text2: "def" }, expected: 0 },
    ],
    starterCode: `def longestCommonSubsequence(text1, text2):
    # Your code here`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=Ua0GhsJSlWM',
  },
  {
    id: 'best-time-buy-sell-cooldown',
    title: 'Best Time to Buy and Sell Stock with Cooldown',
    difficulty: 'medium',
    topics: ['Dynamic Programming'],
    description: 'Find max profit from stock prices. After selling, you must wait one day (cooldown) before buying again. You can do multiple transactions.',
    examples: [
      'Input: prices = [1,2,3,0,2]\nOutput: 3\nExplanation: buy@1, sell@3, cooldown, buy@0, sell@2',
      'Input: prices = [1]\nOutput: 0'
    ],
    approach: `**State Machine DP**
Three states: hold, sold, rest
- hold: max profit holding stock
- sold: max profit just sold (cooldown next)
- rest: max profit resting (can buy)

**Transitions**
hold = max(hold, rest - price)
sold = hold + price
rest = max(rest, sold)`,
    solution: `def maxProfit(prices):
    if not prices:
        return 0
    
    hold = -prices[0]  # holding stock
    sold = 0           # just sold, must cooldown
    rest = 0           # resting, can buy
    
    for price in prices[1:]:
        prev_hold = hold
        prev_sold = sold
        prev_rest = rest
        
        hold = max(prev_hold, prev_rest - price)
        sold = prev_hold + price
        rest = max(prev_rest, prev_sold)
    
    return max(sold, rest)`,
    testCases: [
      { input: { prices: [1,2,3,0,2] }, expected: 3 },
      { input: { prices: [1] }, expected: 0 },
      { input: { prices: [1,2,4] }, expected: 3 },
    ],
    starterCode: `def maxProfit(prices):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=I7j0F7AHpb8',
  },
  {
    id: 'edit-distance',
    title: 'Edit Distance',
    difficulty: 'medium',
    topics: ['Dynamic Programming', '2D DP', 'String'],
    description: 'Given two strings word1 and word2, return the minimum number of operations (insert, delete, replace) to convert word1 to word2.',
    examples: [
      'Input: word1 = "horse", word2 = "ros"\nOutput: 3\nExplanation: horse → rorse → rose → ros',
      'Input: word1 = "intention", word2 = "execution"\nOutput: 5'
    ],
    approach: `**2D DP (Levenshtein Distance)**
dp[i][j] = min ops to convert word1[0:i] to word2[0:j]

**Transition**
If chars match: dp[i][j] = dp[i-1][j-1]
Else: dp[i][j] = 1 + min(
  dp[i-1][j],   // delete
  dp[i][j-1],   // insert
  dp[i-1][j-1]  // replace
)`,
    solution: `def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # base cases
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # delete
                    dp[i][j-1],    # insert
                    dp[i-1][j-1]   # replace
                )
    
    return dp[m][n]`,
    testCases: [
      { input: { word1: "horse", word2: "ros" }, expected: 3 },
      { input: { word1: "intention", word2: "execution" }, expected: 5 },
      { input: { word1: "", word2: "a" }, expected: 1 },
    ],
    starterCode: `def minDistance(word1, word2):
    # Your code here`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=XYi2-LPrwm4',
  },
  {
    id: 'jump-game-ii',
    title: 'Jump Game II',
    difficulty: 'medium',
    topics: ['Greedy', 'Array'],
    description: 'Given an array where nums[i] is max jump length from position i, return the minimum number of jumps to reach the last index. You can always reach the end.',
    examples: [
      'Input: nums = [2,3,1,1,4]\nOutput: 2\nExplanation: Jump 1 step (0→1), then 3 steps (1→4)',
      'Input: nums = [2,3,0,1,4]\nOutput: 2'
    ],
    approach: `**Greedy BFS-like**
Track current range [start, end] reachable with k jumps.
Find farthest reachable from this range.
That becomes the next range.

**Variables**
- jumps: number of jumps taken
- end: farthest index in current jump
- farthest: farthest reachable from current range`,
    solution: `def jump(nums):
    jumps = 0
    end = 0      # end of current jump range
    farthest = 0 # farthest we can reach
    
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        
        if i == end:
            jumps += 1
            end = farthest
    
    return jumps`,
    testCases: [
      { input: { nums: [2,3,1,1,4] }, expected: 2 },
      { input: { nums: [2,3,0,1,4] }, expected: 2 },
      { input: { nums: [1,2,3] }, expected: 2 },
    ],
    starterCode: `def jump(nums):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=dJ7sWiOoK7g',
  },
  {
    id: 'gas-station',
    title: 'Gas Station',
    difficulty: 'medium',
    topics: ['Greedy', 'Array'],
    description: 'There are n gas stations in a circle. gas[i] is gas at station i, cost[i] is gas to travel to next station. Return starting index to complete circuit, or -1 if impossible.',
    examples: [
      'Input: gas = [1,2,3,4,5], cost = [3,4,5,1,2]\nOutput: 3\nExplanation: Start at 3, travel: 4→3→4→3→4',
      'Input: gas = [2,3,4], cost = [3,4,3]\nOutput: -1'
    ],
    approach: `**Key Insight**
If total gas >= total cost, solution exists.
If we run out at station i, start can't be 0 to i.
So try starting from i+1.

**Greedy**
Track current tank and total balance.
If tank < 0, reset start to next station.`,
    solution: `def canCompleteCircuit(gas, cost):
    if sum(gas) < sum(cost):
        return -1
    
    tank = 0
    start = 0
    
    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        
        if tank < 0:
            # can't reach i+1 from start
            # try starting from i+1
            start = i + 1
            tank = 0
    
    return start`,
    testCases: [
      { input: { gas: [1,2,3,4,5], cost: [3,4,5,1,2] }, expected: 3 },
      { input: { gas: [2,3,4], cost: [3,4,3] }, expected: -1 },
    ],
    starterCode: `def canCompleteCircuit(gas, cost):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=lJwbPZGo05A',
  },
  {
    id: 'hand-of-straights',
    title: 'Hand of Straights',
    difficulty: 'medium',
    topics: ['Greedy', 'Hash Map', 'Sorting'],
    description: 'Given array hand of integers and groupSize, return true if you can rearrange into groups of consecutive cards of size groupSize.',
    examples: [
      'Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3\nOutput: true\nExplanation: [1,2,3], [2,3,4], [6,7,8]',
      'Input: hand = [1,2,3,4,5], groupSize = 4\nOutput: false'
    ],
    approach: `**Greedy with Count Map**
Sort unique values.
For each smallest available card:
  - Try to form a group starting with it
  - Decrement counts for consecutive cards
  - If any card missing, return false`,
    solution: `def isNStraightHand(hand, groupSize):
    if len(hand) % groupSize != 0:
        return False
    
    from collections import Counter
    count = Counter(hand)
    
    for card in sorted(count):
        while count[card] > 0:
            # start a group with this card
            for i in range(groupSize):
                if count[card + i] <= 0:
                    return False
                count[card + i] -= 1
    
    return True`,
    testCases: [
      { input: { hand: [1,2,3,6,2,3,4,7,8], groupSize: 3 }, expected: true },
      { input: { hand: [1,2,3,4,5], groupSize: 4 }, expected: false },
      { input: { hand: [1,2,3], groupSize: 1 }, expected: true },
    ],
    starterCode: `def isNStraightHand(hand, groupSize):
    # Your code here`,
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=amnrMCVd2YI',
  },
  {
    id: 'merge-triplets',
    title: 'Merge Triplets to Form Target Triplet',
    difficulty: 'medium',
    topics: ['Greedy', 'Array'],
    description: 'Given array of triplets and target triplet, return true if you can form target by selecting triplets and taking max of each position.',
    examples: [
      'Input: triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]\nOutput: true\nExplanation: Use [2,5,3] and [1,7,5] → max = [2,7,5]',
      'Input: triplets = [[3,4,5],[4,5,6]], target = [3,2,5]\nOutput: false'
    ],
    approach: `**Greedy Filter**
A triplet is "usable" if no element exceeds target.
(If any element > target, we can never use it)

**Check**
For each target position, at least one usable
triplet must match that exact value.`,
    solution: `def mergeTriplets(triplets, target):
    good = set()
    
    for t in triplets:
        # skip if any value exceeds target
        if t[0] > target[0] or t[1] > target[1] or t[2] > target[2]:
            continue
        
        # this triplet is usable
        for i in range(3):
            if t[i] == target[i]:
                good.add(i)
    
    return len(good) == 3`,
    testCases: [
      { input: { triplets: [[2,5,3],[1,8,4],[1,7,5]], target: [2,7,5] }, expected: true },
      { input: { triplets: [[3,4,5],[4,5,6]], target: [3,2,5] }, expected: false },
      { input: { triplets: [[2,5,3],[2,3,4],[1,2,5],[5,2,3]], target: [5,5,5] }, expected: true },
    ],
    starterCode: `def mergeTriplets(triplets, target):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=kShkQLQZ9K4',
  },
  {
    id: 'partition-labels',
    title: 'Partition Labels',
    difficulty: 'medium',
    topics: ['Greedy', 'Hash Map', 'Two Pointers'],
    description: 'Given a string s, partition it so each letter appears in at most one part. Return list of sizes of these parts.',
    examples: [
      'Input: s = "ababcbacadefegdehijhklij"\nOutput: [9,7,8]\nExplanation: "ababcbaca", "defegde", "hijhklij"',
      'Input: s = "eccbbbbdec"\nOutput: [10]'
    ],
    approach: `**Greedy with Last Occurrence**
1. Record last index of each character
2. Expand partition to include all last occurrences
3. When current index = partition end, cut

**Key Insight**
If char appears later, partition must extend.`,
    solution: `def partitionLabels(s):
    # last occurrence of each char
    last = {c: i for i, c in enumerate(s)}
    
    result = []
    start = 0
    end = 0
    
    for i, c in enumerate(s):
        end = max(end, last[c])
        
        if i == end:
            result.append(end - start + 1)
            start = i + 1
    
    return result`,
    testCases: [
      { input: { s: "ababcbacadefegdehijhklij" }, expected: [9,7,8] },
      { input: { s: "eccbbbbdec" }, expected: [10] },
      { input: { s: "abc" }, expected: [1,1,1] },
    ],
    starterCode: `def partitionLabels(s):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(26) = O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=B7m8UmZE-vw',
  },
  {
    id: 'valid-parenthesis-string',
    title: 'Valid Parenthesis String',
    difficulty: 'medium',
    topics: ['Greedy', 'String', 'DP'],
    description: 'Given string with \'(\', \')\' and \'*\' where * can be (, ), or empty, return true if string is valid.',
    examples: [
      'Input: s = "()"\nOutput: true',
      'Input: s = "(*)"\nOutput: true',
      'Input: s = "(*))"\nOutput: true'
    ],
    approach: `**Track Range of Open Parens**
- low: min possible open count (* = ) or empty)
- high: max possible open count (* = ()

**Rules**
- '(' → both increase
- ')' → both decrease
- '*' → low--, high++
- If high < 0 → invalid
- Keep low >= 0
- End: low must be 0`,
    solution: `def checkValidString(s):
    low = 0   # min open parens
    high = 0  # max open parens
    
    for c in s:
        if c == '(':
            low += 1
            high += 1
        elif c == ')':
            low -= 1
            high -= 1
        else:  # '*'
            low -= 1   # treat as )
            high += 1  # treat as (
        
        if high < 0:
            return False
        
        low = max(low, 0)
    
    return low == 0`,
    testCases: [
      { input: { s: "()" }, expected: true },
      { input: { s: "(*)" }, expected: true },
      { input: { s: "(*))" }, expected: true },
      { input: { s: "(((((*)))" }, expected: false },
    ],
    starterCode: `def checkValidString(s):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=QhPdNS143Qg',
  },
  {
    id: 'pow-x-n',
    title: 'Pow(x, n)',
    difficulty: 'medium',
    topics: ['Math', 'Recursion', 'Binary Exponentiation'],
    description: 'Implement pow(x, n), which calculates x raised to the power n.',
    examples: [
      'Input: x = 2.00000, n = 10\nOutput: 1024.00000',
      'Input: x = 2.10000, n = 3\nOutput: 9.26100',
      'Input: x = 2.00000, n = -2\nOutput: 0.25000'
    ],
    approach: `**Binary Exponentiation**
x^n = (x^(n/2))^2 if n even
x^n = x × (x^(n/2))^2 if n odd

**Handle Negative n**
x^(-n) = 1 / x^n

**Time: O(log n)**`,
    solution: `def myPow(x, n):
    if n == 0:
        return 1
    
    if n < 0:
        x = 1 / x
        n = -n
    
    result = 1
    while n > 0:
        if n % 2 == 1:
            result *= x
        x *= x
        n //= 2
    
    return result`,
    testCases: [
      { input: { x: 2.0, n: 10 }, expected: 1024.0 },
      { input: { x: 2.1, n: 3 }, expected: 9.261 },
      { input: { x: 2.0, n: -2 }, expected: 0.25 },
    ],
    starterCode: `def myPow(x, n):
    # Your code here`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=g9YQyYi4IQQ',
  },
  {
    id: 'multiply-strings',
    title: 'Multiply Strings',
    difficulty: 'medium',
    topics: ['Math', 'String'],
    description: 'Given two non-negative integers represented as strings, return their product as a string. Cannot use BigInteger or convert directly to integer.',
    examples: [
      'Input: num1 = "2", num2 = "3"\nOutput: "6"',
      'Input: num1 = "123", num2 = "456"\nOutput: "56088"'
    ],
    approach: `**Grade School Multiplication**
Position i × j contributes to positions i+j and i+j+1.
Use array to accumulate products.

**Key Formula**
result[i+j+1] += digit1 × digit2
Handle carries after all multiplications.`,
    solution: `def multiply(num1, num2):
    if num1 == "0" or num2 == "0":
        return "0"
    
    m, n = len(num1), len(num2)
    result = [0] * (m + n)
    
    for i in range(m - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            mul = int(num1[i]) * int(num2[j])
            p1, p2 = i + j, i + j + 1
            total = mul + result[p2]
            
            result[p2] = total % 10
            result[p1] += total // 10
    
    # remove leading zeros
    result_str = ''.join(map(str, result))
    return result_str.lstrip('0') or '0'`,
    testCases: [
      { input: { num1: "2", num2: "3" }, expected: "6" },
      { input: { num1: "123", num2: "456" }, expected: "56088" },
      { input: { num1: "0", num2: "52" }, expected: "0" },
    ],
    starterCode: `def multiply(num1, num2):
    # Your code here`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m + n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=1vZswirL8Y8',
  },
  {
    id: 'detect-squares',
    title: 'Detect Squares',
    difficulty: 'medium',
    topics: ['Design', 'Hash Map', 'Math'],
    description: 'Design a data structure to add points and count axis-aligned squares that can be formed with a query point.',
    examples: [
      'add([3,10]), add([11,2]), add([3,2])\ncount([11,10]) → 1 (square with [3,10],[11,2],[3,2],[11,10])'
    ],
    approach: `**For count(px, py):**
1. Find all points with same x as query
2. For each such point (px, qy):
   - side = |py - qy|
   - Check if other two corners exist
   - Both (px+side, py) and (px+side, qy)
   - Or (px-side, py) and (px-side, qy)

**Use Counter for point counts**`,
    solution: `class DetectSquares:
    def __init__(self):
        from collections import defaultdict
        self.points = defaultdict(int)
        self.x_points = defaultdict(list)  # x -> list of y
    
    def add(self, point):
        x, y = point
        self.points[(x, y)] += 1
        self.x_points[x].append(y)
    
    def count(self, point):
        px, py = point
        result = 0
        
        # find all points with same x
        for qy in self.x_points[px]:
            if qy == py:
                continue
            
            side = abs(py - qy)
            
            # check right square
            result += self.points[(px + side, py)] * self.points[(px + side, qy)]
            # check left square
            result += self.points[(px - side, py)] * self.points[(px - side, qy)]
        
        return result`,
    testCases: [
      { input: { operations: ["DetectSquares","add","add","add","count","count","add","count"], values: [[],[[3,10]],[[11,2]],[[3,2]],[[11,10]],[[14,8]],[[11,2]],[[11,10]]] }, expected: [null,null,null,null,1,0,null,2] },
    ],
    starterCode: `class DetectSquares:
    def __init__(self):
        pass
    
    def add(self, point):
        pass
    
    def count(self, point):
        pass`,
    timeComplexity: 'O(n) for count',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=bahebearrDc',
  },
  {
    id: 'sum-two-integers',
    title: 'Sum of Two Integers',
    difficulty: 'medium',
    topics: ['Bit Manipulation', 'Math'],
    description: 'Given two integers a and b, return their sum without using + or - operators.',
    examples: [
      'Input: a = 1, b = 2\nOutput: 3',
      'Input: a = 2, b = 3\nOutput: 5'
    ],
    approach: `**Bit Manipulation**
- XOR gives sum without carry: a ^ b
- AND gives carry positions: a & b
- Shift carry left: (a & b) << 1
- Repeat until no carry

**Handle Negative (Python)**
Python integers are unlimited, need masking.`,
    solution: `def getSum(a, b):
    MASK = 0xFFFFFFFF
    MAX = 0x7FFFFFFF
    
    while b != 0:
        carry = (a & b) & MASK
        a = (a ^ b) & MASK
        b = (carry << 1) & MASK
    
    # handle negative numbers
    return a if a <= MAX else ~(a ^ MASK)`,
    testCases: [
      { input: { a: 1, b: 2 }, expected: 3 },
      { input: { a: 2, b: 3 }, expected: 5 },
      { input: { a: -1, b: 1 }, expected: 0 },
    ],
    starterCode: `def getSum(a, b):
    # Your code here`,
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=gVUrDV4tZfY',
  },
  {
    id: 'interleaving-string',
    title: 'Interleaving String',
    difficulty: 'medium',
    topics: ['Dynamic Programming', '2D DP', 'String'],
    description: 'Given strings s1, s2, and s3, return true if s3 is formed by interleaving s1 and s2 while preserving relative order.',
    examples: [
      'Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"\nOutput: true',
      'Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"\nOutput: false'
    ],
    approach: `**2D DP**
dp[i][j] = can s3[0:i+j] be formed by s1[0:i] and s2[0:j]?

**Transition**
dp[i][j] = 
  (dp[i-1][j] and s1[i-1] == s3[i+j-1]) or
  (dp[i][j-1] and s2[j-1] == s3[i+j-1])`,
    solution: `def isInterleave(s1, s2, s3):
    m, n = len(s1), len(s2)
    if m + n != len(s3):
        return False
    
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    
    # fill first row
    for j in range(1, n + 1):
        dp[0][j] = dp[0][j-1] and s2[j-1] == s3[j-1]
    
    # fill first column
    for i in range(1, m + 1):
        dp[i][0] = dp[i-1][0] and s1[i-1] == s3[i-1]
    
    # fill rest
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            dp[i][j] = (
                (dp[i-1][j] and s1[i-1] == s3[i+j-1]) or
                (dp[i][j-1] and s2[j-1] == s3[i+j-1])
            )
    
    return dp[m][n]`,
    testCases: [
      { input: { s1: "aabcc", s2: "dbbca", s3: "aadbbcbcac" }, expected: true },
      { input: { s1: "aabcc", s2: "dbbca", s3: "aadbbbaccc" }, expected: false },
      { input: { s1: "", s2: "", s3: "" }, expected: true },
    ],
    starterCode: `def isInterleave(s1, s2, s3):
    # Your code here`,
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(m × n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=3Rw3p9LrgvE',
  },
  {
    id: 'kth-largest-element',
    title: 'Kth Largest Element in an Array',
    difficulty: 'medium',
    topics: ['Heap', 'Quickselect'],
    description: 'Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in sorted order, not the kth distinct element.',
    examples: [
      'Input: nums = [3,2,1,5,6,4], k = 2\nOutput: 5',
      'Input: nums = [3,2,3,1,2,4,5,5,6], k = 4\nOutput: 4'
    ],
    approach: `**Min Heap of Size K**
Keep a min heap of size k.
The top of heap is the kth largest.

**Alternative: QuickSelect O(n) average**
Partition like quicksort.
Only recurse on the side containing k.

**Heap is simpler, QuickSelect is faster.`,
    solution: `def findKthLargest(nums, k):
    import heapq
    
    # min heap of size k
    heap = []
    
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    
    return heap[0]

# Alternative: QuickSelect
def findKthLargest_quickselect(nums, k):
    k = len(nums) - k  # convert to kth smallest
    
    def quickselect(l, r):
        pivot = nums[r]
        p = l
        for i in range(l, r):
            if nums[i] <= pivot:
                nums[p], nums[i] = nums[i], nums[p]
                p += 1
        nums[p], nums[r] = nums[r], nums[p]
        
        if p > k:
            return quickselect(l, p - 1)
        elif p < k:
            return quickselect(p + 1, r)
        else:
            return nums[p]
    
    return quickselect(0, len(nums) - 1)`,
    testCases: [
      { input: { nums: [3,2,1,5,6,4], k: 2 }, expected: 5 },
      { input: { nums: [3,2,3,1,2,4,5,5,6], k: 4 }, expected: 4 },
      { input: { nums: [1], k: 1 }, expected: 1 },
    ],
    starterCode: `def findKthLargest(nums, k):
    # Your code here`,
    timeComplexity: 'O(n log k) heap, O(n) avg quickselect',
    spaceComplexity: 'O(k) heap, O(1) quickselect',
    youtubeUrl: 'https://www.youtube.com/watch?v=XEmy13g1Qxc',
  },
]
