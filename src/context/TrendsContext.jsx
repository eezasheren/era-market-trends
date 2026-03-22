import { createContext, useContext, useState } from 'react'

const TrendsContext = createContext(null)

export const DEFAULT_FILTERS = {
  marketType: null,       // 'Sale' | 'Rent'
  districts: [],          // string[]
  propertyType: null,     // string
  sizeMin: '',
  sizeMax: '',
  priceMin: '',
  priceMax: '',
  yearMin: 2018,
  yearMax: 2024,
}

export function TrendsProvider({ children }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS)
  const [draftFilters, setDraftFilters] = useState(DEFAULT_FILTERS)
  const [selectedTrends, setSelectedTrends] = useState([]) // district IDs, max 5
  const [activeMetric, setActiveMetric] = useState('avgPsf')
  const [sortBy, setSortBy] = useState('avgPsf')
  const [isLoading, setIsLoading] = useState(false)

  function applyFilters(f) {
    setIsLoading(true)
    setFilters(f)
    setTimeout(() => setIsLoading(false), 1200)
  }

  function toggleTrend(id) {
    setSelectedTrends(prev => {
      if (prev.includes(id)) return prev.filter(d => d !== id)
      if (prev.length >= 5) return prev
      return [...prev, id]
    })
  }

  function removeTrend(id) {
    setSelectedTrends(prev => prev.filter(d => d !== id))
  }

  function clearAllTrends() {
    setSelectedTrends([])
  }

  function resetFilters() {
    setFilters(DEFAULT_FILTERS)
    setDraftFilters(DEFAULT_FILTERS)
    setSelectedTrends([])
  }

  return (
    <TrendsContext.Provider value={{
      filters, draftFilters, setDraftFilters,
      selectedTrends, activeMetric, setActiveMetric,
      sortBy, setSortBy, isLoading,
      applyFilters, toggleTrend, removeTrend, clearAllTrends, resetFilters,
    }}>
      {children}
    </TrendsContext.Provider>
  )
}

export function useTrends() {
  const ctx = useContext(TrendsContext)
  if (!ctx) throw new Error('useTrends must be inside TrendsProvider')
  return ctx
}
