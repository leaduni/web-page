import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div>
      <main>
        <h1>Página por si no se ha encontrado nada</h1>
        <p>Descripcion, rellena aca.</p>
        <Link to="/news"> NEWS </Link>;
      </main>
    </div>
  );
}

export default NotFoundPage;
