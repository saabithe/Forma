import { useMemo } from 'react'
import { Calendar } from 'lucide-react'
import { getHeatmapData } from '../lib/progress-stats'

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_LABELS = ['', 'M', '', 'W', '', 'F', '']

const COLORS = [
  'var(--color-surface)',           // level 0 — no workout
  'rgba(23, 77, 56, 0.15)',        // level 1 — light
  'rgba(23, 77, 56, 0.4)',         // level 2 — normal
  'var(--color-primary)',           // level 3 — intense
]

export default function CalendarHeatmap({ state }) {
  const { weeks, totalDays, monthPositions } = useMemo(() => {
    const data = getHeatmapData(state, 12)
    const entries = Array.from(data.entries()).sort(([a], [b]) => a.localeCompare(b))

    if (entries.length === 0) return { weeks: [], totalDays: 0, monthPositions: [] }

    // Group into weeks (columns of 7 days)
    const weeks = []
    let currentWeek = []
    let lastMonth = -1
    const monthPositions = []

    for (const [dateStr, value] of entries) {
      const d = new Date(dateStr + 'T00:00:00')
      const dayOfWeek = d.getDay() // 0=Sun

      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek)
        currentWeek = []
      }

      // Track month label positions
      const month = d.getMonth()
      if (month !== lastMonth) {
        monthPositions.push({ month, weekIndex: weeks.length })
        lastMonth = month
      }

      currentWeek.push({ date: dateStr, ...value })
    }
    if (currentWeek.length > 0) weeks.push(currentWeek)

    let totalDays = 0
    for (const [, value] of entries) {
      if (value.count > 0) totalDays++
    }

    return { weeks, totalDays, monthPositions }
  }, [state])

  if (weeks.length === 0) return null

  return (
    <div className="card rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-muted uppercase tracking-wider flex items-center gap-1.5">
          <Calendar size={12} /> Activity
        </p>
        <p className="text-xs text-muted">{totalDays} workout days</p>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-block">
          {/* Month labels */}
          <div className="flex mb-1" style={{ paddingLeft: '20px' }}>
            {monthPositions.map(({ month, weekIndex }, i) => {
              const nextPos = monthPositions[i + 1]
              const spanWeeks = nextPos ? nextPos.weekIndex - weekIndex : weeks.length - weekIndex
              return (
                <div
                  key={`${month}-${weekIndex}`}
                  className="text-[9px] text-muted"
                  style={{ width: `${spanWeeks * 14}px` }}
                >
                  {MONTH_LABELS[month]}
                </div>
              )
            })}
          </div>

          {/* Grid */}
          <div className="flex gap-0.5">
            {/* Day labels */}
            <div className="flex flex-col gap-0.5 mr-1">
              {DAY_LABELS.map((label, i) => (
                <div key={i} className="text-[9px] text-muted h-3 w-3 flex items-center justify-end pr-0.5">
                  {label}
                </div>
              ))}
            </div>

            {/* Cells */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-0.5">
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const cell = week.find((_, ci) => {
                    // Reconstruct day of week from position in week
                    return true
                  })
                  const day = week[dayIndex]
                  if (!day) {
                    return <div key={dayIndex} className="w-3 h-3" />
                  }
                  return (
                    <div
                      key={dayIndex}
                      className="w-3 h-3 rounded-sm transition-colors"
                      style={{ backgroundColor: COLORS[day.intensity] }}
                      title={`${day.date}: ${day.count} workout${day.count !== 1 ? 's' : ''}`}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
