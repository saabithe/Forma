import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useFormaState } from './hooks/useFormaState'
import Layout from './components/Layout'
import Home from './pages/Home'
import Roadmap from './pages/Roadmap'
import Profile from './pages/Profile'
import Onboarding from './pages/Onboarding'

function App() {
  const app = useFormaState()

  if (!app.state.user?.assessed) {
    return <Onboarding onComplete={app.completeAssessment} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home app={app} />} />
          <Route path="/roadmap" element={<Roadmap app={app} />} />
          <Route path="/profile" element={<Profile app={app} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
