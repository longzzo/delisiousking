import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Login from './screens/Login'
import Onboarding from './screens/Onboarding'
import Home from './screens/Home'
import Map from './screens/Map'
import Detail from './screens/Detail'
import Review from './screens/Review'
import Wishlist from './screens/Wishlist'
import MyReviews from './screens/MyReviews'
import MyPage from './screens/MyPage'
import RewardLayer from './components/RewardLayer'

export default function App() {
  const location = useLocation()

  return (
    <div className="app-shell">
      {/* key on pathname re-triggers the CSS page transition on every route change */}
      <div key={location.pathname} className="page-anim" style={{ height: '100%' }}>
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
      </div>
      <RewardLayer />
    </div>
  )
}
