import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RESTAURANTS } from '../data/restaurants'
import { useApp } from '../store/AppStore'

const RATING_BARS = [{ pct: '72%', cnt: 235 }, { pct: '20%', cnt: 65 }, { pct: '5%', cnt: 16 }, { pct: '2%', cnt: 6 }, { pct: '1%', cnt: 4 }]

function starStr(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n)
}

export default function Detail() {
  const go = useNavigate()
  const { id } = useParams()
  const { toggleWishlist, isWished, getReviews } = useApp()
  const [toast, setToast] = useState('')

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 1800)
  }

  const restaurant = RESTAURANTS.find(r => r.id === Number(id))

  if (!restaurant) {
    return (
      <div style={{ width: '100%', height: '100dvh', background: '#0E0B09', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <div style={{ fontSize: 48 }}>🍽️</div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>식당을 찾을 수 없어요</div>
        <button onClick={() => go('/home')} style={{ padding: '12px 24px', borderRadius: 14, background: 'linear-gradient(135deg, #FF8904, #FB2C36)', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>홈으로</button>
      </div>
    )
  }

  const wished = isWished(restaurant.id)
  const userReviews = getReviews(restaurant.id)
  const badges = [
    { t: restaurant.tag, c: '#FFB261', bg: 'rgba(255,137,4,0.15)' },
    ...(restaurant.hasSolo ? [{ t: '🪑 1인석 있음', c: '#5BD06A', bg: 'rgba(91,208,106,0.12)' }] : []),
    { t: `⏱ ${restaurant.cookTime}분 조리`, c: '#51A2FF', bg: 'rgba(81,162,255,0.12)' },
  ]

  const openNav = () => {
    window.open(`https://map.kakao.com/?q=${encodeURIComponent(restaurant.address)}`, '_blank')
  }

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(restaurant.address)
      showToast('주소가 복사되었어요')
    } catch {
      showToast('복사 실패')
    }
  }

  const share = async () => {
    const url = window.location.href
    const text = `${restaurant.name} · ⭐${restaurant.rating} · ${restaurant.category}`
    if (navigator.share) {
      try {
        await navigator.share({ title: restaurant.name, text, url })
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(url)
        showToast('링크가 복사되었어요')
      } catch {
        showToast('공유 실패')
      }
    }
  }

  return (
    <div style={{ width: '100%', height: '100dvh', background: '#0E0B09', position: 'relative', color: '#fff', overflow: 'hidden' }}>
      <div className="screen-wrap" style={{ paddingBottom: 96 }}>

        {/* Hero */}
        <div style={{ position: 'relative', height: 260, background: 'linear-gradient(180deg, #3A2A1E, #1A1310)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 30% 40%, rgba(255,137,4,0.35), transparent 60%), radial-gradient(circle at 70% 60%, rgba(251,44,54,0.30), transparent 60%)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 90, opacity: 0.85, filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.5))' }}>{restaurant.emoji}</div>
          {/* Top bar */}
          <div style={{ position: 'absolute', top: 52, left: 16, right: 16, display: 'flex', justifyContent: 'space-between', zIndex: 5 }}>
            <button onClick={() => go(-1)} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={share} style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 12v8a1 1 0 001 1h14a1 1 0 001-1v-8M16 6l-4-4-4 4M12 2v13" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button
                onClick={() => toggleWishlist(restaurant.id)}
                style={{ width: 40, height: 40, borderRadius: 12, background: wished ? 'rgba(251,44,54,0.35)' : 'rgba(0,0,0,0.5)', backdropFilter: 'blur(12px)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer', transition: 'background 0.2s' }}
              >
                {wished ? '❤️' : '♡'}
              </button>
            </div>
          </div>
          {/* dots */}
          <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 4 }}>
            {[0,1,2,3].map(i => <div key={i} style={{ width: i===0?18:5, height: 5, borderRadius: 999, background: i===0?'#fff':'rgba(255,255,255,0.4)' }} />)}
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: '18px 20px 0' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
            {badges.map(b => (
              <span key={b.t} style={{ fontSize: 10, fontWeight: 700, padding: '4px 9px', borderRadius: 6, background: b.bg, color: b.c }}>{b.t}</span>
            ))}
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>{restaurant.name}</div>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
            <span style={{ color: '#FFD56B', fontWeight: 800 }}>★ {restaurant.rating}</span>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>(리뷰 {restaurant.reviewCount + userReviews.length})</span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>{restaurant.category}</span>
          </div>
          <div style={{ marginTop: 14, padding: 14, borderRadius: 14, background: '#1A1614', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 20 }}>📍</span>
              <span style={{ color: 'rgba(255,255,255,0.85)', flex: 1 }}>{restaurant.address} · 도보 {Math.ceil(restaurant.distance/80)}분</span>
              <button onClick={copyAddress} style={{ color: '#FF8904', fontSize: 12, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px' }}>복사</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 20 }}>🕒</span>
              <span style={{ color: 'rgba(255,255,255,0.85)', flex: 1 }}>
                <span style={{ color: '#5BD06A', fontWeight: 700 }}>영업중</span> · {restaurant.hours}
                {restaurant.breakTime && <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11 }}> (브레이크 {restaurant.breakTime})</span>}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 20 }}>💰</span>
              <span style={{ color: 'rgba(255,255,255,0.85)', flex: 1 }}>1인 평균 <b style={{ color: '#fff' }}>{Math.round((restaurant.priceMin + restaurant.priceMax) / 2 / 500) * 500 / 1000 * 1000 > 0 ? ((restaurant.priceMin + restaurant.priceMax) / 2).toLocaleString() : '?'}원</b></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 20 }}>📊</span>
              <span style={{ color: 'rgba(255,255,255,0.85)', flex: 1 }}>지금 혼잡도</span>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999, color: restaurant.busy === '여유' ? '#5BD06A' : restaurant.busy === '보통' ? '#FFB261' : '#FF6B6B', background: restaurant.busy === '여유' ? 'rgba(91,208,106,0.12)' : restaurant.busy === '보통' ? 'rgba(255,178,97,0.12)' : 'rgba(255,107,107,0.12)' }}>● {restaurant.busy}</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div style={{ padding: '24px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: -0.3 }}>대표 메뉴</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>전체 {restaurant.menus.length}개</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {restaurant.menus.map((m, i) => (
              <div key={i} style={{ padding: 12, borderRadius: 14, background: '#1A1614', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: 10, flexShrink: 0, background: 'repeating-linear-gradient(135deg, #2A211B 0 4px, #221B17 4px 8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{m.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{m.name}</span>
                    {m.tag && <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: m.tag==='베스트'?'#FB2C36':'rgba(255,137,4,0.18)', color: m.tag==='베스트'?'#fff':'#FFB261' }}>{m.tag}</span>}
                  </div>
                  {m.desc && <div style={{ marginTop: 2, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{m.desc}</div>}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#FFB261', flexShrink: 0 }}>{m.price.toLocaleString()}원</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div style={{ padding: '28px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: -0.3 }}>학생 리뷰</div>
            <div style={{ fontSize: 12, color: '#FF8904', fontWeight: 700 }}>전체 {restaurant.reviewCount + userReviews.length}개 ›</div>
          </div>
          {/* Rating summary */}
          <div style={{ padding: 14, borderRadius: 14, background: '#1A1614', border: '1px solid rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 34, fontWeight: 800, color: '#FFD56B', lineHeight: 1 }}>{restaurant.rating}</div>
              <div style={{ marginTop: 5, fontSize: 12, color: '#FFD56B' }}>{'★'.repeat(Math.round(restaurant.rating))}</div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[5,4,3,2,1].map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10 }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', width: 10 }}>{s}</span>
                  <div style={{ flex: 1, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.06)' }}>
                    <div style={{ width: RATING_BARS[i].pct, height: '100%', borderRadius: 999, background: '#FFD56B' }} />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.4)', width: 22, textAlign: 'right' }}>{RATING_BARS[i].cnt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User reviews first (newest) */}
          {userReviews.length > 0 && (
            <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {userReviews.map((r, i) => (
                <div key={`user-${i}`} style={{ padding: 14, borderRadius: 14, background: '#1A1614', border: '1px solid rgba(255,137,4,0.18)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'linear-gradient(135deg, #FF8904, #FB2C36)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>나</div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700 }}>{r.author} <span style={{ fontSize: 9, color: '#FF8904', fontWeight: 600, padding: '1px 5px', borderRadius: 4, background: 'rgba(255,137,4,0.15)' }}>NEW</span></div>
                        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>{r.date}</div>
                      </div>
                    </div>
                    <div style={{ color: '#FFD56B', fontSize: 13, fontWeight: 700 }}>{starStr(r.rating)}</div>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>{r.text}</div>
                  <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {r.tags.map(t => <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: '4px 8px', borderRadius: 999, background: 'rgba(255,137,4,0.10)', color: '#FFB261' }}># {t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Seed reviews */}
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {restaurant.seedReviews.map((r, i) => (
              <div key={`seed-${i}`} style={{ padding: 14, borderRadius: 14, background: '#1A1614', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: ['linear-gradient(135deg, #FF8904, #FB2C36)', 'linear-gradient(135deg, #51A2FF, #2B7FFF)', 'linear-gradient(135deg, #5BD06A, #2EA043)'][i % 3], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{r.author.charAt(0)}</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>{r.author}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>{r.when}</div>
                    </div>
                  </div>
                  <div style={{ color: '#FFD56B', fontSize: 13, fontWeight: 700 }}>{starStr(r.rating)}</div>
                </div>
                <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>{r.text}</div>
                <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {r.tags.map(t => <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: '4px 8px', borderRadius: 999, background: 'rgba(255,137,4,0.10)', color: '#FFB261' }}># {t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action bar */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'rgba(13,11,9,0.96)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px 16px 32px', display: 'flex', gap: 8 }}>
        <button
          onClick={() => toggleWishlist(restaurant.id)}
          style={{ width: 52, height: 52, borderRadius: 14, border: wished ? '1px solid rgba(251,44,54,0.4)' : '1px solid rgba(255,255,255,0.08)', background: wished ? 'rgba(251,44,54,0.15)' : 'rgba(255,255,255,0.04)', color: '#fff', fontSize: 22, cursor: 'pointer', transition: 'all 0.2s' }}
        >
          {wished ? '❤️' : '♡'}
        </button>
        <button onClick={openNav} style={{ flex: 1, height: 52, borderRadius: 14, border: '1px solid rgba(255,137,4,0.4)', background: 'rgba(255,137,4,0.08)', color: '#FFB261', fontSize: 15, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l9 7v11h-6v-7H9v7H3V9l9-7z" stroke="#FFB261" strokeWidth="2" strokeLinejoin="round"/></svg>
          길찾기
        </button>
        <button onClick={() => go(`/review/${restaurant.id}`)} style={{ flex: 1.4, height: 52, borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #FF8904, #FB2C36)', color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 24px rgba(251,44,54,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>✍️ 리뷰 쓰기</button>
      </div>

      {toast && (
        <div style={{ position: 'absolute', bottom: 96, left: '50%', transform: 'translateX(-50%)', background: 'rgba(13,11,9,0.95)', backdropFilter: 'blur(12px)', color: '#fff', fontSize: 13, fontWeight: 600, padding: '12px 22px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 24px rgba(0,0,0,0.5)', zIndex: 200, animation: 'toast 1.8s ease-out forwards', whiteSpace: 'nowrap' }}>
          {toast}
        </div>
      )}
    </div>
  )
}
