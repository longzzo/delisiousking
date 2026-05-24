import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import mascotHappy from '../assets/mascot-happy.png'
import { RESTAURANTS } from '../data/restaurants'
import { useApp } from '../store/AppStore'

const TAG_OPTIONS = ['가성비', '혼밥하기 좋음', '빠른 조리', '양 많음', '깔끔', '친절', '주차 가능', '데이트', '회식 OK', '늦은 시간']
const RATING_LABELS = ['', '별로예요', '아쉬워요', '괜찮아요', '맛있어요', '인생맛집!']

function Stars({ value, onChange, size = 28 }) {
  return (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1,2,3,4,5].map(n => (
        <button key={n} onClick={() => onChange?.(n)} style={{ background: 'none', border: 'none', padding: 0, cursor: onChange ? 'pointer' : 'default', fontSize: size, lineHeight: 1, color: n <= value ? '#FFD56B' : 'rgba(255,255,255,0.15)', transition: 'transform 0.1s' }}>★</button>
      ))}
    </div>
  )
}

export default function Review() {
  const go = useNavigate()
  const { id } = useParams()
  const { addReview } = useApp()

  const restaurant = RESTAURANTS.find(r => r.id === Number(id)) || RESTAURANTS[0]

  const [overall, setOverall] = useState(5)
  const [text, setText] = useState('')
  const [tags, setTags] = useState(new Set())
  const [submitted, setSubmitted] = useState(false)

  const toggleTag = (t) => {
    const next = new Set(tags)
    next.has(t) ? next.delete(t) : next.add(t)
    setTags(next)
  }

  const submit = () => {
    if (submitted) return
    addReview({
      restaurantId: restaurant.id,
      author: '익명 학생',
      rating: overall,
      text: text.trim() || '방문해서 먹었는데 맛있었어요!',
      tags: [...tags],
      date: new Date().toLocaleDateString('ko-KR'),
    })
    setSubmitted(true)
    setTimeout(() => go(`/restaurant/${restaurant.id}`), 1800)
  }

  return (
    <div style={{ width: '100%', height: '100dvh', background: '#0E0B09', position: 'relative', color: '#fff', overflow: 'hidden' }}>
      {/* Top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20, background: 'rgba(13,11,9,0.96)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingTop: 52, paddingBottom: 12, paddingLeft: 16, paddingRight: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => go(-1)} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M6 18L18 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <span style={{ fontSize: 16, fontWeight: 700 }}>리뷰 작성</span>
        <button
          onClick={() => alert('임시저장 기능은 준비 중이에요')}
          style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.3)', background: 'none', border: 'none', cursor: 'pointer' }}
        >임시저장</button>
      </div>

      <div className="screen-wrap" style={{ paddingTop: 108, paddingBottom: 100 }}>
        {/* Restaurant chip */}
        <div style={{ margin: '0 16px', padding: 12, borderRadius: 14, background: '#1A1614', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: 'repeating-linear-gradient(135deg, #2A211B 0 4px, #221B17 4px 8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{restaurant.emoji}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>{restaurant.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{restaurant.category} · 도보 {Math.ceil(restaurant.distance/80)}분</div>
          </div>
          <button
            onClick={() => go('/home')}
            style={{ fontSize: 12, color: '#FF8904', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}
          >변경</button>
        </div>

        {/* Overall rating */}
        <div style={{ padding: '24px 16px 0', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>전체적으로 어땠어요?</div>
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center' }}>
            <Stars value={overall} onChange={setOverall} size={40} />
          </div>
          <div style={{ marginTop: 10, fontSize: 15, fontWeight: 700, color: '#FFD56B' }}>{RATING_LABELS[overall]}</div>
        </div>

        {/* Photo upload (UI only) */}
        <div style={{ padding: '28px 16px 0' }}>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>사진 추가 <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 500 }}>(최대 5장)</span></div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 74, height: 74, borderRadius: 12, border: '1.5px dashed rgba(255,137,4,0.4)', background: 'rgba(255,137,4,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3, cursor: 'pointer' }}>
              <span style={{ fontSize: 20 }}>📷</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#FF8904' }}>0/5</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <div style={{ padding: '28px 16px 0' }}>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>리뷰 내용</div>
          <div style={{ padding: 2, borderRadius: 14, background: '#1A1614', border: '1px solid rgba(255,137,4,0.30)', minHeight: 130 }}>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              maxLength={500}
              placeholder={`${restaurant.name}에서의 경험을 알려주세요!`}
              style={{ width: '100%', minHeight: 126, padding: 12, background: 'none', border: 'none', outline: 'none', color: 'rgba(255,255,255,0.88)', fontSize: 14, lineHeight: 1.65, fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'right' }}>{text.length} / 500</div>
        </div>

        {/* Tags */}
        <div style={{ padding: '24px 16px 0' }}>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 12 }}>어떤 점이 좋았나요? <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 500 }}>(여러개 선택)</span></div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {TAG_OPTIONS.map(t => {
              const on = tags.has(t)
              return (
                <button key={t} onClick={() => toggleTag(t)} style={{ padding: '9px 14px', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer', background: on ? 'rgba(255,137,4,0.15)' : 'rgba(255,255,255,0.04)', border: on ? '1px solid #FF8904' : '1px solid rgba(255,255,255,0.08)', color: on ? '#FFB261' : 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 4, transition: 'all 0.15s' }}>
                  {on && <span>✓</span>}# {t}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Submit */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'rgba(13,11,9,0.96)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px 16px 32px' }}>
        <button onClick={submit} disabled={submitted} style={{ width: '100%', height: 56, borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #FF8904, #FB2C36)', color: '#fff', fontSize: 16, fontWeight: 800, cursor: submitted ? 'default' : 'pointer', boxShadow: '0 10px 28px rgba(251,44,54,0.40)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: submitted ? 0.7 : 1 }}>
          리뷰 등록하기 · 50P 적립
        </button>
      </div>

      {/* Success overlay */}
      {submitted && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 100, background: 'rgba(13,11,9,0.90)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.25s ease-out' }}>
          <img src={mascotHappy} alt="" style={{ width: 180, height: 'auto', filter: 'drop-shadow(0 14px 32px rgba(255,137,4,0.45))', animation: 'pop 0.4s cubic-bezier(.2,1.4,.4,1)' }} />
          <div style={{ marginTop: 16, fontSize: 24, fontWeight: 800, letterSpacing: -0.3 }}>리뷰 등록 완료!</div>
          <div style={{ marginTop: 8, fontSize: 15, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>50P가 적립되었어요 🎉</div>
        </div>
      )}
    </div>
  )
}
