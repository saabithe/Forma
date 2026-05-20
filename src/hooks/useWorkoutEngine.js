// Workout engine — generates today's workout from active skills + history
import { useMemo } from 'react'
import { getTrainingPlan } from '../data/training-plans'
import { computeSessionPrescriptions } from '../lib/progression'
import { getExercise } from '../data/exercises'

/**
 * Generate today's workout for all active skills
 * @param {Object} state - The full app state
 * @returns {Array} Array of workout objects, one per active skill
 */
export function useWorkoutEngine(state) {
  const todaysWorkouts = useMemo(() => {
    if (!state.activeSkills || state.activeSkills.length === 0) return []

    return state.activeSkills.map(activeSkill => {
      const plan = getTrainingPlan(activeSkill.skillId)
      if (!plan) return null

      const phase = plan.phases[activeSkill.currentPhaseIndex]
      if (!phase) return null

      // Get workout history for this skill
      const skillHistory = (state.workoutHistory || []).filter(
        h => h.skillId === activeSkill.skillId
      )

      // Compute adjusted prescriptions based on history
      const prescriptions = computeSessionPrescriptions(phase.exercises, skillHistory)

      // Enrich with exercise definitions
      const exercises = prescriptions.map(prescription => {
        const exerciseDef = getExercise(prescription.exerciseId)
        return {
          ...prescription,
          name: exerciseDef?.name || prescription.exerciseId,
          execution: exerciseDef?.execution || null,
          warmupNote: exerciseDef?.warmupNote || null,
          targetMuscles: exerciseDef?.targetMuscles || [],
        }
      })

      return {
        skillId: activeSkill.skillId,
        phaseId: phase.id,
        phaseName: phase.name,
        phaseDescription: phase.description,
        exercises,
        estimatedDuration: estimateDuration(exercises),
      }
    }).filter(Boolean)
  }, [state.activeSkills, state.workoutHistory])

  return { todaysWorkouts }
}

/**
 * Estimate workout duration in minutes
 */
function estimateDuration(exercises) {
  let totalSeconds = 0
  for (const ex of exercises) {
    if (ex.type === 'hold') {
      // Hold time per set + rest between sets
      const holdTime = (ex.targetHoldSeconds || 10) * (ex.targetSets || 3)
      const restTime = (ex.restSeconds || 60) * ((ex.targetSets || 3) - 1)
      totalSeconds += holdTime + restTime
    } else {
      // Approximate 3 seconds per rep + rest between sets
      const repTime = (ex.targetReps || 10) * 3 * (ex.targetSets || 3)
      const restTime = (ex.restSeconds || 60) * ((ex.targetSets || 3) - 1)
      totalSeconds += repTime + restTime
    }
  }
  // Add 30s buffer for transitions
  totalSeconds += 30 * exercises.length
  return Math.ceil(totalSeconds / 60)
}
