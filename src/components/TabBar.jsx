import { NavLink } from 'react-router-dom'
import { Home, Route, User } from 'lucide-react'

const tabs = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/roadmap', icon: Route, label: 'Roadmap' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export default function TabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border">
      <div className="max-w-5xl mx-auto flex justify-around items-center h-16">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
          >
            {({ isActive }) => (
              <div className={`flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${
                isActive ? 'text-primary' : 'text-muted hover:text-primary/70'
              }`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
                <span>{label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
