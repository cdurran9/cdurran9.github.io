import './App.css';
import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { Layout } from './main/layout/Layout';
import { ComingSoon } from './main/ComingSoon';
import { TransitionProvider } from './persona/TransitionProvider';
import { useTransitionState } from './persona/TransitionContext';
import { Wipe } from './persona/Wipe';

// Renders the displayed location, not the URL, so the swap happens under the wipe.
function SceneRoutes() {
  const { displayLocation } = useTransitionState();
  return (
    <Suspense fallback={null}>
      <Routes location={displayLocation}>
        <Route path="/stats" element={<ComingSoon title="Stats" />} />
        <Route path="/skills" element={<ComingSoon title="Skills" />} />
        <Route path="/inventory" element={<ComingSoon title="Inventory" />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* Redirect outside the provider so landing on / doesn't play a wipe. */}
      <Routes>
        <Route path="/" element={<Navigate to="/stats" replace />} />
        <Route
          path="*"
          element={
            <TransitionProvider>
              <Layout>
                <SceneRoutes />
              </Layout>
              <Wipe />
            </TransitionProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
