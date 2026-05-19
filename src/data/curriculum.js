// A-Z Linear Calisthenics Roadmap
// Skills are ordered by progressive difficulty — one chain, unlock sequentially

const HOLD_CUES = [
  ['Engage your core throughout', 'Breathe steadily, don\'t hold your breath', 'Maintain proper alignment'],
  ['Keep shoulders packed and stable', 'Squeeze the target muscles', 'Control the position, don\'t just survive it'],
  ['Focus on tension, not just time', 'Keep your body in a straight line', 'Reset if your form breaks down'],
  ['Breathe out on exertion', 'Keep wrists stacked under shoulders', 'Engage your lats by pulling shoulders down'],
]

const REP_CUES = [
  ['Control the eccentric (lowering) phase', 'Full range of motion on every rep', 'Breathe out on the effort phase'],
  ['Keep your core tight throughout', 'Don\'t rush — quality over quantity', 'Pause briefly at the top'],
  ['Maintain proper alignment', 'Stop if form breaks down', 'Focus on the mind-muscle connection'],
  ['Slow and controlled on the way down', 'Explosive on the way up', 'Keep shoulders away from ears'],
]

function holdSkill(sets, holdSeconds, restSeconds, cueIndex = 0) {
  return { type: 'hold', sets, holdSeconds, restSeconds, cues: HOLD_CUES[cueIndex % HOLD_CUES.length] }
}

function repSkill(sets, reps, restSeconds, cueIndex = 0) {
  return { type: 'reps', sets, reps, restSeconds, cues: REP_CUES[cueIndex % REP_CUES.length] }
}

export const SKILLS = [
  // BEGINNER FOUNDATION
  { id: 'passive-hang', name: 'Passive Hang', description: 'Dead hang, no activity', category: 'Beginner', workout: holdSkill(3, 30, 60) },
  { id: 'active-hang', name: 'Active Hang', description: 'Dead hang with controlled grip', category: 'Beginner', workout: holdSkill(3, 20, 60) },
  { id: 'wrist-mobility-drills', name: 'Wrist Mobility Drills', description: 'Prep for skills', category: 'Beginner', workout: repSkill(2, 10, 30) },
  { id: 'hinge-cat-cow', name: 'Hinge (Cat Cow)', description: 'Spinal mobility drill', category: 'Beginner', workout: repSkill(2, 12, 30) },
  { id: 'basic-plank', name: 'Basic Plank', description: 'Standard plank hold', category: 'Beginner', workout: holdSkill(3, 30, 60) },
  { id: 'glute-bridge', name: 'Glute Bridge', description: 'Hip thrust from floor', category: 'Beginner', workout: repSkill(3, 15, 45) },
  { id: 'bodyweight-squat', name: 'Bodyweight Squat', description: 'Full squat, no support', category: 'Beginner', workout: repSkill(3, 15, 60) },
  { id: 'lunges', name: 'Lunges', description: 'Forward step-down', category: 'Beginner', workout: repSkill(3, 10, 60, 1) },
  { id: 'assisted-squats', name: 'Assisted Squats', description: 'Hold support while squatting', category: 'Beginner', workout: repSkill(3, 12, 45) },
  { id: 'incline-pushups', name: 'Incline Push-ups', description: 'Hands elevated', category: 'Beginner', workout: repSkill(3, 10, 60) },
  { id: 'pushups', name: 'Push-ups', description: 'Standard chest pressing', category: 'Beginner', workout: repSkill(3, 10, 60) },
  { id: 'situps', name: 'Sit-ups', description: 'Core flexion', category: 'Beginner', workout: repSkill(3, 15, 45) },
  { id: 'knee-raises', name: 'Knee Raises', description: 'Hanging, bent knees', category: 'Beginner', workout: repSkill(3, 10, 60, 1) },
  { id: 'reverse-plank', name: 'Reverse Plank', description: 'Back-facing plank', category: 'Beginner', workout: holdSkill(3, 20, 60) },
  { id: 'scapular-pulls', name: 'Scapular Pulls', description: 'Shoulder blade activation', category: 'Beginner', workout: repSkill(3, 10, 45) },
  { id: 'australian-rows', name: 'Australian Rows', description: 'Inverted rows on bar', category: 'Beginner', workout: repSkill(3, 10, 60, 1) },
  { id: 'back-bridge', name: 'Back Bridge', description: 'Lying back extension', category: 'Beginner', workout: holdSkill(3, 20, 45) },
  { id: 'lateral-leg-raises', name: 'Lateral Leg Raises', description: 'Side lying leg work', category: 'Beginner', workout: repSkill(3, 12, 45, 1) },
  { id: 'split-squat', name: 'Split Squat', description: 'Forward lunge stance', category: 'Beginner', workout: repSkill(3, 10, 60) },
  { id: 'clapping-jacks', name: 'Clapping Jacks', description: 'Jumping jacks', category: 'Beginner', workout: repSkill(3, 20, 30, 2) },
  { id: 'mountain-climbers', name: 'Mountain Climbers', description: 'Dynamic plank work', category: 'Beginner', workout: repSkill(3, 20, 45, 2) },
  { id: 'hollow-body-hold', name: 'Hollow Body Hold', description: 'Abs-in body tension', category: 'Beginner', workout: holdSkill(3, 20, 60, 1) },
  { id: 'reverse-hyperextension', name: 'Reverse Hyperextension', description: 'Bench back extension', category: 'Beginner', workout: repSkill(3, 12, 45) },
  { id: 'pike-pushups', name: 'Pike Push-ups', description: 'Inverted V push', category: 'Beginner', workout: repSkill(3, 8, 60, 1) },
  { id: 'knuckle-pushups', name: 'Knuckle Push-ups', description: 'Fist-based push-ups', category: 'Beginner', workout: repSkill(3, 8, 60) },
  { id: 'box-dips', name: 'Box Dips', description: 'Dips on elevated surface', category: 'Beginner', workout: repSkill(3, 10, 60, 1) },
  { id: 'jumping-squats', name: 'Jumping Squats', description: 'Explosive leg power', category: 'Beginner', workout: repSkill(3, 12, 60, 2) },
  { id: 'farmer-carry', name: 'Farmer Carry', description: 'Waiter walk (light tension)', category: 'Beginner', workout: holdSkill(3, 30, 45) },
  { id: 'knee-hang', name: 'Knee Hang', description: 'Passive hang, bent knees', category: 'Beginner', workout: holdSkill(3, 20, 60) },
  { id: 'tuck-hang', name: 'Tuck Hang', description: 'Hang with pulled knees', category: 'Beginner', workout: holdSkill(3, 15, 60, 1) },
  { id: 'frog-stand', name: 'Frog Stand', description: 'Weight on hands, knees on elbows', category: 'Beginner', workout: holdSkill(3, 15, 60, 1) },
  { id: 'support-hold', name: 'Support Hold', description: 'Dip position static', category: 'Beginner', workout: holdSkill(3, 20, 60) },
  { id: 'shrimp-squat', name: 'Shrimp Squat', description: 'Near pistol progression', category: 'Beginner', workout: repSkill(3, 6, 60, 1) },
  { id: 'handstand-wall-hold', name: 'Handstand Wall Hold', description: 'Wall-assisted handstand', category: 'Beginner', workout: holdSkill(3, 20, 90, 2) },
  { id: 'wall-handstand-walk', name: 'Wall Handstand Walk', description: 'Hands on wall, feet walking', category: 'Beginner', workout: repSkill(3, 5, 90, 2) },

  // INTERMEDIATE
  { id: 'chin-ups', name: 'Chin-Ups', description: 'Underhand pull-ups', category: 'Intermediate', workout: repSkill(3, 8, 90, 1) },
  { id: 'pull-ups', name: 'Pull-ups', description: 'Standard vertical pull', category: 'Intermediate', workout: repSkill(3, 8, 90, 1) },
  { id: 'dips', name: 'Dips', description: 'Standard chest/tricep press', category: 'Intermediate', workout: repSkill(3, 10, 90) },
  { id: 'arch-body-hold', name: 'Arch Body Hold', description: 'Extended back tension', category: 'Intermediate', workout: holdSkill(3, 20, 60, 1) },
  { id: 'hollow-body-rocks', name: 'Hollow Body Rocks', description: 'Dynamic hollow body', category: 'Intermediate', workout: repSkill(3, 15, 60) },
  { id: 'parallel-squats', name: 'Parallel Squats', description: 'Deep two-leg squat', category: 'Intermediate', workout: repSkill(3, 15, 60) },
  { id: 'jumping-lunges', name: 'Jumping Lunges', description: 'Explosive alternating', category: 'Intermediate', workout: repSkill(3, 12, 60, 2) },
  { id: 'copenhagen-adduction', name: 'Copenhagen Adduction', description: 'Side-lying leg tension', category: 'Intermediate', workout: repSkill(3, 10, 45, 1) },
  { id: 'full-pushups', name: 'Full Push-ups', description: 'Chest-to-ground', category: 'Intermediate', workout: repSkill(3, 12, 60) },
  { id: 'clap-pushups', name: 'Clap Push-ups', description: 'Explosive push-up', category: 'Intermediate', workout: repSkill(3, 8, 60, 2) },
  { id: 'scapular-pushups', name: 'Scapular Push-ups', description: 'Shoulder isolation', category: 'Intermediate', workout: repSkill(3, 12, 45) },
  { id: 'high-pull-ups', name: 'High Pull-ups', description: 'Full range pull-ups', category: 'Intermediate', workout: repSkill(3, 6, 90, 1) },
  { id: 'knee-tucks', name: 'Knee Tucks', description: 'Dynamic core pull', category: 'Intermediate', workout: repSkill(3, 12, 60) },
  { id: 'toes-to-bar', name: 'Toes-to-Bar', description: 'Dynamic core pull', category: 'Intermediate', workout: repSkill(3, 10, 60, 1) },
  { id: 'tricep-dips', name: 'Tricep Dips', description: 'Parallel bar dips', category: 'Intermediate', workout: repSkill(3, 12, 60) },
  { id: 'german-hang', name: 'German Hang', description: 'Scapular retraction hang', category: 'Intermediate', workout: holdSkill(3, 15, 90, 2) },
  { id: 'skin-the-cat', name: 'Skin the Cat', description: 'Bar rotation hold', category: 'Intermediate', workout: repSkill(3, 5, 90, 2) },
  { id: 'one-arm-hangs', name: 'One-Arm Hangs', description: 'Single-arm dead hang', category: 'Intermediate', workout: holdSkill(3, 10, 90, 1) },
  { id: 'l-sit', name: 'L-Sit', description: 'Seated horizontal core', category: 'Intermediate', workout: holdSkill(3, 15, 90, 1) },
  { id: 'core-hold-v-sit', name: 'Core Hold (V-Sit)', description: 'Seated L-position', category: 'Intermediate', workout: holdSkill(3, 10, 90, 1) },
  { id: 'pistol-squat-assisted', name: 'Pistol Squat (assisted)', description: 'Single-leg squat', category: 'Intermediate', workout: repSkill(3, 6, 90, 1) },
  { id: 'single-leg-squats-supported', name: 'Single-Leg Squats (supported)', description: 'Balance work', category: 'Intermediate', workout: repSkill(3, 8, 60, 1) },
  { id: 'planche-lean', name: 'Planche Lean', description: 'Horizontal push lean', category: 'Intermediate', workout: holdSkill(3, 15, 90, 2) },
  { id: 'straddle-planche-lean', name: 'Straddle Planche Lean', description: 'Legs apart planche lean', category: 'Intermediate', workout: holdSkill(3, 10, 90, 2) },
  { id: 'pseudo-planche-pushups', name: 'Pseudo Planche Push-ups', description: 'Lean forward push', category: 'Intermediate', workout: repSkill(3, 8, 60, 1) },
  { id: 'pushup-progressions', name: 'Push-up Progressions', description: 'Various hand positions', category: 'Intermediate', workout: repSkill(3, 10, 60) },
  { id: 'elbow-lever', name: 'Elbow Lever', description: 'Support on elbows', category: 'Intermediate', workout: holdSkill(3, 10, 90, 2) },
  { id: 'tucked-planche', name: 'Tucked Planche', description: 'Body compressed horizontal', category: 'Intermediate', workout: holdSkill(3, 10, 90, 2) },
  { id: 'tuck-front-lever', name: 'Tuck Front Lever', description: 'Bent legs front lever', category: 'Intermediate', workout: holdSkill(3, 10, 90, 2) },
  { id: 'lever-progressions', name: 'Lever Progressions', description: 'Static pulling holds', category: 'Intermediate', workout: holdSkill(3, 10, 90, 2) },
  { id: 'handstand', name: 'Handstand', description: 'Vertical balance', category: 'Intermediate', workout: holdSkill(3, 15, 90, 2) },
  { id: 'handstand-walk', name: 'Handstand Walk', description: 'Locomotion on hands', category: 'Intermediate', workout: repSkill(3, 5, 90, 2) },
  { id: 'dragon-flag', name: 'Dragon Flag', description: 'Core hold on bench', category: 'Intermediate', workout: holdSkill(3, 10, 90, 1) },
  { id: 'back-lever', name: 'Back Lever', description: 'Horizontal pull-facing down', category: 'Intermediate', workout: holdSkill(3, 8, 120, 2) },
  { id: 'flag-raise', name: 'Flag Raise', description: 'Partial human flag', category: 'Intermediate', workout: holdSkill(3, 5, 120, 2) },
  { id: 'iron-cross-hold', name: 'Iron Cross Hold', description: 'Rings, arms perpendicular', category: 'Intermediate', workout: holdSkill(3, 5, 120, 3) },
  { id: 'manna', name: 'Manna', description: 'Extended V-sit (advanced)', category: 'Intermediate', workout: holdSkill(3, 5, 120, 3) },
  { id: 'muscle-ups', name: 'Muscle-Ups', description: 'Transition skill', category: 'Intermediate', workout: repSkill(3, 5, 120, 2) },
  { id: 'bar-muscle-up', name: 'Bar Muscle-Up', description: 'Pull-up to dip transition', category: 'Intermediate', workout: repSkill(3, 3, 120, 2) },

  // ADVANCED
  { id: 'archer-pull-ups', name: 'Archer Pull-ups', description: 'Assisted one-arm pull', category: 'Advanced', workout: repSkill(3, 6, 120, 1) },
  { id: 'clapping-pull-ups', name: 'Clapping Pull-ups', description: 'Explosive pull variation', category: 'Advanced', workout: repSkill(3, 5, 120, 2) },
  { id: 'kipping-pull-ups', name: 'Kipping Pull-ups', description: 'Momentum-based pull', category: 'Advanced', workout: repSkill(3, 8, 90, 2) },
  { id: 'weighted-pull-ups', name: 'Weighted Pull-ups', description: 'Added resistance', category: 'Advanced', workout: repSkill(4, 6, 120, 1) },
  { id: 'weighted-dips', name: 'Weighted Dips', description: 'Added resistance', category: 'Advanced', workout: repSkill(4, 8, 120) },
  { id: 'weighted-squats', name: 'Weighted Squats', description: 'Added resistance', category: 'Advanced', workout: repSkill(4, 10, 90) },
  { id: 'one-leg-pistol-squat', name: 'One-Leg Pistol Squat', description: 'Full single-leg squat', category: 'Advanced', workout: repSkill(3, 5, 120, 1) },
  { id: 'superman-hold', name: 'Superman Hold', description: 'Extended arch hold', category: 'Advanced', workout: holdSkill(3, 20, 60) },
  { id: 'back-lever-rolls', name: 'Back Lever Rolls', description: 'Dynamic back lever', category: 'Advanced', workout: repSkill(3, 5, 120, 2) },
  { id: 'extended-back-lever', name: 'Extended Back Lever', description: 'Fully extended back hold', category: 'Advanced', workout: holdSkill(3, 8, 120, 3) },
  { id: 'rings-rows', name: 'Rings Rows', description: 'Rings horizontal pull', category: 'Advanced', workout: repSkill(3, 10, 90, 1) },
  { id: 'rings-dips', name: 'Rings Dips', description: 'Rings pressing', category: 'Advanced', workout: repSkill(3, 8, 90, 1) },
  { id: 'rings-muscle-up', name: 'Rings Muscle-Up', description: 'Rings transition', category: 'Advanced', workout: repSkill(3, 3, 120, 2) },
  { id: 'rope-climbing', name: 'Rope Climbing', description: 'Vertical rope ascent', category: 'Advanced', workout: repSkill(3, 3, 120, 2) },
  { id: 'front-lever', name: 'Front Lever', description: 'Horizontal pull-facing up', category: 'Advanced', workout: holdSkill(3, 8, 120, 3) },
  { id: 'front-lever-pulls', name: 'Front Lever Pulls', description: 'Dynamic front lever', category: 'Advanced', workout: repSkill(3, 5, 120, 3) },
  { id: 'lever-work', name: 'Lever Work', description: 'Static pulling progressions', category: 'Advanced', workout: holdSkill(3, 10, 120, 3) },
  { id: 'cross-lever', name: 'Cross Lever', description: 'Rings, body perpendicular', category: 'Advanced', workout: holdSkill(3, 5, 120, 3) },
  { id: 'side-lever', name: 'Side Lever', description: 'Lateral pole hold', category: 'Advanced', workout: holdSkill(3, 5, 120, 3) },
  { id: 'human-flag', name: 'Human Flag', description: 'Pole hold, body horizontal', category: 'Advanced', workout: holdSkill(3, 5, 120, 3) },
  { id: 'iron-cross-rings', name: 'Iron Cross (hold + rings)', description: 'Advanced rings', category: 'Advanced', workout: holdSkill(3, 5, 120, 3) },
  { id: 'full-planche', name: 'Full Planche', description: 'Legs together horizontal', category: 'Advanced', workout: holdSkill(3, 5, 120, 3) },
  { id: 'straddle-planche', name: 'Straddle Planche', description: 'Legs apart horizontal hold', category: 'Advanced', workout: holdSkill(3, 5, 120, 3) },
  { id: 'tuck-to-straddle-progression', name: 'Tuck to Straddle Progression', description: 'Planche progression', category: 'Advanced', workout: holdSkill(3, 8, 120, 3) },
  { id: 'maltese-progression', name: 'Maltese Progression', description: 'Advanced wide-grip planche', category: 'Advanced', workout: holdSkill(3, 5, 120, 3) },
  { id: 'victorian', name: 'Victorian', description: 'Hybrid front lever + dragon press', category: 'Advanced', workout: holdSkill(3, 5, 120, 3) },
  { id: 'handstand-pushups', name: 'Handstand Push-ups', description: 'Vertical pressing', category: 'Advanced', workout: repSkill(3, 5, 120, 2) },
  { id: 'handstand-shoulder-taps', name: 'Handstand Shoulder Taps', description: 'Balance disruption', category: 'Advanced', workout: repSkill(3, 8, 90, 2) },
  { id: 'shaped-handstand', name: 'Shaped Handstand', description: 'Controlled vertical balance', category: 'Advanced', workout: holdSkill(3, 20, 90, 2) },
  { id: 'straight-arm-shoulder-hold', name: 'Straight Arm Shoulder Hold', description: 'Protraction/depression', category: 'Advanced', workout: holdSkill(3, 15, 90, 2) },
  { id: 'skin-the-cat-full', name: 'Skin the Cat (Full)', description: 'Complete rotation', category: 'Advanced', workout: repSkill(3, 5, 90, 2) },
  { id: 'dragon-press', name: 'Dragon Press', description: 'Front lever from lying', category: 'Advanced', workout: repSkill(3, 5, 120, 3) },
  { id: 'elbow-lever-to-handstand', name: 'Elbow Lever to Handstand', description: 'Dynamic transition', category: 'Advanced', workout: repSkill(3, 3, 120, 3) },
  { id: 'muscle-up-to-dip', name: 'Muscle-Up to Dip', description: 'Clean transition', category: 'Advanced', workout: repSkill(3, 5, 120, 2) },
  { id: 'rewind-muscle-ups', name: 'Rewind Muscle-ups', description: 'Reverse transition', category: 'Advanced', workout: repSkill(3, 3, 120, 3) },
  { id: 'one-arm-pushup', name: 'One-Arm Push-up', description: 'Single-arm horizontal', category: 'Advanced', workout: repSkill(3, 3, 120, 3) },
  { id: 'one-arm-chin-up', name: 'One-Arm Chin-up', description: 'Single-arm underhand', category: 'Advanced', workout: repSkill(3, 2, 180, 3) },
  { id: 'pseudo-planche-pushups-adv', name: 'Pseudo Planche Push-ups', description: 'Horizontal push', category: 'Advanced', workout: repSkill(3, 10, 90, 1) },
  { id: 'windmill-handstand', name: 'Windmill (Handstand)', description: 'Dynamic arm rotation', category: 'Advanced', workout: repSkill(3, 3, 120, 3) },
  { id: 'wrist-lock-holds', name: 'Wrist Lock/Holds', description: 'Grip endurance', category: 'Advanced', workout: holdSkill(3, 20, 60) },

  // ELITE/EXTREME
  { id: '360-rotation', name: '360 Degree Rotation', description: 'Full body spin on bar', category: 'Elite', workout: repSkill(3, 3, 120, 3) },
  { id: 'back-to-front-lever', name: 'Back Lever to Front Lever', description: 'Lever transitions', category: 'Elite', workout: repSkill(3, 3, 120, 3) },
  { id: 'certified-one-arm-fl', name: 'Certified One-Arm Front Lever', description: 'Single-arm pull hold', category: 'Elite', workout: holdSkill(3, 5, 180, 3) },
  { id: 'clapping-muscle-ups', name: 'Clapping Muscle-ups', description: 'Explosive transition', category: 'Elite', workout: repSkill(3, 3, 120, 3) },
  { id: 'crossed-leg-planche', name: 'Crossed-leg Planche', description: 'Advanced leg position', category: 'Elite', workout: holdSkill(3, 5, 180, 3) },
  { id: 'hs-press-to-planche', name: 'Handstand Press to Planche', description: 'Transition skill', category: 'Elite', workout: repSkill(3, 3, 120, 3) },
  { id: 'hs-to-chest-lever', name: 'Handstand to Chest Lever', description: 'Dynamic transition', category: 'Elite', workout: repSkill(3, 3, 120, 3) },
  { id: 'hold-to-press-transitions', name: 'Hold-to-Press Transitions', description: 'Skill combinations', category: 'Elite', workout: repSkill(3, 3, 120, 3) },
  { id: 'human-flag-holds', name: 'Human Flag Holds', description: 'Extended pole hold', category: 'Elite', workout: holdSkill(3, 8, 120, 3) },
  { id: 'iron-cross-transitions', name: 'Iron Cross Transitions', description: 'Cross to other skills', category: 'Elite', workout: repSkill(3, 3, 120, 3) },
  { id: 'maltese-cross', name: 'Maltese Cross', description: 'Extreme wide-grip hold', category: 'Elite', workout: holdSkill(3, 3, 180, 3) },
  { id: 'muscle-up-variations', name: 'Muscle-Up Variations', description: '360 muscle-ups', category: 'Elite', workout: repSkill(3, 3, 120, 3) },
  { id: 'navajo-flips', name: 'Navajo Flips', description: 'Dynamic handstand', category: 'Elite', workout: repSkill(3, 3, 120, 3) },
  { id: 'one-arm-back-lever', name: 'One-Arm Back Lever', description: 'Single-arm pulling hold', category: 'Elite', workout: holdSkill(3, 5, 180, 3) },
  { id: 'one-arm-front-lever', name: 'One-Arm Front Lever', description: 'Single-arm pulling hold', category: 'Elite', workout: holdSkill(3, 5, 180, 3) },
  { id: 'one-arm-handstand', name: 'One-Arm Handstand', description: 'Single-arm vertical', category: 'Elite', workout: holdSkill(3, 5, 180, 3) },
  { id: 'one-arm-planche', name: 'One-Arm Planche', description: 'Single-arm horizontal', category: 'Elite', workout: holdSkill(3, 3, 180, 3) },
  { id: 'press-handstand', name: 'Press Handstand', description: 'Seated to handstand', category: 'Elite', workout: repSkill(3, 3, 120, 3) },
  { id: 'rings-handstand', name: 'Rings Handstand', description: 'Rings vertical balance', category: 'Elite', workout: holdSkill(3, 10, 120, 3) },
  { id: 'rings-iron-cross', name: 'Rings Iron Cross', description: 'Rings perpendicular hold', category: 'Elite', workout: holdSkill(3, 3, 180, 3) },
  { id: 'straddle-to-full-planche', name: 'Straddle to Full Planche', description: 'Progressive transition', category: 'Elite', workout: holdSkill(3, 5, 120, 3) },
  { id: 'three-finger-pushup', name: 'Three-Finger Push-up', description: 'Extreme hand reduction', category: 'Elite', workout: repSkill(3, 5, 120, 3) },
  { id: 'tornado', name: 'Tornado (Dynamic Swing)', description: 'Swinging rotation', category: 'Elite', workout: repSkill(3, 3, 120, 3) },
  { id: 'tuck-to-full-planche', name: 'Tuck Planche to Full Planche', description: 'Progression', category: 'Elite', workout: holdSkill(3, 5, 120, 3) },
  { id: 'two-finger-pushup', name: 'Two-Finger Push-up', description: 'Extreme finger hold', category: 'Elite', workout: repSkill(3, 3, 180, 3) },
  { id: 'victorian-to-one-arm', name: 'Victorian to One-Arm Lever', description: 'Transition', category: 'Elite', workout: repSkill(3, 3, 180, 3) },
  { id: 'weighted-muscle-ups', name: 'Weighted Muscle-ups', description: 'Added resistance transition', category: 'Elite', workout: repSkill(3, 5, 120, 3) },

  // SUPPORTING/MOBILITY
  { id: 'antagonist-stretching', name: 'Antagonist Stretching', description: 'Balance muscle groups', category: 'Supporting', workout: repSkill(2, 10, 30) },
  { id: 'scapular-activation', name: 'Scapular Activation', description: 'Shoulder blade drills', category: 'Supporting', workout: repSkill(2, 12, 30) },
  { id: 'shoulder-mobility-sequence', name: 'Shoulder Mobility Sequence', description: 'Full shoulder prep', category: 'Supporting', workout: repSkill(2, 10, 30) },
  { id: 'spinal-flexion-extension', name: 'Spinal Flexion/Extension', description: 'Core mobility', category: 'Supporting', workout: repSkill(2, 10, 30) },
  { id: 'wrist-extension-flexion', name: 'Wrist Extension/Flexion', description: 'Joint preparation', category: 'Supporting', workout: repSkill(2, 10, 30) },
  { id: 'hip-flexor-stretches', name: 'Hip Flexor Stretches', description: 'Leg prep', category: 'Supporting', workout: repSkill(2, 10, 30) },
  { id: 'thoracic-rotation', name: 'Thoracic Rotation', description: 'Upper back mobility', category: 'Supporting', workout: repSkill(2, 10, 30) },
]

export function getSkill(index) {
  return SKILLS[index] || null
}

export function getNextSkillIndex(currentIndex) {
  if (currentIndex + 1 < SKILLS.length) return currentIndex + 1
  return null
}

export function isSkillUnlocked(currentIndex, targetIndex) {
  return targetIndex <= currentIndex
}

export function getCategoryColor(category) {
  const map = {
    Beginner: 'emerald',
    Intermediate: 'blue',
    Advanced: 'violet',
    Elite: 'amber',
    Supporting: 'slate',
  }
  return map[category] || 'slate'
}

export function getCategoryRanges() {
  const ranges = []
  let start = 0
  let currentCat = SKILLS[0]?.category
  for (let i = 1; i <= SKILLS.length; i++) {
    if (i === SKILLS.length || SKILLS[i]?.category !== currentCat) {
      ranges.push({ category: currentCat, start, end: i - 1, count: i - start })
      if (i < SKILLS.length) {
        currentCat = SKILLS[i].category
        start = i
      }
    }
  }
  return ranges
}
