import { useMemo } from 'react'
import { getRoutine, getDifficultyLevel, DEFAULT_SCHEDULE } from '../data/daily-routines'
import { getExercise } from '../data/exercises'
import { estimateDuration } from '../lib/duration'
import { getTodayLocal } from '../lib/dates'

// Adjust a single prescription based on exercise history and routine progression config
function adjustFromHistory(prescription, exerciseHistory, progression) {
  if (!exerciseHistory || exerciseHistory.length === 0) return { ...prescription }

  const lastSession = exerciseHistory[0] // most recent
  const rating = lastSession.performanceRating

  // Use the routine's progression config, with sensible defaults
  const onSuccess = progression?.on_success?.adjustments || { reps: 2, holdSeconds: 5 }
  const onFail = progression?.on_fail?.adjustments || { reps: -2, holdSeconds: -5 }

  let repsAdj = 0
  let holdAdj = 0

  if (rating === 'success') {
    repsAdj = onSuccess.reps || 0
    holdAdj = onSuccess.holdSeconds || 0
  } else if (rating === 'fail') {
    repsAdj = onFail.reps || 0
    holdAdj = onFail.holdSeconds || 0
  }

  const adjusted = { ...prescription }
  if (prescription.type === 'hold') {
    adjusted.targetHoldSeconds = Math.max(3, (prescription.targetHoldSeconds || 10) + holdAdj)
  } else {
    adjusted.targetReps = Math.max(1, (prescription.targetReps || 8) + repsAdj)
  }

  return adjusted
}

export function useDailyWorkout(state) {
  return useMemo(() => {
    const daily = state?.dailyWorkout
    const schedule = daily?.schedule || DEFAULT_SCHEDULE
    const today = getTodayLocal() // YYYY-MM-DD

    // Schedule only advances on completion (recordDailyWorkout increments currentDayIndex)
    // No calendar-based advancement — missing a day doesn't skip anything
    const currentDayIndex = daily?.currentDayIndex ?? 0
    const completedToday = daily?.completedTodayDate === today

    // Build the current day's routine
    const dayType = schedule[currentDayIndex]
    const routine = getRoutine(dayType)

    // Also build the NEXT day's routine (for optional quests after completing today)
    const nextDayIndex = (currentDayIndex + 1) % schedule.length
    const nextDayType = schedule[nextDayIndex]
    const nextRoutine = getRoutine(nextDayType)

    if (!routine) return { todaysRoutine: null, dayType, dayIndex: currentDayIndex, isRestDay: true, completedToday: false }

    // Rest day — always mark as completed (auto-advance)
    if (routine.isRestDay) {
      const enrichedSuggestions = (routine.suggestions || []).map(item => {
        const exercise = getExercise(item.exerciseId)
        return {
          ...item,
          ...exercise,
          ...item.prescription,
        }
      })
      return {
        todaysRoutine: null,
        isRestDay: true,
        completedToday: true,
        dayType,
        dayIndex: currentDayIndex,
        routineName: routine.name,
        suggestions: enrichedSuggestions,
      }
    }

    // Workout day
    const totalSessions = daily?.totalSessions || 0
    const difficulty = getDifficultyLevel(totalSessions)

    const buildEnrichedExercises = (routineObj) => {
      const exerciseList = routineObj.exercises[difficulty] || routineObj.exercises.beginner
      const workoutHistory = daily?.workoutHistory || []

      return exerciseList.map(item => {
        const exercise = getExercise(item.exerciseId)
        const exerciseHistory = workoutHistory.filter(h =>
          h.exercises?.some(e => e.exerciseId === item.exerciseId)
        ).slice(0, 5)

        const lastSessionData = exerciseHistory[0]?.exercises?.find(e => e.exerciseId === item.exerciseId)
        const adjusted = adjustFromHistory(item.prescription, lastSessionData ? [lastSessionData] : [], routineObj.progression)

        return {
          ...adjusted,
          exerciseId: item.exerciseId,
          name: exercise?.name || item.exerciseId,
          execution: exercise?.execution || null,
          warmupNote: exercise?.warmupNote || null,
          targetMuscles: exercise?.targetMuscles || [],
          type: adjusted.type || item.prescription.type,
        }
      })
    }

    const buildWarmup = (routineObj) => {
      return (routineObj.warmup || []).map(id => {
        const exercise = getExercise(id)
        return exercise ? { exerciseId: id, name: exercise.name, type: exercise.type } : null
      }).filter(Boolean)
    }

    const enriched = buildEnrichedExercises(routine)
    const warmup = buildWarmup(routine)

    // Build optional next workout
    let optionalNext = null
    if (completedToday && nextRoutine && !nextRoutine.isRestDay) {
      const nextEnriched = buildEnrichedExercises(nextRoutine)
      const nextWarmup = buildWarmup(nextRoutine)
      optionalNext = {
        id: nextRoutine.id,
        name: nextRoutine.name,
        description: nextRoutine.description,
        emoji: nextRoutine.emoji,
        exercises: nextEnriched,
        warmup: nextWarmup,
        estimatedDuration: estimateDuration(nextEnriched),
        difficulty,
        nextDayIndex,
      }
    }

    return {
      todaysRoutine: {
        id: routine.id,
        name: routine.name,
        description: routine.description,
        emoji: routine.emoji,
        exercises: enriched,
        warmup,
        estimatedDuration: estimateDuration(enriched),
        difficulty,
      },
      isRestDay: false,
      completedToday,
      dayType,
      dayIndex: currentDayIndex,
      totalSessions,
      optionalNext,
    }
  }, [state?.dailyWorkout])
}
