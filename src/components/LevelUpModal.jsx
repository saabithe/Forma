import { Trophy, ArrowRight } from 'lucide-react'

export default function LevelUpModal({ skillName, criteriaProgress, onContinue }) {
  return (
    <div className="fixed inset-0 z-[200] bg-black/40 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl max-w-sm w-full p-8 text-center space-y-6 shadow-2xl">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
          <Trophy size={40} className="text-white" />
        </div>

        {/* Title */}
        <div>
          <p className="text-xs text-amber-600 uppercase tracking-wider font-semibold mb-1">Skill Mastered</p>
          <h2 className="text-2xl font-display font-bold">{skillName}</h2>
        </div>

        {/* Criteria Achieved */}
        {criteriaProgress && criteriaProgress.length > 0 && (
          <div className="text-left space-y-2">
            <p className="text-xs text-muted uppercase tracking-wider font-semibold">You achieved:</p>
            {criteriaProgress.map((c, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span className="text-muted">{c.description}</span>
              </div>
            ))}
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full py-3 rounded-xl bg-primary text-white font-display font-semibold hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
        >
          Continue <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
