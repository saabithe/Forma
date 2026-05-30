// Pure functions for workout progression calculations
// These compute adjusted prescriptions based on performance history

/**
 * Rate a single exercise's performance based on set results
 * @param {Array} setResults - Array of { completed, holdSeconds?, reps?, targetHoldSeconds?, targetReps? }
 * @returns {'success' | 'partial' | 'fail'}
 */
export function rateExercisePerformance(setResults) {
  if (!setResults || setResults.length === 0) return 'fail'

  const completedSets = setResults.filter(s => s.completed)
  const totalSets = setResults.length
  const ratio = completedSets.length / totalSets

  if (ratio >= 1) return 'success'
  if (ratio >= 0.66) return 'partial' // 2/3 or better
  return 'fail'
}

/**
 * Rate the overall workout based on individual exercise ratings
 * @param {Array} exerciseRatings - Array of 'success' | 'partial' | 'fail'
 * @returns {'success' | 'partial' | 'fail'}
 */
export function rateWorkout(exerciseRatings) {
  if (!exerciseRatings || exerciseRatings.length === 0) return 'fail'

  const successes = exerciseRatings.filter(r => r === 'success').length
  const ratio = successes / exerciseRatings.length

  if (ratio >= 0.75) return 'success'
  if (ratio >= 0.5) return 'partial'
  return 'fail'
}

/**
 * Compute adjusted prescription for an exercise based on progression rules and history
 * @param {Object} basePrescription - The base prescription from the training plan
 * @param {Object} progressionRules - { on_success, on_partial, on_fail } with adjustments
 * @param {Array} recentHistory - Array of past exercise results (most recent last)
 * @returns {Object} Adjusted prescription
 */
export function computeAdjustedPrescription(basePrescription, progressionRules, recentHistory) {
  // First session: use base prescription
  if (!recentHistory || recentHistory.length === 0) {
    return { ...basePrescription }
  }

  // Look at the last session's performance
  const lastSession = recentHistory[recentHistory.length - 1]
  const lastRating = lastSession.performanceRating

  // Get the adjustment based on performance
  let rule
  if (lastRating === 'success') {
    rule = progressionRules.on_success
  } else if (lastRating === 'partial') {
    rule = progressionRules.on_partial
  } else {
    rule = progressionRules.on_fail
  }

  const adjustment = rule?.adjustments || {}

  // Apply adjustment to the last session's ACTUAL targets (not the base)
  // Targets are stored inside each set entry, so extract from the last set
  if (basePrescription.type === 'hold') {
    const lastSet = lastSession.sets?.[lastSession.sets.length - 1]
    const lastTarget = lastSet?.targetHoldSeconds || basePrescription.targetHoldSeconds
    const newTarget = Math.max(3, lastTarget + (adjustment.holdSeconds || 0))
    return {
      ...basePrescription,
      targetHoldSeconds: newTarget,
    }
  }

  if (basePrescription.type === 'reps') {
    const lastSet = lastSession.sets?.[lastSession.sets.length - 1]
    const lastTarget = lastSet?.targetReps || basePrescription.targetReps
    const newTarget = Math.max(1, lastTarget + (adjustment.reps || 0))
    return {
      ...basePrescription,
      targetReps: newTarget,
    }
  }

  return { ...basePrescription }
}

/**
 * Compute the next session's prescriptions for all exercises in a phase
 * @param {Array} phaseExercises - Exercises from the training plan phase
 * @param {Array} workoutHistory - Full workout history for this skill
 * @returns {Array} Adjusted prescriptions with exerciseId
 */
export function computeSessionPrescriptions(phaseExercises, workoutHistory) {
  return phaseExercises.map(exercise => {
    // Get history for this specific exercise
    const exerciseHistory = workoutHistory
      .flatMap(h => h.exercises || [])
      .filter(e => e.exerciseId === exercise.exerciseId)
      .slice(-5) // Last 5 sessions

    const adjusted = computeAdjustedPrescription(
      exercise.prescription,
      exercise.progression,
      exerciseHistory
    )

    return {
      ...adjusted,
      exerciseId: exercise.exerciseId,
    }
  })
}

/**
 * Generate a unique session ID
 */
export function generateSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}
