// Daily workout routines — PPL + Upper/Lower split
// Each day has exercise pools organized by tier (primary/secondary/finisher)
// The engine picks from these pools based on difficulty level and available time.

export const DAILY_ROUTINES = {
  push: {
    id: 'push',
    name: 'Push Day',
    description: 'Chest, shoulders, triceps',
    emoji: '🫸',
    targetDuration: 35,
    warmup: ['wrist-mobility-drills', 'shoulder-dislocates', 'scapular-pushups'],
    exercises: {
      beginner: [
        // 3-4 exercises, ~30 min
        { exerciseId: 'incline-pushups', prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 60 } },
        { exerciseId: 'pushup-standard', prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 60 } },
        { exerciseId: 'pike-pushups', prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 60 } },
        { exerciseId: 'box-dips', prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 60 } },
      ],
      intermediate: [
        // 5 exercises, ~35 min
        { exerciseId: 'pushup-standard', prescription: { type: 'reps', targetSets: 4, targetReps: 12, restSeconds: 60 } },
        { exerciseId: 'decline-pushups', prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 60 } },
        { exerciseId: 'pike-pushups', prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 60 } },
        { exerciseId: 'dips', prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 90 } },
        { exerciseId: 'bench-dips', prescription: { type: 'reps', targetSets: 3, targetReps: 12, restSeconds: 60 } },
      ],
      advanced: [
        // 5-6 exercises, ~40 min
        { exerciseId: 'pushup-standard', prescription: { type: 'reps', targetSets: 4, targetReps: 15, restSeconds: 45 } },
        { exerciseId: 'decline-pushups', prescription: { type: 'reps', targetSets: 4, targetReps: 12, restSeconds: 60 } },
        { exerciseId: 'dips', prescription: { type: 'reps', targetSets: 4, targetReps: 12, restSeconds: 90 } },
        { exerciseId: 'pike-pushups', prescription: { type: 'reps', targetSets: 3, targetReps: 12, restSeconds: 60 } },
        { exerciseId: 'bench-dips', prescription: { type: 'reps', targetSets: 3, targetReps: 15, restSeconds: 45 } },
        { exerciseId: 'basic-plank', prescription: { type: 'hold', targetSets: 2, targetHoldSeconds: 45, restSeconds: 45 } },
      ],
    },
    progression: {
      on_success: { action: 'increase_difficulty', adjustments: { reps: 2, holdSeconds: 5 } },
      on_partial: { action: 'maintain', adjustments: {} },
      on_fail:    { action: 'decrease_difficulty', adjustments: { reps: -2, holdSeconds: -5 } },
    },
  },

  pull: {
    id: 'pull',
    name: 'Pull Day',
    description: 'Back, biceps, grip',
    emoji: '🫷',
    targetDuration: 35,
    warmup: ['wrist-mobility-drills', 'cat-cow', 'scapular-pulls'],
    exercises: {
      beginner: [
        // Can't do pull-ups yet — focus on hanging and scapular work
        { exerciseId: 'passive-hang', prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 20, restSeconds: 60 } },
        { exerciseId: 'active-hang', prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 10, restSeconds: 60 } },
        { exerciseId: 'scapular-pulls', prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 60 } },
        { exerciseId: 'superman-hold', prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 15, restSeconds: 45 } },
      ],
      intermediate: [
        { exerciseId: 'pullup-standard', prescription: { type: 'reps', targetSets: 4, targetReps: 6, restSeconds: 90 } },
        { exerciseId: 'chin-up', prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 90 } },
        { exerciseId: 'scapular-pulls', prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 60 } },
        { exerciseId: 'active-hang', prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 20, restSeconds: 60 } },
        { exerciseId: 'superman-hold', prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 20, restSeconds: 45 } },
      ],
      advanced: [
        { exerciseId: 'pullup-standard', prescription: { type: 'reps', targetSets: 4, targetReps: 10, restSeconds: 90 } },
        { exerciseId: 'chin-up', prescription: { type: 'reps', targetSets: 4, targetReps: 10, restSeconds: 90 } },
        { exerciseId: 'scapular-pulls', prescription: { type: 'reps', targetSets: 3, targetReps: 12, restSeconds: 60 } },
        { exerciseId: 'toes-to-bar', prescription: { type: 'reps', targetSets: 3, targetReps: 6, restSeconds: 90 } },
        { exerciseId: 'active-hang', prescription: { type: 'hold', targetSets: 2, targetHoldSeconds: 30, restSeconds: 60 } },
        { exerciseId: 'arch-body-hold', prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 20, restSeconds: 45 } },
      ],
    },
    progression: {
      on_success: { action: 'increase_difficulty', adjustments: { reps: 1, holdSeconds: 5 } },
      on_partial: { action: 'maintain', adjustments: {} },
      on_fail:    { action: 'decrease_difficulty', adjustments: { reps: -1, holdSeconds: -5 } },
    },
  },

  legs: {
    id: 'legs',
    name: 'Leg Day',
    description: 'Quads, hamstrings, glutes, calves, core',
    emoji: '🦵',
    targetDuration: 35,
    warmup: ['ankle-circles', 'hip-circles', 'hip-flexor-stretches'],
    exercises: {
      beginner: [
        { exerciseId: 'bodyweight-squat', prescription: { type: 'reps', targetSets: 3, targetReps: 12, restSeconds: 60 } },
        { exerciseId: 'lunges', prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 60 } },
        { exerciseId: 'glute-bridge-reps', prescription: { type: 'reps', targetSets: 3, targetReps: 12, restSeconds: 45 } },
        { exerciseId: 'dead-bugs', prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 45 } },
      ],
      intermediate: [
        { exerciseId: 'bodyweight-squat', prescription: { type: 'reps', targetSets: 4, targetReps: 15, restSeconds: 60 } },
        { exerciseId: 'lunges', prescription: { type: 'reps', targetSets: 3, targetReps: 12, restSeconds: 60 } },
        { exerciseId: 'jumping-squats', prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 60 } },
        { exerciseId: 'glute-bridge-reps', prescription: { type: 'reps', targetSets: 3, targetReps: 15, restSeconds: 45 } },
        { exerciseId: 'dead-bugs', prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 45 } },
      ],
      advanced: [
        { exerciseId: 'jumping-squats', prescription: { type: 'reps', targetSets: 4, targetReps: 12, restSeconds: 60 } },
        { exerciseId: 'jumping-lunges', prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 60 } },
        { exerciseId: 'pistol-squat-assisted', prescription: { type: 'reps', targetSets: 3, targetReps: 5, restSeconds: 90 } },
        { exerciseId: 'bodyweight-squat', prescription: { type: 'reps', targetSets: 3, targetReps: 20, restSeconds: 45 } },
        { exerciseId: 'glute-bridge-reps', prescription: { type: 'reps', targetSets: 3, targetReps: 20, restSeconds: 45 } },
        { exerciseId: 'leg-raises', prescription: { type: 'reps', targetSets: 3, targetReps: 12, restSeconds: 45 } },
      ],
    },
    progression: {
      on_success: { action: 'increase_difficulty', adjustments: { reps: 2, holdSeconds: 5 } },
      on_partial: { action: 'maintain', adjustments: {} },
      on_fail:    { action: 'decrease_difficulty', adjustments: { reps: -2, holdSeconds: -5 } },
    },
  },

  upper: {
    id: 'upper',
    name: 'Upper Body',
    description: 'Push + pull combined, lighter volume',
    emoji: '💪',
    targetDuration: 35,
    warmup: ['wrist-mobility-drills', 'shoulder-dislocates', 'scapular-pushups'],
    exercises: {
      beginner: [
        { exerciseId: 'incline-pushups', prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 60 } },
        { exerciseId: 'scapular-pulls', prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 60 } },
        { exerciseId: 'passive-hang', prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 20, restSeconds: 60 } },
        { exerciseId: 'pike-pushups', prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 60 } },
      ],
      intermediate: [
        { exerciseId: 'pushup-standard', prescription: { type: 'reps', targetSets: 3, targetReps: 12, restSeconds: 60 } },
        { exerciseId: 'pullup-standard', prescription: { type: 'reps', targetSets: 3, targetReps: 6, restSeconds: 90 } },
        { exerciseId: 'dips', prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 90 } },
        { exerciseId: 'chin-up', prescription: { type: 'reps', targetSets: 3, targetReps: 6, restSeconds: 90 } },
        { exerciseId: 'basic-plank', prescription: { type: 'hold', targetSets: 2, targetHoldSeconds: 30, restSeconds: 45 } },
      ],
      advanced: [
        { exerciseId: 'pushup-standard', prescription: { type: 'reps', targetSets: 3, targetReps: 15, restSeconds: 45 } },
        { exerciseId: 'pullup-standard', prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 90 } },
        { exerciseId: 'dips', prescription: { type: 'reps', targetSets: 3, targetReps: 12, restSeconds: 90 } },
        { exerciseId: 'chin-up', prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 90 } },
        { exerciseId: 'hollow-body-hold', prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 20, restSeconds: 45 } },
      ],
    },
    progression: {
      on_success: { action: 'increase_difficulty', adjustments: { reps: 1, holdSeconds: 5 } },
      on_partial: { action: 'maintain', adjustments: {} },
      on_fail:    { action: 'decrease_difficulty', adjustments: { reps: -1, holdSeconds: -5 } },
    },
  },

  lower: {
    id: 'lower',
    name: 'Lower + Core',
    description: 'Legs and core, different exercises than leg day',
    emoji: '🏋️',
    targetDuration: 35,
    warmup: ['ankle-circles', 'hip-circles', 'cat-cow'],
    exercises: {
      beginner: [
        { exerciseId: 'glute-bridge-reps', prescription: { type: 'reps', targetSets: 3, targetReps: 12, restSeconds: 45 } },
        { exerciseId: 'lunges', prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 60 } },
        { exerciseId: 'dead-bugs', prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 45 } },
        { exerciseId: 'basic-plank', prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 20, restSeconds: 45 } },
        { exerciseId: 'leg-raises', prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 45 } },
      ],
      intermediate: [
        { exerciseId: 'jumping-lunges', prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 60 } },
        { exerciseId: 'glute-bridge-reps', prescription: { type: 'reps', targetSets: 3, targetReps: 15, restSeconds: 45 } },
        { exerciseId: 'leg-raises', prescription: { type: 'reps', targetSets: 3, targetReps: 12, restSeconds: 45 } },
        { exerciseId: 'dead-bugs', prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 45 } },
        { exerciseId: 'hollow-body-hold', prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 15, restSeconds: 45 } },
      ],
      advanced: [
        { exerciseId: 'pistol-squat-assisted', prescription: { type: 'reps', targetSets: 3, targetReps: 6, restSeconds: 90 } },
        { exerciseId: 'jumping-lunges', prescription: { type: 'reps', targetSets: 4, targetReps: 12, restSeconds: 60 } },
        { exerciseId: 'toes-to-bar', prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 90 } },
        { exerciseId: 'leg-raises', prescription: { type: 'reps', targetSets: 3, targetReps: 15, restSeconds: 45 } },
        { exerciseId: 'hollow-body-hold', prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 25, restSeconds: 45 } },
        { exerciseId: 'dragon-flag', prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 10, restSeconds: 90 } },
      ],
    },
    progression: {
      on_success: { action: 'increase_difficulty', adjustments: { reps: 2, holdSeconds: 5 } },
      on_partial: { action: 'maintain', adjustments: {} },
      on_fail:    { action: 'decrease_difficulty', adjustments: { reps: -2, holdSeconds: -5 } },
    },
  },

  rest: {
    id: 'rest',
    name: 'Rest Day',
    description: 'Recovery and mobility',
    emoji: '🧘',
    isRestDay: true,
    suggestions: [
      { exerciseId: 'cat-cow', prescription: { type: 'reps', targetSets: 2, targetReps: 10, restSeconds: 0 } },
      { exerciseId: 'hip-flexor-stretches', prescription: { type: 'reps', targetSets: 2, targetReps: 8, restSeconds: 0 } },
      { exerciseId: 'thoracic-rotation', prescription: { type: 'reps', targetSets: 2, targetReps: 8, restSeconds: 0 } },
      { exerciseId: 'ankle-circles', prescription: { type: 'reps', targetSets: 2, targetReps: 10, restSeconds: 0 } },
      { exerciseId: 'neck-circles', prescription: { type: 'reps', targetSets: 2, targetReps: 10, restSeconds: 0 } },
    ],
  },
}

// Default 7-day schedule
export const DEFAULT_SCHEDULE = ['push', 'pull', 'legs', 'rest', 'upper', 'lower', 'rest']

// Map difficulty levels to total session thresholds
export function getDifficultyLevel(totalSessions) {
  if (totalSessions <= 15) return 'beginner'
  if (totalSessions <= 40) return 'intermediate'
  return 'advanced'
}

// Get a routine by day type
export function getRoutine(dayType) {
  return DAILY_ROUTINES[dayType] || null
}
