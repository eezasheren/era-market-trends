import { Routes, Route, Navigate } from 'react-router-dom'
import { TrendsProvider } from './context/TrendsContext'
import TrendsEmpty from './pages/TrendsEmpty'
import FilterScreen from './pages/FilterScreen'
import ResultsScreen from './pages/ResultsScreen'
import ChartScreen from './pages/ChartScreen'
import Dashboard from './pages/Dashboard'
import Listings from './pages/Listings'
import AIInsights from './pages/AIInsights'
import Profile from './pages/Profile'

export default function App() {
  return (
    <TrendsProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/trends" element={<TrendsEmpty />} />
        <Route path="/trends/filter" element={<FilterScreen />} />
        <Route path="/trends/results" element={<ResultsScreen />} />
        <Route path="/trends/chart" element={<ChartScreen />} />
        <Route path="/insights" element={<AIInsights />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </TrendsProvider>
  )
}
