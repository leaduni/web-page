import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { CalendarDays, MapPin, Users, X, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Small badge renderer for expertise logos
function BadgeIcons({ badges }) {
  if (!badges || badges.length === 0) return null;
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {badges.map(b =>
        b.src ? (
          <img
            key={b.src}
            src={b.src}
            alt={b.alt || 'Expertise'}
            title={b.title || b.alt || 'Expertise'}
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain rounded-[4px] ring-1 ring-white/15"
          />
        ) : (
          <span
            key={b.label}
            className="text-[11px] sm:text-[12px] px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-white/80"
            title={b.title || b.label}
          >
            {b.label}
          </span>
        )
      )}
    </div>
  );
}

BadgeIcons.propTypes = {
  badges: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        title: PropTypes.string,
      }),
      PropTypes.shape({
        label: PropTypes.string,
        title: PropTypes.string,
      }),
    ])
  ),
};

// Simple, local speaker modal component
function SpeakerModal({ speaker, onClose }) {
  if (!speaker) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.dialog
        open
        className="relative z-10 w-full max-w-[92vw] sm:max-w-lg md:max-w-3xl lg:max-w-4xl rounded-2xl bg-[#120a22] border border-[#a6249d]/30 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left image */}
          <div className="relative min-h-[220px] md:min-h-[260px] bg-white/[0.03]">
            <img
              src={speaker.image}
              alt={speaker.name}
              className={`w-full h-full object-contain p-3 ${speaker.imgClass || ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#d93340]/10 to-transparent" />
            {String(speaker.name).toLowerCase().includes('misterio') && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-sm md:text-base border border-white/20">
                  Próximamente
                </span>
              </div>
            )}
          </div>
          {/* Right content */}
          <div className="p-5 md:p-7">
            <div className="flex items-center gap-2 md:gap-3 mb-1">
              <h3 className="text-xl md:text-2xl font-extrabold text-white">{speaker.name}</h3>
              <BadgeIcons badges={speaker.badges} />
            </div>
            <p className="text-[#ff6ec7] font-semibold text-sm md:text-base">{speaker.title}</p>
            <p className="text-white/80 text-xs md:text-sm mt-2">{speaker.company}</p>
            <div className="h-px w-full my-4 md:my-5 bg-gradient-to-r from-[#d93340]/60 to-[#a6249d]/60" />
            <p className="text-white/90 text-sm md:text-base leading-relaxed whitespace-pre-line">
              {speaker.description}
            </p>
            {speaker.links && speaker.links.length > 0 && (
              <div className="mt-4 md:mt-5 flex gap-2 md:gap-3 flex-wrap">
                {speaker.links.map(l => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs md:text-sm rounded-full border border-[#a6249d]/40 text-white/90 hover:text-white hover:border-[#ff6ec7]"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.dialog>
    </div>
  );
}

SpeakerModal.propTypes = {
  speaker: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    title: PropTypes.string,
    company: PropTypes.string,
    description: PropTypes.string,
    imgClass: PropTypes.string,
    badges: PropTypes.array,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        href: PropTypes.string,
      })
    ),
  }),
  onClose: PropTypes.func.isRequired,
};

export default function AIRecapPage() {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [form, setForm] = useState({ nombre: '', carrera: '', email: '', telefono: '', dni: '' });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Lock body scroll while any modal is open
  useEffect(() => {
    const hasModal = Boolean(selectedSpeaker) || Boolean(confirmOpen);
    const prev = document.body.style.overflow;
    if (hasModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prev || '';
    }
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [selectedSpeaker, confirmOpen]);

  // Google Forms endpoint (provided)
  const FORM_URL =
    'https://docs.google.com/forms/u/1/d/e/1FAIpQLScnOPPrG_Cf51euKCjot4GboV2LpC0WYG9_1QnevAQV01rdOQ/formResponse';
  // Field mapping (from provided HTML)
  const FIELDS = {
    nombre: 'entry.472759893',
    email: 'entry.670715888',
    carrera: 'entry.1915342240',
    dni: 'entry.1677198235',
    telefono: 'entry.1150935404',
  };

  // Ponentes confirmados
  const speakers = useMemo(
    () => [
      {
        name: 'Gera Flores',
        title:
          'Logística inteligente: aplicaciones de IA para optimizar la logística en e-commerce',
        company: '',
        image: '/ponentes/gera.jpg',
        badges: [{ label: 'Logística' }, { label: 'E-commerce' }, { label: 'IA aplicada' }],
        description:
          'Conoceremos cómo la inteligencia artificial está transformando la logística en el e-commerce. A partir de su experiencia aplicando IA en distintos procesos y proyectos, exploraremos cómo esta tecnología permite anticipar la demanda, mejorar la eficiencia operativa y optimizar la experiencia del cliente.',
        links: [],
      },
      {
        name: 'Renato Amapanqui',
        title: 'Creando soluciones con IA, por todos y para todos',
        company: '',
        image: '/ponentes/renato.jpg',
        badges: [
          { label: 'Impacto social' },
          { label: 'Accesibilidad' },
          { label: 'Colaboración' },
        ],
        description:
          'Exploraremos cómo la inteligencia artificial puede mejorar la vida de las personas y resolver problemas complejos, destacando la importancia de la colaboración y la responsabilidad en su desarrollo y uso.',
        links: [],
      },
      {
        name: 'Luis Tipacti',
        title: 'Despertando la IA Generativa en Entel',
        company: '',
        image: '/ponentes/luis.jpg',
        badges: [{ label: 'Telco' }, { label: 'IA generativa' }, { label: 'Productividad' }],
        description:
          'Ponencia sobre el camino de Entel en el despliegue de la Inteligencia Artificial Generativa como herramienta de gestión, productividad y cultura. Un camino de curiosidad, experimentación y evolución continua.',
        links: [],
      },
      {
        name: 'Anthony Alcalá',
        title: 'El año de las Frontier Firms',
        company: '',
        image: '/ponentes/anthony.jpg',
        badges: [{ label: 'Tendencias' }, { label: 'Agentes' }, { label: 'Futuro del trabajo' }],
        description:
          'Descubre las tendencias que están redefiniendo el futuro del trabajo. El Índice de Tendencias Laborales 2025 revela cómo los agentes de IA están transformando equipos, impulsando la productividad y generando nuevos roles profesionales.',
        links: [],
      },
    ],
    []
  );

  const onSubmit = async e => {
    e.preventDefault();
    setStatus({ type: null, message: '' });
    if (!form.nombre || !form.carrera || !form.email) {
      setStatus({ type: 'error', message: 'Completa nombre, carrera y email.' });
      return;
    }
    // Submit to Google Forms (no-cors)
    try {
      const data = new FormData();
      data.append(FIELDS.nombre, form.nombre);
      data.append(FIELDS.carrera, form.carrera);
      data.append(FIELDS.email, form.email);
      // optional fields
      if (form.dni) data.append(FIELDS.dni, form.dni);
      if (form.telefono) data.append(FIELDS.telefono, form.telefono);

      await fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body: data });

      setStatus({ type: 'success', message: '¡Registro enviado! Te contactaremos por correo.' });
      setConfirmOpen(true);
      setForm({ nombre: '', carrera: '', email: '', telefono: '', dni: '' });
    } catch (err) {
      console.error('AI Recap registration error:', err);
      setStatus({ type: 'error', message: 'No se pudo enviar. Inténtalo nuevamente.' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[rgb(9,9,42)] text-white">
      {/* Hero */}

      <section className="relative w-full h-[52vh] sm:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(9,9,42,0.6),rgba(166,36,157,0.35))]" />
        <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-[#d93340] to-[#a6249d] text-transparent bg-clip-text">
              AI Recap 2025
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl">
            Un resumen práctico y actualizado de las tendencias y lecciones clave en Inteligencia
            Artificial: investigación, industria y comunidad.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/90">
            <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
              <CalendarDays className="w-4 h-4 text-[#ff6ec7]" /> 24 de octubre 2025
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
              <MapPin className="w-4 h-4 text-[#ff6ec7]" /> UNI — LEAD UNI
            </span>
            <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
              <Users className="w-4 h-4 text-[#ff6ec7]" /> 4 ponentes
            </span>
          </div>
        </div>
      </section>

      {/* Agenda / Minuta */}
      <section className="container mx-auto px-6 py-6">
        <div className="rounded-2xl border border-[#a6249d]/30 bg-[#120a22] p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-white/90">
              <CalendarDays className="w-4 h-4 text-[#ff6ec7]" /> 24 de octubre 2025
            </span>
            <span className="inline-flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 text-white/80 border border-white/10">
              Minuta: Próximamente
            </span>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { nombre: 'Charlas temáticas', hora: '4:20 p.m. – 5:30 p.m.' },
              { nombre: 'Panel de discusión', hora: '5:50 p.m. – 6:20 p.m.' },
              { nombre: 'Networking con empresas', hora: '7:30 p.m. – 8:00 p.m.' }
            ].map(evento => (
              <div key={evento.nombre} className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <p className="text-white font-semibold">{evento.nombre}</p>
                <p className="text-white/60 text-sm mt-1">{evento.hora}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro y Sponsors */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Sobre el evento</h2>
            <div className="space-y-4 text-white/80">
              <p>
                AI Recap es un evento organizado por LEAD UNI que reúne a estudiantes de múltiples
                carreras en torno a la innovación y la tecnología. A través de charlas temáticas, un
                panel de discusión y espacios de interacción con empresas, buscamos inspirar,
                conectar y abrir oportunidades de desarrollo académico y profesional.
              </p>
              <div>
                <h3 className="text-white font-semibold mb-2">Objetivos</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Difundir tendencias actuales en innovación y tecnología.</li>
                  <li>Facilitar el networking con empresas y profesionales destacados.</li>
                  <li>Generar oportunidades de desarrollo académico, profesional y laboral.</li>
                  <li>Promover el interés de estudiantes de múltiples disciplinas.</li>
                </ul>
              </div>
              {/* Sección para empresas removida temporalmente hasta confirmar derechos de uso */}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#ff6ec7]">Empresas</h3>
            <p className="text-white/70 mb-3">Empresas confirmadas hasta el momento.</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                <img
                  src="/microsoft-logo.png"
                  alt="Microsoft"
                  title="Microsoft"
                  className="h-12 sm:h-16 object-contain"
                />
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
                <img
                  src="/logo-entel.png"
                  alt="Entel"
                  title="Entel"
                  className="h-10 sm:h-12 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="container mx-auto px-6 py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Ponentes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {speakers.map(sp => (
            <button
              key={sp.name}
              onClick={() => setSelectedSpeaker(sp)}
              className="group text-left rounded-2xl overflow-hidden border border-[#a6249d]/30 bg-[#120a22] hover:bg-[#160e29] transition-all duration-300 max-w-xs w-full mx-auto flex flex-col"
            >
              <div
                className="relative w-full overflow-hidden bg-white/[0.03]"
                style={{ paddingTop: '80%' }}
              >
                <img
                  src={sp.image}
                  alt={sp.name}
                  className={`absolute inset-0 w-full h-full object-cover object-center p-2 ${sp.name
                    .toLowerCase()
                    .includes('misterio') ? 'grayscale' : ''}`}
                />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base md:text-lg font-bold">{sp.name}</h3>
                  <BadgeIcons badges={sp.badges} />
                </div>
                <p className="text-xs md:text-sm text-[#ff6ec7] leading-snug">{sp.title}</p>
                <p className="text-[11px] md:text-xs text-white/70 mt-1 line-clamp-2">
                  {sp.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Sponsor adicional */}
      <section className="container mx-auto px-6 py-6">
      <div className="relative rounded-2xl border border-[#a6249d]/30 bg-[#120a22] p-6 md:p-8 overflow-hidden">
        <div className="pointer-events-none absolute -inset-16 bg-[radial-gradient(circle_at_center,rgba(166,36,157,0.15),transparent_60%)]" />
        <h3 className="relative z-10 text-lg font-semibold mb-2 text-[#ff6ec7]">
          Sponsors oficiales
        </h3>
        <p className="relative z-10 text-white/70 text-sm mb-4">
          Gracias a su apoyo este evento es posible.
        </p>
    
        {/* Contenedor de sponsors */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-6">
          {/* Sponsor 1 */}
          <div className="inline-flex items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 px-6 py-4 shadow-[0_0_40px_rgba(166,36,157,0.2)]">
            <img
              src="/logo-manantial.png"
              alt="Manantial Tecnológico"
              title="Manantial Tecnológico"
              className="h-14 sm:h-20 object-contain"
            />
          </div>
    
          {/* Sponsor 2 */}
          <div className="inline-flex items-center justify-center rounded-2xl bg-white/[0.04] border border-white/10 px-6 py-4 shadow-[0_0_40px_rgba(166,36,157,0.2)]">
            <img
              src="/logo-wplace.png"
              alt="WPlace"
              title="WPlace"
              className="h-14 sm:h-20 object-contain"
            />
          </div>
        </div>
      </div>
    </section>

      {/* Registro */}
      <section className="container mx-auto px-6 py-12">
        <div className="rounded-2xl border border-[#a6249d]/30 bg-[#120a22] p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Regístrate</h2>
          <p className="text-white/70 mb-6">Deja tus datos para reservar tu lugar.</p>

          {status.type && (
            <div
              className={`mb-6 rounded-lg px-4 py-3 text-sm ${
                status.type === 'success'
                  ? 'bg-emerald-600/20 text-emerald-200'
                  : 'bg-rose-600/20 text-rose-200'
              }`}
            >
              {status.message}
            </div>
          )}

          <form
            name="ai-recap-registration"
            onSubmit={onSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* Netlify support (optional): data-netlify hidden input */}
            <input type="hidden" name="form-name" value="ai-recap-registration" />
            <div>
              <label htmlFor="ai-nombre" className="block text-sm mb-2 text-white/80">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                id="ai-nombre"
                value={form.nombre}
                onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
                placeholder="Tu nombre"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#B936F5]"
              />
            </div>
            <div>
              <label htmlFor="ai-dni" className="block text-sm mb-2 text-white/80">
                DNI
              </label>
              <input
                type="text"
                name="dni"
                id="ai-dni"
                value={form.dni}
                onChange={e => setForm(f => ({ ...f, dni: e.target.value }))}
                placeholder="DNI"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#B936F5]"
              />
            </div>
            <div>
              <label htmlFor="ai-carrera" className="block text-sm mb-2 text-white/80">
                Carrera
              </label>
              <input
                type="text"
                name="carrera"
                id="ai-carrera"
                value={form.carrera}
                onChange={e => setForm(f => ({ ...f, carrera: e.target.value }))}
                placeholder="Tu carrera"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#B936F5]"
              />
            </div>
            <div>
              <label htmlFor="ai-email" className="block text-sm mb-2 text-white/80">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="ai-email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="tucorreo@uni.pe"
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#B936F5]"
              />
            </div>
            <div>
              <label htmlFor="ai-telefono" className="block text-sm mb-2 text-white/80">
                Teléfono
              </label>
              <input
                type="text"
                name="telefono"
                id="ai-telefono"
                value={form.telefono}
                onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))}
                placeholder="Ej: 999999999"
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#B936F5]"
              />
            </div>
            <div className="md:col-span-3 flex justify-end pt-2">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 text-base bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white rounded-full font-bold hover:brightness-110 transition"
              >
                Enviar registro
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Aviso de sorteo */}
      <section className="container mx-auto px-6 pb-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5 flex items-start gap-3">
          <div className="mt-0.5 shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#d93340] to-[#a6249d] text-white/95">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/80">
                Sorteo
              </span>
            </div>
            <p className="text-white/90 text-sm md:text-base">
              Estaremos sorteando <span className="font-semibold">1 beca de DataCamp</span> entre
              los asistentes del evento.
            </p>
          </div>
        </div>
      </section>

      {/* Modales */}
      <AnimatePresence>
        {selectedSpeaker && (
          <SpeakerModal speaker={selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {confirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.dialog
              open
              className="relative z-10 w-full max-w-[90vw] sm:max-w-sm md:max-w-md rounded-2xl bg-[#120a22] border border-[#a6249d]/30 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <button
                onClick={() => setConfirmOpen(false)}
                className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="p-6 md:p-8 text-center">
                <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2">
                  ¡Registro enviado!
                </h3>
                <p className="text-white/80 text-sm md:text-base">
                  Te contactaremos por correo con más detalles del evento.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setConfirmOpen(false)}
                    className="inline-flex items-center px-6 py-3 text-base bg-gradient-to-r from-[#d93340] to-[#a6249d] text-white rounded-full font-bold hover:brightness-110 transition"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.dialog>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
