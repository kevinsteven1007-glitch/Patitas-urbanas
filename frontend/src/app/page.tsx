'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandingPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/home');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="loading-container" style={{ minHeight: '100vh' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="landing-container">
      <div className="landing-emoji">🐾</div>
      <h1 className="landing-title">Patitas Urbanas</h1>
      <p className="landing-subtitle">
        Comparte y descubre consejos, recetas y guarderías para tus mascotas en una comunidad que ama a los peludos 🐶🐱
      </p>
      <div className="landing-buttons">
        <Link href="/login" className="btn btn-primary btn-lg">
          Iniciar Sesión
        </Link>
        <Link href="/registro" className="btn btn-ghost btn-lg">
          Registrarse
        </Link>
      </div>
    </div>
  );
}
