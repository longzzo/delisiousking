import { useEffect } from 'react'
import { useApp } from '../store/AppStore'
import { STICKER_IMG } from '../data/stickerImages'

export default function RewardLayer() {
  const { state, dismissReward } = useApp()
  const event = state.rewardQueue[0]

  // 토스트는 자동 사라짐
  useEffect(() => {
    if (event && event.type === 'toast') {
      const t = setTimeout(() => dismissReward(event.id), 1700)
      return () => clearTimeout(t)
    }
  }, [event, dismissReward])

  if (!event) return null

  if (event.type === 'toast') {
    return (
      <div style={{ position: 'fixed', bottom: 104, left: '50%', transform: 'translateX(-50%)', zIndex: 9000, pointerEvents: 'none', background: 'rgba(13,11,9,0.96)', backdropFilter: 'blur(12px)', color: '#fff', fontSize: 13, fontWeight: 700, padding: '12px 22px', borderRadius: 999, border: '1px solid rgba(255,137,4,0.4)', boxShadow: '0 8px 28px rgba(0,0,0,0.55)', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8, animation: 'toast 1.7s ease-out forwards' }}>
        <span style={{ fontSize: 16 }}>{event.icon}</span>
        {event.text}
      </div>
    )
  }

  // unlock 모달
  const sticker = event.stickers?.[0]
  const coupon = event.coupons?.[0]
  return (
    <div
      onClick={() => dismissReward(event.id)}
      style={{ position: 'fixed', inset: 0, zIndex: 9000, background: 'rgba(8,6,5,0.86)', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, animation: 'fadeIn 0.25s ease-out' }}
    >
      <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, color: '#FFB261' }}>🎉 NEW UNLOCK</div>

      {sticker && (
        <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'pop 0.5s cubic-bezier(.2,1.4,.4,1)' }}>
          <div style={{ position: 'relative', width: 168, height: 168, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,137,4,0.30), transparent 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={STICKER_IMG[sticker.id]} alt={sticker.name} style={{ width: 140, height: 140, objectFit: 'contain', filter: 'drop-shadow(0 14px 28px rgba(255,137,4,0.5))' }} />
          </div>
          <div style={{ marginTop: 14, fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.55)' }}>스티커 획득</div>
          <div style={{ marginTop: 4, fontSize: 26, fontWeight: 800, color: '#fff' }}>{sticker.emoji} {sticker.name}</div>
          <div style={{ marginTop: 6, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{sticker.desc}</div>
        </div>
      )}

      {coupon && (
        <div style={{ marginTop: sticker ? 24 : 22, width: '100%', maxWidth: 320, animation: 'pop 0.5s cubic-bezier(.2,1.4,.4,1) 0.1s both' }}>
          <div style={{ padding: 18, borderRadius: 18, background: 'linear-gradient(135deg, #FF8904, #FB2C36)', display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 14px 32px rgba(251,44,54,0.4)' }}>
            <div style={{ fontSize: 38 }}>{coupon.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>쿠폰 획득</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>{coupon.title}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>{coupon.desc}</div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => dismissReward(event.id)}
        style={{ marginTop: 32, padding: '14px 40px', borderRadius: 14, border: 'none', background: 'rgba(255,255,255,0.12)', color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}
      >
        좋아요!
      </button>
    </div>
  )
}
