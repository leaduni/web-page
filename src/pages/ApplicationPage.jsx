import { Link } from 'react-router';

function ApplicationPage() {
  return (
    <div>
      <main>
        <h1>Página de la Convocatoria</h1>
        <p>Descripcion, rellena aca.</p>
        <Link to="/news"> news </Link>;
      </main>
    </div>
  );
}

export default ApplicationPage;
