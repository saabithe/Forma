// Training plans for Elite category skills

export const ELITE_PLANS = [
  // ─── ONE-ARM CHIN-UP ────────────────────────────────────────
  {
    skillId: 'one-arm-chin-up',
    phases: [
      {
        id: 'phase-1',
        name: 'One-Arm Chin-up Prep',
        description: 'Build extreme pulling strength with assisted variations',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 3, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'pullup-standard',
            prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 90, notes: 'Weighted if possible, or archer pull-ups' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +1 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -1 } },
            },
          },
          {
            exerciseId: 'active-hang',
            prescription: { type: 'hold', targetSets: 2, targetHoldSeconds: 20, restSeconds: 60, notes: 'One-arm active hang (assisted with other hand on wrist)' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +3 } },
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
        { metric: 'reps', minReps: 3, minSets: 3, consecutiveSessions: 3, phase: 'phase-1' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Full dead hang to chin over bar on one arm, no kipping, controlled' },
      ],
    },
  },

  // ─── WEIGHTED MUSCLE-UPS ────────────────────────────────────
  {
    skillId: 'weighted-muscle-ups',
    phases: [
      {
        id: 'phase-1',
        name: 'Weighted Muscle-up Training',
        description: 'Add resistance to muscle-ups progressively',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 3, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'pullup-standard',
            prescription: { type: 'reps', targetSets: 3, targetReps: 5, restSeconds: 120, notes: 'Weighted pull-ups — add 5-10 lbs' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +1 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -1 } },
            },
          },
          {
            exerciseId: 'dips',
            prescription: { type: 'reps', targetSets: 3, targetReps: 5, restSeconds: 120, notes: 'Weighted dips — add 5-10 lbs' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +1 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -1 } },
            },
          },
        ],
      },
    ],
    levelUpCriteria: {
      type: 'combined',
      criteria: [
        { metric: 'reps', minReps: 3, minSets: 3, consecutiveSessions: 3, phase: 'phase-1' },
      ],
    },
  },
]
