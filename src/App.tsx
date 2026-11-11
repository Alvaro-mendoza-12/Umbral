import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Guide from './pages/Guide';
import Checklist from './pages/Checklist';
import Resources from './pages/Resources';
import FAQ from './pages/FAQ';
import NotFound from './pages/NotFound';
import './styles/tokens.css';
import './styles/global.css';
import './styles/utils.css';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/guide" element={<Navigate to="/guide/1" replace />} />
            <Route path="/guide/:step" element={<Guide />} />
            <Route path="/checklist" element={<Checklist />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
