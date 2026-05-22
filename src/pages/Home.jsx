import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Play, Flame, Target, Dumbbell, ChevronRight, Calendar, Coffee, CheckCircle2, ArrowRight } from 'lucide-react'
import { SKILLS } from '../data/curriculum'
import WorkoutSession from './WorkoutSession'

const categoryColors = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-blue-100 text-blue-700',
  Advanced: 'bg-violet-100 text-violet-700',
  Elite: 'bg-amber-100 text-amber-700',
  Supporting: 'bg-gray-100 text-gray-600',
}

const dayColors = {
  push: 'from-red-500 to-rose-500',
  pull: 'from-blue-500 to-indigo-500',
  legs: 'from-emerald-500 to-teal-500',
  upper: 'from-violet-500 to-purple-500',
  lower: 'from-amber-500 to-orange-500',
  rest: 'from-gray-400 to-gray-500',
}

export default function Home({ app }) {
  const {
    state, masteredCount, activeCount,
    totalSkills, progressPercent, recordDailyWorkout, skipRestDay,
    addActiveSkill, getSkillStatus, dailyWorkout,
  } = app
  const [showWorkout, setShowWorkout] = useState(false)
  const [activeWorkoutRoutine, setActiveWorkoutRoutine] = useState(null)
  const navigate = useNavigate()

  const streak = state.streak || { current: 0, longest: 0 }
  const hasActiveSkills = (state.activeSkills || []).length > 0
  const recentSessions = (state.workoutHistory || []).slice(-5).reverse()

  // Daily workout data
  const routine = dailyWorkout?.todaysRoutine
  const isRestDay = dailyWorkout?.isRestDay
  const completedToday = dailyWorkout?.completedToday
  const dayType = dailyWorkout?.dayType || 'rest'
  const totalDailySessions = dailyWorkout?.totalSessions || 0
  const optionalNext = dailyWorkout?.optionalNext

  // Auto-advance rest days — show rest card, then advance on next visit
  useEffect(() => {
    if (isRestDay) {
      // Small delay so user sees the rest day card briefly, then advance
      const timer = setTimeout(() => {
        skipRestDay()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isRestDay, skipRestDay])

  // Which routine to show in the workout session
  const workoutToShow = activeWorkoutRoutine || routine

  // If showing workout session
  if (showWorkout && workoutToShow) {
    return (
      <WorkoutSession
        workout={{
          skillId: workoutToShow.id,
          phaseId: 'daily',
          phaseName: workoutToShow.name,
          phaseDescription: workoutToShow.description,
          exercises: workoutToShow.exercises,
          estimatedDuration: workoutToShow.estimatedDuration,
        }}
        onDismiss={(exerciseResults, duration) => {
          recordDailyWorkout(workoutToShow.id, exerciseResults, duration)
          setShowWorkout(false)
          setActiveWorkoutRoutine(null)
        }}
        onClose={() => {
          setShowWorkout(false)
          setActiveWorkoutRoutine(null)
        }}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Forma</h1>
          <p className="text-sm text-muted mt-0.5">Your daily workout</p>
        </div>
        {streak.current > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600">
            <Flame size={14} />
            <span className="text-sm font-semibold">{streak.current} day streak</span>
          </div>
        )}
      </div>

      {/* Rest Day — auto-advances, shows brief card */}
      {isRestDay && (
        <div className="glass-strong rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-400 to-gray-500 px-6 py-4">
            <div className="flex items-center gap-2">
              <Coffee size={20} className="text-white/90" />
              <p className="text-white font-display font-semibold text-lg">Rest Day</p>
            </div>
            <p className="text-white/70 text-sm mt-1">Recovery is where gains happen. See you tomorrow.</p>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xs">💧</span>
                <span>Stay hydrated — drink plenty of water</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">😴</span>
                <span>Get 7-9 hours of sleep tonight</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs">🚶</span>
                <span>A light walk or stretch is fine — no intense training</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completed Today — show done state + optional next */}
      {!isRestDay && completedToday && (
        <div className="glass-strong rounded-2xl overflow-hidden">
          <div className={`bg-gradient-to-r ${dayColors[dayType] || dayColors.push} px-6 py-4`}>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={20} className="text-white/90" />
              <p className="text-white font-display font-semibold">{routine?.name || 'Workout'} Complete</p>
            </div>
            <p className="text-white/70 text-xs mt-0.5">Nice work. See you next session.</p>
          </div>
        </div>
      )}

      {/* Today's Routine — not yet completed */}
      {!isRestDay && !completedToday && routine && (
        <div className="glass-strong rounded-2xl overflow-hidden glow-primary">
          {/* Day type header */}
          <div className={`bg-gradient-to-r ${dayColors[dayType] || dayColors.push} px-6 py-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white/90 text-lg">{routine.emoji}</span>
                <p className="text-white font-display font-semibold">{routine.name}</p>
              </div>
              <p className="text-white/80 text-sm">~{routine.estimatedDuration} min</p>
            </div>
            <p className="text-white/70 text-xs mt-0.5">{routine.description} · {routine.difficulty}</p>
          </div>

          <div className="p-6">
            {/* Exercise preview */}
            <div className="space-y-2 mb-5">
              {routine.exercises.map((ex, i) => (
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
              onClick={() => {
                setActiveWorkoutRoutine(null)
                setShowWorkout(true)
              }}
              className="w-full py-3.5 rounded-xl bg-primary text-white font-display font-semibold hover:bg-primary-light transition-colors text-base flex items-center justify-center gap-2"
            >
              <Play size={18} /> Start Workout
            </button>
          </div>
        </div>
      )}

      {/* Optional Next Workout — only shown after completing today's */}
      {!isRestDay && completedToday && optionalNext && (
        <div className="glass rounded-2xl overflow-hidden">
          <div className={`bg-gradient-to-r ${dayColors[optionalNext.id] || dayColors.push} px-6 py-3 opacity-80`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-white/90 text-lg">{optionalNext.emoji}</span>
                <p className="text-white font-display font-semibold">{optionalNext.name}</p>
              </div>
              <p className="text-white/80 text-sm">~{optionalNext.estimatedDuration} min</p>
            </div>
            <p className="text-white/70 text-xs mt-0.5">Optional — get ahead for tomorrow</p>
          </div>

          <div className="p-6">
            <div className="space-y-2 mb-5">
              {optionalNext.exercises.map((ex, i) => (
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
              onClick={() => {
                setActiveWorkoutRoutine(optionalNext)
                setShowWorkout(true)
              }}
              className="w-full py-3 rounded-xl glass text-primary font-display font-semibold hover:bg-gray-50 transition-colors text-base flex items-center justify-center gap-2"
            >
              <ArrowRight size={18} /> Do Tomorrow's Workout Now
            </button>
          </div>
        </div>
      )}

      {/* Cycle Progress */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-muted uppercase tracking-wider">Weekly Cycle</p>
          <p className="text-xs text-muted">{totalDailySessions} sessions done</p>
        </div>
        <div className="flex gap-1.5">
          {(state.dailyWorkout?.schedule || ['push', 'pull', 'legs', 'rest', 'upper', 'lower', 'rest']).map((day, i) => (
            <div key={i} className={`flex-1 h-2 rounded-full ${
              i === (dailyWorkout?.dayIndex ?? 0)
                ? 'bg-primary ring-2 ring-primary/30'
                : day === 'rest'
                  ? 'bg-gray-200'
                  : 'bg-gray-100'
            }`} />
          ))}
        </div>
        <div className="flex justify-between mt-1.5">
          {(state.dailyWorkout?.schedule || ['push', 'pull', 'legs', 'rest', 'upper', 'lower', 'rest']).map((day, i) => (
            <span key={i} className={`text-[9px] ${
              i === (dailyWorkout?.dayIndex ?? 0) ? 'text-primary font-bold' : 'text-muted'
            }`}>
              {day.charAt(0).toUpperCase()}
            </span>
          ))}
        </div>
      </div>

      {/* Skill Training (secondary) */}
      {hasActiveSkills && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">Skill Training</h3>
            <button onClick={() => navigate('/roadmap')} className="text-xs text-primary">View All</button>
          </div>
          {(state.activeSkills || []).map((activeSkill, i) => {
            const skill = SKILLS.find(s => s.id === activeSkill.skillId)
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
                  <p className="text-sm font-medium truncate">{skill?.name || activeSkill.skillId}</p>
                  <p className="text-xs text-muted">{skill?.category || 'Training'}</p>
                </div>
                <ChevronRight size={16} className="text-muted" />
              </div>
            )
          })}
        </div>
      )}

      {!hasActiveSkills && (
        <button
          onClick={() => navigate('/roadmap')}
          className="w-full glass rounded-xl p-4 flex items-center gap-3 text-left hover:bg-gray-50 transition-colors"
        >
          <Target size={18} className="text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium">Add Skill Goals</p>
            <p className="text-xs text-muted">Track progress toward specific calisthenics skills</p>
          </div>
          <ChevronRight size={16} className="text-muted" />
        </button>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-lg font-bold text-primary">{totalDailySessions}</p>
          <p className="text-[10px] text-muted">Sessions</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <p className="text-lg font-bold">{masteredCount}</p>
          <p className="text-[10px] text-muted">Skills Mastered</p>
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
                  <span className="flex-1 truncate">{skill?.name || s.skillId || s.dayType || 'Workout'}</span>
                  <span className={`text-xs font-medium ${ratingColors[s.overallRating] || 'text-muted'}`}>
                    {s.overallRating}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

