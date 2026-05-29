import { useMemo } from 'react'
import { Trophy } from 'lucide-react'
import { getPersonalRecords, getExerciseList } from '../lib/progress-stats'

export default function PersonalRecords({ state, compact = false }) {
  const allPRs = useMemo(() => getPersonalRecords(state), [state])
  const exercises = useMemo(() => getExerciseList(state), [state])

  if (allPRs.size === 0) return null

  const sorted = Array.from(allPRs.entries())
    .sort(([, a], [, b]) => b.totalSessions - a.totalSessions)

  if (compact) {
    // Compact variant — top 5 PRs as inline badges
    return (
      <div className="flex flex-wrap gap-2">
        {sorted.slice(0, 5).map(([id, pr]) => {
          const exercise = exercises.find(e => e.exerciseId === id)
          return (
            <span
              key={id}
              className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-bold"
            >
              {exercise?.name || id}: {pr.maxReps > 0 ? `${pr.maxReps}r` : `${pr.maxHoldSeconds}s`}
            </span>
          )
        })}
      </div>
    )
  }

  // Full variant — scrollable list
  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="font-display font-semibold mb-3 text-sm text-muted uppercase tracking-wider flex items-center gap-2">
        <Trophy size={14} /> Personal Records
      </h3>
      <div className="space-y-2">
        {sorted.map(([id, pr]) => {
          const exercise = exercises.find(e => e.exerciseId === id)
          return (
            <div key={id} className="flex items-center gap-3 text-sm py-1">
              <span className="flex-1 truncate">{exercise?.name || id}</span>
              <span className="text-xs text-primary font-bold">
                {pr.maxReps > 0 ? `${pr.maxReps} reps` : `${pr.maxHoldSeconds}s`}
              </span>
              <span className="text-xs text-muted">{pr.totalSessions}x</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
