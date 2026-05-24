// GalaxyFrame — Samsung Galaxy S25 Ultra device frame
// Flat sides, slightly rounded corners, centered hole-punch camera,
// thin uniform bezel. Screen renders edge-to-edge.

function GalaxyFrame({ children, width = 412, height = 916, color = 'titanium' }) {
  const palettes = {
    titanium: { body: 'linear-gradient(140deg, #4a4d52 0%, #2c2e31 55%, #1c1d20 100%)', ring: '#2a2c2f' },
    silverblue: { body: 'linear-gradient(140deg, #5e6a78 0%, #34404c 55%, #1f262e 100%)', ring: '#2a3340' },
    black: { body: 'linear-gradient(140deg, #2a2a2c 0%, #16161a 100%)', ring: '#101013' },
  };
  const p = palettes[color] || palettes.titanium;
  const bezel = 10; // very thin uniform bezel
  return (
    <div style={{
      width: width + bezel * 2, height: height + bezel * 2,
      borderRadius: 52, padding: bezel, boxSizing: 'border-box',
      background: p.body,
      boxShadow: `
        0 50px 80px rgba(0,0,0,0.28),
        0 0 0 1px ${p.ring},
        inset 0 0 0 1px rgba(255,255,255,0.06)`,
      position: 'relative',
    }}>
      {/* side button hints */}
      <div style={{ position: 'absolute', right: -1.5, top: 180, width: 2, height: 78, background: '#1a1a1d', borderRadius: 2 }} />
      <div style={{ position: 'absolute', left: -1.5, top: 220, width: 2, height: 56, background: '#1a1a1d', borderRadius: 2 }} />
      <div style={{ position: 'absolute', left: -1.5, top: 290, width: 2, height: 96, background: '#1a1a1d', borderRadius: 2 }} />

      {/* screen */}
      <div style={{
        width, height, borderRadius: 44, overflow: 'hidden',
        position: 'relative', background: '#000',
      }}>
        {/* hole-punch camera */}
        <div style={{
          position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
          width: 12, height: 12, borderRadius: '50%', background: '#000',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 0 0 1px rgba(0,0,0,0.4)',
          zIndex: 100,
        }} />
        {/* status bar (Samsung One UI 7 style) */}
        <SamsungStatusBar />
        {children}
      </div>
    </div>
  );
}

function SamsungStatusBar() {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
      height: 38, paddingTop: 8,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '8px 22px 0',
      fontFamily: '"SamsungOne", "Roboto", "Inter", system-ui',
      color: '#fff', fontSize: 13, fontWeight: 600, pointerEvents: 'none',
    }}>
      <span style={{ letterSpacing: 0.2 }}>9:41</span>
      <div style={{ flex: 1 }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        {/* signal */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <rect x="0" y="9" width="2.5" height="3" rx="0.5" fill="#fff"/>
          <rect x="4" y="6.5" width="2.5" height="5.5" rx="0.5" fill="#fff"/>
          <rect x="8" y="3.5" width="2.5" height="8.5" rx="0.5" fill="#fff"/>
          <rect x="12" y="0.5" width="2.5" height="11.5" rx="0.5" fill="#fff"/>
        </svg>
        {/* wifi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path d="M7.5 2C10.4 2 13 3.1 14.8 4.9L13.4 6.3C11.9 4.8 9.8 3.9 7.5 3.9C5.2 3.9 3.1 4.8 1.6 6.3L0.2 4.9C2 3.1 4.6 2 7.5 2Z" fill="#fff"/>
          <path d="M7.5 5.3C9.2 5.3 10.7 6 11.8 7.1L10.4 8.5C9.6 7.7 8.6 7.2 7.5 7.2C6.4 7.2 5.4 7.7 4.6 8.5L3.2 7.1C4.3 6 5.8 5.3 7.5 5.3Z" fill="#fff"/>
          <circle cx="7.5" cy="9.7" r="1.3" fill="#fff"/>
        </svg>
        {/* battery */}
        <div style={{
          width: 24, height: 12, borderRadius: 3,
          border: '1.2px solid rgba(255,255,255,0.95)',
          position: 'relative', display: 'flex', alignItems: 'center', padding: 1.5,
        }}>
          <div style={{ width: '78%', height: '100%', background: '#fff', borderRadius: 1.5 }} />
          <div style={{ position: 'absolute', right: -3, top: '50%', transform: 'translateY(-50%)', width: 2, height: 5, background: 'rgba(255,255,255,0.95)', borderRadius: 1 }} />
        </div>
      </div>
    </div>
  );
}

window.GalaxyFrame = GalaxyFrame;
window.SamsungStatusBar = SamsungStatusBar;
