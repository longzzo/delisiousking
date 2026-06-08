// 리뷰를 "메뉴별"로 연결/집계하는 헬퍼
// 사용자 리뷰는 menus 필드를 직접 가짐. 시드 리뷰는 본문에서 메뉴명을 추론.

export function reviewMenusOf(review, restaurant) {
  if (Array.isArray(review.menus) && review.menus.length) return review.menus
  const names = (restaurant.menus || []).map(m => m.name)
  const found = names.filter(n => review.text && review.text.includes(n))
  if (found.length) return found
  // 추론 실패 시 베스트(없으면 첫) 메뉴로 귀속
  const best = (restaurant.menus || []).find(m => m.tag === '베스트') || (restaurant.menus || [])[0]
  return best ? [best.name] : []
}

// 메뉴별 리뷰 수/평균 평점
export function menuStats(restaurant, reviews) {
  const stats = {}
  for (const m of restaurant.menus || []) stats[m.name] = { count: 0, sum: 0 }
  for (const rv of reviews) {
    for (const mn of reviewMenusOf(rv, restaurant)) {
      if (!stats[mn]) stats[mn] = { count: 0, sum: 0 }
      stats[mn].count++
      stats[mn].sum += rv.rating || 0
    }
  }
  const out = {}
  for (const k in stats) {
    out[k] = { count: stats[k].count, avg: stats[k].count ? Math.round((stats[k].sum / stats[k].count) * 10) / 10 : null }
  }
  return out
}
