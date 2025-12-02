// Central export for all problems
// Split into multiple files for maintainability

import { PROBLEMS } from './problems-1'
import { PROBLEMS_2 } from './problems-2'
import { PROBLEMS_3 } from './problems-3'
import { PROBLEMS_4 } from './problems-4'
import { PROBLEMS_5 } from './problems-5'
import { PROBLEMS_6 } from './problems-6'

export const ALL_PROBLEMS = [
  ...PROBLEMS,
  ...PROBLEMS_2,
  ...PROBLEMS_3,
  ...PROBLEMS_4,
  ...PROBLEMS_5,
  ...PROBLEMS_6,
]

// Quick lookup by ID
export const PROBLEMS_BY_ID = ALL_PROBLEMS.reduce((acc, problem) => {
  acc[problem.id] = problem
  return acc
}, {})

// Group by topic for filtering
export const TOPICS = [...new Set(ALL_PROBLEMS.flatMap(p => p.topics))].sort()

// Group by difficulty
export const DIFFICULTIES = ['easy', 'medium', 'hard']
