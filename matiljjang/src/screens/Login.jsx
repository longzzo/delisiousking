import { useNavigate } from 'react-router-dom'
import mascotHero from '../assets/mascot-hero.png'

export default function Login() {
  const go = useNavigate()

  return (
    <div style={{
      width: '100%', height: '100dvh',
      background: 'linear-gradient(160deg, #FF8904 0%, #FB2C36 100%)',
      position: 'relative', overflow: 'hidden',
      fontFamily: '"Inter", -apple-system, system-ui, sans-serif', color: '#fff',
    }}>
      {/* blobs */}
      <div style={{ position: 'absolute', top: -80, right: -60, width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', filter: 'blur(4px)' }} />
      <div style={{ position: 'absolute', bottom: 320, left: -80, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', filter: 'blur(4px)' }} />

      {/* hero */}
      <div style={{ position: 'absolute', top: 72, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src={mascotHero} alt="킹짱이" style={{ width: 200, height: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 14px 22px rgba(120,20,0,0.28))' }} />
        <div style={{ marginTop: 16, fontFamily: '"Black Han Sans", sans-serif', fontWeight: 800, fontSize: 56, letterSpacing: -1, lineHeight: 1, textShadow: '0 4px 0 rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.18)' }}>
          <span style={{ display: 'inline-block', transform: 'rotate(-6deg) translateY(-2px)', marginRight: 2 }}>맛</span>
          <span style={{ display: 'inline-block' }}>일짱</span>
        </div>
        <div style={{ marginTop: 12, fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.92)', letterSpacing: 0.2 }}>너의 점심, 내가 책임질게 🍚</div>
      </div>

      {/* bottom sheet */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#13100E', borderTopLeftRadius: 32, borderTopRightRadius: 32, padding: '28px 24px 40px', boxShadow: '0 -20px 40px rgba(0,0,0,0.20)' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.5)', letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 16 }}>경일대 학생 전용 · 1초 로그인</div>

        <button onClick={() => go('/home')} style={{ width: '100%', height: 54, borderRadius: 14, border: 'none', background: '#FEE500', color: '#191600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><ellipse cx="10" cy="9" rx="9" ry="7.5" fill="#191600"/><path d="M7 13.5L5.5 17l4-2.2" fill="#191600"/></svg>
          카카오로 시작하기
        </button>

        <button onClick={() => go('/home')} style={{ marginTop: 10, width: '100%', height: 54, borderRadius: 14, border: '1px solid rgba(255,255,255,0.10)', background: '#1F1A17', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer' }}>
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M45 24.5c0-1.5-.1-3-.4-4.4H24v8.4h11.8c-.5 2.7-2 5-4.3 6.6v5.5h7c4.1-3.8 6.5-9.4 6.5-16.1z"/>
            <path fill="#34A853" d="M24 46c5.8 0 10.6-1.9 14.2-5.2l-7-5.5c-1.9 1.3-4.4 2.1-7.2 2.1-5.5 0-10.2-3.7-11.9-8.8H4.9v5.6C8.5 41.4 15.7 46 24 46z"/>
            <path fill="#FBBC05" d="M12.1 28.6c-.5-1.3-.7-2.6-.7-4.1s.3-2.8.7-4.1V14.9H4.9C3.7 17.6 3 20.7 3 24s.7 6.4 1.9 9.1l7.2-5.6z"/>
            <path fill="#EA4335" d="M24 10.8c3.1 0 5.9 1.1 8.1 3.2l6-6C34.6 4.5 29.8 2 24 2 15.7 2 8.5 6.6 4.9 14.9l7.2 5.6c1.7-5.1 6.4-8.8 11.9-8.8z"/>
          </svg>
          Google로 시작하기
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '18px 0 14px', color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          또는
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
        </div>

        <button onClick={() => go('/home')} style={{ width: '100%', height: 50, borderRadius: 14, background: 'rgba(255,137,4,0.12)', border: '1px solid rgba(255,137,4,0.35)', color: '#FFB261', fontSize: 15, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'pointer' }}>
          <span style={{ width: 18, height: 18, borderRadius: 5, background: '#FF8904', color: '#fff', fontSize: 11, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>K</span>
          경일대 학생 인증으로 시작하기
        </button>

        <div style={{ marginTop: 18, textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
          가입 시 <span style={{ color: '#FFB261', textDecoration: 'underline' }}>이용약관</span> 및 <span style={{ color: '#FFB261', textDecoration: 'underline' }}>개인정보처리방침</span>에 동의합니다.
        </div>
      </div>
    </div>
  )
}
