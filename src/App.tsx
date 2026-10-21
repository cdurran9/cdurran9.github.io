import './App.css';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from './main/layout/Layout';
import { CallingCard } from './main/calling-card/CallingCard';
import { SkillsPage } from './main/skills/SkillsPage';
import { InventoryPage } from './main/inventory/InventoryPage';
import { RequestPage } from './main/request/RequestPage';
import { HelpPage } from './main/help/HelpPage';
import { TransitionProvider } from './persona/TransitionProvider';
import { useTransitionState } from './persona/TransitionContext';
import { Wipe } from './persona/Wipe';

// Renders the displayed location, not the URL, so the swap happens under the wipe.
function SceneRoutes() {
  const { displayLocation } = useTransitionState();
  return (
    <Suspense fallback={null}>
      <Routes location={displayLocation}>
        <Route path="/" element={<CallingCard />} />
        <Route path="/request" element={<RequestPage />} />
        <Route path="/skills" element={<SkillsPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <BrowserRouter>
      <TransitionProvider>
        <Layout>
          <SceneRoutes />
        </Layout>
        <Wipe />
      </TransitionProvider>
    </BrowserRouter>
  );
}

export default App;
