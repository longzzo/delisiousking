// 맛일짱 앱 설정
//
// 카카오맵을 쓰려면 아래 KAKAO_MAP_KEY 에 "JavaScript 키"를 넣으세요.
//   카카오 개발자 콘솔(https://developers.kakao.com)
//   > 내 애플리케이션 > 앱 키 > "JavaScript 키" 복사
//   > 플랫폼 > Web > 사이트 도메인에 https://longzzo.github.io 등록
//
// 키가 비어 있으면 지도는 임시 일러스트(SVG) 모드로 동작합니다.
// (배포 없이 빠르게 테스트하려면 브라우저 콘솔에서
//   localStorage.setItem('kakaoKey','발급받은키'); location.reload()
//  를 실행해도 됩니다.)
export const KAKAO_MAP_KEY = ''

// 경일대학교 정문 부근 중심 좌표
export const CAMPUS = { lat: 35.91361, lng: 128.81472, name: '경일대학교' }

// 식당에 lat/lng가 없을 때, 기존 임시지도 좌표(mapX/mapY)를
// 실제 위경도로 근사 변환 (캠퍼스 기준 약 1km 범위로 분산)
export function approxLatLng(mapX, mapY) {
  return {
    lat: CAMPUS.lat - (mapY - 200) / 916 * 0.016,
    lng: CAMPUS.lng + (mapX - 185) / 412 * 0.011,
  }
}

export function restaurantLatLng(r) {
  if (typeof r.lat === 'number' && typeof r.lng === 'number') {
    return { lat: r.lat, lng: r.lng }
  }
  return approxLatLng(r.mapX, r.mapY)
}
