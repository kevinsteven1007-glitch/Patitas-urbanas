'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.push('/login');
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return <div className="loading-container" style={{ minHeight: '100vh' }}><div className="spinner" /></div>;
  }

  return (
    <>
      <Navbar />
      <div className="home-container">
        <h1 className="home-title">Patitas Urbanas</h1>

        {/* Publica tus comentarios */}
        <div className="home-section">
          <p className="home-section-label">Publica tus comentarios</p>
          <Link href="/consejos/nuevo" className="home-row" style={{ background: 'var(--pink-soft)' }}>
            <span className="home-row-emoji">🐾</span> Nuevo Consejo
          </Link>
          <Link href="/recetas/nueva" className="home-row" style={{ background: 'var(--aqua-soft)', marginTop: 10 }}>
            <span className="home-row-emoji">🦴</span> Nueva Receta
          </Link>
          <Link href="/guarderias/nueva" className="home-row" style={{ background: 'var(--yellow-soft)', marginTop: 10 }}>
            <span className="home-row-emoji">🐕</span> Nueva Guardería
          </Link>
        </div>

        {/* Mira las publicaciones */}
        <div className="home-section">
          <p className="home-section-label">Mira las publicaciones</p>
          <Link href="/consejos" className="home-row" style={{ background: 'var(--pink-soft)' }}>
            <span className="home-row-emoji">🐾</span> Consejos útiles
          </Link>
          <Link href="/recetas" className="home-row" style={{ background: 'var(--aqua-soft)', marginTop: 10 }}>
            <span className="home-row-emoji">🦴</span> Recetas para tu peludo
          </Link>
          <Link href="/guarderias" className="home-row" style={{ background: 'var(--yellow-soft)', marginTop: 10 }}>
            <span className="home-row-emoji">🐕</span> Guardería zone
          </Link>
        </div>

        {/* Personaliza */}
        <div className="home-section">
          <p className="home-section-label">Personaliza tus publicaciones</p>
          <Link href="/mis-publicaciones" className="home-row" style={{ background: 'var(--orange-soft)' }}>
            <span className="home-row-emoji">🎨</span> Edita tus publicaciones
          </Link>
        </div>
      </div>
    </>
  );
}
