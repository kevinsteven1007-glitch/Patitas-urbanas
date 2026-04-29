'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const links = [
    { href: '/home', label: '🏠 Inicio' },
    { href: '/consejos', label: '🐾 Consejos' },
    { href: '/recetas', label: '🦴 Recetas' },
    { href: '/guarderias', label: '🐕 Guarderías' },
    { href: '/me-perdi', label: '🔎 Me perdí' },
    { href: '/adoptame', label: '💖 Adóptame' },
    { href: '/mis-publicaciones', label: '🎨 Mis Publicaciones' },
  ];

  return (
    <nav className="navbar">
      <Link href="/home" className="navbar-logo">
        Patitas Urbanas
      </Link>
      <div className="navbar-links">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`navbar-link${pathname === link.href || pathname.startsWith(link.href + '/') ? ' active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={() => {
            logout();
            window.location.href = '/';
          }}
          className="btn btn-sm btn-secondary"
        >
          Salir
        </button>
      </div>
    </nav>
  );
}
