import { useState } from 'react'
import { ChevronRight, Star, Award, Phone, Mail, Globe, Bell, Shield, HelpCircle, LogOut, Camera, Edit3, Copy } from 'lucide-react'
import BottomNav from '../components/BottomNav'

const STATS = [
  { label: 'Listings', value: '24' },
  { label: 'Deals', value: '142' },
  { label: 'Rating', value: '4.9★' },
  { label: 'Years', value: '8' },
]

const BADGES = [
  { icon: '🏆', label: 'Top Producer 2023', color: '#FEF3C7' },
  { icon: '⭐', label: 'ERA Star Award', color: '#FEF9C3' },
  { icon: '🥇', label: '$10M Club', color: '#DCFCE7' },
  { icon: '🎖️', label: '5-Star Service', color: '#EFF6FF' },
]

const SETTINGS_SECTIONS = [
  {
    title: 'Account',
    items: [
      { icon: Bell, label: 'Notifications', sub: 'Alerts, reminders', hasToggle: true, toggled: true },
      { icon: Shield, label: 'Privacy & Security', sub: 'Data, permissions' },
      { icon: Globe, label: 'Language & Region', sub: 'English (SG)' },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: HelpCircle, label: 'Help Centre', sub: 'FAQs, tutorials' },
      { icon: Star, label: 'Rate the App', sub: 'Leave a review' },
    ],
  },
]

export default function Profile() {
  const [notifOn, setNotifOn] = useState(true)
  const [copied, setCopied] = useState(false)

  function copyId() {
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F2F7]">
      <main className="flex-1 overflow-y-auto pb-24 page-enter">
        {/* Profile hero */}
        <div className="bg-gradient-to-b from-white to-[#F2F2F7] px-4 pt-10 pb-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-era-red to-[#B01827] flex items-center justify-center text-white text-3xl font-extrabold ring-4 ring-white shadow-lg">
                AG
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-era-red rounded-full flex items-center justify-center shadow-md">
                <Camera size={13} className="text-white" />
              </button>
            </div>

            <h2 className="text-[22px] font-extrabold text-era-navy">Alex Goh</h2>
            <p className="text-[13px] text-gray-500 mt-0.5">Senior Associate, ERA Realty Network</p>

            {/* ERA ID */}
            <button
              onClick={copyId}
              className="mt-2 flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full"
            >
              <span className="text-[11px] font-semibold text-gray-500">ERA ID: R012345Z</span>
              <Copy size={11} className={copied ? 'text-green-500' : 'text-gray-400'} />
            </button>
            {copied && <p className="text-[10px] text-green-500 mt-1">Copied!</p>}

            {/* Contact */}
            <div className="flex items-center gap-4 mt-3">
              <a href="tel:+6591234567" className="flex items-center gap-1.5 bg-era-red/10 text-era-red text-[12px] font-semibold px-3 py-2 rounded-xl">
                <Phone size={13} /> +65 9123 4567
              </a>
              <a href="mailto:alex@era.com.sg" className="flex items-center gap-1.5 bg-blue-50 text-blue-600 text-[12px] font-semibold px-3 py-2 rounded-xl">
                <Mail size={13} /> Email
              </a>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mx-4 mb-4">
          <div className="bg-white rounded-2xl shadow-sm grid grid-cols-4 divide-x divide-gray-100">
            {STATS.map(s => (
              <div key={s.label} className="flex flex-col items-center py-4">
                <span className="text-[18px] font-extrabold text-era-navy">{s.value}</span>
                <span className="text-[10px] text-gray-400 mt-0.5">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">Awards & Badges</h3>
              <Award size={16} className="text-era-red" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {BADGES.map(b => (
                <div key={b.label} className="flex items-center gap-2.5 p-2.5 rounded-xl" style={{ background: b.color }}>
                  <span className="text-xl">{b.icon}</span>
                  <span className="text-[11px] font-semibold text-gray-700 leading-tight">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Edit profile */}
        <div className="px-4 mb-4">
          <button className="w-full bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-era-red/10 rounded-xl flex items-center justify-center">
                <Edit3 size={16} className="text-era-red" />
              </div>
              <div className="text-left">
                <div className="text-[14px] font-semibold text-era-navy">Edit Profile</div>
                <div className="text-[11px] text-gray-400">Update your bio, photo, contact info</div>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </button>
        </div>

        {/* Settings sections */}
        {SETTINGS_SECTIONS.map(section => (
          <div key={section.title} className="px-4 mb-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-1 mb-2">{section.title}</p>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {section.items.map((item, i) => (
                <button
                  key={item.label}
                  onClick={() => item.label === 'Notifications' && setNotifOn(p => !p)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 ${i < section.items.length - 1 ? 'border-b border-gray-50' : ''}`}
                >
                  <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon size={15} className="text-gray-500" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-[14px] font-semibold text-era-navy">{item.label}</div>
                    <div className="text-[11px] text-gray-400">{item.sub}</div>
                  </div>
                  {item.hasToggle ? (
                    <div
                      className={`w-10 h-6 rounded-full transition-colors relative ${notifOn ? 'bg-era-red' : 'bg-gray-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${notifOn ? 'left-5' : 'left-1'}`} />
                    </div>
                  ) : (
                    <ChevronRight size={16} className="text-gray-300" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* ERA branding */}
        <div className="px-4 mb-4">
          <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-era-red rounded-xl flex items-center justify-center text-white font-extrabold text-[14px]">
              ERA
            </div>
            <div>
              <div className="text-[13px] font-bold text-era-navy">ERA Realty Network Pte Ltd</div>
              <div className="text-[11px] text-gray-400">CEA Licence: L3002382K</div>
            </div>
          </div>
        </div>

        {/* Sign out */}
        <div className="px-4 mb-6">
          <button className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 text-[14px] font-semibold">
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        <p className="text-center text-[10px] text-gray-300 pb-4">ERA Market Trends v1.0.0</p>
      </main>

      <BottomNav />
    </div>
  )
}
