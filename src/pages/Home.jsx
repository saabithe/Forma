import { ChevronRight, Undo2, CheckCircle2 } from 'lucide-react'
import { SKILLS, getCategoryRanges } from '../data/curriculum'

const categoryColors = {
  Beginner: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Intermediate: 'bg-blue-100 text-blue-700 border-blue-200',
  Advanced: 'bg-violet-100 text-violet-700 border-violet-200',
  Elite: 'bg-amber-100 text-amber-700 border-amber-200',
  Supporting: 'bg-gray-100 text-gray-600 border-gray-200',
}

const categoryBgColors = {
  Beginner: 'bg-emerald-500',
  Intermediate: 'bg-blue-500',
  Advanced: 'bg-violet-500',
  Elite: 'bg-amber-500',
  Supporting: 'bg-gray-400',
}

export default function Home({ app }) {
  const { state, currentSkill, totalSkills, completedCount, progressPercent, completeSkill, undoLast } = app
  const hasUndo = state.undoHistory.length > 0
  const lastAction = state.undoHistory[state.undoHistory.length - 1]
  const ranges = getCategoryRanges()

  const currentCatColor = categoryColors[currentSkill?.category] || categoryColors.Supporting

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Forma</h1>
          <p className="text-sm text-muted mt-0.5">Your calisthenics journey</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-text-dim">
          <span>{completedCount} / {totalSkills} skills</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-xs text-muted mb-2">
          <span>Overall Progress</span>
          <span>{Math.round(progressPercent)}%</span>
        </div>
        <div className="progress-bar h-2">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Undo Toast */}
      {hasUndo && (
        <div className="glass rounded-xl p-3 flex items-center gap-3 border-l-2 border-accent/40">
          <Undo2 size={16} className="text-accent shrink-0" />
          <span className="text-sm text-text-dim flex-1 truncate">{lastAction.action}</span>
          <button
            onClick={undoLast}
            className="px-3 py-1.5 rounded-lg bg-accent/10 text-accent text-xs font-semibold hover:bg-accent/20 transition-colors shrink-0"
          >
            Undo
          </button>
        </div>
      )}

      {/* Current Skill Card */}
      <div className="glass-strong rounded-2xl p-6 glow-primary">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-muted uppercase tracking-widest mb-1">Current Skill</p>
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentCatColor}`}>
              {currentSkill?.category}
            </span>
          </div>
          <span className="text-4xl font-display font-bold text-gray">
            {String(state.currentIndex + 1).padStart(2, '0')}
          </span>
        </div>

        <h2 className="text-2xl font-display font-bold mb-2">{currentSkill?.name}</h2>
        <p className="text-text-dim text-sm mb-6">{currentSkill?.description}</p>

        <button
          onClick={completeSkill}
          className="w-full py-3.5 rounded-xl bg-primary text-white font-display font-semibold hover:bg-primary-light transition-colors text-base"
        >
          Complete & Advance
        </button>
      </div>

      {/* Category Progress Mini Cards */}
      <div className="grid grid-cols-5 gap-3">
        {ranges.map((range, i) => {
          const completedInRange = state.completedSkills.filter(
            s => s.index >= range.start && s.index <= range.end
          ).length
          const percent = range.count > 0 ? (completedInRange / range.count) * 100 : 0
          const dotColor = categoryBgColors[range.category] || categoryBgColors.Supporting
          return (
            <div key={i} className="glass rounded-xl p-3 text-center">
              <p className="text-xs text-muted mb-1">{range.category}</p>
              <p className="text-lg font-bold">{completedInRange}</p>
              <p className="text-[10px] text-muted">/ {range.count}</p>
              <div className="mt-2 h-1 rounded-full bg-gray overflow-hidden">
                <div className={`h-full rounded-full ${dotColor} opacity-70`} style={{ width: `${percent}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Sessions */}
      {state.sessions.length > 0 && (
        <div className="glass rounded-2xl p-5">
          <h3 className="font-display font-semibold mb-4 text-sm text-muted uppercase tracking-wider">Recent Activity</h3>
          <div className="space-y-2">
            {state.sessions.slice(-5).reverse().map((s, i) => {
              const skill = SKILLS[s.skillIndex]
              return (
                <div key={i} className="flex items-center gap-3 text-sm py-1">
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  <span className="text-muted text-xs w-20 shrink-0">{s.date}</span>
                  <span className="flex-1 truncate">{skill?.name || `Skill ${s.skillIndex + 1}`}</span>
                  <span className="text-xs text-muted">{skill?.category}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
