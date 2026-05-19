import { Outlet } from 'react-router-dom'
import TabBar from './TabBar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-bg pb-20">
      <div className="max-w-5xl mx-auto px-6 pt-6">
        <Outlet />
      </div>
      <TabBar />
    </div>
  )
}
