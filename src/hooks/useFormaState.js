import { useState, useEffect, useCallback, useMemo } from 'react'
import { loadState, saveState } from '../lib/storage'
import { SKILLS } from '../data/curriculum'
import { useWorkoutEngine } from './useWorkoutEngine'
import { useProgression } from './useProgression'
import { useDailyWorkout } from './useDailyWorkout'
import { generateSessionId } from '../lib/progression'
import { rateExercisePerformance, rateWorkout } from '../lib/progression'

export function useFormaState() {
  const [state, setState] = useState(() => loadState())

  useEffect(() => {
    saveState(state)
  }, [state])

  // Sub-hooks
  const { todaysWorkouts } = useWorkoutEngine(state)
  const progression = useProgression(state, setState)
  const dailyWorkout = useDailyWorkout(state)

  // Computed values
  const totalSkills = SKILLS.length
  const masteredCount = (state.masteredSkills || []).length
  const activeCount = (state.activeSkills || []).length
  const progressPercent = totalSkills > 0 ? (masteredCount / totalSkills) * 100 : 0

  // Get the primary workout (first active skill)
  const primaryWorkout = todaysWorkouts[0] || null

  /**
   * Record a completed daily workout session
   */
  const recordDailyWorkout = useCallback((dayType, exerciseResults, duration) => {
    const exerciseRatings = exerciseResults.map(e => e.performanceRating)
    const overallRating = rateWorkout(exerciseRatings)

    const session = {
      id: generateSessionId(),
      date: new Date().toISOString().slice(0, 10),
      dayType,
      exercises: exerciseResults,
      overallRating,
      duration,
    }

    const today = new Date().toISOString().slice(0, 10)

    setState(prev => {
      const daily = prev.dailyWorkout || {}
      const newHistory = [...(daily.workoutHistory || []), session]
      const newTotalSessions = (daily.totalSessions || 0) + 1

      // Advance to next day in schedule
      const schedule = daily.schedule || ['push', 'pull', 'legs', 'rest', 'upper', 'lower', 'rest']
      const nextDayIndex = ((daily.currentDayIndex || 0) + 1) % schedule.length

      // Update streak
      const lastDate = prev.streak?.lastWorkoutDate
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
      let newStreak = { ...prev.streak }

      if (lastDate === today) {
        // Already worked out today
      } else if (lastDate === yesterday) {
        newStreak.current = (newStreak.current || 0) + 1
        newStreak.longest = Math.max(newStreak.longest || 0, newStreak.current)
        newStreak.lastWorkoutDate = today
      } else {
        newStreak.current = 1
        newStreak.longest = Math.max(newStreak.longest || 0, 1)
        newStreak.lastWorkoutDate = today
      }

      return {
        ...prev,
        dailyWorkout: {
          ...daily,
          workoutHistory: newHistory,
          totalSessions: newTotalSessions,
          currentDayIndex: nextDayIndex,
          lastWorkoutDate: today,
        },
        streak: newStreak,
      }
    })
  }, [])

  /**
   * Record a completed skill workout session
   */
  const recordWorkout = useCallback((skillId, phaseId, exerciseResults, duration) => {
    const exerciseRatings = exerciseResults.map(e => e.performanceRating)
    const overallRating = rateWorkout(exerciseRatings)

    const session = {
      id: generateSessionId(),
      date: new Date().toISOString().slice(0, 10),
      skillId,
      phaseId,
      exercises: exerciseResults,
      overallRating,
      duration,
      userNotes: '',
    }

    setState(prev => {
      const newHistory = [...(prev.workoutHistory || []), session]

      // Update streak
      const today = new Date().toISOString().slice(0, 10)
      const lastDate = prev.streak?.lastWorkoutDate
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
      let newStreak = { ...prev.streak }

      if (lastDate === today) {
        // Already worked out today, no change
      } else if (lastDate === yesterday) {
        newStreak.current = (newStreak.current || 0) + 1
        newStreak.longest = Math.max(newStreak.longest || 0, newStreak.current)
        newStreak.lastWorkoutDate = today
      } else {
        newStreak.current = 1
        newStreak.longest = Math.max(newStreak.longest || 0, 1)
        newStreak.lastWorkoutDate = today
      }

      return {
        ...prev,
        workoutHistory: newHistory,
        streak: newStreak,
      }
    })
  }, [])

  /**
   * Check and handle phase advancement after a workout
   */
  const checkAndAdvancePhase = useCallback((skillId) => {
    const shouldAdvance = progression.checkPhaseAdvance(skillId)
    if (shouldAdvance) {
      progression.advancePhase(skillId)
      return 'phase_advanced'
    }

    const levelUp = progression.checkLevelUp(skillId)
    if (levelUp.met) {
      progression.masterSkill(skillId)
      return 'skill_mastered'
    }

    return null
  }, [progression])

  /**
   * Update settings
   */
  const updateSettings = useCallback((patch) => {
    setState(prev => ({ ...prev, settings: { ...prev.settings, ...patch } }))
  }, [])

  /**
   * Reset all data
   */
  const resetAll = useCallback(() => {
    localStorage.removeItem('forma_state')
    setState(loadState())
  }, [])

  /**
   * Undo last action (simplified for new system)
   */
  const undoLast = useCallback(() => {
    setState(prev => {
      if (!prev.undoHistory || prev.undoHistory.length === 0) return prev
      const history = [...prev.undoHistory]
      const last = history.pop()
      return {
        ...prev,
        ...last.snapshot,
        undoHistory: history,
      }
    })
  }, [])

  /**
   * Get skill status: 'locked' | 'available' | 'active' | 'mastered'
   */
  const getSkillStatus = useCallback((skillIndex) => {
    const skill = SKILLS[skillIndex]
    if (!skill) return 'locked'

    const isMastered = (state.masteredSkills || []).some(m => m.skillId === skill.id)
    if (isMastered) return 'mastered'

    const isActive = (state.activeSkills || []).some(a => a.skillId === skill.id)
    if (isActive) return 'active'

    // Check if prerequisites are met (all previous skills mastered or index <= highest unlocked)
    const highestUnlocked = state.roadmapProgress?.highestUnlockedIndex ?? 0
    if (skillIndex <= highestUnlocked) return 'available'

    return 'locked'
  }, [state.masteredSkills, state.activeSkills, state.roadmapProgress])

  return {
    state,
    setState,

    // Computed
    totalSkills,
    masteredCount,
    activeCount,
    progressPercent,
    primaryWorkout,
    todaysWorkouts,

    // Daily workout
    dailyWorkout,

    // Actions
    recordDailyWorkout,
    recordWorkout,
    checkAndAdvancePhase,
    updateSettings,
    resetAll,
    undoLast,
    getSkillStatus,

    // Progression (re-exported)
    ...progression,
  }
}
