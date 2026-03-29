import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Bell, ChevronRight, TrendingUp, MapPin, Zap, Home, Building2, DollarSign, Globe, Star, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import BottomNav from '../components/BottomNav'

const NEWS_ITEMS = [
  '🔴 Singapore private home prices rise 1.1% in Q1 2024 — URA Flash Estimate',
  '📈 HDB resale prices up 1.8% in March — highest in 6 months',
  '🏗️ 3 new GLS sites released in Queenstown and Tengah',
  '💼 ERA achieves record S$12.4B in transactions for FY2023',
  '📊 District 9 sees 14% spike in condo transactions — analysts cite foreign demand',
]

const CATEGORIES = [
  { icon: '🏠', label: 'Buy',        sub: ['Condo', 'HDB', 'Landed', 'EC', 'New Launch'],                       color: '#FDE3E7', accent: '#C8102E' },
  { icon: '💰', label: 'Sell',       sub: ['List Property', 'Valuation', 'Market Report', 'Agent Match', 'Timeline'], color: '#FFF7ED', accent: '#EA580C' },
  { icon: '🔑', label: 'Rent',       sub: ['Condo', 'HDB', 'Landed', 'Commercial', 'Short Term'],               color: '#E3DBFA', accent: '#250E62' },
  { icon: '🏢', label: 'Commercial', sub: ['Office', 'Retail', 'Industrial', 'F&B', 'Warehouse'],               color: '#DCFEEE', accent: '#048848' },
  { icon: '✨', label: 'New Launch', sub: ['OCR Projects', 'CCR Projects', 'RCR Projects', 'ECs', 'Upcoming'],  color: '#FDF4FF', accent: '#9333EA' },
  { icon: '📊', label: 'Investment', sub: ['ROI Analysis', 'Rental Yield', 'Capital Growth', 'Portfolio', 'Foreign'], color: '#FEF9EB', accent: '#F6BC2F' },
]

const QUICK_STATS = [
  { label: 'Active Listings', value: '24', change: '+3', up: true },
  { label: 'Deals This Month', value: '7', change: '+2', up: true },
  { label: 'Avg PSF', value: '$2,841', change: '-1.2%', up: false },
]

const RECENT_ACTIVITY = [
  { type: 'listing', text: 'New listing matched: 3BR at Orchard Residences', time: '2m ago', dot: '#C8102E' },
  { type: 'deal',    text: 'Deal closed: $1.85M at Tampines St 86',           time: '1h ago', dot: '#048848' },
  { type: 'insight', text: 'AI Alert: D15 prices up 8% — 3 clients match',   time: '3h ago', dot: '#250E62' },
  { type: 'listing', text: 'Viewing scheduled: Clementi Ave 3 unit',          time: '5h ago', dot: '#F6BC2F' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [newsIndex, setNewsIndex] = useState(0)
  const [showSubcat, setShowSubcat] = useState(null)

  useEffect(() => {
    const t = setInterval(() => setNewsIndex(i => (i + 1) % NEWS_ITEMS.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F2F7]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-era-red to-[#B01827] flex items-center justify-center text-white text-[12px] font-extrabold shadow-sm flex-shrink-0">AG</div>
            <div>
              <div className="text-[10px] text-gray-400 leading-none mb-0.5">Good morning 👋</div>
              <div className="text-[16px] font-bold text-era-navy leading-none">Alex Goh</div>
            </div>
          </div>
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

        {/* News ticker */}
        <div className="bg-era-red/5 border-t border-era-red/10 px-4 py-2 flex items-center gap-2 overflow-hidden">
          <span className="text-[10px] font-bold text-era-red uppercase tracking-widest flex-shrink-0">LIVE</span>
          <div className="flex-1 overflow-hidden">
            <p key={newsIndex} className="text-[11px] text-gray-600 truncate animate-pulse">
              {NEWS_ITEMS[newsIndex]}
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Hero banner */}
        <div className="mx-4 mt-4 rounded-2xl overflow-hidden relative bg-gradient-to-br from-era-red to-era-red-dark p-4 shadow-lg shadow-era-red/20">
          <div className="absolute right-0 top-0 bottom-0 w-32 opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="white">
              <circle cx="80" cy="20" r="40" /><circle cx="60" cy="70" r="30" />
            </svg>
          </div>
          <div className="text-[11px] font-semibold text-white/60 uppercase tracking-widest mb-1">March 2026 · Market Snapshot</div>
          <div className="text-[24px] font-extrabold text-white mb-1">S'pore Market</div>
          <div className="text-[13px] text-white/80 mb-3">3 districts trending up this week</div>
          <div className="flex gap-3">
            {[['$2,841', 'Avg PSF'], ['142', 'New Deals'], ['+4.2%', 'QoQ Growth']].map(([val, lbl]) => (
              <div key={lbl} className="bg-white/15 rounded-xl px-3 py-2 flex-1 text-center">
                <div className="text-[15px] font-bold text-white">{val}</div>
                <div className="text-[9px] text-white/60 font-medium">{lbl}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/trends')}
            className="mt-3 flex items-center gap-1.5 bg-white text-era-red text-[12px] font-bold px-3 py-2 rounded-xl"
          >
            <BarChart3 size={13} />
            View Trend Charts
          </button>
        </div>

        {/* Quick stats */}
        <div className="px-4 mt-3 grid grid-cols-3 gap-2">
          {QUICK_STATS.map(s => (
            <div key={s.label} className="bg-white rounded-xl p-3 shadow-sm">
              <div className="text-[18px] font-extrabold text-era-navy">{s.value}</div>
              <div className="text-[10px] text-gray-400 leading-tight mt-0.5">{s.label}</div>
              <div className={`flex items-center gap-0.5 mt-1 text-[10px] font-semibold ${s.up ? 'text-green-500' : 'text-red-400'}`}>
                {s.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {s.change}
              </div>
            </div>
          ))}
        </div>

        {/* MAP+ Featured */}
        <div className="px-4 mt-4">
          <button
            className="w-full bg-gradient-to-r from-era-navy to-[#3F18AA] rounded-2xl p-4 shadow-lg shadow-era-navy/30 flex items-center justify-between"
            onClick={() => {}}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-era-red rounded-xl flex items-center justify-center shadow-md">
                <MapPin size={22} className="text-white" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="text-white font-extrabold text-[18px]">Map+</span>
                  <span className="bg-era-red text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Featured</span>
                </div>
                <div className="text-white/60 text-[12px] mt-0.5">Explore properties on live map</div>
              </div>
            </div>
            <div className="bg-white/10 rounded-full p-2">
              <ChevronRight size={18} className="text-white" />
            </div>
          </button>
        </div>

        {/* AI Copilot */}
        <div className="px-4 mt-3">
          <div className="bg-gradient-to-r from-era-blue-light to-[#C8B8F5] border border-[#9475EB]/20 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#250E62' }}>
                  <Zap size={13} className="text-white" />
                </div>
                <span className="text-[13px] font-bold" style={{ color: '#250E62' }}>AI Copilot</span>
              </div>
              <button onClick={() => navigate('/insights')} className="text-[11px] font-semibold" style={{ color: '#3F18AA' }}>View All</button>
            </div>
            <p className="text-[12px] leading-relaxed" style={{ color: '#1E0B50' }}>
              📍 <strong>3 of your clients</strong> are looking in D15 — prices up 8% this quarter. <strong>Good time to reach out.</strong>
            </p>
            <button onClick={() => navigate('/insights')} className="mt-2.5 flex items-center gap-1.5 text-white text-[12px] font-semibold px-3 py-2 rounded-xl" style={{ background: '#250E62' }}>
              <Zap size={12} />
              See AI Recommendations
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] font-extrabold text-era-navy">Explore</h3>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat.label}
                onClick={() => setShowSubcat(showSubcat === i ? null : i)}
                className="rounded-2xl p-3 text-left transition-all active:scale-95"
                style={{ background: cat.color }}
              >
                <div className="text-2xl mb-1.5">{cat.icon}</div>
                <div className="text-[13px] font-bold" style={{ color: cat.accent }}>{cat.label}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{cat.sub.length} options</div>
              </button>
            ))}
          </div>

          {/* Subcategory expansion */}
          {showSubcat !== null && (
            <div className="mt-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{CATEGORIES[showSubcat].icon}</span>
                <span className="font-bold text-era-navy">{CATEGORIES[showSubcat].label}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES[showSubcat].sub.map(s => (
                  <button
                    key={s}
                    className="px-3 py-1.5 rounded-full text-[12px] font-semibold border border-gray-200 text-gray-600 active:scale-95"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Recent activity */}
        <div className="px-4 mt-4 mb-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] font-extrabold text-era-navy">Recent Activity</h3>
            <button className="text-[12px] text-era-red font-semibold">See All</button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {RECENT_ACTIVITY.map((item, i) => (
              <div key={i} className={`flex items-start gap-3 px-4 py-3 ${i < RECENT_ACTIVITY.length - 1 ? 'border-b border-gray-50' : ''}`}>
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.dot }} />
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-gray-700 leading-snug">{item.text}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
