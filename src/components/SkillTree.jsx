import { useMemo } from 'react'
import { CheckCircle2, Lock, Play } from 'lucide-react'
import { getCategoryRanges } from '../data/curriculum'

const CATEGORY_COLORS = {
  Beginner: { bg: '#10b981', dim: 'rgba(16, 185, 129, 0.2)' },
  Intermediate: { bg: '#3b82f6', dim: 'rgba(59, 130, 246, 0.2)' },
  Advanced: { bg: '#8b5cf6', dim: 'rgba(139, 92, 246, 0.2)' },
  Elite: { bg: '#f59e0b', dim: 'rgba(245, 158, 11, 0.2)' },
  Supporting: { bg: '#6b7280', dim: 'rgba(107, 114, 128, 0.2)' },
}

export default function SkillTree({ skills, getSkillStatus, onSelectSkill }) {
  const ranges = useMemo(() => getCategoryRanges(), [])

  const categories = useMemo(() => {
    return ranges.map(range => {
      const catSkills = skills.slice(range.start, range.end + 1).map((skill, i) => ({
        ...skill,
        globalIndex: range.start + i,
        status: getSkillStatus(range.start + i),
      }))
      return {
        name: range.category,
        skills: catSkills,
        colors: CATEGORY_COLORS[range.category] || CATEGORY_COLORS.Supporting,
      }
    })
  }, [skills, ranges, getSkillStatus])

  return (
    <div className="space-y-6 overflow-x-auto pb-4">
      {categories.map(cat => (
        <div key={cat.name}>
          <p className="text-xs text-muted uppercase tracking-wider mb-2 font-bold">
            {cat.name}
          </p>
          <div className="flex gap-2 flex-wrap">
            {cat.skills.map((skill, i) => {
              const isLocked = skill.status === 'locked'
              const isActive = skill.status === 'active'
              const isMastered = skill.status === 'mastered'
              const isAvailable = skill.status === 'available'

              return (
                <button
                  key={skill.id}
                  onClick={() => onSelectSkill(skill.id)}
                  disabled={isLocked}
                  className={`
                    relative group flex items-center justify-center w-9 h-9 rounded-md text-[10px] font-bold
                    border-2 transition-all duration-200
                    ${isLocked
                      ? 'border-border bg-surface text-muted opacity-30 cursor-not-allowed'
                      : isActive
                        ? 'border-primary bg-primary/20 text-primary cursor-pointer hover:scale-110 hover:shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                        : isMastered
                          ? 'border-primary bg-primary text-black cursor-pointer hover:scale-110'
                          : 'border-border bg-surface text-muted cursor-pointer hover:border-primary/50 hover:text-primary'
                    }
                  `}
                  title={skill.name}
                >
                  {isMastered ? (
                    <CheckCircle2 size={14} />
                  ) : isLocked ? (
                    <Lock size={12} />
                  ) : isActive ? (
                    <Play size={12} />
                  ) : (
                    <span>{skill.globalIndex + 1}</span>
                  )}

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-surface border border-border text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {skill.name}
                  </div>

                  {/* Connector line to next node */}
                  {i < cat.skills.length - 1 && (
                    <div
                      className={`absolute left-full top-1/2 -translate-y-1/2 w-2 h-0.5 ${
                        isMastered || isActive ? 'bg-primary/40' : 'bg-border'
                      }`}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
