// 맛일짱 입맛(취향) 추천 엔진
// 식당/리뷰/사용자를 같은 "취향 벡터" 공간에 올려 코사인 유사도로 매칭한다.

export const TASTE_KEYS = ['한식', '중식', '일식', '분식', '카페', '치킨', '가성비', '혼밥', '매운맛', '든든', '분위기', '빠름']

const SPICY_HINTS = ['매', '떡볶이', '제육', '불', '마라', '짬뽕', '닭갈비', '낙지', '쭈꾸미', '아구', '김치', '라볶이', '엽기']

// ---- 벡터 유틸 ----
export function addVec(target, vec, weight = 1) {
  for (const k of TASTE_KEYS) {
    if (vec[k]) target[k] = (target[k] || 0) + vec[k] * weight
  }
  return target
}
function magnitude(v) {
  let s = 0
  for (const k of TASTE_KEYS) s += (v[k] || 0) ** 2
  return Math.sqrt(s)
}
export function cosine(a, b) {
  const ma = magnitude(a), mb = magnitude(b)
  if (!ma || !mb) return 0
  let dot = 0
  for (const k of TASTE_KEYS) dot += (a[k] || 0) * (b[k] || 0)
  return dot / (ma * mb)
}
export function isEmptyVec(v) {
  return !v || TASTE_KEYS.every(k => !v[k])
}
// 코사인(0~1)을 보기 좋은 매치율(%)로 — 순서는 유지, 체감 향상용 휴리스틱
export function matchPercent(c) {
  return Math.max(50, Math.min(99, Math.round(50 + c * 50)))
}

// ---- 식당 → 취향 벡터 ----
export function restaurantTaste(r) {
  const v = {}
  if (TASTE_KEYS.includes(r.category)) v[r.category] = 1

  // 가성비
  v['가성비'] = r.priceMin <= 6000 ? 1 : r.priceMin <= 8000 ? 0.6 : 0.2
  // 혼밥
  if (r.hasSolo) v['혼밥'] = 1
  // 빠름
  v['빠름'] = r.cookTime <= 7 ? 1 : r.cookTime <= 12 ? 0.5 : 0.1
  // 매운맛
  const text = `${r.name} ${r.tag} ${(r.menus || []).map(m => m.name).join(' ')}`
  if (SPICY_HINTS.some(h => text.includes(h))) v['매운맛'] = 1
  // 든든
  v['든든'] = ['한식', '치킨', '중식'].includes(r.category) ? 0.8 : r.category === '분식' ? 0.4 : 0.1
  // 분위기
  v['분위기'] = r.category === '카페' ? 1 : /데이트|분위기|깔끔/.test(r.tag) ? 0.6 : 0.2
  return v
}

// 리뷰 태그 → 취향 차원
const TAG_TO_DIM = {
  '가성비': '가성비', '혼밥하기 좋음': '혼밥', '빠른 조리': '빠름',
  '양 많음': '든든', '데이트': '분위기', '깔끔': '분위기', '매운맛': '매운맛',
}
export function reviewTaste(review, restaurant) {
  const v = restaurant ? { ...restaurantTaste(restaurant) } : {}
  for (const t of review.tags || []) {
    const dim = TAG_TO_DIM[t]
    if (dim) v[dim] = (v[dim] || 0) + 0.8
  }
  return v
}

// ---- 미식 페르소나 ----
export const PERSONAS = [
  { id: 'value',   name: '가성비 헌터',     emoji: '🤑', blurb: '맛보다 통장, 한 끼 만원은 사치!', vec: { 가성비: 1, 든든: 0.8, 빠름: 0.7, 분식: 0.5, 한식: 0.4 } },
  { id: 'solo',    name: '혼밥 미식가',     emoji: '🍜', blurb: '혼자여도 당당하게, 1인석이 진리', vec: { 혼밥: 1, 빠름: 0.8, 가성비: 0.6, 분식: 0.5, 일식: 0.4 } },
  { id: 'spicy',   name: '매운맛 마니아',   emoji: '🌶️', blurb: '스트레스엔 역시 화끈한 한 입', vec: { 매운맛: 1, 한식: 0.7, 분식: 0.6, 든든: 0.5 } },
  { id: 'cafe',    name: '분위기 카페러버', emoji: '☕', blurb: '맛도 좋지만 공간이 절반이지', vec: { 카페: 1, 분위기: 1, 일식: 0.3 } },
  { id: 'hansik',  name: '든든 한식파',     emoji: '🍚', blurb: '집밥처럼 든든해야 한 끼지', vec: { 한식: 1, 든든: 0.9, 가성비: 0.5 } },
  { id: 'explore', name: '이색 미식 탐험가', emoji: '🍣', blurb: '새로운 맛이라면 어디든 간다', vec: { 일식: 0.9, 중식: 0.7, 분위기: 0.6, 매운맛: 0.4 } },
]

export function matchPersonas(userTaste) {
  if (isEmptyVec(userTaste)) return []
  return PERSONAS
    .map(p => ({ persona: p, score: cosine(userTaste, p.vec), percent: matchPercent(cosine(userTaste, p.vec)) }))
    .sort((a, b) => b.score - a.score)
}

// 리뷰 1건이 어떤 페르소나에 가장 가까운지
export function reviewPersona(review, restaurant) {
  const v = reviewTaste(review, restaurant)
  let best = PERSONAS[0], bestС = -1
  for (const p of PERSONAS) {
    const c = cosine(v, p.vec)
    if (c > bestС) { bestС = c; best = p }
  }
  return best
}

// ---- 사용자 취향 ----
// state: { wishlist, reviews, tasteSeed }
export function getUserTaste(state, restaurants) {
  const byId = new Map(restaurants.map(r => [r.id, r]))
  const acc = {}
  let signal = 0

  if (state.tasteSeed && !isEmptyVec(state.tasteSeed)) {
    addVec(acc, state.tasteSeed, 1.2); signal++
  }
  for (const id of state.wishlist || []) {
    const r = byId.get(id)
    if (r) { addVec(acc, restaurantTaste(r), 1.0); signal++ }
  }
  for (const rv of state.reviews || []) {
    const r = byId.get(rv.restaurantId)
    if (r) { addVec(acc, reviewTaste(rv, r), 0.6 + (rv.rating || 5) / 5); signal++ }
  }
  if (!signal || isEmptyVec(acc)) return null
  return acc
}

// 취향 기반 식당 랭킹
export function rankByTaste(userTaste, restaurants, { exclude = [] } = {}) {
  if (isEmptyVec(userTaste)) return []
  const ex = new Set(exclude)
  return restaurants
    .filter(r => !ex.has(r.id))
    .map(r => {
      const c = cosine(userTaste, restaurantTaste(r))
      return { r, score: c, percent: matchPercent(c) }
    })
    .sort((a, b) => b.score - a.score || b.r.rating - a.r.rating)
}
