import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronDown, SlidersHorizontal, BarChart2, X } from 'lucide-react'
import { useTrends } from '../context/TrendsContext'
import { DISTRICTS, getDistrictStats } from '../data/mockData'
import BottomNav from '../components/BottomNav'
import TopBar from '../components/TopBar'

const SORT_OPTIONS = [
  { value: 'avgPsf', label: 'Avg PSF' },
  { value: 'volume', label: 'Volume' },
  { value: 'avgPrice', label: 'Avg Price' },
  { value: 'minPsf', label: 'Min PSF' },
  { value: 'maxPsf', label: 'Max PSF' },
]

export default function ResultsScreen() {
  const navigate = useNavigate()
  const { filters, selectedTrends, toggleTrend, isLoading, sortBy, setSortBy } = useTrends()
  const [showSort, setShowSort] = useState(false)
  const [toast, setToast] = useState('')

  const filterLabel = [filters.marketType, filters.propertyType, 'Last 12m'].filter(Boolean).join(' • ')

  // Compute stats for each filtered district (or all if none selected)
  const districtPool = filters.districts.length > 0
    ? DISTRICTS.filter(d => filters.districts.includes(d.id))
    : DISTRICTS

  const rows = districtPool.map(d => ({ ...d, ...getDistrictStats(d.id) }))

  const sorted = [...rows].sort((a, b) => {
    if (sortBy === 'volume') return b.volume - a.volume
    if (sortBy === 'avgPrice') return b.avgPrice - a.avgPrice
    if (sortBy === 'minPsf') return b.minPsf - a.minPsf
    if (sortBy === 'maxPsf') return b.maxPsf - a.maxPsf
    return b.avgPsf - a.avgPsf // default avgPsf
  })

  function handleToggle(id) {
    if (!selectedTrends.includes(id) && selectedTrends.length >= 5) {
      setToast('Max 5 trends. Remove one first.')
      setTimeout(() => setToast(''), 2500)
      return
    }
    toggleTrend(id)
  }

  function handleGenerate() {
    navigate('/trends/chart')
  }

  const currentSort = SORT_OPTIONS.find(o => o.value === sortBy)

  if (isLoading) return <LoadingState />

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F2F7]">
      <TopBar />

      {/* Filter summary bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-2.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-era-red uppercase tracking-widest">Active Filters</span>
            <p className="text-[12px] text-gray-600 mt-0.5">{filterLabel || 'All markets'}</p>
          </div>
          <button
            onClick={() => navigate('/trends/filter')}
            className="flex items-center gap-1 text-era-red text-[12px] font-semibold"
          >
            <SlidersHorizontal size={13} />
            Edit
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-36 page-enter">
        {/* Header + sort */}
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div>
            <h2 className="text-[20px] font-extrabold text-era-navy">Search Results</h2>
            <p className="text-[12px] text-gray-400">{sorted.length} districts found</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-3 py-2 text-[12px] font-semibold text-gray-700 shadow-sm"
            >
              Sort: {currentSort?.label}
              <ChevronDown size={13} className={`transition-transform ${showSort ? 'rotate-180' : ''}`} />
            </button>
            {showSort && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-30 min-w-[140px] overflow-hidden">
                {SORT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setShowSort(false) }}
                    className={`w-full text-left px-4 py-2.5 text-[13px] ${
                      sortBy === opt.value ? 'bg-era-red/5 text-era-red font-semibold' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* District cards */}
        <div className="px-4 space-y-3">
          {sorted.map(d => {
            const isSelected = selectedTrends.includes(d.id)
            return (
              <button
                key={d.id}
                onClick={() => handleToggle(d.id)}
                className={`w-full text-left bg-white rounded-2xl border-2 shadow-sm transition-all active:scale-[0.99] overflow-hidden ${
                  isSelected ? 'border-era-red' : 'border-transparent'
                }`}
              >
                {/* Thumbnail strip */}
                <div className="relative h-24 w-full bg-gray-200">
                  <img
                    src={d.img}
                    alt={d.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

                  {/* Checkbox */}
                  <div className={`absolute top-3 left-3 w-6 h-6 rounded-md flex items-center justify-center transition-all ${
                    isSelected ? 'bg-era-red' : 'bg-white/80 border-2 border-white'
                  }`}>
                    {isSelected && <span className="text-white text-[11px] font-bold">✓</span>}
                  </div>

                  {/* District ID badge */}
                  <div className="absolute top-3 right-3 bg-white/95 rounded-lg px-2 py-1">
                    <span className="text-[12px] font-extrabold text-era-navy">{d.id}</span>
                  </div>

                  {/* Name overlay */}
                  <div className="absolute bottom-2 left-3">
                    <div className="text-white font-bold text-[14px] leading-tight drop-shadow">{d.name}</div>
                    <div className="text-white/70 text-[10px]">{d.region}</div>
                  </div>

                  {/* Volume pill */}
                  <div className="absolute bottom-2 right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                    <span className="text-white text-[10px] font-semibold">{d.volume} deals</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="p-3 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">PSF Trend</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[11px] text-gray-400">${d.minPsf.toLocaleString()}</span>
                      <span className="text-[17px] font-extrabold text-era-red">${d.avgPsf.toLocaleString()}</span>
                      <span className="text-[11px] text-gray-400">${d.maxPsf.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[9px] text-gray-300">Min</span>
                      <span className="text-[9px] font-bold text-era-red mx-1">AVG</span>
                      <span className="text-[9px] text-gray-300">Max</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Price Trend</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[11px] text-gray-400">${d.minPrice.toFixed(1)}M</span>
                      <span className="text-[17px] font-extrabold text-gray-700">${d.avgPrice.toFixed(1)}M</span>
                      <span className="text-[11px] text-gray-400">${d.maxPrice.toFixed(1)}M</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[9px] text-gray-300">Min</span>
                      <span className="text-[9px] font-bold text-gray-500 mx-1">AVG</span>
                      <span className="text-[9px] text-gray-300">Max</span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </main>

      {/* Selection bar + CTA */}
      {selectedTrends.length > 0 && (
        <div className="fixed bottom-[68px] left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4 z-40">
          {/* Counter pill */}
          <div className="flex justify-center mb-3">
            <div className="bg-era-navy text-white rounded-full px-5 py-2 flex items-center gap-3 shadow-lg">
              <span className="w-2 h-2 bg-era-red rounded-full" />
              <span className="text-[13px] font-semibold">{selectedTrends.length} of 5 selected</span>
              <button onClick={() => { /* clear handled in context */ }} className="text-gray-400 text-[12px] font-medium border-l border-gray-600 pl-3">
                Clear
              </button>
            </div>
          </div>

          {/* Generate CTA */}
          <button
            onClick={handleGenerate}
            className="w-full bg-era-red text-white font-bold text-[16px] py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-era-red/30 active:scale-[0.98] transition-transform"
          >
            <BarChart2 size={20} />
            Generate Comparison Chart
          </button>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-era-navy text-white text-[13px] font-medium px-4 py-2.5 rounded-xl shadow-lg z-50 whitespace-nowrap">
          {toast}
        </div>
      )}

      <BottomNav />
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F2F2F7]">
      <TopBar />
      <main className="flex-1 px-4 pt-4 space-y-3">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white rounded-2xl p-4 h-28 shimmer" />
        ))}
      </main>
      <BottomNav />
    </div>
  )
}
