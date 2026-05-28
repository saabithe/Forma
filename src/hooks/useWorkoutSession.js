// Multi-exercise workout session management
// Handles the full session lifecycle: intro → active → rest → between-exercises → complete
import { useState, useEffect, useRef, useCallback } from 'react'

function playBeep() {
  try {
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 800
    gain.gain.value = 0.3
    osc.start()
    osc.stop(ctx.currentTime + 0.2)
    setTimeout(() => {
      const osc2 = ctx.createOscillator()
      const gain2 = ctx.createGain()
      osc2.connect(gain2)
      gain2.connect(ctx.destination)
      osc2.frequency.value = 1000
      gain2.gain.value = 0.3
      osc2.start()
      osc2.stop(ctx.currentTime + 0.2)
    }, 250)
  } catch (e) { console.error(e); }
}

export function useWorkoutSession(exercises, onComplete, settings) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [currentSet, setCurrentSet] = useState(1)
  const [phase, setPhase] = useState('intro') // intro, active, rest, between-exercises, complete
  const [timer, setTimer] = useState(0)
  const [reps, setReps] = useState(0)
  const [restTimer, setRestTimer] = useState(0)
  const [setResults, setSetResults] = useState([])
  const [exerciseResults, setExerciseResults] = useState([])
  const [notes, setNotes] = useState('')
  const [showExecutionTips, setShowExecutionTips] = useState(false)
  const [formQualityMet, setFormQualityMet] = useState(false)
  const [totalTime, setTotalTime] = useState(0)
  const intervalRef = useRef(null)
  const totalIntervalRef = useRef(null)

  const currentExercise = exercises[currentExerciseIndex] || null

  // Initialize timer when exercise changes
  useEffect(() => {
    if (currentExercise && phase === 'active') {
      if (currentExercise.type === 'hold') {
        setTimeout(() => setTimer(currentExercise.targetHoldSeconds || 10), 0)
      }
    }
  }, [currentExerciseIndex, phase])

  // Total time tracker
  useEffect(() => {
    if (phase === 'intro' || phase === 'complete') return
    totalIntervalRef.current = setInterval(() => setTotalTime(t => t + 1), 1000)
    return () => clearInterval(totalIntervalRef.current)
  }, [phase])

  // Hold timer countdown
  useEffect(() => {
    if (phase !== 'active' || currentExercise?.type !== 'hold') return
    if (timer <= 0) {
      if (settings?.timerBeep !== false) playBeep()
      return
    }
    intervalRef.current = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          if (settings?.timerBeep !== false) playBeep()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [phase, currentExercise?.type, settings?.timerBeep])

  // Rest timer countdown
  useEffect(() => {
    if (phase !== 'rest') return
    if (restTimer <= 0) {
      if (settings?.timerBeep !== false) playBeep()
      goNextSet()
      return
    }
    intervalRef.current = setInterval(() => {
      setRestTimer(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          if (settings?.timerBeep !== false) playBeep()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [phase, restTimer, settings?.timerBeep])

  const startWorkout = useCallback(() => {
    setPhase('active')
    if (currentExercise?.type === 'hold') {
      setTimer(currentExercise.targetHoldSeconds || 10)
    }
  }, [currentExercise])

  const completeSet = useCallback(() => {
    if (!currentExercise) return

    // Record set result
    const setResult = {
      setNumber: currentSet,
      holdSeconds: currentExercise.type === 'hold'
        ? (currentExercise.targetHoldSeconds - timer)
        : undefined,
      reps: currentExercise.type === 'reps' ? reps : undefined,
      targetHoldSeconds: currentExercise.type === 'hold' ? currentExercise.targetHoldSeconds : undefined,
      targetReps: currentExercise.type === 'reps' ? currentExercise.targetReps : undefined,
      completed: currentExercise.type === 'hold'
        ? timer === 0
        : reps >= (currentExercise.targetReps || 0),
    }

    const newSetResults = [...setResults, setResult]
    setSetResults(newSetResults)

    if (currentSet >= (currentExercise.targetSets || 1)) {
      // Exercise complete
      finalizeExercise(newSetResults)
    } else {
      // More sets to go — start rest
      setPhase('rest')
      setRestTimer(currentExercise.restSeconds || 60)
    }
  }, [currentExercise, currentSet, timer, reps, setResults])

  const finalizeExercise = useCallback((finalSetResults) => {
    // Rate this exercise's performance
    const completedSets = finalSetResults.filter(s => s.completed).length
    const totalSets = finalSetResults.length
    let rating = 'fail'
    if (completedSets === totalSets) rating = 'success'
    else if (completedSets >= totalSets * 0.66) rating = 'partial'

    const exerciseResult = {
      exerciseId: currentExercise.exerciseId,
      sets: finalSetResults,
      notes,
      performanceRating: rating,
      formQualityMet,
    }

    const newExerciseResults = [...exerciseResults, exerciseResult]
    setExerciseResults(newExerciseResults)

    if (currentExerciseIndex < exercises.length - 1) {
      // More exercises
      setPhase('between-exercises')
    } else {
      // All done
      clearInterval(totalIntervalRef.current)
      setPhase('complete')
      if (onComplete) {
        onComplete(newExerciseResults, totalTime)
      }
    }
  }, [currentExercise, currentExerciseIndex, exercises, notes, formQualityMet, exerciseResults, totalTime, onComplete])

  const startNextExercise = useCallback(() => {
    setCurrentExerciseIndex(i => i + 1)
    setCurrentSet(1)
    setReps(0)
    setSetResults([])
    setNotes('')
    setFormQualityMet(false)
    setShowExecutionTips(false)
    setPhase('active')
    // Timer will be set by the useEffect watching currentExerciseIndex
  }, [])

  const goNextSet = useCallback(() => {
    setCurrentSet(s => s + 1)
    setReps(0)
    if (currentExercise?.type === 'hold') {
      setTimer(currentExercise.targetHoldSeconds || 10)
    }
    setPhase('active')
  }, [currentExercise])

  const skipRest = useCallback(() => {
    clearInterval(intervalRef.current)
    goNextSet()
  }, [goNextSet])

  const resetSet = useCallback(() => {
    if (currentExercise?.type === 'hold') {
      setTimer(currentExercise.targetHoldSeconds || 10)
    }
    setReps(0)
  }, [currentExercise])

  const incrementReps = useCallback(() => setReps(r => r + 1), [])
  const decrementReps = useCallback(() => setReps(r => Math.max(0, r - 1)), [])

  return {
    // State
    currentExerciseIndex,
    currentExercise,
    currentSet,
    phase,
    timer,
    reps,
    restTimer,
    setResults,
    exerciseResults,
    notes,
    showExecutionTips,
    formQualityMet,
    totalTime,

    // Actions
    startWorkout,
    completeSet,
    startNextExercise,
    skipRest,
    resetSet,
    incrementReps,
    decrementReps,
    setNotes,
    setShowExecutionTips,
    setFormQualityMet,
    setPhase,
    setTimer,

    // Computed
    totalExercises: exercises.length,
    isLastExercise: currentExerciseIndex >= exercises.length - 1,
  }
}
