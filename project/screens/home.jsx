// HomeScreen — search, recommendation banner, nearby restaurants, filters, tab bar
function HomeScreen({ active = 'home' }) {
  const nav = (window.useNav && window.useNav()) || { go: () => {} };
  const [cat, setCat] = React.useState('전체');
  const [budget, setBudget] = React.useState('8천원 이하');

  const cats = [
    { k: '전체', icon: '🍽️' },
    { k: '한식', icon: '🍚' },
    { k: '중식', icon: '🥟' },
    { k: '일식', icon: '🍣' },
    { k: '분식', icon: '🍢' },
    { k: '카페', icon: '☕' },
    { k: '치킨', icon: '🍗' },
  ];

  const budgets = ['전체', '6천원 이하', '8천원 이하', '1만원 이하'];

  const nearby = [
    { name: '진성식당', cat: '한식 · 백반', dist: 80, price: '7,000원~', rating: 4.8, reviews: 326, busy: '여유', solo: true, tag: '가성비 갑' },
    { name: '캠퍼스 김밥천국', cat: '분식', dist: 120, price: '4,500원~', rating: 4.6, reviews: 512, busy: '보통', solo: true, tag: '혼밥 OK' },
    { name: '하카타 라멘', cat: '일식 · 라멘', dist: 240, price: '9,000원~', rating: 4.7, reviews: 188, busy: '혼잡', solo: false, tag: '조리 5분' },
  ];

  return (
    <div style={{
      width: '100%', height: '100%', background: '#0E0B09',
      fontFamily: '"Inter", -apple-system, system-ui, sans-serif',
      color: '#fff', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 100 }}>

        {/* Header */}
        <div style={{ padding: '68px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                📍 경일대 본관 앞
              </div>
              <div style={{
                marginTop: 4, fontSize: 22, fontWeight: 800, letterSpacing: -0.3,
                whiteSpace: 'nowrap',
              }}>
                오늘 뭐 먹지? <span style={{ color: '#FF8904' }}>🍴</span>
              </div>
            </div>
            <div style={{
              width: 40, height: 40, borderRadius: 14,
              background: 'linear-gradient(135deg, #FF8904, #FB2C36)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 14, color: '#fff',
              boxShadow: '0 8px 20px rgba(251,44,54,0.35)',
            }}>김</div>
          </div>

          {/* Search */}
          <div style={{
            marginTop: 16, height: 50, borderRadius: 16,
            background: '#1A1614', border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', padding: '0 16px', gap: 10,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="rgba(255,255,255,0.5)" strokeWidth="2"/>
              <path d="M20 20l-3.5-3.5" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, whiteSpace: 'nowrap' }}>가게 · 메뉴 검색</span>
          </div>
        </div>

        {/* Banner — 오늘의 추천 */}
        <div style={{ padding: '20px 20px 0' }}>
          <div onClick={() => nav.go('detail')} style={{
            position: 'relative', borderRadius: 22, overflow: 'hidden',
            background: 'linear-gradient(135deg, #FF8904 0%, #FB2C36 100%)',
            padding: '20px 18px', minHeight: 152, cursor: 'pointer',
          }}>
            <div style={{
              position: 'absolute', right: -16, bottom: -8, width: 138, height: 158,
            }}>
              <img src="assets/mascot-hero.png" alt="" style={{
                width: '100%', height: '100%', objectFit: 'contain',
                filter: 'drop-shadow(0 8px 14px rgba(0,0,0,0.25))',
              }} />
            </div>
            <div style={{
              display: 'inline-block', padding: '5px 10px', borderRadius: 999,
              background: 'rgba(0,0,0,0.18)', color: '#fff',
              fontSize: 11, fontWeight: 700, letterSpacing: 0.4,
            }}>TODAY'S PICK · 11/24</div>
            <div style={{
              marginTop: 12, fontSize: 22, fontWeight: 800,
              lineHeight: 1.25, maxWidth: 210, letterSpacing: -0.3,
            }}>오늘 점심은<br/><span style={{
              background: 'rgba(255,255,255,0.95)', color: '#FB2C36',
              padding: '2px 8px', borderRadius: 6,
            }}>진성식당</span> 어때?</div>
            <div style={{
              marginTop: 8, fontSize: 12, color: 'rgba(255,255,255,0.92)',
              display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500,
            }}>
              ⭐ 4.8 · 도보 1분 · 7,000원~
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div style={{ padding: '24px 0 0' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 20px', marginBottom: 12,
          }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>카테고리</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>전체보기</div>
          </div>
          <div style={{
            display: 'flex', gap: 10, overflowX: 'auto', padding: '0 20px',
          }}>
            {cats.map(c => (
              <div key={c.k} onClick={() => setCat(c.k)} style={{
                flex: '0 0 auto',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                cursor: 'pointer',
              }}>
                <div style={{
                  width: 54, height: 54, borderRadius: 16,
                  background: cat === c.k
                    ? 'linear-gradient(135deg, #FF8904, #FB2C36)'
                    : '#1A1614',
                  border: cat === c.k ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                  boxShadow: cat === c.k ? '0 6px 16px rgba(251,44,54,0.35)' : 'none',
                }}>{c.icon}</div>
                <div style={{
                  fontSize: 11, fontWeight: cat === c.k ? 700 : 500,
                  color: cat === c.k ? '#fff' : 'rgba(255,255,255,0.6)',
                }}>{c.k}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget filter */}
        <div style={{
          marginTop: 18, padding: '0 20px', display: 'flex', gap: 8, overflowX: 'auto',
        }}>
          {budgets.map(b => (
            <div key={b} onClick={() => setBudget(b)} style={{
              flex: '0 0 auto', padding: '8px 14px', borderRadius: 999,
              fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap',
              background: budget === b ? '#FF8904' : 'transparent',
              border: budget === b ? '1px solid #FF8904' : '1px solid rgba(255,255,255,0.10)',
              color: budget === b ? '#fff' : 'rgba(255,255,255,0.7)',
              cursor: 'pointer',
            }}>💰 {b}</div>
          ))}
        </div>

        {/* Nearby restaurants */}
        <div style={{
          marginTop: 24, padding: '0 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: -0.3, whiteSpace: 'nowrap' }}>지금 가까운 맛집</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2, whiteSpace: 'nowrap' }}>경일대 정문 500m 이내</div>
          </div>
          <div style={{
            fontSize: 12, color: 'rgba(255,255,255,0.6)',
            display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap',
          }}>거리순 ▾</div>
        </div>

        <div style={{
          padding: '14px 20px 0',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          {nearby.map((r, i) => (
            <div key={i} onClick={() => nav.go('detail')} style={{
              background: '#1A1614', borderRadius: 18, padding: 12, cursor: 'pointer',
              display: 'flex', gap: 12, border: '1px solid rgba(255,255,255,0.04)',
            }}>
              <div style={{
                width: 80, height: 80, borderRadius: 12, flexShrink: 0,
                background: `repeating-linear-gradient(135deg, #2A211B 0 6px, #221B17 6px 12px)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <div style={{ fontSize: 28 }}>{['🍲', '🥢', '🍜'][i]}</div>
                <div style={{
                  position: 'absolute', top: 6, left: 6,
                  background: 'rgba(0,0,0,0.6)', color: '#FFB261',
                  fontSize: 9, fontWeight: 700, padding: '3px 6px', borderRadius: 6,
                }}>{r.tag}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: -0.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
                  <div style={{
                    fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999,
                    whiteSpace: 'nowrap', flexShrink: 0,
                    color: r.busy === '여유' ? '#5BD06A' : r.busy === '보통' ? '#FFB261' : '#FF6B6B',
                    background: r.busy === '여유' ? 'rgba(91,208,106,0.12)' : r.busy === '보통' ? 'rgba(255,178,97,0.12)' : 'rgba(255,107,107,0.12)',
                  }}>● {r.busy}</div>
                </div>
                <div style={{
                  marginTop: 3, fontSize: 12, color: 'rgba(255,255,255,0.55)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{r.cat} · 도보 {Math.ceil(r.dist/80)}분 ({r.dist}m)</div>
                <div style={{
                  marginTop: 8, display: 'flex', alignItems: 'center', gap: 8,
                  fontSize: 12, color: 'rgba(255,255,255,0.75)',
                }}>
                  <span style={{ color: '#FFD56B', fontWeight: 700 }}>★ {r.rating}</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)' }}>·</span>
                  <span style={{ color: 'rgba(255,255,255,0.55)' }}>리뷰 {r.reviews}</span>
                  <span style={{ color: 'rgba(255,255,255,0.35)' }}>·</span>
                  <span style={{ color: '#fff', fontWeight: 700 }}>{r.price}</span>
                </div>
                <div style={{ marginTop: 8, display: 'flex', gap: 4 }}>
                  {r.solo && <span style={{
                    fontSize: 10, fontWeight: 600, padding: '3px 7px',
                    borderRadius: 6, background: 'rgba(91,208,106,0.10)', color: '#5BD06A',
                  }}>🪑 1인석</span>}
                  <span style={{
                    fontSize: 10, fontWeight: 600, padding: '3px 7px',
                    borderRadius: 6, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)',
                  }}>⏱ {[5, 8, 12][i]}분</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab bar */}
      <TabBar active={active} />
    </div>
  );
}

function TabBar({ active = 'home' }) {
  const nav = (window.useNav && window.useNav()) || { go: () => {} };
  const tabs = [
    { id: 'home',    label: '홈',     icon: '🏠', target: 'home' },
    { id: 'map',     label: '지도',   icon: '🗺️', target: 'map' },
    { id: 'wish',    label: '위시',   icon: '❤️', target: 'home' },
    { id: 'review',  label: '리뷰',   icon: '✍️', target: 'home' },
    { id: 'my',      label: '마이',   icon: '👤', target: 'home' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0,
      background: 'rgba(13,11,9,0.92)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: '10px 8px 26px',
      display: 'flex', justifyContent: 'space-around',
    }}>
      {tabs.map(t => (
        <div key={t.id} onClick={() => nav.go(t.target)} style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          cursor: 'pointer',
        }}>
          <div style={{
            fontSize: 20, opacity: active === t.id ? 1 : 0.45,
            filter: active === t.id ? 'none' : 'grayscale(0.6)',
          }}>{t.icon}</div>
          <div style={{
            fontSize: 10, fontWeight: 700, whiteSpace: 'nowrap',
            color: active === t.id ? '#FF8904' : 'rgba(255,255,255,0.5)',
          }}>{t.label}</div>
        </div>
      ))}
    </div>
  );
}

window.HomeScreen = HomeScreen;
window.TabBar = TabBar;
