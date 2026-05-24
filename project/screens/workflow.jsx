// WorkflowBoard — 5 phones laid out with arrows showing the user flow.

function MiniPhone({ children, scale = 0.55 }) {
  // Compact Galaxy frame for use inside the workflow board.
  // 412×916 native, scaled to fit.
  return (
    <div style={{
      width: 412 * scale + 20, height: 916 * scale + 20,
      transform: `scale(1)`, transformOrigin: 'top left',
      position: 'relative',
    }}>
      <div style={{
        transform: `scale(${scale})`, transformOrigin: 'top left',
        width: 412 + 20, height: 916 + 20,
      }}>
        <GalaxyFrame width={412} height={916}>{children}</GalaxyFrame>
      </div>
    </div>
  );
}

function StepBadge({ n }) {
  return (
    <div style={{
      position: 'absolute', top: -16, left: -16, zIndex: 30,
      width: 44, height: 44, borderRadius: '50%',
      background: 'linear-gradient(135deg, #FF8904, #FB2C36)',
      color: '#fff', fontFamily: '"Inter", sans-serif',
      fontWeight: 800, fontSize: 18, letterSpacing: -0.5,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 10px 24px rgba(251,44,54,0.40), 0 0 0 4px #fff',
    }}>{n}</div>
  );
}

function StepLabel({ title, sub }) {
  return (
    <div style={{
      marginTop: 14, textAlign: 'center',
      fontFamily: '"Inter", sans-serif',
    }}>
      <div style={{ fontSize: 17, fontWeight: 800, color: '#1a1714', letterSpacing: -0.3 }}>{title}</div>
      <div style={{ marginTop: 4, fontSize: 12, color: 'rgba(40,30,20,0.55)', fontWeight: 500 }}>{sub}</div>
    </div>
  );
}

// Arrow between two phones with label
function FlowArrow({ x, y, w = 90, label, sub, color = '#FF8904', dir = 'right' }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width: w,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: 11, fontWeight: 700, color, letterSpacing: -0.1,
        padding: '4px 8px', borderRadius: 8, background: '#fff',
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)', whiteSpace: 'nowrap',
        marginBottom: 4,
      }}>{label}</div>
      {sub && <div style={{
        fontSize: 10, color: 'rgba(40,30,20,0.45)', fontFamily: '"Inter", sans-serif',
        marginBottom: 6, whiteSpace: 'nowrap',
      }}>{sub}</div>}
      <svg width={w} height="28" viewBox={`0 0 ${w} 28`} style={{ overflow: 'visible' }}>
        <defs>
          <marker id={`ah-${color.replace('#','')}`} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L8,5 L0,10 z" fill={color}/>
          </marker>
        </defs>
        <path d={`M 4 14 L ${w - 10} 14`} stroke={color} strokeWidth="2.5" strokeDasharray="6 4"
              fill="none" strokeLinecap="round"
              markerEnd={`url(#ah-${color.replace('#','')})`}/>
      </svg>
    </div>
  );
}

function WorkflowBoard() {
  const SCALE = 0.55;
  const PHONE_W = 412 * SCALE + 20;   // ≈ 247
  const PHONE_H = 916 * SCALE + 20;   // ≈ 524
  const GAP = 86;
  const COL = PHONE_W + GAP;          // ≈ 333

  // 5 phones in a row, plus a success "card" at the end
  const phones = [
    { id: 'login',  title: '로그인',     sub: '카카오 · 구글 · 학생 인증', render: <LoginScreen /> },
    { id: 'home',   title: '홈',         sub: '추천 · 카테고리 · 예산 필터', render: <HomeScreen active="home" /> },
    { id: 'detail', title: '식당 상세',  sub: '메뉴 · 별점 · 학생 리뷰',   render: <DetailScreen /> },
    { id: 'review', title: '리뷰 작성',  sub: '별점 · 사진 · 태그',         render: <ReviewScreen /> },
  ];

  // arrows between phones (centered vertically against phone body)
  const arrowY = 90 + PHONE_H / 2 - 20;

  return (
    <div style={{
      width: 2540, height: 1280, position: 'relative',
      background: `
        radial-gradient(circle at 20% 10%, rgba(255,137,4,0.08), transparent 40%),
        radial-gradient(circle at 80% 90%, rgba(251,44,54,0.06), transparent 50%),
        linear-gradient(180deg, #FFF8F0 0%, #FCEFE2 100%)`,
      borderRadius: 24, overflow: 'hidden',
      fontFamily: '"Inter", sans-serif',
    }}>
      {/* Title */}
      <div style={{
        position: 'absolute', top: 32, left: 40,
      }}>
        <div style={{
          display: 'inline-block', padding: '5px 12px', borderRadius: 999,
          background: 'rgba(255,137,4,0.12)', color: '#FF6900',
          fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 8,
        }}>USER FLOW · Galaxy S25 Ultra</div>
        <div style={{ fontSize: 36, fontWeight: 800, color: '#1a1714', letterSpacing: -0.8 }}>
          맛일짱 사용자 시나리오
        </div>
        <div style={{ marginTop: 6, fontSize: 14, color: 'rgba(40,30,20,0.55)', maxWidth: 560 }}>
          신입생 김경일 학생이 점심 메뉴를 정하지 못해 앱을 열고, 리뷰까지 남기는 전체 흐름
        </div>
      </div>

      {/* Side branch: Map */}
      <div style={{ position: 'absolute', top: 32, right: 40, textAlign: 'right' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(40,30,20,0.55)' }}>분기 동선</div>
        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
          <div style={{
            padding: '6px 12px', borderRadius: 999, background: '#fff',
            border: '1px solid rgba(0,0,0,0.08)', fontSize: 12, fontWeight: 700, color: '#1a1714',
            boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
          }}>홈 → 🗺️ 지도 → 마커 → 상세</div>
        </div>
      </div>

      {/* Persona card */}
      <div style={{
        position: 'absolute', left: 40, top: 180,
        width: 320, padding: 18, borderRadius: 16,
        background: '#fff', border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF8904, #FB2C36)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 800, fontSize: 20,
          }}>김경</div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#1a1714' }}>김경일 · 신입생</div>
            <div style={{ fontSize: 11, color: 'rgba(40,30,20,0.6)' }}>경영학과 25학번 · 기숙사 거주</div>
          </div>
        </div>
        <div style={{
          marginTop: 12, padding: 10, borderRadius: 10,
          background: '#FFF7ED', fontSize: 12, color: '#7A4500', lineHeight: 1.5,
        }}>
          "학교 주변 어디서 뭐 먹어야 할지 모르겠고,<br/>학생 가격대로 양 많은 곳이 어딘지 궁금해요"
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['예산 8천원', '혼밥 OK', '빠른 조리'].map(t => (
            <span key={t} style={{
              padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700,
              background: 'rgba(255,137,4,0.10)', color: '#FF6900',
            }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Workflow row */}
      <div style={{
        position: 'absolute', left: 400, top: 180, right: 40,
        display: 'flex', alignItems: 'flex-start', gap: GAP - 30,
      }}>
        {phones.map((p, i) => {
          const transitions = [
            { label: '카카오 로그인', sub: '학생 인증 1초' },
            { label: '식당 카드 클릭', sub: '추천 또는 리스트' },
            { label: '리뷰 쓰기 버튼', sub: '하단 CTA' },
          ];
          const t = transitions[i];
          return (
            <React.Fragment key={p.id}>
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <StepBadge n={`0${i + 1}`} />
                <MiniPhone scale={SCALE}>{p.render}</MiniPhone>
                <StepLabel title={p.title} sub={p.sub} />
              </div>
              {i < phones.length - 1 && (
                <div style={{
                  flexShrink: 0, paddingTop: PHONE_H / 2 - 28,
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  width: GAP - 30,
                }}>
                  <div style={{
                    padding: '5px 10px', borderRadius: 8, background: '#fff',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.08)', whiteSpace: 'nowrap',
                    fontSize: 11, fontWeight: 800, color: '#FF6900',
                  }}>{t.label}</div>
                  <div style={{
                    marginTop: 4, fontSize: 10, color: 'rgba(40,30,20,0.45)',
                    whiteSpace: 'nowrap', fontWeight: 500,
                  }}>{t.sub}</div>
                  <svg width={GAP - 30} height="36" viewBox={`0 0 ${GAP - 30} 36`} style={{ marginTop: 8, overflow: 'visible' }}>
                    <defs>
                      <marker id={`fa-${i}`} markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                        <path d="M0,0 L8,5 L0,10 z" fill="#FF8904"/>
                      </marker>
                    </defs>
                    <path d={`M 6 18 L ${GAP - 44} 18`} stroke="#FF8904" strokeWidth="2.5"
                          strokeDasharray="6 4" fill="none" strokeLinecap="round"
                          markerEnd={`url(#fa-${i})`}/>
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* End: success */}
        <div style={{
          flexShrink: 0, paddingTop: PHONE_H / 2 - 28,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{
            padding: '5px 10px', borderRadius: 8, background: '#fff',
            boxShadow: '0 4px 10px rgba(0,0,0,0.08)', whiteSpace: 'nowrap',
            fontSize: 11, fontWeight: 800, color: '#FF6900',
          }}>리뷰 등록</div>
          <div style={{ marginTop: 4, fontSize: 10, color: 'rgba(40,30,20,0.45)', whiteSpace: 'nowrap', fontWeight: 500 }}>50P 적립</div>
          <svg width="56" height="36" style={{ marginTop: 8, overflow: 'visible' }}>
            <defs>
              <marker id="fa-end" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
                <path d="M0,0 L8,5 L0,10 z" fill="#FF8904"/>
              </marker>
            </defs>
            <path d="M 6 18 L 44 18" stroke="#FF8904" strokeWidth="2.5"
                  strokeDasharray="6 4" fill="none" strokeLinecap="round"
                  markerEnd="url(#fa-end)"/>
          </svg>
          <div style={{
            marginTop: 8, width: 140, padding: 14, borderRadius: 16,
            background: 'linear-gradient(135deg, #FF8904, #FB2C36)',
            color: '#fff', textAlign: 'center',
            boxShadow: '0 14px 30px rgba(251,44,54,0.35)',
          }}>
            <img src="assets/mascot-happy.png" alt="" style={{ width: 84, height: 84, objectFit: 'contain' }} />
            <div style={{ marginTop: 4, fontSize: 13, fontWeight: 800 }}>완료!</div>
            <div style={{ marginTop: 2, fontSize: 10, opacity: 0.9 }}>🎉 +50P</div>
          </div>
        </div>
      </div>

      {/* Bottom: design tokens strip */}
      <div style={{
        position: 'absolute', left: 40, right: 40, bottom: 32,
        padding: 20, borderRadius: 16,
        background: '#fff', border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: '0 8px 20px rgba(0,0,0,0.04)',
        display: 'flex', gap: 32, alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(40,30,20,0.5)', letterSpacing: 1 }}>BRAND</div>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="assets/mascot-hero.png" alt="" style={{ width: 60, height: 60, objectFit: 'contain' }} />
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#1a1714' }}>맛일짱</div>
              <div style={{ fontSize: 11, color: 'rgba(40,30,20,0.55)' }}>경일대 학생 전용 맛집 앱</div>
            </div>
          </div>
        </div>

        <div style={{ width: 1, height: 64, background: 'rgba(0,0,0,0.08)' }} />

        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(40,30,20,0.5)', letterSpacing: 1 }}>COLOR</div>
          <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
            {[
              { c: '#FF8904', n: 'Primary' },
              { c: '#FB2C36', n: 'Accent' },
              { c: '#FFD56B', n: 'Star' },
              { c: '#0E0B09', n: 'Dark BG' },
              { c: '#1A1614', n: 'Surface' },
            ].map(s => (
              <div key={s.c} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, background: s.c,
                  boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
                }} />
                <div style={{ marginTop: 4, fontSize: 9, color: 'rgba(40,30,20,0.55)' }}>{s.n}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ width: 1, height: 64, background: 'rgba(0,0,0,0.08)' }} />

        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(40,30,20,0.5)', letterSpacing: 1 }}>TYPE</div>
          <div style={{ marginTop: 8, display: 'flex', gap: 18, alignItems: 'baseline' }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#1a1714', fontFamily: '"Black Han Sans"', lineHeight: 1 }}>맛일짱</div>
              <div style={{ fontSize: 9, color: 'rgba(40,30,20,0.55)', marginTop: 4 }}>Black Han Sans · 헤드라인</div>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#1a1714', lineHeight: 1 }}>Inter Bold</div>
              <div style={{ fontSize: 9, color: 'rgba(40,30,20,0.55)', marginTop: 4 }}>Inter · 본문/UI</div>
            </div>
          </div>
        </div>

        <div style={{ width: 1, height: 64, background: 'rgba(0,0,0,0.08)' }} />

        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(40,30,20,0.5)', letterSpacing: 1 }}>MASCOT</div>
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            {[
              { f: 'assets/mascot-hero.png',     n: '히어로' },
              { f: 'assets/mascot-happy.png',    n: '성공' },
              { f: 'assets/mascot-think.png',    n: '추천' },
              { f: 'assets/mascot-surprise.png', n: '빈 상태' },
              { f: 'assets/mascot-angry.png',    n: '에러' },
            ].map(m => (
              <div key={m.f} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 56, height: 56, borderRadius: 12,
                  background: '#FFF7ED', border: '1px solid rgba(255,137,4,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <img src={m.f} alt="" style={{ width: 48, height: 48, objectFit: 'contain' }} />
                </div>
                <div style={{ marginTop: 4, fontSize: 9, color: 'rgba(40,30,20,0.55)' }}>{m.n}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

window.WorkflowBoard = WorkflowBoard;
window.MiniPhone = MiniPhone;
