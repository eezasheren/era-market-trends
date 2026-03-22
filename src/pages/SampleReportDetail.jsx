import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, BarChart2, TrendingUp, Share2 } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'
import BottomNav from '../components/BottomNav'
import { SAMPLE_REPORTS } from './SampleReports'

const CustomTooltip = ({ active, payload, label, metric }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 px-3 py-2 min-w-[130px]">
      <p className="text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wide">{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center justify-between gap-3 mb-0.5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-[12px] text-gray-600 font-medium">{p.name}</span>
          </div>
          <span className="text-[12px] font-bold" style={{ color: p.color }}>
            {metric === 'Volume' ? p.value : metric === 'Avg Price' ? `$${p.value}M` : `$${p.value.toLocaleString()}`}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function SampleReportDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const report = SAMPLE_REPORTS.find(r => r.id === id)

  if (!report) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F2F2F7]">
        <div className="text-center px-6">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-[18px] font-bold text-era-navy mb-2">Report not found</h2>
          <button onClick={() => navigate('/trends/sample-reports')} className="text-era-red font-semibold">
            ← Back to Sample Reports
          </button>
        </div>
      </div>
    )
  }

  // Build recharts data
  const chartData = report.data.years.map((year, i) => {
    const entry = { year }
    report.data.series.forEach(s => { entry[s.id] = s.values[i] })
    return entry
  })

  // Format Y axis
  const formatY = (v) => {
    if (report.metric === 'Volume') return v
    if (report.metric === 'Avg Price') return `$${v}M`
    return `$${(v / 1000).toFixed(1)}k`
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F2F7]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/trends/sample-reports')}
              className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
            >
              <ArrowLeft size={18} className="text-gray-600" />
            </button>
            <div>
              <p className="text-[10px] font-bold text-era-red tracking-widest uppercase">Sample Report</p>
              <h1 className="text-[16px] font-extrabold text-era-navy leading-tight">{report.title}</h1>
            </div>
          </div>
          <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
            <Share2 size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-32">

        {/* Metadata row */}
        <div className="px-4 pt-4 flex items-center gap-2 flex-wrap">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${report.categoryColor}`}>
            {report.category}
          </span>
          <span className="text-[11px] text-gray-400">·</span>
          <span className="text-[11px] text-gray-500 font-medium">{report.metric}</span>
          <span className="text-[11px] text-gray-400">·</span>
          <span className="text-[11px] text-gray-500 font-medium">{report.period}</span>
          <span className="text-[11px] text-gray-400">·</span>
          <span className="text-[11px] text-gray-500 font-medium">{report.districts.length} districts</span>
        </div>

        {/* Description */}
        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-sm">
          <p className="text-[13px] text-gray-600 leading-relaxed">{report.description}</p>
        </div>

        {/* Key highlights */}
        <div className="mx-4 mt-3">
          <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Key Highlights</h2>
          <div className="grid grid-cols-2 gap-2">
            {report.highlights.map((h, i) => (
              <div key={i} className="bg-white rounded-xl p-3 shadow-sm">
                <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide mb-1">{h.label}</p>
                <p className="text-[15px] font-extrabold text-era-navy">{h.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <div className="mx-4 mt-3 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-[15px] font-extrabold text-era-navy">District Comparison</h2>
              <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {report.metric}
              </span>
            </div>
            <p className="text-[11px] text-gray-400">Historical performance · {report.period}</p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 px-4 mb-3">
            {report.data.series.map((s, i) => (
              <div key={s.id} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: report.colors[i] }} />
                <span className="text-[12px] text-gray-600 font-medium">{s.id}</span>
              </div>
            ))}
          </div>

          <div className="px-2 pb-4">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
                <XAxis
                  dataKey="year"
                  tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={formatY}
                  tick={{ fontSize: 10, fill: '#9CA3AF' }}
                  axisLine={false}
                  tickLine={false}
                  width={42}
                />
                <Tooltip content={<CustomTooltip metric={report.metric} />} />
                {report.data.series.map((s, i) => (
                  <Line
                    key={s.id}
                    type="monotone"
                    dataKey={s.id}
                    stroke={report.colors[i]}
                    strokeWidth={i === 0 ? 2.5 : 2}
                    dot={{ r: 3, fill: report.colors[i] }}
                    activeDot={{ r: 5 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insight callout */}
        <div className="mx-4 mt-3 bg-green-50 border border-green-100 rounded-2xl p-4 flex items-start gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <TrendingUp size={16} className="text-green-600" />
          </div>
          <div>
            <p className="text-[12px] font-bold text-green-700 mb-0.5">Key Insight</p>
            <p className="text-[13px] text-green-800 leading-relaxed">{report.insight}</p>
          </div>
        </div>

        {/* Sample data disclaimer */}
        <div className="mx-4 mt-3 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-2">
          <span className="text-amber-500 text-[14px] flex-shrink-0 mt-0.5">⚠️</span>
          <p className="text-[11px] text-amber-700 leading-relaxed">
            This is a <strong>sample report</strong> for demonstration purposes. Generate your own report to access real-time URA transaction data.
          </p>
        </div>
      </main>

      {/* Sticky CTA */}
      <div className="fixed bottom-16 left-0 right-0 px-4 pb-3 bg-gradient-to-t from-[#F2F2F7] to-transparent pt-4 z-10">
        <button
          onClick={() => navigate('/trends/filter')}
          className="w-full bg-era-red text-white font-bold text-[15px] py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-era-red/25 active:scale-[0.98] transition-transform"
        >
          <BarChart2 size={18} />
          Use This Template
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
