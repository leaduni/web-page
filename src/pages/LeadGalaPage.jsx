import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const LeadGalaPage = () => {
  const heroRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const volunteersRef = useRef(null);
  const carouselRef = useRef(null);
  const containerRef = useRef(null);

  // Estados para el carrusel
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Imágenes del carrusel (memoizadas para evitar recreación)
  const carouselImages = useMemo(() => [
    {
      id: 1,
      src: 'https://drive.google.com/thumbnail?id=1E6i6B_KiVaUct2JS0sWzxQzMusIA1LOd&sz=w1200',
      alt: 'Equipo LEAD UNI en LEAD GALA 2025'
    },
    {
      id: 2,
      src: 'https://drive.google.com/thumbnail?id=17pD8u6ENa5ckvI3DsxT7Zj-3RuijfKNA&sz=w1000',
      alt: 'LEAD UNI recibiendo Chapter of the Year'
    },
    {
      id: 3,
      src: 'https://drive.google.com/thumbnail?id=1M_xnKqlgT_95PeDURB5xSEbdJhJMOmwg&sz=w1000',
      alt: 'Equipo recibiendo Culture of Belonging'
    },
    {
      id: 4,
      src: 'https://drive.google.com/thumbnail?id=17QZiogdasC8zQu_xtVYjJhmBwo8xcmpu&sz=w1000',
      alt: 'Arianna Yauri recibiendo Women Who Inspire'
    },
    {
      id: 5,
      src: 'https://drive.google.com/thumbnail?id=1E6i6B_KiVaUct2JS0sWzxQzMusIA1LOd&sz=w1000',
      alt: 'Galería LEAD GALA 2025 - Imagen 5'
    },
    {
      id: 6,
      src: 'https://drive.google.com/thumbnail?id=1K7ZZQV5J4_K0JnkjppXI0Go6cjBPACSW&sz=w1000',
      alt: 'Galería LEAD GALA 2025 - Imagen 6'
    },
    {
      id: 7,
      src: 'https://drive.google.com/thumbnail?id=1IpuJH6k2NtGqG1Dbn48yHLJk7XMfy_Ex&sz=w1000',
      alt: 'Galería LEAD GALA 2025 - Imagen 7'
    },
    {
      id: 8,
      src: 'https://drive.google.com/thumbnail?id=19raGuRG3rQMsTjmhDeFRJn8Lol1zoHWF&sz=w1000',
      alt: 'Galería LEAD GALA 2025 - Imagen 8'
    },
    {
      id: 9,
      src: 'https://drive.google.com/thumbnail?id=13U51-VXz7qcehwLlgnMvodvF8fmblYf6&sz=w1000',
      alt: 'Galería LEAD GALA 2025 - Imagen 9'
    }
  ], []);

  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const parallaxYSlow = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    const elements = [heroRef.current, section1Ref.current, section2Ref.current, section3Ref.current, volunteersRef.current].filter(Boolean);
    elements.forEach(element => observer.observe(element));

    return () => elements.forEach(element => observer.unobserve(element));
  }, []);

  // Precargar todas las imágenes del carrusel
  useEffect(() => {
    const preloadImages = () => {
      carouselImages.forEach((image, index) => {
        const img = new Image();
        img.src = image.src;
        img.onload = () => {
          setImagesLoaded(prev => new Set([...prev, index]));
          if (index === 0) {
            setIsImageLoading(false);
          }
        };
        img.onerror = () => {
          console.warn(`Error al cargar imagen ${index + 1}`);
        };
      });
    };

    preloadImages();
  }, []);

  // Precargar imágenes adyacentes y manejar carga de imagen actual
  useEffect(() => {
    // Precargar imágenes adyacentes (siguiente y anterior)
    const nextIndex = (currentImageIndex + 1) % carouselImages.length;
    const prevIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
    
    [nextIndex, prevIndex].forEach(index => {
      if (!imagesLoaded.has(index)) {
        const img = new Image();
        img.src = carouselImages[index].src;
        img.onload = () => {
          setImagesLoaded(prev => new Set([...prev, index]));
        };
      }
    });

    // Verificar si la imagen actual está cargada
    if (imagesLoaded.has(currentImageIndex)) {
      setIsImageLoading(false);
    } else {
      setIsImageLoading(true);
      // Forzar carga de la imagen actual si no está precargada
      const img = new Image();
      img.src = carouselImages[currentImageIndex].src;
      img.onload = () => {
        setImagesLoaded(prev => new Set([...prev, currentImageIndex]));
        setIsImageLoading(false);
      };
    }
  }, [currentImageIndex, imagesLoaded]);

  // Funciones del carrusel
  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentImageIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return carouselImages.length - 1;
      if (nextIndex >= carouselImages.length) return 0;
      return nextIndex;
    });
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStart.x;
    setDragOffset(deltaX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        paginate(-1);
      } else {
        paginate(1);
      }
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMouseDown = (e) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    setDragOffset(deltaX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        paginate(-1);
      } else {
        paginate(1);
      }
    }
    setIsDragging(false);
    setDragOffset(0);
  };

  // Componente de sello vintage
  const VintageStamp = ({ text, rotation, position }) => (
    <motion.div
      className={`absolute ${position} pointer-events-none`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.15, scale: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      style={{
        transform: `rotate(${rotation}deg)`,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.75rem',
        color: '#d93340',
        fontWeight: 'bold',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        border: '2px solid rgba(217, 51, 64, 0.3)',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(2px)',
      }}
    >
      {text}
    </motion.div>
  );

  return (
    <div ref={containerRef} className="min-h-screen w-full text-white relative overflow-hidden">
      {/* Fondo con textura de papel vintage mejorado */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 50%, rgba(166, 36, 157, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(217, 51, 64, 0.1) 0%, transparent 50%),
              linear-gradient(135deg, #faf0e6 0%, #f5f5dc 50%, #faf0e6 100%),
              url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
            `,
            backgroundSize: 'cover, cover, cover, 60px 60px',
          }}
        />
        
        {/* Overlay de papel envejecido con manchas */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(circle at 10% 20%, rgba(139, 69, 19, 0.1) 0%, transparent 30%),
              radial-gradient(circle at 90% 80%, rgba(160, 82, 45, 0.08) 0%, transparent 25%),
              radial-gradient(circle at 50% 50%, rgba(101, 67, 33, 0.05) 0%, transparent 40%)
            `,
            mixBlendMode: 'multiply'
          }}
        />

      </div>

      {/* Contenido principal */}
      <div className="relative z-10">
        {/* Hero Section - Premio Principal */}
        <section
          ref={heroRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-out pt-24 pb-12 px-6 relative"
        >
          {/* Sellos vintage */}
          <VintageStamp text="2025" rotation={8} position="top-8 left-8" />

          <div className="max-w-6xl mx-auto relative">

            {/* Header estilo periódico */}
            <div className="text-center mb-8 relative">
              <h1 className="text-5xl md:text-7xl font-bold mb-2 font-serif" style={{ 
                fontFamily: 'Yrsa, serif',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3), 0 0 10px rgba(0,0,0,0.1)',
                letterSpacing: '0.05em',
                color: '#000'
              }}>
                LEAD NEWS
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm md:text-base text-gray-700 mb-4" style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: '500'
              }}>
                <span>VOL. 11, NO.5</span>
                <span>•</span>
                <span>LEAD GALA</span>
                <span>•</span>
                <span>27 DEC, 2025</span>
              </div>
              {/* Línea separadora unificada */}
              <div
                className="h-[2px] bg-gradient-to-r from-transparent via-black/70 to-transparent mb-4 opacity-100"
                style={{ opacity: 1 }}
              ></div>
            </div>

            {/* Headline Principal con animación 3D */}
            <motion.div
              className="text-center mb-8"
              initial={{ scale: 0.95, opacity: 0, rotateX: -10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-serif" style={{
                fontFamily: '"Zuume Rough Bold", "Yrsa", serif',
                textShadow: '3px 3px 6px rgba(0,0,0,0.4), 0 0 20px rgba(45, 27, 78, 0.2)',
                letterSpacing: '0.02em',
                color: '#000',
                lineHeight: '1.1',
                fontVariant: 'normal',
                textRendering: 'optimizeLegibility'
              }}>
                SOMOS EL MEJOR CAPITULO DEL A<span style={{ 
                  fontSize: '0.95em', 
                  display: 'inline-block',
                  transform: 'scale(1, 1.2)',
                  transformOrigin: 'center bottom',
                  verticalAlign: 'baseline',
                  lineHeight: '0.85',
                  paddingLeft: '0.02em'
                }}>Ñ</span>O
              </h2>
              <p className="text-lg md:text-xl text-gray-700 font-semibold" style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic'
              }}>
                3 PREMIOS • LEAD GALA 2025
              </p>
            </motion.div>

            {/* Imagen del equipo con parallax y efectos 3D */}
            <motion.div
              className="mb-8 relative"
              style={{ y: parallaxY }}
            >
              <motion.div
                className="rounded-lg overflow-hidden shadow-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 2,
                  rotateX: -1,
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  willChange: 'transform'
                }}
              >
                {/* Borde desgastado para la imagen */}
                <div 
                  className="absolute inset-0 pointer-events-none z-10"
                  style={{
                    clipPath: 'polygon(0% 0%, 97% 0%, 100% 3%, 100% 100%, 3% 100%, 0% 97%)',
                    border: '3px solid rgba(0, 0, 0, 0.15)',
                  }}
                />
                <div className="relative">
                  <img
                    src="https://drive.google.com/thumbnail?id=1E6i6B_KiVaUct2JS0sWzxQzMusIA1LOd&sz=w1200"
                    alt="Equipo LEAD UNI en LEAD GALA 2025"
                    className="w-full h-auto object-cover"
                    style={{ filter: 'contrast(1.1) brightness(0.95) sepia(0.05)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              </motion.div>
              <p className="text-center text-xl md:text-2xl text-gray-600 mt-2 italic" style={{
                fontFamily: 'Playfair Display, serif'
              }}>
                El equipo de LEAD UNI celebrando sus logros en la LEAD GALA 2025
              </p>
            </motion.div>
          </div>
        </section>

        {/* Sección Chapter of the Year */}
        <section
          ref={section1Ref}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-out py-8 md:py-12 px-6 relative"
        >
          <VintageStamp text="AWARD" rotation={15} position="top-4 right-4" />
          
          <div className="max-w-6xl mx-auto relative">
            <div className="mb-6 md:mb-8 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 font-serif" style={{
                fontFamily: 'Anton, sans-serif',
                color: '#000',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                letterSpacing: '0.05em'
              }}>
                CHAPTER OF THE YEAR
              </h3>
              {/* Línea separadora más visible en móvil */}
              <div
                className="h-[2px] bg-gradient-to-r from-transparent via-black/70 to-transparent mb-6 opacity-100"
                style={{ opacity: 1 }}
              ></div>
              <p className="text-lg md:text-xl text-gray-700 font-semibold mb-6" style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic'
              }}>
                EL MÁXIMO RECONOCIMIENTO ENTRE LOS 13 CAPÍTULOS ACTIVOS DE LEAD
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
              {/* Artículo */}
              <motion.div 
                className="space-y-4 text-gray-800 leading-relaxed order-2 lg:order-1"
                initial={{ opacity: 0, x: -30, rotateY: -10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <p className="text-base md:text-lg" style={{ fontFamily: 'Times New Roman, serif' }}>
                  Durante la <span className="font-bold">LEAD GALA 2025</span>, LEAD UNI fue reconocido como{' '}
                  <span className="font-bold text-[#d93340]">Chapter of the Year</span>, el máximo reconocimiento
                  de la noche y el más alto honor entre los 13 capítulos activos de LEAD. Este premio destaca al
                  capítulo que ha demostrado un crecimiento sostenido, compromiso genuino e impacto sobresaliente a
                  lo largo del año.
                </p>

                <p className="text-base md:text-lg" style={{ fontFamily: 'Times New Roman, serif' }}>
                  El reconocimiento celebra a un equipo que no solo ha cumplido objetivos, sino que ha ido más allá:
                  construyendo comunidad, formando liderazgo y generando oportunidades reales para estudiantes y
                  jóvenes.
                </p>

                <p className="text-base md:text-lg" style={{ fontFamily: 'Times New Roman, serif' }}>
                  LEAD UNI ha demostrado que el impacto no se mide solo en números, sino en personas transformadas y
                  caminos abiertos. Este premio reconoce a un capítulo que refleja profundamente los valores de LEAD:
                  aprender, explorar y descubrir. Un equipo que inspira a otros capítulos a atreverse, a innovar y a
                  liderar con propósito, incluso en contextos desafiantes.
                </p>

                <p className="text-base md:text-lg" style={{ fontFamily: 'Times New Roman, serif' }}>
                  Más que un logro institucional, este reconocimiento es el resultado del trabajo colectivo, la
                  constancia y la convicción de que el liderazgo se construye todos los días. LEAD UNI no solo hizo
                  historia esta noche: marcó un estándar para lo que significa liderar con impacto.
                </p>
              </motion.div>

              {/* Imagen con efectos 3D */}
              <motion.div
                className="order-1 lg:order-2 flex items-center justify-center"
                initial={{ x: 20, opacity: 0, rotateY: 10 }}
                whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: -2,
                  z: 20,
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  willChange: 'transform'
                }}
              >
                <div className="relative">
                  <div 
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)',
                      border: '2px solid rgba(0, 0, 0, 0.12)',
                    }}
                  />
                  <img
                    src="https://drive.google.com/thumbnail?id=1M_xnKqlgT_95PeDURB5xSEbdJhJMOmwg&sz=w1000"
                    alt="LEAD UNI recibiendo Chapter of the Year"
                    className="w-full h-auto rounded-lg shadow-xl"
                    style={{ 
                      filter: 'contrast(1.1) brightness(0.95) sepia(0.05)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Quote destacado con efecto 3D flip */}
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, rotateX: -20 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ 
                rotateY: 2,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              <div 
                className="bg-gradient-to-r from-[#d93340]/10 to-[#a6249d]/10 border-l-4 border-[#d93340] p-6 rounded-r-lg max-w-2xl relative"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.1), 0 10px 30px rgba(0, 0, 0, 0.2)'
                }}
              >
                <p className="text-xl md:text-2xl font-serif italic text-gray-900 relative z-10" style={{
                  fontFamily: 'Times New Roman, serif',
                  lineHeight: '1.4'
                }}>
                  "NO FUE SOLO UN PREMIO, FUE EL REFLEJO DE UN AÑO DE COMPROMISO"
                </p>
              </div>
            </motion.div>
          </div>

            {/* Línea separadora al final de la sección */}
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 max-w-6xl mx-auto">
            <div
              className="h-[2px] bg-gradient-to-r from-transparent via-black/70 to-transparent opacity-100"
              style={{ opacity: 1 }}
            ></div>
          </div>
        </section>

        {/* Sección Culture of Belonging */}
        <section
          ref={section2Ref}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-out py-8 md:py-12 px-6 relative"
          style={{ y: parallaxYSlow }}
        >
          <VintageStamp text="INCLUSION" rotation={-8} position="top-4 left-4" />
          
          <div className="max-w-6xl mx-auto relative">
            <div className="mb-8 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 font-serif" style={{
                fontFamily: 'Anton, sans-serif',
                color: '#000',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                letterSpacing: '0.05em'
              }}>
                CULTURE OF BELONGING
              </h3>
              <div
                className="h-[2px] bg-gradient-to-r from-transparent via-black/70 to-transparent mb-6 opacity-100"
                style={{ opacity: 1 }}
              ></div>
              <p className="text-lg md:text-xl text-gray-700 font-semibold mb-6" style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic'
              }}>
                CELEBRANDO AL CAPÍTULO QUE CONVIRTIÓ LA INCLUSIÓN EN SU MAYOR FORTALEZA
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
              {/* Imagen */}
              <motion.div
                initial={{ x: -20, opacity: 0, rotateY: -10 }}
                whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -5,
                  rotateX: 2,
                  z: 20,
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  willChange: 'transform'
                }}
              >
                <div className="relative">
                  <div 
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)',
                      border: '2px solid rgba(0, 0, 0, 0.12)',
                    }}
                  />
                  <img
                    src="https://drive.google.com/thumbnail?id=17pD8u6ENa5ckvI3DsxT7Zj-3RuijfKNA&sz=w1000"
                    alt="Equipo recibiendo Culture of Belonging"
                    className="w-full h-auto rounded-lg shadow-xl"
                    style={{ 
                      filter: 'contrast(1.1) brightness(0.95) sepia(0.05)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
              </motion.div>

              {/* Artículo */}
              <motion.div 
                className="space-y-6 text-gray-800 leading-relaxed"
                initial={{ opacity: 0, x: 30, rotateY: 10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div>
                  <h4 className="text-xl md:text-2xl font-bold mb-4" style={{ 
                    color: '#000',
                    fontFamily: 'Playfair Display, serif'
                  }}>
                    MÁS QUE SER UNA COMUNIDAD
                  </h4>
                </div>

                <p className="text-base md:text-lg" style={{ fontFamily: 'Times New Roman, serif' }}>
                  El reconocimiento <span className="font-bold text-[#a6249d]">Culture of Belonging</span> honra al
                  capítulo que ha construido intencionalmente un entorno donde cada miembro se siente bienvenido,
                  valorado y motivado a contribuir. Este premio destaca la importancia de crear espacios seguros e
                  inclusivos, donde las personas no solo participan, sino que realmente sienten que pertenecen.
                </p>

                <p className="text-base md:text-lg" style={{ fontFamily: 'Times New Roman, serif' }}>
                  A lo largo del año, este capítulo ha fortalecido una comunidad basada en el apoyo mutuo, la confianza
                  y la colaboración. Al poner a las personas en el centro, demostró que el éxito se construye
                  colectivamente y que una cultura de pertenencia es clave para generar impacto sostenible.
                </p>

                {/* Quote destacado */}
                <motion.div 
                  className="bg-gradient-to-r from-[#a6249d]/10 to-[#ff6ec7]/10 border-l-4 border-[#a6249d] p-6 my-8 rounded-r-lg"
                  whileHover={{ 
                    rotateY: 2,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                    boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.1), 0 10px 30px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <p className="text-xl md:text-2xl font-serif italic text-gray-900" style={{
                    fontFamily: 'Times New Roman, serif',
                    lineHeight: '1.4'
                  }}>
                    "MÁS QUE CONSTRUIR UNA COMUNIDAD, ELEGIMOS CONSTRUIR UNA FAMILIA"
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Línea separadora al final de la sección */}
            <div className="mt-8 md:mt-12 pt-6 md:pt-8">
              <div
                className="h-[2px] bg-gradient-to-r from-transparent via-black/70 to-transparent opacity-100"
                style={{ opacity: 1 }}
              ></div>
            </div>
          </div>
        </section>

        {/* Sección Women Who Inspire */}
        <section
          ref={section3Ref}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-out py-8 md:py-12 px-6 relative"
        >
          <VintageStamp text="LEADERSHIP" rotation={12} position="top-4 right-4" />
          
          <div className="max-w-6xl mx-auto relative">
            <div className="mb-8 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 font-serif" style={{
                fontFamily: 'Anton, sans-serif',
                color: '#000',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                letterSpacing: '0.05em'
              }}>
                WOMEN WHO INSPIRE
              </h3>
              <div
                className="h-[2px] bg-gradient-to-r from-transparent via-black/70 to-transparent mb-6 opacity-100"
                style={{ opacity: 1 }}
              ></div>
              <p className="text-lg md:text-xl text-gray-700 font-semibold mb-6" style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic'
              }}>
                AL LIDERAZGO QUE INSPIRA Y ELEVA A OTROS
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
              {/* Artículo */}
              <motion.div 
                className="space-y-6 text-gray-800 leading-relaxed order-2 lg:order-1"
                initial={{ opacity: 0, x: -30, rotateY: -10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <p className="text-base md:text-lg" style={{ fontFamily: 'Times New Roman, serif' }}>
                  <span className="font-bold">Nuestra presidenta, Arianna Yauri</span>, fue reconocida con el premio{' '}
                  <span className="font-bold text-[#d93340]">Women Who Inspire</span>, un reconocimiento que celebra el
                  liderazgo femenino y su impacto positivo en la comunidad.
                </p>

                <p className="text-base md:text-lg" style={{ fontFamily: 'Times New Roman, serif' }}>
                  Su liderazgo ha consolidado un espacio donde el acompañamiento, la escucha activa y la colaboración
                  son pilares fundamentales para el crecimiento del capítulo. Este reconocimiento destaca un estilo de
                  liderazgo que pone a las personas en el centro, que fortalece la comunidad y promueve la participación.
                </p>

                <p className="text-base md:text-lg" style={{ fontFamily: 'Times New Roman, serif' }}>
                  El premio celebra el liderazgo que inspira, que fortalece la comunidad, que promueve la participación
                  y que fomenta una cultura de inclusión. Un liderazgo que demuestra que el impacto real se construye
                  día a día, con acciones concretas y compromiso genuino.
                </p>

                {/* Quote destacado */}
                <motion.div 
                  className="bg-gradient-to-r from-[#d93340]/10 to-[#ff6ec7]/10 border-l-4 border-[#d93340] p-6 my-8 rounded-r-lg"
                  whileHover={{ 
                    rotateY: 2,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                    boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.1), 0 10px 30px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <p className="text-xl md:text-2xl font-serif italic text-gray-900" style={{
                    fontFamily: 'Times New Roman, serif',
                    lineHeight: '1.4'
                  }}>
                    "LIDERAR TAMBIÉN ES GENERAR OPORTUNIDADES PARA OTRAS MUJERES"
                  </p>
                </motion.div>
              </motion.div>

              {/* Imagen */}
              <motion.div
                className="order-1 lg:order-2"
                initial={{ x: 20, opacity: 0, rotateY: 10 }}
                whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -5,
                  rotateX: 2,
                  z: 20,
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  willChange: 'transform'
                }}
              >
                <div className="relative">
                  <div 
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)',
                      border: '2px solid rgba(0, 0, 0, 0.12)',
                    }}
                  />
                  <img
                    src="https://drive.google.com/thumbnail?id=17QZiogdasC8zQu_xtVYjJhmBwo8xcmpu&sz=w1000"
                    alt="Arianna Yauri recibiendo Women Who Inspire"
                    className="w-full h-auto rounded-lg shadow-xl"
                    style={{ 
                      filter: 'contrast(1.1) brightness(0.95) sepia(0.05)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Línea separadora al final de la sección */}
            <div className="mt-8 md:mt-12 pt-6 md:pt-8">
              <div
                className="h-[2px] bg-gradient-to-r from-transparent via-black/70 to-transparent opacity-100"
                style={{ opacity: 1 }}
              ></div>
            </div>
          </div>
        </section>

        {/* Sección Voluntarios del Mes */}
        <section
          ref={volunteersRef}
          className="opacity-0 translate-y-10 transition-all duration-1000 ease-out py-8 md:py-12 px-6 relative"
          style={{ y: parallaxYSlow }}
        >
          <VintageStamp text="VOLUNTEERS" rotation={-8} position="top-4 left-4" />
          
          <div className="max-w-6xl mx-auto relative">
            <div className="mb-8 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 font-serif" style={{
                fontFamily: 'Anton, sans-serif',
                color: '#000',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                letterSpacing: '0.05em'
              }}>
                EL TRABAJO SILENCIOSO
              </h3>
              <div
                className="h-[2px] bg-gradient-to-r from-transparent via-black/70 to-transparent mb-6 opacity-100"
                style={{ opacity: 1 }}
              ></div>
              <p className="text-lg md:text-xl text-gray-700 font-semibold mb-6" style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic'
              }}>
                QUE IMPULSA A LEAD UNI
              </p>
            </div>

            {/* Grid de voluntarios */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
              {/* Luis Nuñez */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -5,
                  rotateX: 2,
                  z: 20,
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  willChange: 'transform'
                }}
              >
                <div className="relative">
                  <div 
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)',
                      border: '2px solid rgba(0, 0, 0, 0.12)',
                    }}
                  />
                  <img
                    src="https://drive.google.com/thumbnail?id=1HHphsC49k92wpdMz2xiL33UPmfY6d1qA&sz=w800"
                    alt="Luis Nuñez - Voluntario del Mes"
                    className="w-full h-auto rounded-lg shadow-xl object-cover aspect-square"
                    style={{ 
                      filter: 'contrast(1.1) brightness(0.95) sepia(0.05)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
                <p className="text-center mt-3 text-base md:text-lg font-semibold text-gray-900" style={{
                  fontFamily: 'Playfair Display, serif'
                }}>
                  Luis Nuñez
                </p>
              </motion.div>

              {/* Nicole Gonzales */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -5,
                  rotateX: 2,
                  z: 20,
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  willChange: 'transform'
                }}
              >
                <div className="relative">
                  <div 
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)',
                      border: '2px solid rgba(0, 0, 0, 0.12)',
                    }}
                  />
                  <img
                    src="https://drive.google.com/thumbnail?id=1CGHEseaCsMhw92PxajBTlT9g0hG4S3ws&sz=w800"
                    alt="Nicole Gonzales - Voluntaria del Mes"
                    className="w-full h-auto rounded-lg shadow-xl object-cover aspect-square"
                    style={{ 
                      filter: 'contrast(1.1) brightness(0.95) sepia(0.05)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
                <p className="text-center mt-3 text-base md:text-lg font-semibold text-gray-900" style={{
                  fontFamily: 'Playfair Display, serif'
                }}>
                  Nicole Gonzales
                </p>
              </motion.div>

              {/* Christoffer Antara */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -5,
                  rotateX: 2,
                  z: 20,
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  willChange: 'transform'
                }}
              >
                <div className="relative">
                  <div 
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)',
                      border: '2px solid rgba(0, 0, 0, 0.12)',
                    }}
                  />
                  <img
                    src="https://drive.google.com/thumbnail?id=10n79bX1pexR7tZMHq9ClNDWndF0q6Gkf&sz=w800"
                    alt="Christoffer Antara - Voluntaria del Mes"
                    className="w-full h-auto rounded-lg shadow-xl object-cover aspect-square"
                    style={{ 
                      filter: 'contrast(1.1) brightness(0.95) sepia(0.05)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
                <p className="text-center mt-3 text-base md:text-lg font-semibold text-gray-900" style={{
                  fontFamily: 'Playfair Display, serif'
                }}>
                  Christoffer Antara
                </p>
              </motion.div>

              {/* Dylan Lacsama */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: -5,
                  rotateX: 2,
                  z: 20,
                  transition: { duration: 0.3 }
                }}
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                  willChange: 'transform'
                }}
              >
                <div className="relative">
                  <div 
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)',
                      border: '2px solid rgba(0, 0, 0, 0.12)',
                    }}
                  />
                  <img
                    src="https://drive.google.com/thumbnail?id=1Y2zeyjDkD4p7h-zh6M5c7HeJmE-F2VnD&sz=w800"
                    alt="Dylan Lacsama - Voluntario del Mes"
                    className="w-full h-auto rounded-lg shadow-xl object-cover aspect-square"
                    style={{ 
                      filter: 'contrast(1.1) brightness(0.95) sepia(0.05)',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </div>
                <p className="text-center mt-3 text-base md:text-lg font-semibold text-gray-900" style={{
                  fontFamily: 'Playfair Display, serif'
                }}>
                  Dylan Lacsama
                </p>
              </motion.div>
            </div>

            {/* Contenido de texto */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8" style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}>
              {/* Columna izquierda - Texto descriptivo */}
              <motion.div 
                className="space-y-4 text-gray-800 leading-relaxed"
                initial={{ opacity: 0, x: -30, rotateY: -10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <h4 className="text-2xl md:text-3xl font-bold mb-4" style={{
                  fontFamily: 'Anton, sans-serif',
                  color: '#000',
                  letterSpacing: '0.05em'
                }}>
                  VOLUNTARIADO QUE DEJA HUELLA
                </h4>
                <p className="text-base md:text-lg" style={{ fontFamily: 'Times New Roman, serif' }}>
                  A lo largo del año, estos voluntarios han sido parte fundamental del desarrollo de LEAD UNI, contribuyendo de manera constante a las actividades, proyectos y espacios que fortalecen a la comunidad. Su compromiso ha ido más allá de cumplir tareas, involucrándose activamente en la construcción de un entorno colaborativo y cercano.
                </p>
              </motion.div>

              {/* Columna derecha - Texto y caja destacada */}
              <motion.div
                initial={{ opacity: 0, x: 30, rotateY: 10 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="space-y-6"
              >
                <p className="text-base md:text-lg text-gray-800 leading-relaxed" style={{ fontFamily: 'Times New Roman, serif' }}>
                  Cada aporte, grande o pequeño, ha sumado al funcionamiento del capítulo y ha reflejado los valores de liderazgo, responsabilidad y servicio que promueve LEAD. Este reconocimiento busca visibilizar el impacto del voluntariado y agradecer a quienes, con constancia y dedicación, hacen posible que LEAD UNI siga avanzando como una comunidad que aprende, se apoya y crece junta.
                </p>
                <motion.div 
                  className="bg-gradient-to-r from-[#d93340]/10 to-[#a6249d]/10 border-l-4 border-[#d93340] p-6 rounded-r-lg"
                  whileHover={{ 
                    rotateY: 2,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  style={{ 
                    transformStyle: 'preserve-3d',
                    perspective: '1000px',
                    boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.1), 0 10px 30px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <p className="text-xl md:text-2xl font-serif italic text-gray-900 relative z-10" style={{
                    fontFamily: 'Times New Roman, serif',
                    lineHeight: '1.4'
                  }}>
                    "LO QUE CONSTRUIMOS COMO COMUNIDAD EXISTE GRACIAS A QUIENES PONEN EL CORAZÓN EN CADA PASO"
                  </p>
                </motion.div>
              </motion.div>
            </div>

            {/* Línea separadora al final de la sección */}
            <div className="mt-8 md:mt-12 pt-6 md:pt-8">
              <div
                className="h-[2px] bg-gradient-to-r from-transparent via-black/70 to-transparent opacity-100"
                style={{ opacity: 1 }}
              ></div>
            </div>
          </div>
        </section>

        {/* Carrusel de imágenes - Galería */}
        <section
          ref={carouselRef}
          className="py-16 px-6 relative"
        >
          <VintageStamp text="GALLERY" rotation={-10} position="top-4 left-4" />
          
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 font-serif" style={{
                fontFamily: 'Anton, sans-serif',
                color: '#000',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                letterSpacing: '0.05em'
              }}>
                GALERÍA DE LA GALA
              </h3>
              <div className="h-px bg-gradient-to-r from-transparent via-black/40 to-transparent mb-6 opacity-100" style={{ opacity: 1 }}></div>
              <p className="text-lg md:text-xl text-gray-700 font-semibold" style={{
                fontFamily: 'Playfair Display, serif',
                fontStyle: 'italic'
              }}>
                MOMENTOS DESTACADOS DE UNA NOCHE INOLVIDABLE
              </p>
            </div>

            {/* Carrusel 3D */}
            <div
              className="relative h-[500px] md:h-[600px] max-w-5xl mx-auto select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ 
                cursor: isDragging ? 'grabbing' : 'grab',
                perspective: '2000px',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Botones de navegación */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 md:px-4 z-40">
                <motion.button
                  className="pointer-events-auto p-3 rounded-full bg-gradient-to-br from-[#d93340] to-[#a6249d] shadow-lg transition-all duration-300 border-2 border-[#a6249d]/40 text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => paginate(-1)}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </motion.button>

                <motion.button
                  className="pointer-events-auto p-3 rounded-full bg-gradient-to-br from-[#d93340] to-[#a6249d] shadow-lg transition-all duration-300 border-2 border-[#a6249d]/40 text-white"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => paginate(1)}
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Contenedor del carrusel */}
              <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentImageIndex}
                    custom={direction}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    variants={{
                      enter: (direction) => ({
                        x: direction > 0 ? '100%' : '-100%',
                        opacity: 0,
                        scale: 0.8,
                        rotateY: direction > 0 ? 45 : -45,
                        z: -200
                      }),
                      center: {
                        x: isDragging ? dragOffset : 0,
                        opacity: 1,
                        scale: 1,
                        rotateY: isDragging ? dragOffset * 0.1 : 0,
                        z: 0,
                        transition: {
                          type: isDragging ? 'tween' : 'spring',
                          damping: 25,
                          stiffness: 120,
                          duration: isDragging ? 0 : 0.8
                        }
                      },
                      exit: (direction) => ({
                        x: direction > 0 ? '-100%' : '100%',
                        opacity: 0,
                        scale: 0.8,
                        rotateY: direction > 0 ? -45 : 45,
                        z: -200
                      })
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div
                      className="relative w-full h-full max-w-4xl mx-auto"
                      whileHover={{ 
                        scale: 1.02,
                        rotateY: 2,
                        transition: { duration: 0.3 }
                      }}
                      style={{ 
                        transformStyle: 'preserve-3d',
                        willChange: 'transform'
                      }}
                    >
                      <div 
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                          clipPath: 'polygon(1% 0%, 99% 0%, 100% 1%, 100% 99%, 99% 100%, 1% 100%, 0% 99%, 0% 1%)',
                          border: '3px solid rgba(0, 0, 0, 0.15)',
                        }}
                      />
                      
                      {/* Indicador de carga */}
                      {isImageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200/30 backdrop-blur-sm rounded-lg z-20">
                          <div className="flex flex-col items-center gap-3">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d93340]"></div>
                            <p className="text-gray-700 text-sm font-medium" style={{ fontFamily: 'Times New Roman, serif' }}>
                              Cargando imagen...
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <img
                        src={carouselImages[currentImageIndex].src}
                        alt={carouselImages[currentImageIndex].alt}
                        className={`w-full h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
                          isImageLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                        style={{ 
                          filter: 'contrast(1.1) brightness(0.95) sepia(0.05)',
                          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.15)'
                        }}
                        draggable={false}
                        loading="eager"
                        onLoad={() => setIsImageLoading(false)}
                        onError={() => {
                          setIsImageLoading(false);
                          console.error(`Error al cargar imagen ${currentImageIndex + 1}`);
                        }}
                      />
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Indicadores (dots) */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > currentImageIndex ? 1 : -1);
                      setCurrentImageIndex(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? 'bg-[#d93340] scale-125'
                        : 'bg-gray-400/50 hover:bg-gray-400'
                    }`}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeadGalaPage;
