// A-Z Linear Calisthenics Roadmap
// Skills are ordered by progressive difficulty — one chain, unlock sequentially

export const SKILLS = [
  // BEGINNER FOUNDATION
  { id: 'passive-hang', name: 'Passive Hang', description: 'Dead hang, no activity', category: 'Beginner' },
  { id: 'active-hang', name: 'Active Hang', description: 'Dead hang with controlled grip', category: 'Beginner' },
  { id: 'wrist-mobility-drills', name: 'Wrist Mobility Drills', description: 'Prep for skills', category: 'Beginner' },
  { id: 'hinge-cat-cow', name: 'Hinge (Cat Cow)', description: 'Spinal mobility drill', category: 'Beginner' },
  { id: 'basic-plank', name: 'Basic Plank', description: 'Standard plank hold', category: 'Beginner' },
  { id: 'glute-bridge', name: 'Glute Bridge', description: 'Hip thrust from floor', category: 'Beginner' },
  { id: 'bodyweight-squat', name: 'Bodyweight Squat', description: 'Full squat, no support', category: 'Beginner' },
  { id: 'lunges', name: 'Lunges', description: 'Forward step-down', category: 'Beginner' },
  { id: 'assisted-squats', name: 'Assisted Squats', description: 'Hold support while squatting', category: 'Beginner' },
  { id: 'incline-pushups', name: 'Incline Push-ups', description: 'Hands elevated', category: 'Beginner' },
  { id: 'pushups', name: 'Push-ups', description: 'Standard chest pressing', category: 'Beginner' },
  { id: 'situps', name: 'Sit-ups', description: 'Core flexion', category: 'Beginner' },
  { id: 'knee-raises', name: 'Knee Raises', description: 'Hanging, bent knees', category: 'Beginner' },
  { id: 'reverse-plank', name: 'Reverse Plank', description: 'Back-facing plank', category: 'Beginner' },
  { id: 'scapular-pulls', name: 'Scapular Pulls', description: 'Shoulder blade activation', category: 'Beginner' },
  { id: 'australian-rows', name: 'Australian Rows', description: 'Inverted rows on bar', category: 'Beginner' },
  { id: 'back-bridge', name: 'Back Bridge', description: 'Lying back extension', category: 'Beginner' },
  { id: 'lateral-leg-raises', name: 'Lateral Leg Raises', description: 'Side lying leg work', category: 'Beginner' },
  { id: 'split-squat', name: 'Split Squat', description: 'Forward lunge stance', category: 'Beginner' },
  { id: 'clapping-jacks', name: 'Clapping Jacks', description: 'Jumping jacks', category: 'Beginner' },
  { id: 'mountain-climbers', name: 'Mountain Climbers', description: 'Dynamic plank work', category: 'Beginner' },
  { id: 'hollow-body-hold', name: 'Hollow Body Hold', description: 'Abs-in body tension', category: 'Beginner' },
  { id: 'reverse-hyperextension', name: 'Reverse Hyperextension', description: 'Bench back extension', category: 'Beginner' },
  { id: 'pike-pushups', name: 'Pike Push-ups', description: 'Inverted V push', category: 'Beginner' },
  { id: 'knuckle-pushups', name: 'Knuckle Push-ups', description: 'Fist-based push-ups', category: 'Beginner' },
  { id: 'box-dips', name: 'Box Dips', description: 'Dips on elevated surface', category: 'Beginner' },
  { id: 'jumping-squats', name: 'Jumping Squats', description: 'Explosive leg power', category: 'Beginner' },
  { id: 'farmer-carry', name: 'Farmer Carry', description: 'Waiter walk (light tension)', category: 'Beginner' },
  { id: 'knee-hang', name: 'Knee Hang', description: 'Passive hang, bent knees', category: 'Beginner' },
  { id: 'tuck-hang', name: 'Tuck Hang', description: 'Hang with pulled knees', category: 'Beginner' },
  { id: 'frog-stand', name: 'Frog Stand', description: 'Weight on hands, knees on elbows', category: 'Beginner' },
  { id: 'support-hold', name: 'Support Hold', description: 'Dip position static', category: 'Beginner' },
  { id: 'shrimp-squat', name: 'Shrimp Squat', description: 'Near pistol progression', category: 'Beginner' },
  { id: 'handstand-wall-hold', name: 'Handstand Wall Hold', description: 'Wall-assisted handstand', category: 'Beginner' },
  { id: 'wall-handstand-walk', name: 'Wall Handstand Walk', description: 'Hands on wall, feet walking', category: 'Beginner' },

  // INTERMEDIATE
  { id: 'chin-ups', name: 'Chin-Ups', description: 'Underhand pull-ups', category: 'Intermediate' },
  { id: 'pull-ups', name: 'Pull-ups', description: 'Standard vertical pull', category: 'Intermediate' },
  { id: 'dips', name: 'Dips', description: 'Standard chest/tricep press', category: 'Intermediate' },
  { id: 'arch-body-hold', name: 'Arch Body Hold', description: 'Extended back tension', category: 'Intermediate' },
  { id: 'hollow-body-rocks', name: 'Hollow Body Rocks', description: 'Dynamic hollow body', category: 'Intermediate' },
  { id: 'parallel-squats', name: 'Parallel Squats', description: 'Deep two-leg squat', category: 'Intermediate' },
  { id: 'jumping-lunges', name: 'Jumping Lunges', description: 'Explosive alternating', category: 'Intermediate' },
  { id: 'copenhagen-adduction', name: 'Copenhagen Adduction', description: 'Side-lying leg tension', category: 'Intermediate' },
  { id: 'full-pushups', name: 'Full Push-ups', description: 'Chest-to-ground', category: 'Intermediate' },
  { id: 'clap-pushups', name: 'Clap Push-ups', description: 'Explosive push-up', category: 'Intermediate' },
  { id: 'scapular-pushups', name: 'Scapular Push-ups', description: 'Shoulder isolation', category: 'Intermediate' },
  { id: 'high-pull-ups', name: 'High Pull-ups', description: 'Full range pull-ups', category: 'Intermediate' },
  { id: 'knee-tucks', name: 'Knee Tucks', description: 'Dynamic core pull', category: 'Intermediate' },
  { id: 'toes-to-bar', name: 'Toes-to-Bar', description: 'Dynamic core pull', category: 'Intermediate' },
  { id: 'tricep-dips', name: 'Tricep Dips', description: 'Parallel bar dips', category: 'Intermediate' },
  { id: 'german-hang', name: 'German Hang', description: 'Scapular retraction hang', category: 'Intermediate' },
  { id: 'skin-the-cat', name: 'Skin the Cat', description: 'Bar rotation hold', category: 'Intermediate' },
  { id: 'one-arm-hangs', name: 'One-Arm Hangs', description: 'Single-arm dead hang', category: 'Intermediate' },
  { id: 'l-sit', name: 'L-Sit', description: 'Seated horizontal core', category: 'Intermediate' },
  { id: 'core-hold-v-sit', name: 'Core Hold (V-Sit)', description: 'Seated L-position', category: 'Intermediate' },
  { id: 'pistol-squat-assisted', name: 'Pistol Squat (assisted)', description: 'Single-leg squat', category: 'Intermediate' },
  { id: 'single-leg-squats-supported', name: 'Single-Leg Squats (supported)', description: 'Balance work', category: 'Intermediate' },
  { id: 'planche-lean', name: 'Planche Lean', description: 'Horizontal push lean', category: 'Intermediate' },
  { id: 'straddle-planche-lean', name: 'Straddle Planche Lean', description: 'Legs apart planche lean', category: 'Intermediate' },
  { id: 'pseudo-planche-pushups', name: 'Pseudo Planche Push-ups', description: 'Lean forward push', category: 'Intermediate' },
  { id: 'pushup-progressions', name: 'Push-up Progressions', description: 'Various hand positions', category: 'Intermediate' },
  { id: 'elbow-lever', name: 'Elbow Lever', description: 'Support on elbows', category: 'Intermediate' },
  { id: 'tucked-planche', name: 'Tucked Planche', description: 'Body compressed horizontal', category: 'Intermediate' },
  { id: 'tuck-front-lever', name: 'Tuck Front Lever', description: 'Bent legs front lever', category: 'Intermediate' },
  { id: 'lever-progressions', name: 'Lever Progressions', description: 'Static pulling holds', category: 'Intermediate' },
  { id: 'handstand', name: 'Handstand', description: 'Vertical balance', category: 'Intermediate' },
  { id: 'handstand-walk', name: 'Handstand Walk', description: 'Locomotion on hands', category: 'Intermediate' },
  { id: 'dragon-flag', name: 'Dragon Flag', description: 'Core hold on bench', category: 'Intermediate' },
  { id: 'back-lever', name: 'Back Lever', description: 'Horizontal pull-facing down', category: 'Intermediate' },
  { id: 'flag-raise', name: 'Flag Raise', description: 'Partial human flag', category: 'Intermediate' },
  { id: 'iron-cross-hold', name: 'Iron Cross Hold', description: 'Rings, arms perpendicular', category: 'Intermediate' },
  { id: 'manna', name: 'Manna', description: 'Extended V-sit (advanced)', category: 'Intermediate' },
  { id: 'muscle-ups', name: 'Muscle-Ups', description: 'Transition skill', category: 'Intermediate' },
  { id: 'bar-muscle-up', name: 'Bar Muscle-Up', description: 'Pull-up to dip transition', category: 'Intermediate' },

  // ADVANCED
  { id: 'archer-pull-ups', name: 'Archer Pull-ups', description: 'Assisted one-arm pull', category: 'Advanced' },
  { id: 'clapping-pull-ups', name: 'Clapping Pull-ups', description: 'Explosive pull variation', category: 'Advanced' },
  { id: 'kipping-pull-ups', name: 'Kipping Pull-ups', description: 'Momentum-based pull', category: 'Advanced' },
  { id: 'weighted-pull-ups', name: 'Weighted Pull-ups', description: 'Added resistance', category: 'Advanced' },
  { id: 'weighted-dips', name: 'Weighted Dips', description: 'Added resistance', category: 'Advanced' },
  { id: 'weighted-squats', name: 'Weighted Squats', description: 'Added resistance', category: 'Advanced' },
  { id: 'one-leg-pistol-squat', name: 'One-Leg Pistol Squat', description: 'Full single-leg squat', category: 'Advanced' },
  { id: 'superman-hold', name: 'Superman Hold', description: 'Extended arch hold', category: 'Advanced' },
  { id: 'back-lever-rolls', name: 'Back Lever Rolls', description: 'Dynamic back lever', category: 'Advanced' },
  { id: 'extended-back-lever', name: 'Extended Back Lever', description: 'Fully extended back hold', category: 'Advanced' },
  { id: 'rings-rows', name: 'Rings Rows', description: 'Rings horizontal pull', category: 'Advanced' },
  { id: 'rings-dips', name: 'Rings Dips', description: 'Rings pressing', category: 'Advanced' },
  { id: 'rings-muscle-up', name: 'Rings Muscle-Up', description: 'Rings transition', category: 'Advanced' },
  { id: 'rope-climbing', name: 'Rope Climbing', description: 'Vertical rope ascent', category: 'Advanced' },
  { id: 'front-lever', name: 'Front Lever', description: 'Horizontal pull-facing up', category: 'Advanced' },
  { id: 'front-lever-pulls', name: 'Front Lever Pulls', description: 'Dynamic front lever', category: 'Advanced' },
  { id: 'lever-work', name: 'Lever Work', description: 'Static pulling progressions', category: 'Advanced' },
  { id: 'cross-lever', name: 'Cross Lever', description: 'Rings, body perpendicular', category: 'Advanced' },
  { id: 'side-lever', name: 'Side Lever', description: 'Lateral pole hold', category: 'Advanced' },
  { id: 'human-flag', name: 'Human Flag', description: 'Pole hold, body horizontal', category: 'Advanced' },
  { id: 'iron-cross-rings', name: 'Iron Cross (hold + rings)', description: 'Advanced rings', category: 'Advanced' },
  { id: 'full-planche', name: 'Full Planche', description: 'Legs together horizontal', category: 'Advanced' },
  { id: 'straddle-planche', name: 'Straddle Planche', description: 'Legs apart horizontal hold', category: 'Advanced' },
  { id: 'tuck-to-straddle-progression', name: 'Tuck to Straddle Progression', description: 'Planche progression', category: 'Advanced' },
  { id: 'maltese-progression', name: 'Maltese Progression', description: 'Advanced wide-grip planche', category: 'Advanced' },
  { id: 'victorian', name: 'Victorian', description: 'Hybrid front lever + dragon press', category: 'Advanced' },
  { id: 'handstand-pushups', name: 'Handstand Push-ups', description: 'Vertical pressing', category: 'Advanced' },
  { id: 'handstand-shoulder-taps', name: 'Handstand Shoulder Taps', description: 'Balance disruption', category: 'Advanced' },
  { id: 'shaped-handstand', name: 'Shaped Handstand', description: 'Controlled vertical balance', category: 'Advanced' },
  { id: 'straight-arm-shoulder-hold', name: 'Straight Arm Shoulder Hold', description: 'Protraction/depression', category: 'Advanced' },
  { id: 'skin-the-cat-full', name: 'Skin the Cat (Full)', description: 'Complete rotation', category: 'Advanced' },
  { id: 'dragon-press', name: 'Dragon Press', description: 'Front lever from lying', category: 'Advanced' },
  { id: 'elbow-lever-to-handstand', name: 'Elbow Lever to Handstand', description: 'Dynamic transition', category: 'Advanced' },
  { id: 'muscle-up-to-dip', name: 'Muscle-Up to Dip', description: 'Clean transition', category: 'Advanced' },
  { id: 'rewind-muscle-ups', name: 'Rewind Muscle-ups', description: 'Reverse transition', category: 'Advanced' },
  { id: 'one-arm-pushup', name: 'One-Arm Push-up', description: 'Single-arm horizontal', category: 'Advanced' },
  { id: 'one-arm-chin-up', name: 'One-Arm Chin-up', description: 'Single-arm underhand', category: 'Advanced' },
  { id: 'pseudo-planche-pushups-adv', name: 'Pseudo Planche Push-ups', description: 'Horizontal push', category: 'Advanced' },
  { id: 'windmill-handstand', name: 'Windmill (Handstand)', description: 'Dynamic arm rotation', category: 'Advanced' },
  { id: 'wrist-lock-holds', name: 'Wrist Lock/Holds', description: 'Grip endurance', category: 'Advanced' },

  // ELITE/EXTREME
  { id: '360-rotation', name: '360 Degree Rotation', description: 'Full body spin on bar', category: 'Elite' },
  { id: 'back-to-front-lever', name: 'Back Lever to Front Lever', description: 'Lever transitions', category: 'Elite' },
  { id: 'certified-one-arm-fl', name: 'Certified One-Arm Front Lever', description: 'Single-arm pull hold', category: 'Elite' },
  { id: 'clapping-muscle-ups', name: 'Clapping Muscle-ups', description: 'Explosive transition', category: 'Elite' },
  { id: 'crossed-leg-planche', name: 'Crossed-leg Planche', description: 'Advanced leg position', category: 'Elite' },
  { id: 'hs-press-to-planche', name: 'Handstand Press to Planche', description: 'Transition skill', category: 'Elite' },
  { id: 'hs-to-chest-lever', name: 'Handstand to Chest Lever', description: 'Dynamic transition', category: 'Elite' },
  { id: 'hold-to-press-transitions', name: 'Hold-to-Press Transitions', description: 'Skill combinations', category: 'Elite' },
  { id: 'human-flag-holds', name: 'Human Flag Holds', description: 'Extended pole hold', category: 'Elite' },
  { id: 'iron-cross-transitions', name: 'Iron Cross Transitions', description: 'Cross to other skills', category: 'Elite' },
  { id: 'maltese-cross', name: 'Maltese Cross', description: 'Extreme wide-grip hold', category: 'Elite' },
  { id: 'muscle-up-variations', name: 'Muscle-Up Variations', description: '360 muscle-ups', category: 'Elite' },
  { id: 'navajo-flips', name: 'Navajo Flips', description: 'Dynamic handstand', category: 'Elite' },
  { id: 'one-arm-back-lever', name: 'One-Arm Back Lever', description: 'Single-arm pulling hold', category: 'Elite' },
  { id: 'one-arm-front-lever', name: 'One-Arm Front Lever', description: 'Single-arm pulling hold', category: 'Elite' },
  { id: 'one-arm-handstand', name: 'One-Arm Handstand', description: 'Single-arm vertical', category: 'Elite' },
  { id: 'one-arm-planche', name: 'One-Arm Planche', description: 'Single-arm horizontal', category: 'Elite' },
  { id: 'press-handstand', name: 'Press Handstand', description: 'Seated to handstand', category: 'Elite' },
  { id: 'rings-handstand', name: 'Rings Handstand', description: 'Rings vertical balance', category: 'Elite' },
  { id: 'rings-iron-cross', name: 'Rings Iron Cross', description: 'Rings perpendicular hold', category: 'Elite' },
  { id: 'straddle-to-full-planche', name: 'Straddle to Full Planche', description: 'Progressive transition', category: 'Elite' },
  { id: 'three-finger-pushup', name: 'Three-Finger Push-up', description: 'Extreme hand reduction', category: 'Elite' },
  { id: 'tornado', name: 'Tornado (Dynamic Swing)', description: 'Swinging rotation', category: 'Elite' },
  { id: 'tuck-to-full-planche', name: 'Tuck Planche to Full Planche', description: 'Progression', category: 'Elite' },
  { id: 'two-finger-pushup', name: 'Two-Finger Push-up', description: 'Extreme finger hold', category: 'Elite' },
  { id: 'victorian-to-one-arm', name: 'Victorian to One-Arm Lever', description: 'Transition', category: 'Elite' },
  { id: 'weighted-muscle-ups', name: 'Weighted Muscle-ups', description: 'Added resistance transition', category: 'Elite' },

  // SUPPORTING/MOBILITY
  { id: 'antagonist-stretching', name: 'Antagonist Stretching', description: 'Balance muscle groups', category: 'Supporting' },
  { id: 'scapular-activation', name: 'Scapular Activation', description: 'Shoulder blade drills', category: 'Supporting' },
  { id: 'shoulder-mobility-sequence', name: 'Shoulder Mobility Sequence', description: 'Full shoulder prep', category: 'Supporting' },
  { id: 'spinal-flexion-extension', name: 'Spinal Flexion/Extension', description: 'Core mobility', category: 'Supporting' },
  { id: 'wrist-extension-flexion', name: 'Wrist Extension/Flexion', description: 'Joint preparation', category: 'Supporting' },
  { id: 'hip-flexor-stretches', name: 'Hip Flexor Stretches', description: 'Leg prep', category: 'Supporting' },
  { id: 'thoracic-rotation', name: 'Thoracic Rotation', description: 'Upper back mobility', category: 'Supporting' },
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
