import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../store/AppStore'
import { addVec, matchPersonas } from '../data/taste'
import { STICKER_IMG } from '../data/stickerImages'

// 각 보기는 취향 차원에 점수를 더한다
const QUESTIONS = [
  {
    q: '평소 점심, 가장 중요한 건?',
    opts: [
      { label: '💰 가성비', vec: { 가성비: 1, 든든: 0.4 } },
      { label: '🍚 든든함', vec: { 든든: 1, 한식: 0.5 } },
      { label: '🪑 혼밥 편함', vec: { 혼밥: 1, 빠름: 0.5 } },
      { label: '✨ 분위기', vec: { 분위기: 1, 카페: 0.5 } },
    ],
  },
  {
    q: '오늘 같은 날 끌리는 맛은?',
    opts: [
      { label: '🌶️ 화끈 매콤', vec: { 매운맛: 1, 한식: 0.4, 분식: 0.4 } },
      { label: '🍱 담백 깔끔', vec: { 일식: 0.7, 분위기: 0.4 } },
      { label: '🍗 푸짐 든든', vec: { 든든: 1, 치킨: 0.5 } },
      { label: '🍰 디저트·커피', vec: { 카페: 1, 분위기: 0.7 } },
    ],
  },
  {
    q: '선호하는 메뉴군은?',
    opts: [
      { label: '🍚 한식', vec: { 한식: 1, 든든: 0.5 } },
      { label: '🍣 일식·중식', vec: { 일식: 0.8, 중식: 0.8 } },
      { label: '🍢 분식·치킨', vec: { 분식: 0.9, 치킨: 0.7, 가성비: 0.4 } },
      { label: '☕ 카페·브런치', vec: { 카페: 1, 분위기: 0.6 } },
    ],
  },
  {
    q: '한 끼 점심 예산은?',
    opts: [
      { label: '6천원 이하', vec: { 가성비: 1, 빠름: 0.5 } },
      { label: '8천원 안팎', vec: { 가성비: 0.6, 든든: 0.4 } },
      { label: '1만원 이상도 OK', vec: { 분위기: 0.6, 든든: 0.5 } },
      { label: '상관없어요', vec: { 분위기: 0.3, 든든: 0.3 } },
    ],
  },
]

export default function TasteQuiz() {
  const go = useNavigate()
  const { setTasteSeed } = useApp()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)

  const q = QUESTIONS[step]
  const isLast = step === QUESTIONS.length - 1

  const choose = (i) => {
    const next = { ...answers, [step]: i }
    setAnswers(next)
    if (isLast) finish(next)
    else setStep(step + 1)
  }

  const finish = (ans) => {
    const seed = {}
    QUESTIONS.forEach((qq, qi) => {
      const choice = qq.opts[ans[qi]]
      if (choice) addVec(seed, choice.vec, 1)
    })
    setTasteSeed(seed)
    const top = matchPersonas(seed)[0]
    setResult(top)
  }

  // 결과 화면
  if (result) {
    const p = result.persona
    return (
      <div style={{ width: '100%', height: '100dvh', background: '#0E0B09', color: '#fff', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: '16%', left: '50%', transform: 'translateX(-50%)', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,137,4,0.25), transparent 70%)' }} />
        <div style={{ animation: 'pop 0.5s cubic-bezier(.2,1.4,.4,1)' }}>
          <img src={STICKER_IMG.hero} alt="" style={{ width: 150, height: 150, objectFit: 'contain', filter: 'drop-shadow(0 14px 28px rgba(255,137,4,0.5))' }} />
        </div>
        <div style={{ marginTop: 18, fontSize: 13, fontWeight: 700, color: '#FFB261' }}>나의 입맛 유형은</div>
        <div style={{ marginTop: 8, fontSize: 32, fontWeight: 800 }}>{p.emoji} {p.name}</div>
        <div style={{ marginTop: 12, fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: 280 }}>{p.blurb}</div>
        <div style={{ marginTop: 18, padding: '8px 16px', borderRadius: 999, background: 'rgba(255,137,4,0.12)', border: '1px solid rgba(255,137,4,0.3)', fontSize: 13, fontWeight: 700, color: '#FF8904' }}>
          이제 입맛 맞춤 추천을 받아요
        </div>
        <button onClick={() => go('/home')} style={{ marginTop: 36, width: '100%', maxWidth: 320, height: 56, borderRadius: 16, border: 'none', background: 'linear-gradient(135deg, #FF8904, #FB2C36)', color: '#fff', fontSize: 16, fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 28px rgba(251,44,54,0.4)' }}>
          맞춤 맛집 보러가기 🍴
        </button>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: '100dvh', background: '#0E0B09', color: '#fff', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* top */}
      <div style={{ padding: '52px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => step > 0 ? setStep(step - 1) : go('/home')} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div style={{ flex: 1, height: 6, borderRadius: 999, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          <div style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%`, height: '100%', borderRadius: 999, background: 'linear-gradient(90deg, #FF8904, #FB2C36)', transition: 'width 0.3s' }} />
        </div>
        <button onClick={() => go('/home')} style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>건너뛰기</button>
      </div>

      <div style={{ padding: '12px 20px 0', fontSize: 12, fontWeight: 700, color: '#FF8904', letterSpacing: 1 }}>입맛 진단 {step + 1} / {QUESTIONS.length}</div>

      <div key={step} style={{ flex: 1, padding: '24px 20px 0', animation: 'pageIn 0.3s ease-out' }}>
        <div style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.35, letterSpacing: -0.4 }}>{q.q}</div>
        <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {q.opts.map((o, i) => (
            <button key={i} onClick={() => choose(i)} style={{ padding: '20px 18px', borderRadius: 16, background: '#1A1614', border: '1.5px solid rgba(255,255,255,0.06)', color: '#fff', fontSize: 17, fontWeight: 700, textAlign: 'left', cursor: 'pointer', transition: 'all 0.12s' }}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
