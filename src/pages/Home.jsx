import { Flame, ChevronRight, Undo2, CheckCircle2, Zap } from 'lucide-react'
import { SKILLS, getCategoryRanges } from '../data/curriculum'

const categoryColors = {
  Beginner: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  Intermediate: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Advanced: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
  Elite: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  Supporting: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
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
          <h1 className="text-3xl font-display font-bold tracking-tight">
            <span className="text-romance">Forma</span>
          </h1>
          <p className="text-sm text-muted mt-0.5">Your calisthenics journey</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-text-dim">
          <Flame size={16} className="text-romance" />
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
        <div className="glass rounded-xl p-3 flex items-center gap-3 border-l-2 border-romance/50">
          <Undo2 size={16} className="text-romance shrink-0" />
          <span className="text-sm text-text-dim flex-1 truncate">{lastAction.action}</span>
          <button
            onClick={undoLast}
            className="px-3 py-1.5 rounded-lg bg-romance/10 text-romance text-xs font-semibold hover:bg-romance/20 transition-colors shrink-0"
          >
            Undo
          </button>
        </div>
      )}

      {/* Current Skill Card */}
      <div className="glass-strong rounded-2xl p-6 glow-wine">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-muted uppercase tracking-widest mb-1">Current Skill</p>
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${currentCatColor}`}>
              {currentSkill?.category}
            </span>
          </div>
          <span className="text-4xl font-display font-bold text-white/10">
            {String(state.currentIndex + 1).padStart(2, '0')}
          </span>
        </div>

        <h2 className="text-2xl font-display font-bold mb-2">{currentSkill?.name}</h2>
        <p className="text-text-dim text-sm mb-6">{currentSkill?.description}</p>

        <button
          onClick={completeSkill}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-wine to-wine-light text-white font-display font-semibold hover:from-wine-light hover:to-wine transition-all glow-wine text-base"
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
          const catColor = categoryColors[range.category] || categoryColors.Supporting
          return (
            <div key={i} className="glass rounded-xl p-3 text-center">
              <p className="text-xs text-muted mb-1">{range.category}</p>
              <p className="text-lg font-bold">{completedInRange}</p>
              <p className="text-[10px] text-muted">/ {range.count}</p>
              <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                <div className="h-full rounded-full bg-romance/60" style={{ width: `${percent}%` }} />
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
                  <CheckCircle2 size={14} className="text-emerald-500/60 shrink-0" />
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
