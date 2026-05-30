import { useMemo } from 'react'

export default function ProgressChart({ data }) {
  const chart = useMemo(() => {
    if (!data || data.length === 0) return null

    const isHold = data[0]?.type === 'hold'
    const padding = { top: 20, right: 20, bottom: 30, left: 45 }
    const width = 600
    const height = 280
    const plotW = width - padding.left - padding.right
    const plotH = height - padding.top - padding.bottom

    const allValues = data.flatMap(d => [d.actual, d.target])
    const maxVal = Math.max(...allValues, 1)

    const xStep = data.length > 1 ? plotW / (data.length - 1) : plotW
    const toX = (i) => padding.left + i * xStep
    const toY = (val) => padding.top + plotH - (val / maxVal) * plotH

    const actualPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(d.actual)}`).join(' ')
    const targetPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(d.target)}`).join(' ')
    const points = data.map((d, i) => ({ x: toX(i), y: toY(d.actual), val: d.actual }))

    const yTicks = 5
    const yStep = maxVal / yTicks
    const yTickValues = Array.from({ length: yTicks + 1 }, (_, i) => Math.round(i * yStep))
    const labelInterval = data.length <= 6 ? 1 : data.length <= 12 ? 2 : Math.ceil(data.length / 6)

    return { width, height, padding, plotW, plotH, actualPath, targetPath, points, toX, toY, yTickValues, labelInterval, isHold, maxVal }
  }, [data])

  if (!chart) return null

  const { width, height, padding, plotW, plotH, actualPath, targetPath, points, toX, toY, yTickValues, labelInterval, isHold } = chart

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height: 280 }}>
      {/* Grid lines */}
      {yTickValues.map((val, i) => (
        <g key={i}>
          <line x1={padding.left} y1={toY(val)} x2={padding.left + plotW} y2={toY(val)} stroke="var(--color-border)" strokeDasharray="3 3" />
          <text x={padding.left - 8} y={toY(val) + 4} textAnchor="end" fill="var(--color-text-dim)" fontSize="10" fontFamily="var(--font-sans)">
            {val}{isHold ? 's' : ''}
          </text>
        </g>
      ))}

      {/* X-axis labels */}
      {data.map((d, i) => (
        i % labelInterval === 0 && (
          <text key={i} x={toX(i)} y={height - 5} textAnchor="middle" fill="var(--color-text-dim)" fontSize="9" fontFamily="var(--font-sans)">
            {formatShortDate(d.date)}
          </text>
        )
      ))}

      {/* Target line (dashed) */}
      <path d={targetPath} fill="none" stroke="#666666" strokeWidth="1.5" strokeDasharray="6 3" />

      {/* Actual line */}
      <path d={actualPath} fill="none" stroke="var(--color-primary)" strokeWidth="2" />

      {/* Data points */}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--color-primary)" />
      ))}
    </svg>
  )
}

function formatShortDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[d.getMonth()]} ${d.getDate()}`
}
