import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Search, ChevronLeft, Tag, Key } from 'lucide-react'
import { useTrends, DEFAULT_FILTERS } from '../context/TrendsContext'
import { DISTRICTS, PROPERTY_TYPES_SALE, PROPERTY_TYPES_RENT } from '../data/mockData'

const PROPERTY_TYPE_ICONS = {
  HDB: '🏠', Condo: '🏢', Landed: '🏡', Commercial: '🏬', Industrial: '🏭'
}

export default function FilterScreen() {
  const navigate = useNavigate()
  const { filters, applyFilters } = useTrends()
  const [draft, setDraft] = useState({ ...filters })
  const [districtSearch, setDistrictSearch] = useState('')

  const propertyTypes = draft.marketType === 'Rent' ? PROPERTY_TYPES_RENT : PROPERTY_TYPES_SALE

  useEffect(() => {
    // Reset property type if not valid for new market type
    if (draft.propertyType && !propertyTypes.includes(draft.propertyType)) {
      setDraft(d => ({ ...d, propertyType: null }))
    }
  }, [draft.marketType])

  const filteredDistricts = DISTRICTS.filter(d =>
    districtSearch === '' ||
    d.id.toLowerCase().includes(districtSearch.toLowerCase()) ||
    d.name.toLowerCase().includes(districtSearch.toLowerCase())
  )

  function toggleDistrict(id) {
    setDraft(d => ({
      ...d,
      districts: d.districts.includes(id)
        ? d.districts.filter(x => x !== id)
        : [...d.districts, id]
    }))
  }

  function selectAll() {
    setDraft(d => ({ ...d, districts: DISTRICTS.map(x => x.id) }))
  }

  function handleApply() {
    applyFilters(draft)
    navigate('/trends/results')
  }

  function handleReset() {
    setDraft({ ...DEFAULT_FILTERS })
  }

  // Summary tags at top
  const summaryParts = [
    draft.marketType,
    draft.propertyType,
    draft.districts.length > 0 && `${draft.districts.length} District${draft.districts.length > 1 ? 's' : ''}`,
    (draft.yearMin || draft.yearMax) && `${draft.yearMin}–${draft.yearMax}`,
  ].filter(Boolean)

  const canApply = !!draft.marketType

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F2F7]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate(-1)} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100">
            <X size={20} className="text-gray-600" />
          </button>
          <span className="text-[17px] font-bold text-era-navy">Filters</span>
          <button onClick={handleReset} className="text-era-red font-semibold text-[14px] px-2">
            RESET
          </button>
        </div>

        {/* Summary chips */}
        {summaryParts.length > 0 && (
          <div className="px-4 pb-3 flex gap-2 overflow-x-auto hide-scrollbar">
            {summaryParts.map((p, i) => (
              <span key={i} className="flex-shrink-0 bg-gray-100 text-gray-600 text-[11px] font-medium px-2.5 py-1 rounded-full">
                {p}
              </span>
            ))}
          </div>
        )}
      </header>

      <main className="flex-1 overflow-y-auto pb-32 page-enter">
        {/* MARKET TYPE */}
        <Section title="Market Type" required>
          <div className="grid grid-cols-2 gap-3">
            {['Sale', 'Rent'].map(type => (
              <button
                key={type}
                onClick={() => setDraft(d => ({ ...d, marketType: type }))}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  draft.marketType === type
                    ? 'border-era-red bg-era-red/5'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {draft.marketType === type && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-era-red rounded-full flex items-center justify-center">
                    <span className="text-white text-[10px]">✓</span>
                  </div>
                )}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  draft.marketType === type ? 'bg-era-red/10' : 'bg-gray-100'
                }`}>
                  {type === 'Sale' ? <Tag size={18} className={draft.marketType === type ? 'text-era-red' : 'text-gray-400'} /> :
                                     <Key size={18} className={draft.marketType === type ? 'text-era-red' : 'text-gray-400'} />}
                </div>
                <span className={`font-semibold text-[14px] ${draft.marketType === type ? 'text-era-red' : 'text-gray-700'}`}>
                  {type}
                </span>
              </button>
            ))}
          </div>
        </Section>

        {/* DISTRICTS */}
        <Section title="Districts (D1–D28)" action={
          <button onClick={selectAll} className="text-era-red text-[12px] font-semibold">Select All</button>
        }>
          {/* Search */}
          <div className="relative mb-3">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={districtSearch}
              onChange={e => setDistrictSearch(e.target.value)}
              placeholder="Search (e.g. Orchard, D09)"
              className="w-full pl-9 pr-3 py-2.5 bg-gray-100 rounded-xl text-[13px] outline-none"
            />
          </div>

          {/* District chips */}
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto hide-scrollbar">
            {filteredDistricts.map(d => (
              <button
                key={d.id}
                onClick={() => toggleDistrict(d.id)}
                className={`px-3 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                  draft.districts.includes(d.id)
                    ? 'bg-era-red text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {d.id}
              </button>
            ))}
          </div>
          {draft.districts.length > 0 && (
            <p className="text-[11px] text-gray-400 mt-2">{draft.districts.length} selected</p>
          )}
        </Section>

        {/* PROPERTY TYPE */}
        <Section title="Property Type" disabled={!draft.marketType}>
          {!draft.marketType && (
            <p className="text-[12px] text-gray-400 mb-3 italic">Select a market type first</p>
          )}
          <div className="grid grid-cols-2 gap-2">
            {propertyTypes.map(type => (
              <button
                key={type}
                disabled={!draft.marketType}
                onClick={() => setDraft(d => ({ ...d, propertyType: type }))}
                className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all ${
                  draft.propertyType === type
                    ? 'border-era-red bg-era-red/5'
                    : 'border-gray-200 bg-white'
                } disabled:opacity-40`}
              >
                <span className="text-lg">{PROPERTY_TYPE_ICONS[type]}</span>
                <span className={`text-[13px] font-semibold ${draft.propertyType === type ? 'text-era-red' : 'text-gray-700'}`}>
                  {type}
                </span>
              </button>
            ))}
          </div>
        </Section>

        {/* SIZE RANGE */}
        <Section title="Size Range (sqft)">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-gray-400 uppercase tracking-wide font-semibold">Min Size</label>
              <input
                type="number"
                value={draft.sizeMin}
                onChange={e => setDraft(d => ({ ...d, sizeMin: e.target.value }))}
                placeholder="0"
                className="w-full mt-1 p-3 bg-gray-100 rounded-xl text-[14px] font-semibold text-gray-700 outline-none"
              />
            </div>
            <div>
              <label className="text-[11px] text-gray-400 uppercase tracking-wide font-semibold">Max Size</label>
              <input
                type="number"
                value={draft.sizeMax}
                onChange={e => setDraft(d => ({ ...d, sizeMax: e.target.value }))}
                placeholder="Any"
                className="w-full mt-1 p-3 bg-gray-100 rounded-xl text-[14px] font-semibold text-gray-700 outline-none"
              />
            </div>
          </div>
        </Section>

        {/* PRICE RANGE */}
        <Section title="Price Range ($)">
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[13px]">$</span>
              <input
                type="number"
                value={draft.priceMin}
                onChange={e => setDraft(d => ({ ...d, priceMin: e.target.value }))}
                placeholder="Min Price"
                className="w-full pl-7 pr-3 py-3 bg-gray-100 rounded-xl text-[13px] font-semibold text-gray-700 outline-none"
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-[13px]">$</span>
              <input
                type="number"
                value={draft.priceMax}
                onChange={e => setDraft(d => ({ ...d, priceMax: e.target.value }))}
                placeholder="Max Price"
                className="w-full pl-7 pr-3 py-3 bg-gray-100 rounded-xl text-[13px] font-semibold text-gray-700 outline-none"
              />
            </div>
          </div>
        </Section>

        {/* YEAR RANGE */}
        <Section title="Year Built" action={
          <span className="text-era-red font-semibold text-[12px]">{draft.yearMin} – {draft.yearMax}</span>
        }>
          <div className="px-1">
            <div className="relative h-6 flex items-center">
              <div className="absolute left-0 right-0 h-1 bg-gray-200 rounded-full" />
              <div
                className="absolute h-1 bg-era-red rounded-full"
                style={{
                  left: `${((draft.yearMin - 2000) / 24) * 100}%`,
                  right: `${100 - ((draft.yearMax - 2000) / 24) * 100}%`
                }}
              />
              <input
                type="range" min="2000" max="2024"
                value={draft.yearMin}
                onChange={e => setDraft(d => ({ ...d, yearMin: Math.min(+e.target.value, d.yearMax - 1) }))}
                className="absolute w-full appearance-none bg-transparent"
              />
              <input
                type="range" min="2000" max="2024"
                value={draft.yearMax}
                onChange={e => setDraft(d => ({ ...d, yearMax: Math.max(+e.target.value, d.yearMin + 1) }))}
                className="absolute w-full appearance-none bg-transparent"
              />
            </div>
            <div className="flex justify-between mt-3">
              {['2000', '2010', '2020', '2024'].map(y => (
                <span key={y} className="text-[11px] text-gray-400">{y}</span>
              ))}
            </div>
          </div>
        </Section>
      </main>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 px-4 pt-3 pb-8 z-50">
        <button
          onClick={handleApply}
          disabled={!canApply}
          className="w-full bg-era-red text-white font-bold text-[16px] py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-era-red/25 disabled:opacity-40 active:scale-[0.98] transition-all"
        >
          Apply Filters
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/>
          </svg>
        </button>
        {!canApply && (
          <p className="text-center text-[12px] text-gray-400 mt-2">Select a market type to continue</p>
        )}
      </div>
    </div>
  )
}

function Section({ title, children, required, disabled, action }) {
  return (
    <div className="px-4 mt-4">
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            {required && <div className="w-1.5 h-1.5 bg-era-red rounded-full" />}
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">{title}</span>
          </div>
          {action}
        </div>
        <div className={disabled ? 'opacity-50 pointer-events-none' : ''}>
          {children}
        </div>
      </div>
    </div>
  )
}
