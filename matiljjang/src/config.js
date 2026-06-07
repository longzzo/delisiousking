// 맛일짱 앱 설정
//
// 지도는 Leaflet + OpenStreetMap(CARTO 다크 타일)을 사용합니다.
// API 키·가입·도메인 등록이 전혀 필요 없습니다.

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
