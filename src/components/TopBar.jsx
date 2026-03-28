import { Search, Bell } from 'lucide-react'

export default function TopBar({ title = 'Market Trends', subtitle = null }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left: avatar + title */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-era-red to-[#B01827] flex items-center justify-center text-white text-[12px] font-extrabold shadow-sm flex-shrink-0">
            AG
          </div>
          <div>
            {subtitle && (
              <div className="text-[10px] text-gray-400 leading-none mb-0.5">{subtitle}</div>
            )}
            <div className="text-[16px] font-bold text-era-navy leading-none">{title}</div>
          </div>
        </div>

        {/* Right: search + bell */}
        <div className="flex items-center gap-1.5">
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200 transition-colors">
            <Search size={17} className="text-gray-600" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 active:bg-gray-200 transition-colors relative">
            <Bell size={17} className="text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-era-red rounded-full border-2 border-white" />
          </button>
        </div>
      </div>
    </header>
  )
}
