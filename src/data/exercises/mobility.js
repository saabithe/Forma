// Mobility exercises with execution tips

export const MOBILITY_EXERCISES = {
  'wrist-mobility-drills': {
    id: 'wrist-mobility-drills',
    name: 'Wrist Mobility Drills',
    type: 'reps',
    targetMuscles: ['wrist flexors', 'wrist extensors', 'forearm rotators', 'finger flexors'],
    execution: {
      setup: ['Kneel on the floor with hands flat, fingers pointing forward', 'Weight on your palms'],
      movement: [
        'Rock forward and backward, loading the wrists through flexion and extension',
        'Then rotate your hands so fingers point toward your knees and rock',
        'Then fingers pointing outward (left and right) and rock',
        'Finally, make fists and open your hands wide — 10 repetitions',
      ],
      tempo: '2 seconds each direction. Slow and gentle — this is preparation, not intensity.',
      breathing: 'Normal breathing. Exhale on the stretch, inhale to release.',
      commonMistakes: ['Going too fast', 'Forcing range of motion', 'Skipping directions'],
      mentalCues: ['Gentle loading in every direction', 'Feel the stretch, not the pain'],
      formCheckpoints: [],
    },
    warmupNote: null,
  },

  'thoracic-rotation': {
    id: 'thoracic-rotation',
    name: 'Thoracic Rotation',
    type: 'reps',
    targetMuscles: ['thoracic spine rotators', 'obliques', 'rhomboids'],
    execution: {
      setup: [
        'Start on all fours — hands under shoulders, knees under hips',
        'Place one hand behind your head (elbow pointing out)',
      ],
      movement: [
        'Rotate your upper body to open your chest toward the ceiling',
        'Follow your elbow with your eyes — look at the ceiling',
        'Rotate back down, bringing your elbow toward the opposite knee',
        'Keep your hips stable — only your upper back rotates',
      ],
      tempo: '3 seconds to open, 1 second hold at the top, 3 seconds to close.',
      breathing: 'Exhale as you open (rotate up), inhale as you close (rotate down).',
      commonMistakes: ['Moving the hips — keep them stable', 'Moving too fast', 'Not going through full range'],
      mentalCues: ['Imagine someone is pulling your elbow to the ceiling', 'Feel the rotation in your mid-back, not your lower back', 'Keep your hips as still as a table'],
      formCheckpoints: [
        { checkpoint: 'Hips stable (not rotating)', yes: 'Isolated thoracic work', no: 'Keep hips still' },
        { checkpoint: 'Full rotation achieved', yes: 'Good range', no: 'Open further' },
      ],
    },
    warmupNote: null,
  },

  'hip-flexor-stretches': {
    id: 'hip-flexor-stretches',
    name: 'Hip Flexor Stretches',
    type: 'reps',
    targetMuscles: ['iliopsoas', 'rectus femoris', 'tensor fasciae latae'],
    execution: {
      setup: [
        'Kneel on one knee (use a mat for comfort)',
        'Other foot forward, knee at 90 degrees',
        'Torso upright, hands on the front knee',
      ],
      movement: [
        'Push your hips forward gently until you feel a stretch in the front of the kneeling leg\'s hip',
        'Keep your torso upright — do not lean forward',
        'For a deeper stretch, raise the arm on the kneeling side overhead and lean slightly away',
        'Hold for the target time, then switch sides',
      ],
      tempo: 'Hold the stretch for 20-30 seconds per side. Gentle, sustained stretch.',
      breathing: 'Deep, slow breathing. Exhale to deepen the stretch slightly.',
      commonMistakes: ['Leaning forward — stay upright', 'Not pushing hips far enough forward', 'Holding breath'],
      mentalCues: ['Feel the stretch in the front of your hip', 'Push your hips forward like you are trying to touch a wall in front of you', 'Breathe into the stretch'],
      formCheckpoints: [
        { checkpoint: 'Torso upright', yes: 'Good position', no: 'Lift chest' },
        { checkpoint: 'Stretch felt in front of hip', yes: 'Target area hit', no: 'Push hips further forward' },
      ],
    },
    warmupNote: null,
  },

  'ankle-circles': {
    id: 'ankle-circles',
    name: 'Ankle Circles',
    type: 'reps',
    targetMuscles: ['ankle joint', 'calves', 'shin muscles'],
    execution: {
      setup: ['Sit or stand with one foot off the ground', 'Hold your foot or let it hang freely'],
      movement: [
        'Rotate your ankle in full circles — clockwise',
        'Complete all reps, then reverse to counterclockwise',
        'Make the circles as big as possible',
        'Switch feet and repeat',
      ],
      tempo: '2 seconds per circle. Slow and controlled.',
      breathing: 'Normal breathing.',
      commonMistakes: ['Moving too fast', 'Small circles — make them bigger', 'Only going one direction'],
      mentalCues: ['Trace the biggest circle you can with your toes', 'Feel the full range of ankle motion'],
      formCheckpoints: [],
    },
    warmupNote: null,
  },

  'neck-circles': {
    id: 'neck-circles',
    name: 'Neck Circles',
    type: 'reps',
    targetMuscles: ['neck flexors', 'neck extensors', 'upper trapezius'],
    execution: {
      setup: ['Stand or sit with good posture', 'Shoulders relaxed and down'],
      movement: [
        'Slowly drop your chin to your chest',
        'Roll your head to one side (ear toward shoulder)',
        'Continue rolling back (looking at the ceiling)',
        'Complete the circle to the other side',
        'Reverse direction after half the reps',
      ],
      tempo: '4 seconds per circle. Very slow and gentle.',
      breathing: 'Normal breathing throughout.',
      commonMistakes: ['Moving too fast — neck is delicate', 'Forcing range of motion', 'Not reversing direction'],
      mentalCues: ['Move like you are tracing the biggest circle possible with the top of your head', 'Gentle — this is mobility, not intensity'],
      formCheckpoints: [],
    },
    warmupNote: null,
  },
}
