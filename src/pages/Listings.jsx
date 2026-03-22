import { useState } from 'react'
import { Search, SlidersHorizontal, Heart, MapPin, Bed, Bath, Square, ChevronRight, Plus } from 'lucide-react'
import BottomNav from '../components/BottomNav'

const TABS = ['All', 'Active', 'Sold', 'Rental']

const LISTINGS = [
  {
    id: 1, district: 'D09', name: 'Orchard Residences', address: '1 Orchard Blvd', type: 'Condo',
    price: '$3,800,000', psf: '$3,250', beds: 3, baths: 2, sqft: 1184,
    status: 'Active', tag: 'Hot', tagColor: '#D41F30',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80',
    daysListed: 3,
  },
  {
    id: 2, district: 'D15', name: 'The Continuum', address: '5 Thiam Siew Ave', type: 'Condo',
    price: '$2,450,000', psf: '$2,380', beds: 2, baths: 2, sqft: 1044,
    status: 'Active', tag: 'New', tagColor: '#2563EB',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
    daysListed: 1,
  },
  {
    id: 3, district: 'D10', name: 'Leedon Green', address: '8 Leedon Heights', type: 'Condo',
    price: '$5,200,000', psf: '$2,780', beds: 4, baths: 3, sqft: 1808,
    status: 'Sold', tag: 'Sold', tagColor: '#6B7280',
    img: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=400&q=80',
    daysListed: 14,
  },
  {
    id: 4, district: 'D05', name: 'One-North Eden', address: '1 Slim Barracks Rise', type: 'Condo',
    price: '$1,350,000', psf: '$1,950', beds: 1, baths: 1, sqft: 689,
    status: 'Active', tag: null, tagColor: null,
    img: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&q=80',
    daysListed: 8,
  },
  {
    id: 5, district: 'D01', name: 'Marina One Residences', address: '21 Marina Way', type: 'Condo',
    price: '$8,200', psf: '$3,410', beds: 3, baths: 3, sqft: 1119,
    status: 'Rental', tag: 'Hot', tagColor: '#D41F30',
    img: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
    daysListed: 5,
  },
  {
    id: 6, district: 'D23', name: 'Bukit Batok HDB', address: '123 Bukit Batok St 11', type: 'HDB',
    price: '$620,000', psf: '$520', beds: 4, baths: 2, sqft: 1195,
    status: 'Active', tag: null, tagColor: null,
    img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80',
    daysListed: 21,
  },
]

const PROPERTY_FILTERS = ['All Types', 'Condo', 'HDB', 'Landed', 'Commercial']

export default function Listings() {
  const [activeTab, setActiveTab] = useState('All')
  const [search, setSearch] = useState('')
  const [savedIds, setSavedIds] = useState([1, 5])
  const [activeFilter, setActiveFilter] = useState('All Types')
  const [viewMode, setViewMode] = useState('card') // 'card' | 'compact'

  const filtered = LISTINGS.filter(l => {
    const matchTab = activeTab === 'All' || l.status === activeTab
    const matchSearch = search === '' || l.name.toLowerCase().includes(search.toLowerCase()) || l.district.toLowerCase().includes(search.toLowerCase())
    const matchType = activeFilter === 'All Types' || l.type === activeFilter
    return matchTab && matchSearch && matchType
  })

  function toggleSave(id) {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F2F2F7]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between px-4 pt-3 pb-2">
          <h1 className="text-[20px] font-extrabold text-era-navy">My Listings</h1>
          <button className="flex items-center gap-1.5 bg-era-red text-white text-[12px] font-bold px-3 py-2 rounded-xl">
            <Plus size={14} />
            Add
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or district…"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-100 rounded-xl text-[13px] outline-none"
              />
            </div>
            <button className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-xl flex-shrink-0">
              <SlidersHorizontal size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-4 gap-1 pb-3 overflow-x-auto hide-scrollbar">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all ${
                activeTab === tab ? 'bg-era-red text-white' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {tab}
              <span className="ml-1 text-[10px] opacity-70">
                {tab === 'All' ? LISTINGS.length : LISTINGS.filter(l => l.status === tab).length}
              </span>
            </button>
          ))}
        </div>
      </header>

      {/* Property type filter */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto hide-scrollbar">
        {PROPERTY_FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
              activeFilter === f ? 'border-era-red bg-era-red/5 text-era-red' : 'border-gray-200 bg-white text-gray-500'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <main className="flex-1 overflow-y-auto pb-24 px-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-4xl mb-3">🏠</div>
            <p className="text-gray-500 text-[14px]">No listings found</p>
            <p className="text-gray-400 text-[12px] mt-1">Try adjusting your filters</p>
          </div>
        ) : filtered.map(l => (
          <ListingCard key={l.id} listing={l} saved={savedIds.includes(l.id)} onSave={() => toggleSave(l.id)} />
        ))}
      </main>

      <BottomNav />
    </div>
  )
}

function ListingCard({ listing: l, saved, onSave }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden active:scale-[0.99] transition-transform">
      {/* Image */}
      <div className="relative h-44 bg-gray-200">
        <img src={l.img} alt={l.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Tag */}
        {l.tag && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white" style={{ background: l.tagColor }}>
            {l.tag}
          </div>
        )}

        {/* District badge */}
        <div className="absolute top-3 right-12 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full">
          <span className="text-white text-[11px] font-bold">{l.district}</span>
        </div>

        {/* Save */}
        <button
          onClick={e => { e.stopPropagation(); onSave() }}
          className="absolute top-2.5 right-3 w-8 h-8 flex items-center justify-center bg-white/90 rounded-full shadow-sm"
        >
          <Heart size={15} className={saved ? 'fill-era-red text-era-red' : 'text-gray-400'} />
        </button>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <div className="text-white font-extrabold text-[20px] leading-none">{l.price}</div>
          <div className="text-white/70 text-[11px]">{l.psf} psf</div>
        </div>

        {/* Status */}
        <div className="absolute bottom-3 right-3">
          <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
            l.status === 'Active' ? 'bg-green-500/90 text-white' :
            l.status === 'Sold' ? 'bg-gray-500/90 text-white' :
            'bg-blue-500/90 text-white'
          }`}>{l.status}</span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-era-navy">{l.name}</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={11} className="text-gray-400" />
              <span className="text-[11px] text-gray-500">{l.address}</span>
            </div>
          </div>
          <span className="text-[10px] text-gray-400 whitespace-nowrap">{l.daysListed}d ago</span>
        </div>

        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <Bed size={13} className="text-gray-400" />
            <span className="text-[12px] text-gray-600 font-medium">{l.beds} Bed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={13} className="text-gray-400" />
            <span className="text-[12px] text-gray-600 font-medium">{l.baths} Bath</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Square size={13} className="text-gray-400" />
            <span className="text-[12px] text-gray-600 font-medium">{l.sqft.toLocaleString()} sqft</span>
          </div>
          <div className="ml-auto">
            <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">{l.type}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
