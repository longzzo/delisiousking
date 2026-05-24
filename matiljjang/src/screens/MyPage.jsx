import { useNavigate } from 'react-router-dom'
import TabBar from '../components/TabBar'
import { useApp } from '../store/AppStore'

export default function MyPage() {
  const go = useNavigate()
  const { state } = useApp()

  const point = state.reviews.length * 50
  const wishCount = state.wishlist.length
  const reviewCount = state.reviews.length

  const menus = [
    { icon: '📍', label: '방문 기록', value: `${reviewCount}곳`, path: '/my-reviews' },
    { icon: '🎁', label: '쿠폰함', value: '3장', path: null },
    { icon: '🏆', label: '학생 인증', value: '경일대 ✓', path: null },
    { icon: '🔔', label: '알림 설정', value: '', path: null },
    { icon: '❓', label: '고객센터', value: '', path: null },
    { icon: '📋', label: '이용약관', value: '', path: null },
  ]

  const logout = () => {
    if (confirm('로그아웃 하시겠어요?')) go('/login')
  }

  return (
    <div style={{ width: '100%', height: '100dvh', background: '#0E0B09', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div className="screen-wrap" style={{ paddingBottom: 90 }}>

        {/* Header */}
        <div style={{ padding: '56px 20px 0' }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>👤 MY PAGE</div>
          <div style={{ marginTop: 4, fontSize: 22, fontWeight: 800, letterSpacing: -0.3 }}>내 정보</div>
        </div>

        {/* Profile card */}
        <div style={{ margin: '20px 20px 0', padding: 18, borderRadius: 18, background: 'linear-gradient(135deg, rgba(255,137,4,0.10), rgba(251,44,54,0.06))', border: '1px solid rgba(255,137,4,0.20)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 60, height: 60, borderRadius: 18, background: 'linear-gradient(135deg, #FF8904, #FB2C36)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 22, boxShadow: '0 10px 24px rgba(251,44,54,0.35)' }}>김</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 800 }}>김짱이 <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 999, background: 'rgba(255,137,4,0.2)', color: '#FFB261', fontWeight: 700, marginLeft: 4 }}>학생 인증</span></div>
              <div style={{ marginTop: 3, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>경일대학교 · 컴퓨터공학과</div>
            </div>
          </div>
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
            <button onClick={() => go('/wish')} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center', padding: 0 }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{wishCount}</div>
              <div style={{ marginTop: 2, fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>찜한 곳</div>
            </button>
            <button onClick={() => go('/my-reviews')} style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center', padding: 0, borderLeft: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{reviewCount}</div>
              <div style={{ marginTop: 2, fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>리뷰</div>
            </button>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#FFD56B' }}>{point.toLocaleString()}P</div>
              <div style={{ marginTop: 2, fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>적립금</div>
            </div>
          </div>
        </div>

        {/* Menu list */}
        <div style={{ margin: '20px 20px 0', borderRadius: 16, background: '#1A1614', border: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden' }}>
          {menus.map((m, i) => (
            <button
              key={m.label}
              onClick={() => m.path ? go(m.path) : alert('준비 중인 기능이에요')}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', background: 'none', border: 'none', borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', textAlign: 'left' }}
            >
              <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{m.icon}</span>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#fff' }}>{m.label}</span>
              {m.value && <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{m.value}</span>}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          ))}
        </div>

        <div style={{ margin: '20px 20px 0', textAlign: 'center' }}>
          <button onClick={logout} style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 16px', textDecoration: 'underline' }}>로그아웃</button>
        </div>

        <div style={{ margin: '12px 20px 0', textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>맛일짱 v1.0.0</div>
      </div>
      <TabBar />
    </div>
  )
}
