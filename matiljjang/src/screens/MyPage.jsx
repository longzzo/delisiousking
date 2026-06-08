import { useNavigate } from 'react-router-dom'
import TabBar from '../components/TabBar'
import { useApp } from '../store/AppStore'
import { STICKERS, COUPONS } from '../data/rewards'
import { STICKER_IMG } from '../data/stickerImages'

export default function MyPage() {
  const go = useNavigate()
  const { state, resetOnboarding } = useApp()

  const point = state.points
  const wishCount = state.wishlist.length
  const reviewCount = state.reviews.length
  const ownedStickers = state.stickers
  const ownedCoupons = COUPONS.filter(c => state.coupons.includes(c.id))
  const nextCoupon = COUPONS.find(c => !state.coupons.includes(c.id))

  const replayIntro = () => {
    resetOnboarding()
    go('/onboarding')
  }
  const logout = () => {
    if (confirm('로그아웃 하시겠어요?')) go('/login')
  }

  const menus = [
    { icon: '📍', label: '방문 기록', value: `${reviewCount}곳`, action: () => go('/my-reviews') },
    { icon: '🎯', label: '입맛 다시 진단', value: '', action: () => go('/taste') },
    { icon: '🎬', label: '맛일짱 소개 다시보기', value: '', action: replayIntro },
    { icon: '🏆', label: '학생 인증', value: '경일대 ✓', action: () => alert('이미 인증된 계정이에요') },
    { icon: '🔔', label: '알림 설정', value: '', action: () => alert('준비 중인 기능이에요') },
    { icon: '❓', label: '고객센터', value: '', action: () => alert('준비 중인 기능이에요') },
  ]

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
          <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 14 }}>
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

        {/* Sticker collection (도감) */}
        <div style={{ margin: '24px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 800 }}>스티커 도감</div>
            <div style={{ fontSize: 12, color: '#FF8904', fontWeight: 700 }}>{ownedStickers.length} / {STICKERS.length} 수집</div>
          </div>
          <div style={{ padding: 16, borderRadius: 18, background: '#1A1614', border: '1px solid rgba(255,255,255,0.05)', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {STICKERS.map(s => {
              const owned = ownedStickers.includes(s.id)
              return (
                <div key={s.id} title={s.desc} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: owned ? 'rgba(255,137,4,0.10)' : 'rgba(255,255,255,0.03)', border: owned ? '1px solid rgba(255,137,4,0.3)' : '1px dashed rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {owned
                      ? <img src={STICKER_IMG[s.id]} alt={s.name} style={{ width: 44, height: 44, objectFit: 'contain' }} />
                      : <span style={{ fontSize: 20, opacity: 0.4 }}>🔒</span>}
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 700, color: owned ? '#FFB261' : 'rgba(255,255,255,0.3)' }}>{owned ? s.name : '???'}</span>
                </div>
              )
            })}
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>찜하고 리뷰 쓰면 새 스티커가 해금돼요 🎁</div>
        </div>

        {/* Coupon wallet (쿠폰함) */}
        <div style={{ margin: '24px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 16, fontWeight: 800 }}>쿠폰함</div>
            <div style={{ fontSize: 12, color: '#FF8904', fontWeight: 700 }}>{ownedCoupons.length}장 보유</div>
          </div>

          {ownedCoupons.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: nextCoupon ? 10 : 0 }}>
              {ownedCoupons.map(c => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 16, background: 'linear-gradient(135deg, #FF8904, #FB2C36)', boxShadow: '0 8px 20px rgba(251,44,54,0.25)' }}>
                  <div style={{ fontSize: 30 }}>{c.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 800 }}>{c.title}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>{c.desc}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.2)' }}>사용하기</span>
                </div>
              ))}
            </div>
          )}

          {nextCoupon && (
            <div style={{ padding: 14, borderRadius: 16, background: '#1A1614', border: '1px dashed rgba(255,255,255,0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ fontSize: 24, opacity: 0.5 }}>{nextCoupon.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{nextCoupon.title}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{nextCoupon.at}P 달성 시 자동 지급</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#FFB261' }}>{Math.max(0, nextCoupon.at - point)}P 남음</div>
              </div>
              <div style={{ marginTop: 10, height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <div style={{ width: `${Math.min(100, (point / nextCoupon.at) * 100)}%`, height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, #FF8904, #FB2C36)', transition: 'width 0.4s' }} />
              </div>
            </div>
          )}

          {ownedCoupons.length === 0 && !nextCoupon && (
            <div style={{ padding: '20px 0', textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>모든 쿠폰을 모았어요! 🎉</div>
          )}
        </div>

        {/* Menu list */}
        <div style={{ margin: '24px 20px 0', borderRadius: 16, background: '#1A1614', border: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden' }}>
          {menus.map((m, i) => (
            <button
              key={m.label}
              onClick={m.action}
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
        <div style={{ margin: '12px 20px 0', textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>맛일짱 v1.1.0</div>
      </div>
      <TabBar />
    </div>
  )
}
