import { Outlet } from 'react-router-dom'
import TabBar from './TabBar'
import ThemeToggle from './ThemeToggle'

export default function Layout() {
  return (
    <div className="min-h-screen bg-bg pb-20">
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        <Outlet />
      </div>
      <TabBar />
    </div>
  )
}
