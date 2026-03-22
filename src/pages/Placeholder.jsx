import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'

export default function Placeholder({ title = 'Coming Soon' }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#F2F2F7]">
      <TopBar title={title} />
      <main className="flex-1 flex flex-col items-center justify-center pb-24 text-center px-8">
        <div className="text-5xl mb-4">🚧</div>
        <h2 className="text-[20px] font-bold text-era-navy mb-2">{title}</h2>
        <p className="text-gray-400 text-[14px]">This section is part of the prototype scope.</p>
      </main>
      <BottomNav />
    </div>
  )
}
