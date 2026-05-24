import { createContext, useContext, useReducer, useEffect } from 'react'

const STORAGE_KEY = 'matiljjang-store'

const defaultState = {
  wishlist: [],
  reviews: [],
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    const parsed = JSON.parse(raw)
    return {
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
      reviews: Array.isArray(parsed.reviews) ? parsed.reviews : [],
    }
  } catch {
    return defaultState
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_WISHLIST': {
      const id = action.payload
      const has = state.wishlist.includes(id)
      return {
        ...state,
        wishlist: has
          ? state.wishlist.filter(w => w !== id)
          : [...state.wishlist, id],
      }
    }
    case 'ADD_REVIEW': {
      return {
        ...state,
        reviews: [action.payload, ...state.reviews],
      }
    }
    default:
      return state
  }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const toggleWishlist = (id) => dispatch({ type: 'TOGGLE_WISHLIST', payload: id })
  const addReview = (review) => dispatch({ type: 'ADD_REVIEW', payload: review })
  const getReviews = (restaurantId) => state.reviews.filter(r => r.restaurantId === restaurantId)
  const isWished = (id) => state.wishlist.includes(id)

  return (
    <AppContext.Provider value={{ state, toggleWishlist, addReview, getReviews, isWished }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}
