// 맛일짱 보상 시스템 정의 (스티커 도감 + 쿠폰)
// 이미지는 컴포넌트에서 id로 매핑합니다 (stickerImages.js)

export const STICKERS = [
  { id: 'happy',    name: '행복이', emoji: '🧡', desc: '첫 찜 달성',      type: 'wish',   need: 1 },
  { id: 'think',    name: '고민이', emoji: '🤔', desc: '찜 3곳 모으기',   type: 'wish',   need: 3 },
  { id: 'surprise', name: '놀람이', emoji: '😲', desc: '찜 7곳 모으기',   type: 'wish',   need: 7 },
  { id: 'hero',     name: '킹짱이', emoji: '👑', desc: '첫 리뷰 작성',     type: 'review', need: 1 },
  { id: 'angry',    name: '열정이', emoji: '🔥', desc: '리뷰 5개 작성',    type: 'review', need: 5 },
]

export const COUPONS = [
  { id: 'c100', at: 100, icon: '☕', title: '아메리카노 1+1',  desc: '제휴 카페에서 사용 가능' },
  { id: 'c300', at: 300, icon: '🎟️', title: '2,000원 할인',    desc: '1만원 이상 주문 시' },
  { id: 'c600', at: 600, icon: '💸', title: '5,000원 할인',    desc: '2만원 이상 주문 시' },
]

export const POINTS = {
  wish: 10,    // 찜 1회 적립
  review: 50,  // 리뷰 1개 적립
}

// 현재 통계로 해금되어야 할 스티커/쿠폰 id 목록을 계산
export function unlockedFor({ wishEverCount, reviewCount, points }) {
  const stickers = STICKERS.filter(s =>
    (s.type === 'wish' && wishEverCount >= s.need) ||
    (s.type === 'review' && reviewCount >= s.need)
  ).map(s => s.id)
  const coupons = COUPONS.filter(c => points >= c.at).map(c => c.id)
  return { stickers, coupons }
}
