import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import TabBar from '../components/TabBar'
import { RESTAURANTS } from '../data/restaurants'
import { useApp } from '../store/AppStore'
import { CAMPUS, restaurantLatLng } from '../config'

const ratingColor = (r) => r >= 4.5 ? '#FF8904' : r >= 4.0 ? '#FFB261' : '#9CA3AF'
const busyStyle = (b) => b === '여유' ? { color: '#5BD06A', bg: 'rgba(91,208,106,0.12)' } : b === '보통' ? { color: '#FFB261', bg: 'rgba(255,178,97,0.12)' } : { color: '#FF6B6B', bg: 'rgba(255,107,107,0.12)' }
const busyDot = (b) => b === '여유' ? '#5BD06A' : b === '보통' ? '#FFB261' : '#FF6B6B'

function pinHtml(r, selected) {
  const size = selected ? 46 : 36
  return `
    <div style="position:relative;width:${size}px;height:${size}px">
      <div style="width:${size}px;height:${size}px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);background:${ratingColor(r.rating)};border:2.5px solid ${selected ? '#fff' : 'rgba(255,255,255,0.7)'};display:flex;align-items:center;justify-content:center;box-shadow:${selected ? '0 10px 24px rgba(255,137,4,0.6)' : '0 4px 12px rgba(0,0,0,0.45)'}">
        <span style="transform:rotate(45deg);font-size:${selected ? 21 : 16}px;line-height:1">${r.emoji}</span>
      </div>
      <div style="position:absolute;top:-3px;right:-3px;width:13px;height:13px;border-radius:50%;background:${busyDot(r.busy)};border:2px solid #fff"></div>
    </div>`
}

export default function Map() {
  const go = useNavigate()
  const { toggleWishlist, isWished } = useApp()
  const [selectedId, setSelectedId] = useState(RESTAURANTS[0].id)
  const sel = RESTAURANTS.find(r => r.id === selectedId) || RESTAURANTS[0]
  const bs = busyStyle(sel.busy)
  const wished = isWished(sel.id)

  const mapDivRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef({})

  const openNav = (e, r) => {
    e.stopPropagation()
    const { lat, lng } = restaurantLatLng(r)
    window.open(`https://map.kakao.com/link/to/${encodeURIComponent(r.name)},${lat},${lng}`, '_blank')
  }

  // 지도 1회 초기화
  useEffect(() => {
    if (!mapDivRef.current || mapRef.current) return
    const map = L.map(mapDivRef.current, {
      center: [CAMPUS.lat, CAMPUS.lng],
      zoom: 16,
      zoomControl: false,
      attributionControl: false,
    })
    mapRef.current = map

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20,
    }).addTo(map)

    L.control.attribution({ prefix: false, position: 'bottomleft' })
      .addAttribution('© OpenStreetMap · CARTO')
      .addTo(map)

    // 캠퍼스(현위치) 마커
    const campusIcon = L.divIcon({
      className: '',
      html: `<div style="position:relative;width:18px;height:18px">
        <div style="position:absolute;inset:-9px;border-radius:50%;background:rgba(81,162,255,0.30);animation:pulse 2s infinite"></div>
        <div style="width:18px;height:18px;border-radius:50%;background:#51A2FF;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.5)"></div>
      </div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    })
    L.marker([CAMPUS.lat, CAMPUS.lng], { icon: campusIcon, interactive: false }).addTo(map)

    // 처음 화면에 모든 마커가 보이도록 살짝 맞춤
    const pts = RESTAURANTS.map(r => { const p = restaurantLatLng(r); return [p.lat, p.lng] })
    pts.push([CAMPUS.lat, CAMPUS.lng])
    map.fitBounds(L.latLngBounds(pts).pad(0.15))

    // 화면 전환 애니메이션(0.28s) 동안 컨테이너 크기가 확정되도록 여러 번 보정
    const timers = [0, 150, 360].map(t => setTimeout(() => map.invalidateSize(), t))
    const onResize = () => map.invalidateSize()
    window.addEventListener('resize', onResize)

    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('resize', onResize)
      map.remove(); mapRef.current = null; markersRef.current = {}
    }
  }, [])

  const recenter = () => {
    const map = mapRef.current
    if (!map) return
    map.flyTo([CAMPUS.lat, CAMPUS.lng], 16, { duration: 0.5 })
  }

  // 마커 갱신 (선택 상태 반영)
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    Object.values(markersRef.current).forEach(m => m.remove())
    markersRef.current = {}

    RESTAURANTS.forEach(r => {
      const { lat, lng } = restaurantLatLng(r)
      const selected = r.id === selectedId
      const size = selected ? 46 : 36
      const icon = L.divIcon({
        className: '',
        html: pinHtml(r, selected),
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
      })
      const marker = L.marker([lat, lng], { icon, zIndexOffset: selected ? 1000 : 0 }).addTo(map)
      marker.on('click', () => setSelectedId(r.id))
      markersRef.current[r.id] = marker
    })

    const p = restaurantLatLng(sel)
    map.panTo([p.lat, p.lng], { animate: true, duration: 0.4 })
  }, [selectedId, sel])

  return (
    <div style={{ width: '100%', height: '100dvh', background: '#0E0B09', position: 'relative', color: '#fff', overflow: 'hidden' }}>
      {/* Leaflet map */}
      <div ref={mapDivRef} style={{ position: 'absolute', inset: 0, background: '#15110E' }} />

      {/* Search bar */}
      <div style={{ position: 'absolute', top: 52, left: 16, right: 16, display: 'flex', gap: 8, zIndex: 500 }}>
        <button onClick={() => go('/home')} style={{ flex: 1, height: 46, borderRadius: 14, background: 'rgba(20,16,14,0.88)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10, cursor: 'pointer', textAlign: 'left' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="#fff" strokeWidth="2"/><path d="M20 20l-3.5-3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>이 지역에서 검색</span>
        </button>
        <button onClick={() => go('/home')} style={{ width: 46, height: 46, borderRadius: 14, background: 'rgba(20,16,14,0.88)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M7 12h10M10 18h4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* Filter chips */}
      <div style={{ position: 'absolute', top: 110, left: 0, right: 0, display: 'flex', gap: 8, padding: '0 16px', overflowX: 'auto', scrollbarWidth: 'none', zIndex: 500 }}>
        {[{ label: '⭐ 4.5+', on: true }, { label: '🪑 혼밥 가능', on: false }, { label: '⏱ 빠른 조리', on: false }, { label: '💰 8천원 이하', on: true }, { label: '🟢 한산', on: false }].map((c, i) => (
          <button key={i} onClick={() => go('/home')} style={{ flex: '0 0 auto', padding: '7px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', background: c.on ? '#FF8904' : 'rgba(20,16,14,0.88)', border: c.on ? '1px solid #FF8904' : '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', color: '#fff', cursor: 'pointer' }}>{c.label}</button>
        ))}
      </div>

      {/* Recenter to campus */}
      <button onClick={recenter} title="현위치로" style={{ position: 'absolute', right: 16, bottom: 196, zIndex: 500, width: 44, height: 44, borderRadius: 14, background: 'rgba(20,16,14,0.92)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 6px 18px rgba(0,0,0,0.45)' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3.5" stroke="#51A2FF" strokeWidth="2"/><path d="M12 2v3M12 19v3M22 12h-3M5 12H2" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>

      {/* Preview card */}
      <div onClick={() => go(`/restaurant/${sel.id}`)} style={{ position: 'absolute', bottom: 28, left: 16, right: 16, zIndex: 500, background: '#1A1614', cursor: 'pointer', borderRadius: 22, padding: 16, border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 20px 50px rgba(0,0,0,0.55)', display: 'flex', gap: 14, animation: 'slideUp 0.2s ease-out' }}>
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
