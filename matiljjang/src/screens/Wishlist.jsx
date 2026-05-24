import { useNavigate } from 'react-router-dom'
import TabBar from '../components/TabBar'
import { RESTAURANTS } from '../data/restaurants'
import { useApp } from '../store/AppStore'

const busyColor = (b) => b === '여유'
  ? { color: '#5BD06A', bg: 'rgba(91,208,106,0.12)' }
  : b === '보통'
  ? { color: '#FFB261', bg: 'rgba(255,178,97,0.12)' }
  : { color: '#FF6B6B', bg: 'rgba(255,107,107,0.12)' }

export default function Wishlist() {
  const go = useNavigate()
  const { state, toggleWishlist } = useApp()

  const wished = RESTAURANTS.filter(r => state.wishlist.includes(r.id))

  return (
    <div style={{ width: '100%', height: '100dvh', background: '#0E0B09', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div className="screen-wrap" style={{ paddingBottom: 90 }}>
        <div style={{ padding: '56px 20px 0' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>❤️ MY WISHLIST</div>
          <div style={{ marginTop: 4, fontSize: 22, fontWeight: 800, letterSpacing: -0.3 }}>찜한 맛집 <span style={{ color: '#FF8904' }}>{wished.length}곳</span></div>
        </div>

        {wished.length === 0 ? (
          <div style={{ padding: '80px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 60, marginBottom: 16, opacity: 0.4 }}>💔</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>아직 찜한 맛집이 없어요</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
              마음에 드는 가게에 하트를 눌러보세요
            </div>
            <button
              onClick={() => go('/home')}
              style={{ padding: '14px 28px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #FF8904, #FB2C36)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 24px rgba(251,44,54,0.35)' }}
            >
              맛집 둘러보기 →
            </button>
          </div>
        ) : (
          <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {wished.map(r => {
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
                      <button
                        onClick={e => { e.stopPropagation(); toggleWishlist(r.id) }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, padding: 0, lineHeight: 1, color: '#FB2C36' }}
                      >❤️</button>
                    </div>
                    <div style={{ marginTop: 3, fontSize: 12, color: 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.category} · 도보 {Math.ceil(r.distance/80)}분 ({r.distance}m)</div>
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                      <span style={{ color: '#FFD56B', fontWeight: 700 }}>★ {r.rating}</span>
                      <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
                      <span style={{ color: 'rgba(255,255,255,0.55)' }}>리뷰 {r.reviewCount}</span>
                      <span style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
                      <span style={{ fontWeight: 700 }}>{r.priceMin.toLocaleString()}원~</span>
                    </div>
                    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999, color: bc.color, background: bc.bg }}>● {r.busy}</div>
                      {r.hasSolo && <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 7px', borderRadius: 6, background: 'rgba(91,208,106,0.10)', color: '#5BD06A' }}>🪑 1인석</span>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      <TabBar />
    </div>
  )
}
