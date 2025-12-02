import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { ALL_PROBLEMS, TOPICS, DIFFICULTIES } from './data'
import { useLocalStorage, useKeyboardShortcuts } from './hooks'
import { FlashCard } from './components'
import { colors } from './utils/theme'

// Status options for tracking progress
const STATUSES = [
  { value: 'all', label: 'All Status', color: null },
  { value: 'new', label: 'New', emoji: '🌱', color: colors.text.secondary },
  { value: 'struggled', label: 'Not Yet', emoji: '😤', color: colors.status.warning },
  { value: 'got-it', label: 'Done', emoji: '💰', color: colors.accent.primary },
]

export default function App() {
  // Persisted state
  const [problemStatus, setProblemStatus] = useLocalStorage('algo-bag-status', {})
  const [userSolutions, setUserSolutions] = useLocalStorage('algo-bag-solutions', {})
  
  // Pyodide state - load once at app level
  const [pyodide, setPyodide] = useState(null)
  const [pyodideLoading, setPyodideLoading] = useState(true)
  
  useEffect(() => {
    async function loadPyodideRuntime() {
      if (window.loadPyodide) {
        const py = await window.loadPyodide()
        setPyodide(py)
        setPyodideLoading(false)
      }
    }
    loadPyodideRuntime()
  }, [])
  
  // UI state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [filterDifficulty, setFilterDifficulty] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterTopic, setFilterTopic] = useState('all')
  const [view, setView] = useState('list') // 'card' or 'list'
  const [selectedProblemId, setSelectedProblemId] = useState(null)

  // Filter problems
  const filteredProblems = useMemo(() => {
    return ALL_PROBLEMS.filter(problem => {
      const matchesDifficulty = filterDifficulty === 'all' || problem.difficulty === filterDifficulty
      const matchesTopic = filterTopic === 'all' || problem.topics.includes(filterTopic)
      const status = problemStatus[problem.id] || 'new'
      const matchesStatus = filterStatus === 'all' || status === filterStatus
      return matchesDifficulty && matchesStatus && matchesTopic
    })
  }, [filterDifficulty, filterStatus, filterTopic, problemStatus])

  // Stats for header
  const stats = useMemo(() => {
    const counts = { new: 0, struggled: 0, 'got-it': 0 }
    ALL_PROBLEMS.forEach(p => {
      const status = problemStatus[p.id] || 'new'
      counts[status] = (counts[status] || 0) + 1
    })
    return counts
  }, [problemStatus])

  const totalProblems = ALL_PROBLEMS.length
  const progressPercent = (stats['got-it'] / totalProblems) * 100

  // Navigation
  const goToRandom = useCallback(() => {
    if (filteredProblems.length === 0) return
    const randomIndex = Math.floor(Math.random() * filteredProblems.length)
    const problem = filteredProblems[randomIndex]
    setSelectedProblemId(problem.id)
    setIsFlipped(false)
    setView('card')
  }, [filteredProblems])

  const openProblem = (problem) => {
    setSelectedProblemId(problem.id)
    setIsFlipped(false)
    setView('card')
  }

  const currentProblem = ALL_PROBLEMS.find(p => p.id === selectedProblemId) || filteredProblems[0]

  const markStatus = useCallback((status) => {
    if (!currentProblem) return
    const current = problemStatus[currentProblem.id] || 'new'
    // Toggle: if clicking the same status, reset to 'new'
    const newStatus = current === status ? 'new' : status
    setProblemStatus(prev => ({
      ...prev,
      [currentProblem.id]: newStatus,
    }))
  }, [currentProblem, problemStatus, setProblemStatus])

  const goToNext = useCallback(() => {
    const currentIdx = filteredProblems.findIndex(p => p.id === selectedProblemId)
    const nextIdx = (currentIdx + 1) % filteredProblems.length
    setSelectedProblemId(filteredProblems[nextIdx].id)
    setIsFlipped(false)
  }, [filteredProblems, selectedProblemId])

  const goToPrev = useCallback(() => {
    const currentIdx = filteredProblems.findIndex(p => p.id === selectedProblemId)
    const prevIdx = (currentIdx - 1 + filteredProblems.length) % filteredProblems.length
    setSelectedProblemId(filteredProblems[prevIdx].id)
    setIsFlipped(false)
  }, [filteredProblems, selectedProblemId])

  // Keyboard shortcuts
  useKeyboardShortcuts({
    ' ': () => setIsFlipped(f => !f),
    'arrowright': goToNext,
    'arrowleft': goToPrev,
    'r': goToRandom,
    '1': () => markStatus('got-it'),
    '2': () => markStatus('struggled'),
    'escape': () => setView('list'),
  }, view === 'card')

  // Cute dropdown styles with custom arrow
  const selectStyle = {
    padding: '12px 36px 12px 16px',
    backgroundColor: colors.bg.secondary,
    border: `2px solid ${colors.border.default}`,
    borderRadius: '12px',
    color: colors.text.primary,
    fontSize: '14px',
    cursor: 'pointer',
    minWidth: '150px',
    fontFamily: 'inherit',
    appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238b949e' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }

  // List View
  if (view === 'list') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: colors.bg.primary,
        padding: '32px 24px',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              color: colors.text.primary, 
              margin: 0,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: "'JetBrains Mono', monospace",
              fontStyle: 'italic',
            }}>
              🎒 Algo in the Bag
            </h1>
            <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
              <span style={{ color: colors.accent.primary }}>💰 {stats['got-it']} done</span>
              <span style={{ color: colors.status.warning }}>😤 {stats.struggled} not yet</span>
              <span style={{ color: colors.text.secondary }}>🌱 {stats.new} new</span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{
            height: '8px',
            backgroundColor: colors.bg.tertiary,
            borderRadius: '4px',
            marginBottom: '24px',
            overflow: 'hidden',
            border: `1px solid ${colors.border.default}`,
          }}>
            <div style={{
              height: '100%',
              width: `${progressPercent}%`,
              backgroundColor: colors.accent.primary,
              borderRadius: '4px',
              transition: 'width 0.3s ease',
            }} />
          </div>

          {/* Filters - in a cute box */}
          <div style={{
            backgroundColor: colors.bg.secondary,
            borderRadius: '16px',
            padding: '16px 20px',
            marginBottom: '20px',
            border: `2px solid ${colors.border.default}`,
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}>
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              style={{
                ...selectStyle,
                borderColor: filterDifficulty !== 'all' ? colors.accent.primary : colors.border.default,
              }}
            >
              <option value="all">All Difficulties</option>
              {DIFFICULTIES.map(d => (
                <option key={d} value={d}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                ...selectStyle,
                borderColor: filterStatus !== 'all' ? colors.accent.primary : colors.border.default,
              }}
            >
              {STATUSES.map(s => (
                <option key={s.value} value={s.value}>
                  {s.emoji ? `${s.emoji} ${s.label}` : s.label}
                </option>
              ))}
            </select>

            <select
              value={filterTopic}
              onChange={(e) => setFilterTopic(e.target.value)}
              style={{
                ...selectStyle,
                borderColor: filterTopic !== 'all' ? colors.accent.primary : colors.border.default,
              }}
            >
              <option value="all">All Topics</option>
              {TOPICS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <button
              onClick={goToRandom}
              style={{
                padding: '12px 24px',
                backgroundColor: colors.accent.primary,
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'inherit',
                boxShadow: `0 4px 12px ${colors.accent.primary}40`,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
            >
              🎲 Random Card
            </button>
          </div>

          {/* Problem list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredProblems.map((problem, index) => {
              const status = problemStatus[problem.id] || 'new'
              const statusInfo = STATUSES.find(s => s.value === status)
              const isSelected = selectedProblemId === problem.id
              
              return (
                <button
                  key={problem.id}
                  onClick={() => openProblem(problem)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '18px 22px',
                    backgroundColor: colors.bg.secondary,
                    border: isSelected ? `2px solid ${colors.accent.primary}` : `2px solid ${colors.border.default}`,
                    borderRadius: '14px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s, transform 0.2s',
                  }}
                >
                  {/* Row number */}
                  <span style={{ 
                    color: colors.text.muted, 
                    fontSize: '14px',
                    minWidth: '28px',
                    fontWeight: '600',
                  }}>
                    {index + 1}
                  </span>

                  {/* Problem info */}
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      color: colors.text.primary, 
                      fontWeight: '600', 
                      marginBottom: '6px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '15px',
                    }}>
                      {problem.title}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {problem.topics.map(t => (
                        <span key={t} style={{
                          padding: '3px 10px',
                          backgroundColor: colors.bg.tertiary,
                          border: `1px solid ${colors.border.default}`,
                          borderRadius: '6px',
                          fontSize: '11px',
                          color: colors.text.secondary,
                        }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Difficulty badge */}
                  <span style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    backgroundColor: `${colors.difficulty[problem.difficulty]}22`,
                    color: colors.difficulty[problem.difficulty],
                  }}>
                    {problem.difficulty}
                  </span>

                  {/* Status badge */}
                  <span style={{
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    backgroundColor: status === 'got-it' ? `${colors.accent.primary}22` : 
                                    status === 'struggled' ? `${colors.status.warning}22` : 
                                    colors.bg.tertiary,
                    color: status === 'got-it' ? colors.accent.primary : 
                           status === 'struggled' ? colors.status.warning : 
                           colors.text.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    {statusInfo?.emoji} {statusInfo?.label}
                  </span>
                </button>
              )
            })}
          </div>

          {filteredProblems.length === 0 && (
            <p style={{ textAlign: 'center', color: colors.text.muted, padding: '40px' }}>
              No problems match your filters
            </p>
          )}
        </div>
      </div>
    )
  }

  // Card View
  if (!currentProblem) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: colors.bg.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: colors.text.secondary,
      }}>
        No problems found. 
        <button 
          onClick={() => setView('list')}
          style={{ marginLeft: '8px', color: colors.accent.primary, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Back to list
        </button>
      </div>
    )
  }

  const currentStatus = problemStatus[currentProblem.id] || 'new'

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.bg.primary,
      padding: '20px',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {/* Top bar in a box */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          backgroundColor: colors.bg.secondary,
          padding: '14px 20px',
          borderRadius: '14px',
          border: `2px solid ${colors.border.default}`,
        }}>
          <button
            onClick={() => setView('list')}
            style={{
              padding: '10px 18px',
              backgroundColor: colors.bg.tertiary,
              border: `2px solid ${colors.border.default}`,
              borderRadius: '10px',
              color: colors.text.primary,
              cursor: 'pointer',
              fontSize: '14px',
              fontFamily: 'inherit',
              fontWeight: '500',
            }}
          >
            ← Back
          </button>

          <div style={{ 
            color: colors.text.secondary, 
            fontSize: '14px',
            backgroundColor: colors.bg.tertiary,
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: '600',
          }}>
            {filteredProblems.findIndex(p => p.id === currentProblem.id) + 1} / {filteredProblems.length}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={goToPrev} style={{
              padding: '10px 16px',
              backgroundColor: colors.bg.tertiary,
              border: `2px solid ${colors.border.default}`,
              borderRadius: '10px',
              color: colors.text.primary,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '14px',
              fontWeight: '500',
            }}>⏮️ Prev</button>
            <button onClick={goToRandom} style={{
              padding: '10px 16px',
              backgroundColor: colors.accent.primary,
              border: 'none',
              borderRadius: '10px',
              color: 'white',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '14px',
              fontWeight: '600',
            }}>🎲 Shuffle</button>
            <button onClick={goToNext} style={{
              padding: '10px 16px',
              backgroundColor: colors.bg.tertiary,
              border: `2px solid ${colors.border.default}`,
              borderRadius: '10px',
              color: colors.text.primary,
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '14px',
              fontWeight: '500',
            }}>Next ⏭️</button>
          </div>
        </div>

        {/* Flash card */}
        <FlashCard
          key={currentProblem.id}
          problem={currentProblem}
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped(f => !f)}
          userCode={userSolutions[currentProblem.id]}
          onCodeChange={(code) => setUserSolutions(prev => ({ ...prev, [currentProblem.id]: code }))}
          pyodide={pyodide}
          pyodideLoading={pyodideLoading}
        />

        {/* Status buttons in a box */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          marginTop: '20px',
          backgroundColor: colors.bg.secondary,
          padding: '16px 24px',
          borderRadius: '14px',
          border: `2px solid ${colors.border.default}`,
        }}>
          <button
            onClick={() => markStatus('struggled')}
            style={{
              padding: '14px 28px',
              backgroundColor: currentStatus === 'struggled' ? colors.status.warning : colors.bg.tertiary,
              border: `2px solid ${currentStatus === 'struggled' ? colors.status.warning : colors.border.default}`,
              borderRadius: '12px',
              color: currentStatus === 'struggled' ? '#000' : colors.text.primary,
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            😤 Not Yet
          </button>
          <button
            onClick={() => markStatus('got-it')}
            style={{
              padding: '14px 28px',
              backgroundColor: currentStatus === 'got-it' ? colors.accent.primary : colors.bg.tertiary,
              border: `2px solid ${currentStatus === 'got-it' ? colors.accent.primary : colors.border.default}`,
              borderRadius: '12px',
              color: currentStatus === 'got-it' ? 'white' : colors.text.primary,
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            💰 Done
          </button>
        </div>

        {/* Keyboard hints */}
        <p style={{
          textAlign: 'center',
          color: colors.text.muted,
          fontSize: '12px',
          marginTop: '20px',
        }}>
          <kbd style={{ backgroundColor: colors.bg.tertiary, padding: '3px 8px', borderRadius: '4px', border: `1px solid ${colors.border.default}` }}>Space</kbd> flip
          {' · '}
          <kbd style={{ backgroundColor: colors.bg.tertiary, padding: '3px 8px', borderRadius: '4px', border: `1px solid ${colors.border.default}` }}>←→</kbd> navigate
          {' · '}
          <kbd style={{ backgroundColor: colors.bg.tertiary, padding: '3px 8px', borderRadius: '4px', border: `1px solid ${colors.border.default}` }}>1</kbd> done
          {' · '}
          <kbd style={{ backgroundColor: colors.bg.tertiary, padding: '3px 8px', borderRadius: '4px', border: `1px solid ${colors.border.default}` }}>2</kbd> not yet
          {' · '}
          <kbd style={{ backgroundColor: colors.bg.tertiary, padding: '3px 8px', borderRadius: '4px', border: `1px solid ${colors.border.default}` }}>R</kbd> random
        </p>
      </div>
    </div>
  )
}
