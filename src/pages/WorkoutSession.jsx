import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, SkipForward, CheckCircle2, ArrowRight, X, Minus, Plus, RotateCcw } from 'lucide-react'

function playBeep() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 800
    gain.gain.value = 0.3
    osc.start()
    osc.stop(ctx.currentTime + 0.2)
    setTimeout(() => {
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.frequency.value = 1000
      gain2.gain.value = 0.3
      osc2.start()
      osc2.stop(ctx.currentTime + 0.2)
    }, 250)
  } catch {}
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function TimerCircle({ current, total, label, color = 'primary' }) {
  const percent = total > 0 ? ((total - current) / total) * 100 : 0
  const radius = 80
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div className="relative flex items-center justify-center">
      <svg width="200" height="200" className="-rotate-90">
        <circle cx="100" cy="100" r={radius} stroke="currentColor" strokeWidth="6" fill="none" className="text-gray-200" />
        <circle
          cx="100" cy="100" r={radius}
          stroke="currentColor" strokeWidth="6" fill="none"
          className="text-primary"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-4xl font-display font-bold tabular-nums">{formatTime(current)}</p>
        <p className="text-xs text-muted mt-1">{label}</p>
      </div>
    </div>
  )
}

function RepCounter({ reps, onIncrement, onDecrement, target }) {
  return (
    <div className="text-center">
      <p className="text-sm text-muted mb-4">Target: {target} reps</p>
      <div className="flex items-center justify-center gap-8">
        <button
          onClick={onDecrement}
          className="w-16 h-16 rounded-2xl glass flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <Minus size={24} />
        </button>
        <div>
          <p className="text-6xl font-display font-bold tabular-nums">{reps}</p>
          <p className="text-xs text-muted">reps</p>
        </div>
        <button
          onClick={onIncrement}
          className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center hover:bg-primary-light transition-colors"
        >
          <Plus size={24} />
        </button>
      </div>
      {reps >= target && (
        <p className="text-emerald-600 text-sm font-semibold mt-4 flex items-center justify-center gap-1">
          <CheckCircle2 size={14} /> Target reached!
        </p>
      )}
    </div>
  )
}

export default function WorkoutSession({ skill, onComplete, onClose }) {
  const workout = skill.workout
  const [phase, setPhase] = useState('intro') // intro, active, rest, complete
  const [currentSet, setCurrentSet] = useState(1)
  const [timer, setTimer] = useState(workout.type === 'hold' ? workout.holdSeconds : 0)
  const [restTimer, setRestTimer] = useState(workout.restSeconds)
  const [reps, setReps] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [currentCue, setCurrentCue] = useState(0)
  const intervalRef = useRef(null)
  const totalIntervalRef = useRef(null)

  // Total time tracker
  useEffect(() => {
    if (phase === 'intro') return
    if (phase === 'complete') return
    totalIntervalRef.current = setInterval(() => setTotalTime(t => t + 1), 1000)
    return () => clearInterval(totalIntervalRef.current)
  }, [phase])

  // Hold timer
  useEffect(() => {
    if (phase !== 'active' || workout.type !== 'hold') return
    if (timer <= 0) {
      playBeep()
      return
    }
    intervalRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          playBeep()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [phase, workout.type])

  // Rest timer
  useEffect(() => {
    if (phase !== 'rest') return
    if (restTimer <= 0) {
      playBeep()
      goNextSet()
      return
    }
    intervalRef.current = setInterval(() => {
      setRestTimer(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          playBeep()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [phase, restTimer])

  const startWorkout = () => {
    setPhase('active')
    if (workout.type === 'hold') {
      setTimer(workout.holdSeconds)
    }
  }

  const completeSet = () => {
    if (currentSet >= workout.sets) {
      setPhase('complete')
      clearInterval(totalIntervalRef.current)
    } else {
      setPhase('rest')
      setRestTimer(workout.restSeconds)
      setCurrentCue((c) => (c + 1) % workout.cues.length)
    }
  }

  const goNextSet = () => {
    setCurrentSet(s => s + 1)
    setReps(0)
    if (workout.type === 'hold') {
      setTimer(workout.holdSeconds)
    }
    setPhase('active')
  }

  const skipRest = () => {
    clearInterval(intervalRef.current)
    goNextSet()
  }

  const handleFinish = () => {
    onComplete()
  }

  const resetSet = () => {
    if (workout.type === 'hold') {
      setTimer(workout.holdSeconds)
    }
    setReps(0)
  }

  return (
    <div className="fixed inset-0 z-[100] bg-bg flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <div>
          <p className="text-xs text-muted uppercase tracking-wider">{skill.category}</p>
          <p className="font-display font-semibold">{skill.name}</p>
        </div>
        <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <X size={20} className="text-muted" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 overflow-y-auto">
        {/* INTRO */}
        {phase === 'intro' && (
          <div className="text-center max-w-md w-full space-y-6">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
              <Play size={32} className="text-primary ml-1" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold mb-2">{skill.name}</h2>
              <p className="text-muted text-sm">{skill.description}</p>
            </div>
            <div className="glass rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Type</span>
                <span className="font-medium capitalize">{workout.type === 'hold' ? 'Hold (timed)' : 'Reps (counted)'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Sets</span>
                <span className="font-medium">{workout.sets}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">{workout.type === 'hold' ? 'Hold Time' : 'Target Reps'}</span>
                <span className="font-medium">{workout.type === 'hold' ? `${workout.holdSeconds}s` : `${workout.reps} reps`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Rest Between Sets</span>
                <span className="font-medium">{workout.restSeconds}s</span>
              </div>
            </div>
            <button
              onClick={startWorkout}
              className="w-full py-4 rounded-xl bg-primary text-white font-display font-semibold hover:bg-primary-light transition-colors text-lg"
            >
              Start Workout
            </button>
          </div>
        )}

        {/* ACTIVE */}
        {phase === 'active' && (
          <div className="text-center max-w-md w-full space-y-8">
            <div>
              <p className="text-sm text-muted mb-1">Set {currentSet} of {workout.sets}</p>
              <div className="flex justify-center gap-1.5">
                {Array.from({ length: workout.sets }).map((_, i) => (
                  <div key={i} className={`w-8 h-1.5 rounded-full ${i < currentSet ? 'bg-emerald-500' : i === currentSet - 1 ? 'bg-primary' : 'bg-gray-200'}`} />
                ))}
              </div>
            </div>

            {workout.type === 'hold' ? (
              <TimerCircle current={timer} total={workout.holdSeconds} label="remaining" />
            ) : (
              <RepCounter
                reps={reps}
                target={workout.reps}
                onIncrement={() => setReps(r => r + 1)}
                onDecrement={() => setReps(r => Math.max(0, r - 1))}
              />
            )}

            <div className="space-y-3">
              {workout.type === 'hold' ? (
                <button
                  onClick={completeSet}
                  className="w-full py-4 rounded-xl bg-primary text-white font-display font-semibold hover:bg-primary-light transition-colors text-lg"
                >
                  {timer === 0 ? 'Continue' : 'Complete Set Early'}
                </button>
              ) : (
                <button
                  onClick={completeSet}
                  className="w-full py-4 rounded-xl bg-primary text-white font-display font-semibold hover:bg-primary-light transition-colors text-lg"
                >
                  Done — Complete Set
                </button>
              )}
              <button onClick={resetSet} className="text-sm text-muted hover:text-primary flex items-center gap-1 mx-auto transition-colors">
                <RotateCcw size={14} /> Reset this set
              </button>
            </div>

            {/* Cue */}
            <div className="glass rounded-xl p-3">
              <p className="text-xs text-muted">Form Cue</p>
              <p className="text-sm mt-1">{workout.cues[currentCue]}</p>
            </div>
          </div>
        )}

        {/* REST */}
        {phase === 'rest' && (
          <div className="text-center max-w-md w-full space-y-8">
            <p className="text-sm text-muted uppercase tracking-wider">Rest Period</p>
            <TimerCircle current={restTimer} total={workout.restSeconds} label="rest remaining" />
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-muted mb-1">Next: Set {currentSet + 1} of {workout.sets}</p>
              <p className="text-sm font-medium">{workout.cues[currentCue]}</p>
            </div>
            <button
              onClick={skipRest}
              className="w-full py-3 rounded-xl glass font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <SkipForward size={18} /> Skip Rest
            </button>
          </div>
        )}

        {/* COMPLETE */}
        {phase === 'complete' && (
          <div className="text-center max-w-md w-full space-y-6">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 size={40} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold mb-1">Workout Complete</h2>
              <p className="text-muted text-sm">{skill.name}</p>
            </div>
            <div className="glass rounded-xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted">Sets Completed</span>
                <span className="font-medium">{workout.sets} / {workout.sets}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Total Time</span>
                <span className="font-medium">{formatTime(totalTime)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted">Type</span>
                <span className="font-medium capitalize">{workout.type === 'hold' ? 'Hold' : 'Reps'}</span>
              </div>
            </div>
            <button
              onClick={handleFinish}
              className="w-full py-4 rounded-xl bg-primary text-white font-display font-semibold hover:bg-primary-light transition-colors text-lg flex items-center justify-center gap-2"
            >
              Finish & Advance <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
