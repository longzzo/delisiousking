import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './screens/Login'
import Onboarding from './screens/Onboarding'
import Home from './screens/Home'
import Detail from './screens/Detail'
import Review from './screens/Review'
import Wishlist from './screens/Wishlist'
import MyReviews from './screens/MyReviews'
import MyPage from './screens/MyPage'
import RewardLayer from './components/RewardLayer'

// 지도(Leaflet ~150KB)는 지도 탭에 들어갈 때만 로드 → 첫 진입 속도 개선
const Map = lazy(() => import('./screens/Map'))

function ScreenLoading() {
  return (
    <div style={{ width: '100%', height: '100dvh', background: '#0E0B09', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 34, height: 34, borderRadius: '50%', border: '3px solid rgba(255,137,4,0.25)', borderTopColor: '#FF8904', animation: 'spin 0.7s linear infinite' }} />
    </div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="app-shell">
      {/* key on pathname re-triggers the CSS page transition on every route change */}
      <div key={location.pathname} className="page-anim" style={{ height: '100%' }}>
        <Suspense fallback={<ScreenLoading />}>
          <Routes location={location}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/home" element={<Home />} />
            <Route path="/map" element={<Map />} />
            <Route path="/wish" element={<Wishlist />} />
            <Route path="/my-reviews" element={<MyReviews />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/restaurant/:id" element={<Detail />} />
            <Route path="/review/:id" element={<Review />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Suspense>
      </div>
      <RewardLayer />
    </div>
  )
}
