// Stack, Binary Search, and Linked List problems

export const PROBLEMS_2 = [
  // ==========================================
  // STACK
  // ==========================================
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'easy',
    topics: ['Stack', 'Strings'],
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. Brackets must close in the correct order.',
    examples: [
      'Input: s = "()[]{}"\nOutput: true',
      'Input: s = "([)]"\nOutput: false',
      'Input: s = "{[]}"\nOutput: true'
    ],
    approach: `**The Problem**
Do all brackets match up properly?

**Use a Stack**
When you see an opening bracket, push it.
When you see a closing bracket, pop and check if it matches.

**Edge Cases**
- Stack empty when you need to pop → invalid
- Stack not empty at the end → invalid

**The Pattern**
\`pairs = {')': '(', ']': '[', '}': '{'}\`
\`for char in s:\`
\`  if opening: push\`
\`  if closing: pop and check match\``,
    solution: `def isValid(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}  # maps closer to opener
    
    for char in s:
        if char in '([{':
            stack.append(char)  # save opener for later
        else:
            # closer must match most recent opener
            if not stack or stack.pop() != pairs[char]:
                return False
    
    return len(stack) == 0  # all openers should be matched`,
    testCases: [
      { input: { s: '()[]{}' }, expected: true },
      { input: { s: '([)]' }, expected: false },
      { input: { s: '{[]}' }, expected: true },
    ],
    starterCode: `def isValid(s):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    youtubeUrl: 'https://www.youtube.com/watch?v=WTzjTskDFMg',
  },

  // ==========================================
  // BINARY SEARCH
  // ==========================================
  {
    id: 'binary-search',
    title: 'Binary Search',
    difficulty: 'easy',
    topics: ['Arrays', 'Binary Search'],
    description: 'Given a sorted array of integers nums and a target value, return the index if found, otherwise return -1. You must write an algorithm with O(log n) runtime.',
    examples: [
      'Input: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4',
      'Input: nums = [-1,0,3,5,9,12], target = 2\nOutput: -1'
    ],
    approach: `**The Problem**
Find a number in a sorted array. Must be O(log n).

**Binary Search**
Array is sorted → cut search space in half each time.

**The Algorithm**
1. Look at middle element
2. Too big? Search left half
3. Too small? Search right half
4. Equal? Found it!

**The Pattern**
\`while left <= right:\`
\`  mid = (left + right) // 2\`
\`  if nums[mid] == target: return mid\`
\`  elif nums[mid] < target: left = mid + 1\`
\`  else: right = mid - 1\``,
    solution: `def search(nums, target):
    left, right = 0, len(nums) - 1
    
    while left <= right:  # search space still has elements
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1  # target in right half
        else:
            right = mid - 1  # target in left half
    
    return -1  # exhausted search space`,
    testCases: [
      { input: { nums: [-1,0,3,5,9,12], target: 9 }, expected: 4 },
      { input: { nums: [-1,0,3,5,9,12], target: 2 }, expected: -1 },
    ],
    starterCode: `def search(nums, target):
    # Your code here`,
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=s4BJ3-F5zk',
  },

  // ==========================================
  // LINKED LIST
  // ==========================================
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'easy',
    topics: ['Linked List'],
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    examples: [
      'Input: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]',
      'Input: head = [1,2]\nOutput: [2,1]'
    ],
    approach: `**The Problem**
Flip the direction of all arrows in the list.

**Three Pointers**
Track: prev, curr, next

**The Algorithm**
1. Save next node
2. Point current backwards to prev
3. Move prev and curr forward
4. Repeat until done

**The Pattern**
\`prev = None\`
\`while curr:\`
\`  next = curr.next\`
\`  curr.next = prev\`
\`  prev = curr\`
\`  curr = next\`
\`return prev\``,
    solution: `def reverseList(head):
    prev = None  # reversed list starts empty
    curr = head
    
    while curr:
        next_node = curr.next  # save before we break the link
        curr.next = prev  # reverse the arrow
        prev = curr  # advance prev
        curr = next_node  # advance curr
    
    return prev  # prev is new head`,
    starterCode: `def reverseList(head):
    # Your code here`,
    testCases: [
      { input: { head: [1,2,3,4,5] }, expected: [5,4,3,2,1], expectedType: 'list' },
      { input: { head: [1,2] }, expected: [2,1], expectedType: 'list' },
      { input: { head: [] }, expected: [], expectedType: 'list' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=G0_I-ZF0S38',
  },
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    difficulty: 'easy',
    topics: ['Linked List'],
    description: 'Merge two sorted linked lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.',
    examples: [
      'Input: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]',
      'Input: list1 = [], list2 = [0]\nOutput: [0]'
    ],
    approach: `**The Problem**
Combine two sorted lists into one sorted list.

**Dummy Node Trick**
Create a fake "dummy" node to start your result.
Makes the code cleaner - no special case for first node.

**The Algorithm**
Compare heads of both lists.
Take the smaller one, attach to result.
Move that list's pointer forward.
Attach remaining nodes when one list is empty.

**The Pattern**
\`while list1 and list2:\`
\`  if list1.val < list2.val: take list1\`
\`  else: take list2\``,
    solution: `def mergeTwoLists(list1, list2):
    dummy = ListNode()  # fake head avoids edge cases
    curr = dummy
    
    while list1 and list2:
        # always take the smaller value
        if list1.val < list2.val:
            curr.next = list1
            list1 = list1.next
        else:
            curr.next = list2
            list2 = list2.next
        curr = curr.next
    
    curr.next = list1 or list2  # attach remaining nodes
    return dummy.next  # skip fake head`,
    starterCode: `def mergeTwoLists(list1, list2):
    # Your code here`,
    testCases: [
      { input: { list1: [1,2,4], list2: [1,3,4] }, expected: [1,1,2,3,4,4], expectedType: 'list' },
      { input: { list1: [], list2: [] }, expected: [], expectedType: 'list' },
      { input: { list1: [], list2: [0] }, expected: [0], expectedType: 'list' },
    ],
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=XIdigk956u0',
  },
  {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle',
    difficulty: 'easy',
    topics: ['Linked List', 'Two Pointers'],
    description: 'Given head of a linked list, determine if the list has a cycle in it. A cycle exists if some node can be reached again by following next pointers.',
    examples: [
      'Input: head = [3,2,0,-4], pos = 1\nOutput: true (tail connects to index 1)',
      'Input: head = [1], pos = -1\nOutput: false'
    ],
    approach: `**The Problem**
Does the linked list loop back on itself?

**Floyd's Tortoise and Hare**
Two pointers: slow moves 1 step, fast moves 2 steps.
If there's a cycle, they WILL meet.
If no cycle, fast hits the end.

**Why It Works**
In a cycle, fast catches up to slow by 1 step each iteration.
Like runners on a circular track.

**The Pattern**
\`while fast and fast.next:\`
\`  slow = slow.next\`
\`  fast = fast.next.next\`
\`  if slow == fast: return True\``,
    solution: `def hasCycle(head):
    slow = fast = head
    
    while fast and fast.next:  # fast hits end first if no cycle
        slow = slow.next  # tortoise: 1 step
        fast = fast.next.next  # hare: 2 steps
        if slow == fast:  # they met inside the cycle
            return True
    
    return False`,
    starterCode: `def hasCycle(head):
    # Your code here`,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    youtubeUrl: 'https://www.youtube.com/watch?v=gBTe7lFR3vc',
  },
]
