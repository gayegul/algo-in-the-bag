import { useState, useEffect, useCallback } from 'react'

/**
 * Syncs state with localStorage. Falls back gracefully if storage is unavailable.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage full or unavailable - fail silently
    }
  }, [key, value])

  return [value, setValue]
}

/**
 * Handles keyboard shortcuts. Pass a map of key -> handler.
 */
export function useKeyboardShortcuts(shortcuts, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const handler = (e) => {
      // Skip if user is typing in an input
      if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') {
        return
      }

      const key = e.key.toLowerCase()
      if (shortcuts[key]) {
        e.preventDefault()
        shortcuts[key]()
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [shortcuts, enabled])
}

/**
 * Simple animation stepper for walkthroughs.
 * Returns current step, controls, and whether it's playing.
 */
export function useAnimationStepper(totalSteps, intervalMs = 1500) {
  const [step, setStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!isPlaying || step >= totalSteps - 1) {
      if (step >= totalSteps - 1) setIsPlaying(false)
      return
    }

    const timer = setInterval(() => {
      setStep((s) => s + 1)
    }, intervalMs)

    return () => clearInterval(timer)
  }, [isPlaying, step, totalSteps, intervalMs])

  const controls = {
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    toggle: () => setIsPlaying((p) => !p),
    next: () => step < totalSteps - 1 && setStep((s) => s + 1),
    reset: () => { setStep(0); setIsPlaying(false) },
    goTo: (i) => { setStep(i); setIsPlaying(false) },
  }

  return { step, isPlaying, controls, isComplete: step >= totalSteps - 1 }
}
