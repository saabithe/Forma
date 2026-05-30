import { useState } from 'react'
import { Settings, Download, Upload, Trash2, Check } from 'lucide-react'
import { exportState, importState } from '../lib/storage'

export default function Profile({ app }) {
  const { state, totalSkills, masteredCount, activeCount, progressPercent, updateSettings, resetAll } = app
  const [showSettings, setShowSettings] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [importStatus, setImportStatus] = useState(null)

  const streak = state.streak || { current: 0, longest: 0 }
  const totalSessions = (state.workoutHistory || []).length

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
          className={`p-2.5 rounded-xl transition-colors ${showSettings ? 'bg-primary text-white' : 'card text-muted hover:text-primary'}`}
        >
          <Settings size={20} />
        </button>
      </div>

      {/* Identity Card */}
      <div className="card-strong rounded-2xl p-8 text-center glow-primary">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-4 shadow-lg">
          <span className="text-3xl font-display font-bold text-white">
            {(state.user?.name || 'S')[0].toUpperCase()}
          </span>
        </div>
        <h2 className="text-xl font-display font-bold">{state.user?.name || 'SABITH THIRUNILATH'}</h2>
        <p className="text-sm text-muted mt-1">Level {Math.floor(masteredCount / 5) + 1}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-primary">{masteredCount}</p>
          <p className="text-xs text-muted mt-0.5">Skills Mastered</p>
        </div>
        <div className="card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{activeCount}</p>
          <p className="text-xs text-muted mt-0.5">Currently Training</p>
        </div>
        <div className="card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-amber-500">{streak.current}</p>
          <p className="text-xs text-muted mt-0.5">Day Streak</p>
        </div>
        <div className="card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold">{totalSessions}</p>
          <p className="text-xs text-muted mt-0.5">Total Sessions</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card rounded-xl p-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="font-medium">Overall Progress</span>
          <span className="text-muted">{Math.round(progressPercent)}%</span>
        </div>
        <div className="progress-bar h-2">
          <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="text-xs text-muted mt-2">{masteredCount} of {totalSkills} skills mastered</p>
      </div>

      {/* Streak Info */}
      <div className="card rounded-xl p-4">
        <h3 className="font-display font-semibold text-sm mb-3">Streak</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted">Current</p>
            <p className="text-lg font-bold text-amber-500">{streak.current} days</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted">Longest</p>
            <p className="text-lg font-bold">{streak.longest} days</p>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="card rounded-2xl p-5 space-y-4">
          <h3 className="font-display font-semibold text-sm">Settings</h3>

          {/* Sound */}
          <div className="flex items-center justify-between">
            <span className="text-sm">Timer Sound</span>
            <button
              onClick={() => updateSettings({ timerBeep: !state.settings?.timerBeep })}
              className={`w-12 h-6 rounded-full transition-colors ${state.settings?.timerBeep ? 'bg-primary' : 'bg-gray-200'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${state.settings?.timerBeep ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>

          {/* Data Management */}
          <div className="pt-3 border-t border-border space-y-3">
            <h4 className="text-xs text-muted uppercase tracking-wider">Data Management</h4>

            <button onClick={exportState} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <Download size={16} className="text-muted" />
              <span className="text-sm">Export Backup</span>
            </button>

            <label className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
              <Upload size={16} className="text-muted" />
              <span className="text-sm">Import Backup</span>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>

            {importStatus && (
              <div className={`flex items-center gap-2 text-sm ${importStatus === 'success' ? 'text-emerald-500' : 'text-red-500'}`}>
                {importStatus === 'success' ? <Check size={14} /> : null}
                {importStatus === 'success' ? 'Import successful' : 'Import failed — invalid file'}
              </div>
            )}

            <div className="pt-3 border-t border-border">
              {!confirmReset ? (
                <button onClick={() => setConfirmReset(true)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors">
                  <Trash2 size={16} className="text-red-400" />
                  <span className="text-sm text-red-500">Reset All Data</span>
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-red-50 space-y-2">
                  <p className="text-sm text-red-600 font-medium">Are you sure? This can not be undone.</p>
                  <div className="flex gap-2">
                    <button onClick={resetAll} className="flex-1 py-2 rounded-lg bg-red-500 text-white text-sm font-medium">
                      Yes, Reset
                    </button>
                    <button onClick={() => setConfirmReset(false)} className="flex-1 py-2 rounded-lg bg-white text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
