import { Link } from 'react-router';

function Home() {
    return(
        <div>
            <main>
                <h1>Página de Inicio</h1>
                <p>Esta es la página de inicio de nuestra aplicación.</p>
                <Link to="/test">Test</Link>;

            </main>
        </div>
    );
  }
  
  export default Home;
  