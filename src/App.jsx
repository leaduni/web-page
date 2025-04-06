import { Routes, Route } from 'react-router';

import Home from './pages/Home';
import About from './pages/About';
import './App.css'


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
    </Routes>
  );
}

export default App;