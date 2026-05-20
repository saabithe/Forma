import { CheckCircle2, XCircle, MinusCircle, ArrowRight, Clock } from 'lucide-react'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

const ratingConfig = {
  success: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', label: 'Target Hit' },
  partial: { icon: MinusCircle, color: 'text-amber-500', bg: 'bg-amber-50', label: 'Partial' },
  fail: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-50', label: 'Below Target' },
}

export default function Results({ exerciseResults, totalTime, skillName, phaseName, onContinue }) {
  if (!exerciseResults) return null

  const overallRating = (() => {
    const successes = exerciseResults.filter(e => e.performanceRating === 'success').length
    const ratio = successes / exerciseResults.length
    if (ratio >= 0.75) return 'success'
    if (ratio >= 0.5) return 'partial'
    return 'fail'
  })()

  const overallConfig = ratingConfig[overallRating]

  return (
    <div className="fixed inset-0 z-[100] bg-bg flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <p className="text-xs text-muted uppercase tracking-wider">Workout Complete</p>
        <h1 className="text-xl font-display font-bold">{skillName}</h1>
        <p className="text-sm text-muted">{phaseName}</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {/* Overall */}
        <div className={`glass rounded-xl p-4 flex items-center gap-3`}>
          <div className={`w-10 h-10 rounded-xl ${overallConfig.bg} flex items-center justify-center`}>
            <overallConfig.icon size={20} className={overallConfig.color} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{overallConfig.label}</p>
            <p className="text-xs text-muted">{exerciseResults.filter(e => e.performanceRating === 'success').length}/{exerciseResults.length} exercises at target</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted">
            <Clock size={12} />
            <span>{formatTime(totalTime)}</span>
          </div>
        </div>

        {/* Per-exercise results */}
        {exerciseResults.map((result, i) => {
          const config = ratingConfig[result.performanceRating] || ratingConfig.fail
          return (
            <div key={i} className="glass rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                  {i + 1}
                </span>
                <span className="flex-1 font-medium text-sm">{result.exerciseId}</span>
                <span className={`text-xs font-medium ${config.color}`}>{config.label}</span>
              </div>

              <div className="space-y-1">
                {result.sets.map((set, j) => {
                  const target = set.targetHoldSeconds || set.targetReps
                  const actual = set.holdSeconds || set.reps
                  return (
                    <div key={j} className="flex items-center gap-2 text-xs">
                      <span className="text-muted w-12">Set {j + 1}</span>
                      <span className={set.completed ? 'text-emerald-600' : 'text-red-400'}>
                        {set.holdSeconds !== undefined ? `${set.holdSeconds}s` : `${set.reps} reps`}
                      </span>
                      <span className="text-muted">/ {target}{set.holdSeconds !== undefined ? 's' : ''}</span>
                      {set.completed
                        ? <CheckCircle2 size={12} className="text-emerald-500 ml-auto" />
                        : <XCircle size={12} className="text-red-400 ml-auto" />
                      }
                    </div>
                  )
                })}
              </div>

              {result.formQualityMet && (
                <div className="text-xs text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Form quality confirmed
                </div>
              )}

              {result.notes && (
                <p className="text-xs text-muted italic">&ldquo;{result.notes}&rdquo;</p>
              )}
            </div>
          )
        })}
      </div>

      {/* Continue */}
      <div className="px-6 py-4 border-t border-border">
        <button
          onClick={onContinue}
          className="w-full py-3.5 rounded-xl bg-primary text-white font-display font-semibold hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
