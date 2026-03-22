import { useNavigate } from 'react-router-dom'
import { BarChart2, ChevronRight, TrendingUp, MapPin, Clock } from 'lucide-react'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import { useTrends } from '../context/TrendsContext'

const QUICK_SEARCHES = [
  { label: 'Condo • D01–D05 • Last 3 years', tag: 'Popular' },
  { label: 'HDB • Tampines & Jurong • 2020–2024', tag: 'Trending' },
  { label: 'Landed • D10, D11 • Last 5 years', tag: 'New' },
]

export default function TrendsEmpty() {
  const navigate = useNavigate()
  const { filters, selectedTrends } = useTrends()
  const hasChart = selectedTrends.length > 0

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F2F7]">
      <TopBar />

      <main className="flex-1 overflow-y-auto pb-24 page-enter">
        {/* Hero section */}
        <div className="bg-gradient-to-b from-white to-[#F2F2F7] px-6 pt-8 pb-10 text-center">
          {/* Chart illustration */}
          <div className="mx-auto w-48 h-48 mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-era-red/5 to-era-red/10 rounded-3xl" />
            <div className="absolute inset-4 bg-white rounded-2xl shadow-sm flex items-center justify-center">
              <ChartIllustration />
            </div>
          </div>

          <h1 className="text-[28px] font-extrabold text-era-navy leading-tight mb-3">
            Visualize the{' '}
            <span className="text-era-red">Next Move</span>
          </h1>
          <p className="text-gray-500 text-[14px] leading-relaxed max-w-xs mx-auto">
            Analyze property price trends across districts to make better decisions for your clients.
          </p>

          <button
            onClick={() => navigate('/trends/filter')}
            className="mt-6 w-full bg-era-red text-white font-semibold text-[16px] py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-era-red/25 active:scale-[0.98] transition-transform"
          >
            <BarChart2 size={20} />
            Generate Trend Chart
          </button>

          {hasChart && (
            <button
              onClick={() => navigate('/trends/chart')}
              className="mt-3 w-full bg-white text-era-red font-semibold text-[15px] py-3.5 rounded-2xl border border-era-red/20 active:scale-[0.98] transition-transform"
            >
              View Current Chart ({selectedTrends.length} trends)
            </button>
          )}

          <button className="mt-3 text-gray-400 text-[13px] font-medium">
            View Sample Reports
          </button>
        </div>

        {/* AI Suggested searches */}
        <div className="px-4 mt-2">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-era-red/10 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-era-red rounded-full" />
              </div>
              <span className="text-[11px] font-bold text-era-red tracking-widest uppercase">AI Suggested</span>
            </div>
            <p className="text-[12px] text-gray-500 mb-3">Based on recent market activity</p>
            <div className="space-y-2">
              {QUICK_SEARCHES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => navigate('/trends/filter')}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-era-red/5 transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp size={14} className="text-gray-400 group-hover:text-era-red transition-colors" />
                    <span className="text-[13px] text-gray-700 text-left">{s.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      s.tag === 'Popular' ? 'bg-era-red/10 text-era-red' :
                      s.tag === 'Trending' ? 'bg-orange-50 text-orange-500' :
                      'bg-blue-50 text-blue-500'
                    }`}>{s.tag}</span>
                    <ChevronRight size={14} className="text-gray-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="px-4 mt-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-3">How It Works</h3>
            <div className="space-y-3">
              {[
                { icon: '🎯', step: '1', title: 'Set Filters', desc: 'Choose market type, districts & property type' },
                { icon: '📊', step: '2', title: 'Select Trends', desc: 'Pick up to 5 districts to compare' },
                { icon: '📈', step: '3', title: 'Analyze Chart', desc: 'View multi-line trend visualization' },
              ].map(({ icon, step, title, desc }) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-era-red/10 rounded-full flex items-center justify-center flex-shrink-0 text-[16px]">
                    {icon}
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-era-navy">{title}</div>
                    <div className="text-[12px] text-gray-400">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}

function ChartIllustration() {
  return (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none">
      {/* Grid lines */}
      {[20, 40, 60].map(y => (
        <line key={y} x1="10" y1={y} x2="90" y2={y} stroke="#F3F4F6" strokeWidth="1" />
      ))}
      {/* D01 - Red line */}
      <polyline
        points="10,60 30,50 50,38 70,30 90,22"
        fill="none" stroke="#D41F30" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* D05 - Blue line */}
      <polyline
        points="10,65 30,58 50,50 70,45 90,40"
        fill="none" stroke="#1E40AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* D15 - Gray line */}
      <polyline
        points="10,72 30,68 50,63 70,58 90,52"
        fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* End dots */}
      <circle cx="90" cy="22" r="3" fill="#D41F30" />
      <circle cx="90" cy="40" r="3" fill="#1E40AF" />
      <circle cx="90" cy="52" r="3" fill="#6B7280" />
    </svg>
  )
}
