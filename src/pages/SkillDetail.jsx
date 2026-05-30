import { useState } from 'react'
import { ArrowLeft, Play, CheckCircle2, Lock } from 'lucide-react'
import { SKILLS } from '../data/curriculum'
import { checkLevelUpCriteria } from '../lib/criteria'
import { computeSessionPrescriptions } from '../lib/progression'
import { getExercise } from '../data/exercises'
import { estimateDuration } from '../lib/duration'
import PhaseIndicator from '../components/PhaseIndicator'
import CriteriaTracker from '../components/CriteriaTracker'
import WorkoutSession from './WorkoutSession'
import LevelUpModal from '../components/LevelUpModal'

export default function SkillDetail({ skillId, app, onBack }) {
  const { state, addActiveSkill, removeActiveSkill, getSkillTrainingInfo, recordSkillWorkoutAndCheck } = app
  const info = getSkillTrainingInfo(skillId)
  const skill = SKILLS.find(s => s.id === skillId)
  const [showFullPlan, setShowFullPlan] = useState(false)
  const [showWorkout, setShowWorkout] = useState(false)
  const [levelUpSkill, setLevelUpSkill] = useState(null)

  if (!info || !skill) {
    return (
      <div className="text-center py-12">
        <p className="text-muted">No training plan found for this skill</p>
        <button onClick={onBack} className="mt-4 text-primary text-sm">Go Back</button>
      </div>
    )
  }

  const { plan, activeSkill, isMastered, currentPhase, totalPhases, currentPhaseIndex } = info
  const isActive = !!activeSkill
  const skillHistory = (state.workoutHistory || []).filter(h => h.skillId === skillId)

  // Get level-up criteria progress (needed for early returns)
  let criteriaProgress = []
  if (isActive && currentPhaseIndex >= totalPhases - 1) {
    const result = checkLevelUpCriteria(plan.levelUpCriteria, skillHistory, currentPhase?.id)
    criteriaProgress = result.progress || []
  }

  // Get phase criteria progress
  let phaseCriteriaProgress = []
  if (isActive && currentPhase?.advanceCriteria) {
    const count = currentPhase.advanceCriteria.count || 3
    const recent = skillHistory.filter(h => h.phaseId === currentPhase.id).slice(-count)
    phaseCriteriaProgress = [{
      met: recent.length >= count && recent.every(s => s.overallRating === 'success'),
      current: recent.length,
      needed: count,
      description: `Complete ${count} successful sessions in this phase`,
    }]
  }

  // Build skill workout for the current phase
  const buildSkillWorkout = () => {
    if (!currentPhase || !isActive) return null

    const prescriptions = computeSessionPrescriptions(currentPhase.exercises, skillHistory)
    const exercises = prescriptions.map(prescription => {
      const exerciseDef = getExercise(prescription.exerciseId)
      return {
        ...prescription,
        name: exerciseDef?.name || prescription.exerciseId,
        execution: exerciseDef?.execution || null,
        warmupNote: exerciseDef?.warmupNote || null,
        targetMuscles: exerciseDef?.targetMuscles || [],
      }
    })

    return {
      skillId,
      phaseId: currentPhase.id,
      phaseName: currentPhase.name,
      phaseDescription: currentPhase.description,
      skillName: skill.name,
      exercises,
      estimatedDuration: estimateDuration(exercises),
    }
  }

  // If showing workout session
  if (showWorkout && isActive) {
    const workout = buildSkillWorkout()
    if (!workout) {
      setShowWorkout(false)
      return null
    }

    return (
      <WorkoutSession
        workout={workout}
        settings={state.settings}
        onDismiss={(exerciseResults, duration) => {
          const result = recordSkillWorkoutAndCheck(skillId, currentPhase.id, exerciseResults, duration)
          setShowWorkout(false)
          if (result === 'skill_mastered') {
            setLevelUpSkill(skill.name)
          }
        }}
        onClose={() => setShowWorkout(false)}
      />
    )
  }

  // Level up modal
  if (levelUpSkill) {
    return (
      <LevelUpModal
        skillName={levelUpSkill}
        criteriaProgress={criteriaProgress}
        onContinue={() => {
          setLevelUpSkill(null)
          onBack()
        }}
      />
    )
  }

  const categoryColors = {
    Beginner: 'bg-emerald-100 text-emerald-700',
    Intermediate: 'bg-blue-100 text-blue-700',
    Advanced: 'bg-violet-100 text-violet-700',
    Elite: 'bg-amber-100 text-amber-700',
    Supporting: 'bg-gray-100 text-gray-600',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <button onClick={onBack} className="mt-1 p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft size={18} className="text-muted" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${categoryColors[skill.category] || categoryColors.Supporting}`}>
              {skill.category}
            </span>
            {isMastered && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                Mastered
              </span>
            )}
          </div>
          <h1 className="text-2xl font-display font-bold">{skill.name}</h1>
          <p className="text-sm text-muted mt-1">{skill.description}</p>
        </div>
      </div>

      {/* Current Phase (if active) */}
      {isActive && currentPhase && (
        <div className="card-strong rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-muted uppercase tracking-wider mb-1">Current Phase</p>
              <h2 className="font-display font-bold">{currentPhase.name}</h2>
            </div>
            <PhaseIndicator currentPhaseIndex={currentPhaseIndex} totalPhases={totalPhases} />
          </div>
          <p className="text-sm text-muted mb-4">{currentPhase.description}</p>

          {/* Phase criteria */}
          {phaseCriteriaProgress.length > 0 && (
            <CriteriaTracker criteriaProgress={phaseCriteriaProgress} />
          )}
        </div>
      )}

      {/* Level-Up Criteria (if in final phase) */}
      {isActive && currentPhaseIndex >= totalPhases - 1 && criteriaProgress.length > 0 && (
        <div className="card rounded-2xl p-5">
          <p className="text-xs text-muted uppercase tracking-wider mb-3">Level-Up Criteria</p>
          <CriteriaTracker criteriaProgress={criteriaProgress} />
        </div>
      )}

      {/* Training Plan Overview */}
      <div className="card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-muted uppercase tracking-wider">Training Plan</p>
          <button
            onClick={() => setShowFullPlan(!showFullPlan)}
            className="text-xs text-primary"
          >
            {showFullPlan ? 'Hide' : 'Show'} Details
          </button>
        </div>

        <div className="space-y-3">
          {plan.phases.map((phase, i) => {
            const isCurrent = isActive && i === currentPhaseIndex
            const isCompleted = isActive && i < currentPhaseIndex
            const isLocked = isActive && i > currentPhaseIndex

            return (
              <div key={phase.id} className={`flex items-start gap-3 ${isLocked ? 'opacity-40' : ''}`}>
                <div className="mt-0.5">
                  {isCompleted ? (
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  ) : isCurrent ? (
                    <div className="w-4 h-4 rounded-full bg-primary ring-2 ring-primary/30" />
                  ) : (
                    <Lock size={16} className="text-gray-300" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isCurrent ? 'text-primary' : ''}`}>
                    {phase.name}
                  </p>
                  {showFullPlan && (
                    <>
                      <p className="text-xs text-muted mt-0.5">{phase.description}</p>
                      <div className="mt-2 space-y-1">
                        {phase.exercises.map((ex, j) => (
                          <div key={j} className="text-xs text-muted flex gap-2">
                            <span className="text-gray-300">•</span>
                            <span>{ex.exerciseId} — {ex.prescription.type === 'hold'
                              ? `${ex.prescription.targetSets}×${ex.prescription.targetHoldSeconds}s`
                              : `${ex.prescription.targetSets}×${ex.prescription.targetReps}`
                            }</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        {isActive ? (
          <>
            <button
              onClick={() => setShowWorkout(true)}
              className="flex-1 py-3 rounded-xl bg-primary text-white font-display font-semibold hover:bg-primary-light transition-colors text-sm flex items-center justify-center gap-2"
            >
              <Play size={16} /> Do Workout
            </button>
            <button
              onClick={() => removeActiveSkill(skillId)}
              className="py-3 px-4 rounded-xl card text-muted font-medium hover:bg-gray-100 transition-colors text-sm"
            >
              <Pause size={16} />
            </button>
          </>
        ) : isMastered ? (
          <div className="flex-1 py-3 rounded-xl bg-emerald-50 text-emerald-600 font-medium text-center text-sm">
            Skill Mastered
          </div>
        ) : (
          <button
            onClick={() => addActiveSkill(skillId)}
            className="flex-1 py-3 rounded-xl bg-primary text-white font-display font-semibold hover:bg-primary-light transition-colors text-sm flex items-center justify-center gap-2"
          >
            <Play size={16} /> Start Training
          </button>
        )}
      </div>
    </div>
  )
}
