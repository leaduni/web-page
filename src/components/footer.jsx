export function Footer() {
  return (
    <footer className="w-full mt-16 flex flex-col items-center justify-center py-10 bg-[#1A0B2E]/85  shadow-purple-900/20 backdrop-blur-md border-t border-[#7957f1]/40 z-20 relative">
      <h2 className="text-2xl font-bold mb-4 text-[#d93340]">Contáctanos</h2>
      <div className="flex flex-wrap gap-6 items-center justify-center mb-4">
        <a
          href="https://instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
          title="Instagram"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="7" fill="#E1306C" />
            <path
              d="M16.98 2H7.02A5.02 5.02 0 0 0 2 7.02v9.96A5.02 5.02 0 0 0 7.02 22h9.96A5.02 5.02 0 0 0 22 16.98V7.02A5.02 5.02 0 0 0 16.98 2ZM12 17.2A5.2 5.2 0 1 1 17.2 12 5.2 5.2 0 0 1 12 17.2Zm6.4-9.44a1.2 1.2 0 1 1-1.2-1.2 1.2 1.2 0 0 1 1.2 1.2Z"
              fill="#fff"
            />
            <circle cx="12" cy="12" r="3.2" fill="#fff" />
          </svg>
        </a>
        <a
          href="https://facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
          title="Facebook"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="7" fill="#1877F3" />
            <path
              d="M15.67 8.5h-1.34V7.5c0-.32.26-.58.58-.58h.76V5.08A10.1 10.1 0 0 0 14.1 5c-1.2 0-2.02.73-2.02 2.07v1.43H10v2h2.08v5.42h2.25V10.5h1.51l.24-2Z"
              fill="#fff"
            />
          </svg>
        </a>
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
          title="LinkedIn"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="7" fill="#0A66C2" />
            <path
              d="M8.34 17.34H5.67V9.67h2.67v7.67ZM7 8.67A1.33 1.33 0 1 1 7 6a1.33 1.33 0 0 1 0 2.67Zm10.34 8.67h-2.67v-3.67c0-.88-.32-1.48-1.12-1.48-.61 0-.97.41-1.13.8-.06.15-.08.36-.08.57v3.78h-2.67s.04-6.13 0-7.67h2.67v1.09c.35-.54.98-1.31 2.39-1.31 1.75 0 3.06 1.14 3.06 3.59v4.3Z"
              fill="#fff"
            />
          </svg>
        </a>
        <a
          href="mailto:contacto@leaduni.com"
          className="hover:scale-110 transition-transform"
          title="Correo"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="7" fill="#EA4335" />
            <path
              d="M19.5 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 4.5 16.5v-9A1.5 1.5 0 0 1 6 6h12a1.5 1.5 0 0 1 1.5 1.5Zm-1.5 0-6 4.5-6-4.5m12 9h-12v-7.5l6 4.5 6-4.5V16.5Z"
              fill="#fff"
            />
          </svg>
        </a>
        <a
          href="tel:+51999999999"
          className="hover:scale-110 transition-transform"
          title="Teléfono"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="7" fill="#34A853" />
            <path
              d="M17.7 15.29l-2.2-1a1 1 0 0 0-1.13.21l-.97.99a7.49 7.49 0 0 1-3.54-3.54l.99-.97a1 1 0 0 0 .21-1.13l-1-2.2A1 1 0 0 0 8.1 7H6.5A1.5 1.5 0 0 0 5 8.5c0 6.08 4.92 11 11 11a1.5 1.5 0 0 0 1.5-1.5v-1.6a1 1 0 0 0-.8-.98Z"
              fill="#fff"
            />
          </svg>
        </a>
      </div>
      <div className="text-[#f3eafd] text-sm">
        &copy; {new Date().getFullYear()} LEAD | UNI. Todos los derechos reservados.
      </div>
    </footer>
  );
}
