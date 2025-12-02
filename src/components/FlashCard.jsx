import React, { useState } from 'react'
import { colors, styles } from '../utils/theme'
import { CodeEditor, CodeDisplay } from './CodeEditor'
import { Walkthrough } from './Walkthrough'

// Renders markdown-ish text with bold support
function RichText({ text }) {
  if (!text) return null
  
  const parts = text.split(/(\*\*[^*]+\*\*|\n|`[^`]+`)/)
  
  return (
    <div style={{ lineHeight: '1.7', color: colors.text.primary }}>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} style={{ color: colors.accent.light }}>{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} style={{
              backgroundColor: colors.bg.tertiary,
              padding: '2px 6px',
              borderRadius: '4px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '13px',
              color: colors.syntax.string,
            }}>
              {part.slice(1, -1)}
            </code>
          )
        }
        if (part === '\n') {
          return <br key={i} />
        }
        return <span key={i}>{part}</span>
      })}
    </div>
  )
}

// Box wrapper for visual separation
function SectionBox({ children, style = {} }) {
  return (
    <div style={{
      backgroundColor: colors.bg.secondary,
      border: `2px solid ${colors.border.default}`,
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '16px',
      ...style,
    }}>
      {children}
    </div>
  )
}

export function FlashCard({ problem, isFlipped, onFlip, userCode, onCodeChange, pyodide, pyodideLoading }) {

  const [testResults, setTestResults] = useState(null)
  const [isRunning, setIsRunning] = useState(false)

  // Python helper classes for data structures
  const pythonHelpers = `
# Data structure classes
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Convert array to linked list
def array_to_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    curr = head
    for val in arr[1:]:
        curr.next = ListNode(val)
        curr = curr.next
    return head

# Convert linked list to array
def list_to_array(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    return result

# Convert array to binary tree (level order)
def array_to_tree(arr):
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    queue = [root]
    i = 1
    while queue and i < len(arr):
        node = queue.pop(0)
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            queue.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            queue.append(node.right)
        i += 1
    return root

# Convert binary tree to array (level order)
def tree_to_array(root):
    if not root:
        return []
    result = []
    queue = [root]
    while queue:
        node = queue.pop(0)
        if node:
            result.append(node.val)
            queue.append(node.left)
            queue.append(node.right)
        else:
            result.append(None)
    # Remove trailing Nones
    while result and result[-1] is None:
        result.pop()
    return result
`

  // Real test runner using Pyodide
  const runTests = async () => {
    if (!problem.testCases || problem.testCases.length === 0) {
      setTestResults([{ passed: false, error: 'No test cases available' }])
      return
    }

    if (!pyodide) {
      setTestResults([{ passed: false, error: 'Python loading... try again' }])
      return
    }

    setIsRunning(true)
    const code = userCode || problem.starterCode
    const isLinkedList = problem.topics.includes('Linked List')
    const isTree = problem.topics.includes('Trees')

    const results = []
    for (const tc of problem.testCases) {
      try {
        // Build input arguments with type conversion
        const inputParts = Object.entries(tc.input).map(([key, val]) => {
          // Check if this is a linked list input
          if (isLinkedList && (key === 'head' || key === 'list1' || key === 'list2' || key === 'l1' || key === 'l2')) {
            return `${key}=array_to_list(${JSON.stringify(val)})`
          }
          // Check if this is a tree input
          if (isTree && (key === 'root' || key === 'p' || key === 'q' || key === 'subRoot')) {
            return `${key}=array_to_tree(${JSON.stringify(val)})`
          }
          return `${key}=${JSON.stringify(val)}`
        })
        const inputArgs = inputParts.join(', ')
        
        const funcName = code.match(/def\s+(\w+)\s*\(/)?.[1] || 'solution'
        
        // Wrap result conversion based on problem type
        let resultConversion = 'result'
        if (isLinkedList && tc.expectedType === 'list') {
          resultConversion = 'list_to_array(result)'
        } else if (isTree && tc.expectedType === 'tree') {
          resultConversion = 'tree_to_array(result)'
        }
        
        const testCode = `
${pythonHelpers}

${code}

_result = ${funcName}(${inputArgs})
${resultConversion.replace('result', '_result')}
`
        const result = pyodide.runPython(testCode)
        let jsResult = result?.toJs ? result.toJs() : result
        
        // Convert Map to Object if needed
        if (jsResult instanceof Map) {
          jsResult = Object.fromEntries(jsResult)
        }
        
        // Convert to comparable format
        const got = JSON.stringify(jsResult)
        const expected = JSON.stringify(tc.expected)
        
        results.push({
          passed: got === expected,
          input: JSON.stringify(tc.input),
          expected: expected,
          got: got,
        })
      } catch (err) {
        results.push({
          passed: false,
          input: JSON.stringify(tc.input),
          expected: JSON.stringify(tc.expected),
          got: `Error: ${err.message.split('\n').pop()}`,
        })
      }
    }

    setTestResults(results)
    setIsRunning(false)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      {/* ===== BOX 1: Problem Header ===== */}
      <SectionBox>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: colors.text.primary, margin: '0 0 8px 0' }}>
              {problem.title}
            </h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <span style={styles.badge(problem.difficulty)}>{problem.difficulty}</span>
              {problem.topics.map(topic => (
                <span key={topic} style={styles.topicTag}>{topic}</span>
              ))}
            </div>
          </div>
          {problem.youtubeUrl && (
            <a
              href={problem.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 16px',
                backgroundColor: '#ff0000',
                border: 'none',
                borderRadius: '10px',
                color: 'white',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              ▶ NeetCode
            </a>
          )}
        </div>

        {/* Problem description */}
        <p style={{ color: colors.text.secondary, lineHeight: '1.6', margin: '0 0 16px 0' }}>
          {problem.description}
        </p>

        {/* Examples with colors */}
        {problem.examples && (
          <div style={{
            backgroundColor: colors.bg.primary,
            borderRadius: '10px',
            padding: '14px 18px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            border: `1px solid ${colors.border.default}`,
          }}>
            {problem.examples.map((example, idx) => (
              <div key={idx} style={{ marginBottom: idx < problem.examples.length - 1 ? '16px' : 0 }}>
                {example.split('\n').map((line, lineIdx) => {
                  if (line.startsWith('Input:')) {
                    return (
                      <div key={lineIdx}>
                        <span style={{ color: '#7dd3fc' }}>Input:</span>
                        <span style={{ color: colors.text.muted }}>{line.slice(6)}</span>
                      </div>
                    )
                  }
                  if (line.startsWith('Output:')) {
                    return (
                      <div key={lineIdx}>
                        <span style={{ color: '#4ade80' }}>Output:</span>
                        <span style={{ color: colors.text.muted }}>{line.slice(7)}</span>
                      </div>
                    )
                  }
                  if (line.startsWith('Explanation:')) {
                    return (
                      <div key={lineIdx}>
                        <span style={{ color: '#fbbf24' }}>Explanation:</span>
                        <span style={{ color: colors.text.muted }}>{line.slice(12)}</span>
                      </div>
                    )
                  }
                  return <div key={lineIdx} style={{ color: colors.text.muted }}>{line}</div>
                })}
              </div>
            ))}
          </div>
        )}
      </SectionBox>

      {/* ===== BOX 2: Muscle Memory (IDE) - NOW BEFORE SOLUTION ===== */}
      <SectionBox>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={styles.sectionTitle}>Muscle Memory</span>
          <span style={{ fontSize: '20px' }}>🐍</span>
        </div>
        <CodeEditor 
          code={userCode || problem.starterCode || '# Write your solution here'} 
          onChange={onCodeChange} 
        />
        
        {/* Run Tests button with results summary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '14px' }}>
          <button
            onClick={runTests}
            disabled={isRunning || pyodideLoading}
            style={{
              padding: '12px 24px',
              backgroundColor: (isRunning || pyodideLoading) ? colors.bg.tertiary : colors.accent.primary,
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              cursor: (isRunning || pyodideLoading) ? 'wait' : 'pointer',
              fontFamily: 'inherit',
              opacity: (isRunning || pyodideLoading) ? 0.7 : 1,
            }}
          >
            {pyodideLoading ? '🐍 Loading Python...' : isRunning ? '⏳ Running...' : '▶️ Run Tests'}
          </button>
          <button
            onClick={() => {
              onCodeChange(problem.starterCode)
              setTestResults(null)
            }}
            style={{
              padding: '12px 20px',
              backgroundColor: colors.bg.tertiary,
              border: `2px solid ${colors.border.default}`,
              borderRadius: '10px',
              color: colors.text.secondary,
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            🔄 Reset
          </button>
          {testResults && !isRunning && (
            <span style={{
              fontSize: '14px',
              fontWeight: '600',
              color: testResults.filter(r => r.passed).length === testResults.length 
                ? colors.accent.primary 
                : colors.status.warning,
            }}>
              {testResults.filter(r => r.passed).length}/{testResults.length} Passed
            </span>
          )}
        </div>

        {/* Test Results */}
        {testResults && (
          <div style={{ marginTop: '14px' }}>
            {testResults.map((result, idx) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                backgroundColor: result.passed ? '#14b8a620' : '#ff6b6b20',
                borderRadius: '8px',
                marginBottom: '8px',
                fontSize: '13px',
                fontFamily: "'JetBrains Mono', monospace",
                border: `1px solid ${result.passed ? '#14b8a640' : '#ff6b6b40'}`,
              }}>
                <span style={{ fontSize: '16px' }}>{result.passed ? '✅' : '❌'}</span>
                <span style={{ color: colors.text.muted }}>
                  {result.input} → {result.passed ? result.got : `Expected ${result.expected}, got ${result.got}`}
                </span>
              </div>
            ))}
          </div>
        )}
      </SectionBox>

      {/* ===== Peek at Solution Button - NOW BELOW IDE ===== */}
      <button
        onClick={onFlip}
        style={{
          width: '100%',
          padding: '18px',
          marginBottom: '16px',
          backgroundColor: isFlipped ? colors.bg.tertiary : colors.accent.primary,
          border: isFlipped ? `2px solid ${colors.border.default}` : 'none',
          borderRadius: '14px',
          color: 'white',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          fontFamily: 'inherit',
          boxShadow: isFlipped ? 'none' : `0 4px 12px ${colors.accent.primary}40`,
        }}
      >
        {isFlipped ? '🙈 Hide Solution' : '👁️👄👁️ Peek at Solution'}
      </button>

      {/* ===== Solution sections - only visible when flipped ===== */}
      {isFlipped && (
        <>
          {/* BOX 3: Approach */}
          <SectionBox>
            <span style={styles.sectionTitle}>Approach</span>
            <RichText text={problem.approach} />
          </SectionBox>

          {/* BOX 3: Interactive Walkthrough */}
          <SectionBox style={{ marginBottom: '16px' }}>
            <span style={styles.sectionTitle}>Interactive Walkthrough</span>
            <Walkthrough problemId={problem.id} />
          </SectionBox>

          {/* BOX 4: Solution code */}
          <SectionBox>
            <span style={styles.sectionTitle}>Solution</span>
            <CodeDisplay code={problem.solution} />
            {/* Colored complexity */}
            <div style={{ marginTop: '14px', display: 'flex', gap: '20px', fontSize: '14px' }}>
              <span style={{ color: '#7dd3fc', fontWeight: '500' }}>⏱ {problem.timeComplexity}</span>
              <span style={{ color: '#c4b5fd', fontWeight: '500' }}>💾 {problem.spaceComplexity}</span>
            </div>
          </SectionBox>
        </>
      )}
    </div>
  )
}
