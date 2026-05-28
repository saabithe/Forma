import { useState } from 'react'
import { Play, SkipForward, CheckCircle2, ArrowRight, X, Minus, Plus, RotateCcw, Eye, EyeOff } from 'lucide-react'
import { useWorkoutSession } from '../hooks/useWorkoutSession'
import ExerciseCard from '../components/ExerciseCard'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function TimerCircle({ current, total, label }) {
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
        <p className="text-4xl font-display font-bold">{formatTime(current)}</p>
        {label && <p className="text-xs text-muted mt-1">{label}</p>}
      </div>
    </div>
  )
}

export default function WorkoutSession({ workout, onDismiss, onClose, settings }) {
  const [warmupDone, setWarmupDone] = useState(false)
  const {
    currentExerciseIndex, currentExercise, currentSet, phase, timer, reps,
    restTimer, setResults, exerciseResults, notes, showExecutionTips,
    formQualityMet, totalTime,
    startWorkout, completeSet, startNextExercise, skipRest, resetSet,
    incrementReps, decrementReps, setNotes, setShowExecutionTips,
    setFormQualityMet, setTimer,
    totalExercises, isLastExercise,
  } = useWorkoutSession(workout.exercises, null, settings)

  // ─── WARMUP PHASE ──────────────────────────────────────────
  if (phase === 'intro' && workout.warmup?.length > 0 && !warmupDone) {
    return (
      <div className="fixed inset-0 z-[100] bg-bg flex flex-col">
        <div className="px-6 py-4 flex items-center justify-between border-b border-border">
          <div>
            <p className="text-xs text-muted uppercase tracking-wider">Warmup</p>
            <h1 className="text-xl font-display font-bold">{workout.phaseName || workout.skillId}</h1>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={18} className="text-muted" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <p className="text-sm text-muted mb-4">Get your body ready. Complete these mobility drills before starting.</p>
          <div className="space-y-2">
            {workout.warmup.map((ex, i) => (
              <div key={i} className="glass rounded-xl p-4 flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{ex.name}</p>
                  <p className="text-xs text-muted">
                    {ex.type === 'hold' ? `${ex.targetHoldSeconds || 30}s hold` : `${ex.targetReps || 10} reps`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-border">
          <button
            onClick={() => setWarmupDone(true)}
            className="w-full py-3.5 rounded-xl bg-primary text-white font-display font-semibold hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
          >
            <Play size={18} /> Ready — Start Workout
          </button>
        </div>
      </div>
    )
  }

  // ─── INTRO PHASE ───────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="fixed inset-0 z-[100] bg-bg flex flex-col">
        <div className="px-6 py-4 flex items-center justify-between border-b border-border">
          <div>
            <p className="text-xs text-muted uppercase tracking-wider">{workout.phaseName}</p>
            <h1 className="text-xl font-display font-bold">{workout.skillName || workout.skillId}</h1>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
            <X size={18} className="text-muted" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
          <p className="text-sm text-muted mb-2">{workout.exercises.length} exercises · ~{workout.estimatedDuration} min</p>
          {workout.exercises.map((ex, i) => (
            <ExerciseCard key={i} exercise={ex} exerciseIndex={i} isCurrent={false} />
          ))}
        </div>

        <div className="px-6 py-4 border-t border-border">
          <button
            onClick={startWorkout}
            className="w-full py-3.5 rounded-xl bg-primary text-white font-display font-semibold hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
          >
            <Play size={18} /> Start Workout
          </button>
        </div>
      </div>
    )
  }

  // ─── ACTIVE PHASE ──────────────────────────────────────────
  if (phase === 'active' && currentExercise) {
    const isHold = currentExercise.type === 'hold'
    const targetMet = isHold ? timer === 0 : reps >= (currentExercise.targetReps || 0)

    return (
      <div className="fixed inset-0 z-[100] bg-bg flex flex-col">
        {/* Top bar */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
              {currentExerciseIndex + 1}/{totalExercises}
            </span>
            <div>
              <p className="font-semibold text-sm">{currentExercise.name}</p>
              <p className="text-xs text-muted">Set {currentSet} of {currentExercise.targetSets}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowExecutionTips(!showExecutionTips)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title="Toggle execution tips"
            >
              {showExecutionTips ? <EyeOff size={16} className="text-muted" /> : <Eye size={16} className="text-muted" />}
            </button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100">
              <X size={18} className="text-muted" />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6">
          {/* Timer or Rep Counter */}
          {isHold ? (
            <div className="text-center">
              <TimerCircle current={timer} total={currentExercise.targetHoldSeconds} label="Hold" />
              <div className="mt-4 flex items-center justify-center gap-3">
                <button onClick={resetSet} className="p-3 rounded-xl glass hover:bg-gray-100 transition-colors">
                  <RotateCcw size={18} className="text-muted" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-7xl font-display font-bold mb-2">{reps}</p>
              <p className="text-sm text-muted">Target: {currentExercise.targetReps} reps</p>
              <div className="mt-4 flex items-center justify-center gap-4">
                <button onClick={decrementReps} className="w-14 h-14 rounded-full glass flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <Minus size={24} className="text-muted" />
                </button>
                <button onClick={incrementReps} className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-light transition-colors">
                  <Plus size={24} />
                </button>
              </div>
            </div>
          )}

          {/* Set progress dots */}
          <div className="flex gap-2 mt-6">
            {Array.from({ length: currentExercise.targetSets }).map((_, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${
                i < setResults.length ? (setResults[i].completed ? 'bg-emerald-500' : 'bg-red-400') :
                i === setResults.length ? 'bg-primary ring-2 ring-primary/30' :
                'bg-gray-200'
              }`} />
            ))}
          </div>

          {/* Form Quality Toggle */}
          <div className="mt-4">
            <button
              onClick={() => setFormQualityMet(!formQualityMet)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs transition-colors ${
                formQualityMet ? 'bg-emerald-50 text-emerald-600' : 'glass text-muted hover:bg-gray-100'
              }`}
            >
              <CheckCircle2 size={14} />
              Form quality confirmed
            </button>
          </div>

          {/* Notes */}
          <div className="mt-3 w-full max-w-xs">
            <input
              type="text"
              placeholder="Notes (optional)"
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-lg glass text-sm text-center placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {/* Execution Tips Panel */}
        {showExecutionTips && currentExercise.execution && (
          <ExecutionTipsPanel execution={currentExercise.execution} onClose={() => setShowExecutionTips(false)} />
        )}

        {/* Complete Set Button */}
        <div className="px-6 py-4 border-t border-border">
          <button
            onClick={completeSet}
            className={`w-full py-3.5 rounded-xl font-display font-semibold transition-colors flex items-center justify-center gap-2 ${
              targetMet
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-primary text-white hover:bg-primary-light'
            }`}
          >
            <CheckCircle2 size={18} />
            {targetMet ? 'Complete Set' : 'Complete Set (below target)'}
          </button>
        </div>
      </div>
    )
  }

  // ─── REST PHASE ────────────────────────────────────────────
  if (phase === 'rest') {
    return (
      <div className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center px-6">
        <p className="text-xs text-muted uppercase tracking-widest mb-2">Rest</p>
        <p className="text-6xl font-display font-bold mb-2">{formatTime(restTimer)}</p>
        <p className="text-sm text-muted mb-6">Set {currentSet + 1} of {currentExercise?.targetSets}</p>

        {/* Next set preview */}
        <div className="glass rounded-xl p-4 w-full max-w-xs mb-6">
          <p className="text-xs text-muted mb-1">Next Set</p>
          <p className="font-medium text-sm">{currentExercise?.name}</p>
          <p className="text-xs text-muted">
            {currentExercise?.type === 'hold'
              ? `Hold for ${currentExercise.targetHoldSeconds}s`
              : `${currentExercise?.targetReps} reps`
            }
          </p>
        </div>

        <button
          onClick={skipRest}
          className="px-6 py-3 rounded-xl glass text-muted font-medium hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          <SkipForward size={16} /> Skip Rest
        </button>
      </div>
    )
  }

  // ─── BETWEEN EXERCISES PHASE ───────────────────────────────
  if (phase === 'between-exercises') {
    const completedExercise = exerciseResults[exerciseResults.length - 1]
    const nextExercise = workout.exercises[currentExerciseIndex + 1]

    return (
      <div className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center px-6">
        <CheckCircle2 size={32} className="text-emerald-500 mb-3" />
        <p className="text-lg font-display font-bold mb-1">{currentExercise?.name}</p>
        <p className={`text-sm font-medium mb-4 ${
          completedExercise?.performanceRating === 'success' ? 'text-emerald-500' :
          completedExercise?.performanceRating === 'partial' ? 'text-amber-500' : 'text-red-400'
        }`}>
          {completedExercise?.performanceRating === 'success' ? 'Target Hit' :
           completedExercise?.performanceRating === 'partial' ? 'Partial' : 'Below Target'}
        </p>

        {nextExercise && (
          <div className="glass rounded-xl p-4 w-full max-w-xs mb-6">
            <p className="text-xs text-muted mb-1">Up Next</p>
            <p className="font-medium text-sm">{nextExercise.name}</p>
            <p className="text-xs text-muted">
              {nextExercise.type === 'hold'
                ? `${nextExercise.targetSets}×${nextExercise.targetHoldSeconds}s hold`
                : `${nextExercise.targetSets}×${nextExercise.targetReps} reps`
              }
            </p>
          </div>
        )}

        <button
          onClick={startNextExercise}
          className="w-full max-w-xs py-3.5 rounded-xl bg-primary text-white font-display font-semibold hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
        >
          <ArrowRight size={18} /> Next Exercise
        </button>
      </div>
    )
  }

  // ─── COMPLETE PHASE ────────────────────────────────────────
  if (phase === 'complete') {
    return (
      <div className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center px-6">
        <div className="w-20 h-20 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
          <CheckCircle2 size={40} className="text-emerald-500" />
        </div>
        <h1 className="text-2xl font-display font-bold mb-1">Workout Complete</h1>
        <p className="text-sm text-muted mb-6">{formatTime(totalTime)}</p>

        {/* Exercise summary */}
        <div className="w-full max-w-xs space-y-2 mb-6">
          {exerciseResults.map((result, i) => (
            <div key={i} className="glass rounded-lg p-3 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                result.performanceRating === 'success' ? 'bg-emerald-500' :
                result.performanceRating === 'partial' ? 'bg-amber-500' : 'bg-red-400'
              }`} />
              <span className="flex-1 text-sm truncate">{result.exerciseId}</span>
              <span className={`text-xs font-medium ${
                result.performanceRating === 'success' ? 'text-emerald-500' :
                result.performanceRating === 'partial' ? 'text-amber-500' : 'text-red-400'
              }`}>
                {result.performanceRating}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => onDismiss && onDismiss(exerciseResults, totalTime)}
          className="w-full max-w-xs py-3.5 rounded-xl bg-primary text-white font-display font-semibold hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
        >
          <CheckCircle2 size={18} /> Finish
        </button>
      </div>
    )
  }

  return null
}

// ─── Execution Tips Panel ─────────────────────────────────────
function ExecutionTipsPanel({ execution, onClose }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[110] bg-surface border-t border-border rounded-t-2xl max-h-[60vh] overflow-y-auto">
      <div className="sticky top-0 bg-surface px-6 py-3 flex items-center justify-between border-b border-border">
        <p className="font-semibold text-sm">Execution Tips</p>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100">
          <X size={16} className="text-muted" />
        </button>
      </div>
      <div className="px-6 py-4 space-y-4 text-xs">
        {execution.setup?.length > 0 && (
          <div>
            <p className="font-semibold text-gray-700 mb-1">Setup</p>
            <ul className="space-y-1">
              {execution.setup.map((tip, i) => (
                <li key={i} className="text-muted flex gap-2"><span className="text-gray-300">•</span><span>{tip}</span></li>
              ))}
            </ul>
          </div>
        )}
        {execution.movement?.length > 0 && (
          <div>
            <p className="font-semibold text-gray-700 mb-1">Movement</p>
            <ul className="space-y-1">
              {execution.movement.map((tip, i) => (
                <li key={i} className="text-muted flex gap-2"><span className="text-gray-300">•</span><span>{tip}</span></li>
              ))}
            </ul>
          </div>
        )}
        {execution.tempo && (
          <div>
            <p className="font-semibold text-gray-700 mb-1">Tempo</p>
            <p className="text-muted">{execution.tempo}</p>
          </div>
        )}
        {execution.breathing && (
          <div>
            <p className="font-semibold text-gray-700 mb-1">Breathing</p>
            <p className="text-muted">{execution.breathing}</p>
          </div>
        )}
        {execution.mentalCues?.length > 0 && (
          <div>
            <p className="font-semibold text-emerald-600 mb-1">Mental Cues</p>
            <ul className="space-y-1">
              {execution.mentalCues.map((cue, i) => (
                <li key={i} className="text-emerald-600/70 flex gap-2"><span className="text-emerald-400">→</span><span>{cue}</span></li>
              ))}
            </ul>
          </div>
        )}
        {execution.commonMistakes?.length > 0 && (
          <div>
            <p className="font-semibold text-red-600 mb-1">Common Mistakes</p>
            <ul className="space-y-1">
              {execution.commonMistakes.map((m, i) => (
                <li key={i} className="text-red-500/70 flex gap-2"><span className="text-red-300">✗</span><span>{m}</span></li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
