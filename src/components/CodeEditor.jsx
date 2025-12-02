import React, { useState, useEffect } from 'react'
import { colors } from '../utils/theme'

// Simple syntax highlighting for Python
function highlightPython(code) {
  const keywords = ['def', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'not', 'and', 'or', 'class', 'import', 'from', 'as', 'try', 'except', 'with', 'lambda', 'pass', 'break', 'continue', 'True', 'False', 'None']
  const builtins = ['len', 'range', 'min', 'max', 'sum', 'abs', 'str', 'int', 'float', 'list', 'dict', 'set', 'print', 'enumerate', 'sorted', 'zip', 'map', 'filter']

  // Split into tokens while preserving whitespace
  const tokens = code.split(/(\s+|[()[\]{}:,.]|"[^"]*"|'[^']*'|#.*$)/gm)
  
  return tokens.map((token, i) => {
    if (!token) return null
    
    // Comments
    if (token.startsWith('#')) {
      return <span key={i} style={{ color: colors.syntax.comment }}>{token}</span>
    }
    // Strings
    if (token.startsWith('"') || token.startsWith("'")) {
      return <span key={i} style={{ color: colors.syntax.string }}>{token}</span>
    }
    // Numbers
    if (/^\d+$/.test(token)) {
      return <span key={i} style={{ color: colors.syntax.number }}>{token}</span>
    }
    // Keywords
    if (keywords.includes(token)) {
      return <span key={i} style={{ color: colors.syntax.keyword }}>{token}</span>
    }
    // Builtins
    if (builtins.includes(token)) {
      return <span key={i} style={{ color: colors.syntax.builtin }}>{token}</span>
    }
    // Function definitions
    if (tokens[i - 2] === 'def') {
      return <span key={i} style={{ color: colors.syntax.function }}>{token}</span>
    }
    
    return <span key={i}>{token}</span>
  })
}

export function CodeEditor({ code, onChange, readOnly = false }) {
  const [value, setValue] = useState(code)

  // Update value when code prop changes (e.g., reset button)
  useEffect(() => {
    setValue(code)
  }, [code])

  const handleChange = (e) => {
    setValue(e.target.value)
    onChange?.(e.target.value)
  }

  const handleKeyDown = (e) => {
    // Tab inserts spaces instead of changing focus
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      const newValue = value.substring(0, start) + '    ' + value.substring(end)
      setValue(newValue)
      onChange?.(newValue)
      
      // Move cursor after the spaces
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 4
      }, 0)
    }
    
    // Enter maintains current indentation
    if (e.key === 'Enter') {
      e.preventDefault()
      const start = e.target.selectionStart
      const end = e.target.selectionEnd
      
      // Find the start of the current line
      const lineStart = value.lastIndexOf('\n', start - 1) + 1
      const line = value.substring(lineStart, start)
      
      // Get leading whitespace from current line
      const indent = line.match(/^(\s*)/)[1]
      
      const newValue = value.substring(0, start) + '\n' + indent + value.substring(end)
      setValue(newValue)
      onChange?.(newValue)
      
      // Move cursor after the indent
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 1 + indent.length
      }, 0)
    }
  }

  return (
    <div style={{
      position: 'relative',
      backgroundColor: colors.bg.primary,
      borderRadius: '12px',
      border: `1px solid ${colors.border.default}`,
      overflow: 'hidden',
    }}>
      {/* Syntax highlighted display layer */}
      <pre style={{
        margin: 0,
        padding: '16px',
        fontSize: '14px',
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        lineHeight: '1.6',
        color: colors.text.primary,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        pointerEvents: 'none',
      }}>
        {highlightPython(value)}
      </pre>

      {/* Invisible textarea for editing */}
      {!readOnly && (
        <textarea
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            padding: '16px',
            fontSize: '14px',
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            lineHeight: '1.6',
            color: 'transparent',
            caretColor: colors.accent.light,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
          }}
        />
      )}
    </div>
  )
}

// Read-only code display with syntax highlighting
export function CodeDisplay({ code }) {
  return <CodeEditor code={code} readOnly />
}
