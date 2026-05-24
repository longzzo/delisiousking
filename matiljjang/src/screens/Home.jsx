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
const BUDGETS = [
  { k: '전체', label: '전체', max: Infinity },
  { k: '6천원 이하', label: '~6,000원', max: 6000 },
  { k: '8천원 이하', label: '~8,000원', max: 8000 },
  { k: '1만원 이하', label: '~10,000원', max: 10000 },
]
const SORTS = [
  { k: 'distance', icon: '📍', label: '거리 가까운 순' },
  { k: 'rating',   icon: '⭐', label: '별점 높은 순' },
  { k: 'price',    icon: '💰', label: '가격 낮은 순' },
  { k: 'cookTime', icon: '⏱', label: '조리 빠른 순' },
]
const EXTRA_FILTERS = [
  { k: 'solo',  icon: '🪑', label: '혼밥 가능' },
  { k: 'quiet', icon: '🟢', label: '한산한 곳' },
]

const busyColor = (b) => b === '여유'
  ? { color: '#5BD06A', bg: 'rgba(91,208,106,0.12)' }
  : b === '보통'
  ? { color: '#FFB261', bg: 'rgba(255,178,97,0.12)' }
  : { color: '#FF6B6B', bg: 'rgba(255,107,107,0.12)' }

function WishHeart({ id }) {
  const { toggleWishlist, isWished } = useApp()
  const wished = isWished(id)
  return (
    <button
      onClick={e => { e.stopPropagation(); toggleWishlist(id) }}
      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 0, display: 'flex', alignItems: 'center' }}
    >
      {wished ? '❤️' : '🤍'}
    </button>
  )
}

export default function Home() {
  const go = useNavigate()
  const [cat, setCat] = useState('전체')
  const [budget, setBudget] = useState('전체')
  const [sort, setSort] = useState('distance')
  const [extraFilters, setExtraFilters] = useState({ solo: false, quiet: false })
  const [query, setQuery] = useState('')
  const [showSheet, setShowSheet] = useState(false)
  // temp state while sheet is open
  const [sheetSort, setSheetSort] = useState('distance')
  const [sheetExtra, setSheetExtra] = useState({ solo: false, quiet: false })

  const openSheet = () => {
    setSheetSort(sort)
    setSheetExtra({ ...extraFilters })
    setShowSheet(true)
  }
  const applySheet = () => {
    setSort(sheetSort)
    setExtraFilters(sheetExtra)
    setShowSheet(false)
  }
  const resetSheet = () => {
    setSheetSort('distance')
    setSheetExtra({ solo: false, quiet: false })
  }

  // Counts that react to the other filter (so numbers stay honest)
  const catCounts = useMemo(() => {
    let base = [...RESTAURANTS]
    const bObj = BUDGETS.find(b => b.k === budget)
    if (bObj && bObj.max !== Infinity) base = base.filter(r => r.priceMin <= bObj.max)
    if (extraFilters.solo) base = base.filter(r => r.hasSolo)
    if (extraFilters.quiet) base = base.filter(r => r.busy === '여유')
    const counts = {}
    CATS.forEach(c => {
      counts[c.k] = c.k === '전체' ? base.length : base.filter(r => r.category === c.k).length
    })
    return counts
  }, [budget, extraFilters])

  const budgetCounts = useMemo(() => {
    let base = [...RESTAURANTS]
    if (cat !== '전체') base = base.filter(r => r.category === cat)
    if (extraFilters.solo) base = base.filter(r => r.hasSolo)
    if (extraFilters.quiet) base = base.filter(r => r.busy === '여유')
    const counts = {}
    BUDGETS.forEach(b => {
      counts[b.k] = b.max === Infinity ? base.length : base.filter(r => r.priceMin <= b.max).length
    })
    return counts
  }, [cat, extraFilters])

  const filtered = useMemo(() => {
    let list = [...RESTAURANTS]
    if (cat !== '전체') list = list.filter(r => r.category === cat)
    const bObj = BUDGETS.find(b => b.k === budget)
    if (bObj && bObj.max !== Infinity) list = list.filter(r => r.priceMin <= bObj.max)
    if (extraFilters.solo) list = list.filter(r => r.hasSolo)
    if (extraFilters.quiet) list = list.filter(r => r.busy === '여유')
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.tag.toLowerCase().includes(q)
      )
    }
    if (sort === 'distance') return list.sort((a, b) => a.distance - b.distance)
    if (sort === 'rating')   return list.sort((a, b) => b.rating - a.rating)
    if (sort === 'price')    return list.sort((a, b) => a.priceMin - b.priceMin)
    if (sort === 'cookTime') return list.sort((a, b) => a.cookTime - b.cookTime)
    return list
  }, [cat, budget, sort, extraFilters, query])

  // Count how many non-default options are active
  const activeCount =
    (cat !== '전체' ? 1 : 0) +
    (budget !== '전체' ? 1 : 0) +
    (sort !== 'distance' ? 1 : 0) +
    Object.values(extraFilters).filter(Boolean).length

  const todayPick = RESTAURANTS[0]
  const sortLabel = SORTS.find(s => s.k === sort)?.label ?? '거리 가까운 순'

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
            <button onClick={() => go('/my')} style={{ width: 40, height: 40, borderRadius: 14, background: 'linear-gradient(135deg, #FF8904, #FB2C36)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, boxShadow: '0 8px 20px rgba(251,44,54,0.35)', border: 'none', color: '#fff', cursor: 'pointer' }}>김</button>
          </div>
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

        {/* Banner — only when no filter/search active */}
        {!query && activeCount === 0 && (
          <div style={{ padding: '18px 20px 0' }}>
            <div onClick={() => go(`/restaurant/${todayPick.id}`)} style={{ position: 'relative', borderRadius: 22, overflow: 'hidden', background: 'linear-gradient(135deg, #FF8904 0%, #FB2C36 100%)', padding: '20px 18px', minHeight: 148, cursor: 'pointer' }}>
              <div style={{ position: 'absolute', right: -10, bottom: -8, width: 130, height: 148 }}>
                <img src={mascotHero} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.25))' }} />
              </div>
              <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 999, background: 'rgba(0,0,0,0.18)', fontSize: 11, fontWeight: 700, letterSpacing: 0.4 }}>TODAY'S PICK · 오늘의 추천</div>
              <div style={{ marginTop: 10, fontSize: 22, fontWeight: 800, lineHeight: 1.25, maxWidth: 200, letterSpacing: -0.3 }}>오늘 점심은<br/><span style={{ background: 'rgba(255,255,255,0.95)', color: '#FB2C36', padding: '2px 8px', borderRadius: 6 }}>{todayPick.name}</span> 어때?</div>
              <div style={{ marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>⭐ {todayPick.rating} · 도보 {Math.ceil(todayPick.distance/80)}분 · {todayPick.priceMin.toLocaleString()}원~</div>
            </div>
          </div>
        )}

        {/* Category */}
        <div style={{ padding: '22px 0 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>카테고리</div>
            {cat !== '전체' && (
              <button onClick={() => setCat('전체')} style={{ fontSize: 12, color: '#FF8904', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, padding: 0 }}>전체보기</button>
            )}
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', padding: '0 20px', scrollbarWidth: 'none' }}>
            {CATS.map(c => {
              const isActive = cat === c.k
              const count = catCounts[c.k] ?? 0
              return (
                <button key={c.k} onClick={() => setCat(c.k)} style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, background: 'none', border: 'none', cursor: 'pointer', padding: 0, opacity: count === 0 && c.k !== '전체' ? 0.35 : 1 }}>
                  <div style={{ position: 'relative', width: 54, height: 54, borderRadius: 16, background: isActive ? 'linear-gradient(135deg, #FF8904, #FB2C36)' : '#1A1614', border: isActive ? 'none' : '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, boxShadow: isActive ? '0 6px 16px rgba(251,44,54,0.35)' : 'none', transition: 'all 0.15s' }}>
                    {c.icon}
                    <div style={{ position: 'absolute', top: -5, right: -5, minWidth: 17, height: 17, borderRadius: 999, background: isActive ? '#fff' : '#FF8904', color: isActive ? '#FB2C36' : '#fff', fontSize: 9, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>
                      {count}
                    </div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: isActive ? 700 : 500, color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' }}>{c.k}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Budget */}
        <div style={{ marginTop: 16, padding: '0 20px', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {BUDGETS.map(b => {
            const isActive = budget === b.k
            const count = budgetCounts[b.k] ?? 0
            return (
              <button key={b.k} onClick={() => setBudget(b.k)} style={{ flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 14px', borderRadius: 12, fontSize: 12, fontWeight: 600, background: isActive ? 'rgba(255,137,4,0.15)' : 'transparent', border: isActive ? '1.5px solid #FF8904' : '1px solid rgba(255,255,255,0.10)', color: isActive ? '#FF8904' : 'rgba(255,255,255,0.7)', cursor: 'pointer', transition: 'all 0.15s', gap: 2, opacity: count === 0 && b.k !== '전체' ? 0.35 : 1 }}>
                <span style={{ fontWeight: 700 }}>💰 {b.k}</span>
                <span style={{ fontSize: 10, color: isActive ? 'rgba(255,137,4,0.7)' : 'rgba(255,255,255,0.35)' }}>{count}곳</span>
              </button>
            )
          })}
        </div>

        {/* List header */}
        <div style={{ marginTop: 20, padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: -0.3 }}>
              {cat !== '전체' ? cat : '가까운 맛집'} <span style={{ fontSize: 14, color: '#FF8904' }}>{filtered.length}곳</span>
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{sortLabel}</div>
          </div>
          <button onClick={openSheet} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, background: activeCount > 0 ? 'rgba(255,137,4,0.12)' : 'rgba(255,255,255,0.06)', border: activeCount > 0 ? '1.5px solid rgba(255,137,4,0.5)' : '1px solid rgba(255,255,255,0.08)', color: activeCount > 0 ? '#FF8904' : 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
            정렬·필터
            {activeCount > 0 && (
              <span style={{ minWidth: 18, height: 18, borderRadius: 999, background: '#FF8904', color: '#fff', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{activeCount}</span>
            )}
          </button>
        </div>

        {/* Active filter tags */}
        {activeCount > 0 && (
          <div style={{ margin: '10px 20px 0', display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            {cat !== '전체' && <span style={{ fontSize: 11, fontWeight: 700, color: '#FF8904', background: 'rgba(255,137,4,0.12)', padding: '3px 10px', borderRadius: 999, border: '1px solid rgba(255,137,4,0.25)' }}>{cat}</span>}
            {budget !== '전체' && <span style={{ fontSize: 11, fontWeight: 700, color: '#FF8904', background: 'rgba(255,137,4,0.12)', padding: '3px 10px', borderRadius: 999, border: '1px solid rgba(255,137,4,0.25)' }}>{budget}</span>}
            {sort !== 'distance' && <span style={{ fontSize: 11, fontWeight: 700, color: '#FFD56B', background: 'rgba(255,213,107,0.10)', padding: '3px 10px', borderRadius: 999, border: '1px solid rgba(255,213,107,0.2)' }}>{SORTS.find(s => s.k === sort)?.icon} {SORTS.find(s => s.k === sort)?.label}</span>}
            {extraFilters.solo && <span style={{ fontSize: 11, fontWeight: 700, color: '#5BD06A', background: 'rgba(91,208,106,0.10)', padding: '3px 10px', borderRadius: 999, border: '1px solid rgba(91,208,106,0.2)' }}>🪑 혼밥 가능</span>}
            {extraFilters.quiet && <span style={{ fontSize: 11, fontWeight: 700, color: '#5BD06A', background: 'rgba(91,208,106,0.10)', padding: '3px 10px', borderRadius: 999, border: '1px solid rgba(91,208,106,0.2)' }}>🟢 한산한 곳</span>}
            <button onClick={() => { setCat('전체'); setBudget('전체'); setSort('distance'); setExtraFilters({ solo: false, quiet: false }) }} style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, padding: '3px 0' }}>초기화</button>
          </div>
        )}

        {/* Restaurant list */}
        <div style={{ padding: '12px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.length === 0 && (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🍽️</div>
              조건에 맞는 식당이 없어요
              <div style={{ marginTop: 10 }}>
                <button onClick={() => { setCat('전체'); setBudget('전체'); setSort('distance'); setExtraFilters({ solo: false, quiet: false }) }} style={{ fontSize: 13, color: '#FF8904', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>필터 초기화</button>
              </div>
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
                    <span style={{ color: sort === 'rating' ? '#FFD56B' : 'rgba(255,213,107,0.7)', fontWeight: sort === 'rating' ? 800 : 600, fontSize: sort === 'rating' ? 13 : 12 }}>★ {r.rating}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
                    <span style={{ color: sort === 'cookTime' ? '#5BD06A' : 'rgba(255,255,255,0.55)', fontWeight: sort === 'cookTime' ? 700 : 400 }}>⏱ {r.cookTime}분</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
                    <span style={{ fontWeight: sort === 'price' ? 800 : 700, color: sort === 'price' ? '#FFB261' : '#fff', fontSize: sort === 'price' ? 13 : 12 }}>{r.priceMin.toLocaleString()}원~</span>
                  </div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
                    {r.hasSolo && <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 7px', borderRadius: 6, background: 'rgba(91,208,106,0.10)', color: '#5BD06A' }}>🪑 1인석</span>}
                    <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 7px', borderRadius: 6, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)' }}>⏱ {r.cookTime}분</span>
                    {sort === 'distance' && <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 7px', borderRadius: 6, background: 'rgba(81,162,255,0.10)', color: '#51A2FF' }}>📍 {r.distance}m</span>}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <TabBar />

      {/* Filter/Sort Bottom Sheet */}
      {showSheet && (
        <>
          <div
            onClick={() => setShowSheet(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 90, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(4px)' }}
          />
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100, background: '#1C1714', borderRadius: '24px 24px 0 0', padding: '0 20px 40px', maxHeight: '80vh', overflowY: 'auto', animation: 'slideUp 0.25s ease-out', boxShadow: '0 -20px 60px rgba(0,0,0,0.6)' }}>
            {/* Handle */}
            <div style={{ width: 36, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.18)', margin: '14px auto 20px' }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div style={{ fontSize: 17, fontWeight: 800 }}>정렬 · 필터</div>
              <button onClick={resetSheet} style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>초기화</button>
            </div>

            {/* Sort */}
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: 0.5, marginBottom: 10 }}>정렬 기준</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 28 }}>
              {SORTS.map(s => {
                const isActive = sheetSort === s.k
                return (
                  <button key={s.k} onClick={() => setSheetSort(s.k)} style={{ padding: '13px 16px', borderRadius: 14, fontSize: 13, fontWeight: 700, textAlign: 'left', background: isActive ? 'rgba(255,137,4,0.12)' : 'rgba(255,255,255,0.04)', border: isActive ? '1.5px solid #FF8904' : '1px solid rgba(255,255,255,0.07)', color: isActive ? '#FF8904' : 'rgba(255,255,255,0.75)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{s.icon}</span>
                    <span>{s.label}</span>
                    {isActive && <span style={{ marginLeft: 'auto', fontSize: 14 }}>✓</span>}
                  </button>
                )
              })}
            </div>

            {/* Extra filters */}
            <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.45)', letterSpacing: 0.5, marginBottom: 10 }}>추가 필터</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
              {EXTRA_FILTERS.map(f => {
                const isActive = sheetExtra[f.k]
                return (
                  <button key={f.k} onClick={() => setSheetExtra(prev => ({ ...prev, [f.k]: !prev[f.k] }))} style={{ padding: '11px 18px', borderRadius: 999, fontSize: 13, fontWeight: 700, background: isActive ? 'rgba(91,208,106,0.12)' : 'rgba(255,255,255,0.04)', border: isActive ? '1.5px solid #5BD06A' : '1px solid rgba(255,255,255,0.07)', color: isActive ? '#5BD06A' : 'rgba(255,255,255,0.75)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                    {f.icon} {f.label}
                    {isActive && <span style={{ fontSize: 12 }}>✓</span>}
                  </button>
                )
              })}
            </div>

            {/* Apply */}
            <button onClick={applySheet} style={{ width: '100%', height: 54, borderRadius: 14, background: 'linear-gradient(135deg, #FF8904, #FB2C36)', color: '#fff', fontSize: 15, fontWeight: 800, border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(251,44,54,0.35)' }}>
              적용하기
            </button>
          </div>
        </>
      )}
    </div>
  )
}
