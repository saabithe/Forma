import { useState, useEffect, useCallback, useMemo } from 'react'
import { loadState, saveState } from '../lib/storage'
import { SKILLS, getSkill, getNextSkillIndex } from '../data/curriculum'

const MAX_UNDO_HISTORY = 10

function pushUndo(state, action) {
  const snapshot = {
    currentIndex: state.currentIndex,
    completedSkills: [...state.completedSkills],
    sessions: [...state.sessions],
  }
  const history = [...state.undoHistory, { action, snapshot }]
  if (history.length > MAX_UNDO_HISTORY) history.shift()
  return history
}

export function useFormaState() {
  const [state, setState] = useState(() => loadState())

  useEffect(() => {
    saveState(state)
  }, [state])

  const currentSkill = useMemo(() => getSkill(state.currentIndex), [state.currentIndex])
  const totalSkills = SKILLS.length
  const completedCount = state.completedSkills.length
  const progressPercent = totalSkills > 0 ? (completedCount / totalSkills) * 100 : 0

  const completeSkill = useCallback(() => {
    setState(prev => {
      const alreadyCompleted = prev.completedSkills.some(s => s.index === prev.currentIndex)
      let completedSkills = prev.completedSkills
      if (!alreadyCompleted) {
        completedSkills = [...prev.completedSkills, { index: prev.currentIndex, date: new Date().toISOString().slice(0, 10) }]
      }

      const session = {
        date: new Date().toISOString().slice(0, 10),
        skillIndex: prev.currentIndex,
        completed: true,
      }

      const nextIndex = getNextSkillIndex(prev.currentIndex)

      return {
        ...prev,
        completedSkills,
        sessions: [...prev.sessions, session],
        currentIndex: nextIndex !== null ? nextIndex : prev.currentIndex,
        undoHistory: pushUndo(prev, `Completed: ${SKILLS[prev.currentIndex]?.name}`),
      }
    })
  }, [])

  const undoLast = useCallback(() => {
    setState(prev => {
      if (prev.undoHistory.length === 0) return prev
      const history = [...prev.undoHistory]
      const last = history.pop()
      return {
        ...prev,
        ...last.snapshot,
        undoHistory: history,
      }
    })
  }, [])

  const updateSettings = useCallback((patch) => {
    setState(prev => ({ ...prev, settings: { ...prev.settings, ...patch } }))
  }, [])

  const completeAssessment = useCallback((result) => {
    setState(prev => ({
      ...prev,
      user: { assessed: true, level: result.level },
      currentIndex: result.startIndex || 0,
    }))
  }, [])

  const resetAll = useCallback(() => {
    localStorage.removeItem('forma_state')
    setState(loadState())
  }, [])

  const jumpToSkill = useCallback((index) => {
    setState(prev => ({
      ...prev,
      currentIndex: index,
      undoHistory: pushUndo(prev, `Jumped to: ${SKILLS[index]?.name}`),
    }))
  }, [])

  return {
    state,
    currentSkill,
    totalSkills,
    completedCount,
    progressPercent,
    completeSkill,
    undoLast,
    updateSettings,
    completeAssessment,
    resetAll,
    jumpToSkill,
    setState,
  }
}
