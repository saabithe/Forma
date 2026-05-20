// Training plans for Beginner category skills
// Each plan defines phased progression with exercises, rules, and level-up criteria

export const BEGINNER_PLANS = [
  // ─── PASSIVE HANG ───────────────────────────────────────────
  {
    skillId: 'passive-hang',
    phases: [
      {
        id: 'phase-1',
        name: 'Grip Foundation',
        description: 'Build basic grip endurance and shoulder comfort',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 20, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'passive-hang',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 15, restSeconds: 60 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +5 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -5 } },
            },
          },
        ],
      },
      {
        id: 'phase-2',
        name: 'Building Endurance',
        description: 'Increase hang time toward 45 seconds',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 35, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'passive-hang',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 25, restSeconds: 60 },
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
        name: 'Hang Mastery',
        description: 'Reach a solid 60-second passive hang',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 50, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'passive-hang',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 40, restSeconds: 60 },
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
        { metric: 'hold_seconds', minSeconds: 60, minSets: 3, consecutiveSessions: 3, phase: 'phase-3' },
      ],
    },
  },

  // ─── ACTIVE HANG ────────────────────────────────────────────
  {
    skillId: 'active-hang',
    phases: [
      {
        id: 'phase-1',
        name: 'Scapular Activation',
        description: 'Learn to engage the lats and depress the shoulders',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 10, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'scapular-pulls',
            prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 60 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -2 } },
            },
          },
          {
            exerciseId: 'active-hang',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 8, restSeconds: 60 },
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
        name: 'Active Hold Building',
        description: 'Build toward 15-second active hangs',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 15, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'scapular-pulls',
            prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 45 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -2 } },
            },
          },
          {
            exerciseId: 'active-hang',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 12, restSeconds: 60 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +3 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -3 } },
            },
          },
        ],
      },
      {
        id: 'phase-3',
        name: 'Active Hang Mastery',
        description: 'Reach 20-second active hangs with full depression',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 20, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'active-hang',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 15, restSeconds: 60 },
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
        { metric: 'hold_seconds', minSeconds: 20, minSets: 3, consecutiveSessions: 3, phase: 'phase-3' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Full shoulder depression throughout' },
      ],
    },
  },

  // ─── BASIC PLANK ────────────────────────────────────────────
  {
    skillId: 'basic-plank',
    phases: [
      {
        id: 'phase-1',
        name: 'Core Activation',
        description: 'Build basic core endurance with short holds',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 25, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'basic-plank',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 15, restSeconds: 60 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +5 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -5 } },
            },
          },
          {
            exerciseId: 'dead-bugs',
            prescription: { type: 'reps', targetSets: 2, targetReps: 8, restSeconds: 45 },
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
        name: 'Endurance Building',
        description: 'Extend hold times toward 45 seconds',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 40, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'basic-plank',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 25, restSeconds: 60 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +5 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -5 } },
            },
          },
          {
            exerciseId: 'dead-bugs',
            prescription: { type: 'reps', targetSets: 2, targetReps: 10, restSeconds: 45 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -2 } },
            },
          },
        ],
      },
      {
        id: 'phase-3',
        name: 'Plank Mastery',
        description: 'Hold a solid 60-second plank with proper form',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 50, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'basic-plank',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 40, restSeconds: 60 },
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
        { metric: 'hold_seconds', minSeconds: 60, minSets: 3, consecutiveSessions: 3, phase: 'phase-3' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Straight line maintained throughout, breathing normally' },
      ],
    },
  },

  // ─── HOLLOW BODY HOLD ───────────────────────────────────────
  {
    skillId: 'hollow-body-hold',
    phases: [
      {
        id: 'phase-1',
        name: 'Tuck Hollow Body',
        description: 'Build core tension with knees tucked (easier variation)',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 15, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'hollow-body-hold',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 10, restSeconds: 60, notes: 'Use tucked variation: knees bent, shins parallel to floor' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +3 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -3 } },
            },
          },
          {
            exerciseId: 'dead-bugs',
            prescription: { type: 'reps', targetSets: 2, targetReps: 8, restSeconds: 45 },
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
        name: 'Single Leg Extension',
        description: 'Extend one leg while keeping the other tucked',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 15, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'hollow-body-hold',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 10, restSeconds: 60, notes: 'Single leg extension: one leg straight, one tucked. Alternate legs each set.' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { holdSeconds: +3 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { holdSeconds: -3 } },
            },
          },
        ],
      },
      {
        id: 'phase-3',
        name: 'Full Hollow Body',
        description: 'Arms and legs extended — full hollow body hold',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 20, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'hollow-body-hold',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 12, restSeconds: 60, notes: 'Full hollow body: arms overhead, legs straight. Adjust arm/leg height to maintain lower back contact.' },
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
        { metric: 'hold_seconds', minSeconds: 20, minSets: 3, consecutiveSessions: 3, phase: 'phase-3' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Lower back flat on floor throughout entire hold' },
      ],
    },
  },

  // ─── PUSH-UPS ───────────────────────────────────────────────
  {
    skillId: 'pushups',
    phases: [
      {
        id: 'phase-1',
        name: 'Incline Push-ups',
        description: 'Build pressing strength with elevated hands',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 12, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'incline-pushups',
            prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 60 },
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
              on_success: { action: 'maintain', adjustments: {} },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'maintain', adjustments: {} },
            },
          },
        ],
      },
      {
        id: 'phase-2',
        name: 'Standard Push-ups',
        description: 'Transition to floor push-ups',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 10, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'pushup-standard',
            prescription: { type: 'reps', targetSets: 3, targetReps: 6, restSeconds: 60 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +1 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -2 } },
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
        ],
      },
      {
        id: 'phase-3',
        name: 'Push-up Volume',
        description: 'Build toward 15-rep sets',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 15, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'pushup-standard',
            prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 60 },
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
        { metric: 'reps', minReps: 15, minSets: 3, consecutiveSessions: 3, phase: 'phase-3' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Full range of motion — chest to ground, full lockout' },
      ],
    },
  },

  // ─── BODYWEIGHT SQUAT ───────────────────────────────────────
  {
    skillId: 'bodyweight-squat',
    phases: [
      {
        id: 'phase-1',
        name: 'Squat Foundation',
        description: 'Build depth and form with controlled reps',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 12, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'bodyweight-squat',
            prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 60 },
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
        name: 'Squat Volume',
        description: 'Increase reps toward 20 per set',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 18, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'bodyweight-squat',
            prescription: { type: 'reps', targetSets: 3, targetReps: 15, restSeconds: 60 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -2 } },
            },
          },
        ],
      },
      {
        id: 'phase-3',
        name: 'Squat Mastery',
        description: 'Reach 20-rep sets with perfect form',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 20, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'bodyweight-squat',
            prescription: { type: 'reps', targetSets: 3, targetReps: 18, restSeconds: 60 },
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
        { metric: 'reps', minReps: 20, minSets: 3, consecutiveSessions: 3, phase: 'phase-3' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Full depth (hip crease below knee), knees tracking over toes, heels on ground' },
      ],
    },
  },

  // ─── PIKE PUSH-UPS ──────────────────────────────────────────
  {
    skillId: 'pike-pushups',
    phases: [
      {
        id: 'phase-1',
        name: 'Overhead Press Foundation',
        description: 'Learn the pike position and build shoulder pressing strength',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 8, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'pike-pushups',
            prescription: { type: 'reps', targetSets: 3, targetReps: 5, restSeconds: 90 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +1 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -1 } },
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
        ],
      },
      {
        id: 'phase-2',
        name: 'Volume Building',
        description: 'Increase reps toward 10 per set',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 10, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'pike-pushups',
            prescription: { type: 'reps', targetSets: 3, targetReps: 7, restSeconds: 90 },
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
        name: 'Pike Push-up Mastery',
        description: 'Reach 10-rep sets with full depth',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 10, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'pike-pushups',
            prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 90 },
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
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Head between hands at bottom, hips high, full lockout at top' },
      ],
    },
  },

  // ─── GLUTE BRIDGE ───────────────────────────────────────────
  {
    skillId: 'glute-bridge',
    phases: [
      {
        id: 'phase-1',
        name: 'Glute Activation',
        description: 'Learn to fire the glutes and build basic strength',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 15, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'glute-bridge-reps',
            prescription: { type: 'reps', targetSets: 3, targetReps: 12, restSeconds: 45 },
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
        name: 'Volume Building',
        description: 'Increase reps and add hold component',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 20, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'glute-bridge-reps',
            prescription: { type: 'reps', targetSets: 3, targetReps: 15, restSeconds: 45 },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +2 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -2 } },
            },
          },
          {
            exerciseId: 'glute-bridge',
            prescription: { type: 'hold', targetSets: 2, targetHoldSeconds: 20, restSeconds: 45 },
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
        { metric: 'reps', minReps: 20, minSets: 3, consecutiveSessions: 3, phase: 'phase-2' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Full hip extension, glute squeeze at top, no lower back involvement' },
      ],
    },
  },

  // ─── LUNGES ─────────────────────────────────────────────────
  {
    skillId: 'lunges',
    phases: [
      {
        id: 'phase-1',
        name: 'Lunge Foundation',
        description: 'Build single-leg strength and balance',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 10, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'lunges',
            prescription: { type: 'reps', targetSets: 3, targetReps: 8, restSeconds: 60, notes: 'Per leg' },
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
        name: 'Lunge Volume',
        description: 'Build toward 12 reps per leg',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 12, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'lunges',
            prescription: { type: 'reps', targetSets: 3, targetReps: 10, restSeconds: 60, notes: 'Per leg' },
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
        { metric: 'reps', minReps: 12, minSets: 3, consecutiveSessions: 3, phase: 'phase-2' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Both knees at 90 degrees, front knee over ankle, torso upright' },
      ],
    },
  },

  // ─── JUMPING SQUATS ─────────────────────────────────────────
  {
    skillId: 'jumping-squats',
    phases: [
      {
        id: 'phase-1',
        name: 'Explosive Foundation',
        description: 'Build explosive leg power with controlled jumps',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 12, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'jumping-squats',
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
        name: 'Power Building',
        description: 'Increase volume toward 15 reps',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 15, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'jumping-squats',
            prescription: { type: 'reps', targetSets: 3, targetReps: 12, restSeconds: 60 },
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
        { metric: 'reps', minReps: 15, minSets: 3, consecutiveSessions: 3, phase: 'phase-2' },
        { metric: 'form_quality', selfReported: true, consecutiveSessions: 3, description: 'Full squat depth before jumping, soft landing, full extension at top' },
      ],
    },
  },

  // ─── MOUNTAIN CLIMBERS ──────────────────────────────────────
  {
    skillId: 'mountain-climbers',
    phases: [
      {
        id: 'phase-1',
        name: 'Core Endurance',
        description: 'Build core stability under dynamic movement',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 20, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'mountain-climbers',
            prescription: { type: 'reps', targetSets: 3, targetReps: 15, restSeconds: 45, notes: 'Per leg' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +3 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -3 } },
            },
          },
        ],
      },
      {
        id: 'phase-2',
        name: 'Speed and Endurance',
        description: 'Increase volume toward 25 reps per leg',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'reps', minReps: 25, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'mountain-climbers',
            prescription: { type: 'reps', targetSets: 3, targetReps: 20, restSeconds: 45, notes: 'Per leg' },
            progression: {
              on_success: { action: 'increase_difficulty', adjustments: { reps: +3 } },
              on_partial: { action: 'maintain', adjustments: {} },
              on_fail: { action: 'decrease_difficulty', adjustments: { reps: -3 } },
            },
          },
        ],
      },
    ],
    levelUpCriteria: {
      type: 'combined',
      criteria: [
        { metric: 'reps', minReps: 25, minSets: 3, consecutiveSessions: 3, phase: 'phase-2' },
      ],
    },
  },

  // ─── REVERSE PLANK ──────────────────────────────────────────
  {
    skillId: 'reverse-plank',
    phases: [
      {
        id: 'phase-1',
        name: 'Posterior Chain Activation',
        description: 'Build posterior deltoid and glute endurance',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 15, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'reverse-plank',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 10, restSeconds: 60 },
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
        name: 'Reverse Plank Mastery',
        description: 'Build toward 30-second holds',
        advanceCriteria: {
          type: 'consecutive_sessions',
          count: 3,
          condition: { metric: 'hold_seconds', minSeconds: 25, minSets: 3 },
        },
        exercises: [
          {
            exerciseId: 'reverse-plank',
            prescription: { type: 'hold', targetSets: 3, targetHoldSeconds: 15, restSeconds: 60 },
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
        { metric: 'hold_seconds', minSeconds: 30, minSets: 3, consecutiveSessions: 3, phase: 'phase-2' },
      ],
    },
  },
]
