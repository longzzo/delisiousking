import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './screens/Login'
import Home from './screens/Home'
import Map from './screens/Map'
import Detail from './screens/Detail'
import Review from './screens/Review'
import Wishlist from './screens/Wishlist'
import MyReviews from './screens/MyReviews'
import MyPage from './screens/MyPage'

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
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
  )
}
