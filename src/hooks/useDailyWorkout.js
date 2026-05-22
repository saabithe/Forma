import { useMemo } from 'react'
import { getRoutine, getDifficultyLevel, DEFAULT_SCHEDULE } from '../data/daily-routines'
import { getExercise } from '../data/exercises'

// Estimate duration for a set of exercises
function estimateDuration(exercises) {
  let totalSeconds = 0
  for (const ex of exercises) {
    if (ex.type === 'hold') {
      totalSeconds += ex.targetHoldSeconds * ex.targetSets + (ex.restSeconds || 60) * (ex.targetSets - 1)
    } else {
      totalSeconds += (ex.targetReps || 10) * 3 * ex.targetSets + (ex.restSeconds || 60) * (ex.targetSets - 1)
    }
    totalSeconds += 30 // transition time
  }
  return Math.round(totalSeconds / 60)
}

// Get the number of days between two dates
function daysBetween(dateStr1, dateStr2) {
  if (!dateStr1 || !dateStr2) return 0
  const d1 = new Date(dateStr1)
  const d2 = new Date(dateStr2)
  return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24))
}

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
    const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

    // Determine current day index by calendar progression
    let currentDayIndex = daily?.currentDayIndex ?? 0
    if (daily?.lastWorkoutDate) {
      const daysPassed = daysBetween(daily.lastWorkoutDate, today)
      if (daysPassed > 0) {
        currentDayIndex = (currentDayIndex + daysPassed) % schedule.length
      }
    }

    const dayType = schedule[currentDayIndex]
    const routine = getRoutine(dayType)

    if (!routine) return { todaysRoutine: null, dayType, dayIndex: currentDayIndex, isRestDay: true }

    // Rest day
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
        dayType,
        dayIndex: currentDayIndex,
        routineName: routine.name,
        suggestions: enrichedSuggestions,
      }
    }

    // Workout day
    const totalSessions = daily?.totalSessions || 0
    const difficulty = getDifficultyLevel(totalSessions)
    const exerciseList = routine.exercises[difficulty] || routine.exercises.beginner

    // Enrich exercises with definitions and adjust from history
    const workoutHistory = daily?.workoutHistory || []
    const enriched = exerciseList.map(item => {
      const exercise = getExercise(item.exerciseId)
      const exerciseHistory = workoutHistory.filter(h =>
        h.exercises?.some(e => e.exerciseId === item.exerciseId)
      ).slice(0, 5)

      // Extract last session's per-exercise data
      const lastSessionData = exerciseHistory[0]?.exercises?.find(e => e.exerciseId === item.exerciseId)
      const adjusted = adjustFromHistory(item.prescription, lastSessionData ? [lastSessionData] : [], routine.progression)

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

    // Enrich warmup
    const warmup = (routine.warmup || []).map(id => {
      const exercise = getExercise(id)
      return exercise ? { exerciseId: id, name: exercise.name, type: exercise.type } : null
    }).filter(Boolean)

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
      dayType,
      dayIndex: currentDayIndex,
      totalSessions,
    }
  }, [state?.dailyWorkout])
}
