import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header, HEADER_HEIGHT } from './components/header';
import PromotionModal from './components/PromotionModal';
import ContactSection from './components/ContactSection';
// Importamos los componentes de las páginas que vamos a usar
// En este caso, Home y About son componentes que representan páginas
// de nuestra aplicación
// Estos componentes se encuentran en la carpeta "pages"
// y son archivos .jsx

import HomePage from './pages/HomePage';
import ApplicationPage from './pages/ApplicationPage';
import ApplicationPageDisabled from './pages/ApplicationPageDisabled';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import PillarsPage from './pages/PillarsPage';
import OrganizationPage from './pages/OrganizationPage';
import NotFoundPage from './pages/NotFoundPage';
import AIRecapPage from './pages/ai-recap';

// Componente para hacer scroll hacia arriba al cambiar de ruta
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // Scroll suave hacia arriba
    });
  }, [pathname]);

  return null;
}

// Dentro de Routes, definimos las rutas de nuestra aplicación
// Cada ruta se define con un componente Route
// El atributo path define la URL de la ruta
// El atributo element define el componente que se renderiza cuando la ruta coincide
// En este caso, la ruta "/" renderiza el componente Home
// y la ruta "/about" renderiza el componente About

function App() {
  const isApplicationOpen = false;
  const location = useLocation();
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0B2E] via-[#2D1B4E] to-[#1A0B2E]">
      <ScrollToTop />
      <Header />
      <main
        style={{ paddingTop: `${HEADER_HEIGHT}px` }}
        className="min-h-screen bg-gradient-to-b from-[#1A0B2E] via-[#2D1B4E] via-50% to-[#1A0B2E]"
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/application"
            element={isApplicationOpen ? <ApplicationPage /> : <ApplicationPageDisabled />}
          />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/pillars" element={<PillarsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/organization" element={<OrganizationPage />} />
          <Route path="/ai-recap" element={<AIRecapPage />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* La ruta "*" captura todas las rutas que no coinciden con las anteriores */}
          {/* Esto es útil para mostrar una página 404 o Not Found */}
        </Routes>
      </main>
      <ContactSection />

      {/* Modal de promoción en Home */}
      {location.pathname === '/' && <PromotionModal />}
    </div>
  );
}

export default App;
