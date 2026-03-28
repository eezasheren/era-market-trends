import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, TrendingUp, TrendingDown, Users, Bell, ChevronRight, BarChart2, ArrowUpRight, Sparkles, MessageSquare, Search } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import BottomNav from '../components/BottomNav'

const ALERT_ITEMS = [
  { id: 1, type: 'opportunity', icon: '🎯', title: 'D15 Price Surge', desc: '3 clients looking in D15 — prices up 8.2% this quarter. Perfect time to reach out.', time: '2h ago', action: 'View Clients', color: '#D41F30' },
  { id: 2, type: 'market', icon: '📈', title: 'New Launch Alert', desc: 'The Continuum launches Phase 2 next week. 2 of your leads expressed interest in D15.', time: '5h ago', action: 'See Details', color: '#2563EB' },
  { id: 3, type: 'client', icon: '💼', title: 'Follow-Up Reminder', desc: 'Sarah Tan hasn\'t been contacted in 14 days. Her preferred budget matches D09 listings.', time: '1d ago', action: 'Contact Now', color: '#059669' },
  { id: 4, type: 'market', icon: '⚠️', title: 'D01 Cooling Signal', desc: 'Transaction volume dropped 18% in D01. Consider adjusting pricing expectations.', time: '2d ago', action: 'View Analysis', color: '#EA580C' },
]

const DISTRICT_FORECAST = [
  { district: 'D01', trend: +5.2, label: 'Core Central', up: true },
  { district: 'D09', trend: +3.8, label: 'Orchard', up: true },
  { district: 'D15', trend: +8.2, label: 'East Coast', up: true },
  { district: 'D05', trend: -1.4, label: 'West Coast', up: false },
  { district: 'D23', trend: +2.1, label: 'Bukit Panjang', up: true },
]

const MONTHLY_VOLUME = [
  { month: 'Oct', deals: 5 }, { month: 'Nov', deals: 7 }, { month: 'Dec', deals: 4 },
  { month: 'Jan', deals: 9 }, { month: 'Feb', deals: 6 }, { month: 'Mar', deals: 11 },
]

const CLIENT_MATCHES = [
  { name: 'Sarah Tan', budget: '$2–3M', pref: 'D09, D10 Condo', match: 94, avatar: 'ST' },
  { name: 'James Lim', budget: '$1.2–1.8M', pref: 'D15, D16 Condo', match: 87, avatar: 'JL' },
  { name: 'Priya Nair', budget: '$600–800K', pref: 'D20 HDB', match: 79, avatar: 'PN' },
]

const AI_TABS = ['Alerts', 'Forecast', 'Performance', 'Client Match']

export default function AIInsights() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Alerts')
  const [dismissedAlerts, setDismissedAlerts] = useState([])

  function dismissAlert(id) {
    setDismissedAlerts(prev => [...prev, id])
  }

  const visibleAlerts = ALERT_ITEMS.filter(a => !dismissedAlerts.includes(a.id))

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F2F7]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-era-red to-[#B01827] flex items-center justify-center text-white text-[12px] font-extrabold shadow-sm flex-shrink-0">AG</div>
            <div>
              <div className="text-[10px] text-gray-400 leading-none mb-0.5">Alex Goh</div>
              <div className="text-[16px] font-bold text-era-navy leading-none">AI Insights</div>
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

        {/* Tabs */}
        <div className="flex px-4 gap-2 pb-3 overflow-x-auto hide-scrollbar">
          {AI_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                activeTab === tab ? 'bg-era-navy text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24 page-enter">
        {/* ---- ALERTS TAB ---- */}
        {activeTab === 'Alerts' && (
          <div className="px-4 pt-4 space-y-3">
            {/* Summary */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white">
              <div className="flex items-center gap-2 mb-2">
                <Zap size={15} className="text-yellow-300" />
                <span className="text-[12px] font-bold uppercase tracking-widest text-white/70">AI Summary</span>
              </div>
              <p className="text-[14px] leading-relaxed">
                Market conditions are <strong>favourable</strong> for D15 and D09. 3 client opportunities detected this week. 1 pricing alert requires attention.
              </p>
            </div>

            {visibleAlerts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-gray-500 font-medium">All caught up!</p>
                <p className="text-gray-400 text-[12px] mt-1">No new alerts right now.</p>
              </div>
            ) : visibleAlerts.map(alert => (
              <div key={alert.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: alert.color + '15' }}>
                    {alert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[14px] font-bold text-era-navy">{alert.title}</span>
                      <span className="text-[10px] text-gray-400">{alert.time}</span>
                    </div>
                    <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">{alert.desc}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-white"
                        style={{ background: alert.color }}
                      >
                        {alert.action}
                      </button>
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="px-3 py-1.5 rounded-lg text-[12px] font-semibold text-gray-400 bg-gray-100"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ---- FORECAST TAB ---- */}
        {activeTab === 'Forecast' && (
          <div className="px-4 pt-4 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-3">6-Month PSF Forecast</h3>
              <div className="space-y-3">
                {DISTRICT_FORECAST.map(d => (
                  <div key={d.district} className="flex items-center gap-3">
                    <div className="w-10 text-[12px] font-bold text-era-navy flex-shrink-0">{d.district}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${Math.abs(d.trend) * 8}%`,
                          background: d.up ? '#16A34A' : '#D41F30',
                          maxWidth: '80%',
                        }}
                      />
                    </div>
                    <div className={`flex items-center gap-0.5 w-14 text-right justify-end ${d.up ? 'text-green-500' : 'text-red-400'}`}>
                      {d.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      <span className="text-[12px] font-bold">{d.trend > 0 ? '+' : ''}{d.trend}%</span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/trends')}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-era-red/10 text-era-red text-[13px] font-semibold py-3 rounded-xl"
              >
                <BarChart2 size={15} />
                Explore Full Trend Charts
              </button>
            </div>

            {/* Market sentiment */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-3">Market Sentiment</h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[['Bullish', '68%', '#16A34A'], ['Neutral', '22%', '#9CA3AF'], ['Bearish', '10%', '#D41F30']].map(([label, val, color]) => (
                  <div key={label} className="rounded-xl p-3" style={{ background: color + '10' }}>
                    <div className="text-[20px] font-extrabold" style={{ color }}>{val}</div>
                    <div className="text-[10px] font-semibold text-gray-500 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-gray-400 mt-3 text-center">Based on 1,420 agent signals this week</p>
            </div>
          </div>
        )}

        {/* ---- PERFORMANCE TAB ---- */}
        {activeTab === 'Performance' && (
          <div className="px-4 pt-4 space-y-4">
            {/* Monthly deals chart */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest mb-3">Monthly Deals</h3>
              <div style={{ height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MONTHLY_VOLUME} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', fontSize: 12 }}
                      cursor={{ fill: '#F2F2F7' }}
                    />
                    <Bar dataKey="deals" fill="#D41F30" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Total GCI', value: '$284,000', sub: 'YTD 2026', icon: '💰' },
                { label: 'Conversion Rate', value: '68%', sub: 'Above avg (52%)', icon: '🎯' },
                { label: 'Avg Deal Size', value: '$2.1M', sub: 'vs $1.8M last yr', icon: '📈' },
                { label: 'Client Rating', value: '4.9 ⭐', sub: '42 reviews', icon: '🏆' },
              ].map(k => (
                <div key={k.label} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="text-2xl mb-2">{k.icon}</div>
                  <div className="text-[20px] font-extrabold text-era-navy">{k.value}</div>
                  <div className="text-[11px] font-semibold text-gray-500">{k.label}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{k.sub}</div>
                </div>
              ))}
            </div>

            {/* Ranking */}
            <div className="bg-gradient-to-r from-era-red to-[#B01827] rounded-2xl p-4 shadow-lg text-white">
              <div className="text-[11px] text-white/60 uppercase tracking-widest font-semibold">ERA Branch Ranking</div>
              <div className="text-[36px] font-extrabold mt-1">#4</div>
              <div className="text-[13px] text-white/80">Top 10% of agents in your branch</div>
              <div className="mt-3 bg-white/20 rounded-xl px-3 py-2 flex items-center justify-between">
                <span className="text-[12px]">Move up 1 rank with 2 more deals this month</span>
                <ArrowUpRight size={15} />
              </div>
            </div>
          </div>
        )}

        {/* ---- CLIENT MATCH TAB ---- */}
        {activeTab === 'Client Match' && (
          <div className="px-4 pt-4 space-y-3">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={14} className="text-blue-500" />
                <span className="text-[12px] font-bold text-blue-700">AI Client Matching</span>
              </div>
              <p className="text-[12px] text-blue-600">Based on your clients' preferences vs. current listings and market data.</p>
            </div>

            {CLIENT_MATCHES.map(c => (
              <div key={c.name} className="bg-white rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-era-red flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0">
                    {c.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] font-bold text-era-navy">{c.name}</span>
                      <div className="flex items-center gap-1">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: c.match >= 90 ? '#DCFCE7' : c.match >= 80 ? '#FFF7ED' : '#F3F4F6' }}>
                          <span className="text-[10px] font-bold" style={{ color: c.match >= 90 ? '#16A34A' : c.match >= 80 ? '#EA580C' : '#6B7280' }}>{c.match}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{c.budget} · {c.pref}</div>
                  </div>
                </div>

                {/* Match bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                    <span>Match Score</span>
                    <span className="font-semibold" style={{ color: c.match >= 90 ? '#16A34A' : c.match >= 80 ? '#EA580C' : '#6B7280' }}>{c.match}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${c.match}%`, background: c.match >= 90 ? '#16A34A' : c.match >= 80 ? '#EA580C' : '#9CA3AF' }} />
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-era-red text-white py-2.5 rounded-xl text-[12px] font-semibold">
                    <MessageSquare size={13} />
                    Contact
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 text-gray-600 py-2.5 rounded-xl text-[12px] font-semibold">
                    View Matches
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}
