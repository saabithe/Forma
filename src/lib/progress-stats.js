import { getExercise } from '../data/exercises'
import { SKILLS } from '../data/curriculum'

/**
 * Merge both workout history arrays into a single normalized array sorted by date
 */
export function getCombinedHistory(state) {
  const skillSessions = (state.workoutHistory || []).map(s => ({
    date: s.date,
    source: 'skill',
    skillId: s.skillId,
    exercises: s.exercises || [],
    duration: s.duration || 0,
    overallRating: s.overallRating,
  }))

  const dailySessions = (state.dailyWorkout?.workoutHistory || []).map(s => ({
    date: s.date,
    source: 'daily',
    dayType: s.dayType,
    exercises: s.exercises || [],
    duration: s.duration || 0,
    overallRating: s.overallRating,
  }))

  return [...skillSessions, ...dailySessions].sort((a, b) => a.date.localeCompare(b.date))
}

/**
 * Build heatmap data: Map<YYYY-MM-DD, {count, intensity}>
 * intensity: 0=none, 1=light, 2=normal, 3=intense
 */
export function getHeatmapData(state, months = 12) {
  const history = getCombinedHistory(state)
  const map = new Map()

  // Initialize all dates in range
  const now = new Date()
  const start = new Date(now)
  start.setMonth(start.getMonth() - months)
  start.setDate(start.getDate() - start.getDay()) // align to Sunday

  for (let d = new Date(start); d <= now; d.setDate(d.getDate() + 1)) {
    map.set(formatDate(d), { count: 0, intensity: 0 })
  }

  // Fill in actual data
  for (const session of history) {
    const existing = map.get(session.date)
    if (existing) {
      existing.count += 1
      const exerciseCount = session.exercises.length
      const successRate = session.exercises.filter(e => e.performanceRating === 'success').length / Math.max(1, exerciseCount)
      const sessionIntensity = exerciseCount >= 5 && successRate >= 0.75 ? 3
        : exerciseCount >= 3 || successRate >= 0.5 ? 2
        : 1
      existing.intensity = Math.max(existing.intensity, sessionIntensity)
    }
  }

  return map
}

/**
 * Get per-session progress for a specific exercise
 * Returns [{date, actual, target, type}]
 */
export function getExerciseProgress(state, exerciseId) {
  const history = getCombinedHistory(state)
  const points = []

  for (const session of history) {
    for (const ex of session.exercises) {
      if (ex.exerciseId !== exerciseId) continue

      const exerciseDef = getExercise(exerciseId)
      const isHold = exerciseDef?.type === 'hold' || ex.sets?.[0]?.holdSeconds !== undefined

      // Find the best set in this session
      let bestActual = 0
      let bestTarget = 0
      for (const set of (ex.sets || [])) {
        if (isHold) {
          bestActual = Math.max(bestActual, set.holdSeconds || 0)
          bestTarget = Math.max(bestTarget, set.targetHoldSeconds || 0)
        } else {
          bestActual = Math.max(bestActual, set.reps || 0)
          bestTarget = Math.max(bestTarget, set.targetReps || 0)
        }
      }

      if (bestActual > 0 || bestTarget > 0) {
        points.push({
          date: session.date,
          actual: bestActual,
          target: bestTarget,
          type: isHold ? 'hold' : 'reps',
        })
      }
    }
  }

  return points
}

/**
 * Compute personal records for all exercises
 * Returns Map<exerciseId, {maxReps, maxHoldSeconds, bestCompletionRate, bestDate, totalSessions}>
 */
export function getPersonalRecords(state) {
  const history = getCombinedHistory(state)
  const records = new Map()

  for (const session of history) {
    for (const ex of session.exercises) {
      const id = ex.exerciseId
      if (!id) continue

      const existing = records.get(id) || {
        exerciseId: id,
        maxReps: 0,
        maxHoldSeconds: 0,
        bestCompletionRate: 0,
        bestDate: session.date,
        totalSessions: 0,
      }

      existing.totalSessions += 1

      const exerciseDef = getExercise(id)
      const isHold = exerciseDef?.type === 'hold' || ex.sets?.[0]?.holdSeconds !== undefined

      for (const set of (ex.sets || [])) {
        if (isHold) {
          if ((set.holdSeconds || 0) > existing.maxHoldSeconds) {
            existing.maxHoldSeconds = set.holdSeconds
            existing.bestDate = session.date
          }
        } else {
          if ((set.reps || 0) > existing.maxReps) {
            existing.maxReps = set.reps
            existing.bestDate = session.date
          }
        }
      }

      const completedSets = (ex.sets || []).filter(s => s.completed).length
      const totalSets = (ex.sets || []).length || 1
      const completionRate = completedSets / totalSets
      if (completionRate > existing.bestCompletionRate) {
        existing.bestCompletionRate = completionRate
      }

      records.set(id, existing)
    }
  }

  return records
}

/**
 * List all exercises the user has performed, with session counts
 * Returns [{exerciseId, name, type, sessionCount}]
 */
export function getExerciseList(state) {
  const records = getPersonalRecords(state)
  const list = []

  for (const [exerciseId, pr] of records) {
    const exerciseDef = getExercise(exerciseId)
    const skill = SKILLS.find(s => s.id === exerciseId)
    list.push({
      exerciseId,
      name: exerciseDef?.name || skill?.name || exerciseId,
      type: pr.maxHoldSeconds > 0 ? 'hold' : 'reps',
      sessionCount: pr.totalSessions,
    })
  }

  return list.sort((a, b) => b.sessionCount - a.sessionCount)
}

/**
 * Check if a specific exercise in a session set a new PR
 * Returns array of exerciseIds that are PRs
 */
export function getSessionPRs(state, sessionExercises) {
  const allRecords = getPersonalRecords(state)
  const prs = []

  for (const ex of (sessionExercises || [])) {
    const id = ex.exerciseId
    if (!id) continue
    const record = allRecords.get(id)
    if (!record) continue

    const exerciseDef = getExercise(id)
    const isHold = exerciseDef?.type === 'hold' || ex.sets?.[0]?.holdSeconds !== undefined

    for (const set of (ex.sets || [])) {
      if (isHold && (set.holdSeconds || 0) > record.maxHoldSeconds && set.holdSeconds > 0) {
        prs.push(id)
        break
      } else if (!isHold && (set.reps || 0) > record.maxReps && set.reps > 0) {
        prs.push(id)
        break
      }
    }
  }

  return prs
}

function formatDate(d) {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
