'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegistroPage() {
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario.trim() || !email.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await register(usuario, email, password);
      router.push('/home');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">🐾 Registro</h1>
        <p className="auth-subtitle">Únete a la comunidad de Patitas Urbanas</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre de usuario</label>
            <input
              type="text"
              className="form-input"
              placeholder="Tu nombre o alias"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
              id="register-username"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-input"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              id="register-email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-input"
              placeholder="Crea una contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="register-password"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Confirmar contraseña</label>
            <input
              type="password"
              className="form-input"
              placeholder="Repite la contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="register-confirm"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading} id="register-submit">
            {loading ? 'Registrando...' : 'Crear Cuenta →'}
          </button>
        </form>

        <div className="auth-footer">
          ¿Ya tienes cuenta?{' '}
          <Link href="/login">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}
