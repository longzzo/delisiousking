// ReviewScreen — write review
function ReviewScreen() {
  const nav = (window.useNav && window.useNav()) || { go: () => {} };
  const [overall, setOverall] = React.useState(5);
  const [menuRatings, setMenuRatings] = React.useState({ '제육볶음 정식': 5, '김치찌개 정식': 4 });
  const [tags, setTags] = React.useState(new Set(['가성비', '혼밥하기 좋음']));
  const [text, setText] = React.useState('제육볶음 정식 시켰는데 양도 많고 맛도 진짜 굿! 반찬도 5개 나오고 된장국까지... 학생 입장에서 7천원이면 진심 추천. 1인석도 있어서 다음에 또 혼밥하러 갈 듯요 👍');

  const tagOptions = ['가성비', '혼밥하기 좋음', '빠른 조리', '양 많음', '깔끔', '친절', '주차 가능', '데이트', '회식 OK', '늦은 시간'];

  const toggleTag = (t) => {
    const next = new Set(tags);
    next.has(t) ? next.delete(t) : next.add(t);
    setTags(next);
  };

  const Stars = ({ value, onChange, size = 28 }) => (
    <div style={{ display: 'flex', gap: 4 }}>
      {[1,2,3,4,5].map(n => (
        <div key={n} onClick={() => onChange && onChange(n)} style={{
          fontSize: size, lineHeight: 1, cursor: onChange ? 'pointer' : 'default',
          color: n <= value ? '#FFD56B' : 'rgba(255,255,255,0.15)',
          transition: 'transform 0.1s',
        }}>★</div>
      ))}
    </div>
  );

  const ratingLabel = ['', '별로예요', '아쉬워요', '괜찮아요', '맛있어요', '인생맛집!'];

  return (
    <div style={{
      width: '100%', height: '100%', background: '#0E0B09', position: 'relative',
      fontFamily: '"Inter", -apple-system, system-ui, sans-serif',
      color: '#fff', overflow: 'hidden',
    }}>
      {/* Top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        background: 'rgba(13,11,9,0.95)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        paddingTop: 58, paddingBottom: 12, paddingLeft: 16, paddingRight: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div onClick={() => nav.go('detail')} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M6 18L18 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, whiteSpace: 'nowrap' }}>리뷰 작성</div>
        <div style={{
          fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.3)',
          padding: '6px 10px', whiteSpace: 'nowrap',
        }}>임시저장</div>
      </div>

      <div style={{ height: '100%', overflowY: 'auto', paddingTop: 110, paddingBottom: 110 }}>

        {/* Restaurant chip */}
        <div style={{
          margin: '0 16px', padding: 12, borderRadius: 14,
          background: '#1A1614', border: '1px solid rgba(255,255,255,0.05)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 42, height: 42, borderRadius: 10,
            background: 'repeating-linear-gradient(135deg, #2A211B 0 4px, #221B17 4px 8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
          }}>🍲</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>진성식당</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>한식 · 백반 · 도보 1분</div>
          </div>
          <div style={{ fontSize: 12, color: '#FF8904', fontWeight: 700 }}>변경</div>
        </div>

        {/* Overall rating */}
        <div style={{ padding: '24px 16px 0', textAlign: 'center' }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
            전체적으로 어땠어요?
          </div>
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
            <Stars value={overall} onChange={setOverall} size={38} />
          </div>
          <div style={{
            marginTop: 10, fontSize: 14, fontWeight: 700, color: '#FFD56B',
          }}>{ratingLabel[overall]}</div>
        </div>

        {/* Menu-by-menu ratings */}
        <div style={{ padding: '28px 16px 0' }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            marginBottom: 10,
          }}>
            <div style={{ fontSize: 15, fontWeight: 800, whiteSpace: 'nowrap' }}>주문한 메뉴 별점</div>
            <div style={{ fontSize: 12, color: '#FF8904', fontWeight: 700, whiteSpace: 'nowrap' }}>+ 메뉴 추가</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Object.entries(menuRatings).map(([menu, rating]) => (
              <div key={menu} style={{
                padding: 12, borderRadius: 14,
                background: '#1A1614', border: '1px solid rgba(255,255,255,0.04)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9, flexShrink: 0,
                  background: 'repeating-linear-gradient(135deg, #2A211B 0 4px, #221B17 4px 8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
                }}>🍱</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap' }}>{menu}</div>
                  <div style={{ marginTop: 4 }}>
                    <Stars
                      value={rating} size={16}
                      onChange={(v) => setMenuRatings({ ...menuRatings, [menu]: v })}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo upload */}
        <div style={{ padding: '28px 16px 0' }}>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 10 }}>
            사진 추가 <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 500 }}>(최대 5장)</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{
              width: 72, height: 72, borderRadius: 12,
              border: '1.5px dashed rgba(255,137,4,0.4)',
              background: 'rgba(255,137,4,0.05)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 2, cursor: 'pointer',
            }}>
              <div style={{ fontSize: 20, color: '#FF8904' }}>📷</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#FF8904' }}>2/5</div>
            </div>
            <div style={{
              width: 72, height: 72, borderRadius: 12,
              background: 'repeating-linear-gradient(135deg, #3A2A1E 0 6px, #2A211B 6px 12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, position: 'relative',
            }}>
              🍱
              <div style={{
                position: 'absolute', top: 4, right: 4, width: 16, height: 16,
                borderRadius: '50%', background: 'rgba(0,0,0,0.7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 10,
              }}>×</div>
            </div>
            <div style={{
              width: 72, height: 72, borderRadius: 12,
              background: 'repeating-linear-gradient(45deg, #3A2A1E 0 6px, #2A211B 6px 12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, position: 'relative',
            }}>
              🍚
              <div style={{
                position: 'absolute', top: 4, right: 4, width: 16, height: 16,
                borderRadius: '50%', background: 'rgba(0,0,0,0.7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 10,
              }}>×</div>
            </div>
          </div>
        </div>

        {/* Review text */}
        <div style={{ padding: '28px 16px 0' }}>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 10 }}>리뷰 내용</div>
          <div style={{
            padding: 14, borderRadius: 14,
            background: '#1A1614', border: '1px solid rgba(255,137,4,0.30)',
            minHeight: 130,
          }}>
            <div style={{
              fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.88)',
              whiteSpace: 'pre-wrap',
            }}>{text}<span style={{
              display: 'inline-block', width: 2, height: 14,
              background: '#FF8904', marginLeft: 1, verticalAlign: 'middle',
              animation: 'caret 1s steps(1) infinite',
            }} /></div>
          </div>
          <div style={{
            marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,0.4)', textAlign: 'right',
          }}>{text.length} / 500</div>
        </div>

        {/* Tags */}
        <div style={{ padding: '24px 16px 0' }}>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 10 }}>
            어떤 점이 좋았나요? <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 500 }}>(여러개 선택)</span>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {tagOptions.map(t => {
              const on = tags.has(t);
              return (
                <div key={t} onClick={() => toggleTag(t)} style={{
                  padding: '9px 14px', borderRadius: 999,
                  fontSize: 13, fontWeight: 700, cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: on ? 'rgba(255,137,4,0.15)' : 'rgba(255,255,255,0.04)',
                  border: on ? '1px solid #FF8904' : '1px solid rgba(255,255,255,0.08)',
                  color: on ? '#FFB261' : 'rgba(255,255,255,0.7)',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  {on && <span>✓</span>}# {t}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submit */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: 'rgba(13,11,9,0.95)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '12px 16px 26px',
      }}>
        <button onClick={() => nav.go('submit')} style={{
          width: '100%', height: 54, borderRadius: 14, border: 'none',
          background: 'linear-gradient(135deg, #FF8904, #FB2C36)', color: '#fff',
          fontSize: 16, fontWeight: 800, fontFamily: 'inherit', cursor: 'pointer',
          boxShadow: '0 10px 24px rgba(251,44,54,0.40)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          리뷰 등록하기 · 50P 적립
        </button>
      </div>
    </div>
  );
}

window.ReviewScreen = ReviewScreen;
