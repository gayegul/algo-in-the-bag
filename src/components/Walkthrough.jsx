import React from 'react'
import { useAnimationStepper } from '../hooks'
import { colors } from '../utils/theme'

// Shared styles
const containerStyle = {
  backgroundColor: colors.bg.primary,
  borderRadius: '12px',
  padding: '24px',
  border: `1px solid ${colors.border.default}`,
}

const controlsStyle = { display: 'flex', gap: '8px' }

const buttonStyle = (active = false) => ({
  padding: '8px 12px',
  backgroundColor: active ? colors.accent.dark : colors.bg.tertiary,
  border: `1px solid ${colors.border.default}`,
  borderRadius: '8px',
  color: colors.text.primary,
  cursor: 'pointer',
  fontSize: '12px',
  fontFamily: 'inherit',
})

const stepDotsStyle = { display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }

const dotStyle = (active, completed) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: active ? colors.accent.primary : completed ? colors.accent.dark : colors.border.default,
  cursor: 'pointer',
})

const messageBoxStyle = (done = false) => ({
  backgroundColor: done ? `${colors.accent.dark}33` : `${colors.accent.primary}22`,
  border: `2px solid ${done ? colors.accent.dark : colors.accent.primary}`,
  borderRadius: '12px',
  padding: '20px',
  textAlign: 'center',
})

const cellStyle = (highlight, active) => ({
  width: '45px',
  height: '45px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: highlight ? colors.accent.dark : active ? colors.accent.primary : colors.bg.tertiary,
  border: active ? `3px solid ${colors.accent.light}` : `2px solid ${colors.border.default}`,
  color: colors.text.primary,
})

// Reusable controls bar
function WalkthroughControls({ controls, isPlaying, isComplete }) {
  return (
    <div style={controlsStyle}>
      <button onClick={controls.reset} style={buttonStyle()}>🔄 Reset</button>
      <button onClick={controls.toggle} style={buttonStyle(isPlaying)}>
        {isPlaying ? '⏸️ Pause' : '▶️ Play'}
      </button>
      <button onClick={controls.next} disabled={isComplete} style={{ ...buttonStyle(), opacity: isComplete ? 0.5 : 1 }}>
        Next ⏭️
      </button>
    </div>
  )
}

// Reusable step dots
function StepDots({ totalSteps, currentStep, onSelect }) {
  return (
    <div style={stepDotsStyle}>
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} onClick={() => onSelect(i)} style={dotStyle(i === currentStep, i < currentStep)} />
      ))}
    </div>
  )
}

// ============ ARRAYS & HASHING ============

export function TwoSumWalkthrough() {
  const nums = [2, 7, 11, 15]
  const target = 9
  const steps = [
    { index: 0, map: {}, message: "Start. Looking for pairs that sum to 9." },
    { index: 0, map: {}, checking: 7, message: "At index 0: need 7. Not in map. Save {2: 0}." },
    { index: 1, map: { 2: 0 }, checking: 2, found: true, message: "At index 1: need 2. Found at index 0!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>target = {target}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {nums.map((num, i) => (
          <div key={i} style={cellStyle(current.found && i <= 1, i === current.index)}>{num}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.found)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.found && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [0, 1]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function ContainsDuplicateWalkthrough() {
  const nums = [1, 2, 3, 1]
  const steps = [
    { seen: [], index: 0, message: "Start with empty set" },
    { seen: [1], index: 1, message: "Add 1 to set → {1}" },
    { seen: [1, 2], index: 2, message: "Add 2 to set → {1, 2}" },
    { seen: [1, 2, 3], index: 3, message: "Add 3 to set → {1, 2, 3}" },
    { seen: [1, 2, 3], index: 3, found: true, message: "1 already in set! Duplicate found!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>set = {`{${current.seen.join(', ')}}`}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {nums.map((num, i) => (
          <div key={i} style={cellStyle(current.found && num === 1, i === current.index)}>{num}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.found)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.found && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return True</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function ValidAnagramWalkthrough() {
  const s = "anagram"
  const t = "nagaram"
  const steps = [
    { phase: 'count', message: "Count letters in both strings" },
    { phase: 'show', counts: { a: 3, n: 1, g: 1, r: 1, m: 1 }, message: "s: a=3, n=1, g=1, r=1, m=1" },
    { phase: 'show', counts: { a: 3, n: 1, g: 1, r: 1, m: 1 }, message: "t: a=3, n=1, g=1, r=1, m=1" },
    { phase: 'done', message: "Same counts! It's an anagram!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>s="{s}" t="{t}"</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: colors.text.muted, marginBottom: '8px' }}>s</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {s.split('').map((c, i) => (
              <div key={i} style={{ ...cellStyle(false, false), width: '35px', height: '35px', fontSize: '14px' }}>{c}</div>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: colors.text.muted, marginBottom: '8px' }}>t</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {t.split('').map((c, i) => (
              <div key={i} style={{ ...cellStyle(false, false), width: '35px', height: '35px', fontSize: '14px' }}>{c}</div>
            ))}
          </div>
        </div>
      </div>
      <div style={messageBoxStyle(current.phase === 'done')}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.phase === 'done' && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return True</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

// ============ TWO POINTERS ============

export function ValidPalindromeWalkthrough() {
  const s = "A man a plan a canal Panama"
  const clean = "amanaplanacanalpanama"
  const steps = [
    { left: 0, right: 20, message: "Start: left='a', right='a' ✓" },
    { left: 1, right: 19, message: "left='m', right='m' ✓" },
    { left: 2, right: 18, message: "left='a', right='a' ✓" },
    { left: 9, right: 11, message: "...keep going... left='a', right='a' ✓" },
    { left: 10, right: 10, done: true, message: "Pointers meet! It's a palindrome!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>cleaned: "{clean}"</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
        {clean.split('').map((c, i) => (
          <div key={i} style={{
            ...cellStyle(false, i === current.left || i === current.right),
            width: '28px', height: '28px', fontSize: '12px'
          }}>{c}</div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '20px', fontSize: '10px', color: colors.accent.light }}>
        {clean.split('').map((_, i) => (
          <div key={i} style={{ width: '28px', textAlign: 'center' }}>
            {i === current.left ? 'L' : ''}{i === current.right ? 'R' : ''}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return True</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

// ============ SLIDING WINDOW ============

export function BestTimeToBuySellWalkthrough() {
  const prices = [7, 1, 5, 3, 6, 4]
  const steps = [
    { index: 0, min: 7, profit: 0, message: "Day 0: price=7, min=7, profit=0" },
    { index: 1, min: 1, profit: 0, message: "Day 1: price=1, new min! profit=0" },
    { index: 2, min: 1, profit: 4, message: "Day 2: price=5, sell now? profit=4" },
    { index: 3, min: 1, profit: 4, message: "Day 3: price=3, profit=2 (keep 4)" },
    { index: 4, min: 1, profit: 5, message: "Day 4: price=6, sell now? profit=5! 🎉" },
    { index: 5, min: 1, profit: 5, done: true, message: "Day 5: price=4, profit=3 (keep 5)" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>min=${current.min} profit=${current.profit}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {prices.map((p, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={cellStyle(p === current.min, i === current.index)}>${p}</div>
            <div style={{ fontSize: '10px', color: colors.text.muted, marginTop: '4px' }}>Day {i}</div>
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 5</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

// ============ STACK ============

export function ValidParenthesesWalkthrough() {
  const s = "({[]})"
  const steps = [
    { index: 0, stack: [], message: "See '(' → push to stack" },
    { index: 1, stack: ['('], message: "See '{' → push to stack" },
    { index: 2, stack: ['(', '{'], message: "See '[' → push to stack" },
    { index: 3, stack: ['(', '{', '['], message: "See ']' → pop '[' ✓ matches!" },
    { index: 4, stack: ['(', '{'], message: "See '}' → pop '{' ✓ matches!" },
    { index: 5, stack: ['('], message: "See ')' → pop '(' ✓ matches!" },
    { index: 6, stack: [], done: true, message: "Stack empty! Valid parentheses!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1000)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>stack: [{current.stack.join(', ')}]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {s.split('').map((c, i) => (
          <div key={i} style={cellStyle(i < current.index, i === current.index)}>{c}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return True</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

// ============ BINARY SEARCH ============

export function BinarySearchWalkthrough() {
  const nums = [-1, 0, 3, 5, 9, 12]
  const target = 9
  const steps = [
    { left: 0, right: 5, mid: 2, message: "Start: mid=2, nums[2]=3 < 9, search right" },
    { left: 3, right: 5, mid: 4, message: "mid=4, nums[4]=9 = target!" },
    { left: 3, right: 5, mid: 4, found: true, message: "Found at index 4!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>target = {target}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
        {nums.map((num, i) => (
          <div key={i} style={{
            ...cellStyle(false, i === current.mid),
            opacity: (i >= current.left && i <= current.right) ? 1 : 0.4,
          }}>{num}</div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {nums.map((_, i) => (
          <div key={i} style={{ width: '45px', textAlign: 'center', fontSize: '10px', color: colors.accent.light }}>
            {i === current.left ? 'L' : ''}{i === current.mid ? 'M' : ''}{i === current.right ? 'R' : ''}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.found)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.found && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 4</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

// ============ LINKED LIST ============

export function ReverseLinkedListWalkthrough() {
  const steps = [
    { nodes: [1, 2, 3, 4, 5], arrows: [1,1,1,1,0], prev: null, curr: 0, message: "Start: prev=null, curr=1" },
    { nodes: [1, 2, 3, 4, 5], arrows: [-1,1,1,1,0], prev: 0, curr: 1, message: "Reverse 1→null, move forward" },
    { nodes: [1, 2, 3, 4, 5], arrows: [-1,-1,1,1,0], prev: 1, curr: 2, message: "Reverse 2→1" },
    { nodes: [1, 2, 3, 4, 5], arrows: [-1,-1,-1,1,0], prev: 2, curr: 3, message: "Reverse 3→2" },
    { nodes: [1, 2, 3, 4, 5], arrows: [-1,-1,-1,-1,0], prev: 3, curr: 4, message: "Reverse 4→3" },
    { nodes: [1, 2, 3, 4, 5], arrows: [-1,-1,-1,-1,-1], prev: 4, curr: null, done: true, message: "Done! Return prev (5→4→3→2→1)" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>prev={current.prev !== null ? current.nodes[current.prev] : 'null'}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        {current.nodes.map((n, i) => (
          <React.Fragment key={i}>
            <div style={cellStyle(current.prev === i, current.curr === i)}>{n}</div>
            {i < 4 && <span style={{ color: current.arrows[i] === -1 ? colors.accent.light : colors.text.muted }}>
              {current.arrows[i] === -1 ? '←' : '→'}
            </span>}
          </React.Fragment>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [5,4,3,2,1]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function MergeTwoSortedListsWalkthrough() {
  const steps = [
    { l1: [1, 2, 4], l2: [1, 3, 4], merged: [], message: "Compare heads: 1 vs 1" },
    { l1: [2, 4], l2: [1, 3, 4], merged: [1], message: "Take 1 from L1" },
    { l1: [2, 4], l2: [3, 4], merged: [1, 1], message: "Take 1 from L2" },
    { l1: [4], l2: [3, 4], merged: [1, 1, 2], message: "Take 2 from L1" },
    { l1: [4], l2: [4], merged: [1, 1, 2, 3], message: "Take 3 from L2" },
    { l1: [], l2: [4], merged: [1, 1, 2, 3, 4], message: "Take 4 from L1" },
    { l1: [], l2: [], merged: [1, 1, 2, 3, 4, 4], done: true, message: "Take remaining 4, done!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1000)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>merged: [{current.merged.join('→')}]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginBottom: '20px' }}>
        <div>
          <div style={{ color: colors.text.muted, marginBottom: '8px', fontSize: '12px' }}>L1</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {current.l1.map((n, i) => <div key={i} style={cellStyle(false, i === 0)}>{n}</div>)}
            {current.l1.length === 0 && <div style={{ color: colors.text.muted }}>empty</div>}
          </div>
        </div>
        <div>
          <div style={{ color: colors.text.muted, marginBottom: '8px', fontSize: '12px' }}>L2</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {current.l2.map((n, i) => <div key={i} style={cellStyle(false, i === 0)}>{n}</div>)}
            {current.l2.length === 0 && <div style={{ color: colors.text.muted }}>empty</div>}
          </div>
        </div>
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [1,1,2,3,4,4]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function LinkedListCycleWalkthrough() {
  const steps = [
    { slow: 0, fast: 0, message: "Start: slow=0, fast=0" },
    { slow: 1, fast: 2, message: "Move: slow+1, fast+2" },
    { slow: 2, fast: 4, message: "Move: slow at 2, fast at 4" },
    { slow: 3, fast: 3, done: true, message: "slow == fast! Cycle detected! 🔄" },
  ]
  const nodes = [3, 2, 0, -4]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>🐢 slow 🐇 fast</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        {nodes.map((n, i) => (
          <React.Fragment key={i}>
            <div style={{ position: 'relative' }}>
              <div style={cellStyle(current.slow === i && current.fast === i, current.slow === i || current.fast === i)}>{n}</div>
              <div style={{ position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', fontSize: '14px' }}>
                {current.slow === i && '🐢'}{current.fast === i && '🐇'}
              </div>
            </div>
            {i < 3 && <span style={{ color: colors.text.muted }}>→</span>}
          </React.Fragment>
        ))}
        <span style={{ color: colors.accent.light }}>↩️</span>
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return True</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

// ============ TREES ============

export function InvertBinaryTreeWalkthrough() {
  const steps = [
    { phase: 'start', message: "Original tree: 4 → [2,7] → [1,3,6,9]" },
    { phase: 'swap1', message: "Swap children of 4: 7↔2" },
    { phase: 'swap2', message: "Swap children of 7: 9↔6" },
    { phase: 'swap3', message: "Swap children of 2: 3↔1" },
    { phase: 'done', done: true, message: "Inverted! 4 → [7,2] → [9,6,3,1]" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  const trees = {
    start: '    4\n   / \\\n  2   7\n / \\ / \\\n1  3 6  9',
    swap1: '    4\n   / \\\n  7   2\n / \\ / \\\n6  9 1  3',
    swap2: '    4\n   / \\\n  7   2\n / \\ / \\\n9  6 1  3',
    swap3: '    4\n   / \\\n  7   2\n / \\ / \\\n9  6 3  1',
    done: '    4\n   / \\\n  7   2\n / \\ / \\\n9  6 3  1',
  }

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <pre style={{ textAlign: 'center', color: colors.text.primary, fontFamily: 'monospace', fontSize: '14px', marginBottom: '20px' }}>
        {trees[current.phase]}
      </pre>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function MaxDepthBinaryTreeWalkthrough() {
  const steps = [
    { level: 1, message: "Start at root (level 1)" },
    { level: 2, message: "Go to children (level 2)" },
    { level: 3, message: "Go deeper (level 3)" },
    { level: 3, done: true, message: "Hit leaf! Max depth = 3" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>depth: {current.level}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <pre style={{ textAlign: 'center', color: colors.text.primary, fontFamily: 'monospace', fontSize: '14px', marginBottom: '20px' }}>
{`    3      ← level 1
   / \\
  9  20    ← level 2
    /  \\
   15   7  ← level 3`}
      </pre>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 3</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function DiameterBinaryTreeWalkthrough() {
  const steps = [
    { node: null, leftH: null, rightH: null, diameter: 0, message: "Diameter = longest path (edges) between any 2 nodes" },
    { node: 4, leftH: 0, rightH: 0, diameter: 0, message: "Visit node 4 (leaf): left=0, right=0, path=0" },
    { node: 5, leftH: 0, rightH: 0, diameter: 0, message: "Visit node 5 (leaf): left=0, right=0, path=0" },
    { node: 2, leftH: 1, rightH: 1, diameter: 2, message: "Visit node 2: left=1, right=1, path=1+1=2 ✨" },
    { node: 3, leftH: 0, rightH: 0, diameter: 2, message: "Visit node 3 (leaf): left=0, right=0, path=0" },
    { node: 1, leftH: 2, rightH: 1, diameter: 3, done: true, message: "Visit node 1: left=2, right=1, path=2+1=3 ✨" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1800)
  const current = steps[step]

  const nodeStyle = (val) => ({
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: current.node === val ? colors.accent.main : colors.bg.tertiary,
    color: colors.text.primary,
    fontWeight: 'bold',
    border: current.node === val ? `2px solid ${colors.accent.light}` : '2px solid transparent'
  })

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <div style={nodeStyle(1)}>1</div>
        <div style={{ color: colors.text.muted, fontSize: '12px' }}>/&nbsp;&nbsp;&nbsp;&nbsp;\</div>
        <div style={{ display: 'flex', gap: '30px' }}>
          <div style={nodeStyle(2)}>2</div>
          <div style={nodeStyle(3)}>3</div>
        </div>
        <div style={{ color: colors.text.muted, fontSize: '12px', marginLeft: '-35px' }}>/&nbsp;&nbsp;\</div>
        <div style={{ display: 'flex', gap: '10px', marginLeft: '-35px' }}>
          <div style={nodeStyle(4)}>4</div>
          <div style={nodeStyle(5)}>5</div>
        </div>
      </div>
      {current.node && (
        <div style={{ textAlign: 'center', marginBottom: '15px', padding: '10px', backgroundColor: colors.bg.tertiary, borderRadius: '8px' }}>
          <div style={{ color: colors.text.secondary, marginBottom: '4px' }}>At node {current.node}:</div>
          <span style={{ color: colors.accent.light }}>left_height={current.leftH} </span>
          <span style={{ color: '#9b59b6' }}>right_height={current.rightH} </span>
          <span style={{ color: '#27ae60' }}>max_diameter={current.diameter}</span>
        </div>
      )}
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 3</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function BalancedBinaryTreeWalkthrough() {
  const steps = [
    { node: null, message: "Balanced = heights of left & right differ by ≤ 1" },
    { node: 15, leftH: 0, rightH: 0, diff: 0, message: "Node 15: left=0, right=0, diff=0 ✓" },
    { node: 7, leftH: 0, rightH: 0, diff: 0, message: "Node 7: left=0, right=0, diff=0 ✓" },
    { node: 20, leftH: 1, rightH: 1, diff: 0, message: "Node 20: left=1, right=1, diff=0 ✓" },
    { node: 9, leftH: 0, rightH: 0, diff: 0, message: "Node 9: left=0, right=0, diff=0 ✓" },
    { node: 3, leftH: 1, rightH: 2, diff: 1, done: true, message: "Node 3: left=1, right=2, diff=1 ≤ 1 ✓" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1800)
  const current = steps[step]

  const nodeStyle = (val) => ({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: current.node === val ? colors.accent.main : colors.bg.tertiary,
    color: colors.text.primary,
    fontWeight: 'bold',
    fontSize: '12px',
    border: current.node === val ? `2px solid ${colors.accent.light}` : '2px solid transparent'
  })

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <div style={nodeStyle(3)}>3</div>
        <div style={{ color: colors.text.muted, fontSize: '12px' }}>/&nbsp;&nbsp;&nbsp;&nbsp;\</div>
        <div style={{ display: 'flex', gap: '40px' }}>
          <div style={nodeStyle(9)}>9</div>
          <div style={nodeStyle(20)}>20</div>
        </div>
        <div style={{ color: colors.text.muted, fontSize: '12px', marginLeft: '45px' }}>/&nbsp;&nbsp;&nbsp;\</div>
        <div style={{ display: 'flex', gap: '15px', marginLeft: '45px' }}>
          <div style={nodeStyle(15)}>15</div>
          <div style={nodeStyle(7)}>7</div>
        </div>
      </div>
      {current.node && (
        <div style={{ textAlign: 'center', marginBottom: '15px', padding: '10px', backgroundColor: colors.bg.tertiary, borderRadius: '8px' }}>
          <span style={{ color: colors.accent.light }}>left_h={current.leftH} </span>
          <span style={{ color: '#9b59b6' }}>right_h={current.rightH} </span>
          <span style={{ color: current.diff <= 1 ? '#27ae60' : colors.difficulty.hard }}>|diff|={current.diff}</span>
        </div>
      )}
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return True</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function SameTreeWalkthrough() {
  const steps = [
    { message: "Compare roots: 1 == 1 ✓" },
    { message: "Compare left children: 2 == 2 ✓" },
    { message: "Compare right children: 3 == 3 ✓" },
    { done: true, message: "All nodes match! Same tree!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '60px', marginBottom: '20px' }}>
        <pre style={{ color: colors.text.primary, fontFamily: 'monospace', fontSize: '14px' }}>
{`  1      Tree p
 / \\
2   3`}
        </pre>
        <pre style={{ color: colors.text.primary, fontFamily: 'monospace', fontSize: '14px' }}>
{`  1      Tree q
 / \\
2   3`}
        </pre>
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return True</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function SubtreeOfAnotherTreeWalkthrough() {
  const steps = [
    { message: "Is subRoot a subtree of root?" },
    { message: "Check node 3: matches subRoot root!" },
    { message: "Check children: 4==4 ✓, 5==5 ✓" },
    { done: true, message: "Found matching subtree!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '20px' }}>
        <pre style={{ color: colors.text.primary, fontFamily: 'monospace', fontSize: '14px' }}>
{`    3       root
   / \\
  4   5
 / \\
1   2`}
        </pre>
        <pre style={{ color: colors.accent.light, fontFamily: 'monospace', fontSize: '14px' }}>
{`  4    subRoot
 / \\
1   2`}
        </pre>
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return True</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

// ============ DYNAMIC PROGRAMMING ============

export function ClimbingStairsWalkthrough() {
  const steps = [
    { n: 1, ways: [1], message: "1 step → 1 way" },
    { n: 2, ways: [1, 2], message: "2 steps → 2 ways (1+1 or 2)" },
    { n: 3, ways: [1, 2, 3], message: "3 steps → 3 ways = dp[2] + dp[1]" },
    { n: 4, ways: [1, 2, 3, 5], message: "4 steps → 5 ways = dp[3] + dp[2]" },
    { n: 5, ways: [1, 2, 3, 5, 8], done: true, message: "5 steps → 8 ways (Fibonacci!)" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>n = 5</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {[1, 2, 3, 4, 5].map((n, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={cellStyle(i < current.ways.length, i === current.ways.length - 1)}>
              {current.ways[i] || '?'}
            </div>
            <div style={{ fontSize: '10px', color: colors.text.muted, marginTop: '4px' }}>n={n}</div>
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 8</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function MinCostClimbingStairsWalkthrough() {
  const cost = [10, 15, 20]
  const steps = [
    { dp: [10, 15], message: "Start: can start at 0 or 1" },
    { dp: [10, 15, 30], message: "Step 2: min(10,15) + 20 = 30" },
    { dp: [10, 15, 30], done: true, message: "Top: min(dp[1], dp[2]) = min(15, 30) = 15" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>cost = [10, 15, 20]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {cost.map((c, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={cellStyle(false, i === current.dp.length - 1)}>{c}</div>
            <div style={{ fontSize: '10px', color: colors.accent.light, marginTop: '4px' }}>dp={current.dp[i]}</div>
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 15</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

// ============ BIT MANIPULATION ============

export function SingleNumberWalkthrough() {
  const nums = [4, 1, 2, 1, 2]
  const steps = [
    { index: 0, xor: 4, message: "0 ^ 4 = 4" },
    { index: 1, xor: 5, message: "4 ^ 1 = 5" },
    { index: 2, xor: 7, message: "5 ^ 2 = 7" },
    { index: 3, xor: 6, message: "7 ^ 1 = 6 (1 cancels out!)" },
    { index: 4, xor: 4, done: true, message: "6 ^ 2 = 4 (2 cancels out!)" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1000)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>XOR = {current.xor}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {nums.map((n, i) => (
          <div key={i} style={cellStyle(i < current.index, i === current.index)}>{n}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 4</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function NumberOf1BitsWalkthrough() {
  const steps = [
    { binary: '1011', count: 0, message: "n = 11 = 1011 in binary" },
    { binary: '1011', count: 1, message: "n & 1 = 1, count++" },
    { binary: '0101', count: 2, message: "n >> 1 = 101, n & 1 = 1, count++" },
    { binary: '0010', count: 2, message: "n >> 1 = 10, n & 1 = 0" },
    { binary: '0001', count: 3, done: true, message: "n >> 1 = 1, n & 1 = 1, done!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>count = {current.count}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.binary.split('').map((b, i) => (
          <div key={i} style={cellStyle(b === '1', false)}>{b}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 3</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function CountingBitsWalkthrough() {
  const steps = [
    { n: 0, bits: [0], message: "0 = 0b0 → 0 ones" },
    { n: 1, bits: [0, 1], message: "1 = 0b1 → 1 one" },
    { n: 2, bits: [0, 1, 1], message: "2 = 0b10 → 1 one" },
    { n: 3, bits: [0, 1, 1, 2], message: "3 = 0b11 → 2 ones" },
    { n: 4, bits: [0, 1, 1, 2, 1], message: "4 = 0b100 → 1 one" },
    { n: 5, bits: [0, 1, 1, 2, 1, 2], done: true, message: "5 = 0b101 → 2 ones" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1000)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>n = 5</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {[0,1,2,3,4,5].map((n, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={cellStyle(i < current.bits.length, i === current.bits.length - 1)}>{current.bits[i] ?? '?'}</div>
            <div style={{ fontSize: '10px', color: colors.text.muted, marginTop: '4px' }}>{n}</div>
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [0,1,1,2,1,2]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function ReverseBitsWalkthrough() {
  const steps = [
    { input: '10100000', output: '00000000', message: "Start reversing bits..." },
    { input: '10100000', output: '00000101', done: true, message: "Reversed! Each bit flipped position" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ color: colors.text.muted, marginBottom: '8px' }}>Input</div>
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '16px' }}>
          {current.input.split('').map((b, i) => (
            <div key={i} style={{ ...cellStyle(false, false), width: '30px', height: '30px', fontSize: '14px' }}>{b}</div>
          ))}
        </div>
        <div style={{ color: colors.text.muted, marginBottom: '8px' }}>Output</div>
        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
          {current.output.split('').map((b, i) => (
            <div key={i} style={{ ...cellStyle(b === '1', false), width: '30px', height: '30px', fontSize: '14px' }}>{b}</div>
          ))}
        </div>
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function MissingNumberWalkthrough() {
  const nums = [3, 0, 1]
  const steps = [
    { message: "nums = [3, 0, 1], n = 3" },
    { message: "Expected sum: 0+1+2+3 = 6" },
    { message: "Actual sum: 3+0+1 = 4" },
    { done: true, message: "Missing = 6 - 4 = 2!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>n = 3</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {[0, 1, '?', 3].map((n, i) => (
          <div key={i} style={cellStyle(n === '?', false)}>{n}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 2</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

// ============ MATH ============

export function HappyNumberWalkthrough() {
  const steps = [
    { n: 19, calc: '1² + 9² = 82', message: "19 → 1² + 9² = 82" },
    { n: 82, calc: '8² + 2² = 68', message: "82 → 8² + 2² = 68" },
    { n: 68, calc: '6² + 8² = 100', message: "68 → 6² + 8² = 100" },
    { n: 100, calc: '1² + 0² + 0² = 1', message: "100 → 1² + 0² + 0² = 1" },
    { n: 1, done: true, message: "Reached 1! It's happy! 😊" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>n = {current.n}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '48px', color: colors.accent.light }}>{current.n}</div>
        {current.calc && <div style={{ color: colors.text.muted, marginTop: '8px' }}>{current.calc}</div>}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return True</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function PlusOneWalkthrough() {
  const steps = [
    { digits: [1, 2, 3], index: 2, message: "Start at last digit: 3" },
    { digits: [1, 2, 4], index: -1, done: true, message: "3 + 1 = 4, no carry. Done!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.digits.map((d, i) => (
          <div key={i} style={cellStyle(current.done && i === 2, i === current.index)}>{d}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [1,2,4]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

// ============ HEAP ============

export function KthLargestStreamWalkthrough() {
  const steps = [
    { heap: [4, 5, 8], k: 3, message: "Init min-heap with k=3: [4,5,8]" },
    { heap: [4, 5, 8], val: 3, message: "Add 3: smaller than root 4, ignore" },
    { heap: [5, 5, 8], val: 5, message: "Add 5: replace 4 with 5, heapify" },
    { heap: [5, 8, 10], val: 10, done: true, message: "Add 10: root is 3rd largest = 5" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>k = 3</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.heap.map((n, i) => (
          <div key={i} style={cellStyle(i === 0, false)}>{n}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 5</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function LastStoneWeightWalkthrough() {
  const steps = [
    { stones: [2, 7, 4, 1, 8, 1], message: "Start: [2,7,4,1,8,1]" },
    { stones: [2, 4, 1, 1, 1], message: "Smash 8 & 7 → 1 remains" },
    { stones: [1, 1, 1, 2], message: "Smash 4 & 2 → 2 remains" },
    { stones: [1, 1, 1], message: "Smash 2 & 1 → 1 remains" },
    { stones: [1], done: true, message: "All smashed! Last stone = 1" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
        {current.stones.map((s, i) => (
          <div key={i} style={cellStyle(false, i < 2 && !current.done)}>🪨{s}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 1</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

// ============ MEDIUM PROBLEMS (keep existing) ============

export function HouseRobberWalkthrough() {
  const houses = [2, 7, 9, 3, 1]
  const steps = [
    { index: 0, prev: 0, curr: 2, message: "House 0: take $2", robbed: [0] },
    { index: 1, prev: 2, curr: 7, message: "House 1: max(2, 7) = 7", robbed: [1] },
    { index: 2, prev: 7, curr: 11, message: "House 2: max(7, 2+9) = 11", robbed: [0, 2] },
    { index: 3, prev: 11, curr: 11, message: "House 3: max(11, 7+3) = 11. Skip!", robbed: [0, 2] },
    { index: 4, prev: 11, curr: 12, message: "House 4: max(11, 11+1) = 12", robbed: [0, 2, 4], done: true },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>max = ${current.curr}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {houses.map((money, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={cellStyle(current.robbed.includes(i), i === current.index)}>${money}</div>
            <div style={{ fontSize: '10px', color: current.robbed.includes(i) ? colors.accent.light : colors.text.muted, marginTop: '4px' }}>
              {current.robbed.includes(i) ? '💰' : `#${i}`}
            </div>
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 12</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function NumberOfIslandsWalkthrough() {
  const grid = [['1','1','0','0'],['1','0','0','0'],['0','0','1','1']]
  const steps = [
    { visited: [], current: null, islands: 0, message: "Start scanning grid for '1's" },
    { visited: [[0,0],[0,1],[1,0]], current: [0,0], islands: 1, message: "Found '1' at (0,0). DFS marks connected land. Island #1" },
    { visited: [[0,0],[0,1],[1,0]], current: [2,2], islands: 1, message: "Continue scanning... skip water cells" },
    { visited: [[0,0],[0,1],[1,0],[2,2],[2,3]], current: [2,2], islands: 2, message: "Found '1' at (2,2). DFS marks connected. Island #2" },
    { visited: [[0,0],[0,1],[1,0],[2,2],[2,3]], current: null, islands: 2, done: true, message: "Done! Found 2 islands" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]
  const isVisited = (r, c) => current.visited.some(([vr, vc]) => vr === r && vc === c)
  const isCurrent = (r, c) => current.current && current.current[0] === r && current.current[1] === c

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Islands: {current.islands}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', marginBottom: '20px' }}>
        {grid.map((row, r) => (
          <div key={r} style={{ display: 'flex', gap: '4px' }}>
            {row.map((cell, c) => (
              <div key={c} style={{
                width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '6px', fontSize: '14px', fontWeight: 'bold',
                backgroundColor: isVisited(r, c) ? colors.accent.dark : cell === '1' ? colors.bg.tertiary : colors.bg.primary,
                border: isCurrent(r, c) ? `3px solid ${colors.accent.light}` : `2px solid ${colors.border.default}`,
                color: cell === '1' ? colors.accent.light : colors.text.muted,
              }}>{cell === '1' ? '🏝️' : '🌊'}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function SubsetsWalkthrough() {
  const steps = [
    { path: 'Start', subsets: [], current: [], message: "Start with empty subset" },
    { path: '→ include 1', subsets: [], current: [1], message: "Include 1" },
    { path: '→ include 2', subsets: [], current: [1,2], message: "Include 2" },
    { path: '→ include 3', subsets: [[1,2,3]], current: [1,2,3], message: "Include 3 → save [1,2,3]" },
    { path: '← backtrack', subsets: [[1,2,3],[1,2]], current: [1,2], message: "Backtrack, exclude 3 → save [1,2]" },
    { path: '← backtrack', subsets: [[1,2,3],[1,2],[1,3]], current: [1,3], message: "Backtrack to 1, include 3 → save [1,3]" },
    { path: '...', subsets: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]], current: [], done: true, message: "All 8 subsets found!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>nums = [1, 2, 3]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span style={{ color: colors.text.muted, fontSize: '12px' }}>{current.path}</span>
        <div style={{ display: 'inline-flex', gap: '8px', padding: '12px 20px', backgroundColor: colors.bg.tertiary, borderRadius: '8px', border: `2px solid ${colors.accent.primary}`, marginTop: '8px' }}>
          <span style={{ color: colors.text.secondary }}>current:</span>
          <span style={{ color: colors.accent.light, fontFamily: 'monospace' }}>[{current.current.join(', ')}]</span>
        </div>
      </div>
      {current.done && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
          {current.subsets.map((s, i) => (
            <span key={i} style={{ padding: '4px 10px', backgroundColor: colors.bg.tertiary, borderRadius: '4px', fontSize: '12px', color: colors.text.primary, fontFamily: 'monospace' }}>[{s.join(',')}]</span>
          ))}
        </div>
      )}
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

// ============ MEDIUM PROBLEMS ============

export function ThreeSumWalkthrough() {
  const nums = [-1, 0, 1, 2, -1, -4]
  const steps = [
    { sorted: [-4,-1,-1,0,1,2], i: 0, left: 1, right: 5, message: "Sort array. Fix i=-4, use two pointers" },
    { sorted: [-4,-1,-1,0,1,2], i: 0, left: 1, right: 5, message: "Sum=-4+(-1)+2=-3 < 0. Move left" },
    { sorted: [-4,-1,-1,0,1,2], i: 1, left: 2, right: 5, message: "Fix i=-1, left=-1, right=2" },
    { sorted: [-4,-1,-1,0,1,2], i: 1, left: 2, right: 5, message: "Sum=-1+(-1)+2=0. Found [-1,-1,2]!" },
    { sorted: [-4,-1,-1,0,1,2], i: 1, left: 3, right: 4, message: "Skip dupes. Sum=-1+0+1=0. Found [-1,0,1]!" },
    { sorted: [-4,-1,-1,0,1,2], i: 1, left: 3, right: 4, done: true, message: "Done! Found 2 triplets" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>target = 0</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.sorted.map((n, idx) => (
          <div key={idx} style={cellStyle(idx === current.i, idx === current.left || idx === current.right)}>{n}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function LongestSubstringWalkthrough() {
  const s = "abcabcbb"
  const steps = [
    { left: 0, right: 0, window: "a", message: "Window: 'a', max=1" },
    { left: 0, right: 1, window: "ab", message: "Window: 'ab', max=2" },
    { left: 0, right: 2, window: "abc", message: "Window: 'abc', max=3" },
    { left: 1, right: 3, window: "bca", message: "See 'a' again! Shrink left. Window: 'bca'" },
    { left: 2, right: 4, window: "cab", message: "See 'b' again! Shrink. Window: 'cab'" },
    { left: 2, right: 4, window: "cab", done: true, message: "Max length = 3 ('abc' or 'bca' or 'cab')" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>window: "{current.window}"</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '20px' }}>
        {s.split('').map((c, i) => (
          <div key={i} style={cellStyle(i >= current.left && i <= current.right, i === current.right)}>{c}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 3</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function CoinChangeWalkthrough() {
  const coins = [1, 2, 5]
  const steps = [
    { dp: [0,'∞','∞','∞','∞','∞'], amount: 0, message: "dp[0]=0. 0 coins for amount 0" },
    { dp: [0,1,'∞','∞','∞','∞'], amount: 1, message: "dp[1]=1. Use one 1-coin" },
    { dp: [0,1,1,'∞','∞','∞'], amount: 2, message: "dp[2]=1. Use one 2-coin" },
    { dp: [0,1,1,2,'∞','∞'], amount: 3, message: "dp[3]=2. Use 1+2" },
    { dp: [0,1,1,2,2,'∞'], amount: 4, message: "dp[4]=2. Use 2+2" },
    { dp: [0,1,1,2,2,1], amount: 5, done: true, message: "dp[5]=1. Use one 5-coin!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>coins = [1, 2, 5]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.dp.map((val, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={cellStyle(false, i === current.amount)}>{val}</div>
            <div style={{ fontSize: '10px', color: colors.text.muted, marginTop: '4px' }}>${i}</div>
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 1</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function MergeIntervalsWalkthrough() {
  const steps = [
    { intervals: [[1,3],[2,6],[8,10],[15,18]], merged: [], message: "Sort by start time" },
    { intervals: [[1,3],[2,6],[8,10],[15,18]], merged: [[1,3]], message: "Add [1,3]" },
    { intervals: [[1,3],[2,6],[8,10],[15,18]], merged: [[1,6]], message: "[2,6] overlaps! Extend to [1,6]" },
    { intervals: [[1,3],[2,6],[8,10],[15,18]], merged: [[1,6],[8,10]], message: "[8,10] no overlap. Add new" },
    { intervals: [[1,3],[2,6],[8,10],[15,18]], merged: [[1,6],[8,10],[15,18]], done: true, message: "[15,18] no overlap. Done!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
        {current.merged.map((interval, i) => (
          <div key={i} style={{ padding: '8px 16px', backgroundColor: colors.accent.dark, borderRadius: '8px', color: colors.text.primary }}>
            [{interval[0]},{interval[1]}]
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function MeetingRoomsWalkthrough() {
  const steps = [
    { intervals: [[0,30],[5,10],[15,20]], sorted: false, checking: -1, message: "Check: can we attend all meetings?" },
    { intervals: [[0,30],[5,10],[15,20]], sorted: true, checking: -1, message: "Sort by start time" },
    { intervals: [[0,30],[5,10],[15,20]], sorted: true, checking: 0, message: "[0,30] - first meeting" },
    { intervals: [[0,30],[5,10],[15,20]], sorted: true, checking: 1, conflict: true, done: true, message: "[5,10] starts at 5 < 30. CONFLICT!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  const sortedIntervals = current.sorted ? [[0,30],[5,10],[15,20]] : [[0,30],[5,10],[15,20]]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
        {sortedIntervals.map((interval, i) => (
          <div key={i} style={{ 
            padding: '8px 16px', 
            backgroundColor: current.checking === i ? (current.conflict ? colors.difficulty.hard : colors.accent.dark) : colors.bg.tertiary, 
            borderRadius: '8px', 
            color: colors.text.primary,
            border: `2px solid ${current.checking === i ? (current.conflict ? colors.difficulty.hard : colors.accent.main) : 'transparent'}`
          }}>
            [{interval[0]},{interval[1]}]
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.difficulty.hard, fontWeight: 'bold' }}>return False</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function GroupAnagramsWalkthrough() {
  const steps = [
    { word: "eat", sorted: "aet", groups: {}, message: "Sort 'eat' → 'aet'" },
    { word: "tea", sorted: "aet", groups: { aet: ["eat"] }, message: "Sort 'tea' → 'aet'. Same key!" },
    { word: "tan", sorted: "ant", groups: { aet: ["eat","tea"] }, message: "Sort 'tan' → 'ant'. New key" },
    { word: "ate", sorted: "aet", groups: { aet: ["eat","tea"], ant: ["tan"] }, message: "Sort 'ate' → 'aet'. Add to group" },
    { word: "", sorted: "", groups: { aet: ["eat","tea","ate"], ant: ["tan","nat"], abt: ["bat"] }, done: true, message: "3 groups found!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>{current.word && `"${current.word}" → "${current.sorted}"`}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
        {Object.entries(current.groups).map(([key, words]) => (
          <div key={key} style={{ padding: '8px 16px', backgroundColor: colors.bg.tertiary, borderRadius: '8px', border: `1px solid ${colors.border.default}` }}>
            <div style={{ fontSize: '10px', color: colors.text.muted }}>{key}</div>
            <div style={{ color: colors.text.primary }}>{words.join(', ')}</div>
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function TopKFrequentWalkthrough() {
  const steps = [
    { counts: {}, buckets: [], message: "Count frequencies first" },
    { counts: {1:3, 2:2, 3:1}, buckets: [], message: "1→3 times, 2→2 times, 3→1 time" },
    { counts: {1:3, 2:2, 3:1}, buckets: [[],[3],[2],[1]], message: "Bucket sort: bucket[freq] = nums" },
    { counts: {1:3, 2:2, 3:1}, buckets: [[],[3],[2],[1]], done: true, message: "Top 2: walk backwards → [1, 2]" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>k = 2</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.buckets.length > 0 && current.buckets.map((nums, freq) => (
          <div key={freq} style={{ textAlign: 'center' }}>
            <div style={cellStyle(freq === 3, freq === 2)}>{nums.join(',') || '-'}</div>
            <div style={{ fontSize: '10px', color: colors.text.muted, marginTop: '4px' }}>freq={freq}</div>
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [1, 2]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function ProductExceptSelfWalkthrough() {
  const nums = [1, 2, 3, 4]
  const steps = [
    { prefix: [1,1,1,1], suffix: [1,1,1,1], result: [1,1,1,1], message: "Start with all 1s" },
    { prefix: [1,1,2,6], suffix: [1,1,1,1], result: [1,1,2,6], message: "Prefix pass: product of left elements" },
    { prefix: [1,1,2,6], suffix: [24,12,4,1], result: [24,12,8,6], done: true, message: "Suffix pass: multiply by right products" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>nums = [1,2,3,4]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.result.map((val, i) => (
          <div key={i} style={cellStyle(current.done, false)}>{val}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [24,12,8,6]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function TwoSumIIWalkthrough() {
  const nums = [2, 7, 11, 15]
  const steps = [
    { left: 0, right: 3, sum: 17, message: "left=2, right=15. Sum=17 > 9" },
    { left: 0, right: 2, sum: 13, message: "Move right. Sum=13 > 9" },
    { left: 0, right: 1, sum: 9, done: true, message: "Sum=9. Found! Return [1,2]" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>target = 9</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {nums.map((n, i) => (
          <div key={i} style={cellStyle(current.done && (i === 0 || i === 1), i === current.left || i === current.right)}>{n}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [1, 2]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function MinStackWalkthrough() {
  const steps = [
    { stack: [], minStack: [], op: "init", message: "Two stacks: main + min tracker" },
    { stack: [-2], minStack: [-2], op: "push(-2)", message: "Push -2. Min is -2" },
    { stack: [-2,0], minStack: [-2,-2], op: "push(0)", message: "Push 0. Min still -2" },
    { stack: [-2,0,-3], minStack: [-2,-2,-3], op: "push(-3)", message: "Push -3. New min is -3" },
    { stack: [-2,0,-3], minStack: [-2,-2,-3], op: "getMin()", message: "getMin() = -3 (top of minStack)" },
    { stack: [-2,0], minStack: [-2,-2], op: "pop()", message: "Pop -3. Min back to -2" },
    { stack: [-2,0], minStack: [-2,-2], op: "getMin()", done: true, message: "getMin() = -2. O(1) always!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>{current.op}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: colors.text.muted, marginBottom: '8px', fontSize: '12px' }}>Stack</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {current.stack.map((n, i) => <div key={i} style={cellStyle(false, i === current.stack.length - 1)}>{n}</div>)}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: colors.text.muted, marginBottom: '8px', fontSize: '12px' }}>MinStack</div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {current.minStack.map((n, i) => <div key={i} style={cellStyle(i === current.minStack.length - 1, false)}>{n}</div>)}
          </div>
        </div>
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function Search2DMatrixWalkthrough() {
  const matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]]
  const steps = [
    { row: -1, col: -1, mid: 5, message: "Treat as 1D array. Binary search!" },
    { row: 1, col: 1, mid: 5, message: "mid=5 → matrix[1][1]=11. Target=3 < 11" },
    { row: 0, col: 2, mid: 2, message: "mid=2 → matrix[0][2]=5. Target=3 < 5" },
    { row: 0, col: 1, mid: 1, done: true, message: "mid=1 → matrix[0][1]=3. Found!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>target = 3</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', marginBottom: '20px' }}>
        {matrix.map((row, r) => (
          <div key={r} style={{ display: 'flex', gap: '4px' }}>
            {row.map((val, c) => (
              <div key={c} style={cellStyle(current.done && r === 0 && c === 1, r === current.row && c === current.col)}>{val}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return True</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function LCABSTWalkthrough() {
  const steps = [
    { node: 6, message: "Start at root 6. p=2, q=8" },
    { node: 6, message: "2 < 6 < 8. Split! 6 is LCA" },
    { node: 6, done: true, message: "When p and q are on different sides, current is LCA" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <pre style={{ textAlign: 'center', color: colors.text.primary, fontFamily: 'monospace', fontSize: '14px', marginBottom: '20px' }}>
{`       6        ← current
      / \\
     2   8      p=2, q=8
    / \\ / \\
   0  4 7  9`}
      </pre>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 6</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function LevelOrderTraversalWalkthrough() {
  const steps = [
    { queue: [3], level: 0, result: [], message: "Start with root in queue" },
    { queue: [9,20], level: 1, result: [[3]], message: "Level 0: [3]. Add children" },
    { queue: [15,7], level: 2, result: [[3],[9,20]], message: "Level 1: [9,20]. Add children" },
    { queue: [], level: 3, result: [[3],[9,20],[15,7]], done: true, message: "Level 2: [15,7]. Done!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>queue: [{current.queue.join(',')}]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <pre style={{ textAlign: 'center', color: colors.text.primary, fontFamily: 'monospace', fontSize: '14px', marginBottom: '20px' }}>
{`    3      ← level 0
   / \\
  9  20    ← level 1
    /  \\
   15   7  ← level 2`}
      </pre>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [[3],[9,20],[15,7]]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function LongestConsecutiveWalkthrough() {
  const nums = [100, 4, 200, 1, 3, 2]
  const steps = [
    { set: [100,4,200,1,3,2], checking: null, message: "Put all in a set for O(1) lookup" },
    { set: [100,4,200,1,3,2], checking: 100, seq: [100], message: "100: no 99 in set. Start=100. Length=1" },
    { set: [100,4,200,1,3,2], checking: 1, seq: [1,2,3,4], message: "1: no 0 in set. Start=1. Count: 1,2,3,4" },
    { set: [100,4,200,1,3,2], checking: 1, seq: [1,2,3,4], done: true, message: "Longest sequence: [1,2,3,4] = 4" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {nums.map((n, i) => (
          <div key={i} style={cellStyle(current.seq?.includes(n), n === current.checking)}>{n}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 4</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function MaximumSubarrayWalkthrough() {
  const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
  const steps = [
    { index: 0, current: -2, max: -2, message: "Start: current=-2, max=-2" },
    { index: 1, current: 1, max: 1, message: "max(1, -2+1)=1. Start fresh!" },
    { index: 2, current: -2, max: 1, message: "max(-3, 1-3)=-2. Keep going" },
    { index: 3, current: 4, max: 4, message: "max(4, -2+4)=4. Start fresh!" },
    { index: 6, current: 6, max: 6, message: "4-1+2+1=6. New max!" },
    { index: 8, current: 6, max: 6, done: true, message: "Final max=6. Subarray: [4,-1,2,1]" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>max = {current.max}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '20px' }}>
        {nums.map((n, i) => (
          <div key={i} style={cellStyle(i >= 3 && i <= 6 && current.done, i === current.index)}>{n}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 6</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function ContainerWithMostWaterWalkthrough() {
  const height = [1, 8, 6, 2, 5, 4, 8, 3, 7]
  const steps = [
    { left: 0, right: 8, area: 8, message: "Start widest. min(1,7)×8=8" },
    { left: 1, right: 8, area: 49, message: "Move shorter (left). min(8,7)×7=49" },
    { left: 1, right: 7, area: 49, message: "Move shorter (right). Area=24. Keep 49" },
    { left: 1, right: 6, area: 49, message: "min(8,8)×5=40. Keep 49" },
    { left: 1, right: 6, area: 49, done: true, message: "Max area = 49" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>max area = {current.area}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', alignItems: 'flex-end', marginBottom: '20px', height: '100px' }}>
        {height.map((h, i) => (
          <div key={i} style={{ width: '25px', height: `${h * 10}px`, backgroundColor: i === current.left || i === current.right ? colors.accent.primary : colors.bg.tertiary, borderRadius: '4px 4px 0 0', border: `1px solid ${colors.border.default}` }} />
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 49</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function RemoveNthFromEndWalkthrough() {
  const steps = [
    { fast: 2, slow: 0, list: [1,2,3,4,5], message: "Move fast n=2 steps ahead" },
    { fast: 4, slow: 2, list: [1,2,3,4,5], message: "Move both until fast at end" },
    { fast: 5, slow: 3, list: [1,2,3,4,5], message: "slow is right before target" },
    { fast: 5, slow: 3, list: [1,2,3,5], done: true, message: "Skip node 4. Done!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>n = 2</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        {current.list.map((n, i) => (
          <React.Fragment key={i}>
            <div style={{ position: 'relative' }}>
              <div style={cellStyle(false, i === current.slow || i === current.fast)}>{n}</div>
              <div style={{ position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)', fontSize: '10px', color: colors.accent.light }}>
                {i === current.slow && 'slow'}{i === current.fast && 'fast'}
              </div>
            </div>
            {i < current.list.length - 1 && <span style={{ color: colors.text.muted }}>→</span>}
          </React.Fragment>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [1,2,3,5]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function ReorderListWalkthrough() {
  const steps = [
    { phase: 'find', list: [1,2,3,4,5], message: "Step 1: Find middle with slow/fast" },
    { phase: 'reverse', list: [1,2,3,4,5], second: [5,4], message: "Step 2: Reverse second half: 4→5 becomes 5→4" },
    { phase: 'merge', list: [1,5,2,4,3], second: [], message: "Step 3: Merge alternating" },
    { phase: 'done', list: [1,5,2,4,3], second: [], done: true, message: "Done! 1→5→2→4→3" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        {current.list.map((n, i) => (
          <React.Fragment key={i}>
            <div style={cellStyle(current.done, false)}>{n}</div>
            {i < current.list.length - 1 && <span style={{ color: colors.text.muted }}>→</span>}
          </React.Fragment>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function ValidateBSTWalkthrough() {
  const steps = [
    { node: 5, range: '(-∞, ∞)', message: "Root 5: valid range (-∞, ∞)" },
    { node: 3, range: '(-∞, 5)', message: "Left 3: must be < 5. Valid!" },
    { node: 7, range: '(5, ∞)', message: "Right 7: must be > 5. Valid!" },
    { node: 7, range: '(5, ∞)', done: true, message: "All nodes within range. Valid BST!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>range: {current.range}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <pre style={{ textAlign: 'center', color: colors.text.primary, fontFamily: 'monospace', fontSize: '14px', marginBottom: '20px' }}>
{`    5
   / \\
  3   7
 / \\
1   4`}
      </pre>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return True</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function KthSmallestBSTWalkthrough() {
  const steps = [
    { stack: [5,3,1], visited: [], message: "Go left until null. Stack: [5,3,1]" },
    { stack: [5,3], visited: [1], message: "Pop 1 (k=1). Visit count=1" },
    { stack: [5,3,2], visited: [1], message: "Check right of 1 (node 2)" },
    { stack: [5,3], visited: [1,2], message: "Pop 2 (k=2). Visit count=2" },
    { stack: [5], visited: [1,2,3], done: true, message: "Pop 3 (k=3). Found! Return 3" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>k = 3, visited: [{current.visited.join(',')}]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <pre style={{ textAlign: 'center', color: colors.text.primary, fontFamily: 'monospace', fontSize: '14px', marginBottom: '20px' }}>
{`      5
     /
    3        inorder: 1,2,3,4,5
   / \\
  1   4
   \\
    2`}
      </pre>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 3</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function CloneGraphWalkthrough() {
  const steps = [
    { visited: [], current: 1, message: "Visit node 1, create clone" },
    { visited: [1], current: 2, message: "Visit neighbor 2, create clone" },
    { visited: [1,2], current: 3, message: "Visit neighbor 3, create clone" },
    { visited: [1,2,3], current: 4, message: "Visit neighbor 4, create clone" },
    { visited: [1,2,3,4], current: null, done: true, message: "All nodes cloned! Map prevents cycles" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>cloned: [{current.visited.join(',')}]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
        {[1,2,3,4].map(n => (
          <div key={n} style={cellStyle(current.visited.includes(n), n === current.current)}>{n}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function CourseScheduleWalkthrough() {
  const steps = [
    { graph: '0←1, 1←2', visiting: [], visited: [], message: "Build graph: 0←1←2 (2 needs 1, 1 needs 0)" },
    { graph: '0←1, 1←2', visiting: [2], visited: [], message: "DFS from 2. Add to visiting" },
    { graph: '0←1, 1←2', visiting: [2,1], visited: [], message: "Check prereq 1. Add to visiting" },
    { graph: '0←1, 1←2', visiting: [2,1,0], visited: [], message: "Check prereq 0. No more prereqs" },
    { graph: '0←1, 1←2', visiting: [], visited: [0,1,2], done: true, message: "All done! No cycle found" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>visiting: [{current.visiting.join(',')}]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
        {[0,1,2].map(n => (
          <React.Fragment key={n}>
            <div style={cellStyle(current.visited.includes(n), current.visiting.includes(n))}>{n}</div>
            {n < 2 && <span style={{ color: colors.text.muted }}>←</span>}
          </React.Fragment>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return True</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function CombinationSumWalkthrough() {
  const steps = [
    { path: [], target: 7, message: "Target=7, candidates=[2,3,6,7]" },
    { path: [2], target: 5, message: "Pick 2. Remaining=5" },
    { path: [2,2], target: 3, message: "Pick 2 again. Remaining=3" },
    { path: [2,2,3], target: 0, message: "Pick 3. Remaining=0. Found!" },
    { path: [7], target: 0, message: "Backtrack... Try 7. Remaining=0. Found!" },
    { path: [], target: 7, done: true, message: "Result: [[2,2,3], [7]]" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>path: [{current.path.join(',')}]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {[2,3,6,7].map(n => (
          <div key={n} style={cellStyle(current.path.includes(n), current.path[current.path.length-1] === n)}>{n}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function PermutationsWalkthrough() {
  const steps = [
    { path: [], remaining: [1,2,3], message: "Start empty. Pick from [1,2,3]" },
    { path: [1], remaining: [2,3], message: "Pick 1. Remaining: [2,3]" },
    { path: [1,2], remaining: [3], message: "Pick 2. Remaining: [3]" },
    { path: [1,2,3], remaining: [], message: "Pick 3. Complete! [1,2,3]" },
    { path: [1,3,2], remaining: [], message: "Backtrack, pick 3 before 2: [1,3,2]" },
    { path: [], remaining: [], done: true, message: "6 permutations total" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>path: [{current.path.join(',')}]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.path.map((n, i) => (
          <div key={i} style={cellStyle(true, i === current.path.length - 1)}>{n}</div>
        ))}
        {current.remaining.map((n, i) => (
          <div key={`r${i}`} style={{ ...cellStyle(false, false), opacity: 0.5 }}>{n}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function WordSearchWalkthrough() {
  const board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']]
  const steps = [
    { path: [[0,0]], word: 'A', message: "Start at A. Match! Continue" },
    { path: [[0,0],[1,0]], word: 'AB', message: "Down to S? No. Try others" },
    { path: [[0,0],[0,1]], word: 'AB', message: "Right to B. Match!" },
    { path: [[0,0],[0,1],[0,2]], word: 'ABC', message: "Right to C. Match!" },
    { path: [[0,0],[0,1],[0,2],[1,2]], word: 'ABCC', message: "Down to C. Match!" },
    { path: [[0,0],[0,1],[0,2],[1,2],[2,2]], word: 'ABCCE', message: "Down to E. Match!" },
    { path: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,3]], word: 'ABCCED', done: true, message: "Right to D? No, need D... Found path!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1000)
  const current = steps[step]
  const isInPath = (r, c) => current.path.some(([pr, pc]) => pr === r && pc === c)

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>word: "ABCCED"</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', marginBottom: '20px' }}>
        {board.map((row, r) => (
          <div key={r} style={{ display: 'flex', gap: '4px' }}>
            {row.map((cell, c) => {
              const last = current.path[current.path.length - 1]
              const isLast = last && last[0] === r && last[1] === c
              return <div key={c} style={cellStyle(isInPath(r, c), isLast)}>{cell}</div>
            })}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return True</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function RotateImageWalkthrough() {
  const steps = [
    { matrix: [[1,2,3],[4,5,6],[7,8,9]], phase: 'start', message: "Rotate 90° clockwise in-place" },
    { matrix: [[1,4,7],[2,5,8],[3,6,9]], phase: 'transpose', message: "Step 1: Transpose (swap across diagonal)" },
    { matrix: [[7,4,1],[8,5,2],[9,6,3]], phase: 'reverse', done: true, message: "Step 2: Reverse each row. Done!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', marginBottom: '20px' }}>
        {current.matrix.map((row, r) => (
          <div key={r} style={{ display: 'flex', gap: '4px' }}>
            {row.map((cell, c) => (
              <div key={c} style={{ ...cellStyle(false, false), width: '40px', height: '40px' }}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function SpiralMatrixWalkthrough() {
  const steps = [
    { result: [], direction: 'right', message: "Start at top-left, go right" },
    { result: [1,2,3], direction: 'down', message: "→ Right: [1,2,3]. Now go down" },
    { result: [1,2,3,6,9], direction: 'left', message: "↓ Down: [6,9]. Now go left" },
    { result: [1,2,3,6,9,8,7], direction: 'up', message: "← Left: [8,7]. Now go up" },
    { result: [1,2,3,6,9,8,7,4], direction: 'right', message: "↑ Up: [4]. Now go right" },
    { result: [1,2,3,6,9,8,7,4,5], direction: 'done', done: true, message: "→ Right: [5]. Spiral complete!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1000)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>3×3 matrix</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
        {current.result.map((num, i) => (
          <div key={i} style={cellStyle(i === current.result.length - 1, false)}>{num}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function DailyTemperaturesWalkthrough() {
  const temps = [73, 74, 75, 71, 69, 72, 76, 73]
  const steps = [
    { stack: [], answer: [0,0,0,0,0,0,0,0], idx: 0, message: "Stack stores indices waiting for warmer day" },
    { stack: [0], answer: [0,0,0,0,0,0,0,0], idx: 1, message: "Push 0 (73°). Check 74° > 73°?" },
    { stack: [1], answer: [1,0,0,0,0,0,0,0], idx: 2, message: "Yes! Pop 0, wait=1. Push 1. Check 75°?" },
    { stack: [2], answer: [1,1,0,0,0,0,0,0], idx: 3, message: "Yes! Pop 1, wait=1. Push 2. 71° < 75°" },
    { stack: [2,3,4], answer: [1,1,0,0,0,0,0,0], idx: 5, message: "Push 3,4. 72° > 69° and 71°!" },
    { stack: [2,5], answer: [1,1,0,2,1,0,0,0], idx: 6, message: "Pop 4,3. 76° > everything!" },
    { stack: [6], answer: [1,1,4,2,1,1,0,0], idx: 7, done: true, message: "Pop all. 73° stays. Done!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '16px' }}>
        {temps.map((t, i) => (
          <div key={i} style={cellStyle(current.idx === i, current.answer[i] > 0)}>
            {t}°
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginBottom: '16px', color: colors.text.secondary }}>
        Stack: [{current.stack.join(', ')}] | Answer: [{current.answer.join(',')}]
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function GenerateParenthesesWalkthrough() {
  const steps = [
    { current: '', open: 0, close: 0, result: [], message: "n=2: Generate all valid combos" },
    { current: '(', open: 1, close: 0, result: [], message: "Add '(' → open=1, close=0" },
    { current: '((', open: 2, close: 0, result: [], message: "Add '(' → open=2 (max reached)" },
    { current: '(()', open: 2, close: 1, result: [], message: "Can only add ')' now" },
    { current: '(())', open: 2, close: 2, result: ['(())'], message: "Complete! Backtrack..." },
    { current: '()', open: 1, close: 1, result: ['(())'], message: "Try other branch: '()'" },
    { current: '()(', open: 2, close: 1, result: ['(())'], message: "Add '(' → open=2" },
    { current: '()()', open: 2, close: 2, result: ['(())', '()()'], done: true, message: "Complete! All combos found" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1000)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>n = 2</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '28px', fontFamily: 'monospace', color: colors.accent.light }}>{current.current || '""'}</span>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '16px', color: colors.text.secondary }}>
        open={current.open}, close={current.close}
      </div>
      {current.result.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
          {current.result.map((r, i) => (
            <div key={i} style={{ padding: '4px 12px', backgroundColor: colors.accent.dark, borderRadius: '6px', color: colors.text.primary }}>{r}</div>
          ))}
        </div>
      )}
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function FindMinRotatedWalkthrough() {
  const nums = [4, 5, 6, 7, 0, 1, 2]
  const steps = [
    { left: 0, right: 6, mid: 3, message: "Find min in rotated array [4,5,6,7,0,1,2]" },
    { left: 0, right: 6, mid: 3, message: "mid=3 (7). Is 7 > 2 (right)? Yes!" },
    { left: 4, right: 6, mid: 5, message: "Min in right half. left=4, mid=5 (1)" },
    { left: 4, right: 5, mid: 4, message: "Is 1 > 2? No. right=mid. mid=4 (0)" },
    { left: 4, right: 4, mid: 4, done: true, message: "left==right. Found min at index 4!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '20px' }}>
        {nums.map((n, i) => (
          <div key={i} style={cellStyle(i === current.mid, i === current.left || i === current.right)}>
            {n}
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginBottom: '16px', color: colors.text.secondary }}>
        left={current.left}, right={current.right}, mid={current.mid}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 0</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function HouseRobberIIWalkthrough() {
  const steps = [
    { nums: [2,3,2], case1: null, case2: null, message: "Circle: first and last are neighbors" },
    { nums: [2,3,2], case1: [2,3], case2: null, message: "Case 1: Rob houses 0-1 (skip last)" },
    { nums: [2,3,2], case1: 3, case2: [3,2], message: "Case 1 max=3. Case 2: houses 1-2 (skip first)" },
    { nums: [2,3,2], case1: 3, case2: 3, done: true, message: "Case 2 max=3. Answer = max(3, 3) = 3" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>nums = [2,3,2]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.case1 !== null && (
          <div style={{ padding: '8px 16px', backgroundColor: colors.bg.tertiary, borderRadius: '8px' }}>
            <div style={{ fontSize: '10px', color: colors.text.muted }}>Case 1 (skip last)</div>
            <div style={{ color: colors.text.primary }}>{Array.isArray(current.case1) ? `[${current.case1.join(',')}]` : `max = ${current.case1}`}</div>
          </div>
        )}
        {current.case2 !== null && (
          <div style={{ padding: '8px 16px', backgroundColor: colors.bg.tertiary, borderRadius: '8px' }}>
            <div style={{ fontSize: '10px', color: colors.text.muted }}>Case 2 (skip first)</div>
            <div style={{ color: colors.text.primary }}>{Array.isArray(current.case2) ? `[${current.case2.join(',')}]` : `max = ${current.case2}`}</div>
          </div>
        )}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 3</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function LongestPalindromicSubstringWalkthrough() {
  const steps = [
    { s: "babad", center: 0, result: "b", message: "Try each char as center, expand outward" },
    { s: "babad", center: 1, result: "bab", message: "Center 'a': expand → 'bab' (length 3)" },
    { s: "babad", center: 2, result: "bab", message: "Center 'b': 'b' only. Keep 'bab'" },
    { s: "babad", center: 3, result: "aba", message: "Center 'a': expand → 'aba' (also length 3)" },
    { s: "babad", center: 4, result: "bab", done: true, message: "Done! 'bab' or 'aba' both valid" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.s.split('').map((c, i) => (
          <div key={i} style={cellStyle(i === current.center, false)}>{c}</div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginBottom: '16px', color: colors.accent.light, fontSize: '20px' }}>
        Best: "{current.result}"
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function MaxProductSubarrayWalkthrough() {
  const nums = [2, 3, -2, 4]
  const steps = [
    { idx: 0, curMax: 2, curMin: 2, result: 2, message: "Start: max=2, min=2, result=2" },
    { idx: 1, curMax: 6, curMin: 3, result: 6, message: "×3: max=6, min=3, result=6" },
    { idx: 2, curMax: -2, curMin: -12, result: 6, message: "×(-2): max=-2, min=-12. Keep result=6" },
    { idx: 3, curMax: 4, curMin: -48, result: 6, done: true, message: "×4: max=4, min=-48. Result stays 6!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '20px' }}>
        {nums.map((n, i) => (
          <div key={i} style={cellStyle(i === current.idx, i <= current.idx && current.idx <= 1)}>{n}</div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginBottom: '16px', color: colors.text.secondary }}>
        curMax={current.curMax}, curMin={current.curMin}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 6</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function UniquePathsWalkthrough() {
  const steps = [
    { grid: [[1,1,1],[1,0,0],[1,0,0]], message: "3×3 grid. First row/col = 1 (only one way)" },
    { grid: [[1,1,1],[1,2,0],[1,0,0]], message: "dp[1][1] = dp[0][1] + dp[1][0] = 1+1 = 2" },
    { grid: [[1,1,1],[1,2,3],[1,0,0]], message: "dp[1][2] = 1 + 2 = 3" },
    { grid: [[1,1,1],[1,2,3],[1,3,6]], done: true, message: "dp[2][2] = 3 + 3 = 6 unique paths!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>m=3, n=3</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', marginBottom: '20px' }}>
        {current.grid.map((row, r) => (
          <div key={r} style={{ display: 'flex', gap: '4px' }}>
            {row.map((cell, c) => (
              <div key={c} style={cellStyle(r === 2 && c === 2 && current.done, cell > 1)}>{cell || ''}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function JumpGameWalkthrough() {
  const nums = [2, 3, 1, 1, 4]
  const steps = [
    { idx: 0, reachable: 0, message: "Start at 0. Can we reach the end?" },
    { idx: 0, reachable: 2, message: "Jump 2 → reachable = max(0, 0+2) = 2" },
    { idx: 1, reachable: 4, message: "At 1: reachable = max(2, 1+3) = 4 ✓" },
    { idx: 2, reachable: 4, message: "At 2: reachable = max(4, 2+1) = 4" },
    { idx: 4, reachable: 4, done: true, message: "Reached end! reachable ≥ last index" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1000)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '20px' }}>
        {nums.map((n, i) => (
          <div key={i} style={cellStyle(i === current.idx, i <= current.reachable)}>{n}</div>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginBottom: '16px', color: colors.text.secondary }}>
        reachable = {current.reachable}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return True</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function SetMatrixZeroesWalkthrough() {
  const steps = [
    { matrix: [[1,1,1],[1,0,1],[1,1,1]], phase: 'start', message: "Find zeros and mark rows/cols" },
    { matrix: [[1,1,1],[1,0,1],[1,1,1]], phase: 'mark', message: "Found 0 at [1][1]. Mark row 1, col 1" },
    { matrix: [[1,0,1],[0,0,0],[1,0,1]], phase: 'done', done: true, message: "Zero out marked row and column" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', marginBottom: '20px' }}>
        {current.matrix.map((row, r) => (
          <div key={r} style={{ display: 'flex', gap: '4px' }}>
            {row.map((cell, c) => (
              <div key={c} style={cellStyle(cell === 0, false)}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function KokoEatingBananasWalkthrough() {
  const steps = [
    { left: 1, right: 11, mid: 6, hours: 6, message: "piles=[3,6,7,11], h=8. Binary search k" },
    { left: 1, right: 6, mid: 3, hours: 10, message: "k=6: 1+1+2+2=6 hrs ≤ 8 ✓. Try smaller" },
    { left: 4, right: 6, mid: 5, hours: 7, message: "k=3: 1+2+3+4=10 hrs > 8 ✗. Go bigger" },
    { left: 4, right: 5, mid: 4, hours: 8, message: "k=5: 1+2+2+3=8 hrs ≤ 8 ✓. Try smaller" },
    { left: 4, right: 4, mid: 4, hours: 8, done: true, message: "k=4: 1+2+2+3=8 hrs ≤ 8 ✓. Found min!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <span style={{ fontSize: '24px', color: colors.accent.light }}>k = {current.mid}</span>
        <span style={{ color: colors.text.secondary, marginLeft: '16px' }}>→ {current.hours} hours</span>
      </div>
      <div style={{ textAlign: 'center', marginBottom: '16px', color: colors.text.secondary }}>
        Search range: [{current.left}, {current.right}]
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 4</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function SearchRotatedArrayWalkthrough() {
  const nums = [4, 5, 6, 7, 0, 1, 2]
  const steps = [
    { left: 0, right: 6, mid: 3, message: "Find target=0 in [4,5,6,7,0,1,2]" },
    { left: 0, right: 6, mid: 3, message: "mid=7. Left half [4,5,6,7] is sorted" },
    { left: 4, right: 6, mid: 5, message: "0 not in [4,7]. Search right half" },
    { left: 4, right: 5, mid: 4, message: "mid=0. Found target!" },
    { left: 4, right: 4, mid: 4, done: true, message: "Return index 4" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>target = 0</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '20px' }}>
        {nums.map((n, i) => (
          <div key={i} style={cellStyle(i === current.mid, i >= current.left && i <= current.right)}>{n}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 4</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function EvalReversePolishWalkthrough() {
  const steps = [
    { stack: [], token: '2', message: "Push numbers onto stack" },
    { stack: [2], token: '1', message: "Push 2" },
    { stack: [2, 1], token: '+', message: "Push 1. Operator '+' coming..." },
    { stack: [3], token: '3', message: "Pop 1,2 → 2+1=3. Push 3" },
    { stack: [3, 3], token: '*', message: "Push 3. Operator '*' coming..." },
    { stack: [9], token: '', done: true, message: "Pop 3,3 → 3×3=9. Done!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1000)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>["2","1","+","3","*"]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        <span style={{ color: colors.text.muted }}>Stack:</span>
        {current.stack.map((n, i) => (
          <div key={i} style={cellStyle(false, true)}>{n}</div>
        ))}
        {current.stack.length === 0 && <span style={{ color: colors.text.muted }}>empty</span>}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 9</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function RottingOrangesWalkthrough() {
  const steps = [
    { grid: [[2,1,1],[1,1,0],[0,1,1]], minute: 0, message: "🍊=fresh, 🟤=rotten. BFS from rotten" },
    { grid: [[2,2,1],[2,1,0],[0,1,1]], minute: 1, message: "Minute 1: Rot spreads to neighbors" },
    { grid: [[2,2,2],[2,2,0],[0,1,1]], minute: 2, message: "Minute 2: More oranges rot" },
    { grid: [[2,2,2],[2,2,0],[0,2,1]], minute: 3, message: "Minute 3: Almost done" },
    { grid: [[2,2,2],[2,2,0],[0,2,2]], minute: 4, done: true, message: "Minute 4: All rotten!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Minute: {current.minute}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', marginBottom: '20px' }}>
        {current.grid.map((row, r) => (
          <div key={r} style={{ display: 'flex', gap: '4px' }}>
            {row.map((cell, c) => (
              <div key={c} style={{ ...cellStyle(false, cell === 2), backgroundColor: cell === 0 ? colors.bg.tertiary : cell === 1 ? '#ffa500' : '#8B4513' }}>
                {cell === 1 ? '🍊' : cell === 2 ? '🟤' : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 4</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

// ==========================================
// MORE BFS/DFS WALKTHROUGHS - BATCH 2
// ==========================================

export function MaxAreaIslandWalkthrough() {
  const steps = [
    { grid: [[0,0,1,0],[0,1,1,0],[0,1,0,0]], visited: [], area: 0, maxArea: 0, message: "Find island with largest area" },
    { grid: [[0,0,1,0],[0,1,1,0],[0,1,0,0]], visited: [[0,2]], area: 1, maxArea: 1, message: "DFS from (0,2): count=1" },
    { grid: [[0,0,1,0],[0,1,1,0],[0,1,0,0]], visited: [[0,2],[1,1],[1,2],[2,1]], area: 4, maxArea: 4, done: true, message: "Connected cells: 4. Max area = 4" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  const isVisited = (r, c) => current.visited.some(([vr, vc]) => vr === r && vc === c)

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Max Area: {current.maxArea}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', marginBottom: '20px' }}>
        {current.grid.map((row, r) => (
          <div key={r} style={{ display: 'flex', gap: '4px' }}>
            {row.map((cell, c) => (
              <div key={c} style={{ ...cellStyle(isVisited(r,c), false), backgroundColor: cell === 1 ? (isVisited(r,c) ? colors.accent.main : '#4a7c59') : colors.bg.tertiary }}>
                {cell === 1 ? '🏝️' : '🌊'}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 4</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function PacificAtlanticWalkthrough() {
  const steps = [
    { phase: 'init', pacific: [], atlantic: [], result: [], message: "Find cells that can reach BOTH oceans" },
    { phase: 'pacific', pacific: [[0,0],[0,1],[1,0]], atlantic: [], result: [], message: "🔵 DFS from Pacific edges (top+left)" },
    { phase: 'atlantic', pacific: [[0,0],[0,1],[1,0],[1,1]], atlantic: [[1,1],[0,1],[1,0]], result: [], message: "🟠 DFS from Atlantic edges (bottom+right)" },
    { phase: 'done', pacific: [[0,0],[0,1],[1,0],[1,1]], atlantic: [[1,1],[0,1],[1,0]], result: [[0,1],[1,0],[1,1]], done: true, message: "Intersection = cells reaching both!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]
  const grid = [[1,2],[4,3]]

  const inPacific = (r, c) => current.pacific.some(([pr, pc]) => pr === r && pc === c)
  const inAtlantic = (r, c) => current.atlantic.some(([ar, ac]) => ar === r && ac === c)
  const inResult = (r, c) => current.result.some(([rr, rc]) => rr === r && rc === c)

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>🔵Pacific 🟠Atlantic</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', marginBottom: '20px' }}>
        {grid.map((row, r) => (
          <div key={r} style={{ display: 'flex', gap: '4px' }}>
            {row.map((cell, c) => {
              const both = inPacific(r,c) && inAtlantic(r,c)
              const pac = inPacific(r,c)
              const atl = inAtlantic(r,c)
              return (
                <div key={c} style={{ ...cellStyle(both, false), width: '50px', height: '50px', backgroundColor: both ? '#9b59b6' : pac ? '#3498db' : atl ? '#e67e22' : colors.bg.tertiary }}>
                  {cell}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [[0,1],[1,0],[1,1]]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function SurroundedRegionsWalkthrough() {
  const steps = [
    { board: [['X','X','X'],['X','O','X'],['X','X','X']], phase: 'init', message: "Capture O's not connected to border" },
    { board: [['X','X','X'],['X','O','X'],['X','X','X']], phase: 'border', message: "DFS from border O's → mark as safe (T)" },
    { board: [['X','X','X'],['X','X','X'],['X','X','X']], phase: 'done', done: true, message: "Inner O→X (captured!), T→O (safe)" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Phase: {current.phase}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', marginBottom: '20px' }}>
        {current.board.map((row, r) => (
          <div key={r} style={{ display: 'flex', gap: '4px' }}>
            {row.map((cell, c) => (
              <div key={c} style={{ ...cellStyle(false, cell === 'X'), backgroundColor: cell === 'X' ? colors.bg.tertiary : cell === 'O' ? '#e74c3c' : '#2ecc71' }}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function CourseScheduleIIWalkthrough() {
  const steps = [
    { courses: [0,1,2,3], state: [0,0,0,0], result: [], current: null, message: "Find valid course order (topological sort)" },
    { courses: [0,1,2,3], state: [2,0,0,0], result: [0], current: 0, message: "Course 0: no prereqs → add to result" },
    { courses: [0,1,2,3], state: [2,2,0,0], result: [0,1], current: 1, message: "Course 1: prereq 0 done → add" },
    { courses: [0,1,2,3], state: [2,2,2,0], result: [0,1,2], current: 2, message: "Course 2: prereq 0 done → add" },
    { courses: [0,1,2,3], state: [2,2,2,2], result: [0,1,2,3], current: 3, done: true, message: "Course 3: prereqs 1,2 done → add" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]
  const stateColors = ['#95a5a6', '#f39c12', '#27ae60']
  const stateLabels = ['⬜', '🔄', '✅']

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Result: [{current.result.join(',')}]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.courses.map((c, i) => (
          <div key={i} style={{ ...cellStyle(current.current === c, false), width: '50px', height: '50px', backgroundColor: stateColors[current.state[i]] }}>
            {c} {stateLabels[current.state[i]]}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [0,1,2,3]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function BinaryTreeRightSideWalkthrough() {
  const steps = [
    { levels: [[1], [2,3], [4,5,6,7]], current: 0, result: [], message: "BFS level by level, take rightmost" },
    { levels: [[1], [2,3], [4,5,6,7]], current: 0, result: [1], message: "Level 0: rightmost = 1" },
    { levels: [[1], [2,3], [4,5,6,7]], current: 1, result: [1,3], message: "Level 1: rightmost = 3" },
    { levels: [[1], [2,3], [4,5,6,7]], current: 2, result: [1,3,7], done: true, message: "Level 2: rightmost = 7" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Right side: [{current.result.join(',')}]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', marginBottom: '20px' }}>
        {current.levels.map((level, i) => (
          <div key={i} style={{ display: 'flex', gap: '8px' }}>
            {level.map((val, j) => {
              const isRightmost = j === level.length - 1
              const isCurrentLevel = i === current.current
              return (
                <div key={j} style={{ ...cellStyle(isCurrentLevel && isRightmost, false), backgroundColor: isRightmost ? colors.accent.main : colors.bg.tertiary }}>
                  {val}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [1,3,7]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function CountGoodNodesWalkthrough() {
  const steps = [
    { path: [], maxVal: -Infinity, count: 0, message: "Count nodes ≥ max on path from root" },
    { path: [3], maxVal: 3, count: 1, message: "Node 3: 3 ≥ -∞ → good! max=3" },
    { path: [3,1], maxVal: 3, count: 1, message: "Node 1: 1 < 3 → not good" },
    { path: [3,4], maxVal: 4, count: 2, message: "Node 4: 4 ≥ 3 → good! max=4" },
    { path: [3,4,5], maxVal: 5, count: 3, done: true, message: "Node 5: 5 ≥ 4 → good! Total: 3" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Good nodes: {current.count}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.path.map((val, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ ...cellStyle(i === current.path.length - 1, false), backgroundColor: val >= (i === 0 ? -Infinity : current.path[i-1]) ? '#27ae60' : '#e74c3c' }}>
              {val}
            </div>
            {i < current.path.length - 1 && <span style={{ color: colors.text.secondary }}>→</span>}
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', color: colors.text.secondary, marginBottom: '20px' }}>
        Max so far: {current.maxVal === -Infinity ? '-∞' : current.maxVal}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 3</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function WallsAndGatesWalkthrough() {
  const INF = '∞'
  const steps = [
    { grid: [[INF,'-1','0',INF],[INF,INF,INF,'-1'],[INF,'-1',INF,'-1'],['0','-1',INF,INF]], message: "Multi-source BFS from all gates (0)" },
    { grid: [[INF,'-1','0','1'],[INF,INF,'1','-1'],[INF,'-1',INF,'-1'],['0','-1',INF,INF]], message: "BFS level 1: distance=1 from gates" },
    { grid: [['3','-1','0','1'],['2','2','1','-1'],['1','-1','2','-1'],['0','-1','3','4']], done: true, message: "Continue BFS until all rooms filled" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>🚪=gate, -1=wall, ∞=room</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', marginBottom: '20px' }}>
        {current.grid.map((row, r) => (
          <div key={r} style={{ display: 'flex', gap: '4px' }}>
            {row.map((cell, c) => (
              <div key={c} style={{ ...cellStyle(false, cell === '0'), backgroundColor: cell === '-1' ? '#2c3e50' : cell === '0' ? '#27ae60' : cell === INF ? colors.bg.tertiary : colors.accent.main, fontSize: '14px' }}>
                {cell === '0' ? '🚪' : cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}



export function NetworkDelayTimeWalkthrough() {
  const steps = [
    { distances: { 2: 0, 1: '∞', 3: '∞', 4: '∞' }, current: 2, message: "Dijkstra from node 2" },
    { distances: { 2: 0, 1: 1, 3: 1, 4: '∞' }, current: 1, message: "Process 2: update 1→1, 3→1" },
    { distances: { 2: 0, 1: 1, 3: 1, 4: 2 }, current: 3, message: "Process 3: update 4→2" },
    { distances: { 2: 0, 1: 1, 3: 1, 4: 2 }, current: 4, done: true, message: "All reached! Max distance = 2" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Current: node {current.current}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {Object.entries(current.distances).map(([node, dist]) => (
          <div key={node} style={{ ...cellStyle(parseInt(node) === current.current, false), width: '60px', height: '60px', backgroundColor: dist === '∞' ? colors.bg.tertiary : colors.accent.main }}>
            <div>{node}</div>
            <div style={{ fontSize: '12px' }}>d={dist}</div>
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 2</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function CheapestFlightsWalkthrough() {
  const steps = [
    { prices: [0, '∞', '∞'], k: 1, round: 0, message: "Bellman-Ford: k+1 rounds for k stops" },
    { prices: [0, 100, 500], k: 1, round: 1, message: "Round 1: 0→1=$100, 0→2=$500" },
    { prices: [0, 100, 200], k: 1, round: 2, done: true, message: "Round 2: 1→2=$200 (100+100)" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Round: {current.round}/{current.k + 1}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.prices.map((price, i) => (
          <div key={i} style={{ ...cellStyle(false, false), width: '70px', height: '60px', backgroundColor: price === '∞' ? colors.bg.tertiary : colors.accent.main }}>
            <div>City {i}</div>
            <div style={{ fontSize: '12px' }}>${price}</div>
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 200</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}


export function ConstructTreePreorderInorderWalkthrough() {
  const steps = [
    { preorder: [3,9,20,15,7], inorder: [9,3,15,20,7], root: null, message: "Preorder: root first. Inorder: splits L/R" },
    { preorder: [3,9,20,15,7], inorder: [9,3,15,20,7], root: 3, left: [9], right: [15,20,7], message: "Root=3. Inorder splits: L=[9], R=[15,20,7]" },
    { preorder: [3,9,20,15,7], inorder: [9,3,15,20,7], root: 3, built: '3(9,20)', message: "Build left=9, right subtree root=20" },
    { preorder: [3,9,20,15,7], inorder: [9,3,15,20,7], root: 3, built: '3(9,20(15,7))', done: true, message: "20's children: 15, 7. Tree complete!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Building tree...</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ color: colors.text.secondary, marginBottom: '8px' }}>Preorder: [{current.preorder.join(',')}]</div>
        <div style={{ color: colors.text.secondary }}>Inorder: [{current.inorder.join(',')}]</div>
      </div>
      {current.root && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ ...cellStyle(true, false), display: 'inline-block', backgroundColor: colors.accent.main }}>
            {current.built || current.root}
          </div>
        </div>
      )}
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>Tree built!</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}



export function MinCostConnectPointsWalkthrough() {
  const steps = [
    { points: [[0,0],[2,2],[3,10],[5,2],[7,0]], connected: [0], cost: 0, message: "Prim's MST: connect all points cheaply" },
    { points: [[0,0],[2,2],[3,10],[5,2],[7,0]], connected: [0,1], cost: 4, message: "Connect 0→1: cost=|2-0|+|2-0|=4" },
    { points: [[0,0],[2,2],[3,10],[5,2],[7,0]], connected: [0,1,3], cost: 4+3, message: "Connect 1→3: cost=|5-2|+|2-2|=3" },
    { points: [[0,0],[2,2],[3,10],[5,2],[7,0]], connected: [0,1,3,4], cost: 4+3+4, message: "Connect 3→4: cost=4" },
    { points: [[0,0],[2,2],[3,10],[5,2],[7,0]], connected: [0,1,3,4,2], cost: 20, done: true, message: "Connect to 2: cost=9. Total=20" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Total cost: {current.cost}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
        {current.points.map((p, i) => (
          <div key={i} style={{ ...cellStyle(current.connected.includes(i), false), width: '60px', height: '40px', backgroundColor: current.connected.includes(i) ? colors.accent.main : colors.bg.tertiary }}>
            ({p[0]},{p[1]})
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 20</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function RedundantConnectionWalkthrough() {
  const steps = [
    { edges: [[1,2],[1,3],[2,3]], processed: 0, parent: [0,1,2,3], message: "Union Find: detect cycle-causing edge" },
    { edges: [[1,2],[1,3],[2,3]], processed: 1, parent: [0,1,1,3], message: "Union(1,2): merge sets" },
    { edges: [[1,2],[1,3],[2,3]], processed: 2, parent: [0,1,1,1], message: "Union(1,3): merge sets" },
    { edges: [[1,2],[1,3],[2,3]], processed: 3, parent: [0,1,1,1], cycle: [2,3], done: true, message: "Union(2,3): same root! CYCLE found" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Edge {current.processed}/{current.edges.length}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.edges.map((e, i) => (
          <div key={i} style={{ ...cellStyle(i === current.processed - 1, false), width: 'auto', padding: '8px 12px', backgroundColor: current.cycle && e[0] === current.cycle[0] && e[1] === current.cycle[1] ? '#e74c3c' : i < current.processed ? colors.accent.main : colors.bg.tertiary }}>
            [{e[0]},{e[1]}]
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [2,3]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function GraphValidTreeWalkthrough() {
  const steps = [
    { n: 5, edges: [[0,1],[0,2],[0,3],[1,4]], check: 'count', message: "Tree: n-1 edges, no cycles, all connected" },
    { n: 5, edges: [[0,1],[0,2],[0,3],[1,4]], check: 'edges', edgeCount: 4, message: "Check: 4 edges = 5-1 ✓" },
    { n: 5, edges: [[0,1],[0,2],[0,3],[1,4]], check: 'union', unions: 4, message: "Union Find: all unions succeed (no cycles)" },
    { n: 5, edges: [[0,1],[0,2],[0,3],[1,4]], check: 'done', done: true, message: "4 edges, 0 cycles → Valid Tree!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>n={current.n}, edges={current.edges.length}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {[0,1,2,3,4].map(node => (
          <div key={node} style={{ ...cellStyle(false, false), backgroundColor: colors.accent.main }}>
            {node}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return true</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function NumConnectedComponentsWalkthrough() {
  const steps = [
    { n: 5, components: 5, unions: [], message: "Start: 5 nodes = 5 components" },
    { n: 5, components: 4, unions: [[0,1]], message: "Union(0,1): 5→4 components" },
    { n: 5, components: 3, unions: [[0,1],[1,2]], message: "Union(1,2): 4→3 components" },
    { n: 5, components: 2, unions: [[0,1],[1,2],[3,4]], done: true, message: "Union(3,4): 3→2 components" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  const getComponent = (node) => {
    if (current.unions.length === 0) return node
    if (node <= 2 && current.unions.length >= 2) return 'A'
    if (node >= 3 && current.unions.length >= 3) return 'B'
    if (node <= 1 && current.unions.length >= 1) return 'A'
    return node
  }

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Components: {current.components}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {[0,1,2,3,4].map(node => (
          <div key={node} style={{ ...cellStyle(false, false), backgroundColor: getComponent(node) === 'A' ? colors.accent.main : getComponent(node) === 'B' ? '#9b59b6' : colors.bg.tertiary }}>
            {node}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 2</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}


// ==========================================
// MORE MEDIUM WALKTHROUGHS - BATCH 3
// ==========================================

export function DecodeWaysWalkthrough() {
  const steps = [
    { s: "226", dp: [1,1,0,0], i: 2, message: "DP: dp[i] = ways to decode s[0:i]" },
    { s: "226", dp: [1,1,2,0], i: 2, message: "s[1]='2'≠0 → dp[2]+=dp[1]. '22' valid → dp[2]+=dp[0]" },
    { s: "226", dp: [1,1,2,3], i: 3, done: true, message: "s[2]='6'≠0 → dp[3]+=dp[2]. '26' valid → dp[3]+=dp[1]" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>s = "{current.s}"</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.dp.map((val, i) => (
          <div key={i} style={{ ...cellStyle(i === current.i, false), backgroundColor: i <= current.i ? colors.accent.main : colors.bg.tertiary }}>
            dp[{i}]={val}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 3</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function PalindromicSubstringsWalkthrough() {
  const steps = [
    { s: "aaa", center: 0, count: 0, expanding: [], message: "Expand around each center" },
    { s: "aaa", center: 0, count: 1, expanding: ['a'], message: "Center 0: 'a' ✓" },
    { s: "aaa", center: 0.5, count: 2, expanding: ['aa'], message: "Center 0.5: 'aa' ✓" },
    { s: "aaa", center: 1, count: 4, expanding: ['a','aaa'], message: "Center 1: 'a' ✓, 'aaa' ✓" },
    { s: "aaa", center: 2, count: 6, expanding: ['a','aa'], done: true, message: "All centers done. Total: 6" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Count: {current.count}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.s.split('').map((c, i) => (
          <div key={i} style={{ ...cellStyle(Math.floor(current.center) === i, false), backgroundColor: colors.accent.main }}>
            {c}
          </div>
        ))}
      </div>
      {current.expanding.length > 0 && (
        <div style={{ textAlign: 'center', color: colors.text.secondary, marginBottom: '20px' }}>
          Found: {current.expanding.map(p => `"${p}"`).join(', ')}
        </div>
      )}
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 6</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function LetterCombinationsWalkthrough() {
  const steps = [
    { digits: "23", path: "", result: [], message: "2→abc, 3→def. Backtrack all combos" },
    { digits: "23", path: "a", result: [], message: "Pick 'a' from digit 2" },
    { digits: "23", path: "ad", result: ["ad"], message: "Pick 'd' from digit 3 → 'ad' ✓" },
    { digits: "23", path: "ae", result: ["ad","ae"], message: "Backtrack, try 'e' → 'ae' ✓" },
    { digits: "23", path: "b", result: ["ad","ae","af","bd","be","bf"], message: "Continue with 'b'..." },
    { digits: "23", path: "", result: ["ad","ae","af","bd","be","bf","cd","ce","cf"], done: true, message: "All 9 combinations found!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>digits = "{current.digits}"</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Current: </span>
        <span style={{ color: colors.accent.light, fontSize: '20px' }}>"{current.path}"</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
        {current.result.slice(-6).map((combo, i) => (
          <div key={i} style={{ ...cellStyle(false, false), width: 'auto', padding: '4px 12px', backgroundColor: colors.accent.main }}>
            {combo}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 9 combinations</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function SubsetsIIWalkthrough() {
  const steps = [
    { nums: [1,2,2], current: [], result: [[]], message: "Sort first: [1,2,2]. Skip duplicates!" },
    { nums: [1,2,2], current: [1], result: [[],[1]], message: "Add 1 → [1]" },
    { nums: [1,2,2], current: [1,2], result: [[],[1],[1,2]], message: "Add first 2 → [1,2]" },
    { nums: [1,2,2], current: [1,2,2], result: [[],[1],[1,2],[1,2,2]], message: "Add second 2 → [1,2,2]" },
    { nums: [1,2,2], current: [2], result: [[],[1],[1,2],[1,2,2],[2],[2,2]], done: true, message: "Skip duplicate at same level!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Subsets: {current.result.length}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Current: </span>
        <span style={{ color: colors.accent.light }}>[{current.current.join(',')}]</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
        {current.result.map((subset, i) => (
          <div key={i} style={{ ...cellStyle(false, false), width: 'auto', padding: '4px 12px', backgroundColor: colors.accent.main }}>
            [{subset.join(',')}]
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 6 subsets</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function CombinationSumIIWalkthrough() {
  const steps = [
    { target: 8, current: [], remaining: 8, result: [], message: "Find combos summing to 8 (no reuse)" },
    { target: 8, current: [1,1,6], remaining: 0, result: [[1,1,6]], message: "1+1+6=8 ✓" },
    { target: 8, current: [1,2,5], remaining: 0, result: [[1,1,6],[1,2,5]], message: "1+2+5=8 ✓" },
    { target: 8, current: [1,7], remaining: 0, result: [[1,1,6],[1,2,5],[1,7]], message: "1+7=8 ✓" },
    { target: 8, current: [2,6], remaining: 0, result: [[1,1,6],[1,2,5],[1,7],[2,6]], done: true, message: "2+6=8 ✓. Skip duplicate 1s at same level!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Target: {current.target}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Current: </span>
        <span style={{ color: colors.accent.light }}>[{current.current.join(',')}] = {current.current.reduce((a,b)=>a+b,0)}</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
        {current.result.map((combo, i) => (
          <div key={i} style={{ ...cellStyle(false, false), width: 'auto', padding: '4px 12px', backgroundColor: '#27ae60' }}>
            [{combo.join(',')}]
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 4 combinations</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function TaskSchedulerWalkthrough() {
  const steps = [
    { tasks: "AAABBB", n: 2, schedule: [], time: 0, message: "n=2: same task needs 2 gaps between" },
    { tasks: "AAABBB", n: 2, schedule: ['A','B','_'], time: 3, message: "A→B→idle (cooling for A)" },
    { tasks: "AAABBB", n: 2, schedule: ['A','B','_','A','B','_'], time: 6, message: "A→B→idle→A→B→idle" },
    { tasks: "AAABBB", n: 2, schedule: ['A','B','_','A','B','_','A','B'], time: 8, done: true, message: "A→B to finish. Total: 8 intervals" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Time: {current.time}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
        {current.schedule.map((task, i) => (
          <div key={i} style={{ ...cellStyle(false, false), width: '35px', height: '35px', backgroundColor: task === '_' ? colors.bg.tertiary : task === 'A' ? colors.accent.main : '#9b59b6' }}>
            {task === '_' ? '💤' : task}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 8</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function LRUCacheWalkthrough() {
  const steps = [
    { cache: [], cap: 2, op: 'init', message: "LRU Cache: capacity=2. Most recent at end" },
    { cache: [[1,1]], cap: 2, op: 'put(1,1)', message: "put(1,1) → cache: [1]" },
    { cache: [[1,1],[2,2]], cap: 2, op: 'put(2,2)', message: "put(2,2) → cache: [1,2]" },
    { cache: [[2,2],[1,1]], cap: 2, op: 'get(1)→1', message: "get(1)=1 → move 1 to end: [2,1]" },
    { cache: [[1,1],[3,3]], cap: 2, op: 'put(3,3)', evicted: 2, message: "put(3,3) → evict LRU (2): [1,3]" },
    { cache: [[1,1],[3,3]], cap: 2, op: 'get(2)→-1', done: true, message: "get(2)=-1 (evicted!)" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>{current.op}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>LRU</span>
        {current.cache.map(([k,v], i) => (
          <div key={i} style={{ ...cellStyle(i === current.cache.length - 1, false), backgroundColor: colors.accent.main }}>
            {k}:{v}
          </div>
        ))}
        <span style={{ color: colors.text.secondary }}>MRU</span>
      </div>
      {current.evicted && (
        <div style={{ textAlign: 'center', color: '#e74c3c', marginBottom: '20px' }}>
          Evicted key {current.evicted}
        </div>
      )}
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function TimeBasedKeyValueWalkthrough() {
  const steps = [
    { store: {}, op: 'init', message: "Store: {key: [(ts, val), ...]}" },
    { store: { foo: [[1,'bar']] }, op: 'set("foo","bar",1)', message: "set foo=bar at t=1" },
    { store: { foo: [[1,'bar']] }, op: 'get("foo",1)→"bar"', query: 1, message: "get foo at t=1 → 'bar'" },
    { store: { foo: [[1,'bar']] }, op: 'get("foo",3)→"bar"', query: 3, message: "get foo at t=3 → 'bar' (largest ts ≤ 3)" },
    { store: { foo: [[1,'bar'],[4,'bar2']] }, op: 'set("foo","bar2",4)', message: "set foo=bar2 at t=4" },
    { store: { foo: [[1,'bar'],[4,'bar2']] }, op: 'get("foo",5)→"bar2"', query: 5, done: true, message: "get foo at t=5 → 'bar2' (binary search)" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>{current.op}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      {current.store.foo && (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
          {current.store.foo.map(([ts, val], i) => (
            <div key={i} style={{ ...cellStyle(current.query && ts <= current.query, false), backgroundColor: colors.accent.main }}>
              t={ts}: {val}
            </div>
          ))}
        </div>
      )}
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function CarFleetWalkthrough() {
  const steps = [
    { cars: [[10,2],[8,4],[5,1],[3,3],[0,1]], target: 12, fleets: [], message: "Sort by position (closest first)" },
    { cars: [[10,2],[8,4],[5,1],[3,3],[0,1]], target: 12, fleets: [1], times: [1], message: "Car at 10: time=(12-10)/2=1" },
    { cars: [[10,2],[8,4],[5,1],[3,3],[0,1]], target: 12, fleets: [1], times: [1,1], message: "Car at 8: time=1 ≤ 1 → catches up (same fleet)" },
    { cars: [[10,2],[8,4],[5,1],[3,3],[0,1]], target: 12, fleets: [1,7], times: [1,1,7], message: "Car at 5: time=7 > 1 → new fleet!" },
    { cars: [[10,2],[8,4],[5,1],[3,3],[0,1]], target: 12, fleets: [1,7,12], times: [1,1,7,3,12], done: true, message: "3 fleets total" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Target: {current.target}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.fleets.map((time, i) => (
          <div key={i} style={{ ...cellStyle(false, false), backgroundColor: ['#e74c3c','#3498db','#27ae60'][i % 3] }}>
            Fleet {i+1}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 3</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function LongestRepeatingCharReplacementWalkthrough() {
  const steps = [
    { s: "AABABBA", k: 1, left: 0, right: 0, maxFreq: 1, window: "A", message: "Sliding window: changes = len - maxFreq" },
    { s: "AABABBA", k: 1, left: 0, right: 3, maxFreq: 3, window: "AABA", message: "Window 'AABA': 4-3=1 change ≤ k ✓" },
    { s: "AABABBA", k: 1, left: 0, right: 4, maxFreq: 3, window: "AABAB", message: "Window 'AABAB': 5-3=2 > k, shrink!" },
    { s: "AABABBA", k: 1, left: 1, right: 4, maxFreq: 3, window: "ABAB", message: "Window 'ABAB': 4-2=2 > k, shrink!" },
    { s: "AABABBA", k: 1, left: 2, right: 5, maxFreq: 3, window: "ABBA", message: "Window 'ABBA': 4-2=2 > k, keep sliding..." },
    { s: "AABABBA", k: 1, left: 3, right: 6, maxFreq: 3, window: "ABBA", done: true, message: "Max valid window = 4 (AABA or ABBA)" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>k = {current.k}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.s.split('').map((c, i) => (
          <div key={i} style={{ ...cellStyle(i >= current.left && i <= current.right, false), backgroundColor: i >= current.left && i <= current.right ? colors.accent.main : colors.bg.tertiary }}>
            {c}
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', color: colors.text.secondary, marginBottom: '20px' }}>
        Window: "{current.window}" | MaxFreq: {current.maxFreq}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 4</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

// ==========================================
// MORE MEDIUM WALKTHROUGHS - BATCH 4
// ==========================================

export function PermutationInStringWalkthrough() {
  const steps = [
    { s1: "ab", s2: "eidbaooo", window: "", matches: 0, message: "Sliding window size = len(s1) = 2" },
    { s1: "ab", s2: "eidbaooo", window: "ei", matches: 24, message: "Window 'ei': no a,b match" },
    { s1: "ab", s2: "eidbaooo", window: "ba", matches: 26, found: true, done: true, message: "Window 'ba': matches=26! Permutation found" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>s1="{current.s1}"</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.s2.split('').map((c, i) => {
          const inWindow = current.window && i >= current.s2.indexOf(current.window) && i < current.s2.indexOf(current.window) + current.window.length
          return (
            <div key={i} style={{ ...cellStyle(inWindow, false), backgroundColor: inWindow ? (current.found ? '#27ae60' : colors.accent.main) : colors.bg.tertiary }}>
              {c}
            </div>
          )
        })}
      </div>
      <div style={{ textAlign: 'center', color: colors.text.secondary, marginBottom: '20px' }}>
        Window: "{current.window}" | Matches: {current.matches}/26
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return true</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function AddTwoNumbersWalkthrough() {
  const steps = [
    { l1: [2,4,3], l2: [5,6,4], result: [], carry: 0, message: "Add digit by digit with carry" },
    { l1: [2,4,3], l2: [5,6,4], result: [7], carry: 0, pos: 0, message: "2+5+0=7, carry=0" },
    { l1: [2,4,3], l2: [5,6,4], result: [7,0], carry: 1, pos: 1, message: "4+6+0=10 → digit=0, carry=1" },
    { l1: [2,4,3], l2: [5,6,4], result: [7,0,8], carry: 0, pos: 2, done: true, message: "3+4+1=8, carry=0. Done!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Carry: {current.carry}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
          {current.l1.map((d, i) => (
            <div key={i} style={{ ...cellStyle(i === current.pos, false), backgroundColor: colors.accent.main }}>{d}</div>
          ))}
          <span style={{ color: colors.text.secondary }}>(342)</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
          {current.l2.map((d, i) => (
            <div key={i} style={{ ...cellStyle(i === current.pos, false), backgroundColor: '#9b59b6' }}>{d}</div>
          ))}
          <span style={{ color: colors.text.secondary }}>(465)</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          {current.result.map((d, i) => (
            <div key={i} style={{ ...cellStyle(false, false), backgroundColor: '#27ae60' }}>{d}</div>
          ))}
          {current.result.length > 0 && <span style={{ color: colors.text.secondary }}>(807)</span>}
        </div>
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [7,0,8]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function CopyListRandomPointerWalkthrough() {
  const steps = [
    { phase: 'init', nodes: ['A','B','C'], copies: [], message: "Deep copy list with random pointers" },
    { phase: 'pass1', nodes: ['A','B','C'], copies: ["A'","B'","C'"], message: "Pass 1: Create all new nodes, map old→new" },
    { phase: 'pass2', nodes: ['A','B','C'], copies: ["A'","B'","C'"], done: true, message: "Pass 2: Set next and random using map" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Phase: {current.phase}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
          <span style={{ color: colors.text.secondary }}>Original:</span>
          {current.nodes.map((n, i) => (
            <div key={i} style={{ ...cellStyle(false, false), backgroundColor: colors.accent.main }}>{n}</div>
          ))}
        </div>
        {current.copies.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <span style={{ color: colors.text.secondary }}>Copy:</span>
            {current.copies.map((n, i) => (
              <div key={i} style={{ ...cellStyle(false, false), backgroundColor: '#27ae60' }}>{n}</div>
            ))}
          </div>
        )}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>O(n) time, O(n) space</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function FindDuplicateNumberWalkthrough() {
  const steps = [
    { nums: [1,3,4,2,2], slow: 0, fast: 0, phase: 'init', message: "Floyd's cycle detection on array" },
    { nums: [1,3,4,2,2], slow: 1, fast: 4, phase: 'find', message: "slow=nums[0]=1, fast=nums[nums[0]]=4" },
    { nums: [1,3,4,2,2], slow: 3, fast: 2, phase: 'find', message: "Keep moving until slow==fast" },
    { nums: [1,3,4,2,2], slow: 2, fast: 2, phase: 'found', message: "Intersection found! Now find cycle start" },
    { nums: [1,3,4,2,2], slow: 2, slow2: 2, phase: 'done', done: true, message: "slow2 from start meets slow at 2!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Phase: {current.phase}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.nums.map((n, i) => (
          <div key={i} style={{ ...cellStyle(i === current.slow || i === current.fast, false), backgroundColor: n === 2 ? '#e74c3c' : colors.accent.main }}>
            [{i}]={n}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 2</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function ValidSudokuWalkthrough() {
  const steps = [
    { check: 'rows', valid: true, message: "Check each row for duplicates" },
    { check: 'cols', valid: true, message: "Check each column for duplicates" },
    { check: 'boxes', valid: true, message: "Check each 3×3 box for duplicates" },
    { check: 'done', valid: true, done: true, message: "All checks pass! Valid Sudoku" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  const miniBoard = [['5','3','.'],['6','.','.'],['.','.','8']]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Checking: {current.check}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', marginBottom: '20px' }}>
        {miniBoard.map((row, r) => (
          <div key={r} style={{ display: 'flex', gap: '4px' }}>
            {row.map((cell, c) => (
              <div key={c} style={{ ...cellStyle(false, false), width: '35px', height: '35px', backgroundColor: cell !== '.' ? colors.accent.main : colors.bg.tertiary }}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', color: colors.text.secondary, marginBottom: '20px' }}>
        box_idx = (row // 3) * 3 + (col // 3)
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return true</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function ImplementTrieWalkthrough() {
  const steps = [
    { op: 'init', trie: {}, message: "Trie: each node has children dict + is_end" },
    { op: 'insert("app")', trie: { a: { p: { p: { end: true } } } }, message: "Insert 'app': create path a→p→p, mark end" },
    { op: 'insert("apple")', trie: { a: { p: { p: { end: true, l: { e: { end: true } } } } } }, message: "Insert 'apple': extend path, mark end" },
    { op: 'search("app")', trie: { a: { p: { p: { end: true, l: { e: { end: true } } } } } }, result: true, message: "Search 'app': found + is_end=true ✓" },
    { op: 'startsWith("ap")', trie: { a: { p: { p: { end: true, l: { e: { end: true } } } } } }, result: true, done: true, message: "startsWith 'ap': path exists ✓" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>{current.op}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {['a','p','p','l','e'].slice(0, current.op.includes('apple') ? 5 : current.op.includes('app') ? 3 : 0).map((c, i) => (
          <div key={i} style={{ ...cellStyle(false, false), backgroundColor: colors.accent.main }}>
            {c}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.result !== undefined && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>→ {String(current.result)}</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function CoinChangeIIWalkthrough() {
  const steps = [
    { coins: [1,2,5], amount: 5, dp: [1,0,0,0,0,0], coin: null, message: "dp[i] = ways to make amount i" },
    { coins: [1,2,5], amount: 5, dp: [1,1,1,1,1,1], coin: 1, message: "Coin 1: dp[i] += dp[i-1]" },
    { coins: [1,2,5], amount: 5, dp: [1,1,2,2,3,3], coin: 2, message: "Coin 2: dp[i] += dp[i-2]" },
    { coins: [1,2,5], amount: 5, dp: [1,1,2,2,3,4], coin: 5, done: true, message: "Coin 5: dp[5] += dp[0] = 4 ways!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Processing coin: {current.coin || '-'}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.dp.map((val, i) => (
          <div key={i} style={{ ...cellStyle(i === current.amount, false), backgroundColor: i === current.amount ? '#27ae60' : colors.accent.main }}>
            dp[{i}]={val}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 4</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function LongestIncreasingSubsequenceWalkthrough() {
  const steps = [
    { nums: [10,9,2,5,3,7,101,18], tails: [], message: "Maintain sorted 'tails' array" },
    { nums: [10,9,2,5,3,7,101,18], tails: [10], idx: 0, message: "10: append (empty)" },
    { nums: [10,9,2,5,3,7,101,18], tails: [2], idx: 2, message: "9→2: replace 10. Smaller = more room" },
    { nums: [10,9,2,5,3,7,101,18], tails: [2,5], idx: 3, message: "5: append (5 > 2)" },
    { nums: [10,9,2,5,3,7,101,18], tails: [2,3], idx: 4, message: "3: replace 5 (binary search pos)" },
    { nums: [10,9,2,5,3,7,101,18], tails: [2,3,7,101], idx: 6, message: "7,101: append both" },
    { nums: [10,9,2,5,3,7,101,18], tails: [2,3,7,18], idx: 7, done: true, message: "18: replace 101. LIS length = 4" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>LIS length: {current.tails.length}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '12px' }}>
        {current.nums.map((n, i) => (
          <div key={i} style={{ ...cellStyle(i === current.idx, false), width: '30px', backgroundColor: i === current.idx ? colors.accent.main : colors.bg.tertiary, fontSize: '12px' }}>
            {n}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>tails:</span>
        {current.tails.map((n, i) => (
          <div key={i} style={{ ...cellStyle(false, false), backgroundColor: '#27ae60' }}>{n}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 4</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function NonOverlappingIntervalsWalkthrough() {
  const steps = [
    { intervals: [[1,2],[2,3],[3,4],[1,3]], sorted: [[1,2],[2,3],[1,3],[3,4]], removals: 0, message: "Sort by END time (greedy)" },
    { intervals: [[1,2],[2,3],[3,4],[1,3]], prev: [1,2], current: [2,3], removals: 0, message: "[1,2] kept. [2,3]: 2 ≥ 2, no overlap" },
    { intervals: [[1,2],[2,3],[3,4],[1,3]], prev: [2,3], current: [1,3], removals: 1, message: "[1,3]: 1 < 3 → OVERLAP! Remove it" },
    { intervals: [[1,2],[2,3],[3,4],[1,3]], prev: [3,4], current: null, removals: 1, done: true, message: "[3,4]: 3 ≥ 3, no overlap. Done!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Removals: {current.removals}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
        {[[1,2],[2,3],[1,3],[3,4]].map((interval, i) => {
          const isRemoved = interval[0] === 1 && interval[1] === 3 && current.removals > 0
          return (
            <div key={i} style={{ ...cellStyle(false, false), width: 'auto', padding: '4px 12px', backgroundColor: isRemoved ? '#e74c3c' : colors.accent.main, textDecoration: isRemoved ? 'line-through' : 'none' }}>
              [{interval[0]},{interval[1]}]
            </div>
          )
        })}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 1</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function MeetingRoomsIIWalkthrough() {
  const steps = [
    { intervals: [[0,30],[5,10],[15,20]], heap: [], rooms: 0, message: "Min heap tracks end times of meetings" },
    { intervals: [[0,30],[5,10],[15,20]], heap: [30], rooms: 1, current: [0,30], message: "[0,30]: first meeting, need 1 room" },
    { intervals: [[0,30],[5,10],[15,20]], heap: [10,30], rooms: 2, current: [5,10], message: "[5,10]: 5 < 30, can't reuse. Need room 2" },
    { intervals: [[0,30],[5,10],[15,20]], heap: [20,30], rooms: 2, current: [15,20], done: true, message: "[15,20]: 15 ≥ 10, reuse room! Still 2 rooms" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Rooms needed: {current.rooms}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px' }}>
        {current.intervals.map((interval, i) => (
          <div key={i} style={{ ...cellStyle(current.current && interval[0] === current.current[0], false), width: 'auto', padding: '4px 12px', backgroundColor: colors.accent.main }}>
            [{interval[0]},{interval[1]}]
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Heap:</span>
        {current.heap.map((end, i) => (
          <div key={i} style={{ ...cellStyle(false, false), backgroundColor: '#9b59b6' }}>{end}</div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 2</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

// ==========================================
// MORE MEDIUM WALKTHROUGHS - BATCH 5
// ==========================================

export function WordBreakWalkthrough() {
  const steps = [
    { s: "leetcode", dict: ["leet","code"], dp: [true,false,false,false,false,false,false,false,false], message: "dp[i] = can s[0:i] be segmented?" },
    { s: "leetcode", dict: ["leet","code"], dp: [true,false,false,false,true,false,false,false,false], i: 4, message: "dp[4]=true: 'leet' in dict!" },
    { s: "leetcode", dict: ["leet","code"], dp: [true,false,false,false,true,false,false,false,true], i: 8, done: true, message: "dp[8]=true: dp[4] + 'code' in dict!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>s = "{current.s}"</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.dp.map((val, i) => (
          <div key={i} style={{ ...cellStyle(i === current.i, false), width: '32px', backgroundColor: val ? '#27ae60' : colors.bg.tertiary }}>
            {i}
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', color: colors.text.secondary, marginBottom: '20px' }}>
        Dict: [{current.dict.map(w => `"${w}"`).join(', ')}]
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return true</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function PartitionEqualSubsetSumWalkthrough() {
  const steps = [
    { nums: [1,5,11,5], total: 22, target: 11, dp: [true], message: "Sum=22, find subset with sum=11" },
    { nums: [1,5,11,5], total: 22, target: 11, dp: [true,true], num: 1, message: "Num 1: dp[1]=true" },
    { nums: [1,5,11,5], total: 22, target: 11, dp: [true,true,false,false,false,true,true], num: 5, message: "Num 5: dp[5]=true, dp[6]=true" },
    { nums: [1,5,11,5], total: 22, target: 11, dp: [true,true,false,false,false,true,true,false,false,false,false,true], num: 11, done: true, message: "Num 11: dp[11]=true! Can partition" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Target: {current.target}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px' }}>
        {current.nums.map((n, i) => (
          <div key={i} style={{ ...cellStyle(n === current.num, false), backgroundColor: colors.accent.main }}>{n}</div>
        ))}
      </div>
      <div style={{ textAlign: 'center', color: colors.text.secondary, marginBottom: '20px' }}>
        dp[11] = {current.dp[11] ? 'true ✓' : 'false'}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return true</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function TargetSumWalkthrough() {
  const steps = [
    { nums: [1,1,1,1,1], target: 3, message: "Assign +/- to sum to 3" },
    { nums: [1,1,1,1,1], target: 3, formula: "P - N = 3, P + N = 5", message: "P=positives, N=negatives. Solve: P=4" },
    { nums: [1,1,1,1,1], target: 3, subsetSum: 4, message: "Find subsets summing to 4 (choose 4 ones)" },
    { nums: [1,1,1,1,1], target: 3, ways: 5, done: true, message: "5 ways to choose 4 ones from 5!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Target: {current.target}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.nums.map((n, i) => (
          <div key={i} style={{ ...cellStyle(false, false), backgroundColor: colors.accent.main }}>±{n}</div>
        ))}
      </div>
      {current.formula && (
        <div style={{ textAlign: 'center', color: colors.text.secondary, marginBottom: '20px' }}>
          {current.formula}
        </div>
      )}
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 5</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}


export function DesignAddSearchWordsWalkthrough() {
  const steps = [
    { op: 'addWord("bad")', trie: ['bad'], message: "Add 'bad' to trie" },
    { op: 'addWord("dad")', trie: ['bad','dad'], message: "Add 'dad' to trie" },
    { op: 'search(".ad")', trie: ['bad','dad'], result: true, message: "Search '.ad': try b→a→d ✓, d→a→d ✓" },
    { op: 'search("b..")', trie: ['bad','dad'], result: true, done: true, message: "Search 'b..': b→(any)→(any) = 'bad' ✓" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>{current.op}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.trie.map((word, i) => (
          <div key={i} style={{ ...cellStyle(false, false), width: 'auto', padding: '8px 16px', backgroundColor: colors.accent.main }}>
            {word}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.result !== undefined && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>→ {String(current.result)}</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function KClosestPointsWalkthrough() {
  const steps = [
    { points: [[1,3],[-2,2],[3,3]], k: 2, heap: [], message: "Find k=2 closest to origin" },
    { points: [[1,3],[-2,2],[3,3]], k: 2, heap: [[1,3]], dists: ['√10'], message: "[1,3]: dist=√10, add to heap" },
    { points: [[1,3],[-2,2],[3,3]], k: 2, heap: [[1,3],[-2,2]], dists: ['√10','√8'], message: "[-2,2]: dist=√8, add to heap" },
    { points: [[1,3],[-2,2],[3,3]], k: 2, heap: [[-2,2],[3,3]], dists: ['√8','√18'], done: true, message: "[3,3]: √18 > √10, replace [1,3]" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>k = {current.k}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.heap.map((p, i) => (
          <div key={i} style={{ ...cellStyle(false, false), width: 'auto', padding: '8px 12px', backgroundColor: '#27ae60' }}>
            [{p[0]},{p[1]}]
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [[-2,2],[3,3]]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function KthLargestElementWalkthrough() {
  const steps = [
    { nums: [3,2,1,5,6,4], k: 2, heap: [], message: "Find 2nd largest using min heap of size k" },
    { nums: [3,2,1,5,6,4], k: 2, heap: [3], idx: 0, message: "Add 3 to heap" },
    { nums: [3,2,1,5,6,4], k: 2, heap: [2,3], idx: 1, message: "Add 2, heap size = k" },
    { nums: [3,2,1,5,6,4], k: 2, heap: [3,5], idx: 3, message: "5 > min(2), pop 2, push 5" },
    { nums: [3,2,1,5,6,4], k: 2, heap: [5,6], idx: 4, done: true, message: "6 > min(3), pop 3, push 6. Top = 5!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>k = {current.k}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px' }}>
        {current.nums.map((n, i) => (
          <div key={i} style={{ ...cellStyle(i === current.idx, false), backgroundColor: i === current.idx ? colors.accent.main : colors.bg.tertiary }}>
            {n}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Min Heap:</span>
        {current.heap.map((n, i) => (
          <div key={i} style={{ ...cellStyle(i === 0, false), backgroundColor: i === 0 ? '#27ae60' : '#9b59b6' }}>
            {n}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 5</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function InsertIntervalWalkthrough() {
  const steps = [
    { intervals: [[1,3],[6,9]], newInterval: [2,5], result: [], phase: 'before', message: "Insert [2,5] into sorted intervals" },
    { intervals: [[1,3],[6,9]], newInterval: [2,5], result: [], phase: 'merge', message: "[1,3] overlaps [2,5]: merge to [1,5]" },
    { intervals: [[1,3],[6,9]], newInterval: [1,5], result: [[1,5]], phase: 'after', message: "Add merged [1,5]" },
    { intervals: [[1,3],[6,9]], newInterval: [1,5], result: [[1,5],[6,9]], phase: 'done', done: true, message: "[6,9] no overlap, add as-is" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Phase: {current.phase}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px' }}>
        <span style={{ color: colors.text.secondary }}>New:</span>
        <div style={{ ...cellStyle(true, false), width: 'auto', padding: '4px 12px', backgroundColor: '#e74c3c' }}>
          [{current.newInterval[0]},{current.newInterval[1]}]
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Result:</span>
        {current.result.map((interval, i) => (
          <div key={i} style={{ ...cellStyle(false, false), width: 'auto', padding: '4px 12px', backgroundColor: '#27ae60' }}>
            [{interval[0]},{interval[1]}]
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [[1,5],[6,9]]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

// ==========================================
// MISSING NEETCODE 150 MEDIUM WALKTHROUGHS
// ==========================================

export function EncodeDecodeStringsWalkthrough() {
  const steps = [
    { input: ["lint","code"], encoded: "", message: "Encode: prefix each string with length#" },
    { input: ["lint","code"], encoded: "4#lint", message: "4#lint (4 chars + delimiter + string)" },
    { input: ["lint","code"], encoded: "4#lint4#code", message: "4#lint4#code - complete encoded string" },
    { input: ["lint","code"], decoded: ["lint","code"], done: true, message: "Decode: read length, then that many chars" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Length Prefix Encoding</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {current.encoded && (
          <div style={{ padding: '12px', backgroundColor: colors.bg.tertiary, borderRadius: '8px', fontFamily: 'monospace' }}>
            "{current.encoded}"
          </div>
        )}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>Works even with # in strings!</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function DesignTwitterWalkthrough() {
  const steps = [
    { op: 'postTweet(1, 5)', tweets: {1: [5]}, follows: {}, message: "User 1 posts tweet 5" },
    { op: 'follow(1, 2)', tweets: {1: [5]}, follows: {1: [2]}, message: "User 1 follows User 2" },
    { op: 'postTweet(2, 6)', tweets: {1: [5], 2: [6]}, follows: {1: [2]}, message: "User 2 posts tweet 6" },
    { op: 'getNewsFeed(1)', tweets: {1: [5], 2: [6]}, follows: {1: [2]}, feed: [6,5], done: true, message: "Feed: merge tweets from self + followees" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>{current.op}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px' }}>
        <div>Tweets: {JSON.stringify(current.tweets)}</div>
      </div>
      {current.feed && (
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
          <span>Feed:</span>
          {current.feed.map((t, i) => (
            <div key={i} style={{ ...cellStyle(false, false), backgroundColor: '#27ae60' }}>{t}</div>
          ))}
        </div>
      )}
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>Use heap for top 10</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function PalindromePartitioningWalkthrough() {
  const steps = [
    { s: "aab", path: [], message: "Try all palindrome prefixes at each position" },
    { s: "aab", path: ["a"], pos: 1, message: "'a' is palindrome, recurse on 'ab'" },
    { s: "aab", path: ["a","a"], pos: 2, message: "'a' is palindrome, recurse on 'b'" },
    { s: "aab", path: ["a","a","b"], pos: 3, result: true, message: "'b' is palindrome → found [a,a,b]!" },
    { s: "aab", path: ["aa","b"], pos: 3, result: true, done: true, message: "Backtrack: 'aa' + 'b' → found [aa,b]!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>s = "{current.s}"</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.path.map((p, i) => (
          <div key={i} style={{ ...cellStyle(false, false), width: 'auto', padding: '4px 12px', backgroundColor: colors.accent.main }}>
            {p}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [[a,a,b],[aa,b]]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function LongestCommonSubsequenceWalkthrough() {
  const steps = [
    { text1: "abcde", text2: "ace", dp: [[0,0,0,0]], message: "dp[i][j] = LCS of text1[0:i], text2[0:j]" },
    { text1: "abcde", text2: "ace", match: 'a', dp: [[0,0,0,0],[0,1,1,1]], message: "'a' == 'a' → dp[1][1] = dp[0][0] + 1 = 1" },
    { text1: "abcde", text2: "ace", match: 'c', dp: [[0,0,0,0],[0,1,1,1],[0,1,1,1],[0,1,2,2]], message: "'c' == 'c' → dp[3][2] = dp[2][1] + 1 = 2" },
    { text1: "abcde", text2: "ace", match: 'e', dp: [[0,0,0,0],[0,1,1,1],[0,1,1,1],[0,1,2,2],[0,1,2,2],[0,1,2,3]], done: true, message: "'e' == 'e' → dp[5][3] = 3. LCS = 'ace'" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>"{current.text1}" vs "{current.text2}"</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      {current.match && (
        <div style={{ textAlign: 'center', marginBottom: '20px', color: '#27ae60', fontWeight: 'bold' }}>
          Match: '{current.match}'
        </div>
      )}
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 3</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function BestTimeBuySellCooldownWalkthrough() {
  const steps = [
    { prices: [1,2,3,0,2], states: {hold:-1,sold:0,rest:0}, message: "Three states: hold, sold, rest" },
    { prices: [1,2,3,0,2], states: {hold:-1,sold:1,rest:0}, day: 1, message: "Day 1: sell@2 → sold=1" },
    { prices: [1,2,3,0,2], states: {hold:-1,sold:2,rest:1}, day: 2, message: "Day 2: sell@3 → sold=2" },
    { prices: [1,2,3,0,2], states: {hold:1,sold:2,rest:2}, day: 3, message: "Day 3: rest, then buy@0 → hold=1" },
    { prices: [1,2,3,0,2], states: {hold:1,sold:3,rest:2}, day: 4, done: true, message: "Day 4: sell@2 → profit=3" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Day {current.day || 0}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.prices.map((p, i) => (
          <div key={i} style={{ ...cellStyle(i === current.day, false), backgroundColor: i === current.day ? colors.accent.main : colors.bg.tertiary }}>
            ${p}
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', color: colors.text.secondary, marginBottom: '20px' }}>
        hold={current.states.hold} | sold={current.states.sold} | rest={current.states.rest}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 3</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function EditDistanceWalkthrough() {
  const steps = [
    { word1: "horse", word2: "ros", ops: [], message: "Min ops: insert, delete, replace" },
    { word1: "horse", word2: "ros", ops: ["replace h→r"], current: "rorse", message: "horse → rorse (replace h with r)" },
    { word1: "horse", word2: "ros", ops: ["replace h→r","delete r"], current: "rose", message: "rorse → rose (delete r)" },
    { word1: "horse", word2: "ros", ops: ["replace h→r","delete r","delete e"], current: "ros", done: true, message: "rose → ros (delete e). Done in 3!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>"{current.word1}" → "{current.word2}"</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      {current.current && (
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{ fontSize: '24px', color: colors.accent.light }}>{current.current}</span>
        </div>
      )}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
        {current.ops.map((op, i) => (
          <div key={i} style={{ padding: '4px 8px', backgroundColor: colors.accent.main, borderRadius: '4px', fontSize: '12px' }}>
            {op}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 3</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function JumpGameIIWalkthrough() {
  const steps = [
    { nums: [2,3,1,1,4], jumps: 0, end: 0, farthest: 0, message: "Track farthest reachable in current jump" },
    { nums: [2,3,1,1,4], jumps: 1, end: 2, farthest: 4, pos: 0, message: "At 0: can reach 2. Jump! farthest=4" },
    { nums: [2,3,1,1,4], jumps: 1, end: 2, farthest: 4, pos: 1, message: "At 1: can reach 4. Still in jump 1" },
    { nums: [2,3,1,1,4], jumps: 2, end: 4, farthest: 4, pos: 2, done: true, message: "At 2: reach end of jump 1. Jump 2 done!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Jumps: {current.jumps}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.nums.map((n, i) => (
          <div key={i} style={{ ...cellStyle(i === current.pos, false), backgroundColor: i === current.pos ? colors.accent.main : (i <= current.end ? '#27ae60' : colors.bg.tertiary) }}>
            {n}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 2</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function GasStationWalkthrough() {
  const steps = [
    { gas: [1,2,3,4,5], cost: [3,4,5,1,2], tank: 0, start: 0, message: "If total gas ≥ total cost, solution exists" },
    { gas: [1,2,3,4,5], cost: [3,4,5,1,2], tank: -2, start: 0, pos: 0, message: "Start 0: 1-3=-2 < 0. Can't start here" },
    { gas: [1,2,3,4,5], cost: [3,4,5,1,2], tank: -2, start: 1, pos: 1, message: "Start 1: 2-4=-2 < 0. Can't start here" },
    { gas: [1,2,3,4,5], cost: [3,4,5,1,2], tank: 0, start: 3, pos: 3, done: true, message: "Start 3: 4-1=3 ≥ 0. This works!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Try start: {current.start}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.gas.map((g, i) => (
          <div key={i} style={{ ...cellStyle(i === current.start, false), backgroundColor: i === current.start ? '#27ae60' : colors.bg.tertiary }}>
            {g}-{current.cost[i]}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 3</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function HandOfStraightsWalkthrough() {
  const steps = [
    { hand: [1,2,3,6,2,3,4,7,8], groupSize: 3, groups: [], message: "Sort and form groups of 3 consecutive" },
    { hand: [1,2,3,6,2,3,4,7,8], groupSize: 3, groups: [[1,2,3]], message: "Group 1: [1,2,3] ✓" },
    { hand: [1,2,3,6,2,3,4,7,8], groupSize: 3, groups: [[1,2,3],[2,3,4]], message: "Group 2: [2,3,4] ✓" },
    { hand: [1,2,3,6,2,3,4,7,8], groupSize: 3, groups: [[1,2,3],[2,3,4],[6,7,8]], done: true, message: "Group 3: [6,7,8] ✓ All grouped!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Group size: {current.groupSize}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
        {current.groups.map((g, i) => (
          <div key={i} style={{ padding: '8px 12px', backgroundColor: '#27ae60', borderRadius: '8px' }}>
            [{g.join(',')}]
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return true</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function MergeTripletsWalkthrough() {
  const steps = [
    { triplets: [[2,5,3],[1,8,4],[1,7,5]], target: [2,7,5], good: new Set(), message: "Find triplets where no value > target" },
    { triplets: [[2,5,3],[1,8,4],[1,7,5]], target: [2,7,5], good: new Set([0]), usable: [2,5,3], message: "[2,5,3]: all ≤ target. Matches pos 0!" },
    { triplets: [[2,5,3],[1,8,4],[1,7,5]], target: [2,7,5], good: new Set([0]), skip: [1,8,4], message: "[1,8,4]: 8 > 7. Skip (unusable)" },
    { triplets: [[2,5,3],[1,8,4],[1,7,5]], target: [2,7,5], good: new Set([0,1,2]), usable: [1,7,5], done: true, message: "[1,7,5]: matches pos 1,2. All 3 matched!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>Target: [{current.target.join(',')}]</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.triplets.map((t, i) => (
          <div key={i} style={{ ...cellStyle(false, false), width: 'auto', padding: '4px 12px', backgroundColor: current.skip && current.skip.toString() === t.toString() ? '#e74c3c' : (current.usable && current.usable.toString() === t.toString() ? '#27ae60' : colors.bg.tertiary) }}>
            [{t.join(',')}]
          </div>
        ))}
      </div>
      <div style={{ textAlign: 'center', color: colors.text.secondary, marginBottom: '20px' }}>
        Matched positions: {[...current.good].join(', ') || 'none'}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return true</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function PartitionLabelsWalkthrough() {
  const steps = [
    { s: "ababcbaca", last: {a:8,b:5,c:7}, end: 0, partitions: [], message: "Record last occurrence of each char" },
    { s: "ababcbaca", last: {a:8,b:5,c:7}, end: 8, pos: 0, partitions: [], message: "At 'a': must extend to index 8" },
    { s: "ababcbaca", last: {a:8,b:5,c:7}, end: 8, pos: 8, partitions: [9], done: true, message: "At index 8 = end. Partition size: 9" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>end = {current.end}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.s.split('').map((c, i) => (
          <div key={i} style={{ ...cellStyle(i === current.pos, false), width: '24px', backgroundColor: i <= current.end ? colors.accent.main : colors.bg.tertiary }}>
            {c}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return [9,7,8]</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function ValidParenthesisStringWalkthrough() {
  const steps = [
    { s: "(*))", low: 0, high: 0, message: "Track range: low=min open, high=max open" },
    { s: "(*))", low: 1, high: 1, pos: 0, message: "'(' → low++, high++ = [1,1]" },
    { s: "(*))", low: 0, high: 2, pos: 1, message: "'*' → low--, high++ = [0,2]" },
    { s: "(*))", low: 0, high: 1, pos: 2, message: "')' → low--, high-- = [0,1] (low≥0)" },
    { s: "(*))", low: 0, high: 0, pos: 3, done: true, message: "')' → [0,0]. low=0 at end ✓" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>low={current.low}, high={current.high}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.s.split('').map((c, i) => (
          <div key={i} style={{ ...cellStyle(i === current.pos, false), backgroundColor: i === current.pos ? colors.accent.main : colors.bg.tertiary }}>
            {c}
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return true</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function PowXNWalkthrough() {
  const steps = [
    { x: 2, n: 10, result: 1, message: "Binary exponentiation: x^n in O(log n)" },
    { x: 2, n: 10, binary: "1010", result: 1, message: "10 in binary = 1010" },
    { x: 2, n: 10, result: 4, step: "n=5 odd", message: "n=5 odd → result *= x = 4" },
    { x: 2, n: 10, result: 1024, done: true, message: "2^10 = 1024. Only 4 multiplications!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>{current.x}^{current.n}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', color: colors.accent.light }}>
        {current.result}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 1024</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function MultiplyStringsWalkthrough() {
  const steps = [
    { num1: "123", num2: "456", result: Array(6).fill(0), message: "Grade school: digit i×j → position i+j, i+j+1" },
    { num1: "123", num2: "456", result: [0,0,0,0,1,8], pos: "3×6", message: "3×6=18 → result[4]=8, result[3]+=1" },
    { num1: "123", num2: "456", result: [0,5,6,0,8,8], pos: "all", message: "Continue all digit pairs..." },
    { num1: "123", num2: "456", result: "56088", done: true, message: "123 × 456 = 56088" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>{current.num1} × {current.num2}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', color: colors.accent.light }}>
        {Array.isArray(current.result) ? current.result.join('') : current.result}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return "56088"</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function DetectSquaresWalkthrough() {
  const steps = [
    { points: [[3,10]], op: 'add([3,10])', message: "Add points, then count squares" },
    { points: [[3,10],[11,2],[3,2]], op: 'add more', message: "Added [11,2] and [3,2]" },
    { points: [[3,10],[11,2],[3,2]], query: [11,10], message: "count([11,10]): find squares with this corner" },
    { points: [[3,10],[11,2],[3,2]], query: [11,10], square: true, done: true, message: "Square: [11,10],[3,10],[3,2],[11,2] ✓" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1200)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>{current.op || `Query: [${current.query}]`}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
        {current.points.map((p, i) => (
          <div key={i} style={{ ...cellStyle(false, false), width: 'auto', padding: '4px 12px', backgroundColor: colors.accent.main }}>
            [{p.join(',')}]
          </div>
        ))}
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 1</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function SumTwoIntegersWalkthrough() {
  const steps = [
    { a: 2, b: 3, binary: ["010","011"], message: "Add without + operator using bits" },
    { a: 2, b: 3, xor: "001", carry: "100", message: "XOR=sum w/o carry, AND<<1=carry" },
    { a: 2, b: 3, result: 5, done: true, message: "Repeat until no carry. 2+3=5" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>{current.a} + {current.b}</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      {current.binary && (
        <div style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'monospace' }}>
          {current.binary.join(' + ')}
        </div>
      )}
      {current.xor && (
        <div style={{ textAlign: 'center', marginBottom: '20px', fontFamily: 'monospace' }}>
          XOR: {current.xor} | Carry: {current.carry}
        </div>
      )}
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return 5</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}

export function InterleavingStringWalkthrough() {
  const steps = [
    { s1: "aab", s2: "axy", s3: "aaxaby", dp: [[true]], message: "Can s3 be formed by interleaving s1, s2?" },
    { s1: "aab", s2: "axy", s3: "aaxaby", pos: [1,1], match: 'a', message: "s3[0]='a' matches s1[0] or s2[0]" },
    { s1: "aab", s2: "axy", s3: "aaxaby", pos: [2,2], message: "Fill dp table checking each position" },
    { s1: "aab", s2: "axy", s3: "aaxaby", result: true, done: true, message: "dp[3][3]=true. Valid interleaving!" },
  ]
  const { step, isPlaying, controls, isComplete } = useAnimationStepper(steps.length, 1500)
  const current = steps[step]

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>s1="{current.s1}" s2="{current.s2}"</span>
        <WalkthroughControls controls={controls} isPlaying={isPlaying} isComplete={isComplete} />
      </div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span style={{ color: colors.text.secondary }}>s3 = </span>
        <span style={{ color: colors.accent.light, fontSize: '20px' }}>"{current.s3}"</span>
      </div>
      <div style={messageBoxStyle(current.done)}>
        <div style={{ fontSize: '16px', color: colors.text.primary }}>{current.message}</div>
        {current.done && <div style={{ marginTop: '12px', fontSize: '20px', color: colors.accent.light, fontWeight: 'bold' }}>return true</div>}
      </div>
      <StepDots totalSteps={steps.length} currentStep={step} onSelect={controls.goTo} />
    </div>
  )
}


// Map problem IDs to walkthrough components
const WALKTHROUGHS = {
  // Arrays & Hashing
  'two-sum': TwoSumWalkthrough,
  'contains-duplicate': ContainsDuplicateWalkthrough,
  'valid-anagram': ValidAnagramWalkthrough,
  'group-anagrams': GroupAnagramsWalkthrough,
  'top-k-frequent': TopKFrequentWalkthrough,
  'product-except-self': ProductExceptSelfWalkthrough,
  'longest-consecutive': LongestConsecutiveWalkthrough,
  // Two Pointers
  'valid-palindrome': ValidPalindromeWalkthrough,
  '3sum': ThreeSumWalkthrough,
  'two-sum-ii': TwoSumIIWalkthrough,
  'container-with-most-water': ContainerWithMostWaterWalkthrough,
  // Sliding Window
  'best-time-to-buy-sell': BestTimeToBuySellWalkthrough,
  'longest-substring': LongestSubstringWalkthrough,
  // Stack
  'valid-parentheses': ValidParenthesesWalkthrough,
  'min-stack': MinStackWalkthrough,
  'daily-temperatures': DailyTemperaturesWalkthrough,
  // Binary Search
  'binary-search': BinarySearchWalkthrough,
  'search-2d-matrix': Search2DMatrixWalkthrough,
  'find-min-rotated': FindMinRotatedWalkthrough,
  // Linked List
  'reverse-linked-list': ReverseLinkedListWalkthrough,
  'merge-two-sorted-lists': MergeTwoSortedListsWalkthrough,
  'linked-list-cycle': LinkedListCycleWalkthrough,
  'remove-nth-from-end': RemoveNthFromEndWalkthrough,
  'reorder-list': ReorderListWalkthrough,
  // Trees
  'invert-binary-tree': InvertBinaryTreeWalkthrough,
  'max-depth-binary-tree': MaxDepthBinaryTreeWalkthrough,
  'diameter-binary-tree': DiameterBinaryTreeWalkthrough,
  'balanced-binary-tree': BalancedBinaryTreeWalkthrough,
  'same-tree': SameTreeWalkthrough,
  'subtree-of-another-tree': SubtreeOfAnotherTreeWalkthrough,
  'lca-bst': LCABSTWalkthrough,
  'level-order-traversal': LevelOrderTraversalWalkthrough,
  'validate-bst': ValidateBSTWalkthrough,
  'kth-smallest-bst': KthSmallestBSTWalkthrough,
  // DP
  'climbing-stairs': ClimbingStairsWalkthrough,
  'min-cost-climbing-stairs': MinCostClimbingStairsWalkthrough,
  'house-robber': HouseRobberWalkthrough,
  'coin-change': CoinChangeWalkthrough,
  'maximum-subarray': MaximumSubarrayWalkthrough,
  // Bit Manipulation
  'single-number': SingleNumberWalkthrough,
  'number-of-1-bits': NumberOf1BitsWalkthrough,
  'counting-bits': CountingBitsWalkthrough,
  'reverse-bits': ReverseBitsWalkthrough,
  'missing-number': MissingNumberWalkthrough,
  // Math
  'happy-number': HappyNumberWalkthrough,
  'plus-one': PlusOneWalkthrough,
  // Heap
  'kth-largest-stream': KthLargestStreamWalkthrough,
  'last-stone-weight': LastStoneWeightWalkthrough,
  // Intervals
  'merge-intervals': MergeIntervalsWalkthrough,
  'meeting-rooms': MeetingRoomsWalkthrough,
  // Graph
  'number-of-islands': NumberOfIslandsWalkthrough,
  'clone-graph': CloneGraphWalkthrough,
  'course-schedule': CourseScheduleWalkthrough,
  // Backtracking
  'subsets': SubsetsWalkthrough,
  'combination-sum': CombinationSumWalkthrough,
  'permutations': PermutationsWalkthrough,
  'word-search': WordSearchWalkthrough,
  'generate-parentheses': GenerateParenthesesWalkthrough,
  // Matrix
  'rotate-image': RotateImageWalkthrough,
  'spiral-matrix': SpiralMatrixWalkthrough,
  'set-matrix-zeroes': SetMatrixZeroesWalkthrough,
  // More DP
  'house-robber-ii': HouseRobberIIWalkthrough,
  'longest-palindromic-substring': LongestPalindromicSubstringWalkthrough,
  'max-product-subarray': MaxProductSubarrayWalkthrough,
  'unique-paths': UniquePathsWalkthrough,
  'jump-game': JumpGameWalkthrough,
  // More Binary Search
  'koko-eating-bananas': KokoEatingBananasWalkthrough,
  'search-rotated-array': SearchRotatedArrayWalkthrough,
  // More Stack
  'eval-reverse-polish': EvalReversePolishWalkthrough,
  // More Graph/BFS
  'rotting-oranges': RottingOrangesWalkthrough,
  'max-area-island': MaxAreaIslandWalkthrough,
  'pacific-atlantic': PacificAtlanticWalkthrough,
  'surrounded-regions': SurroundedRegionsWalkthrough,
  'course-schedule-ii': CourseScheduleIIWalkthrough,
  'binary-tree-right-side': BinaryTreeRightSideWalkthrough,
  'count-good-nodes': CountGoodNodesWalkthrough,
  'walls-and-gates': WallsAndGatesWalkthrough,
  'redundant-connection': RedundantConnectionWalkthrough,
  'graph-valid-tree': GraphValidTreeWalkthrough,
  'num-connected-components': NumConnectedComponentsWalkthrough,
  // BFS/DFS Batch 2
  'network-delay-time': NetworkDelayTimeWalkthrough,
  'cheapest-flights-k-stops': CheapestFlightsWalkthrough,
  'construct-tree-preorder-inorder': ConstructTreePreorderInorderWalkthrough,
  'min-cost-connect-points': MinCostConnectPointsWalkthrough,
  // Batch 3 - More Medium
  'decode-ways': DecodeWaysWalkthrough,
  'palindromic-substrings': PalindromicSubstringsWalkthrough,
  'letter-combinations': LetterCombinationsWalkthrough,
  'subsets-ii': SubsetsIIWalkthrough,
  'combination-sum-ii': CombinationSumIIWalkthrough,
  'task-scheduler': TaskSchedulerWalkthrough,
  'lru-cache': LRUCacheWalkthrough,
  'time-based-key-value': TimeBasedKeyValueWalkthrough,
  'car-fleet': CarFleetWalkthrough,
  'longest-repeating-char-replacement': LongestRepeatingCharReplacementWalkthrough,
  // Batch 4 - More Medium
  'permutation-in-string': PermutationInStringWalkthrough,
  'add-two-numbers': AddTwoNumbersWalkthrough,
  'copy-list-random-pointer': CopyListRandomPointerWalkthrough,
  'find-duplicate-number': FindDuplicateNumberWalkthrough,
  'valid-sudoku': ValidSudokuWalkthrough,
  'implement-trie': ImplementTrieWalkthrough,
  'coin-change-ii': CoinChangeIIWalkthrough,
  'longest-increasing-subsequence': LongestIncreasingSubsequenceWalkthrough,
  'non-overlapping-intervals': NonOverlappingIntervalsWalkthrough,
  'meeting-rooms-ii': MeetingRoomsIIWalkthrough,
  // Batch 5 - More Medium
  'word-break': WordBreakWalkthrough,
  'partition-equal-subset-sum': PartitionEqualSubsetSumWalkthrough,
  'target-sum': TargetSumWalkthrough,

  'design-add-search-words': DesignAddSearchWordsWalkthrough,
  'k-closest-points': KClosestPointsWalkthrough,
  'kth-largest-element': KthLargestElementWalkthrough,
  'insert-interval': InsertIntervalWalkthrough,
  // Missing NeetCode 150 Mediums
  'encode-decode-strings': EncodeDecodeStringsWalkthrough,
  'design-twitter': DesignTwitterWalkthrough,
  'palindrome-partitioning': PalindromePartitioningWalkthrough,
  'longest-common-subsequence': LongestCommonSubsequenceWalkthrough,
  'best-time-buy-sell-cooldown': BestTimeBuySellCooldownWalkthrough,
  'edit-distance': EditDistanceWalkthrough,
  'jump-game-ii': JumpGameIIWalkthrough,
  'gas-station': GasStationWalkthrough,
  'hand-of-straights': HandOfStraightsWalkthrough,
  'merge-triplets': MergeTripletsWalkthrough,
  'partition-labels': PartitionLabelsWalkthrough,
  'valid-parenthesis-string': ValidParenthesisStringWalkthrough,
  'pow-x-n': PowXNWalkthrough,
  'multiply-strings': MultiplyStringsWalkthrough,
  'detect-squares': DetectSquaresWalkthrough,
  'sum-two-integers': SumTwoIntegersWalkthrough,
  'interleaving-string': InterleavingStringWalkthrough,
}

// Main component
export function Walkthrough({ problemId }) {
  const Component = WALKTHROUGHS[problemId]
  
  if (!Component) {
    return (
      <div style={{ ...containerStyle, textAlign: 'center', color: colors.text.muted }}>
        No walkthrough available for this problem yet.
      </div>
    )
  }
  
  return <Component />
}
