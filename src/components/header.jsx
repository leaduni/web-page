import { Link } from 'react-router';
export function Header() {
  return (
    <header className="w-full bg-[#1e0a2e] border-b border-purple-900/40 py-4 px-6 flex items-center justify-between shadow-sm">
      <Link
        href="/"
        className="text-2xl font-extrabold text-pink-400 tracking-tight hover:text-pink-300 transition-colors"
      >
        LEAD UNI
      </Link>
      <nav className="flex gap-6">
        <Link href="/" className="text-white hover:text-pink-400 font-medium transition-colors">
          Noticias
        </Link>
      </nav>
    </header>
  );
}
