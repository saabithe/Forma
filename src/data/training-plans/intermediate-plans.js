// Training plans for Intermediate category skills

export const INTERMEDIATE_PLANS = [
  // ─── CHIN-UPS ───────────────────────────────────────────────
  {
    skillId: 'chin-ups',
    phases: [
      {
        id: 'phase-1',
        name: 'Chin-up Foundation',
        description: 'Build pulling strength for chin-ups',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 5, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'chin-up',
            prescription: { type: 'reps', targetSets: 3, targetReps: 3, restSeconds: 90 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +1 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -1 } },
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
        name: 'Chin-up Volume',
        description: 'Build toward 8-rep sets',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 8, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'chin-up',
            prescription: { type: 'reps', targetSets: 3, targetReps: 5, restSeconds: 90 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +1 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -1 } },
            },
          },
        ],
      },
      {
        id: 'phase-3',
        name: 'Chin-up Mastery',
        description: 'Reach 8-rep sets with full ROM and controlled tempo',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 8, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'chin-up',
            prescription: { type: 'reps', targetSets: 3, targetReps: 6, restSeconds: 90 },
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
        { metric: 'reps', minReps: 8, minSets: 3, consecutiveSessions: 3, phase: 'phase-3' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Full dead hang to chin over bar, no kipping, controlled negative' },
      ],
    },
  },

  // ─── PULL-UPS ───────────────────────────────────────────────
  {
    skillId: 'pull-ups',
    phases: [
      {
        id: 'phase-1',
        name: 'Pull-up Foundation',
        description: 'Build overhand pulling strength',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 5, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'pullup-standard',
            prescription: { type: 'reps', targetSets: 3, targetReps: 3, restSeconds: 90 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +1 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -1 } },
            },
          },
          {
            exerciseId: 'scapular-pulls',
            prescription: { type: 'reps', targetSets: 2, targetReps: 10, restSeconds: 45 },
            progression: {
              on_success: { action: 'maintain', adjustments: {} },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'maintain', adjustments: {} },
            },
          },
        ],
      },
      {
        id: 'phase-2',
        name: 'Pull-up Volume',
        description: 'Build toward 8-rep sets',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 8, minSets: 3 },
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
        ],
      },
      {
        id: 'phase-3',
        name: 'Pull-up Mastery',
        description: 'Reach 8-rep sets with strict form',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 8, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'pullup-standard',
            prescription: { type: 'reps', targetSets: 3, targetReps: 6, restSeconds: 90 },
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
        { metric: 'reps', minReps: 8, minSets: 3, consecutiveSessions: 3, phase: 'phase-3' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Full dead hang to chin over bar, scapular depression initiated, no kipping' },
      ],
    },
  },

  // ─── DIPS ───────────────────────────────────────────────────
  {
    skillId: 'dips',
    phases: [
      {
        id: 'phase-1',
        name: 'Dip Foundation',
        description: 'Build basic dipping strength',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 8, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'box-dips',
            prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 60 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -2 } },
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
      {
        id: 'phase-2',
        name: 'Parallel Bar Dips',
        description: 'Transition to full dips on parallel bars',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 8, minSets: 3 },
        },
        exercises: [
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
            prescription: { type: 'hold', targetSets: 2, targetHoldSeconds: 20, restSeconds: 60 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +5 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -3 } },
            },
          },
        ],
      },
      {
        id: 'phase-3',
        name: 'Dip Volume',
        description: 'Build toward 10-rep sets',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 10, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'dips',
            prescription: { type: 'reps', targetSets: 3, targetReps: 7, restSeconds: 90 },
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
        { metric: 'reps', minReps: 10, minSets: 3, consecutiveSessions: 3, phase: 'phase-3' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Full depth (arms parallel), full lockout, no swinging, shoulders depressed' },
      ],
    },
  },

  // ─── L-SIT ──────────────────────────────────────────────────
  {
    skillId: 'l-sit',
    phases: [
      {
        id: 'phase-1',
        name: 'Tuck L-Sit',
        description: 'Build hip flexor and core strength with tucked legs',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 10, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'l-sit',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 5, restSeconds: 90, notes: 'Tuck variation: knees bent, pulled to chest' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -2 } },
            },
          },
          {
            exerciseId: 'knee-raises',
            prescription: { type: 'reps', targetSets: 2, targetReps: 8, restSeconds: 60 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -2 } },
            },
          },
        ],
      },
      {
        id: 'phase-2',
        name: 'Single Leg L-Sit',
        description: 'Extend one leg while keeping the other tucked',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 10, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'l-sit',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 5, restSeconds: 90, notes: 'Single leg: one leg extended, one tucked. Alternate each set.' },
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
        name: 'Full L-Sit',
        description: 'Both legs extended — full L-sit',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 15, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'l-sit',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 8, restSeconds: 90, notes: 'Full L-sit: both legs straight, parallel to ground' },
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
        { metric: 'hold_seconds', minSeconds: 15, minSets: 3, consecutiveSessions: 3, phase: 'phase-3' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Butt fully off ground, legs straight and parallel, shoulders depressed' },
      ],
    },
  },

  // ─── PLANCHE LEAN ───────────────────────────────────────────
  {
    skillId: 'planche-lean',
    phases: [
      {
        id: 'phase-1',
        name: 'Wrist Prep and Lean Basics',
        description: 'Build wrist endurance and learn the lean position',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 10, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'planche-lean',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 6, restSeconds: 90 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -2 } },
            },
          },
          {
            exerciseId: 'scapular-pushups',
            prescription: { type: 'reps', targetSets: 2, targetReps: 10, restSeconds: 45 },
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
      {
        id: 'phase-2',
        name: 'Lean Duration',
        description: 'Build toward 15-second lean holds',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 12, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'planche-lean',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 8, restSeconds: 90 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -2 } },
            },
          },
          {
            exerciseId: 'scapular-pushups',
            prescription: { type: 'reps', targetSets: 2, targetReps: 12, restSeconds: 45 },
            progression: {
              on_success: { action: 'maintain', adjustments: {} },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'maintain', adjustments: {} },
            },
          },
        ],
      },
      {
        id: 'phase-3',
        name: 'Planche Lean Mastery',
        description: 'Reach 15-second lean holds with proper protraction',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 15, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'planche-lean',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 10, restSeconds: 90 },
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
        { metric: 'hold_seconds', minSeconds: 15, minSets: 3, consecutiveSessions: 3, phase: 'phase-3' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Hips below shoulders, arms locked, scapulae protracted throughout' },
      ],
    },
  },

  // ─── HANDSTAND WALL HOLD ────────────────────────────────────
  {
    skillId: 'handstand-wall-hold',
    phases: [
      {
        id: 'phase-1',
        name: 'Wall Handstand Entry',
        description: 'Learn to kick up safely and hold against the wall',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 20, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'handstand-wall-hold',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 10, restSeconds: 90 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +5 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -5 } },
            },
          },
          {
            exerciseId: 'shoulder-dislocates',
            prescription: { type: 'reps', targetSets: 2, targetReps: 10, restSeconds: 30 },
            progression: {
              on_success: { action: 'maintain', adjustments: {} },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'maintain', adjustments: {} },
            },
          },
        ],
      },
      {
        id: 'phase-2',
        name: 'Wall Handstand Endurance',
        description: 'Build toward 30-second holds with proper alignment',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 30, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'handstand-wall-hold',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 15, restSeconds: 90 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +5 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -5 } },
            },
          },
        ],
      },
      {
        id: 'phase-3',
        name: 'Wall Handstand Mastery',
        description: 'Hold 45-second wall handstands with straight body line',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 40, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'handstand-wall-hold',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 25, restSeconds: 90 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +5 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -5 } },
            },
          },
        ],
      },
    ],
    levelUpCriteria: {
      type: 'combined',
      criteria: [
        { metric: 'hold_seconds', minSeconds: 45, minSets: 3, consecutiveSessions: 3, phase: 'phase-3' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Straight body line (no banana back), shoulders elevated, can breathe' },
      ],
    },
  },

  // ─── DRAGON FLAG ────────────────────────────────────────────
  {
    skillId: 'dragon-flag',
    phases: [
      {
        id: 'phase-1',
        name: 'Tuck Dragon Flag',
        description: 'Build core strength with tucked variation',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 8, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'dragon-flag',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 5, restSeconds: 90, notes: 'Tuck variation: knees bent, pull them toward your chest' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -2 } },
            },
          },
          {
            exerciseId: 'leg-raises',
            prescription: { type: 'reps', targetSets: 2, targetReps: 10, restSeconds: 60 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -2 } },
            },
          },
        ],
      },
      {
        id: 'phase-2',
        name: 'Single Leg Dragon Flag',
        description: 'Extend one leg while keeping the other tucked',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 8, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'dragon-flag',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 5, restSeconds: 90, notes: 'Single leg: one leg extended, one tucked. Alternate each set.' },
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
        name: 'Full Dragon Flag',
        description: 'Both legs extended — full dragon flag hold',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 8, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'dragon-flag',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 5, restSeconds: 90, notes: 'Full dragon flag: legs straight, body rigid from shoulders to toes' },
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
        { metric: 'hold_seconds', minSeconds: 8, minSets: 3, consecutiveSessions: 3, phase: 'phase-3' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Straight body (no hip bend), controlled descent, upper back anchored' },
      ],
    },
  },

  // ─── TOES-TO-BAR ────────────────────────────────────────────
  {
    skillId: 'toes-to-bar',
    phases: [
      {
        id: 'phase-1',
        name: 'Knee Raise Progression',
        description: 'Build core strength with knee raises toward bar',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 10, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'knee-raises',
            prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 60 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -2 } },
            },
          },
        ],
      },
      {
        id: 'phase-2',
        name: 'Toes-to-Bar Building',
        description: 'Transition from knee raises to toes-to-bar',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 8, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'toes-to-bar',
            prescription: { type: 'reps', targetSets: 3, targetReps: 5, restSeconds: 90 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +1 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -1 } },
            },
          },
        ],
      },
      {
        id: 'phase-3',
        name: 'Toes-to-Bar Mastery',
        description: 'Reach 10-rep toes-to-bar sets',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 10, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'toes-to-bar',
            prescription: { type: 'reps', targetSets: 3, targetReps: 7, restSeconds: 90 },
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
        { metric: 'reps', minReps: 10, minSets: 3, consecutiveSessions: 3, phase: 'phase-3' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Toes touch bar, no kipping, controlled negative, arms straight' },
      ],
    },
  },

  // ─── ARCH BODY HOLD ─────────────────────────────────────────
  {
    skillId: 'arch-body-hold',
    phases: [
      {
        id: 'phase-1',
        name: 'Posterior Chain Activation',
        description: 'Build back and glute endurance',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 15, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'arch-body-hold',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 8, restSeconds: 60 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +3 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -3 } },
            },
          },
          {
            exerciseId: 'superman-hold',
            prescription: { type: 'hold', targetSets: 2, targetHoldSeconds: 10, restSeconds: 45 },
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
        name: 'Arch Body Mastery',
        description: 'Build toward 20-second holds',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 20, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'arch-body-hold',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 12, restSeconds: 60 },
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
        { metric: 'hold_seconds', minSeconds: 20, minSets: 3, consecutiveSessions: 3, phase: 'phase-2' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Arms and legs fully off ground, even arch, glutes engaged' },
      ],
    },
  },

  // ─── JUMPING LUNGES ─────────────────────────────────────────
  {
    skillId: 'jumping-lunges',
    phases: [
      {
        id: 'phase-1',
        name: 'Explosive Lunge Foundation',
        description: 'Build single-leg explosive power',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 10, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'jumping-lunges',
            prescription: { type: 'reps', targetSets: 3, targetReps: 6, restSeconds: 60, notes: 'Per leg' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -2 } },
            },
          },
        ],
      },
      {
        id: 'phase-2',
        name: 'Jumping Lunge Volume',
        description: 'Build toward 12 reps per leg',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 12, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'jumping-lunges',
            prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 60, notes: 'Per leg' },
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
        { metric: 'reps', minReps: 12, minSets: 3, consecutiveSessions: 3, phase: 'phase-2' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Full lunge depth, soft landing, torso upright, explosive switch' },
      ],
    },
  },
]
