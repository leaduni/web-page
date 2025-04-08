import { Routes, Route } from 'react-router';

// Importamos los componentes de las páginas que vamos a usar
// En este caso, Home y About son componentes que representan páginas
// de nuestra aplicación
// Estos componentes se encuentran en la carpeta "pages"
// y son archivos .jsx

import Home from './pages/Home';
import About from './pages/About';
import Test from './pages/Test';

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
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  );
}

export default App;
