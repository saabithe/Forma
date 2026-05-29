import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useFormaState } from './hooks/useFormaState'
import Layout from './components/Layout'
import Home from './pages/Home'
import Roadmap from './pages/Roadmap'
import Profile from './pages/Profile'
import SkillDetail from './pages/SkillDetail'
import Onboarding from './pages/Onboarding'
import Progress from './pages/Progress'

function App() {
  const app = useFormaState()
  const [selectedSkillId, setSelectedSkillId] = useState(null)

  if (!app.state.user?.assessed) {
    return <Onboarding onComplete={app.completeAssessment} />
  }

  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home app={app} />} />
          <Route path="/roadmap" element={
            <Roadmap app={app} onSelectSkill={setSelectedSkillId} />
          } />
          <Route path="/profile" element={<Profile app={app} />} />
          <Route path="/progress" element={<Progress app={app} />} />
        </Route>
      </Routes>

      {/* Skill Detail Modal */}
      {selectedSkillId && (
        <div className="fixed inset-0 z-[90] bg-bg overflow-y-auto">
          <div className="max-w-5xl mx-auto px-6 pt-6 pb-24">
            <SkillDetail
              skillId={selectedSkillId}
              app={app}
              onBack={() => setSelectedSkillId(null)}
            />
          </div>
        </div>
      )}
    </HashRouter>
  )
}

export default App
