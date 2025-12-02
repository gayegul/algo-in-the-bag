# 🎒 Algo in the Bag

An ADHD-friendly flashcard app for LeetCode interview prep. Built with React + Vite.

**128 NeetCode 150 Problems** (28 easy + 100 medium) with **128 Interactive Walkthroughs**!

Complete NeetCode 150 Easy + Medium coverage. No extras, no gaps.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to Production

```bash
git init && git add . && git commit -m "Deploy"
git remote add origin https://github.com/gayegul/algo-in-the-bag.git
git branch -M main && git push -f origin main
```

Vercel auto-deploys from main branch.

---

## 🏗️ Architecture Overview (For AI Agents)

### File Structure

```
src/
├── App.jsx              # Main app: routing, filters, navigation
├── main.jsx             # React entry point
├── components/
│   ├── index.js         # Component exports
│   ├── FlashCard.jsx    # Card view: problem, IDE, solution, tests
│   ├── CodeEditor.jsx   # Syntax-highlighted Python editor
│   └── Walkthrough.jsx  # Step-by-step algorithm animations (70 walkthroughs)
├── data/
│   ├── index.js         # Aggregates all problems, exports TOPICS & DIFFICULTIES
│   ├── problems-1.js    # Arrays, Hashing, Two Pointers, Sliding Window
│   ├── problems-2.js    # Stack, Binary Search, Linked List
│   ├── problems-3.js    # Trees
│   ├── problems-4.js    # DP, Bit Manipulation, Math
│   ├── problems-5.js    # Heap, Backtracking, Graphs
│   └── problems-6.js    # Intervals, Greedy, Advanced
├── hooks/
│   └── index.js         # useLocalStorage, useKeyboardShortcuts, useAnimationStepper
└── utils/
    └── theme.js         # Color palette, shared styles
```

### Key Components

#### `App.jsx`
- **List View**: Shows all problems with filters (difficulty, status, topic)
- **Card View**: Shows single FlashCard with navigation
- **State Management**:
  - `problemStatus` - localStorage: tracks 'new' | 'struggled' | 'got-it'
  - `userSolutions` - localStorage: saves code per problem ID
  - `isFlipped` - shows/hides solution

#### `FlashCard.jsx`
- Problem header (title, difficulty badge, topics)
- **Muscle Memory** IDE with CodeEditor, Run Tests, Reset button
- Pyodide test runner (real Python in browser, ListNode/TreeNode support)
- **Peek at Solution** toggle (approach, walkthrough, solution code)

#### `CodeEditor.jsx`
- Syntax highlighting for Python (keywords, strings, numbers, builtins)
- Tab inserts 4 spaces
- Enter maintains current indentation
- Overlay technique: invisible textarea over highlighted pre

#### `Walkthrough.jsx`
- 70 interactive walkthroughs (all problems covered)
- Uses `useAnimationStepper` hook for play/pause/next controls
- Each walkthrough visualizes the algorithm step-by-step

### Data Structure

Each problem in `data/problems-*.js`:

```javascript
{
  id: 'two-sum',                    // URL slug, used as key
  title: 'Two Sum',
  difficulty: 'easy',               // 'easy' | 'medium' | 'hard'
  topics: ['Arrays', 'Hash Table'], // For filtering
  description: 'Given an array...',
  examples: [
    'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: ...'
  ],
  approach: '**Bold text** and `code` supported via RichText component',
  solution: `def twoSum(nums, target):
    seen = {}  # comments displayed
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i`,
  testCases: [
    { input: { nums: [2,7,11,15], target: 9 }, expected: [0,1] },
  ],
  starterCode: `def twoSum(nums, target):
    # Your code here`,
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  neetcodeUrl: 'https://neetcode.io/problems/two-integer-sum',
}
```

### Styling System

Colors defined in `utils/theme.js`:
- Background: `#0d1117` (primary), `#161b22` (secondary), `#21262d` (tertiary)
- Accent: `#14b8a6` (teal)
- Difficulty: easy=`#5eead4`, medium=`#ffc947`, hard=`#ff6b6b`
- Syntax: keyword=`#ff7b72`, string=`#a5d6ff`, number=`#79c0ff`

All components use inline styles via `style={}` objects.

---

## 🔧 Common Tasks

### Add a New Problem

1. Add to appropriate `src/data/problems-*.js`
2. Follow the data structure above
3. Add testCases for the test runner

### Add a Walkthrough

1. Open `src/components/Walkthrough.jsx`
2. Create a new function like `export function MyProblemWalkthrough() {...}`
3. Add to `WALKTHROUGHS` map at bottom: `'problem-id': MyProblemWalkthrough`
4. Use existing walkthroughs as templates

### Modify Theme/Colors

Edit `src/utils/theme.js` - all colors centralized there.

### Change Test Runner

In `FlashCard.jsx`, the `runTests` function uses Pyodide with ListNode/TreeNode helpers.

---

## 🐛 TODOs

1. **Mobile responsiveness**: Not optimized for mobile yet
2. **Search by name**: Filter problems as you type

---

## 📊 Stats

- **70 problems** across 6 files (28 easy + 42 medium)
- **70 walkthroughs** - all problems covered
- **Test runner** with ListNode/TreeNode support

---

## 🔑 Key Decisions

1. **No external state** - useState + localStorage
2. **Pyodide at app level** - Loads once, shows "Loading Python..." until ready
3. **Inline styles** - No CSS files
4. **FlashCard key prop** - Forces remount per problem

---

## License

MIT
