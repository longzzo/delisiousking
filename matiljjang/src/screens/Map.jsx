import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TabBar from '../components/TabBar'
import { RESTAURANTS } from '../data/restaurants'
import { useApp } from '../store/AppStore'

const ratingColor = (r) => r >= 4.5 ? '#FF8904' : r >= 4.0 ? '#FFB261' : '#9CA3AF'
const busyStyle = (b) => b === '여유' ? { color: '#5BD06A', bg: 'rgba(91,208,106,0.12)' } : b === '보통' ? { color: '#FFB261', bg: 'rgba(255,178,97,0.12)' } : { color: '#FF6B6B', bg: 'rgba(255,107,107,0.12)' }
const busyDot = (b) => b === '여유' ? '#5BD06A' : b === '보통' ? '#FFB261' : '#FF6B6B'

export default function Map() {
  const go = useNavigate()
  const { toggleWishlist, isWished } = useApp()
  const [selectedId, setSelectedId] = useState(RESTAURANTS[0].id)
  const sel = RESTAURANTS.find(r => r.id === selectedId) || RESTAURANTS[0]
  const bs = busyStyle(sel.busy)
  const wished = isWished(sel.id)

  const openNav = (e, r) => {
    e.stopPropagation()
    window.open(`https://map.kakao.com/?q=${encodeURIComponent(r.address)}`, '_blank')
  }

  return (
    <div style={{ width: '100%', height: '100dvh', background: '#0E0B09', position: 'relative', color: '#fff', overflow: 'hidden' }}>
      {/* Map SVG */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <svg width="100%" height="100%" viewBox="0 0 412 916" preserveAspectRatio="xMidYMid slice">
          <rect width="412" height="916" fill="#15110E"/>
          <defs>
            <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0L0 0 0 40" stroke="rgba(255,255,255,0.025)" fill="none" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="412" height="916" fill="url(#g)"/>
          {/* roads */}
          <path d="M-20 320 L440 230" stroke="rgba(255,255,255,0.06)" strokeWidth="28"/>
          <path d="M-20 320 L440 230" stroke="rgba(255,255,255,0.09)" strokeWidth="2" strokeDasharray="8 6"/>
          <path d="M195 -20 L245 940" stroke="rgba(255,255,255,0.06)" strokeWidth="28"/>
          <path d="M195 -20 L245 940" stroke="rgba(255,255,255,0.09)" strokeWidth="2" strokeDasharray="8 6"/>
          <path d="M-20 550 L440 580" stroke="rgba(255,255,255,0.05)" strokeWidth="20"/>
          {/* campus */}
          <rect x="44" y="70" width="160" height="140" rx="10" fill="rgba(255,137,4,0.06)" stroke="rgba(255,137,4,0.20)" strokeWidth="1.2"/>
          <text x="124" y="118" textAnchor="middle" fill="rgba(255,137,4,0.7)" fontSize="13" fontWeight="700" fontFamily="Inter">경일대학교</text>
          <text x="124" y="138" textAnchor="middle" fill="rgba(255,137,4,0.45)" fontSize="10" fontFamily="Inter">KYUNGIL UNIV.</text>
          <rect x="60" y="155" width="50" height="40" rx="4" fill="rgba(255,137,4,0.10)"/>
          <rect x="120" y="155" width="70" height="40" rx="4" fill="rgba(255,137,4,0.10)"/>
          {/* dorm */}
          <rect x="258" y="90" width="114" height="70" rx="8" fill="rgba(91,208,106,0.06)" stroke="rgba(91,208,106,0.18)" strokeWidth="1.2"/>
          <text x="315" y="130" textAnchor="middle" fill="rgba(91,208,106,0.7)" fontSize="12" fontWeight="600" fontFamily="Inter">기숙사</text>
          {/* park */}
          <circle cx="330" cy="580" r="48" fill="rgba(91,208,106,0.06)" stroke="rgba(91,208,106,0.18)" strokeWidth="1.2"/>
          <text x="330" y="584" textAnchor="middle" fill="rgba(91,208,106,0.5)" fontSize="10" fontFamily="Inter">근린공원</text>
          {/* buildings */}
          <rect x="36" y="620" width="48" height="72" rx="5" fill="rgba(255,255,255,0.04)"/>
          <rect x="96" y="660" width="60" height="60" rx="5" fill="rgba(255,255,255,0.04)"/>
          <rect x="278" y="700" width="72" height="48" rx="5" fill="rgba(255,255,255,0.04)"/>
          {/* current location */}
          <circle cx="185" cy="200" r="22" fill="rgba(81,162,255,0.15)">
            <animate attributeName="r" values="16;26;16" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="185" cy="200" r="8" fill="#51A2FF" stroke="#fff" strokeWidth="3"/>
        </svg>
      </div>

      {/* Search bar */}
      <div style={{ position: 'absolute', top: 52, left: 16, right: 16, display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, height: 46, borderRadius: 14, background: 'rgba(20,16,14,0.88)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#fff" strokeWidth="2"/><path d="M20 20l-3.5-3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>이 지역에서 검색</span>
        </div>
        <div style={{ width: 46, height: 46, borderRadius: 14, background: 'rgba(20,16,14,0.88)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M7 12h10M10 18h4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, display: 'flex', gap: 8, padding: '0 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {[{ label: '⭐ 4.5+', on: true }, { label: '🪑 혼밥 가능', on: false }, { label: '⏱ 빠른 조리', on: false }, { label: '💰 8천원 이하', on: true }, { label: '🟢 한산', on: false }].map((c, i) => (
          <div key={i} style={{ flex: '0 0 auto', padding: '7px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: c.on ? '#FF8904' : 'rgba(20,16,14,0.88)', border: c.on ? '1px solid #FF8904' : '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', color: '#fff', cursor: 'pointer' }}>{c.label}</div>
        ))}
      </div>

      {/* Map markers */}
      {RESTAURANTS.map((r) => {
        const isSelected = selectedId === r.id
        const size = isSelected ? 48 : 38
        return (
          <button key={r.id} onClick={() => setSelectedId(r.id)} style={{ position: 'absolute', left: r.mapX, top: r.mapY, transform: 'translate(-50%, -100%)', cursor: 'pointer', zIndex: isSelected ? 10 : 5, background: 'none', border: 'none', padding: 0 }}>
            <div style={{ width: size, height: size, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: ratingColor(r.rating), border: `2.5px solid ${isSelected ? '#fff' : 'rgba(255,255,255,0.5)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: isSelected ? '0 10px 24px rgba(255,137,4,0.55)' : '0 4px 12px rgba(0,0,0,0.4)', transition: 'all 0.2s' }}>
              <span style={{ transform: 'rotate(45deg)', fontSize: isSelected ? 22 : 17 }}>{r.emoji}</span>
            </div>
            <div style={{ position: 'absolute', top: -4, right: -4, width: 14, height: 14, borderRadius: '50%', background: busyDot(r.busy), border: '2px solid #0E0B09', transform: 'rotate(0deg)' }} />
          </button>
        )
      })}

      {/* Preview card */}
      <div onClick={() => go(`/restaurant/${sel.id}`)} style={{ position: 'absolute', bottom: 28, left: 16, right: 16, background: '#1A1614', cursor: 'pointer', borderRadius: 22, padding: 16, border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 20px 50px rgba(0,0,0,0.55)', display: 'flex', gap: 14, animation: 'slideUp 0.2s ease-out' }}>
        <div style={{ width: 88, height: 88, borderRadius: 14, flexShrink: 0, background: 'repeating-linear-gradient(135deg, #2A211B 0 6px, #221B17 6px 12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, position: 'relative' }}>
          {sel.emoji}
          <div style={{ position: 'absolute', top: 6, left: 6, background: 'rgba(0,0,0,0.6)', color: '#FFD56B', fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 6 }}>★ {sel.rating}</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1, marginRight: 8 }}>{sel.name}</div>
            <div style={{ fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999, flexShrink: 0, color: bs.color, background: bs.bg }}>● {sel.busy}</div>
          </div>
          <div style={{ marginTop: 3, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{sel.category} · {sel.distance}m</div>
          <div style={{ marginTop: 8, fontSize: 13, fontWeight: 700, color: '#FFB261' }}>{sel.priceMin.toLocaleString()}원~</div>
          <div style={{ marginTop: 10, display: 'flex', gap: 7 }}>
            <button onClick={e => openNav(e, sel)} style={{ flex: 1, height: 36, borderRadius: 10, border: 'none', background: 'linear-gradient(135deg, #FF8904, #FB2C36)', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>🗺️ 길찾기</button>
            <button
              onClick={e => { e.stopPropagation(); toggleWishlist(sel.id) }}
              style={{ width: 36, height: 36, borderRadius: 10, background: wished ? 'rgba(251,44,54,0.15)' : 'rgba(255,255,255,0.06)', border: wished ? '1px solid rgba(251,44,54,0.4)' : '1px solid rgba(255,255,255,0.08)', color: '#fff', fontSize: 18, cursor: 'pointer' }}
            >
              {wished ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      </div>

      <TabBar />
    </div>
  )
}
