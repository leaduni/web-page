import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 


// Importamos los componentes de las páginas que vamos a usar
// En este caso, Home y About son componentes que representan páginas
// de nuestra aplicación
// Estos componentes se encuentran en la carpeta "pages"
// y son archivos .jsx

import HomePage from './pages/HomePage';
import ApplicationPage from './pages/ApplicationPage';
import NewsPage from './pages/NewsPage';
import PillarsPage from './pages/PillarsPage';
import OrganizationPage from './pages/OrganizationPage';
import NotFoundPage from './pages/NotFoundPage';

import './App.css';

// Dentro de Routes, definimos las rutas de nuestra aplicación
// Cada ruta se define con un componente Route
// El atributo path define la URL de la ruta
// El atributo element define el componente que se renderiza cuando la ruta coincide
// En este caso, la ruta "/" renderiza el componente Home
// y la ruta "/about" renderiza el componente About

function App() {
  return (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/application" element={<ApplicationPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/pillars" element={<PillarsPage />} />
          <Route path="/organization" element={<OrganizationPage />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* La ruta "*" captura todas las rutas que no coinciden con las anteriores */}
          {/* Esto es útil para mostrar una página 404 o Not Found */}      
        </Routes>
  );
}

export default App;