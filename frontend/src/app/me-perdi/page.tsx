'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mascotasApi } from '@/lib/api';
import Navbar from '@/components/Navbar';

export default function MePerdiPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    especie: 'perro',
    ubicacion: '',
    descripcion: '',
    foto_url: '',
    contacto: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const mascotaData = {
        nombre: formData.nombre,
        especie: formData.especie,
        raza: 'No especificada',
        ubicacion: formData.ubicacion,
        descripcion: `${formData.descripcion}\n\nContacto: ${formData.contacto}`,
        foto_url: formData.foto_url || 'https://via.placeholder.com/300?text=Mascota+Perdida',
        estado: 'perdido',
        id_usuario: 'user_mock_123',
      };

      await mascotasApi.crear(mascotaData);
      setSuccess(true);
      setTimeout(() => {
        router.push('/home');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Error al reportar mascota');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <Navbar />
        <div className="page-container flex-col items-center justify-center" style={{ minHeight: '80vh' }}>
          <div className="empty-state-emoji" style={{ fontSize: '5rem' }}>🐾</div>
          <h2 className="page-title mt-4">¡Reporte Enviado!</h2>
          <p className="page-subtitle">Esperamos que tu amiguito regrese pronto a casa. Te redirigiremos al inicio.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-container" style={{ maxWidth: '600px' }}>
        <h1 className="page-title">Me perdí</h1>
        <p className="page-subtitle">Llena los datos para que podamos ayudarte a encontrar a tu mascota.</p>

        <div className="card">
          {error && <div className="auth-error">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nombre de tu mascota</label>
              <input
                type="text"
                name="nombre"
                className="form-input"
                placeholder="Ej: Firulais"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Especie</label>
              <select name="especie" className="form-select" value={formData.especie} onChange={handleChange}>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Última vez visto (Ubicación)</label>
              <input
                type="text"
                name="ubicacion"
                className="form-input"
                placeholder="Ej: Parque Central, Av. Siempre Viva"
                value={formData.ubicacion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Descripción (Collar, tamaño, marcas...)</label>
              <textarea
                name="descripcion"
                className="form-textarea"
                placeholder="Ej: Es un perrito pequeño, tiene collar rojo con una chapita..."
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tu número de contacto</label>
              <input
                type="text"
                name="contacto"
                className="form-input"
                placeholder="Ej: 555-1234-5678"
                value={formData.contacto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">URL de la foto (opcional)</label>
              <input
                type="url"
                name="foto_url"
                className="form-input"
                placeholder="https://..."
                value={formData.foto_url}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full mt-4" disabled={loading}>
              {loading ? 'Enviando...' : 'Reportar Mascota Perdida'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
