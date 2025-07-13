import { Link } from 'react-router';
import { HeroSection } from '../components/Inicio/HeroSection';
/* import { ContactoSection } from '../components/Contacto/ContactoSection'; */
function HomePage() {
  return (
    <div>
      <main className="min-h-screen w-full bg-[#1A0B2E]">
        <HeroSection />
        {/* <ContactoSection /> */}
      </main>
    </div>
  );
}

export default HomePage;
