import { useState } from 'react'
import { Settings, Volume2, Download, Upload, Trash2, Check } from 'lucide-react'
import { getCategoryRanges } from '../data/curriculum'
import { exportState, importState } from '../lib/storage'

const categoryBgColors = {
  Beginner: 'bg-emerald-500',
  Intermediate: 'bg-blue-500',
  Advanced: 'bg-violet-500',
  Elite: 'bg-amber-500',
  Supporting: 'bg-gray-400',
}

export default function Profile({ app }) {
  const { state, totalSkills, completedCount, progressPercent, currentSkill, updateSettings, resetAll } = app
  const [showSettings, setShowSettings] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [importStatus, setImportStatus] = useState(null)
  const ranges = getCategoryRanges()

  const handleImport = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const success = importState(reader.result)
      setImportStatus(success ? 'success' : 'error')
      if (success) window.location.reload()
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-display font-bold tracking-tight text-primary">Profile</h1>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`p-2.5 rounded-xl transition-colors ${showSettings ? 'bg-primary text-white' : 'glass text-muted hover:text-primary'}`}
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Identity Card */}
      <div className="glass-strong rounded-2xl p-8 text-center glow-primary">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-4 shadow-lg">
          <span className="text-3xl font-display font-bold text-white">F</span>
        </div>
        <h2 className="font-display font-bold text-xl">Calisthenics Athlete</h2>
        <p className="text-sm text-muted mt-1">{currentSkill?.name} &middot; {currentSkill?.category}</p>

        <div className="mt-6 max-w-xs mx-auto">
          <div className="flex justify-between text-xs text-muted mb-2">
            <span>{completedCount} completed</span>
            <span>{totalSkills} total</span>
          </div>
          <div className="progress-bar h-2">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-primary">{completedCount}</p>
          <p className="text-xs text-muted mt-1">Skills Done</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{state.sessions.length}</p>
          <p className="text-xs text-muted mt-1">Sessions</p>
        </div>
        <div className="glass rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{Math.round(progressPercent)}%</p>
          <p className="text-xs text-muted mt-1">Progress</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="glass rounded-2xl p-5">
        <h3 className="font-display font-semibold mb-4 text-sm text-muted uppercase tracking-wider">Category Breakdown</h3>
        <div className="space-y-3">
          {ranges.map((range, i) => {
            const completed = state.completedSkills.filter(s => s.index >= range.start && s.index <= range.end).length
            const percent = range.count > 0 ? (completed / range.count) * 100 : 0
            const dotColor = categoryBgColors[range.category] || categoryBgColors.Supporting
            return (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                    <span>{range.category}</span>
                  </div>
                  <span className="text-muted">{completed} / {range.count}</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray overflow-hidden">
                  <div className={`h-full rounded-full ${dotColor} opacity-70`} style={{ width: `${percent}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Settings */}
      {showSettings && (
        <div className="space-y-4 border-t border-border pt-6">
          <h2 className="text-xl font-display font-bold text-muted">Settings</h2>

          <div className="glass rounded-2xl p-5">
            <h3 className="font-display font-semibold mb-4 flex items-center gap-2 text-sm text-muted uppercase tracking-wider">
              <Volume2 size={16} /> Sound
            </h3>
            <div className="space-y-3">
              {[
                { key: 'sound', label: 'Sound effects' },
                { key: 'timerBeep', label: 'Timer beep' },
              ].map(item => (
                <label key={item.key} className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm">{item.label}</span>
                  <button
                    onClick={() => updateSettings({ [item.key]: !state.settings[item.key] })}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      state.settings[item.key] ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                      state.settings[item.key] ? 'left-5' : 'left-0.5'
                    }`} />
                  </button>
                </label>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <h3 className="font-display font-semibold mb-4 text-sm text-muted uppercase tracking-wider">Data</h3>
            <div className="space-y-2">
              <button
                onClick={exportState}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                <Download size={16} className="text-primary" />
                <span className="flex-1 text-left">Export Data</span>
                <span className="text-xs text-muted">JSON</span>
              </button>

              <label className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors text-sm cursor-pointer">
                <Upload size={16} className="text-primary" />
                <span className="flex-1 text-left">Import Data</span>
                {importStatus === 'success' && <Check size={14} className="text-emerald-500" />}
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
              </label>

              {!confirmReset ? (
                <button
                  onClick={() => setConfirmReset(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-sm"
                >
                  <Trash2 size={16} className="text-red-500" />
                  <span className="flex-1 text-left text-red-500">Reset All Data</span>
                </button>
              ) : (
                <div className="p-4 rounded-xl border border-red-200 bg-red-50">
                  <p className="text-sm mb-3 text-red-600">Permanently delete all progress?</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { resetAll(); setConfirmReset(false); window.location.reload() }}
                      className="flex-1 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
                    >
                      Yes, Reset
                    </button>
                    <button
                      onClick={() => setConfirmReset(false)}
                      className="flex-1 py-2 rounded-lg bg-gray-100 text-sm font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-xs text-muted/50 py-2">Forma v0.3.0</p>
        </div>
      )}
    </div>
  )
}
