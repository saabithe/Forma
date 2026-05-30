import { useState } from 'react'
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react'

export default function ExerciseCard({ exercise, exerciseIndex, isCurrent }) {
  const [expanded, setExpanded] = useState(false)

  if (!exercise) return null
  const execution = exercise.execution

  return (
    <div className={`card rounded-xl overflow-hidden transition-all ${isCurrent ? 'ring-2 ring-primary/30' : ''}`}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
          isCurrent ? 'bg-primary text-white' : 'bg-black/5 text-muted'
        }`}>
          {exerciseIndex + 1}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm truncate">{exercise.name}</p>
          <p className="text-xs text-muted">
            {exercise.type === 'hold'
              ? `${exercise.targetSets} × ${exercise.targetHoldSeconds}s hold`
              : `${exercise.targetSets} × ${exercise.targetReps} reps`
            }
            {exercise.restSeconds > 0 && ` · ${exercise.restSeconds}s rest`}
          </p>
        </div>
        {exercise.targetMuscles?.length > 0 && (
          <div className="hidden sm:flex gap-1 flex-wrap justify-end max-w-[140px]">
            {exercise.targetMuscles.slice(0, 2).map(m => (
              <span key={m} className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/5 text-muted">{m}</span>
            ))}
          </div>
        )}
      </div>

      {/* Warmup Note */}
      {exercise.warmupNote && (
        <div className="px-4 pb-2">
          <div className="flex items-start gap-2 text-xs text-amber-600 bg-amber-500/10 rounded-lg px-3 py-2">
            <AlertTriangle size={12} className="mt-0.5 shrink-0" />
            <span>{exercise.warmupNote}</span>
          </div>
        </div>
      )}

      {/* Execution Tips Toggle */}
      {execution && (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full flex items-center justify-between px-4 py-2 text-xs text-primary hover:bg-black/[3%] transition-colors"
          >
            <span className="font-medium">Execution Tips</span>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {expanded && (
            <div className="px-4 pb-4 space-y-3 text-xs border-t border-border pt-3">
              {/* Setup */}
              {execution.setup?.length > 0 && (
                <div>
                  <p className="font-semibold text mb-1">Setup</p>
                  <ul className="space-y-1">
                    {execution.setup.map((tip, i) => (
                      <li key={i} className="text-muted flex gap-2">
                        <span className="text-muted/50">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Movement */}
              {execution.movement?.length > 0 && (
                <div>
                  <p className="font-semibold text mb-1">Movement</p>
                  <ul className="space-y-1">
                    {execution.movement.map((tip, i) => (
                      <li key={i} className="text-muted flex gap-2">
                        <span className="text-muted/50">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tempo */}
              {execution.tempo && (
                <div>
                  <p className="font-semibold text mb-1">Tempo</p>
                  <p className="text-muted">{execution.tempo}</p>
                </div>
              )}

              {/* Breathing */}
              {execution.breathing && (
                <div>
                  <p className="font-semibold text mb-1">Breathing</p>
                  <p className="text-muted">{execution.breathing}</p>
                </div>
              )}

              {/* Common Mistakes */}
              {execution.commonMistakes?.length > 0 && (
                <div>
                  <p className="font-semibold text-red-600 mb-1">Common Mistakes</p>
                  <ul className="space-y-1">
                    {execution.commonMistakes.map((mistake, i) => (
                      <li key={i} className="text-red-500/70 flex gap-2">
                        <span className="text-red-300">✗</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Mental Cues */}
              {execution.mentalCues?.length > 0 && (
                <div>
                  <p className="font-semibold text-emerald-600 mb-1">Mental Cues</p>
                  <ul className="space-y-1">
                    {execution.mentalCues.map((cue, i) => (
                      <li key={i} className="text-emerald-600/70 flex gap-2">
                        <span className="text-emerald-400">→</span>
                        <span>{cue}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Form Checkpoints */}
              {execution.formCheckpoints?.length > 0 && (
                <div>
                  <p className="font-semibold text mb-1">Form Checkpoints</p>
                  <ul className="space-y-1">
                    {execution.formCheckpoints.map((cp, i) => (
                      <li key={i} className="text-muted">
                        <span className="font-medium">{cp.checkpoint}</span>
                        <span className="text-emerald-500 ml-1">→ {cp.yes}</span>
                        <span className="text-muted/70 ml-1">/ {cp.no}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
