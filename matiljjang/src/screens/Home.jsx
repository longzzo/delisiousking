import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import TabBar from '../components/TabBar'
import mascotHero from '../assets/mascot-hero.png'
import { RESTAURANTS } from '../data/restaurants'
import { useApp } from '../store/AppStore'

const CATS = [
  { k: '전체', icon: '🍽️' }, { k: '한식', icon: '🍚' }, { k: '중식', icon: '🥟' },
  { k: '일식', icon: '🍣' }, { k: '분식', icon: '🍢' }, { k: '카페', icon: '☕' }, { k: '치킨', icon: '🍗' },
]
const BUDGETS = ['전체', '6천원 이하', '8천원 이하', '1만원 이하']

const busyColor = (b) => b === '여유' ? { color: '#5BD06A', bg: 'rgba(91,208,106,0.12)' } : b === '보통' ? { color: '#FFB261', bg: 'rgba(255,178,97,0.12)' } : { color: '#FF6B6B', bg: 'rgba(255,107,107,0.12)' }

function WishHeart({ id }) {
  const { toggleWishlist, isWished } = useApp()
  const wished = isWished(id)
  return (
    <button
      onClick={e => { e.stopPropagation(); toggleWishlist(id) }}
      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 0, color: wished ? '#FB2C36' : 'rgba(255,255,255,0.35)', transition: 'transform 0.15s', display: 'flex', alignItems: 'center' }}
    >
      {wished ? '❤️' : '🤍'}
    </button>
  )
}

export default function Home() {
  const go = useNavigate()
  const [cat, setCat] = useState('전체')
  const [budget, setBudget] = useState('전체')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    let list = [...RESTAURANTS]
    if (cat !== '전체') list = list.filter(r => r.category === cat)
    if (budget === '6천원 이하') list = list.filter(r => r.priceMin <= 6000)
    else if (budget === '8천원 이하') list = list.filter(r => r.priceMin <= 8000)
    else if (budget === '1만원 이하') list = list.filter(r => r.priceMin <= 10000)
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.tag.toLowerCase().includes(q)
      )
    }
    return list.sort((a, b) => a.distance - b.distance)
  }, [cat, budget, query])

  const todayPick = RESTAURANTS[0]

  return (
    <div style={{ width: '100%', height: '100dvh', background: '#0E0B09', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div className="screen-wrap" style={{ paddingBottom: 90 }}>

        {/* Header */}
        <div style={{ padding: '56px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>📍 경일대 본관 앞</div>
              <div style={{ marginTop: 4, fontSize: 22, fontWeight: 800, letterSpacing: -0.3 }}>오늘 뭐 먹지? <span style={{ color: '#FF8904' }}>🍴</span></div>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 14, background: 'linear-gradient(135deg, #FF8904, #FB2C36)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, boxShadow: '0 8px 20px rgba(251,44,54,0.35)' }}>김</div>
          </div>
          {/* Live search */}
          <div style={{ marginTop: 14, height: 50, borderRadius: 16, background: '#1A1614', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="rgba(255,255,255,0.45)" strokeWidth="2"/><path d="M20 20l-3.5-3.5" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round"/></svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="가게 · 메뉴 검색"
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: 15, fontFamily: 'inherit' }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: 16, padding: 0, lineHeight: 1 }}>✕</button>
            )}
          </div>
        </div>

        {/* Banner */}
        {!query && (
          <div style={{ padding: '18px 20px 0' }}>
            <div onClick={() => go(`/restaurant/${todayPick.id}`)} style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', background: 'linear-gradient(135deg, #FF8904 0%, #FB2C36 100%)', padding: '20px 18px', minHeight: 148, cursor: 'pointer' }}>
              <div style={{ position: 'absolute', right: -10, bottom: -8, width: 130, height: 148 }}>
                <img src={mascotHero} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.25))' }} />
              </div>
              <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.18)', fontSize: 11, fontWeight: 700, letterSpacing: 0.4 }}>TODAY'S PICK · 오늘의 추천</div>
              <div style={{ marginTop: 10, fontSize: 22, fontWeight: 800, lineHeight: 1.25, maxWidth: 200, letterSpacing: -0.3 }}>오늘 점심은<br/><span style={{ background: 'rgba(255,255,255,0.95)', color: '#FB2C36', padding: '2px 8px', borderRadius: 6 }}>{todayPick.name}</span> 어때?</div>
              <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>⭐ {todayPick.rating} · 도보 {Math.ceil(todayPick.distance/80)}분 · {(todayPick.priceMin).toLocaleString()}원~</div>
            </div>
          </div>
        )}

        {/* Category */}
        <div style={{ padding: '22px 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>카테고리</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }} onClick={() => setCat('전체')}>전체보기</div>
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '0 20px', scrollbarWidth: 'none' }}>
            {CATS.map(c => (
              <button key={c.k} onClick={() => setCat(c.k)} style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <div style={{ width: 54, height: 54, borderRadius: 16, background: cat === c.k ? 'linear-gradient(135deg, #FF8904, #FB2C36)' : '#1A1614', border: cat === c.k ? 'none' : '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: cat === c.k ? '0 6px 16px rgba(251,44,54,0.35)' : 'none', transition: 'all 0.15s' }}>{c.icon}</div>
                <span style={{ fontSize: 11, fontWeight: cat === c.k ? 700 : 500, color: cat === c.k ? '#fff' : 'rgba(255,255,255,0.6)' }}>{c.k}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div style={{ marginTop: 16, padding: '0 20px', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {BUDGETS.map(b => (
            <button key={b} onClick={() => setBudget(b)} style={{ flex: '0 0 auto', padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600, background: budget === b ? '#FF8904' : 'transparent', border: budget === b ? '1px solid #FF8904' : '1px solid rgba(255,255,255,0.10)', color: budget === b ? '#fff' : 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'all 0.15s' }}>💰 {b}</button>
          ))}
        </div>

        {/* Nearby list */}
        <div style={{ marginTop: 24, padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: -0.3 }}>지금 가까운 맛집 <span style={{ fontSize: 14, color: '#FF8904' }}>{filtered.length}곳</span></div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>경일대 정문 500m 이내</div>
          </div>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>거리순 ▾</span>
        </div>

        <div style={{ padding: '12px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.length === 0 && (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🍽️</div>
              검색 결과가 없어요
            </div>
          )}
          {filtered.map(r => {
            const bc = busyColor(r.busy)
            return (
              <div key={r.id} onClick={() => go(`/restaurant/${r.id}`)} style={{ background: '#1A1614', borderRadius: 18, padding: 12, cursor: 'pointer', display: 'flex', gap: 12, border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ width: 80, height: 80, borderRadius: 12, flexShrink: 0, background: 'repeating-linear-gradient(135deg, #2A211B 0 6px, #221B17 6px 12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, position: 'relative' }}>
                  {r.emoji}
                  <div style={{ position: 'absolute', top: 6, left: 6, background: 'rgba(0,0,0,0.65)', color: '#FFB261', fontSize: 9, fontWeight: 700, padding: '3px 6px', borderRadius: 6 }}>{r.tag}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: -0.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{r.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                      <WishHeart id={r.id} />
                      <div style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999, color: bc.color, background: bc.bg }}>● {r.busy}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 3, fontSize: 12, color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.category} · 도보 {Math.ceil(r.distance/80)}분 ({r.distance}m)</div>
                  <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                    <span style={{ color: '#FFD56B', fontWeight: 700 }}>★ {r.rating}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
                    <span style={{ color: 'rgba(255,255,255,0.55)' }}>리뷰 {r.reviewCount}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
                    <span style={{ fontWeight: 700 }}>{r.priceMin.toLocaleString()}원~</span>
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
                    {r.hasSolo && <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 7px', borderRadius: 6, background: 'rgba(91,208,106,0.10)', color: '#5BD06A' }}>🪑 1인석</span>}
                    <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 7px', borderRadius: 6, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)' }}>⏱ {r.cookTime}분</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <TabBar />
    </div>
  )
}
