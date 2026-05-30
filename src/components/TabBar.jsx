import { NavLink } from 'react-router-dom'
import { Home, Route, User, TrendingUp } from 'lucide-react'

const tabs = [
  { to: '/', icon: Home, label: 'Dashboard' },
  { to: '/roadmap', icon: Route, label: 'Roadmap' },
  { to: '/progress', icon: TrendingUp, label: 'Progress' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export default function TabBar() {
  return (
    <nav
      className="fixed bottom-4 left-4 right-4 z-50 card rounded-lg border-2 border-[var(--color-border)] max-w-md mx-auto"
      style={{ boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)' }}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className="flex-1"
          >
            {({ isActive }) => (
              <div className={`flex flex-col items-center gap-1 py-2 text-xs font-bold transition-all duration-200 ${
                isActive
                  ? 'text-primary scale-110'
                  : 'text-[var(--color-text-dim)] hover:text-[var(--color-text)]'
              }`}>
                <Icon
                  size={20}
                  strokeWidth={isActive ? 3 : 2}
                  className="transition-transform duration-200"
                />
                <span className="tracking-wider">{label}</span>
              </div>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
