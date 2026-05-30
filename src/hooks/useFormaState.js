import { useState, useEffect, useCallback } from 'react'
import { loadState, saveState } from '../lib/storage'
import { SKILLS } from '../data/curriculum'
import { useWorkoutEngine } from './useWorkoutEngine'
import { useProgression } from './useProgression'
import { useDailyWorkout } from './useDailyWorkout'
import { generateSessionId, rateWorkout } from '../lib/progression'
import { getTrainingPlan } from '../data/training-plans'
import { checkPhaseCriteria, checkLevelUpCriteria } from '../lib/criteria'
import { getTodayLocal, getYesterdayLocal } from '../lib/dates'
import { DEFAULT_SCHEDULE } from '../data/daily-routines'

/**
 * Compute updated streak from previous streak state
 */
function computeStreak(prevStreak, today, yesterday) {
  const lastDate = prevStreak?.lastWorkoutDate
  const streak = { ...prevStreak }

  if (lastDate === today) {
    // Already worked out today — no change
  } else if (lastDate === yesterday) {
    streak.current = (streak.current || 0) + 1
    streak.longest = Math.max(streak.longest || 0, streak.current)
    streak.lastWorkoutDate = today
  } else {
    streak.current = 1
    streak.longest = Math.max(streak.longest || 0, 1)
    streak.lastWorkoutDate = today
  }

  return streak
}

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
      date: getTodayLocal(),
      dayType,
      exercises: exerciseResults,
      overallRating,
      duration,
    }

    const today = getTodayLocal()

    setState(prev => {
      const daily = prev.dailyWorkout || {}
      const newHistory = [...(daily.workoutHistory || []), session]
      const newTotalSessions = (daily.totalSessions || 0) + 1

      // Advance to next day in schedule
      const schedule = daily.schedule || DEFAULT_SCHEDULE
      const nextDayIndex = ((daily.currentDayIndex || 0) + 1) % schedule.length

      const newStreak = computeStreak(prev.streak, today, getYesterdayLocal())

      return {
        ...prev,
        dailyWorkout: {
          ...daily,
          workoutHistory: newHistory,
          totalSessions: newTotalSessions,
          currentDayIndex: nextDayIndex,
          lastWorkoutDate: today,
          completedTodayDate: today,
        },
        streak: newStreak,
      }
    })
  }, [])

  /**
   * Skip a rest day — advance to the next day without recording a workout
   */
  const skipRestDay = useCallback(() => {
    setState(prev => {
      const daily = prev.dailyWorkout || {}
      const schedule = daily.schedule || DEFAULT_SCHEDULE
      const nextDayIndex = ((daily.currentDayIndex || 0) + 1) % schedule.length
      return {
        ...prev,
        dailyWorkout: {
          ...daily,
          currentDayIndex: nextDayIndex,
        },
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
      date: getTodayLocal(),
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
      const today = getTodayLocal()
      const newStreak = computeStreak(prev.streak, today, getYesterdayLocal())

      return {
        ...prev,
        workoutHistory: newHistory,
        streak: newStreak,
      }
    })
  }, [])

  /**
   * Record a skill workout AND check phase advancement in a single state update.
   * This avoids the stale closure issue where checkAndAdvancePhase reads old history.
   * Returns a callback result: 'phase_advanced' | 'skill_mastered' | null
   */
  const recordSkillWorkoutAndCheck = useCallback((skillId, phaseId, exerciseResults, duration) => {
    const exerciseRatings = exerciseResults.map(e => e.performanceRating)
    const overallRating = rateWorkout(exerciseRatings)

    const session = {
      id: generateSessionId(),
      date: getTodayLocal(),
      skillId,
      phaseId,
      exercises: exerciseResults,
      overallRating,
      duration,
      userNotes: '',
    }

    let result = null

    setState(prev => {
      const newHistory = [...(prev.workoutHistory || []), session]

      const today = getTodayLocal()
      const newStreak = computeStreak(prev.streak, today, getYesterdayLocal())

      // Check phase advancement against the fresh history
      const freshState = { ...prev, workoutHistory: newHistory, streak: newStreak }

      const plan = getTrainingPlan(skillId)
      const activeSkill = freshState.activeSkills?.find(a => a.skillId === skillId)
      if (plan && activeSkill) {
        const currentPhase = plan.phases[activeSkill.currentPhaseIndex]

        // Check phase advance first
        if (currentPhase?.advanceCriteria) {
          const skillHistory = newHistory.filter(
            h => h.skillId === skillId && h.phaseId === currentPhase.id
          )
          const shouldAdvance = checkPhaseCriteria(currentPhase.advanceCriteria, skillHistory)
          if (shouldAdvance) {
            const nextIndex = activeSkill.currentPhaseIndex + 1
            if (nextIndex < plan.phases.length) {
              freshState.activeSkills = freshState.activeSkills.map(a =>
                a.skillId === skillId ? { ...a, currentPhaseIndex: nextIndex } : a
              )
              result = 'phase_advanced'
            }
          }
        }

        // Check level-up if in final phase and no phase advance happened
        if (!result && activeSkill.currentPhaseIndex >= plan.phases.length - 1) {
          const skillHistory = newHistory.filter(h => h.skillId === skillId)
          const levelUp = checkLevelUpCriteria(plan.levelUpCriteria, skillHistory, currentPhase?.id)
          if (levelUp.met) {
            freshState.activeSkills = freshState.activeSkills.filter(a => a.skillId !== skillId)
            freshState.masteredSkills = [
              ...(freshState.masteredSkills || []),
              { skillId, masteredDate: today },
            ]
            result = 'skill_mastered'
          }
        }
      }

      return freshState
    })

    return result
  }, [])

  /**
   * @deprecated Use recordSkillWorkoutAndCheck instead — this function reads stale state
   * and will produce wrong results if called after a setState without a re-render.
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
   * Complete the initial assessment and set starting point
   */
  const completeAssessment = useCallback((result) => {
    setState(prev => ({
      ...prev,
      user: { ...(prev.user || {}), assessed: true },
      roadmapProgress: {
        ...prev.roadmapProgress,
        highestUnlockedIndex: Math.max(prev.roadmapProgress?.highestUnlockedIndex ?? 0, result.startIndex ?? 0),
      },
    }))
  }, [])

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
    skipRestDay,
    recordWorkout,
    recordSkillWorkoutAndCheck,
    checkAndAdvancePhase,
    completeAssessment,
    updateSettings,
    resetAll,
    getSkillStatus,

    // Progression (re-exported)
    ...progression,
  }
}
