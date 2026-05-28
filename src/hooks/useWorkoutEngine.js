// Workout engine — generates today's workout from active skills + history
import { useMemo } from 'react'
import { getTrainingPlan } from '../data/training-plans'
import { computeSessionPrescriptions } from '../lib/progression'
import { getExercise } from '../data/exercises'
import { estimateDuration } from '../lib/duration'

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
