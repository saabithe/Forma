// Exercise registry — combines all exercise types into a single lookup

import { HOLD_EXERCISES } from './holds'
import { REP_EXERCISES } from './reps'
import { MOBILITY_EXERCISES } from './mobility'

const ALL_EXERCISES = {
  ...HOLD_EXERCISES,
  ...REP_EXERCISES,
  ...MOBILITY_EXERCISES,
}

export function getExercise(id) {
  return ALL_EXERCISES[id] || null
}

export function getExercisesByType(type) {
  return Object.values(ALL_EXERCISES).filter(e => e.type === type)
}

export function getAllExercises() {
  return ALL_EXERCISES
}

export { HOLD_EXERCISES, REP_EXERCISES, MOBILITY_EXERCISES }
