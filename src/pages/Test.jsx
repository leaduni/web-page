// 📦 1. IMPORTACIONES Y LÓGICA DE JS
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';

// 🧠 2. LÓGICA DE REACT (HOOKS, FUNCIONES, MANEJO DE ESTADO, ETC.)
const Home = () => {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log('El componente se montó o el contador cambió:', contador);
  }, [contador]);

  const incrementar = () => {
    setContador(prev => prev + 1);
  };

  return (
    // 🎨 3. LO QUE SE RENDERIZA (JSX)
    <div>
      <main>
        <h1>Página de Inicio</h1>
        <p>Contador: {contador}</p>
        <button onClick={incrementar}>Incrementar</button>
        <br />
        <div className="bg-slate-300 size-[300px] my-2">
          <p className="font-bold text-black">Hola mundo</p>
        </div>
        <Link to="/about">Ir a la página de Acerca de</Link>
        <br />
        <p>Esta es la página de inicio de nuestra aplicación.</p>
      </main>
    </div>
  );
};

export default Home;
