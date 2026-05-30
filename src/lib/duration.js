/**
 * Estimate workout duration in minutes
 * @param {Array} exercises - Array of exercise objects with prescription data
 * @returns {number} Estimated duration in minutes
 */
export function estimateDuration(exercises) {
  if (!exercises || exercises.length === 0) return 0
  let totalSeconds = 0
  for (const ex of exercises) {
    const sets = ex.targetSets || 3
    const rest = ex.restSeconds || 60

    if (ex.type === 'hold') {
      const holdTime = (ex.targetHoldSeconds || 10) * sets
      const restTime = rest * (sets - 1)
      totalSeconds += holdTime + restTime
    } else {
      const repTime = (ex.targetReps || 10) * 3 * sets
      const restTime = rest * (sets - 1)
      totalSeconds += repTime + restTime
    }

    totalSeconds += 30 // transition time between exercises
  }
  return Math.ceil(totalSeconds / 60)
}
