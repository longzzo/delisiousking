// PrototypeApp — interactive routing across all 5 screens
const NavCtx = React.createContext({ go: () => {}, current: 'login' });
window.NavCtx = NavCtx;

function useNav() { return React.useContext(NavCtx); }
window.useNav = useNav;

function PrototypeApp() {
  const [screen, setScreen] = React.useState('login');
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [transitionKey, setTransitionKey] = React.useState(0);

  const go = (next) => {
    if (next === 'submit') {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setScreen('detail');
        setTransitionKey(k => k + 1);
      }, 1900);
      return;
    }
    setScreen(next);
    setTransitionKey(k => k + 1);
  };

  const ctx = React.useMemo(() => ({ go, current: screen }), [screen]);

  return (
    <NavCtx.Provider value={ctx}>
      <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }} key={transitionKey}>
        {screen === 'login'  && <LoginScreen />}
        {screen === 'home'   && <HomeScreen active="home" />}
        {screen === 'map'    && <MapScreen />}
        {screen === 'detail' && <DetailScreen />}
        {screen === 'review' && <ReviewScreen />}
        {showSuccess && <SuccessOverlay />}
      </div>
    </NavCtx.Provider>
  );
}

function SuccessOverlay() {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(13,11,9,0.88)',
      backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      animation: 'fadeIn 0.25s ease-out',
    }}>
      <img src="assets/mascot-happy.png" alt="" style={{
        width: 180, height: 'auto',
        filter: 'drop-shadow(0 14px 30px rgba(255,137,4,0.45))',
        animation: 'pop 0.4s cubic-bezier(.2,1.4,.4,1)',
      }} />
      <div style={{
        marginTop: 14, color: '#fff', fontFamily: '"Inter", sans-serif',
        fontSize: 22, fontWeight: 800, letterSpacing: -0.3,
      }}>리뷰 등록 완료!</div>
      <div style={{
        marginTop: 6, color: 'rgba(255,255,255,0.7)', fontFamily: '"Inter", sans-serif',
        fontSize: 14, fontWeight: 500,
      }}>50P가 적립되었어요 🎉</div>
    </div>
  );
}

window.PrototypeApp = PrototypeApp;
window.SuccessOverlay = SuccessOverlay;
