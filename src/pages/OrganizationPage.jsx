import { Link } from 'react-router';

function OrganizationPage() {
  return (
    <div>
      <main>
        <h1>Página de la organización</h1>
        <p>Descripcion, rellena aca.</p>
        <Link to="/news"> NEWS </Link>;
      </main>
    </div>
  );
}

export default OrganizationPage;
