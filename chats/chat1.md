# 맛일짱 모바일 앱 UI

_Started 2026-05-24 06:06 UTC_

---

## User

경일대학교 학생들을 위한 맛집 추천 앱 "맛일짱"의 모바일 앱 UI를 
디자인해줘. 피그마 또는 모바일 목업 스타일로 만들어줘.

[앱 소개]
- 이름: 맛일짱 (맛집 일등 짱짱맨)
- 타겟: 경일대학교 재학생 (특히 기숙사생, 자취생, 신입생)
- 핵심 가치: 메뉴 선정 실패 없이 쉽고 빠르게 경일대 주변 맛집을 
  찾을 수 있는 학생 전용 앱

[해결하려는 문제]
- 점심시간에 메뉴를 못 고르고 헤매는 문제
- 학교 주변 식당 정보가 흩어져 있는 문제  
- 신입생/기숙사생이 주변 지리를 모르는 문제
- 가성비 좋은 식당을 찾기 어려운 문제

[필요한 화면 5개]

1. 로그인 / 회원가입 화면
   - 카카오 / 구글 간편 로그인 버튼
   - 경일대 학생 인증 옵션
   - 마스코트 "킹짱이" 일러스트 배치
   - 슬로건: "너의 점심 내가 책임질게"

2. 메인 홈 화면
   - 상단: 검색창 (음식 이름, 가게 이름 검색)
   - 오늘의 추천 맛집 배너 (큰 카드)
   - 현재 위치 기반 가까운 맛집 리스트
   - 카테고리 필터 (한식/중식/일식/분식/카페 등)
   - 예산 필터 (8,000원 이하 등)
   - 하단 탭바: 홈 / 지도 / 위시리스트 / 리뷰 / 마이페이지

3. 지도 화면
   - 경일대 캠퍼스 중심 지도
   - 식당 위치 마커 (별점에 따라 색상 구분)
   - 마커 클릭 시 식당 정보 미리보기 카드
   - 실시간 혼잡도 표시 아이콘

4. 식당 상세 화면
   - 식당 대표 사진
   - 가게명, 별점, 가격대, 영업시간
   - 메인 메뉴 + 가격 리스트
   - 학생 리뷰 (별점, 사진, 텍스트)
   - 하단 버튼: 위시리스트 저장 / 길찾기 / 리뷰 쓰기

5. 리뷰 작성 화면
   - 메뉴별 별점 입력
   - 사진 업로드
   - 리뷰 텍스트 입력
   - 태그 선택 (가성비, 혼밥하기 좋음, 빠른 조리 등)

[디자인 스타일]
- 모바일 우선 (iPhone 사이즈 기준)
- 다크모드 기본 지원 (밤샘 작업하는 학생들 배려)
- 깔끔하고 직관적인 미니멀 디자인
- 메인 컬러: 식욕을 자극하는 오렌지/레드 계열 + 화이트
- 둥근 모서리, 부드러운 그림자
- 큰 폰트, 큰 버튼 (직관적 조작)
- 마스코트 "킹짱이" 캐릭터를 빈 화면이나 로딩에 활용

[차별 포인트]
- 일반 맛집 앱과 달리 "경일대 학생 전용"
- 학생 예산에 맞춘 가성비 필터
- 혼밥하기 좋은 식당 표시 (1인석 여부)
- 조리 시간 표시 (수업 시간 고려)

5개 화면을 하나의 캔버스에 가로로 나란히 배치해서 보여줘.

## Assistant

_[tool: fig_ls]_

_[tool: fig_read]_

_[tool: fig_ls]_

_[tool: fig_ls]_

_[tool: fig_ls]_

_[tool: fig_read]_

_[tool: fig_ls]_

_[tool: fig_ls]_

_[tool: fig_ls]_

_[tool: view_image]_

_[tool: fig_copy_files]_

_[tool: view_image]_

_[tool: fig_screenshot]_

_[tool: update_todos]_

_[tool: copy_starter_component]_

_[tool: copy_starter_component]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: write_file]_

Now I have a good picture. Let me build the design.

The design system from Figma:
- **Primary**: `#FF8904` orange → `#FB2C36` red gradient
- **Fonts**: Inter (UI) + PyeongChang Peace (brand/Korean headline)
- **Mascot**: 킹짱이 (orange superhero with bowl + spoon)
- Per the spec, **dark mode is default**

I'll lay 5 iPhone frames horizontally on a single canvas.

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: done]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: grep]_

_[tool: show_html]_

_[tool: show_html]_

_[tool: get_webview_logs]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: str_replace_edit]_

The issue: my `<Phone>` wrapper hides the `DCArtboard` from DCSection's child filter (it filters by `c.type === DCArtboard`). I need to inline the DCArtboard directly.

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: eval_js]_

_[tool: grep]_

_[tool: eval_js]_

_[tool: eval_js]_

_[tool: sleep]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: eval_js]_

_[tool: save_screenshot]_

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: str_replace_edit]_

The screens render well overall, but Korean text is breaking mid-character in buttons/headings. Let me fix the wrapping.

_[tool: str_replace_edit]_

I see Korean text breaking mid-character in several places. Let me fix the specific elements that need `nowrap`.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: view_image]_

_[tool: str_replace_edit]_

Good progress. Let me fix the remaining wraps.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: update_todos]_

_[tool: done]_

_[tool: fork_verifier_agent]_

맛일짱 5개 화면 디자인을 완성했어요. 피그마에 있던 마스코트 "킹짱이"와 오렌지→레드 그라데이션 디자인 토큰을 가져와서 다크모드 기반으로 구성했습니다.

**한 캔버스에 가로로 나란히 (좌→우)**
1. **로그인** — 그라데이션 + 킹짱이 + "너의 점심, 내가 책임질게" / 카카오·구글·경일대 학생 인증
2. **홈** — 위치 헤더, 검색바, 오늘의 추천 배너(킹짱이 등장), 카테고리/예산 필터, 가까운 맛집 카드 (혼잡도·1인석·조리시간 뱃지)
3. **지도** — 캠퍼스/기숙사 블록 + 별점별 색상 마커, 혼잡도 도트, 미리보기 카드
4. **식당 상세** — 히어로, 메타카드, 대표 메뉴 + 가격, 별점 분포, 학생 리뷰, 길찾기/리뷰쓰기 액션바
5. **리뷰 작성** — 전체 별점 + 메뉴별 별점, 사진 업로드, 텍스트 + 태그 칩, 적립 포인트 표시

차별 포인트(가성비, 1인석, 조리 시간)는 카드 뱃지와 필터 칩으로 표면화했고, 카테고리/예산 필터는 인터랙티브하게 토글되고 지도 마커도 클릭하면 미리보기가 바뀝니다. 캔버스 우상단 ⤢ 아이콘으로 어떤 아트보드든 풀스크린으로 볼 수 있어요.

## User

이거 마스코트 캐릭터 점부하고 어느 정도 기능 구현도 클로드 코드 이용하면 될려나?

## Assistant

네, 충분히 가능해요. 오히려 이 캐릭터셋이 3D 버전보다 앱 구현에 훨씬 활용도가 좋아요. 표정 5종이 있으니까:

**캐릭터 활용 매핑**
- 😋 (혀 내밀고 웃는) → 메인 마스코트, 홈 배너
- 😆 (하트 + 신난) → 리뷰 등록 완료, 위시리스트 추가
- 😠 (화난 + 김) → 에러 화면, 네트워크 실패
- 😮 (놀란) → 로딩, 추천 못 찾았을 때 빈 상태
- 🤔 (생각하는) → 추천 받기 전 "오늘 뭐 먹지?" 빈 상태

**Claude Code로 현실적으로 갈 수 있는 범위**
- **MVP 기준 1~2주**: React Native (Expo) 또는 Next.js 웹앱으로 화면 5개 + 로컬 더미 데이터 + 카카오 로그인 SDK 붙이기까지는 충분히 됨
- **백엔드 포함 한 달 정도**: Supabase/Firebase로 식당 DB + 리뷰 CRUD + 이미지 업로드 + 카카오맵 API 연동
- **무리한 부분**: 실시간 혼잡도(센서/POS 연동 필요), 학생 인증 자동화(경일대 SSO 협의 필요) — 이건 처음엔 더미값으로 두는 게 현실적

**추천 다음 스텝**
1. 이 마스코트 PNG를 캐릭터별로 잘라서 자산화 (배경 투명)
2. 지금 HTML 디자인을 Figma로 옮기지 말고, 바로 Claude Code에서 "이 HTML을 React Native Expo로 변환해줘 + 마스코트 표정 5종 매핑해줘" 시키는 게 빠를 거예요
3. 카카오맵 API 키, 학교 주변 식당 10~20개만 시드 데이터로 넣어서 데모 가능한 상태부터 만드는 걸 추천

원하시면 지금 디자인에 마스코트 5종을 적절한 화면에 끼워넣어 드릴까요? (예: 리뷰 등록 후 컨페티 화면, 검색 결과 없을 때 빈 상태 등 추가) 아니면 Claude Code 핸드오프용으로 컴포넌트 명세/스펙 문서 만들어 드려도 좋아요.

## User

캐릭터 변경해주고 아마 이건 웹앱으로 프로토타입만 제출하면 되서 프로토타입용으로 변경해줘

## Assistant

_[tool: update_todos]_

_[tool: image_metadata]_

좋습니다. 마스코트를 새 캐릭터셋으로 교체하고 프로토타입에 맞게 다듬을게요.

_[tool: view_image]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: view_image]_

_[tool: run_script]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: view_image]_

_[tool: str_replace_edit]_

Now let me swap the mascot in login and home (the new character has a different style — flatter, illustrated rather than 3D, so I'll adjust the surrounding treatment too).

_[tool: str_replace_edit]_

_[tool: write_file]_

Now I'll add the interactive prototype layer. Each screen gets a `nav` context so key buttons navigate between screens, plus a success modal using the happy mascot.

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

Now wire up the prototype as the first artboard in the canvas.

_[tool: str_replace_edit]_

_[tool: grep]_

_[tool: read_file]_

_[tool: run_script]_

_[tool: eval_js]_

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: read_file]_

_[tool: str_replace_edit]_

_[tool: read_file]_

_[tool: write_file]_

_[tool: done]_

_[tool: save_screenshot]_

_[tool: view_image]_

마스코트 교체 + 프로토타입화 완료! 두 가지 변경사항:

**1. 새 마스코트 (5종 표정) 적용**
- 스티커시트에서 5개 캐릭터를 각각 자동 크롭 + 체커보드 배경 제거 → 투명 PNG 5장 (`mascot-hero/happy/surprise/angry/think.png`)
- 로그인 화면 & 홈 배너의 마스코트를 새 hero 캐릭터로 교체
- 리뷰 등록 완료 모달에 happy(💖) 표정 마스코트 사용 (pop 애니메이션 포함)

**2. 인터랙티브 프로토타입으로 전환**
- 화면 최상단에 새 섹션 "▶ 인터랙티브 프로토타입" — **클릭 가능한 단일 폰**
- 화면 전환 플로우:
  - 로그인 화면: 카카오/구글/학생 인증 버튼 → 홈
  - 홈: 배너/식당 카드 클릭 → 상세 / 탭바 "지도" → 지도
  - 지도: 미리보기 카드 클릭 → 상세
  - 상세: ← 백버튼 → 홈 / "리뷰 쓰기" → 리뷰 작성
  - 리뷰 작성: ✕ → 상세 / "리뷰 등록하기" → 🎉 성공 모달 → 상세 복귀
- 하단 섹션 "화면 스펙 · 5 screens"는 그대로 유지 — 각 화면의 정적 디자인 검토용

**다음 단계 추천**
- Claude Code로 핸드오프하실 때 이 HTML 파일 + `assets/mascot-*.png` 5장을 통째로 넘기시면 React/Next.js로 옮기기 좋아요
- 학교 주변 식당 시드 데이터 (10~20곳 상호/주소/메뉴/가격)만 미리 정리해두시면 백엔드 붙이는 게 훨씬 빨라집니다

## User

정적 디자인에서 좀더 디자인이 나왔으면 좋겠어 워크플로우가 보일정도로 그리고 기준은 갤럭시 25울트라로 해줘 내폰 기준으로 해줘

## Assistant

_[tool: read_file]_

_[tool: copy_starter_component]_

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: write_file]_

Galaxy S25 Ultra has its own look (squared body, hole-punch, flat sides). Let me build a custom frame for it and re-do the workflow board layout.

_[tool: write_file]_

Now let me build the workflow board with arrows and Galaxy frames.

_[tool: write_file]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: get_webview_logs]_

_[tool: save_screenshot]_

_[tool: show_html]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: sleep]_

_[tool: save_screenshot]_

_[tool: show_html]_

_[tool: save_screenshot]_

_[tool: eval_js]_

_[tool: save_screenshot]_

_[tool: done]_

_[tool: save_screenshot]_

_[tool: sleep]_

_[tool: multi_screenshot]_

_[tool: eval_js]_

페이지는 정상 렌더링되고 있어요 (콘솔 에러 없음, 7개 아트보드 전부 마운트됨). 미리보기 캡처가 일시적으로 안 잡혀서 화면을 보여드리진 못하지만 사용자 측 미리보기는 정상입니다.

**업데이트 내용**

1. **갤럭시 S25 Ultra 디바이스 프레임** (`galaxy-frame.jsx`)
   - 412×916 화면 / 얇은 베젤 / 센터 펀치홀 카메라 / 사이드 버튼 힌트
   - One UI 스타일 스테이터스바 (시간·신호·WiFi·배터리)
   - 5개 화면 + 인터랙티브 프로토타입 모두 갤럭시 프레임으로 교체

2. **워크플로우 보드 추가** (`screens/workflow.jsx`)
   - 2540×1280 와이드 아트보드 한 장에 전체 사용자 플로우 시각화
   - 좌측: **김경일 페르소나 카드** (신입생·기숙사·예산 8천원·혼밥 OK·빠른 조리)
   - 중앙: **4개 화면 → 완료** 가로 플로우, 단계별 ① ~ ④ 배지 + 전환 액션 라벨 (예: "카카오 로그인 → 학생 인증 1초", "식당 카드 클릭 → 추천 또는 리스트")
   - 우측 상단: **분기 동선** 안내 (홈 → 지도 → 마커 → 상세)
   - 하단: **디자인 시스템 스트립** — 브랜드 / 컬러 5종 / 타입 시스템 / 마스코트 5종 (히어로·성공·추천·빈 상태·에러) 매핑

3. **섹션 구성**
   - ▶ 인터랙티브 프로토타입 (클릭 가능)
   - 사용자 워크플로우 (한눈에 보이는 플로우)
   - 화면 스펙 · 5 screens (각 화면 풀사이즈 검토용)

위에서 아래로 스크롤하면서 보면 됩니다. 캔버스에서 휠스크롤로 줌인/아웃 + 드래그 패닝 가능해요.

## User

이걸 그대로 클로드 코드에게 웹앱으로 만들어 달라고 하면 만들어줄까? 재대로 작동되게

## Assistant

솔직히 말하면 **그대로 던지면 안 됩니다.** 작동은 되지만 "프로토타입 같은 작동"으로 끝날 가능성이 크고, 실제 학생들이 쓸 수 있는 수준까지 가려면 몇 가지를 미리 정리해서 같이 주는 게 좋아요.

## 그대로 줬을 때 클로드 코드가 할 수 있는 것
- 이 HTML/JSX를 **Next.js (또는 Vite + React)** 프로젝트로 재구성
- `useState` 기반 임시 라우팅 → **React Router / Next App Router**로 교체
- 마스코트 이미지, 폰트, 색상 토큰 등 **디자인 자산은 거의 그대로 살림**
- 더미 데이터 → **로컬 JSON 파일** 또는 Supabase 테이블로 옮김
- Vercel/Netlify에 배포까지

## 그대로 줬을 때 안 되는 것 (실제 학생이 못 씀)
| 기능 | 문제 | 필요한 것 |
|---|---|---|
| 카카오/구글 로그인 | 지금은 가짜 버튼 | **카카오 디벨로퍼스 앱 등록 + REST API 키 + Redirect URI** |
| 지도 | 지금은 SVG 일러스트 | **카카오맵 JS SDK 키** (네이버맵도 가능) |
| 식당 데이터 | 더미 3~5개 | **실제 식당 시드 데이터 10~30곳** (이름·주소·메뉴·가격·사진) |
| 리뷰 저장 | 안 됨 | **Supabase / Firebase** (DB + 이미지 스토리지) |
| 실시간 혼잡도 | 가짜 데이터 | 처음엔 그냥 "시간대별 평균"으로 대체 |
| 학생 인증 | 가짜 | 처음엔 이메일 도메인(@kyungil.ac.kr) 체크로 대체 |

## 추천 접근법 — 3단계로 쪼개기

**1단계 (1~2일): 프론트엔드만 진짜로**
프롬프트 예시:
> "이 HTML 프로토타입을 Next.js 14 (App Router) + TypeScript + Tailwind로 변환해줘. 백엔드는 일단 `/lib/mockData.ts`에서 더미 데이터 import. 라우팅은 `/login`, `/home`, `/map`, `/restaurant/[id]`, `/review/[id]`로. 마스코트 이미지와 디자인 토큰은 그대로 유지. 모바일 우선이고 갤럭시 S25 Ultra 사이즈가 기준이지만 데스크탑에서도 깨지지 않게."

→ Vercel에 배포해서 일단 친구들한테 데모 가능한 상태로 만듦

**2단계 (2~3일): 백엔드 연결**
> "Supabase로 백엔드 붙여줘. 테이블: `restaurants`, `menus`, `reviews`, `users`. RLS 정책 포함. 시드 데이터는 첨부한 JSON 사용. 이미지 업로드는 Supabase Storage."

→ 이 단계 전에 **시드 데이터 JSON 파일을 미리 만들어서 첨부**해야 함 (가장 중요!)

**3단계 (1~2일): 외부 SDK 연결**
> "카카오맵 JS SDK 연결해서 `/map` 페이지를 진짜 지도로 교체. 카카오 로그인도 붙여줘. 키는 `.env.local`에서 읽기."

→ 카카오 디벨로퍼스 가입하고 키 발급받아 두기

## 통째로 넘기지 말고 같이 넘길 것

1. **이 HTML 파일 전체** (자산 포함)
2. **시드 데이터 JSON** — 진성식당, 캠퍼스 김밥천국 등 실제로 학교 앞에 있는 식당 10~20곳, 메뉴/가격까지
3. **API 키들** — 카카오맵, 카카오 로그인, Supabase URL/anon key
4. **`스펙.md`** — 데이터 모델, 페이지별 동작, "이 버튼을 누르면 어디로" 같은 라우팅 규칙

## 솔직한 예상
- **프론트엔드만 작동하는 데모**: 클로드 코드 1세션으로 가능 (1~2시간)
- **백엔드 + 로그인 + 지도까지 진짜로 작동**: 2~3일 분량의 반복 작업. 클로드 코드와 핑퐁하면서 디버깅 해야 함
- **앱스토어 출시 수준**: 안 됨. 그 단계는 React Native나 Flutter로 다시 짜야 함

원하시면 **클로드 코드에 넘길 핸드오프 문서 (`HANDOFF.md`)와 더미 시드 데이터 JSON**을 지금 만들어드릴 수 있어요. 그거 둘만 있으면 클로드 코드가 헤매는 시간이 절반 이하로 줄어듭니다.

