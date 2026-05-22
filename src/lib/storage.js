import { isLegacyState, migrateState } from './migration'

const STORAGE_KEY = 'forma_state'

const DEFAULT_STATE = {
  user: null,
  activeSkills: [],      // [{ skillId, currentPhaseIndex, startedDate }]
  masteredSkills: [],    // [{ skillId, masteredDate }]
  roadmapProgress: { highestUnlockedIndex: 0 },
  workoutHistory: [],    // [{ id, date, skillId, phaseId, exercises, overallRating, duration, userNotes }]
  streak: { current: 0, longest: 0, lastWorkoutDate: null },
  undoHistory: [],
  settings: {
    sound: true,
    timerBeep: true,
  },
  dailyWorkout: {
    schedule: ['push', 'pull', 'legs', 'rest', 'upper', 'lower', 'rest'],
    currentDayIndex: 0,
    lastWorkoutDate: null,
    workoutHistory: [],   // [{ id, date, dayType, exercises, overallRating, duration }]
    totalSessions: 0,
  },
  version: 3,
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_STATE }

    const parsed = JSON.parse(raw)

    // Check if this is legacy state and migrate
    if (parsed && typeof parsed.currentIndex === 'number' && !parsed.version) {
      if (isLegacyState(parsed)) {
        const migrated = migrateState(parsed)
        saveState(migrated)
        return migrated
      }
    }

    return {
      ...DEFAULT_STATE,
      ...parsed,
      activeSkills: parsed.activeSkills || [],
      masteredSkills: parsed.masteredSkills || [],
      roadmapProgress: parsed.roadmapProgress || { highestUnlockedIndex: 0 },
      workoutHistory: parsed.workoutHistory || [],
      streak: parsed.streak || { current: 0, longest: 0, lastWorkoutDate: null },
      settings: { ...DEFAULT_STATE.settings, ...parsed.settings },
      undoHistory: parsed.undoHistory || [],
      dailyWorkout: { ...DEFAULT_STATE.dailyWorkout, ...(parsed.dailyWorkout || {}) },
      version: 3,
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
  a.download = `forma-backup-${now.toISOString().slice(0, 10)}.json`
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
