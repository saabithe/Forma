// Default training plan generator
// Creates a fallback plan for skills that don't have custom training plans
// Uses the existing workout data from curriculum.js as seed

import { SKILLS } from '../curriculum'
import { getExercise } from '../exercises'

/**
 * Resolve exerciseId — use the skillId if it exists in the exercise registry,
 * otherwise try common patterns (singular, hyphenated variants)
 */
function resolveExerciseId(skillId) {
  if (getExercise(skillId)) return skillId
  // Try singular form (e.g., 'pull-ups' -> 'pull-up' or 'pullup-standard')
  const singular = skillId.replace(/s$/, '')
  if (getExercise(singular)) return singular
  // Try with -standard suffix
  if (getExercise(`${skillId}-standard`)) return `${skillId}-standard`
  // Try without trailing 's' and with -standard
  if (getExercise(`${singular}-standard`)) return `${singular}-standard`
  // Return the skillId as last resort — will produce a graceful "unknown exercise" display
  return skillId
}

export function generateDefaultPlan(skillId) {
  const skill = SKILLS.find(s => s.id === skillId)
  if (!skill || !skill.workout) return null

  const exerciseId = resolveExerciseId(skillId)

  const { workout } = skill

  if (workout.type === 'hold') {
    return {
      skillId,
      phases: [
        {
          id: 'phase-1',
          name: 'Foundation',
          description: `Build base hold capacity for ${skill.name}`,
          advanceCriteria: {
            type: 'consecutive_sessions',
            count: 3,
            condition: { metric: 'hold_seconds', minSeconds: workout.holdSeconds, minSets: workout.sets },
          },
          exercises: [
            {
              exerciseId,
              prescription: {
                type: 'hold',
                targetSets: workout.sets,
                targetHoldSeconds: Math.max(5, workout.holdSeconds - 10),
                restSeconds: workout.restSeconds,
              },
              progression: {
                on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +3 } },
                on_partial: { action: 'maintain', adjustments: {} },
                on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -3 } },
              },
            },
          ],
        },
        {
          id: 'phase-2',
          name: 'Building',
          description: `Increase hold time toward ${workout.holdSeconds} seconds`,
          advanceCriteria: {
            type: 'consecutive_sessions',
            count: 3,
            condition: { metric: 'hold_seconds', minSeconds: workout.holdSeconds + 5, minSets: workout.sets },
          },
          exercises: [
            {
              exerciseId,
              prescription: {
                type: 'hold',
                targetSets: workout.sets,
                targetHoldSeconds: workout.holdSeconds,
                restSeconds: workout.restSeconds,
              },
              progression: {
                on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +2 } },
                on_partial: { action: 'maintain', adjustments: {} },
                on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -3 } },
              },
            },
          ],
        },
      ],
      levelUpCriteria: {
        type: 'combined',
        criteria: [
          {
            metric: 'hold_seconds',
            minSeconds: workout.holdSeconds + 5,
            minSets: workout.sets,
            consecutiveSessions: 3,
            phase: 'phase-2',
          },
        ],
      },
    }
  }

  // Rep-based
  return {
    skillId,
    phases: [
      {
        id: 'phase-1',
        name: 'Foundation',
        description: `Build base strength for ${skill.name}`,
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: workout.reps, minSets: workout.sets },
        },
        exercises: [
          {
            exerciseId,
            prescription: {
              type: 'reps',
              targetSets: workout.sets,
              targetReps: Math.max(1, workout.reps - 3),
              restSeconds: workout.restSeconds,
            },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +1 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -2 } },
            },
          },
        ],
      },
      {
        id: 'phase-2',
        name: 'Building',
        description: `Increase reps toward ${workout.reps} per set`,
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: workout.reps + 2, minSets: workout.sets },
        },
        exercises: [
          {
            exerciseId,
            prescription: {
              type: 'reps',
              targetSets: workout.sets,
              targetReps: workout.reps,
              restSeconds: workout.restSeconds,
            },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +1 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -2 } },
            },
          },
        ],
      },
    ],
    levelUpCriteria: {
      type: 'combined',
      criteria: [
        {
          metric: 'reps',
          minReps: workout.reps + 2,
          minSets: workout.sets,
          consecutiveSessions: 3,
          phase: 'phase-2',
        },
      ],
    },
  }
}
