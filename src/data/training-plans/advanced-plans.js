// Training plans for Advanced category skills

export const ADVANCED_PLANS = [
  // ─── FRONT LEVER ────────────────────────────────────────────
  {
    skillId: 'front-lever',
    phases: [
      {
        id: 'phase-1',
        name: 'Tuck Front Lever',
        description: 'Build lat and core strength with tucked variation',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 8, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'front-lever',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 5, restSeconds: 120, notes: 'Tuck variation: knees pulled to chest' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -2 } },
            },
          },
          {
            exerciseId: 'active-hang',
            prescription: { type: 'hold', targetSets: 2, targetHoldSeconds: 15, restSeconds: 60 },
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
        name: 'Advanced Tuck Front Lever',
        description: 'Extend hips while keeping knees tucked',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 8, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'front-lever',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 5, restSeconds: 120, notes: 'Advanced tuck: hips extended, knees still tucked' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -2 } },
            },
          },
        ],
      },
      {
        id: 'phase-3',
        name: 'Straddle Front Lever',
        description: 'Extend legs into straddle position',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 6, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'front-lever',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 4, restSeconds: 120, notes: 'Straddle variation: legs extended but spread apart' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +1 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -1 } },
            },
          },
        ],
      },
    ],
    levelUpCriteria: {
      type: 'combined',
      criteria: [
        { metric: 'hold_seconds', minSeconds: 6, minSets: 3, consecutiveSessions: 3, phase: 'phase-3' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Body parallel to ground, arms straight, no hip sag' },
      ],
    },
  },

  // ─── BACK LEVER ─────────────────────────────────────────────
  {
    skillId: 'back-lever',
    phases: [
      {
        id: 'phase-1',
        name: 'Tuck Back Lever',
        description: 'Learn the rotation and build strength with tucked variation',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 8, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'back-lever',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 5, restSeconds: 120, notes: 'Tuck variation: knees pulled to chest, underhand grip' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -2 } },
            },
          },
          {
            exerciseId: 'german-hang',
            prescription: { type: 'hold', targetSets: 2, targetHoldSeconds: 10, restSeconds: 90, notes: 'Just the rotation portion — hang behind the bar' },
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
        name: 'Advanced Tuck Back Lever',
        description: 'Extend hips while keeping knees tucked',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 8, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'back-lever',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 5, restSeconds: 120, notes: 'Advanced tuck: hips extended, knees tucked' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -2 } },
            },
          },
        ],
      },
    ],
    levelUpCriteria: {
      type: 'combined',
      criteria: [
        { metric: 'hold_seconds', minSeconds: 8, minSets: 3, consecutiveSessions: 3, phase: 'phase-2' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Underhand grip, body parallel to ground, arms straight' },
      ],
    },
  },

  // ─── FULL PLANCHE ───────────────────────────────────────────
  {
    skillId: 'full-planche',
    phases: [
      {
        id: 'phase-1',
        name: 'Tuck Planche',
        description: 'Build planche strength with tucked variation',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 8, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'planche-lean',
            prescription: { type: 'hold', targetSets: 2, targetHoldSeconds: 12, restSeconds: 90 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -2 } },
            },
          },
          {
            exerciseId: 'elbow-lever',
            prescription: { type: 'hold', targetSets: 2, targetHoldSeconds: 5, restSeconds: 90 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -2 } },
            },
          },
        ],
      },
    ],
    levelUpCriteria: {
      type: 'combined',
      criteria: [
        { metric: 'hold_seconds', minSeconds: 8, minSets: 3, consecutiveSessions: 3, phase: 'phase-1' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Tuck planche hold with arms locked, scapulae protracted, hips at shoulder height' },
      ],
    },
  },

  // ─── HUMAN FLAG ─────────────────────────────────────────────
  {
    skillId: 'human-flag',
    phases: [
      {
        id: 'phase-1',
        name: 'Flag Prep',
        description: 'Build pulling and pushing strength for flag position',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 5, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'pullup-standard',
            prescription: { type: 'reps', targetSets: 3, targetReps: 5, restSeconds: 90 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +1 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -1 } },
            },
          },
          {
            exerciseId: 'dips',
            prescription: { type: 'reps', targetSets: 3, targetReps: 5, restSeconds: 90 },
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
        { metric: 'hold_seconds', minSeconds: 5, minSets: 3, consecutiveSessions: 3, phase: 'phase-1' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Body horizontal, arms straight, core fully engaged' },
      ],
    },
  },

  // ─── MUSCLE-UPS ─────────────────────────────────────────────
  {
    skillId: 'muscle-ups',
    phases: [
      {
        id: 'phase-1',
        name: 'Muscle-up Progression',
        description: 'Build transition strength with pull-up and dip combo',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 3, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'pullup-standard',
            prescription: { type: 'reps', targetSets: 3, targetReps: 5, restSeconds: 90, notes: 'High pull-ups — pull as high as possible, aim for chest to bar' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +1 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -1 } },
            },
          },
          {
            exerciseId: 'dips',
            prescription: { type: 'reps', targetSets: 3, targetReps: 5, restSeconds: 90 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +1 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -1 } },
            },
          },
          {
            exerciseId: 'support-hold',
            prescription: { type: 'hold', targetSets: 2, targetHoldSeconds: 15, restSeconds: 60 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +5 } },
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
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Clean transition from pull-up to dip, no kipping, full lockout at top' },
      ],
    },
  },
]
