import { useState } from 'react'
import { ArrowRight, ArrowLeft, CheckCircle2, Zap } from 'lucide-react'
import { scoreAssessment } from '../lib/assessment'
import { SKILLS } from '../data/curriculum'

const STEPS = [
  { title: 'Pull-up Capacity', description: 'How many strict pull-ups can you do in a single set?', field: 'pullUps', type: 'number', placeholder: 'e.g. 5' },
  { title: 'Push-up Capacity', description: 'How many strict push-ups can you do in a single set?', field: 'pushUps', type: 'number', placeholder: 'e.g. 15' },
  { title: 'Plank Duration', description: 'How long can you hold a plank (in seconds)?', field: 'plankSeconds', type: 'number', placeholder: 'e.g. 60' },
  { title: 'Mobility Level', description: 'Rate your overall mobility and flexibility', field: 'mobility', type: 'select', options: [
    { value: 1, label: 'Limited — stiff joints, poor range of motion' },
    { value: 2, label: 'Average — can touch toes, basic shoulder mobility' },
    { value: 3, label: 'Good — deep squat, overhead mobility' },
    { value: 4, label: 'Advanced — full splits, german hang' },
  ]},
  { title: 'Body Control', description: 'Rate your body awareness and control', field: 'control', type: 'select', options: [
    { value: 1, label: 'Beginner — new to calisthenics' },
    { value: 2, label: 'Basic — can hold basic positions' },
    { value: 3, label: 'Intermediate — controlled movements, handstand practice' },
    { value: 4, label: 'Advanced — muscle-ups, planche work' },
  ]},
]

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const current = STEPS[step]
  const value = answers[current.field]
  const canProceed = value !== undefined && value !== '' && value !== null

  const handleNext = () => {
    if (step < STEPS.length - 1) { setStep(step + 1); return }
    setResult(scoreAssessment({
      pullUps: Number(answers.pullUps) || 0,
      pushUps: Number(answers.pushUps) || 0,
      plankSeconds: Number(answers.plankSeconds) || 0,
      mobility: Number(answers.mobility) || 1,
      control: Number(answers.control) || 1,
    }))
  }

  if (result) {
    const startSkill = SKILLS[result.startIndex]
    return (
      <div className="min-h-screen flex items-center justify-center p-8" style={{ background: 'var(--color-bg)' }}>
        <div className="glass-strong rounded-2xl p-10 max-w-lg w-full text-center">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-wine to-romance flex items-center justify-center mb-5 glow-wine">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-display font-bold mb-2">Assessment Complete</h1>
          <p className="text-muted mb-6">Your starting point in the roadmap:</p>
          <div className="glass rounded-xl p-5 mb-8">
            <p className="text-xs text-muted uppercase tracking-wider mb-1">Starting Skill</p>
            <p className="text-xl font-display font-bold text-romance">{startSkill?.name}</p>
            <p className="text-sm text-muted mt-1">{startSkill?.category} &middot; Skill #{result.startIndex + 1}</p>
          </div>
          <button onClick={() => onComplete(result)} className="w-full py-4 rounded-xl bg-gradient-to-r from-wine to-wine-light text-white font-display font-semibold hover:from-wine-light hover:to-wine transition-all glow-wine text-lg flex items-center justify-center gap-2">
            Begin Journey <ArrowRight size={20} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ background: 'var(--color-bg)' }}>
      <div className="glass-strong rounded-2xl p-10 max-w-lg w-full">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-wine to-romance flex items-center justify-center">
            <Zap size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-lg">Initial Assessment</h1>
            <p className="text-xs text-muted">Step {step + 1} of {STEPS.length}</p>
          </div>
        </div>

        <div className="flex gap-1 mb-8">
          {STEPS.map((_, i) => (
            <div key={i} className={`flex-1 h-1 rounded-full ${i <= step ? 'bg-romance' : 'bg-white/5'}`} />
          ))}
        </div>

        <h2 className="font-display font-semibold text-xl mb-2">{current.title}</h2>
        <p className="text-muted mb-6">{current.description}</p>

        {current.type === 'number' ? (
          <input type="number" value={value || ''} onChange={e => setAnswers({ ...answers, [current.field]: e.target.value })} placeholder={current.placeholder} className="w-full px-5 py-4 rounded-xl glass text-xl font-display text-center outline-none focus:ring-1 focus:ring-romance/30" autoFocus />
        ) : (
          <div className="space-y-2">
            {current.options.map(opt => (
              <button key={opt.value} onClick={() => setAnswers({ ...answers, [current.field]: opt.value })} className={`w-full text-left px-5 py-3.5 rounded-xl transition-colors text-sm ${value === opt.value ? 'bg-romance text-white' : 'glass hover:bg-white/5'}`}>
                {opt.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-3 mt-8">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="px-5 py-3.5 rounded-xl glass font-semibold hover:bg-white/5 transition-colors">
              <ArrowLeft size={16} />
            </button>
          )}
          <button onClick={handleNext} disabled={!canProceed} className={`flex-1 py-3.5 rounded-xl font-display font-semibold transition-all flex items-center justify-center gap-2 ${canProceed ? 'bg-gradient-to-r from-wine to-wine-light text-white glow-wine' : 'bg-white/5 text-muted/40 cursor-not-allowed'}`}>
            {step === STEPS.length - 1 ? 'Finish' : 'Next'} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
