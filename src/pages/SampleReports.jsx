import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react'
import BottomNav from '../components/BottomNav'

export const SAMPLE_REPORTS = [
  {
    id: 'ccr-condo',
    category: 'RESALE',
    categoryColor: 'bg-blue-50 text-blue-600',
    title: 'Core Central Condo Trends',
    subtitle: 'Premium district performance 2020–2024',
    districts: ['D01', 'D09', 'D10'],
    colors: ['#D41F30', '#1E40AF', '#374151'],
    metric: 'Avg PSF',
    period: '2020 – 2024',
    insight: '+12.4% YoY growth in D01',
    insightType: 'up',
    highlights: [
      { label: 'Top District', value: 'D01 Core Central' },
      { label: 'Avg PSF (2024)', value: '$3,412' },
      { label: 'YoY Growth', value: '+12.4%' },
      { label: 'Total Deals', value: '318' },
    ],
    data: {
      years: ['2020', '2021', '2022', '2023', '2024'],
      series: [
        { id: 'D01', values: [2650, 2780, 3100, 3280, 3412] },
        { id: 'D09', values: [2450, 2520, 2710, 2890, 3050] },
        { id: 'D10', values: [2300, 2380, 2550, 2680, 2820] },
      ],
    },
    description: 'This report compares Core Central Region (CCR) condo resale prices across three prime districts from 2020 to 2024. D01 has consistently outperformed with the steepest growth trajectory.',
  },
  {
    id: 'ocr-hdb',
    category: 'RESALE',
    categoryColor: 'bg-green-50 text-green-600',
    title: 'Outside Central HDB Resale',
    subtitle: 'Mass market transaction analysis',
    districts: ['D15', 'D19', 'D21'],
    colors: ['#D41F30', '#059669', '#7C3AED'],
    metric: 'Avg PSF',
    period: '2020 – 2024',
    insight: 'D15 leads with 142 deals in Q4',
    insightType: 'up',
    highlights: [
      { label: 'Top District', value: 'D15 East Coast' },
      { label: 'Avg PSF (2024)', value: '$2,450' },
      { label: 'Volume Leader', value: '142 deals' },
      { label: 'Price Range', value: '$1.2M–$4.8M' },
    ],
    data: {
      years: ['2020', '2021', '2022', '2023', '2024'],
      series: [
        { id: 'D15', values: [1890, 1980, 2100, 2280, 2450] },
        { id: 'D19', values: [1650, 1720, 1890, 2050, 2190] },
        { id: 'D21', values: [1720, 1810, 1950, 2100, 2280] },
      ],
    },
    description: 'Outside Central Region HDB resale prices have seen steady appreciation. D15 continues to attract strong buyer interest due to its coastal lifestyle and transport connectivity.',
  },
  {
    id: 'investment-hotspots',
    category: 'INVESTMENT',
    categoryColor: 'bg-purple-50 text-purple-600',
    title: 'Investment District Hotspots',
    subtitle: 'High-yield districts for portfolio growth',
    districts: ['D09', 'D11', 'D15', 'D22'],
    colors: ['#D41F30', '#1E40AF', '#059669', '#7C3AED'],
    metric: 'Avg Price',
    period: '2021 – 2024',
    insight: 'D09 avg price hit $3.1M in 2024',
    insightType: 'up',
    highlights: [
      { label: 'Best Performer', value: 'D09 Orchard' },
      { label: 'Avg Price (2024)', value: '$3.1M' },
      { label: 'YoY Gain', value: '+8.2%' },
      { label: 'Districts Tracked', value: '4' },
    ],
    data: {
      years: ['2021', '2022', '2023', '2024'],
      series: [
        { id: 'D09', values: [2400, 2800, 3000, 3100] },
        { id: 'D11', values: [2100, 2300, 2500, 2600] },
        { id: 'D15', values: [1800, 2100, 2300, 2400] },
        { id: 'D22', values: [1200, 1400, 1600, 1800] },
      ],
    },
    description: 'Four high-performing investment districts compared across average transacted prices. D09 maintains its crown while D22 Jurong shows aggressive growth momentum making it a compelling value play.',
  },
  {
    id: 'new-launch-volume',
    category: 'NEW LAUNCH',
    categoryColor: 'bg-orange-50 text-orange-600',
    title: 'New Launch Volume Tracker',
    subtitle: 'Transaction volume across growth corridors',
    districts: ['D03', 'D05', 'D18'],
    colors: ['#D41F30', '#1E40AF', '#374151'],
    metric: 'Volume',
    period: '2020 – 2024',
    insight: 'D18 volume surged 38% in 2023',
    insightType: 'up',
    highlights: [
      { label: 'Volume Leader', value: 'D18 Tampines' },
      { label: 'Peak Deals', value: '232 in 2023' },
      { label: 'Surge', value: '+38% YoY' },
      { label: 'Avg Volume', value: '148 deals/yr' },
    ],
    data: {
      years: ['2020', '2021', '2022', '2023', '2024'],
      series: [
        { id: 'D03', values: [82, 95, 110, 128, 142] },
        { id: 'D05', values: [65, 78, 92, 108, 118] },
        { id: 'D18', values: [120, 145, 168, 232, 195] },
      ],
    },
    description: 'New launch transaction volumes reveal buyer appetite for suburban growth corridors. D18 (Tampines) saw a dramatic surge in 2023 driven by new MRT connectivity and major launch projects.',
  },
  {
    id: 'rental-comparison',
    category: 'RENTAL',
    categoryColor: 'bg-teal-50 text-teal-600',
    title: 'Rental Market Comparison',
    subtitle: 'Condo rental PSF yield by district',
    districts: ['D01', 'D05', 'D15'],
    colors: ['#D41F30', '#059669', '#7C3AED'],
    metric: 'Avg PSF',
    period: '2022 – 2024',
    insight: 'Rental PSF up across all districts',
    insightType: 'up',
    highlights: [
      { label: 'Top Rental PSF', value: 'D01 at $7.90' },
      { label: 'Fastest Growth', value: 'D15 +21.8%' },
      { label: 'Market Trend', value: 'Upward' },
      { label: 'Condo Type', value: 'Non-landed' },
    ],
    data: {
      years: ['2022', '2023', '2024'],
      series: [
        { id: 'D01', values: [6.8, 7.4, 7.9] },
        { id: 'D05', values: [5.2, 5.8, 6.3] },
        { id: 'D15', values: [5.5, 6.1, 6.7] },
      ],
    },
    description: 'Condo rental PSF has risen sharply across all tracked districts post-2022. D01 commands the highest yields while D15 shows the fastest relative growth, making it attractive for rental investors.',
  },
]

// Mini SVG chart renderer
function MiniChart({ series, colors, height = 60 }) {
  const allValues = series.flatMap(s => s.values)
  const min = Math.min(...allValues)
  const max = Math.max(...allValues)
  const range = max - min || 1
  const W = 180
  const H = height
  const pad = 6

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="overflow-visible">
      {series.map((s, si) => {
        const pts = s.values.map((v, i) => {
          const x = pad + (i / (s.values.length - 1)) * (W - pad * 2)
          const y = H - pad - ((v - min) / range) * (H - pad * 2)
          return `${x},${y}`
        })
        return (
          <g key={si}>
            <polyline
              points={pts.join(' ')}
              fill="none"
              stroke={colors[si]}
              strokeWidth={si === 0 ? 2.5 : 2}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.9}
            />
            {/* End dot */}
            {(() => {
              const last = s.values[s.values.length - 1]
              const x = W - pad
              const y = H - pad - ((last - min) / range) * (H - pad * 2)
              return <circle cx={x} cy={y} r={3} fill={colors[si]} />
            })()}
          </g>
        )
      })}
    </svg>
  )
}

export default function SampleReports() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F2F7]">
      {/* Header */}
      <div className="bg-white px-4 pt-12 pb-4 shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3 mb-1">
          <button
            onClick={() => navigate('/trends')}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-[18px] font-extrabold text-era-navy">Sample Reports</h1>
            <p className="text-[11px] text-gray-400">See what Market Trends can generate</p>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto pb-24">
        {/* Intro banner */}
        <div className="mx-4 mt-4 bg-gradient-to-r from-era-red to-era-red-dark rounded-2xl p-4 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-bold tracking-widest opacity-80 mb-1">ERA MARKET INTELLIGENCE</p>
              <h2 className="text-[17px] font-extrabold leading-snug mb-1">Real data. Real insights.</h2>
              <p className="text-[12px] opacity-80 leading-relaxed">
                Explore 5 sample reports built from actual Singapore property transaction data.
              </p>
            </div>
            <div className="text-[32px] ml-2 flex-shrink-0">📊</div>
          </div>
          <div className="flex gap-3 mt-3">
            <div className="bg-white/20 rounded-xl px-3 py-1.5 text-center">
              <div className="text-[15px] font-extrabold">5</div>
              <div className="text-[10px] opacity-80">Reports</div>
            </div>
            <div className="bg-white/20 rounded-xl px-3 py-1.5 text-center">
              <div className="text-[15px] font-extrabold">28</div>
              <div className="text-[10px] opacity-80">Districts</div>
            </div>
            <div className="bg-white/20 rounded-xl px-3 py-1.5 text-center">
              <div className="text-[15px] font-extrabold">2020–24</div>
              <div className="text-[10px] opacity-80">Coverage</div>
            </div>
          </div>
        </div>

        {/* Report cards */}
        <div className="px-4 mt-4 space-y-3">
          {SAMPLE_REPORTS.map((report, idx) => (
            <button
              key={report.id}
              onClick={() => navigate(`/trends/sample-reports/${report.id}`)}
              className="w-full bg-white rounded-2xl shadow-sm overflow-hidden text-left active:scale-[0.98] transition-transform"
            >
              {/* Chart preview area */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 px-5 pt-4 pb-3 overflow-hidden">
                {/* Background number */}
                <span className="absolute right-4 top-2 text-[48px] font-extrabold text-gray-100 leading-none select-none">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <div className="flex items-start justify-between mb-3">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${report.categoryColor}`}>
                    {report.category}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">{report.period}</span>
                </div>

                {/* Mini chart */}
                <div className="flex justify-center">
                  <MiniChart series={report.data.series} colors={report.colors} height={65} />
                </div>

                {/* Legend dots */}
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                  {report.data.series.map((s, i) => (
                    <div key={s.id} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: report.colors[i] }} />
                      <span className="text-[10px] text-gray-500 font-medium">{s.id}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Report info */}
              <div className="px-4 py-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 mr-2">
                    <h3 className="text-[15px] font-extrabold text-era-navy leading-tight">{report.title}</h3>
                    <p className="text-[12px] text-gray-400 mt-0.5">{report.subtitle}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-era-red/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ChevronRight size={16} className="text-era-red" />
                  </div>
                </div>

                {/* Metric + Insight */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {report.metric}
                    </span>
                    <span className="text-[11px] text-gray-400">·</span>
                    <span className="text-[11px] text-gray-400">{report.districts.length} districts</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {report.insightType === 'up' && <TrendingUp size={12} className="text-green-500" />}
                    {report.insightType === 'down' && <TrendingDown size={12} className="text-red-500" />}
                    {report.insightType === 'flat' && <Minus size={12} className="text-gray-400" />}
                    <span className="text-[11px] font-semibold text-green-600">{report.insight}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mx-4 mt-5 mb-2 bg-era-red/5 border border-era-red/10 rounded-2xl p-4 text-center">
          <p className="text-[13px] text-gray-600 mb-3">
            Ready to generate your own report?
          </p>
          <button
            onClick={() => navigate('/trends/filter')}
            className="bg-era-red text-white text-[14px] font-bold px-6 py-3 rounded-xl shadow-sm shadow-era-red/20 active:scale-[0.98] transition-transform"
          >
            Create Custom Report
          </button>
        </div>
      </main>

      <BottomNav />
    </div>
  )
}
