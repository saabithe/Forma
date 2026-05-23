import { Outlet } from 'react-router-dom'
import TabBar from './TabBar'
import ThemeToggle from './ThemeToggle'

export default function Layout() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-24">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <div className="flex justify-end mb-6">
          <ThemeToggle />
        </div>
        <Outlet />
      </div>
      <TabBar />
    </div>
  )
}
