import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const CHART_THEME = {
  line: '#CCFF00',
  lineSecondary: '#666666',
  grid: '#333333',
  tooltipBg: '#141414',
  text: '#FFFFFF',
  textDim: '#A0A0A0',
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg px-3 py-2 text-xs border border-border"
      style={{ background: CHART_THEME.tooltipBg }}
    >
      <p className="text-muted mb-1">{label}</p>
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.stroke }} className="font-medium">
          {entry.name}: {entry.value}{entry.payload?.type === 'hold' ? 's' : ''}
        </p>
      ))}
    </div>
  )
}

export default function ProgressChart({ data, exerciseName }) {
  if (!data || data.length === 0) return null

  const isHold = data[0]?.type === 'hold'
  const unit = isHold ? 'seconds' : 'reps'

  const formattedData = data.map(d => ({
    ...d,
    label: formatShortDate(d.date),
  }))

  return (
    <div className="w-full" style={{ height: 280 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_THEME.grid} vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: CHART_THEME.textDim, fontSize: 10 }}
            tickLine={false}
            axisLine={{ stroke: CHART_THEME.grid }}
          />
          <YAxis
            tick={{ fill: CHART_THEME.textDim, fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            width={35}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="target"
            stroke={CHART_THEME.lineSecondary}
            strokeWidth={1.5}
            strokeDasharray="6 3"
            dot={false}
            name="Target"
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke={CHART_THEME.line}
            strokeWidth={2}
            dot={{ fill: CHART_THEME.line, r: 3, strokeWidth: 0 }}
            activeDot={{ fill: CHART_THEME.line, r: 5, strokeWidth: 0 }}
            name={unit}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function formatShortDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${months[d.getMonth()]} ${d.getDate()}`
}
