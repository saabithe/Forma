// State migration: converts old format to new format
// Old: { currentIndex, completedSkills: [{index, date}], sessions }
// New: { activeSkills, masteredSkills, workoutHistory, streak, ... }

import { SKILLS } from '../data/curriculum'

let idCounter = 0
function generateId() {
  return `legacy_${Date.now()}_${idCounter++}`
}

/**
 * Check if state is in the old format
 */
export function isLegacyState(state) {
  return (
    state &&
    typeof state.currentIndex === 'number' &&
    Array.isArray(state.completedSkills) &&
    (state.completedSkills.length === 0 || typeof state.completedSkills[0]?.index === 'number')
  )
}

/**
 * Migrate old state to new format
 */
export function migrateState(oldState) {
  const masteredSkills = (oldState.completedSkills || []).map(cs => {
    const skill = SKILLS[cs.index]
    return {
      skillId: skill?.id || `skill-${cs.index}`,
      masteredDate: cs.date,
    }
  })

  // Convert old sessions to new workoutHistory format
  const workoutHistory = (oldState.sessions || []).map(s => {
    const skill = SKILLS[s.skillIndex]
    return {
      id: generateId(),
      date: s.date,
      skillId: skill?.id || `skill-${s.skillIndex}`,
      phaseId: 'legacy',
      exercises: [],
      overallRating: s.completed ? 'success' : 'fail',
      duration: 0,
      userNotes: '',
    }
  })

  // Determine highest unlocked index
  let highestUnlockedIndex = oldState.currentIndex || 0
  for (const cs of (oldState.completedSkills || [])) {
    if (cs.index >= highestUnlockedIndex) {
      highestUnlockedIndex = cs.index + 1
    }
  }

  return {
    user: oldState.user || null,
    activeSkills: [],
    masteredSkills,
    roadmapProgress: {
      highestUnlockedIndex: Math.min(highestUnlockedIndex, SKILLS.length - 1),
    },
    workoutHistory,
    streak: {
      current: 0,
      longest: 0,
      lastWorkoutDate: null,
    },
    undoHistory: [],
    settings: oldState.settings || { sound: true, timerBeep: true },
    version: 2,
  }
}
