// Tree problems - all follow recursive patterns

export const PROBLEMS_3 = [
  {
    id: 'invert-binary-tree',
    title: 'Invert Binary Tree',
    difficulty: 'easy',
    topics: ['Trees', 'DFS'],
    description: 'Given the root of a binary tree, invert the tree (swap left and right children at every node), and return its root.',
    examples: [
      'Input: root = [4,2,7,1,3,6,9]\nOutput: [4,7,2,9,6,3,1]',
      'Input: root = [2,1,3]\nOutput: [2,3,1]'
    ],
    approach: `**The Problem**
Flip the tree horizontally. Mirror image.

**Recursion**
Invert a tree = swap children + invert both subtrees.

**The Algorithm**
1. Base case: if node is None, return None
2. Swap left and right children
3. Recursively invert left subtree
4. Recursively invert right subtree

**The Pattern**
\`node.left, node.right = node.right, node.left\`
\`invert(node.left)\`
\`invert(node.right)\``,
    solution: `def invertTree(root):
    if not root:
        return None
    
    # swap children at this node
    root.left, root.right = root.right, root.left
    # recursively invert subtrees
    invertTree(root.left)
    invertTree(root.right)
    
    return root`,
    starterCode: `def invertTree(root):
    # Your code here`,
    testCases: [
      { input: { root: [4,2,7,1,3,6,9] }, expected: [4,7,2,9,6,3,1], expectedType: 'tree' },
      { input: { root: [2,1,3] }, expected: [2,3,1], expectedType: 'tree' },
      { input: { root: [] }, expected: [], expectedType: 'tree' },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h) - recursion stack',
    youtubeUrl: 'https://www.youtube.com/watch?v=OnSn2XEQ4MY',
  },
  {
    id: 'max-depth-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'easy',
    topics: ['Trees', 'DFS'],
    description: 'Given the root of a binary tree, return its maximum depth. Maximum depth is the number of nodes along the longest path from root to a leaf.',
    examples: [
      'Input: root = [3,9,20,null,null,15,7]\nOutput: 3',
      'Input: root = [1,null,2]\nOutput: 2'
    ],
    approach: `**The Problem**
How deep is the tree? Count nodes from root to furthest leaf.

**Recursion**
Depth of tree = 1 + max(depth of left, depth of right)

**The Algorithm**
1. Base case: empty tree has depth 0
2. Get depth of left subtree
3. Get depth of right subtree
4. Return 1 + max of both

**The Pattern**
\`return 1 + max(maxDepth(left), maxDepth(right))\``,
    solution: `def maxDepth(root):
    if not root:
        return 0  # empty tree has no depth
    
    # depth = 1 (this node) + deeper of two subtrees
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
    starterCode: `def maxDepth(root):
    # Your code here`,
    testCases: [
      { input: { root: [3,9,20,null,null,15,7] }, expected: 3 },
      { input: { root: [1,null,2] }, expected: 2 },
      { input: { root: [] }, expected: 0 },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    youtubeUrl: 'https://www.youtube.com/watch?v=hTM3phVI6YQ',
  },
  {
    id: 'diameter-binary-tree',
    title: 'Diameter of Binary Tree',
    difficulty: 'easy',
    topics: ['Trees', 'DFS'],
    description: 'Given the root of a binary tree, return the length of the diameter. The diameter is the length of the longest path between any two nodes (may or may not pass through root).',
    examples: [
      'Input: root = [1,2,3,4,5]\nOutput: 3 (path 4→2→1→3 or 5→2→1→3)',
      'Input: root = [1,2]\nOutput: 1'
    ],
    approach: `**The Problem**
Find the longest path between any two nodes. Count edges, not nodes.

**Key Insight**
At each node, longest path through it = left_height + right_height

**The Trick**
Use a helper that returns height but also tracks diameter.

**The Pattern**
\`diameter = max(diameter, left + right)\`
\`return 1 + max(left, right)\``,
    solution: `def diameterOfBinaryTree(root):
    diameter = 0
    
    def height(node):
        nonlocal diameter
        if not node:
            return 0
        left = height(node.left)
        right = height(node.right)
        # longest path through this node = left + right
        diameter = max(diameter, left + right)
        # return height for parent's calculation
        return 1 + max(left, right)
    
    height(root)
    return diameter`,
    starterCode: `def diameterOfBinaryTree(root):
    # Your code here`,
    testCases: [
      { input: { root: [1,2,3,4,5] }, expected: 3 },
      { input: { root: [1,2] }, expected: 1 },
      { input: { root: [1] }, expected: 0 },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    youtubeUrl: 'https://www.youtube.com/watch?v=bkxqA8Rfv04',
  },
  {
    id: 'balanced-binary-tree',
    title: 'Balanced Binary Tree',
    difficulty: 'easy',
    topics: ['Trees', 'DFS'],
    description: 'Given a binary tree, determine if it is height-balanced. A tree is balanced if the depth of the two subtrees of every node never differs by more than one.',
    examples: [
      'Input: root = [3,9,20,null,null,15,7]\nOutput: true',
      'Input: root = [1,2,2,3,3,null,null,4,4]\nOutput: false'
    ],
    approach: `**The Problem**
Is every node's left and right subtree within 1 level of each other?

**The Trick**
Check balance while calculating height. If unbalanced, return -1.

**The Algorithm**
1. Get height of left subtree
2. Get height of right subtree
3. If either is -1 (unbalanced), return -1
4. If heights differ by > 1, return -1
5. Otherwise return height

**The Pattern**
\`if abs(left - right) > 1: return -1\``,
    solution: `def isBalanced(root):
    def height(node):
        if not node:
            return 0
        left = height(node.left)
        right = height(node.right)
        # -1 signals imbalance found below
        if left == -1 or right == -1:
            return -1
        # heights differ by more than 1 = unbalanced
        if abs(left - right) > 1:
            return -1
        return 1 + max(left, right)
    
    return height(root) != -1`,
    starterCode: `def isBalanced(root):
    # Your code here`,
    testCases: [
      { input: { root: [3,9,20,null,null,15,7] }, expected: true },
      { input: { root: [1,2,2,3,3,null,null,4,4] }, expected: false },
      { input: { root: [] }, expected: true },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    youtubeUrl: 'https://www.youtube.com/watch?v=QfJsau0ItOY',
  },
  {
    id: 'same-tree',
    title: 'Same Tree',
    difficulty: 'easy',
    topics: ['Trees', 'DFS'],
    description: 'Given the roots of two binary trees p and q, check if they are the same. Two trees are the same if they have the same structure and all corresponding nodes have the same values.',
    examples: [
      'Input: p = [1,2,3], q = [1,2,3]\nOutput: true',
      'Input: p = [1,2], q = [1,null,2]\nOutput: false'
    ],
    approach: `**The Problem**
Are these two trees identical?

**Recursion**
Two trees are the same if:
- Both roots are null (both empty)
- Both roots have same value AND
- Left subtrees are the same AND
- Right subtrees are the same

**Base Cases**
\`if not p and not q: return True\` (both empty)
\`if not p or not q: return False\` (one empty)`,
    solution: `def isSameTree(p, q):
    # both empty = same
    if not p and not q:
        return True
    # one empty, one not = different
    if not p or not q:
        return False
    # same value + same structure on both sides
    return (p.val == q.val and 
            isSameTree(p.left, q.left) and 
            isSameTree(p.right, q.right))`,
    starterCode: `def isSameTree(p, q):
    # Your code here`,
    testCases: [
      { input: { p: [1,2,3], q: [1,2,3] }, expected: true },
      { input: { p: [1,2], q: [1,null,2] }, expected: false },
      { input: { p: [], q: [] }, expected: true },
    ],
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    youtubeUrl: 'https://www.youtube.com/watch?v=vRbbcKXCkOU',
  },
  {
    id: 'subtree-of-another-tree',
    title: 'Subtree of Another Tree',
    difficulty: 'easy',
    topics: ['Trees', 'DFS'],
    description: 'Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and values as subRoot.',
    examples: [
      'Input: root = [3,4,5,1,2], subRoot = [4,1,2]\nOutput: true',
      'Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]\nOutput: false'
    ],
    approach: `**The Problem**
Does the big tree contain the small tree somewhere?

**Combine Two Checks**
1. Is current node the root of a matching subtree?
2. If not, check left and right children

**The Pattern**
\`return isSame(root, subRoot) or \`
\`       isSubtree(root.left, subRoot) or \`
\`       isSubtree(root.right, subRoot)\``,
    solution: `def isSubtree(root, subRoot):
    if not root:
        return False
    # check if this node starts a matching subtree
    if isSame(root, subRoot):
        return True
    # otherwise check children
    return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot)

def isSame(p, q):
    if not p and not q:
        return True
    if not p or not q or p.val != q.val:
        return False
    return isSame(p.left, q.left) and isSame(p.right, q.right)`,
    starterCode: `def isSubtree(root, subRoot):
    # Your code here`,
    testCases: [
      { input: { root: [3,4,5,1,2], subRoot: [4,1,2] }, expected: true },
      { input: { root: [3,4,5,1,2,null,null,null,null,0], subRoot: [4,1,2] }, expected: false },
      { input: { root: [1,1], subRoot: [1] }, expected: true },
    ],
    timeComplexity: 'O(m × n)',
    spaceComplexity: 'O(h)',
    youtubeUrl: 'https://www.youtube.com/watch?v=E36O5SWp-LE',
  },
]
