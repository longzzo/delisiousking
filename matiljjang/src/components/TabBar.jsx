import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { id: 'home',   label: '홈',   icon: '🏠', path: '/home' },
  { id: 'map',    label: '지도', icon: '🗺️', path: '/map' },
  { id: 'wish',   label: '위시', icon: '❤️', path: '/wish' },
  { id: 'review', label: '리뷰', icon: '✍️', path: '/my-reviews' },
  { id: 'my',     label: '마이', icon: '👤', path: '/my' },
]

export default function TabBar() {
  const go = useNavigate()
  const { pathname } = useLocation()

  const active =
    pathname.startsWith('/map')         ? 'map'    :
    pathname.startsWith('/wish')        ? 'wish'   :
    pathname.startsWith('/my-reviews')  ? 'review' :
    pathname.startsWith('/my')          ? 'my'     :
                                          'home'

  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: 'rgba(13,11,9,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '10px 8px 28px', display: 'flex', justifyContent: 'space-around', zIndex: 10 }}>
      {tabs.map(t => {
        const isActive = active === t.id
        return (
          <button key={t.id} onClick={() => go(t.path)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer', background: 'none', border: 'none', padding: '4px 0' }}>
            <span style={{ fontSize: 22, opacity: isActive ? 1 : 0.4, filter: isActive ? 'none' : 'grayscale(0.7)', transition: 'all 0.15s' }}>{t.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: isActive ? '#FF8904' : 'rgba(255,255,255,0.45)' }}>{t.label}</span>
          </button>
        )
      })}
    </div>
  )
}
