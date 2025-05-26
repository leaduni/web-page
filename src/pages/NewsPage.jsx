import { Link } from 'react-router';

function NewsPage() {
  return (
    <div>
      <main>
        <h1>Página de las Noticias</h1>
        <p>Descripcion, rellena aca.</p>
        <Link to="/news"> NEWS </Link>;
      </main>
    </div>
  );
}

export default NewsPage;
