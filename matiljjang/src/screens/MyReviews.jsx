import { useNavigate } from 'react-router-dom'
import TabBar from '../components/TabBar'
import { RESTAURANTS } from '../data/restaurants'
import { useApp } from '../store/AppStore'

function starStr(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n)
}

export default function MyReviews() {
  const go = useNavigate()
  const { state } = useApp()

  const reviewsByRestaurant = state.reviews.map(r => ({
    ...r,
    restaurant: RESTAURANTS.find(x => x.id === r.restaurantId),
  })).filter(r => r.restaurant)

  return (
    <div style={{ width: '100%', height: '100dvh', background: '#0E0B09', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div className="screen-wrap" style={{ paddingBottom: 90 }}>
        <div style={{ padding: '56px 20px 0' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>✍️ MY REVIEWS</div>
          <div style={{ marginTop: 4, fontSize: 22, fontWeight: 800, letterSpacing: -0.3 }}>내가 쓴 리뷰 <span style={{ color: '#FF8904' }}>{reviewsByRestaurant.length}개</span></div>
          <div style={{ marginTop: 4, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>리뷰 1개당 50P 적립 · 누적 <span style={{ color: '#FFD56B', fontWeight: 700 }}>{reviewsByRestaurant.length * 50}P</span></div>
        </div>

        {reviewsByRestaurant.length === 0 ? (
          <div style={{ padding: '80px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 60, marginBottom: 16, opacity: 0.4 }}>📝</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>아직 작성한 리뷰가 없어요</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24 }}>
              방문한 가게에서 리뷰를 남기고 포인트를 받아보세요
            </div>
            <button
              onClick={() => go('/home')}
              style={{ padding: '14px 28px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #FF8904, #FB2C36)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', boxShadow: '0 8px 24px rgba(251,44,54,0.35)' }}
            >
              맛집 찾아보기 →
            </button>
          </div>
        ) : (
          <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {reviewsByRestaurant.map((r, i) => (
              <div key={i} onClick={() => go(`/restaurant/${r.restaurant.id}`)} style={{ background: '#1A1614', borderRadius: 16, padding: 14, cursor: 'pointer', border: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: 'repeating-linear-gradient(135deg, #2A211B 0 4px, #221B17 4px 8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{r.restaurant.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.restaurant.name}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{r.date} · {r.restaurant.category}</div>
                  </div>
                  <div style={{ color: '#FFD56B', fontSize: 13, fontWeight: 700 }}>{starStr(r.rating)}</div>
                </div>
                <div style={{ fontSize: 13, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>{r.text}</div>
                {r.tags?.length > 0 && (
                  <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {r.tags.map(t => <span key={t} style={{ fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 999, background: 'rgba(255,137,4,0.10)', color: '#FFB261' }}># {t}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <TabBar />
    </div>
  )
}
