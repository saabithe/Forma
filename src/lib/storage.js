const STORAGE_KEY = 'forma_state'

const DEFAULT_STATE = {
  user: null,
  currentIndex: 0, // index into SKILLS array — linear progression
  completedSkills: [], // array of { index, date }
  sessions: [], // array of { date, skillIndex, completed }
  undoHistory: [], // stack of { action, snapshot }
  settings: {
    sound: true,
    timerBeep: true,
  },
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_STATE }
    const parsed = JSON.parse(raw)
    return {
      ...DEFAULT_STATE,
      ...parsed,
      settings: { ...DEFAULT_STATE.settings, ...parsed.settings },
      undoHistory: parsed.undoHistory || [],
      completedSkills: parsed.completedSkills || [],
      sessions: parsed.sessions || [],
    }
  } catch {
    return { ...DEFAULT_STATE }
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

export function clearState() {
  localStorage.removeItem(STORAGE_KEY)
}

export function exportState() {
  const state = loadState()
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const now = new Date()
  a.href = url
  a.download = `forma-backup-${now.toISOString().slice(0,10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function importState(jsonString) {
  try {
    const parsed = JSON.parse(jsonString)
    saveState(parsed)
    return true
  } catch {
    return false
  }
}
