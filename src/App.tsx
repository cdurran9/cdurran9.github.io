import './App.css';
import { Route, MemoryRouter, Routes } from 'react-router';
import Home from './main/Home';
import { Layout } from './main/layout/Layout';
import { Game } from './main/Game';

function App() {
  return (
    <MemoryRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Layout>
    </MemoryRouter>
  );
}

export default App;
