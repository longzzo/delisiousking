import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../store/AppStore'
import mascotHero from '../assets/mascot-hero.png'
import mascotThink from '../assets/mascot-think.png'
import mascotSurprise from '../assets/mascot-surprise.png'
import mascotHappy from '../assets/mascot-happy.png'

const SLIDES = [
  {
    img: mascotSurprise,
    badge: '맛일짱만의 기능 ①',
    title: '지금 한산한 곳만\n콕 집어줘요',
    desc: '실시간 혼잡도로 줄 서는 시간 0분.\n공강 시간 알차게 쓰세요.',
    color: '#5BD06A',
  },
  {
    img: mascotThink,
    badge: '맛일짱만의 기능 ②',
    title: '혼밥도 눈치 없이\n편하게',
    desc: '1인석 있는 가게만 모아보기.\n혼자여도 당당하게 한 끼.',
    color: '#51A2FF',
  },
  {
    img: mascotHappy,
    badge: '맛일짱만의 기능 ③',
    title: '공강 10분 컷\n빠른 조리 맛집',
    desc: '조리시간까지 알려주니까\n다음 수업 늦을 걱정 없어요.',
    color: '#FF8904',
  },
  {
    img: mascotHero,
    badge: '맛일짱만의 기능 ④',
    title: '찜할수록 쌓이는\n포인트 · 스티커 · 쿠폰',
    desc: '찜하고 리뷰 쓰면 보상이 팡팡!\n스티커 도감을 모두 모아보세요.',
    color: '#FB2C36',
  },
]

export default function Onboarding() {
  const go = useNavigate()
  const { markOnboardingSeen } = useApp()
  const [i, setI] = useState(0)
  const slide = SLIDES[i]
  const last = i === SLIDES.length - 1

  const finish = () => {
    markOnboardingSeen()
    go('/home')
  }
  const next = () => (last ? finish() : setI(i + 1))

  return (
    <div style={{ width: '100%', height: '100dvh', background: '#0E0B09', color: '#fff', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* skip */}
      <div style={{ position: 'absolute', top: 52, right: 20, zIndex: 5 }}>
        <button onClick={finish} style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.45)', background: 'none', border: 'none', cursor: 'pointer' }}>건너뛰기</button>
      </div>

      {/* glow */}
      <div style={{ position: 'absolute', top: '14%', left: '50%', transform: 'translateX(-50%)', width: 320, height: 320, borderRadius: '50%', background: `radial-gradient(circle, ${slide.color}33, transparent 70%)`, transition: 'background 0.4s' }} />

      {/* content */}
      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', textAlign: 'center', animation: 'pageIn 0.4s ease-out' }}>
        <img src={slide.img} alt="" style={{ width: 210, height: 210, objectFit: 'contain', filter: `drop-shadow(0 16px 32px ${slide.color}55)` }} />
        <div style={{ marginTop: 28, fontSize: 12, fontWeight: 800, letterSpacing: 1, color: slide.color }}>{slide.badge}</div>
        <div style={{ marginTop: 12, fontSize: 27, fontWeight: 800, lineHeight: 1.3, letterSpacing: -0.5, whiteSpace: 'pre-line' }}>{slide.title}</div>
        <div style={{ marginTop: 14, fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', whiteSpace: 'pre-line' }}>{slide.desc}</div>
      </div>

      {/* dots + button */}
      <div style={{ padding: '0 24px 44px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginBottom: 24 }}>
          {SLIDES.map((_, idx) => (
            <div key={idx} onClick={() => setI(idx)} style={{ width: idx === i ? 22 : 7, height: 7, borderRadius: 999, background: idx === i ? slide.color : 'rgba(255,255,255,0.2)', cursor: 'pointer', transition: 'all 0.25s' }} />
          ))}
        </div>
        <button onClick={next} style={{ width: '100%', height: 56, borderRadius: 16, border: 'none', background: last ? 'linear-gradient(135deg, #FF8904, #FB2C36)' : 'rgba(255,255,255,0.08)', color: '#fff', fontSize: 16, fontWeight: 800, cursor: 'pointer', boxShadow: last ? '0 10px 28px rgba(251,44,54,0.4)' : 'none', transition: 'all 0.25s' }}>
          {last ? '맛일짱 시작하기 🍴' : '다음'}
        </button>
      </div>
    </div>
  )
}
