const ContactSection = () => {
  return (
    <footer className="w-full relative z-20 ">
      {/* Sombra/entrada hacia arriba */}
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/10 via-black/5 to-transparent z-30 pointer-events-none" />

      {/* Fondo con gradiente y efectos 3D */}
      <div className="relative overflow-hidden">
        {/* Fondo principal */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#09092a] via-[#09092a]/95 " />

        {/* Elementos decorativos 3D */}
        <div className="absolute inset-0">
          {/* Esferas 3D flotantes */}
          <div className="absolute top-10 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#d93340] to-[#a6249d] opacity-30 blur-xl transform rotate-12 animate-pulse" />
          <div
            className="absolute top-20 right-20 w-12 h-12 rounded-full bg-gradient-to-br from-[#7957f1] to-[#a6249d] opacity-40 blur-lg transform -rotate-6 animate-pulse"
            style={{ animationDelay: '1s' }}
          />

          {/* Líneas decorativas 3D */}
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7957f1] to-transparent opacity-30" />
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 py-8 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header con efecto 3D */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-white drop-shadow-2xl">
                <span className="bg-gradient-to-r from-[#d93340] via-[#a6249d] to-[#7957f1] bg-clip-text text-transparent">
                  Nuestras Redes Sociales
                </span>
              </h2>
              <p className="text-sm text-[#f3eafd] max-w-xl mx-auto">
                Conecta con nosotros y forma parte de la comunidad LEAD UNI
              </p>
            </div>

            {/* Grid de tarjetas de contacto 3D */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 ">
              {/* Tarjeta Email */}
              <a
                href="mailto:leadatuni1403@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#EA4335] to-[#d32f2f] rounded-xl transform group-hover:scale-105 transition-all duration-500 shadow-lg"
                  style={{
                    transform: 'perspective(1000px) rotateX(3deg) rotateY(-3deg)',
                    boxShadow: '0 15px 30px rgba(234, 67, 53, 0.3)',
                  }}
                />
                <div
                  className="relative bg-[#09092a]/90 backdrop-blur-sm rounded-xl p-4 border border-[#EA4335]/30 hover:border-[#EA4335]/60 transition-all duration-500 cursor-pointer"
                  style={{
                    transform: 'perspective(1000px) rotateX(3deg) rotateY(-3deg)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 p-1 bg-gradient-to-br from-[#EA4335] to-[#d32f2f] rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 mb-2 shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="30"
                        height="30"
                        viewBox="0,0,256,256"
                      >
                        <g
                          fill="#FFF"
                          fillRule="nonzero"
                          stroke="#EA4335"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeMiterlimit="10"
                          strokeDasharray=""
                          strokeDashoffset="0"
                          fontFamily="none"
                          fontWeight="none"
                          fontSize="none"
                          textAnchor="none"
                          style={{ mixBlendMode: 'normal' }}
                        >
                          <g transform="scale(5.33333,5.33333)">
                            <path
                              d="M45,16.2l-5,2.75l-5,4.75v16.3h7c1.657,0 3,-1.343 3,-3z"
                              stroke="#808080"
                              strokeWidth="0.5"
                            />
                            <path
                              d="M3,16.2l3.614,1.71l6.386,5.79v16.3h-7c-1.657,0 -3,-1.343 -3,-3z"
                              stroke="#808080"
                              strokeWidth="0.5"
                            />
                            <path
                              d="M35,11.2l-11,8.25l-11,-8.25l-1,5.8l1,6.7l11,8.25l11,-8.25l1,-6.7z"
                              stroke="#808080"
                              strokeWidth="0.5"
                            />
                            <path
                              d="M3,12.298v3.902l10,7.5v-12.5l-3.124,-2.341c-0.744,-0.558 -1.648,-0.859 -2.578,-0.859v0c-2.374,0 -4.298,1.924 -4.298,4.298z"
                              stroke="#808080"
                              strokeWidth="0.5"
                            />
                            <path
                              d="M45,12.298v3.902l-10,7.5v-12.5l3.124,-2.341c0.744,-0.558 1.648,-0.859 2.578,-0.859v0c2.374,0 4.298,1.924 4.298,4.298z"
                              stroke="#808080"
                              strokeWidth="0.5"
                            />
                          </g>
                        </g>
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-sm">Email</h3>
                    <p className="text-[#f3eafd] text-xs">leadatuni1403@gmail.com</p>
                  </div>
                </div>
              </a>

              {/* Tarjeta Instagram */}
              <a
                href="https://www.instagram.com/lead_uni/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#E1306C] to-[#C13584] rounded-xl transform group-hover:scale-105 transition-all duration-500 shadow-lg"
                  style={{
                    transform: 'perspective(1000px) rotateX(3deg) rotateY(3deg)',
                    boxShadow: '0 15px 30px rgba(225, 48, 108, 0.3)',
                  }}
                />
                <div
                  className="relative bg-[#09092a]/90 backdrop-blur-sm rounded-xl p-4 border border-[#E1306C]/30 hover:border-[#E1306C]/60 transition-all duration-500 cursor-pointer"
                  style={{
                    transform: 'perspective(1000px) rotateX(3deg) rotateY(3deg)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 p-1 bg-gradient-to-br from-[#E1306C] to-[#C13584] rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="256"
                        height="256"
                        preserveAspectRatio="xMidYMid"
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="#fff"
                          d="M128 23.064c34.177 0 38.225.13 51.722.745 12.48.57 19.258 2.655 23.769 4.408 5.974 2.322 10.238 5.096 14.717 9.575 4.48 4.479 7.253 8.743 9.575 14.717 1.753 4.511 3.838 11.289 4.408 23.768.615 13.498.745 17.546.745 51.723 0 34.178-.13 38.226-.745 51.723-.57 12.48-2.655 19.257-4.408 23.768-2.322 5.974-5.096 10.239-9.575 14.718-4.479 4.479-8.743 7.253-14.717 9.574-4.511 1.753-11.289 3.839-23.769 4.408-13.495.616-17.543.746-51.722.746-34.18 0-38.228-.13-51.723-.746-12.48-.57-19.257-2.655-23.768-4.408-5.974-2.321-10.239-5.095-14.718-9.574-4.479-4.48-7.253-8.744-9.574-14.718-1.753-4.51-3.839-11.288-4.408-23.768-.616-13.497-.746-17.545-.746-51.723 0-34.177.13-38.225.746-51.722.57-12.48 2.655-19.258 4.408-23.769 2.321-5.974 5.095-10.238 9.574-14.717 4.48-4.48 8.744-7.253 14.718-9.575 4.51-1.753 11.288-3.838 23.768-4.408 13.497-.615 17.545-.745 51.723-.745M128 0C93.237 0 88.878.147 75.226.77c-13.625.622-22.93 2.786-31.071 5.95-8.418 3.271-15.556 7.648-22.672 14.764C14.367 28.6 9.991 35.738 6.72 44.155 3.555 52.297 1.392 61.602.77 75.226.147 88.878 0 93.237 0 128c0 34.763.147 39.122.77 52.774.622 13.625 2.785 22.93 5.95 31.071 3.27 8.417 7.647 15.556 14.763 22.672 7.116 7.116 14.254 11.492 22.672 14.763 8.142 3.165 17.446 5.328 31.07 5.95 13.653.623 18.012.77 52.775.77s39.122-.147 52.774-.77c13.624-.622 22.929-2.785 31.07-5.95 8.418-3.27 15.556-7.647 22.672-14.763 7.116-7.116 11.493-14.254 14.764-22.672 3.164-8.142 5.328-17.446 5.95-31.07.623-13.653.77-18.012.77-52.775s-.147-39.122-.77-52.774c-.622-13.624-2.786-22.929-5.95-31.07-3.271-8.418-7.648-15.556-14.764-22.672C227.4 14.368 220.262 9.99 211.845 6.72c-8.142-3.164-17.447-5.328-31.071-5.95C167.122.147 162.763 0 128 0Zm0 62.27C91.698 62.27 62.27 91.7 62.27 128c0 36.302 29.428 65.73 65.73 65.73 36.301 0 65.73-29.428 65.73-65.73 0-36.301-29.429-65.73-65.73-65.73Zm0 108.397c-23.564 0-42.667-19.103-42.667-42.667S104.436 85.333 128 85.333s42.667 19.103 42.667 42.667-19.103 42.667-42.667 42.667Zm83.686-110.994c0 8.484-6.876 15.36-15.36 15.36-8.483 0-15.36-6.876-15.36-15.36 0-8.483 6.877-15.36 15.36-15.36 8.484 0 15.36 6.877 15.36 15.36Z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-sm">Instagram</h3>
                    <p className="text-[#f3eafd] text-xs">@lead_uni</p>
                  </div>
                </div>
              </a>

              {/* Tarjeta LinkedIn */}
              <a
                href="https://www.linkedin.com/company/lead-uni/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#0A66C2] to-[#0077b5] rounded-xl transform group-hover:scale-105 transition-all duration-500 shadow-lg"
                  style={{
                    transform: 'perspective(1000px) rotateX(-3deg) rotateY(-3deg)',
                    boxShadow: '0 15px 30px rgba(10, 102, 194, 0.3)',
                  }}
                />
                <div
                  className="relative bg-[#09092a]/90 backdrop-blur-sm rounded-xl p-4 border border-[#0A66C2]/30 hover:border-[#0A66C2]/60 transition-all duration-500 cursor-pointer"
                  style={{
                    transform: 'perspective(1000px) rotateX(-3deg) rotateY(-3deg)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10  bg-white rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 mb-2">
                      <svg
                        width="256"
                        height="1000"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid"
                        className=""
                        viewBox="0 0 256 256"
                      >
                        <path
                          d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
                          fill="#0A66C2"
                        />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-sm">LinkedIn</h3>
                    <p className="text-[#f3eafd] text-xs">LEAD UNI</p>
                  </div>
                </div>
              </a>

              {/* Tarjeta Twitch */}
              <a
                href="https://www.twitch.tv/leadunioficial"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#9146FF] to-[#6441A4] rounded-xl transform group-hover:scale-105 transition-all duration-500 shadow-lg"
                  style={{
                    transform: 'perspective(1000px) rotateX(-3deg) rotateY(3deg)',
                    boxShadow: '0 15px 30px rgba(145, 70, 255, 0.3)',
                  }}
                />
                <div
                  className="relative bg-[#09092a]/90 backdrop-blur-sm rounded-xl p-4 border border-[#9146FF]/30 hover:border-[#9146FF]/60 transition-all duration-500 cursor-pointer"
                  style={{
                    transform: 'perspective(1000px) rotateX(-3deg) rotateY(3deg)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 p-1 bg-gradient-to-br from-[#9146FF] to-[#6441A4] rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlSpace="preserve"
                        viewBox="0 0 2400 2800"
                        className="w-6 h-6"
                      >
                        <path fill="#fff" d="m2200 1300-400 400h-400l-350 350v-350H600V200h1600z" />
                        <g fill="#9146ff">
                          <path d="M500 0 0 500v1800h600v500l500-500h400l900-900V0H500zm1700 1300-400 400h-400l-350 350v-350H600V200h1600v1100z" />
                          <path d="M1700 550h200v600h-200zm-550 0h200v600h-200z" />
                        </g>
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-sm">Twitch</h3>
                    <p className="text-[#f3eafd] text-xs">leadunioficial</p>
                  </div>
                </div>
              </a>

              {/* Tarjeta GitHub */}
              <a
                href="https://github.com/leaduni"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#f6f8fa] to-[#e1e4e8] rounded-xl transform group-hover:scale-105 transition-all duration-500 shadow-lg"
                  style={{
                    transform: 'perspective(1000px) rotateX(3deg) rotateY(-3deg)',
                    boxShadow: '0 15px 30px rgba(246, 248, 250, 0.2)',
                  }}
                />
                <div
                  className="relative bg-[#09092a]/90 backdrop-blur-sm rounded-xl p-4 border border-[#f6f8fa]/30 hover:border-[#f6f8fa]/60 transition-all duration-500 cursor-pointer"
                  style={{
                    transform: 'perspective(1000px) rotateX(3deg) rotateY(-3deg)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-10 h-10 p-1 bg-gradient-to-br from-[#f6f8fa] to-[#e1e4e8] rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 mb-2">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 1024 1024"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"
                          transform="scale(64)"
                          fill="#24292e"
                        />
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-sm">GitHub</h3>
                    <p className="text-[#f3eafd] text-xs">leaduni</p>
                  </div>
                </div>
              </a>

              {/* Tarjeta Kick */}
              <a
                href="https://kick.com/lead-uni"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
              >
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#53FC18] to-[#00D100] rounded-xl transform group-hover:scale-105 transition-all duration-500 shadow-lg"
                  style={{
                    transform: 'perspective(1000px) rotateX(-3deg) rotateY(3deg)',
                    boxShadow: '0 15px 30px rgba(83, 252, 24, 0.3)',
                  }}
                />
                <div
                  className="relative bg-[#09092a]/90 backdrop-blur-sm rounded-xl p-4 border border-[#53FC18]/30 hover:border-[#53FC18]/60 transition-all duration-500 cursor-pointer"
                  style={{
                    transform: 'perspective(1000px) rotateX(-3deg) rotateY(3deg)',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="flex flex-col items-center text-center h-full justify-between">
                    <div className="w-10 h-10 p-1 bg-gradient-to-br from-[#53FC18] to-[#00D100] rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 mb-2">
                      <svg
                        width="24"
                        height="8"
                        viewBox="0 0 933 300"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-auto"
                      >
                        <g clipPath="url(#kick_dark__clip0_9790_492437)">
                          <g clipPath="url(#kick_dark__clip1_9790_492437)">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M0 0H100V66.6667H133.333V33.3333H166.667V0H266.667V100H233.333V133.333H200V166.667H233.333V200H266.667V300H166.667V266.667H133.333V233.333H100V300H0V0ZM666.667 0H766.667V66.6667H800V33.3333H833.333V0H933.333V100H900V133.333H866.667V166.667H900V200H933.333V300H833.333V266.667H800V233.333H766.667V300H666.667V0ZM300 0H400V300H300V0ZM533.333 0H466.667V33.3333H433.333V266.667H466.667V300H533.333H633.333V200H533.333V100H633.333V0H533.333Z"
                              fill="#FFF"
                            />
                          </g>
                        </g>
                        <defs>
                          <clipPath id="kick_dark__clip0_9790_492437">
                            <rect width="933" height="300" fill="white" />
                          </clipPath>
                          <clipPath id="kick_dark__clip1_9790_492437">
                            <rect width="933.333" height="300" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <h3 className="text-white font-bold text-sm">Kick</h3>
                    <p className="text-[#f3eafd] text-xs">lead-uni</p>
                  </div>
                </div>
              </a>
            </div>

            {/* Footer con efecto 3D */}
            <div className="text-center">
              <div
                className="inline-block bg-gradient-to-r from-[#09092a]/80 to-[#36042f]/60 backdrop-blur-sm rounded-xl px-6 py-3 border border-[#d93340]/30"
                style={{
                  transform: 'perspective(1000px) rotateX(2deg)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                }}
              >
                <p className="text-[#f3eafd] text-xs font-medium">
                  &copy; {new Date().getFullYear()} LEAD | UNI 💜
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;
