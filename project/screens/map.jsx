// MapScreen — campus map + markers + preview card
function MapScreen() {
  const nav = (window.useNav && window.useNav()) || { go: () => {} };
  const [selected, setSelected] = React.useState(0);

  const markers = [
    { x: 120, y: 240, rating: 4.8, name: '진성식당',     cat: '한식 · 백반', price: '7,000원~', busy: '여유', dist: '80m',  emoji: '🍲' },
    { x: 200, y: 180, rating: 4.6, name: '캠퍼스 김밥천국', cat: '분식',       price: '4,500원~', busy: '보통', dist: '120m', emoji: '🍙' },
    { x: 92,  y: 360, rating: 4.7, name: '하카타 라멘',   cat: '일식 · 라멘', price: '9,000원~', busy: '혼잡', dist: '240m', emoji: '🍜' },
    { x: 240, y: 320, rating: 4.3, name: '교촌치킨',     cat: '치킨',       price: '9,500원~', busy: '여유', dist: '300m', emoji: '🍗' },
    { x: 170, y: 420, rating: 3.9, name: '왕만두집',     cat: '중식',       price: '5,000원~', busy: '보통', dist: '180m', emoji: '🥟' },
  ];

  const sel = markers[selected];
  const ratingColor = (r) => r >= 4.5 ? '#FF8904' : r >= 4.0 ? '#FFB261' : '#9CA3AF';

  return (
    <div style={{
      width: '100%', height: '100%', background: '#0E0B09', position: 'relative',
      fontFamily: '"Inter", -apple-system, system-ui, sans-serif',
      color: '#fff', overflow: 'hidden',
    }}>
      {/* Map illustration (campus-style) */}
      <div style={{
        position: 'absolute', inset: 0,
        background: '#15110E',
      }}>
        <svg width="100%" height="100%" viewBox="0 0 360 700" preserveAspectRatio="xMidYMid slice">
          {/* land */}
          <rect width="360" height="700" fill="#15110E"/>
          {/* grid */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0L0 0 0 40" stroke="rgba(255,255,255,0.025)" fill="none" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="360" height="700" fill="url(#grid)"/>

          {/* roads */}
          <path d="M-20 280 L380 200" stroke="rgba(255,255,255,0.06)" strokeWidth="22"/>
          <path d="M-20 280 L380 200" stroke="rgba(255,255,255,0.10)" strokeWidth="2" strokeDasharray="6 6"/>
          <path d="M170 -20 L210 720" stroke="rgba(255,255,255,0.06)" strokeWidth="22"/>
          <path d="M170 -20 L210 720" stroke="rgba(255,255,255,0.10)" strokeWidth="2" strokeDasharray="6 6"/>
          <path d="M-20 460 L380 480" stroke="rgba(255,255,255,0.06)" strokeWidth="18"/>

          {/* campus block (Kyungil) */}
          <rect x="40" y="60" width="140" height="120" rx="8" fill="rgba(255,137,4,0.06)" stroke="rgba(255,137,4,0.20)" strokeWidth="1"/>
          <text x="110" y="100" textAnchor="middle" fill="rgba(255,137,4,0.7)" fontSize="11" fontWeight="700" fontFamily="Inter">경일대학교</text>
          <text x="110" y="118" textAnchor="middle" fill="rgba(255,137,4,0.5)" fontSize="9" fontFamily="Inter">KYUNGIL UNIV.</text>
          <rect x="55" y="130" width="40" height="34" rx="3" fill="rgba(255,137,4,0.12)"/>
          <rect x="105" y="130" width="60" height="34" rx="3" fill="rgba(255,137,4,0.12)"/>

          {/* dorm */}
          <rect x="220" y="80" width="100" height="60" rx="6" fill="rgba(91,208,106,0.06)" stroke="rgba(91,208,106,0.18)" strokeWidth="1"/>
          <text x="270" y="115" textAnchor="middle" fill="rgba(91,208,106,0.7)" fontSize="10" fontWeight="600" fontFamily="Inter">기숙사</text>

          {/* park */}
          <circle cx="290" cy="480" r="40" fill="rgba(91,208,106,0.06)" stroke="rgba(91,208,106,0.18)" strokeWidth="1"/>
          <text x="290" y="484" textAnchor="middle" fill="rgba(91,208,106,0.5)" fontSize="9" fontFamily="Inter">근린공원</text>

          {/* random buildings */}
          <rect x="30" y="500" width="40" height="60" rx="4" fill="rgba(255,255,255,0.04)"/>
          <rect x="80" y="540" width="50" height="50" rx="4" fill="rgba(255,255,255,0.04)"/>
          <rect x="240" y="580" width="60" height="40" rx="4" fill="rgba(255,255,255,0.04)"/>

          {/* current location pulse */}
          <circle cx="160" cy="170" r="18" fill="rgba(81,162,255,0.15)">
            <animate attributeName="r" values="14;22;14" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="160" cy="170" r="7" fill="#51A2FF" stroke="#fff" strokeWidth="2.5"/>
        </svg>
      </div>

      {/* Top search bar */}
      <div style={{
        position: 'absolute', top: 58, left: 16, right: 16,
        display: 'flex', gap: 8,
      }}>
        <div style={{
          flex: 1, height: 44, borderRadius: 14,
          background: 'rgba(20,16,14,0.85)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', padding: '0 14px', gap: 10,
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#fff" strokeWidth="2"/>
            <path d="M20 20l-3.5-3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, whiteSpace: 'nowrap' }}>이 지역에서 검색</span>
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 14,
          background: 'rgba(20,16,14,0.85)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M7 12h10M10 18h4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Chip filters */}
      <div style={{
        position: 'absolute', top: 114, left: 0, right: 0,
        display: 'flex', gap: 8, padding: '0 16px', overflowX: 'auto',
      }}>
        {[
          { label: '⭐ 4.5+', active: true },
          { label: '🪑 혼밥 가능', active: false },
          { label: '⏱ 빠른 조리', active: false },
          { label: '💰 8천원 이하', active: true },
          { label: '🟢 한산', active: false },
        ].map((c, i) => (
          <div key={i} style={{
            flex: '0 0 auto', padding: '7px 12px', borderRadius: 999,
            fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap',
            background: c.active ? '#FF8904' : 'rgba(20,16,14,0.85)',
            border: c.active ? '1px solid #FF8904' : '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            color: '#fff',
          }}>{c.label}</div>
        ))}
      </div>

      {/* Right floating controls */}
      <div style={{
        position: 'absolute', right: 14, top: 200,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {[
          <svg key="loc" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" fill="#51A2FF"/>
            <circle cx="12" cy="12" r="7" stroke="#51A2FF" strokeWidth="2"/>
            <path d="M12 2v3M12 19v3M22 12h-3M5 12H2" stroke="#51A2FF" strokeWidth="2" strokeLinecap="round"/>
          </svg>,
          <svg key="layers" width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 2l10 6-10 6L2 8l10-6zM2 14l10 6 10-6M2 18l10 6 10-6" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
          </svg>,
        ].map((icon, i) => (
          <div key={i} style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'rgba(20,16,14,0.9)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 12px rgba(0,0,0,0.3)',
          }}>{icon}</div>
        ))}
      </div>

      {/* Markers */}
      {markers.map((m, i) => (
        <div key={i} onClick={() => setSelected(i)} style={{
          position: 'absolute',
          left: m.x, top: m.y, transform: 'translate(-50%, -100%)',
          cursor: 'pointer', zIndex: selected === i ? 10 : 5,
        }}>
          <div style={{
            width: selected === i ? 44 : 36, height: selected === i ? 44 : 36,
            borderRadius: '50% 50% 50% 0',
            transform: 'rotate(-45deg)',
            background: ratingColor(m.rating),
            border: `2px solid ${selected === i ? '#fff' : 'rgba(255,255,255,0.6)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: selected === i ? '0 10px 20px rgba(255,137,4,0.6)' : '0 4px 10px rgba(0,0,0,0.4)',
            transition: 'all 0.2s',
          }}>
            <div style={{ transform: 'rotate(45deg)', fontSize: selected === i ? 20 : 16 }}>
              {m.emoji}
            </div>
          </div>
          {/* busy badge */}
          <div style={{
            position: 'absolute', top: -4, right: -4,
            width: 14, height: 14, borderRadius: '50%',
            background: m.busy === '여유' ? '#5BD06A' : m.busy === '보통' ? '#FFB261' : '#FF6B6B',
            border: '2px solid #0E0B09',
            transform: 'rotate(0deg)',
          }} />
        </div>
      ))}

      {/* Preview card */}
      <div onClick={() => nav.go('detail')} style={{
        position: 'absolute', bottom: 28, left: 16, right: 16,
        background: '#1A1614', cursor: 'pointer',
        borderRadius: 22, padding: 16,
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
        display: 'flex', gap: 14,
      }}>
        <div style={{
          width: 86, height: 86, borderRadius: 14, flexShrink: 0,
          background: `repeating-linear-gradient(135deg, #2A211B 0 6px, #221B17 6px 12px)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 36, position: 'relative',
        }}>
          {sel.emoji}
          <div style={{
            position: 'absolute', top: 6, left: 6,
            background: 'rgba(0,0,0,0.55)', color: '#FFD56B',
            fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 6,
          }}>★ {sel.rating}</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: -0.2, whiteSpace: 'nowrap' }}>{sel.name}</div>
            <div style={{
              fontSize: 10, fontWeight: 700, padding: '3px 7px', borderRadius: 999,
              whiteSpace: 'nowrap', flexShrink: 0,
              color: sel.busy === '여유' ? '#5BD06A' : sel.busy === '보통' ? '#FFB261' : '#FF6B6B',
              background: sel.busy === '여유' ? 'rgba(91,208,106,0.12)' : sel.busy === '보통' ? 'rgba(255,178,97,0.12)' : 'rgba(255,107,107,0.12)',
            }}>● {sel.busy}</div>
          </div>
          <div style={{ marginTop: 3, fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{sel.cat} · {sel.dist}</div>
          <div style={{
            marginTop: 8, fontSize: 13, fontWeight: 700, color: '#FFB261',
          }}>{sel.price}</div>
          <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
            <button style={{
              flex: 1, height: 34, borderRadius: 10, border: 'none',
              background: 'linear-gradient(135deg, #FF8904, #FB2C36)',
              color: '#fff', fontSize: 12, fontWeight: 700,
              fontFamily: 'inherit', cursor: 'pointer',
            }}>길찾기</button>
            <button style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#fff', fontSize: 14, cursor: 'pointer',
            }}>♡</button>
          </div>
        </div>
      </div>
    </div>
  );
}

window.MapScreen = MapScreen;
