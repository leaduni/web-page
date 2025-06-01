import React from 'react';

const MemberModal = ({ selectedMember, setSelectedMember, activeMemberTab, setActiveMemberTab, members, memberDetails }) => {
  if (!selectedMember) return null;
  const data = memberDetails[selectedMember];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111136] rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 relative">
          <button onClick={() => setSelectedMember(null)} className="absolute top-4 right-4 text-white text-2xl">×</button>

          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <img src="/placeholder-profile.png" className="w-20 h-20 rounded-full border" alt="Perfil" />
            <div>
              <h2 className="text-2xl font-bold text-white">{selectedMember}</h2>
              <p className="text-white/70">{members.todos.find(m => m.name === selectedMember)?.position || ''}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[#3a1e6a] mb-6">
            {['info', 'contacto', 'eventos', 'habilidades'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveMemberTab(tab)}
                className={`px-4 py-2 font-semibold border-b-4 transition-all ${
                  activeMemberTab === tab
                    ? 'border-[#a0218b] text-white'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                {{
                  info: 'Información General',
                  contacto: 'Contacto',
                  eventos: 'Logros y Eventos',
                  habilidades: 'Habilidades'
                }[tab]}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="text-white px-2 pb-4">
            {activeMemberTab === 'info' && (
              <div>
                <h4 className="font-bold mb-2 text-white">📝 Biografía</h4>
                <p className="text-white/80 bg-[#0e0e2e] p-4 rounded-lg border border-[#3a1e6a]">
                  {data.bio}
                </p>
              </div>
            )}

            {activeMemberTab === 'contacto' && (
              <ul className="space-y-4 text-white/90">
                {data.contacto.map((item, idx) => {
                  const iconMap = {
                    'Correo': '/icons/mail.svg',
                    'LinkedIn': '/icons/linkedin.svg',
                    'Portafolio': '/icons/portafolio.svg',
                    'Github': '/icons/github.svg',
                    'Curriculum Vitae': '/icons/cv.svg'
                  };

                  const linkMap = {
                    'Correo': 'mailto:correo@ejemplo.com',
                    'LinkedIn': 'https://www.linkedin.com/in/usuario',
                    'Portafolio': 'https://usuario.portafolio.com',
                    'Github': 'https://github.com/usuario',
                    'Curriculum Vitae': 'https://drive.google.com/file/d/cv_url/view'
                  };

                  return (
                    <li key={idx} className="flex items-center gap-3">
                      <img src={iconMap[item] || '/icons/default.svg'} alt={item} className="w-6 h-6" />
                      <a
                        href={linkMap[item] || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline text-white"
                      >
                        {item}
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}

            {activeMemberTab === 'eventos' && (
              <div>
                <h4 className="font-bold mb-2 text-white">🏆 Premios y Reconocimientos</h4>
                <ul className="list-disc pl-6 text-white/80 mb-4">
                  {data.eventos.premios.map((p, idx) => <li key={idx}>{p}</li>)}
                </ul>
                <h4 className="font-bold mb-2 text-white">📅 Eventos Liderados</h4>
                <ul className="list-disc pl-6 text-white/80">
                  {data.eventos.liderados.map((e, idx) => <li key={idx}>{e}</li>)}
                </ul>
              </div>
            )}

            {activeMemberTab === 'habilidades' && (
              <div>
                <h4 className="font-bold mb-2 text-white">🧠 Soft Skills</h4>
                <ul className="list-disc pl-6 text-white/80 mb-4">
                  {data.habilidades.soft.map((s, idx) => <li key={idx}>{s}</li>)}
                </ul>
                <h4 className="font-bold mb-2 text-white">💻 Hard Skills</h4>
                <ul className="list-disc pl-6 text-white/80">
                  {data.habilidades.hard.map((h, idx) => <li key={idx}>{h}</li>)}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
