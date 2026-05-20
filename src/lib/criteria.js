// Criteria evaluation engine
// Checks phase advancement and skill level-up conditions

/**
 * Check if a phase's advance criteria is met
 * @param {Object} criteria - The advanceCriteria from a training plan phase
 * @param {Array} workoutHistory - Workout history for this skill
 * @returns {boolean}
 */
export function checkPhaseCriteria(criteria, workoutHistory) {
  if (!criteria || !workoutHistory) return false

  if (criteria.type === 'consecutive_sessions') {
    return checkConsecutiveSessions(criteria, workoutHistory)
  }

  if (criteria.type === 'performance_threshold') {
    return checkPerformanceThreshold(criteria, workoutHistory)
  }

  return false
}

/**
 * Check if level-up criteria are met for a skill
 * @param {Object} levelUpCriteria - The levelUpCriteria from a training plan
 * @param {Array} workoutHistory - Workout history for this skill
 * @param {string} currentPhaseId - The current phase ID
 * @returns {{ met: boolean, progress: Array }}
 */
export function checkLevelUpCriteria(levelUpCriteria, workoutHistory, currentPhaseId) {
  if (!levelUpCriteria || !levelUpCriteria.criteria) {
    return { met: false, progress: [] }
  }

  const progress = levelUpCriteria.criteria.map(criterion => {
    // Filter history to the relevant phase if specified
    const relevantHistory = criterion.phase
      ? workoutHistory.filter(h => h.phaseId === criterion.phase)
      : workoutHistory

    const count = criterion.consecutiveSessions || 3
    const recent = relevantHistory.slice(-count)

    if (recent.length < count) {
      return {
        ...criterion,
        met: false,
        current: recent.length,
        needed: count,
        description: getCriterionDescription(criterion),
      }
    }

    const allMet = recent.every(session => checkCriterionInSession(criterion, session))

    return {
      ...criterion,
      met: allMet,
      current: allMet ? count : countConsecutiveMet(criterion, relevantHistory),
      needed: count,
      description: getCriterionDescription(criterion),
    }
  })

  return {
    met: progress.every(p => p.met),
    progress,
  }
}

// ─── Internal helpers ────────────────────────────────────────

function checkConsecutiveSessions(criteria, workoutHistory) {
  const count = criteria.count || 3
  const recent = workoutHistory.slice(-count)

  if (recent.length < count) return false

  return recent.every(session => {
    return session.exercises?.some(ex => meetsCondition(ex, criteria.condition))
  })
}

function checkPerformanceThreshold(criteria, workoutHistory) {
  const count = criteria.condition?.consecutiveSessions || 3
  const recent = workoutHistory.slice(-count)

  if (recent.length < count) return false

  return recent.every(session => {
    return session.exercises?.some(ex => meetsCondition(ex, criteria.condition))
  })
}

function meetsCondition(exerciseResult, condition) {
  if (!condition) return false

  if (condition.metric === 'hold_seconds') {
    const completedSets = (exerciseResult.sets || []).filter(
      s => s.completed && s.holdSeconds >= condition.minSeconds
    )
    return completedSets.length >= (condition.minSets || 1)
  }

  if (condition.metric === 'reps') {
    const completedSets = (exerciseResult.sets || []).filter(
      s => s.completed && s.reps >= condition.minReps
    )
    return completedSets.length >= (condition.minSets || 1)
  }

  return false
}

function checkCriterionInSession(criterion, session) {
  if (!session.exercises) return false

  if (criterion.metric === 'hold_seconds') {
    return session.exercises.some(ex => {
      const completedSets = (ex.sets || []).filter(
        s => s.completed && s.holdSeconds >= criterion.minSeconds
      )
      return completedSets.length >= (criterion.minSets || 1)
    })
  }

  if (criterion.metric === 'reps') {
    return session.exercises.some(ex => {
      const completedSets = (ex.sets || []).filter(
        s => s.completed && s.reps >= criterion.minReps
      )
      return completedSets.length >= (criterion.minSets || 1)
    })
  }

  if (criterion.metric === 'form_quality' && criterion.selfReported) {
    return session.exercises?.some(ex => ex.formQualityMet === true)
  }

  return false
}

function countConsecutiveMet(criterion, history) {
  let count = 0
  for (let i = history.length - 1; i >= 0; i--) {
    if (checkCriterionInSession(criterion, history[i])) {
      count++
    } else {
      break
    }
  }
  return count
}

function getCriterionDescription(criterion) {
  if (criterion.description) return criterion.description

  if (criterion.metric === 'hold_seconds') {
    return `Hold ${criterion.minSeconds}s for ${criterion.minSets} sets × ${criterion.consecutiveSessions || 3} sessions`
  }
  if (criterion.metric === 'reps') {
    return `${criterion.minReps} reps for ${criterion.minSets} sets × ${criterion.consecutiveSessions || 3} sessions`
  }
  if (criterion.metric === 'form_quality') {
    return `Form quality confirmed × ${criterion.consecutiveSessions || 3} sessions`
  }
  return 'Meet criteria'
}
