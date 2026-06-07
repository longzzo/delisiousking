import { useEffect, useState } from 'react'

let loadingPromise = null

function loadKakaoSdk(key) {
  if (typeof window !== 'undefined' && window.kakao && window.kakao.maps) {
    return Promise.resolve()
  }
  if (loadingPromise) return loadingPromise

  loadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`
    script.async = true
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => resolve())
      } else {
        reject(new Error('SDK_MISSING'))
      }
    }
    script.onerror = () => {
      loadingPromise = null
      reject(new Error('SDK_LOAD_FAILED'))
    }
    document.head.appendChild(script)
  })
  return loadingPromise
}

// 카카오맵 JS SDK를 로드. key가 없으면 'no-key' 에러로 즉시 반환.
export function useKakaoLoader(key) {
  const [state, setState] = useState({ loaded: false, error: key ? null : 'no-key' })

  useEffect(() => {
    if (!key) {
      setState({ loaded: false, error: 'no-key' })
      return
    }
    let mounted = true
    setState({ loaded: false, error: null })
    loadKakaoSdk(key)
      .then(() => mounted && setState({ loaded: true, error: null }))
      .catch((e) => mounted && setState({ loaded: false, error: e.message || 'ERROR' }))
    return () => { mounted = false }
  }, [key])

  return state
}
