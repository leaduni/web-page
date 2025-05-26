import { Link } from 'react-router';

function HomePage() {
  return (
    <div>
      <main>
        <h1>Página de Inicio</h1>
        <p>Esta es la página de inicio de nuestra aplicación.</p>
        <Link to="/news"> NEWS </Link>;
      </main>
    </div>
  );
}

export default HomePage;
