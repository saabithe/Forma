import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, Flame, Target, Dumbbell, ChevronRight, Plus, Calendar } from 'lucide-react'
import { SKILLS } from '../data/curriculum'
import WorkoutSession from './WorkoutSession'

const categoryColors = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-blue-100 text-blue-700',
  Advanced: 'bg-violet-100 text-violet-700',
  Elite: 'bg-amber-100 text-amber-700',
  Supporting: 'bg-gray-100 text-gray-600',
}

export default function Home({ app }) {
  const {
    state, primaryWorkout, todaysWorkouts, masteredCount, activeCount,
    totalSkills, progressPercent, recordWorkout, checkAndAdvancePhase,
    addActiveSkill, getSkillStatus,
  } = app
  const [showWorkout, setShowWorkout] = useState(false)
  const [levelUpResult, setLevelUpResult] = useState(null)
  const navigate = useNavigate()

  const streak = state.streak || { current: 0, longest: 0 }
  const hasActiveSkills = (state.activeSkills || []).length > 0
  const recentSessions = (state.workoutHistory || []).slice(-5).reverse()

  // If showing workout session
  if (showWorkout && primaryWorkout) {
    return (
      <WorkoutSession
        workout={primaryWorkout}
        onDismiss={(exerciseResults, duration) => {
          recordWorkout(primaryWorkout.skillId, primaryWorkout.phaseId, exerciseResults, duration)
          const result = checkAndAdvancePhase(primaryWorkout.skillId)
          setLevelUpResult(result)
          setShowWorkout(false)
        }}
        onClose={() => setShowWorkout(false)}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Forma</h1>
          <p className="text-sm text-muted mt-0.5">Your calisthenics journey</p>
        </div>
        {streak.current > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600">
            <Flame size={14} />
            <span className="text-sm font-semibold">{streak.current} day streak</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div>
        <div className="flex justify-between text-xs text-muted mb-2">
          <span>Overall Progress</span>
          <span>{masteredCount} / {totalSkills} skills mastered</span>
        </div>
        <div className="progress-bar h-2">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Today's Workout */}
      {hasActiveSkills && primaryWorkout ? (
        <div className="glass-strong rounded-2xl p-6 glow-primary">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-muted uppercase tracking-widest mb-1">Today&apos;s Workout</p>
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                categoryColors[SKILLS.find(s => s.id === primaryWorkout.skillId)?.category] || categoryColors.Supporting
              }`}>
                {primaryWorkout.phaseName}
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted">{primaryWorkout.exercises.length} exercises</p>
              <p className="text-xs text-muted">~{primaryWorkout.estimatedDuration} min</p>
            </div>
          </div>

          <h2 className="text-xl font-display font-bold mb-1">
            {SKILLS.find(s => s.id === primaryWorkout.skillId)?.name || primaryWorkout.skillId}
          </h2>
          <p className="text-text-dim text-sm mb-4">{primaryWorkout.phaseDescription}</p>

          {/* Exercise preview */}
          <div className="space-y-2 mb-5">
            {primaryWorkout.exercises.map((ex, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                  {i + 1}
                </span>
                <span className="flex-1 truncate">{ex.name}</span>
                <span className="text-xs text-muted">
                  {ex.type === 'hold'
                    ? `${ex.targetSets}×${ex.targetHoldSeconds}s`
                    : `${ex.targetSets}×${ex.targetReps}`
                  }
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowWorkout(true)}
            className="w-full py-3.5 rounded-xl bg-primary text-white font-display font-semibold hover:bg-primary-light transition-colors text-base flex items-center justify-center gap-2"
          >
            <Play size={18} /> Start Workout
          </button>
        </div>
      ) : (
        /* No active skills — prompt to start training */
        <div className="glass-strong rounded-2xl p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Dumbbell size={28} className="text-primary" />
          </div>
          <h2 className="text-xl font-display font-bold mb-2">Start Training</h2>
          <p className="text-sm text-muted mb-5">
            Pick a skill from the roadmap to begin your training journey.
            Each skill has a progressive training plan that adapts to your performance.
          </p>
          <button
            onClick={() => navigate('/roadmap')}
            className="px-6 py-3 rounded-xl bg-primary text-white font-display font-semibold hover:bg-primary-light transition-colors inline-flex items-center gap-2"
          >
            Browse Roadmap <ChevronRight size={16} />
          </button>
        </div>
      )}

      {/* Other Active Skills */}
      {todaysWorkouts.length > 1 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">Other Active Skills</h3>
          {todaysWorkouts.slice(1).map((workout, i) => {
            const skill = SKILLS.find(s => s.id === workout.skillId)
            return (
              <div key={i} className="glass rounded-xl p-4 flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  categoryColors[skill?.category]?.includes('emerald') ? 'bg-emerald-500' :
                  categoryColors[skill?.category]?.includes('blue') ? 'bg-blue-500' :
                  categoryColors[skill?.category]?.includes('violet') ? 'bg-violet-500' :
                  categoryColors[skill?.category]?.includes('amber') ? 'bg-amber-500' :
                  'bg-gray-400'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{skill?.name || workout.skillId}</p>
                  <p className="text-xs text-muted">{workout.phaseName} · {workout.exercises.length} exercises</p>
                </div>
                <ChevronRight size={16} className="text-muted" />
              </div>
            )
          })}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-primary">{masteredCount}</p>
          <p className="text-[10px] text-muted">Mastered</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-lg font-bold">{activeCount}</p>
          <p className="text-[10px] text-muted">Training</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-amber-500">{streak.current}</p>
          <p className="text-[10px] text-muted">Day Streak</p>
        </div>
      </div>

      {/* Recent Activity */}
      {recentSessions.length > 0 && (
        <div className="glass rounded-2xl p-5">
          <h3 className="font-display font-semibold mb-3 text-sm text-muted uppercase tracking-wider flex items-center gap-2">
            <Calendar size={14} /> Recent Activity
          </h3>
          <div className="space-y-2">
            {recentSessions.map((s, i) => {
              const skill = SKILLS.find(sk => sk.id === s.skillId)
              const ratingColors = {
                success: 'text-emerald-500',
                partial: 'text-amber-500',
                fail: 'text-red-400',
              }
              return (
                <div key={i} className="flex items-center gap-3 text-sm py-1">
                  <div className={`w-2 h-2 rounded-full ${
                    s.overallRating === 'success' ? 'bg-emerald-500' :
                    s.overallRating === 'partial' ? 'bg-amber-500' : 'bg-red-400'
                  }`} />
                  <span className="text-muted text-xs w-20 shrink-0">{s.date}</span>
                  <span className="flex-1 truncate">{skill?.name || s.skillId}</span>
                  <span className={`text-xs font-medium ${ratingColors[s.overallRating] || 'text-muted'}`}>
                    {s.overallRating}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Level-up notification (temporary) */}
      {levelUpResult === 'skill_mastered' && (
        <div className="fixed bottom-24 left-4 right-4 z-50">
          <div className="glass-strong rounded-xl p-4 flex items-center gap-3 border-l-4 border-amber-400">
            <span className="text-2xl">🏆</span>
            <div className="flex-1">
              <p className="font-semibold text-sm">Skill Mastered!</p>
              <p className="text-xs text-muted">You have advanced to the next skill</p>
            </div>
            <button onClick={() => setLevelUpResult(null)} className="text-xs text-muted">Dismiss</button>
          </div>
        </div>
      )}
      {levelUpResult === 'phase_advanced' && (
        <div className="fixed bottom-24 left-4 right-4 z-50">
          <div className="glass-strong rounded-xl p-4 flex items-center gap-3 border-l-4 border-emerald-400">
            <span className="text-2xl">⬆️</span>
            <div className="flex-1">
              <p className="font-semibold text-sm">Phase Advanced!</p>
              <p className="text-xs text-muted">Your training has progressed to the next phase</p>
            </div>
            <button onClick={() => setLevelUpResult(null)} className="text-xs text-muted">Dismiss</button>
          </div>
        </div>
      )}
    </div>
  )
}
