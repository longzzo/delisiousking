// DetailScreen — restaurant detail
function DetailScreen() {
  const nav = (window.useNav && window.useNav()) || { go: () => {} };
  const menus = [
    { name: '제육볶음 정식', price: '7,000원', tag: '베스트', desc: '학생 90% 주문' },
    { name: '김치찌개 정식', price: '7,000원', tag: '', desc: '얼큰한 국물' },
    { name: '오므라이스',     price: '6,500원', tag: '가성비', desc: '계란 듬뿍' },
    { name: '치즈돈까스',     price: '8,500원', tag: '', desc: '' },
  ];

  const reviews = [
    {
      author: '경영 24학번 김OO', when: '2일 전', rating: 5, photos: 2,
      tags: ['가성비', '혼밥하기 좋음'],
      text: '진짜 가성비 갑이에요. 제육볶음 + 된장국 + 반찬 4개에 7천원이면 학식보다 낫습니다. 1인석도 있어서 혼밥 편함.',
    },
    {
      author: '컴공 23학번 박OO', when: '5일 전', rating: 4, photos: 1,
      tags: ['양 많음', '빠른 조리'],
      text: '점심시간엔 사람 좀 많은데 5분이면 음식 나옴. 양 많아서 배부르게 먹었어요.',
    },
  ];

  return (
    <div style={{
      width: '100%', height: '100%', background: '#0E0B09', position: 'relative',
      fontFamily: '"Inter", -apple-system, system-ui, sans-serif',
      color: '#fff', overflow: 'hidden',
    }}>
      <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 100 }}>

        {/* Hero image */}
        <div style={{
          position: 'relative', height: 260,
          background: 'linear-gradient(180deg, #3A2A1E, #1A1310)',
          overflow: 'hidden',
        }}>
          {/* gradient food bg */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle at 30% 40%, rgba(255,137,4,0.35), transparent 60%),
                         radial-gradient(circle at 70% 60%, rgba(251,44,54,0.30), transparent 60%),
                         repeating-linear-gradient(45deg, rgba(0,0,0,0.05) 0 8px, transparent 8px 16px)`,
          }} />
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)', fontSize: 88, opacity: 0.85,
            filter: 'drop-shadow(0 12px 20px rgba(0,0,0,0.5))',
          }}>🍲</div>

          {/* top bar */}
          <div style={{
            position: 'absolute', top: 58, left: 16, right: 16,
            display: 'flex', justifyContent: 'space-between', zIndex: 5,
          }}>
            <div onClick={() => nav.go('home')} style={{
              width: 38, height: 38, borderRadius: 12,
              background: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 6l-6 6 6 6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12v8a1 1 0 001 1h14a1 1 0 001-1v-8M16 6l-4-4-4 4M12 2v13" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 16,
              }}>♡</div>
            </div>
          </div>

          {/* image dots */}
          <div style={{
            position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: 4,
          }}>
            {[0,1,2,3].map(i => (
              <div key={i} style={{
                width: i === 0 ? 18 : 5, height: 5, borderRadius: 999,
                background: i === 0 ? '#fff' : 'rgba(255,255,255,0.4)',
              }} />
            ))}
          </div>
        </div>

        {/* Header */}
        <div style={{ padding: '20px 20px 0' }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8, flexWrap: 'wrap' }}>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 6,
              background: 'rgba(255,137,4,0.15)', color: '#FFB261', whiteSpace: 'nowrap',
            }}>가성비 갑</span>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 6,
              background: 'rgba(91,208,106,0.12)', color: '#5BD06A', whiteSpace: 'nowrap',
            }}>🪑 1인석 있음</span>
            <span style={{
              fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 6,
              background: 'rgba(81,162,255,0.12)', color: '#51A2FF', whiteSpace: 'nowrap',
            }}>⏱ 5분 조리</span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5, whiteSpace: 'nowrap' }}>진성식당</div>
          <div style={{
            marginTop: 8, display: 'flex', alignItems: 'center', gap: 10,
            fontSize: 13, whiteSpace: 'nowrap',
          }}>
            <span style={{ color: '#FFD56B', fontWeight: 800 }}>★ 4.8</span>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>(리뷰 326)</span>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>한식 · 백반</span>
          </div>

          {/* meta */}
          <div style={{
            marginTop: 16, padding: 14, borderRadius: 14,
            background: '#1A1614', border: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', flexDirection: 'column', gap: 8,
            fontSize: 13,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 18 }}>📍</span>
              <span style={{ color: 'rgba(255,255,255,0.85)', flex: 1 }}>경산시 하양읍 가마실길 24 · 도보 1분</span>
              <span style={{ color: '#FF8904', fontSize: 12, fontWeight: 700 }}>복사</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 18 }}>🕒</span>
              <span style={{ color: 'rgba(255,255,255,0.85)', flex: 1, minWidth: 0 }}>
                <span style={{ color: '#5BD06A', fontWeight: 700 }}>영업중</span> · 10:30 ~ 21:00<span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}> (15~16:30 브레이크)</span>
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 18 }}>💰</span>
              <span style={{ color: 'rgba(255,255,255,0.85)', flex: 1 }}>1인 평균 <b style={{ color: '#fff' }}>7,500원</b></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 18 }}>📊</span>
              <span style={{ color: 'rgba(255,255,255,0.85)', flex: 1 }}>지금 혼잡도</span>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999,
                color: '#5BD06A', background: 'rgba(91,208,106,0.12)',
              }}>● 여유</span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <div style={{ padding: '24px 20px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          }}>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: -0.3, whiteSpace: 'nowrap' }}>대표 메뉴</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>전체 12개</div>
          </div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {menus.map((m, i) => (
              <div key={i} style={{
                padding: 12, borderRadius: 14,
                background: '#1A1614', border: '1px solid rgba(255,255,255,0.04)',
                display: 'flex', gap: 12, alignItems: 'center',
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 10, flexShrink: 0,
                  background: 'repeating-linear-gradient(135deg, #2A211B 0 4px, #221B17 4px 8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>{['🍱', '🍲', '🍳', '🥩'][i]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap' }}>{m.name}</div>
                    {m.tag && <span style={{
                      fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 4,
                      whiteSpace: 'nowrap',
                      background: m.tag === '베스트' ? '#FB2C36' : 'rgba(255,137,4,0.18)',
                      color: m.tag === '베스트' ? '#fff' : '#FFB261',
                    }}>{m.tag}</span>}
                  </div>
                  {m.desc && <div style={{ marginTop: 2, fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{m.desc}</div>}
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#FFB261', whiteSpace: 'nowrap' }}>{m.price}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div style={{ padding: '28px 20px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          }}>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: -0.3, whiteSpace: 'nowrap' }}>학생 리뷰</div>
            <div style={{ fontSize: 12, color: '#FF8904', fontWeight: 700, whiteSpace: 'nowrap' }}>전체 326개 &rsaquo;</div>
          </div>

          {/* rating summary */}
          <div style={{
            marginTop: 12, padding: 14, borderRadius: 14,
            background: '#1A1614', border: '1px solid rgba(255,255,255,0.04)',
            display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#FFD56B', lineHeight: 1 }}>4.8</div>
              <div style={{ marginTop: 4, fontSize: 11, color: '#FFD56B' }}>★★★★★</div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[5,4,3,2,1].map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10 }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', width: 12 }}>{s}</span>
                  <div style={{ flex: 1, height: 4, borderRadius: 999, background: 'rgba(255,255,255,0.06)' }}>
                    <div style={{
                      width: ['72%', '20%', '5%', '2%', '1%'][i], height: '100%', borderRadius: 999,
                      background: '#FFD56B',
                    }} />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.4)', width: 22, textAlign: 'right' }}>
                    {[235, 65, 16, 6, 4][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* review cards */}
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {reviews.map((r, i) => (
              <div key={i} style={{
                padding: 14, borderRadius: 14,
                background: '#1A1614', border: '1px solid rgba(255,255,255,0.04)',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: ['linear-gradient(135deg, #FF8904, #FB2C36)', 'linear-gradient(135deg, #51A2FF, #2B7FFF)'][i],
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 800,
                    }}>{['김', '박'][i]}</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700 }}>{r.author}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>{r.when}</div>
                    </div>
                  </div>
                  <div style={{ color: '#FFD56B', fontSize: 12, fontWeight: 700 }}>
                    {'★'.repeat(r.rating)}<span style={{ color: 'rgba(255,255,255,0.15)' }}>{'★'.repeat(5 - r.rating)}</span>
                  </div>
                </div>
                {/* photos */}
                <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
                  {Array.from({ length: r.photos }).map((_, j) => (
                    <div key={j} style={{
                      width: 64, height: 64, borderRadius: 10,
                      background: `repeating-linear-gradient(${135+j*30}deg, #2A211B 0 5px, #221B17 5px 10px)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20,
                    }}>{['🍱', '🍚', '🥢'][j]}</div>
                  ))}
                </div>
                <div style={{
                  marginTop: 10, fontSize: 13, lineHeight: 1.5,
                  color: 'rgba(255,255,255,0.85)',
                }}>{r.text}</div>
                <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {r.tags.map(t => (
                    <span key={t} style={{
                      fontSize: 10, fontWeight: 600, padding: '4px 8px', borderRadius: 999,
                      background: 'rgba(255,137,4,0.10)', color: '#FFB261',
                    }}># {t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom action bar */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: 'rgba(13,11,9,0.95)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '12px 16px 26px',
        display: 'flex', gap: 8,
      }}>
        <button style={{
          width: 52, height: 52, borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: 22, cursor: 'pointer',
        }}>♡</button>
        <button style={{
          flex: 1, height: 52, borderRadius: 14, border: '1px solid rgba(255,137,4,0.4)',
          background: 'rgba(255,137,4,0.08)', color: '#FFB261',
          fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l9 7v11h-6v-7H9v7H3V9l9-7z" stroke="#FFB261" strokeWidth="2" strokeLinejoin="round"/>
          </svg>
          길찾기
        </button>
        <button onClick={() => nav.go('review')} style={{
          flex: 1.4, height: 52, borderRadius: 14, border: 'none',
          background: 'linear-gradient(135deg, #FF8904, #FB2C36)', color: '#fff',
          fontSize: 15, fontWeight: 800, fontFamily: 'inherit', cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(251,44,54,0.35)',
          whiteSpace: 'nowrap',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          ✍️ 리뷰 쓰기
        </button>
      </div>
    </div>
  );
}

window.DetailScreen = DetailScreen;
