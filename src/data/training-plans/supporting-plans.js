// Training plans for Supporting/Mobility category skills

export const SUPPORTING_PLANS = [
  // ─── WRIST MOBILITY DRILLS ──────────────────────────────────
  {
    skillId: 'wrist-mobility-drills',
    phases: [
      {
        id: 'phase-1',
        name: 'Wrist Preparation',
        description: 'Build wrist endurance and mobility for hand-balancing and planche work',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 12, minSets: 2 },
        },
        exercises: [
          {
            exerciseId: 'wrist-circles',
            prescription: { type: 'reps', targetSets: 2, targetReps: 10, restSeconds: 30 },
            progression: {
              on_success: { action: 'maintain', adjustments: {} },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'maintain', adjustments: {} },
            },
          },
          {
            exerciseId: 'wrist-pushups',
            prescription: { type: 'reps', targetSets: 2, targetReps: 10, restSeconds: 30 },
            progression: {
              on_success: { action: 'maintain', adjustments: {} },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'maintain', adjustments: {} },
            },
          },
        ],
      },
    ],
    levelUpCriteria: {
      type: 'combined',
      criteria: [
        { metric: 'reps', minReps: 12, minSets: 2, consecutiveSessions: 3, phase: 'phase-1' },
      ],
    },
  },

  // ─── SCAPULAR ACTIVATION ────────────────────────────────────
  {
    skillId: 'scapular-activation',
    phases: [
      {
        id: 'phase-1',
        name: 'Scapular Control',
        description: 'Build shoulder blade awareness and control',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 12, minSets: 2 },
        },
        exercises: [
          {
            exerciseId: 'scapular-pulls',
            prescription: { type: 'reps', targetSets: 2, targetReps: 10, restSeconds: 45 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -2 } },
            },
          },
          {
            exerciseId: 'scapular-pushups',
            prescription: { type: 'reps', targetSets: 2, targetReps: 10, restSeconds: 45 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +2 } },
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
        { metric: 'reps', minReps: 12, minSets: 2, consecutiveSessions: 3, phase: 'phase-1' },
      ],
    },
  },

  // ─── SHOULDER MOBILITY SEQUENCE ─────────────────────────────
  {
    skillId: 'shoulder-mobility-sequence',
    phases: [
      {
        id: 'phase-1',
        name: 'Shoulder Prep',
        description: 'Full shoulder mobility for overhead work',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 12, minSets: 2 },
        },
        exercises: [
          {
            exerciseId: 'shoulder-dislocates',
            prescription: { type: 'reps', targetSets: 2, targetReps: 10, restSeconds: 30 },
            progression: {
              on_success: { action: 'maintain', adjustments: {} },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'maintain', adjustments: {} },
            },
          },
          {
            exerciseId: 'thoracic-rotation',
            prescription: { type: 'reps', targetSets: 2, targetReps: 8, restSeconds: 30, notes: 'Per side' },
            progression: {
              on_success: { action: 'maintain', adjustments: {} },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'maintain', adjustments: {} },
            },
          },
        ],
      },
    ],
    levelUpCriteria: {
      type: 'combined',
      criteria: [
        { metric: 'reps', minReps: 12, minSets: 2, consecutiveSessions: 3, phase: 'phase-1' },
      ],
    },
  },

  // ─── HIP FLEXOR STRETCHES ───────────────────────────────────
  {
    skillId: 'hip-flexor-stretches',
    phases: [
      {
        id: 'phase-1',
        name: 'Hip Flexor Mobility',
        description: 'Open hip flexors for L-sit, planche, and squat depth',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 8, minSets: 2 },
        },
        exercises: [
          {
            exerciseId: 'hip-flexor-stretches',
            prescription: { type: 'reps', targetSets: 2, targetReps: 8, restSeconds: 30, notes: 'Per side, hold each stretch 20-30 seconds' },
            progression: {
              on_success: { action: 'maintain', adjustments: {} },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'maintain', adjustments: {} },
            },
          },
          {
            exerciseId: 'hip-circles',
            prescription: { type: 'reps', targetSets: 2, targetReps: 8, restSeconds: 30, notes: 'Per side' },
            progression: {
              on_success: { action: 'maintain', adjustments: {} },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'maintain', adjustments: {} },
            },
          },
        ],
      },
    ],
    levelUpCriteria: {
      type: 'combined',
      criteria: [
        { metric: 'reps', minReps: 8, minSets: 2, consecutiveSessions: 3, phase: 'phase-1' },
      ],
    },
  },
]
