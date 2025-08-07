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
          href="https://github.com/leaduni"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
          title="GitHub"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="7" fill="#24292e" />
            <path
              d="M12 2.5c-5.25 0-9.5 4.25-9.5 9.5 0 4.2 2.73 7.75 6.5 9.02.47.08.65-.2.65-.45 0-.22-.01-.8-.01-1.57-2.64.57-3.19-1.27-3.19-1.27-.43-1.09-1.05-1.38-1.05-1.38-.86-.59.065-.58.065-.58.95.068 1.45 1 1.45 1 .845 1.45 2.22 1.03 2.76.79.086-.61.33-.79.6-.97-2.1-.24-4.31-1.05-4.31-4.67 0-1.03.37-1.87.97-2.53-.097-.24-.42-1.21.093-2.52 0 0 .79-.254 2.59.966.75-.21 1.56-.315 2.36-.32.8.005 1.61.11 2.36.32 1.8-1.22 2.59-.966 2.59-.966.513 1.31.19 2.28.093 2.52.6.66.97 1.5.97 2.53 0 3.63-2.21 4.43-4.32 4.66.34.29.64.87.64 1.75 0 1.26-.01 2.28-.01 2.59 0 .25.18.54.66.45A9.504 9.504 0 0022 12c0-5.25-4.25-9.5-9.5-9.5z"
              fill="#fff"
            />
          </svg>
        </a>
        <a
          href="https://kick.com/lead-uni"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-110 transition-transform"
          title="Kick"
        >
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <rect width="24" height="24" rx="7" fill="#53FC18" />
            <svg
              x="3"
              y="8"
              width="18"
              height="6"
              viewBox="0 0 933 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#kick_footer_clip0)">
                <g clipPath="url(#kick_footer_clip1)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0H100V66.6667H133.333V33.3333H166.667V0H266.667V100H233.333V133.333H200V166.667H233.333V200H266.667V300H166.667V266.667H133.333V233.333H100V300H0V0ZM666.667 0H766.667V66.6667H800V33.3333H833.333V0H933.333V100H900V133.333H866.667V166.667H900V200H933.333V300H833.333V266.667H800V233.333H766.667V300H666.667V0ZM300 0H400V300H300V0ZM533.333 0H466.667V33.3333H433.333V266.667H466.667V300H533.333H633.333V200H533.333V100H633.333V0H533.333Z"
                    fill="black"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="kick_footer_clip0">
                  <rect width="933" height="300" fill="white" />
                </clipPath>
                <clipPath id="kick_footer_clip1">
                  <rect width="933.333" height="300" fill="white" />
                </clipPath>
              </defs>
            </svg>
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
