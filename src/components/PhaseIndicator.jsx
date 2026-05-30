export default function PhaseIndicator({ currentPhaseIndex, totalPhases, phaseName }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {Array.from({ length: totalPhases }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors ${
              i < currentPhaseIndex ? 'bg-emerald-500' :
              i === currentPhaseIndex ? 'bg-primary ring-2 ring-primary/30' :
              'bg-black/10'
            }`}
          />
        ))}
      </div>
      {phaseName && (
        <span className="text-xs text-muted">{phaseName}</span>
      )}
    </div>
  )
}
