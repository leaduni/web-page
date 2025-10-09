import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { CalendarDays, MapPin, Users, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Simple, local speaker modal component
function SpeakerModal({ speaker, onClose }) {
  if (!speaker) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">
      <motion.button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Cerrar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        className="relative z-10 w-full max-w-[92vw] sm:max-w-md md:max-w-2xl lg:max-w-3xl rounded-2xl bg-[#120a22] border border-[#a6249d]/30 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
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
          <div className="relative min-h-[200px] md:min-h-[240px] bg-black/20">
            <img
              src={speaker.image}
              alt={speaker.name}
              className={`w-full h-full object-cover ${speaker.imgClass || ''}`}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#d93340]/10 to-transparent" />
          </div>
          {/* Right content */}
          <div className="p-5 md:p-7">
            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-1">{speaker.name}</h3>
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
      </motion.div>
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
  const [form, setForm] = useState({ nombre: '', carrera: '', email: '' });
  const [status, setStatus] = useState({ type: null, message: '' });
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Google Forms endpoint (provided)
  const FORM_URL =
    'https://docs.google.com/forms/u/1/d/e/1FAIpQLScnOPPrG_Cf51euKCjot4GboV2LpC0WYG9_1QnevAQV01rdOQ/formResponse';
  // Field mapping (from provided HTML)
  const FIELDS = {
    nombre: 'entry.472759893',
    email: 'entry.670715888',
    carrera: 'entry.1915342240',
  };

  // Placeholder speakers; replace with real data later
  const speakers = useMemo(
    () => [
      {
        name: 'Ponente 1',
        title: 'AI Researcher',
        company: 'Empresa / Universidad',
        image: '/student_stem.png',
        description:
          'Explorando el impacto real de la IA en la industria y la academia. Charlaremos sobre agentes, RAG y tendencias 2025.',
        links: [{ label: 'LinkedIn', href: 'https://www.linkedin.com' }],
      },
      {
        name: 'Ponente 2',
        title: 'Data Scientist',
        company: 'Tech Company',
        image: '/student_stem.png',
        description:
          'Casos prácticos de IA aplicada: de la idea al prototipo. Cómo llevar un proyecto de IA a producción.',
      },
      {
        name: 'Ponente 3',
        title: 'ML Engineer',
        company: 'Startup AI',
        image: '/student_stem.png',
        description:
          'Infraestructura y mejores prácticas para escalar modelos y pipelines de ML en 2025.',
      },
      {
        name: 'Ponente 4',
        title: 'Product Manager',
        company: 'AI Products',
        image: '/student_stem.png',
        description:
          'Diseñando productos impulsados por IA: enfoque en usuario, métricas y experimentación.',
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

      await fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body: data });

      setStatus({ type: 'success', message: '¡Registro enviado! Te contactaremos por correo.' });
      setConfirmOpen(true);
      setForm({ nombre: '', carrera: '', email: '' });
    } catch (err) {
      console.error('AI Recap registration error:', err);
      setStatus({ type: 'error', message: 'No se pudo enviar. Inténtalo nuevamente.' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[rgb(9,9,42)] text-white">
      {/* Hero */}
      <section className="relative w-full h-[52vh] sm:h-[60vh] overflow-hidden">
        <img
          src="/student_stem.png"
          alt="AI Recap Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
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
              <CalendarDays className="w-4 h-4 text-[#ff6ec7]" /> Octubre 2025
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

      {/* Intro y Sponsors */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Sobre el evento</h2>
            <p className="text-white/80 leading-relaxed">
              En AI Recap compartimos aprendizajes, demos y perspectivas de expertos que trabajan
              con IA hoy. Desde agentes y LLMs hasta puesta en producción y diseño de producto.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[#ff6ec7]">Auspiciadores</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { src: '/logo-lead-uni.png', alt: 'LEAD UNI' },
                { src: '/vite.svg', alt: 'Vite' },
                { src: '/pillars/Marketing.png', alt: 'Marketing' },
              ].map(s => (
                <div
                  key={s.alt}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center"
                >
                  <img src={s.src} alt={s.alt} className="max-h-10 object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section className="container mx-auto px-6 py-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Ponentes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map(sp => (
            <button
              key={sp.name}
              onClick={() => setSelectedSpeaker(sp)}
              className="group text-left rounded-2xl overflow-hidden border border-[#a6249d]/30 bg-[#120a22] hover:bg-[#160e29] transition-all duration-300"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={sp.image}
                  alt={sp.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold">{sp.name}</h3>
                <p className="text-sm text-[#ff6ec7]">{sp.title}</p>
                <p className="text-xs text-white/70 mt-1 line-clamp-2">{sp.description}</p>
              </div>
            </button>
          ))}
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

      {/* Modales */}
      <AnimatePresence>
        {selectedSpeaker && (
          <SpeakerModal speaker={selectedSpeaker} onClose={() => setSelectedSpeaker(null)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {confirmOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">
            <motion.button
              type="button"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setConfirmOpen(false)}
              aria-label="Cerrar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
