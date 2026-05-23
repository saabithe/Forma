import { useState } from 'react'
import { CheckCircle2, Circle, ChevronRight, Search, Lock, Play, Dumbbell } from 'lucide-react'
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

export default function Roadmap({ app, onSelectSkill }) {
  const { getSkillStatus } = app
  const [search, setSearch] = useState('')
  const [expandedCat, setExpandedCat] = useState(null)
  const ranges = getCategoryRanges()

  const filteredSkills = search
    ? SKILLS.map((s, i) => ({ ...s, index: i })).filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase())
      )
    : null

  const categories = ['Beginner', 'Intermediate', 'Advanced', 'Elite', 'Supporting']

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Roadmap</h1>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search skills..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl glass text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Search results */}
      {filteredSkills && (
        <div className="space-y-2">
          <p className="text-xs text-muted">{filteredSkills.length} results</p>
          {filteredSkills.map(skill => {
            const status = getSkillStatus(skill.index)
            return (
              <button
                key={skill.id}
                onClick={() => onSelectSkill && onSelectSkill(skill.id)}
                className="w-full glass rounded-xl p-4 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors"
              >
                <SkillStatusIcon status={status} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{skill.name}</p>
                  <p className="text-xs text-muted truncate">{skill.description}</p>
                </div>
                <ChevronRight size={16} className="text-muted shrink-0" />
              </button>
            )
          })}
        </div>
      )}

      {/* Category sections */}
      {!filteredSkills && categories.map(cat => {
        const range = ranges.find(r => r.category === cat)
        if (!range) return null
        const catColor = categoryColors[cat]
        const style = categoryStyles[catColor] || categoryStyles.gray
        const isExpanded = expandedCat === cat

        // Count stats
        const catSkills = SKILLS.slice(range.start, range.end + 1)
        const activeCount = catSkills.filter((s, i) => getSkillStatus(range.start + i) === 'active').length
        const masteredCount = catSkills.filter((s, i) => getSkillStatus(range.start + i) === 'mastered').length

        return (
          <div key={cat}>
            <button
              onClick={() => setExpandedCat(isExpanded ? null : cat)}
              className="w-full flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                <span className={`font-display font-semibold text-sm ${style.text}`}>{cat}</span>
                <span className="text-xs text-muted">({catSkills.length})</span>
              </div>
              <div className="flex items-center gap-2">
                {activeCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    {activeCount} training
                  </span>
                )}
                {masteredCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-600 font-medium">
                    {masteredCount} done
                  </span>
                )}
                <ChevronRight size={14} className={`text-muted transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </div>
            </button>

            {isExpanded && (
              <div className="space-y-1.5 mt-1 mb-3">
                {catSkills.map((skill, i) => {
                  const globalIndex = range.start + i
                  const status = getSkillStatus(globalIndex)

                  return (
                    <button
                      key={skill.id}
                      onClick={() => onSelectSkill && onSelectSkill(skill.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                        status === 'locked' ? 'opacity-40' :
                        status === 'active' ? `${style.bg} ring-1 ring-primary/20` :
                        'hover:bg-gray-50'
                      }`}
                    >
                      <SkillStatusIcon status={status} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${status === 'locked' ? 'text-muted' : ''}`}>
                          {skill.name}
                        </p>
                        <p className="text-[10px] text-muted truncate">{skill.description}</p>
                      </div>
                      {status === 'active' && (
                        <Dumbbell size={14} className="text-primary shrink-0" />
                      )}
                      {status !== 'locked' && (
                        <ChevronRight size={14} className="text-muted shrink-0" />
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function SkillStatusIcon({ status }) {
  if (status === 'mastered') {
    return <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
  }
  if (status === 'active') {
    return (
      <div className="w-[18px] h-[18px] rounded-full bg-primary ring-2 ring-primary/30 shrink-0 flex items-center justify-center">
        <Play size={8} className="text-white ml-0.5" />
      </div>
    )
  }
  if (status === 'locked') {
    return <Lock size={18} className="text-gray-300 shrink-0" />
  }
  return <Circle size={18} className="text-gray-300 shrink-0" />
}
