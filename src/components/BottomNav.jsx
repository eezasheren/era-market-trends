import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, Building2, TrendingUp, Lightbulb, User } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'DASH',     icon: LayoutDashboard, path: '/dashboard' },
  { label: 'LISTINGS', icon: Building2,        path: '/listings' },
  { label: 'TRENDS',   icon: TrendingUp,       path: '/trends' },
  { label: 'AI INSIGHTS', icon: Lightbulb,     path: '/insights'  },
  { label: 'PROFILE',  icon: User,             path: '/profile' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {NAV_ITEMS.map(({ label, icon: Icon, path }) => {
          const active = pathname.startsWith(path)
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-0.5 px-3 py-1 min-w-[52px] transition-all"
            >
              {active ? (
                <div className="bg-era-red/10 rounded-full p-1.5 -mt-1">
                  <Icon size={20} className="text-era-red" strokeWidth={2.5} />
                </div>
              ) : (
                <Icon size={20} className="text-gray-400 mt-0.5" strokeWidth={1.8} />
              )}
              <span className={`text-[9px] font-semibold tracking-wide ${active ? 'text-era-red' : 'text-gray-400'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
