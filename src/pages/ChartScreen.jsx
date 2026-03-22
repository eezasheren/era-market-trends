import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Trash2, X, TrendingUp, TrendingDown, Download, FileImage, FileText, Loader } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { useTrends } from '../context/TrendsContext'
import { DISTRICTS, DISTRICT_COLORS, getHistoricalData, getDistrictStats } from '../data/mockData'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'

const METRICS = [
  { key: 'avgPsf',   label: 'Avg PSF',   format: v => `$${v.toLocaleString()}` },
  { key: 'avgPrice', label: 'Avg Price',  format: v => `$${v.toFixed(1)}M` },
  { key: 'volume',   label: 'Volume',     format: v => `${v} deals` },
]

function CustomTooltip({ active, payload, label, metric }) {
  if (!active || !payload?.length) return null
  const fmt = METRICS.find(m => m.key === metric)?.format ?? (v => v)
  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-3 min-w-[140px]">
      <p className="text-[11px] font-bold text-gray-400 uppercase mb-2">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center justify-between gap-3 mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: entry.color }} />
            <span className="text-[11px] text-gray-500">{entry.dataKey}</span>
          </div>
          <span className="text-[12px] font-bold text-era-navy">{fmt(entry.value)}</span>
        </div>
      ))}
    </div>
  )
}

export default function ChartScreen() {
  const navigate = useNavigate()
  const { selectedTrends, removeTrend, clearAllTrends, activeMetric, setActiveMetric, filters } = useTrends()
  const [showDeleteAll, setShowDeleteAll] = useState(false)
  const [showExport, setShowExport] = useState(false)
  const [exporting, setExporting] = useState(null) // 'image' | 'pdf' | null
  const chartRef = useRef(null)

  const chartData = getHistoricalData(selectedTrends, activeMetric)
  const metric = METRICS.find(m => m.key === activeMetric)

  const filterLabel = [filters.marketType, filters.propertyType, 'Last 12m'].filter(Boolean).join(' • ')

  function handleDeleteAll() {
    clearAllTrends()
    navigate('/trends')
  }

  async function captureChart() {
    const html2canvas = (await import('html2canvas')).default
    // Hide export button before capture
    const exportBtn = chartRef.current.querySelector('[data-export-btn]')
    if (exportBtn) exportBtn.style.visibility = 'hidden'
    await new Promise(r => setTimeout(r, 50)) // let DOM settle
    const canvas = await html2canvas(chartRef.current, {
      backgroundColor: '#ffffff',
      scale: 3,
      useCORS: true,
      allowTaint: true,
      logging: false,
    })
    if (exportBtn) exportBtn.style.visibility = ''
    return canvas
  }

  async function exportAsImage() {
    setExporting('image')
    setShowExport(false)
    try {
      const canvas = await captureChart()
      const link = document.createElement('a')
      link.download = `ERA_TrendChart_${selectedTrends.join('_')}_${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (e) {
      console.error(e)
    }
    setExporting(null)
  }

  async function exportAsPDF() {
    setExporting('pdf')
    setShowExport(false)
    try {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pageW = pdf.internal.pageSize.getWidth()
      const pageH = pdf.internal.pageSize.getHeight()
      const margin = 15

      // Header
      pdf.setFillColor(212, 31, 48)
      pdf.rect(0, 0, pageW, 22, 'F')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(14)
      pdf.setFont('helvetica', 'bold')
      pdf.text('ERA Realty Network', margin, 10)
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'normal')
      pdf.text('Market Trend Report', margin, 17)
      const dateStr = new Date().toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })
      pdf.text(`Generated: ${dateStr}`, pageW - margin, 17, { align: 'right' })

      // Title
      pdf.setTextColor(26, 26, 46)
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('District Comparison Chart', margin, 34)

      // Meta info
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'normal')
      pdf.setTextColor(107, 114, 128)
      const metaLabel = [filters.marketType, filters.propertyType, '2020–2024'].filter(Boolean).join(' · ')
      pdf.text(`Filters: ${metaLabel || 'All Markets · 2020–2024'}`, margin, 41)
      pdf.text(`Districts: ${selectedTrends.join(', ')} · Metric: ${metric?.label}`, margin, 46)

      // Chart image
      const imgW = pageW - margin * 2
      const imgH = (canvas.height / canvas.width) * imgW
      pdf.addImage(imgData, 'PNG', margin, 52, imgW, imgH)

      // District stats table
      let yPos = 52 + imgH + 10
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(26, 26, 46)
      pdf.text('District Statistics', margin, yPos)
      yPos += 7

      // Table header
      pdf.setFillColor(242, 242, 247)
      pdf.rect(margin, yPos - 4, pageW - margin * 2, 8, 'F')
      pdf.setFontSize(8)
      pdf.setTextColor(107, 114, 128)
      const cols = [margin, margin + 20, margin + 55, margin + 90, margin + 120, margin + 150]
      const headers = ['District', 'Avg PSF', 'Min PSF', 'Max PSF', 'Avg Price', 'Volume']
      headers.forEach((h, i) => pdf.text(h, cols[i], yPos))
      yPos += 7

      // Table rows
      pdf.setTextColor(26, 26, 46)
      selectedTrends.forEach((id, i) => {
        const s = getDistrictStats(id)
        if (i % 2 === 0) {
          pdf.setFillColor(249, 249, 252)
          pdf.rect(margin, yPos - 4, pageW - margin * 2, 7, 'F')
        }
        pdf.setFont('helvetica', 'bold')
        pdf.setTextColor(212, 31, 48)
        pdf.text(id, cols[0], yPos)
        pdf.setFont('helvetica', 'normal')
        pdf.setTextColor(26, 26, 46)
        pdf.text(`$${s.avgPsf.toLocaleString()}`, cols[1], yPos)
        pdf.text(`$${s.minPsf.toLocaleString()}`, cols[2], yPos)
        pdf.text(`$${s.maxPsf.toLocaleString()}`, cols[3], yPos)
        pdf.text(`$${s.avgPrice.toFixed(1)}M`, cols[4], yPos)
        pdf.text(`${s.volume}`, cols[5], yPos)
        yPos += 7
      })

      // Footer
      pdf.setFontSize(7)
      pdf.setTextColor(156, 163, 175)
      pdf.text('ERA Realty Network Pte Ltd · CEA Licence: L3002382K · era.com.sg', pageW / 2, pageH - 8, { align: 'center' })

      pdf.save(`ERA_TrendReport_${selectedTrends.join('_')}_${Date.now()}.pdf`)
    } catch (e) {
      console.error(e)
    }
    setExporting(null)
  }

  if (selectedTrends.length === 0) {
    navigate('/trends')
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F2F7]">
      <TopBar />

      <main className="flex-1 overflow-y-auto pb-24 page-enter">
        {/* Filter summary */}
        <div className="bg-white border-b border-gray-100 px-4 py-2.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-gray-500">{filterLabel || 'Resale · Condominium · Last 12m'}</p>
            </div>
            <button onClick={() => navigate('/trends/filter')} className="text-era-red text-[12px] font-semibold">
              ✏️ Edit
            </button>
          </div>
        </div>

        {/* Chart card */}
        <div ref={chartRef} className="mx-4 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Card header */}
          <div className="px-4 pt-4 pb-2 flex items-start justify-between">
            <div>
              <h2 className="text-[20px] font-extrabold text-era-navy">District Comparison</h2>
              <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold mt-0.5">
                Historical Performance (2020 – 2024)
              </p>
            </div>

            {/* Export button */}
            <div className="relative" data-export-btn>
              <button
                onClick={() => setShowExport(p => !p)}
                disabled={!!exporting}
                className="flex items-center gap-1.5 bg-era-red/10 text-era-red text-[12px] font-bold px-3 py-2 rounded-xl active:scale-95 transition-transform disabled:opacity-60"
              >
                {exporting ? <Loader size={13} className="animate-spin" /> : <Download size={13} />}
                {exporting === 'image' ? 'Saving…' : exporting === 'pdf' ? 'Building…' : 'Export'}
              </button>

              {showExport && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden min-w-[170px]">
                  <button
                    onClick={exportAsImage}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileImage size={15} className="text-blue-500" />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-era-navy">Save as PNG</div>
                      <div className="text-[10px] text-gray-400">Chart image</div>
                    </div>
                  </button>
                  <button
                    onClick={exportAsPDF}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText size={15} className="text-era-red" />
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-era-navy">Export PDF</div>
                      <div className="text-[10px] text-gray-400">Full report with stats</div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Metric tabs */}
          <div className="flex gap-1 px-4 mb-3">
            {METRICS.map(m => (
              <button
                key={m.key}
                onClick={() => setActiveMetric(m.key)}
                className={`flex-1 py-2 rounded-xl text-[12px] font-bold transition-all ${
                  activeMetric === m.key
                    ? 'bg-era-red text-white shadow-sm'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 px-4 mb-3">
            {selectedTrends.map((id, i) => {
              const d = DISTRICTS.find(x => x.id === id)
              return (
                <div key={id} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: DISTRICT_COLORS[i % DISTRICT_COLORS.length] }} />
                  <span className="text-[11px] text-gray-600">{id} ({d?.region?.split(' ')[0]})</span>
                </div>
              )
            })}
          </div>

          {/* Chart */}
          <div className="px-1 pb-4" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => activeMetric === 'avgPrice' ? `$${v}M` : activeMetric === 'volume' ? v : `$${(v/1000).toFixed(1)}k`}
                  width={48}
                />
                <Tooltip content={<CustomTooltip metric={activeMetric} />} />
                {selectedTrends.map((id, i) => (
                  <Line
                    key={id}
                    type="monotone"
                    dataKey={id}
                    stroke={DISTRICT_COLORS[i % DISTRICT_COLORS.length]}
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: DISTRICT_COLORS[i % DISTRICT_COLORS.length], strokeWidth: 0 }}
                    activeDot={{ r: 5, strokeWidth: 2, stroke: 'white' }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats summary strip */}
        <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
          {selectedTrends.slice(0, 3).map((id, i) => {
            const stats = getDistrictStats(id)
            const isUp = stats.yoy > 0
            return (
              <div key={id} className="bg-white rounded-xl p-3 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: DISTRICT_COLORS[i] }} />
                  <span className={`text-[10px] font-bold flex items-center gap-0.5 ${isUp ? 'text-green-500' : 'text-red-400'}`}>
                    {isUp ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                    {Math.abs(stats.yoy)}%
                  </span>
                </div>
                <div className="text-[11px] font-bold text-gray-700">{id}</div>
                <div className="text-[10px] text-gray-400">YoY PSF</div>
              </div>
            )
          })}
        </div>

        {/* Managing Trends */}
        <div className="mx-4 mt-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Managing Trends</span>
            {selectedTrends.length < 5 && (
              <button
                onClick={() => navigate('/trends/results')}
                className="flex items-center gap-1 bg-era-red/10 text-era-red text-[12px] font-semibold px-3 py-1.5 rounded-full"
              >
                <Plus size={12} />
                Add More Trends
              </button>
            )}
          </div>

          {/* Trend chips */}
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedTrends.map((id, i) => (
              <div
                key={id}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-white text-[13px] font-semibold"
                style={{ background: DISTRICT_COLORS[i % DISTRICT_COLORS.length] }}
              >
                {id}
                <button
                  onClick={() => removeTrend(id)}
                  className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center hover:bg-white/50 transition-colors"
                >
                  <X size={9} className="text-white" />
                </button>
              </div>
            ))}
          </div>

          {/* Delete all */}
          {!showDeleteAll ? (
            <button
              onClick={() => setShowDeleteAll(true)}
              className="w-full border-2 border-dashed border-gray-300 rounded-2xl py-3.5 text-gray-500 text-[14px] font-semibold flex items-center justify-center gap-2 hover:border-era-red/40 hover:text-era-red transition-colors"
            >
              <Trash2 size={15} />
              Delete All Comparisons
            </button>
          ) : (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <p className="text-[13px] text-red-700 font-semibold text-center mb-3">
                Remove all {selectedTrends.length} trends and start over?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDeleteAll(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-300 text-gray-600 text-[13px] font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAll}
                  className="flex-1 py-2.5 rounded-xl bg-era-red text-white text-[13px] font-bold"
                >
                  Delete All
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
