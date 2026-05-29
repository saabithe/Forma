import { useState, useMemo } from 'react'
import { TrendingUp, Trophy, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react'
import { getExerciseList, getExerciseProgress, getPersonalRecords } from '../lib/progress-stats'
import ProgressChart from '../components/ProgressChart'

export default function Progress({ app }) {
  const { state } = app
  const exercises = useMemo(() => getExerciseList(state), [state])
  const allPRs = useMemo(() => getPersonalRecords(state), [state])
  const [selected, setSelected] = useState(null)

  const selectedId = selected || exercises[0]?.exerciseId
  const chartData = useMemo(
    () => selectedId ? getExerciseProgress(state, selectedId) : [],
    [state, selectedId]
  )
  const selectedPR = selectedId ? allPRs.get(selectedId) : null
  const selectedExercise = exercises.find(e => e.exerciseId === selectedId)

  // Compute trend
  const trend = useMemo(() => {
    if (chartData.length < 2) return null
    const recent = chartData.slice(-3)
    const older = chartData.slice(-6, -3)
    if (older.length === 0) return null
    const recentAvg = recent.reduce((s, d) => s + d.actual, 0) / recent.length
    const olderAvg = older.reduce((s, d) => s + d.actual, 0) / older.length
    const diff = recentAvg - olderAvg
    if (Math.abs(diff) < 0.5) return 'flat'
    return diff > 0 ? 'up' : 'down'
  }, [chartData])

  if (exercises.length === 0) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Progress</h1>
        <div className="glass rounded-2xl p-8 text-center">
          <TrendingUp size={48} className="text-muted mx-auto mb-4 opacity-30" />
          <p className="text-muted">Complete your first workout to see progress here.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Progress</h1>

      {/* Exercise Selector */}
      <div className="glass rounded-xl p-4">
        <p className="text-xs text-muted uppercase tracking-wider mb-2">Exercise</p>
        <select
          value={selectedId || ''}
          onChange={e => setSelected(e.target.value)}
          className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          {exercises.map(ex => (
            <option key={ex.exerciseId} value={ex.exerciseId}>
              {ex.name} ({ex.sessionCount} sessions)
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      {chartData.length > 0 ? (
        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-muted uppercase tracking-wider">
              {selectedExercise?.name || selectedId}
            </p>
            {trend && (
              <div className={`flex items-center gap-1 text-xs font-medium ${
                trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-red-400' : 'text-muted'
              }`}>
                {trend === 'up' ? <ArrowUpRight size={14} /> : trend === 'down' ? <ArrowDownRight size={14} /> : <Minus size={14} />}
                {trend === 'up' ? 'Improving' : trend === 'down' ? 'Declining' : 'Stable'}
              </div>
            )}
          </div>
          <ProgressChart data={chartData} />
        </div>
      ) : (
        <div className="glass rounded-xl p-6 text-center">
          <p className="text-muted text-sm">No data for this exercise yet.</p>
        </div>
      )}

      {/* Stats Summary */}
      {selectedPR && (
        <div className="grid grid-cols-3 gap-3">
          <div className="glass rounded-xl p-3 text-center">
            <p className="text-lg font-bold text-primary">
              {selectedPR.maxReps > 0 ? selectedPR.maxReps : `${selectedPR.maxHoldSeconds}s`}
            </p>
            <p className="text-[10px] text-muted">
              {selectedPR.maxReps > 0 ? 'Max Reps' : 'Max Hold'}
            </p>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <p className="text-lg font-bold">{selectedPR.totalSessions}</p>
            <p className="text-[10px] text-muted">Sessions</p>
          </div>
          <div className="glass rounded-xl p-3 text-center">
            <p className="text-lg font-bold">{Math.round(selectedPR.bestCompletionRate * 100)}%</p>
            <p className="text-[10px] text-muted">Best Rate</p>
          </div>
        </div>
      )}

      {/* All Personal Records */}
      <div className="glass rounded-2xl p-5">
        <h3 className="font-display font-semibold mb-3 text-sm text-muted uppercase tracking-wider flex items-center gap-2">
          <Trophy size={14} /> Personal Records
        </h3>
        <div className="space-y-2">
          {Array.from(allPRs.entries())
            .sort(([, a], [, b]) => b.totalSessions - a.totalSessions)
            .slice(0, 15)
            .map(([id, pr]) => {
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
            })
          }
        </div>
      </div>
    </div>
  )
}
