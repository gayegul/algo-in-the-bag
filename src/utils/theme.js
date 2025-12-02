// Color palette - teal accent on dark background
export const colors = {
  bg: {
    primary: '#0d1117',
    secondary: '#161b22',
    tertiary: '#21262d',
  },
  border: {
    default: '#30363d',
    subtle: '#21262d',
  },
  text: {
    primary: '#e6edf3',
    secondary: '#8b949e',
    muted: '#6e7681',
    disabled: '#484f58',
  },
  accent: {
    primary: '#14b8a6',
    light: '#5eead4',
    dark: '#0d9488',
  },
  status: {
    success: '#5eead4',
    warning: '#ffc947',
    error: '#ff6b6b',
    errorBg: '#5c1a1a',
  },
  difficulty: {
    easy: '#5eead4',
    medium: '#ffc947',
    hard: '#ff6b6b',
  },
  syntax: {
    keyword: '#ff7b72',
    string: '#a5d6ff',
    number: '#79c0ff',
    function: '#d2a8ff',
    class: '#7ee787',
    comment: '#8b949e',
    param: '#ffa657',
    boolean: '#79c0ff',
    builtin: '#d2a8ff',
  },
}

// Shared style objects
export const styles = {
  card: {
    backgroundColor: colors.bg.secondary,
    border: `2px solid ${colors.border.default}`,
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '16px',
  },
  
  button: (variant = 'default') => ({
    padding: '12px 20px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
    border: 'none',
    ...(variant === 'primary' && {
      backgroundColor: colors.accent.primary,
      color: 'white',
    }),
    ...(variant === 'warning' && {
      backgroundColor: colors.status.warning,
      color: '#000',
    }),
    ...(variant === 'default' && {
      backgroundColor: colors.bg.tertiary,
      color: colors.text.primary,
      border: `1px solid ${colors.border.default}`,
    }),
  }),

  sectionTitle: {
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    color: colors.text.secondary,
    marginBottom: '12px',
    display: 'block',
  },

  badge: (type) => ({
    display: 'inline-block',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    backgroundColor: `${colors.difficulty[type]}22`,
    color: colors.difficulty[type],
  }),

  topicTag: {
    display: 'inline-block',
    padding: '4px 10px',
    backgroundColor: colors.bg.tertiary,
    border: `1px solid ${colors.border.default}`,
    borderRadius: '6px',
    fontSize: '12px',
    color: colors.text.secondary,
  },
}
