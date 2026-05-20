// Progression hook — checks phase advancement and skill level-up
import { useCallback } from 'react'
import { getTrainingPlan } from '../data/training-plans'
import { checkPhaseCriteria, checkLevelUpCriteria } from '../lib/criteria'

export function useProgression(state, setState) {
  /**
   * Check if the current phase's advance criteria is met for a skill
   */
  const checkPhaseAdvance = useCallback((skillId) => {
    const plan = getTrainingPlan(skillId)
    const activeSkill = state.activeSkills?.find(a => a.skillId === skillId)
    if (!plan || !activeSkill) return false

    const phase = plan.phases[activeSkill.currentPhaseIndex]
    if (!phase || !phase.advanceCriteria) return false

    const skillHistory = (state.workoutHistory || []).filter(
      h => h.skillId === skillId && h.phaseId === phase.id
    )

    return checkPhaseCriteria(phase.advanceCriteria, skillHistory)
  }, [state.activeSkills, state.workoutHistory])

  /**
   * Check if level-up criteria are fully met for a skill
   */
  const checkLevelUp = useCallback((skillId) => {
    const plan = getTrainingPlan(skillId)
    const activeSkill = state.activeSkills?.find(a => a.skillId === skillId)
    if (!plan || !activeSkill) return { met: false, progress: [] }

    const skillHistory = (state.workoutHistory || []).filter(
      h => h.skillId === skillId
    )

    // Only check level-up if user is in the final phase
    const isFinalPhase = activeSkill.currentPhaseIndex >= plan.phases.length - 1
    if (!isFinalPhase) return { met: false, progress: [] }

    return checkLevelUpCriteria(plan.levelUpCriteria, skillHistory, plan.phases[activeSkill.currentPhaseIndex]?.id)
  }, [state.activeSkills, state.workoutHistory])

  /**
   * Advance to the next phase for a skill
   */
  const advancePhase = useCallback((skillId) => {
    setState(prev => {
      const plan = getTrainingPlan(skillId)
      const activeSkill = prev.activeSkills?.find(a => a.skillId === skillId)
      if (!plan || !activeSkill) return prev

      const nextIndex = activeSkill.currentPhaseIndex + 1
      if (nextIndex >= plan.phases.length) return prev

      return {
        ...prev,
        activeSkills: prev.activeSkills.map(a =>
          a.skillId === skillId
            ? { ...a, currentPhaseIndex: nextIndex }
            : a
        ),
      }
    })
  }, [setState])

  /**
   * Master a skill — move from active to mastered
   */
  const masterSkill = useCallback((skillId) => {
    setState(prev => ({
      ...prev,
      activeSkills: (prev.activeSkills || []).filter(a => a.skillId !== skillId),
      masteredSkills: [
        ...(prev.masteredSkills || []),
        { skillId, masteredDate: new Date().toISOString().slice(0, 10) },
      ],
    }))
  }, [setState])

  /**
   * Add a skill to active training
   */
  const addActiveSkill = useCallback((skillId) => {
    setState(prev => {
      // Don't add if already active or mastered
      const alreadyActive = (prev.activeSkills || []).some(a => a.skillId === skillId)
      const alreadyMastered = (prev.masteredSkills || []).some(m => m.skillId === skillId)
      if (alreadyActive || alreadyMastered) return prev

      return {
        ...prev,
        activeSkills: [
          ...(prev.activeSkills || []),
          {
            skillId,
            currentPhaseIndex: 0,
            startedDate: new Date().toISOString().slice(0, 10),
          },
        ],
      }
    })
  }, [setState])

  /**
   * Remove a skill from active training
   */
  const removeActiveSkill = useCallback((skillId) => {
    setState(prev => ({
      ...prev,
      activeSkills: (prev.activeSkills || []).filter(a => a.skillId !== skillId),
    }))
  }, [setState])

  /**
   * Get the current phase info for a skill
   */
  const getCurrentPhase = useCallback((skillId) => {
    const plan = getTrainingPlan(skillId)
    const activeSkill = state.activeSkills?.find(a => a.skillId === skillId)
    if (!plan || !activeSkill) return null

    return plan.phases[activeSkill.currentPhaseIndex] || null
  }, [state.activeSkills])

  /**
   * Get the full training plan info for a skill
   */
  const getSkillTrainingInfo = useCallback((skillId) => {
    const plan = getTrainingPlan(skillId)
    const activeSkill = state.activeSkills?.find(a => a.skillId === skillId)
    const isMastered = (state.masteredSkills || []).some(m => m.skillId === skillId)

    if (!plan) return null

    return {
      plan,
      activeSkill,
      isMastered,
      currentPhase: activeSkill ? plan.phases[activeSkill.currentPhaseIndex] : null,
      totalPhases: plan.phases.length,
      currentPhaseIndex: activeSkill?.currentPhaseIndex ?? -1,
    }
  }, [state.activeSkills, state.masteredSkills])

  return {
    checkPhaseAdvance,
    checkLevelUp,
    advancePhase,
    masterSkill,
    addActiveSkill,
    removeActiveSkill,
    getCurrentPhase,
    getSkillTrainingInfo,
  }
}
