import { useState } from 'react'
import { CheckCircle2, Circle, ChevronRight, Search } from 'lucide-react'
import { SKILLS, getCategoryRanges } from '../data/curriculum'

const categoryColors = {
  Beginner: 'emerald',
  Intermediate: 'blue',
  Advanced: 'violet',
  Elite: 'amber',
  Supporting: 'gray',
}

const categoryStyles = {
  emerald: { dot: 'bg-emerald-500', ring: 'ring-emerald-300', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  blue: { dot: 'bg-blue-500', ring: 'ring-blue-300', text: 'text-blue-700', bg: 'bg-blue-50' },
  violet: { dot: 'bg-violet-500', ring: 'ring-violet-300', text: 'text-violet-700', bg: 'bg-violet-50' },
  amber: { dot: 'bg-amber-500', ring: 'ring-amber-300', text: 'text-amber-700', bg: 'bg-amber-50' },
  gray: { dot: 'bg-gray-400', ring: 'ring-gray-300', text: 'text-gray-600', bg: 'bg-gray-50' },
}

export default function Roadmap({ app }) {
  const { state, jumpToSkill } = app
  const [search, setSearch] = useState('')
  const [expandedCat, setExpandedCat] = useState(null)
  const ranges = getCategoryRanges()

  const isCompleted = (index) => state.completedSkills.some(s => s.index === index)
  const isCurrent = (index) => state.currentIndex === index
  const isUnlocked = (index) => index <= state.currentIndex

  const filteredSkills = search
    ? SKILLS.map((s, i) => ({ ...s, index: i })).filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())
      )
    : null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Roadmap</h1>
        <span className="text-sm text-muted">{state.currentIndex + 1} / {SKILLS.length}</span>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search skills..."
          className="w-full pl-10 pr-4 py-3 rounded-xl glass outline-none focus:ring-1 focus:ring-primary/30 text-sm"
        />
      </div>

      {/* Search Results */}
      {filteredSkills && (
        <div className="glass rounded-2xl p-4 space-y-1 max-h-96 overflow-y-auto">
          {filteredSkills.length === 0 ? (
            <p className="text-sm text-muted text-center py-4">No skills found</p>
          ) : (
            filteredSkills.map(skill => {
              const colorKey = categoryColors[skill.category] || 'gray'
              const styles = categoryStyles[colorKey]
              const completed = isCompleted(skill.index)
              const current = isCurrent(skill.index)
              const unlocked = isUnlocked(skill.index)
              return (
                <button
                  key={skill.id}
                  onClick={() => unlocked && jumpToSkill(skill.index)}
                  disabled={!unlocked}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    current ? `${styles.bg} ring-1 ${styles.ring}` :
                    unlocked ? 'hover:bg-gray-50' :
                    'opacity-40 cursor-not-allowed'
                  }`}
                >
                  {completed ? (
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  ) : (
                    <Circle size={16} className="text-gray-300 shrink-0" />
                  )}
                  <span className="flex-1 text-sm truncate">{skill.name}</span>
                  <span className={`text-[10px] uppercase tracking-wider ${styles.text}`}>{skill.category}</span>
                </button>
              )
            })
          )}
        </div>
      )}

      {/* Category Roadmap */}
      {!search && (
        <div className="space-y-4">
          {ranges.map((range, ri) => {
            const colorKey = categoryColors[range.category] || 'gray'
            const styles = categoryStyles[colorKey]
            const catSkills = SKILLS.slice(range.start, range.end + 1).map((s, i) => ({ ...s, index: range.start + i }))
            const completedInRange = catSkills.filter(s => isCompleted(s.index)).length
            const expanded = expandedCat === ri

            return (
              <div key={ri} className="glass rounded-2xl overflow-hidden">
                <button
                  onClick={() => setExpandedCat(expanded ? null : ri)}
                  className="w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-3 h-3 rounded-full ${styles.dot} shrink-0`} />
                  <div className="flex-1 text-left">
                    <p className="font-display font-semibold">{range.category}</p>
                    <p className="text-xs text-muted">{completedInRange} / {range.count} completed</p>
                  </div>
                  <div className="w-24 h-1.5 rounded-full bg-gray overflow-hidden">
                    <div className={`h-full rounded-full ${styles.dot} opacity-60`} style={{ width: `${(completedInRange / range.count) * 100}%` }} />
                  </div>
                  <ChevronRight size={18} className={`text-muted transition-transform ${expanded ? 'rotate-90' : ''}`} />
                </button>

                {expanded && (
                  <div className="border-t border-border px-5 pb-4">
                    <div className="relative">
                      <div className="absolute left-[15px] top-0 bottom-0 w-px bg-gray-200" />

                      <div className="space-y-0.5 pt-2">
                        {catSkills.map((skill) => {
                          const completed = isCompleted(skill.index)
                          const current = isCurrent(skill.index)
                          const unlocked = isUnlocked(skill.index)

                          return (
                            <button
                              key={skill.id}
                              onClick={() => unlocked && jumpToSkill(skill.index)}
                              disabled={!unlocked}
                              className={`w-full text-left flex items-start gap-4 px-2 py-3 rounded-lg transition-colors relative ${
                                current ? `${styles.bg} ring-1 ${styles.ring}` :
                                unlocked ? 'hover:bg-gray-50' :
                                'opacity-30 cursor-not-allowed'
                              }`}
                            >
                              <div className={`w-[10px] h-[10px] rounded-full mt-1.5 shrink-0 z-10 ${
                                completed ? 'bg-emerald-500' :
                                current ? `${styles.dot} ring-2 ${styles.ring}` :
                                'bg-gray-300'
                              }`} />

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className={`text-sm font-medium ${!unlocked ? 'text-gray-400' : ''}`}>
                                    {skill.name}
                                  </span>
                                  {completed && <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />}
                                </div>
                                <p className={`text-xs mt-0.5 ${unlocked ? 'text-muted' : 'text-gray-300'}`}>
                                  {skill.description}
                                </p>
                              </div>

                              <span className="text-[10px] text-gray-400 mt-1 shrink-0">
                                {String(skill.index + 1).padStart(2, '0')}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
