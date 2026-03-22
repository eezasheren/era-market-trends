import { Search } from 'lucide-react'

export default function TopBar({ title = 'Market Trends' }) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden ring-2 ring-era-red/20">
            <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs font-bold">
              AG
            </div>
          </div>
          <span className="text-[17px] font-bold text-era-navy">{title}</span>
        </div>
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors">
          <Search size={20} className="text-era-red" />
        </button>
      </div>
    </header>
  )
}
