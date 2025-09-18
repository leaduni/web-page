import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MemberCard from '../components/organigrama/MemberCard';
import MemberModal from '../components/organigrama/MemberModal';
import Carrusel from '../components/organigrama/Carrusel';
import {
  getAllMembers,
  getMembersByDepartment,
  getMemberDetails,
  getDepartments,
  getPillars,
} from '../services/organizationService';

const OrganizationPage = () => {
  const [activeTab, setActiveTab] = useState('todos');
  const [activeMemberTab, setActiveMemberTab] = useState('info');
  const [selectedMember, setSelectedMember] = useState(null);
  const [activePillar, setActivePillar] = useState(0);
  const tabsRef = useRef(null);

  const scrollTabs = direction => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      tabsRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };

  // Obtener datos del servicio
  const departments = getDepartments();
  const pillars = getPillars();
  const members = {
    todos: getAllMembers(),
    direccion: getMembersByDepartment('direccion'),
    liderazgo: getMembersByDepartment('liderazgo'),
    academica: getMembersByDepartment('academica'),
    profesional: getMembersByDepartment('profesional'),
    social: getMembersByDepartment('social'),
    academia: getMembersByDepartment('academia'),
    marketing: getMembersByDepartment('marketing'),
    capitulo: getMembersByDepartment('capitulo'),
    femenina: getMembersByDepartment('femenina'),
  };

  return (
    <section className="min-h-screen w-full h-full bg-[rgb(9,9,42)] text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-[#d93340] to-[#a6249d] text-transparent bg-clip-text">
            Dirección General
          </span>
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-white/80 mx-auto mb-10 text-center whitespace-normal max-w-xs sm:max-w-xl lg:max-w-3xl xl:max-w-4xl">
          Conoce al equipo que lidera LEAD UNI y trabaja día a día para impulsar el desarrollo
          integral de nuestra comunidad estudiantil.
        </p>

        {/* ORGANIGRAMA */}
        <section className="mb-20">
          <div className="container mx-auto">
            <div className="relative rounded-2xl p-12 border-2 border-[#a6249d]/40 backdrop-blur-sm shadow-lg overflow-hidden">
              {/* Fondo degradado radial igual al carrusel */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d93340]/10 via-[#a6249d]/10 to-transparent"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#a6249d]/10 via-[#d93340]/10 to-transparent"></div>
              </div>
              {/* Líneas conectoras */}
              <div className="absolute inset-0 flex flex-col items-center z-10">
                <div className="w-px h-20 bg-gradient-to-b from-[#d93340] to-[#a6249d] mt-32"></div>
                <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-[#d93340] to-transparent mt-4"></div>
              </div>

              <div className="relative flex flex-col items-center space-y-12 z-10">
                {/* Presidencia */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#d93340] to-[#a6249d] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative px-12 py-6 bg-[#1A0B2E] rounded-lg border-2 border-[#a6249d]/40 shadow-lg">
                    <h3 className="text-2xl font-bold text-center text-white">Presidencia</h3>
                  </div>
                </div>

                {/* Cargos principales */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                  {['Vicepresidencia', 'Jefatura de Personal', 'Tesorería'].map(cargo => (
                    <div key={cargo} className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#d93340] to-[#a6249d] rounded-lg blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative px-8 py-4 bg-[#1A0B2E] rounded-lg border-2 border-[#a6249d]/40 shadow-lg">
                        <h3 className="text-xl font-semibold text-center text-white">{cargo}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Carrusel 3D */}
        <Carrusel pillars={pillars} activePillar={activePillar} setActivePillar={setActivePillar} />

        {/* Sección Explorar Pilares */}
        <div className="my-8 py-8 border-y-2 border-[#a6249d]/40">
          <div className="text-center">
            <p className="text-xl md:text-2xl font-semibold text-white/80 mb-7">
              Descubre más sobre nuestros pilares y su impacto
            </p>
            <Link
              to="/pillars"
              className="inline-flex items-center px-6 py-2 text-base md:text-lg bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white border-2 border-[#a6249d] rounded-full font-bold hover:bg-[#36042f] hover:text-[#ff6ec7] transition-all duration-300 shadow-lg shadow-pink-900/20"
            >
              Explorar Pilares
            </Link>
          </div>
        </div>

        {/* Tabs de departamentos */}
        <div className="relative mb-12">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-[#1A0B2E] to-transparent w-20 h-full z-10"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-[#1A0B2E] to-transparent w-20 h-full z-10"></div>

          <button
            onClick={() => scrollTabs('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#1A0B2E] hover:bg-[#36042f] text-white border border-[#a6249d]/40 shadow-lg shadow-pink-900/10 rounded-full p-2 z-20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={tabsRef}
            className="flex overflow-x-hidden gap-2 px-12 py-4 rounded-xl border-2 border-[#a6249d]/40 scrollbar-none shadow-lg"
            style={{ scrollBehavior: 'smooth' }}
          >
            {departments.map((dept, idx) => (
              <button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                className={`px-6 py-3 font-medium transition-all rounded-lg whitespace-nowrap
                  ${
                    activeTab === dept.id
                      ? 'bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white shadow-lg shadow-pink-900/30'
                      : 'bg-[#1A0B2E] text-white/70 hover:text-white hover:bg-[#36042f]'
                  }
                `}
              >
                {dept.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTabs('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1A0B2E] hover:bg-[#36042f] text-white border border-[#a6249d]/40 shadow-lg shadow-pink-900/10 rounded-full p-2 z-20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Grid de miembros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {members[activeTab]?.map(member => (
            <MemberCard key={member.name} member={member} onSelect={setSelectedMember} />
          ))}
        </div>

        {/* Modal de miembro */}
        {selectedMember && (
          <MemberModal
            selectedMember={selectedMember}
            setSelectedMember={setSelectedMember}
            activeMemberTab={activeMemberTab}
            setActiveMemberTab={setActiveMemberTab}
            members={members}
            getMemberDetails={getMemberDetails}
          />
        )}
      </div>
    </section>
  );
};

export default OrganizationPage;
