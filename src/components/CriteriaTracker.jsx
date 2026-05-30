import { CheckCircle2, Circle } from 'lucide-react'

export default function CriteriaTracker({ criteriaProgress }) {
  if (!criteriaProgress || criteriaProgress.length === 0) return null


  return (
    <div className="space-y-2">
      {criteriaProgress.map((criterion, i) => {
        const percent = criterion.needed > 0
          ? Math.min(100, (criterion.current / criterion.needed) * 100)
          : 0

        return (
          <div key={i} className="flex items-start gap-2">
            {criterion.met ? (
              <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
            ) : (
              <Circle size={14} className="text-gray-300 mt-0.5 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className={`text-xs ${criterion.met ? 'text-emerald-600' : 'text-muted'}`}>
                {criterion.description}
              </p>
              {!criterion.met && (
                <div className="mt-1 h-1 rounded-full bg-black/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary/60 transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              )}
            </div>
            <span className="text-[10px] text-muted shrink-0">
              {criterion.current}/{criterion.needed}
            </span>
          </div>
        )
      })}
    </div>
  )
}
