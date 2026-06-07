import { createContext, useContext, useReducer, useEffect } from 'react'
import { STICKERS, COUPONS, POINTS, unlockedFor } from '../data/rewards'

const STORAGE_KEY = 'matiljjang-store'

const defaultState = {
  wishlist: [],
  reviews: [],
  points: 0,
  wishEverCount: 0,   // 누적 찜 횟수 (해제해도 줄지 않음)
  stickers: [],       // 해금된 스티커 id
  coupons: [],        // 해금된 쿠폰 id
  seenOnboarding: false,
  rewardQueue: [],    // 축하 연출 대기열
}

let _eid = 0
const nextId = () => `${Date.now()}-${_eid++}`

function loadState() {
  let s = { ...defaultState }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const p = JSON.parse(raw)
      s = {
        ...defaultState,
        wishlist: Array.isArray(p.wishlist) ? p.wishlist : [],
        reviews: Array.isArray(p.reviews) ? p.reviews : [],
        points: typeof p.points === 'number' ? p.points : 0,
        wishEverCount: typeof p.wishEverCount === 'number' ? p.wishEverCount : (Array.isArray(p.wishlist) ? p.wishlist.length : 0),
        stickers: Array.isArray(p.stickers) ? p.stickers : [],
        coupons: Array.isArray(p.coupons) ? p.coupons : [],
        seenOnboarding: !!p.seenOnboarding,
        rewardQueue: [],
      }
    }
  } catch {
    s = { ...defaultState }
  }
  // 기존 사용자 보정: 포인트가 0인데 활동 기록이 있으면 소급 적립
  if (s.points === 0 && (s.reviews.length > 0 || s.wishEverCount > 0)) {
    s.points = s.reviews.length * POINTS.review + s.wishEverCount * POINTS.wish
  }
  // 통계에 맞는 스티커/쿠폰을 조용히 동기화 (연출 없이)
  const u = unlockedFor({ wishEverCount: s.wishEverCount, reviewCount: s.reviews.length, points: s.points })
  s.stickers = Array.from(new Set([...s.stickers, ...u.stickers]))
  s.coupons = Array.from(new Set([...s.coupons, ...u.coupons]))
  return s
}

// 통계 변화 후 새로 해금된 항목을 찾아 rewardQueue 이벤트를 만든다
function withUnlocks(state, baseEvent) {
  const u = unlockedFor({ wishEverCount: state.wishEverCount, reviewCount: state.reviews.length, points: state.points })
  const newStickers = u.stickers.filter(id => !state.stickers.includes(id))
  const newCoupons = u.coupons.filter(id => !state.coupons.includes(id))
  const queue = [...state.rewardQueue]
  if (baseEvent) queue.push({ id: nextId(), type: 'toast', ...baseEvent })
  if (newStickers.length || newCoupons.length) {
    queue.push({
      id: nextId(),
      type: 'unlock',
      stickers: newStickers.map(id => STICKERS.find(s => s.id === id)),
      coupons: newCoupons.map(id => COUPONS.find(c => c.id === id)),
    })
  }
  return {
    ...state,
    stickers: Array.from(new Set([...state.stickers, ...newStickers])),
    coupons: Array.from(new Set([...state.coupons, ...newCoupons])),
    rewardQueue: queue,
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_WISHLIST': {
      const id = action.payload
      const has = state.wishlist.includes(id)
      if (has) {
        // 해제: 목록에서만 제거 (포인트/누적은 유지)
        return { ...state, wishlist: state.wishlist.filter(w => w !== id) }
      }
      // 추가: 포인트 +, 누적 +, 해금 체크
      const next = {
        ...state,
        wishlist: [...state.wishlist, id],
        wishEverCount: state.wishEverCount + 1,
        points: state.points + POINTS.wish,
      }
      return withUnlocks(next, { text: `찜 완료! +${POINTS.wish}P`, icon: '❤️' })
    }
    case 'ADD_REVIEW': {
      const next = {
        ...state,
        reviews: [action.payload, ...state.reviews],
        points: state.points + POINTS.review,
      }
      return withUnlocks(next, { text: `리뷰 등록! +${POINTS.review}P`, icon: '✍️' })
    }
    case 'DISMISS_REWARD': {
      return { ...state, rewardQueue: state.rewardQueue.filter(e => e.id !== action.payload) }
    }
    case 'SEEN_ONBOARDING':
      return { ...state, seenOnboarding: true }
    case 'RESET_ONBOARDING':
      return { ...state, seenOnboarding: false }
    default:
      return state
  }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    // rewardQueue는 연출용 휘발 상태라 저장에서 제외
    const { rewardQueue, ...persist } = state
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persist))
  }, [state])

  const value = {
    state,
    toggleWishlist: (id) => dispatch({ type: 'TOGGLE_WISHLIST', payload: id }),
    addReview: (review) => dispatch({ type: 'ADD_REVIEW', payload: review }),
    dismissReward: (eid) => dispatch({ type: 'DISMISS_REWARD', payload: eid }),
    markOnboardingSeen: () => dispatch({ type: 'SEEN_ONBOARDING' }),
    resetOnboarding: () => dispatch({ type: 'RESET_ONBOARDING' }),
    getReviews: (restaurantId) => state.reviews.filter(r => r.restaurantId === restaurantId),
    isWished: (id) => state.wishlist.includes(id),
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
