'use client';

import { useState } from 'react';
import { guarderiasApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const SERVICIOS = ['Paseo de Mascotas', 'Cuidado Diurno', 'Hospedaje Nocturno', 'Entrenamiento', 'Baño y Peluquería', 'Guardería Completa'];
const CALIFICACIONES = ['Excelente', 'Buena', 'Regular', 'Mala'];
const TRATOS = ['Amoroso y atento', 'Profesional', 'Básico pero seguro', 'Necesita mejorar'];

export default function NuevaGuarderiaPage() {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [direccion, setDireccion] = useState('');
  const [servicio, setServicio] = useState(SERVICIOS[0]);
  const [calificacion, setCalificacion] = useState(CALIFICACIONES[0]);
  const [tratoMascotas, setTratoMascotas] = useState(TRATOS[0]);
  const [comentarios, setComentarios] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, userId } = useAuth();
  const router = useRouter();

  const formIsValid = nombre.trim() && ubicacion.trim() && direccion.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formIsValid || !userId) return;
    setLoading(true);
    try {
      await guarderiasApi.crear({
        nombre,
        ubicacion,
        direccion,
        servicio,
        calificacion,
        tratoMascotas,
        comentarios,
        autorId: userId,
      });
      toast.success('¡Guardería publicada con éxito!');
      router.push('/guarderias');
    } catch {
      toast.error('Error al publicar la guardería');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container" style={{ maxWidth: 600 }}>
        <h1 className="page-title">Nueva Guardería</h1>
        <p className="page-subtitle">Registra una guardería para mascotas 🐕</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre de la guardería:</label>
            <input type="text" className="form-input" placeholder="Ej: Patitas Felices" value={nombre} onChange={e => setNombre(e.target.value)} id="guarderia-nombre" />
          </div>
          <div className="form-group">
            <label className="form-label">Ubicación o barrio:</label>
            <input type="text" className="form-input" placeholder="Ej: Chapinero, Norte, etc." value={ubicacion} onChange={e => setUbicacion(e.target.value)} id="guarderia-ubicacion" />
          </div>
          <div className="form-group">
            <label className="form-label">Dirección:</label>
            <input type="text" className="form-input" placeholder="Ej: Calle 72 #10-45" value={direccion} onChange={e => setDireccion(e.target.value)} id="guarderia-direccion" />
          </div>
          <div className="form-group">
            <label className="form-label">Tipo de servicios:</label>
            <select className="form-select" value={servicio} onChange={e => setServicio(e.target.value)} id="guarderia-servicio">
              {SERVICIOS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Tipo de calificación:</label>
            <select className="form-select" value={calificacion} onChange={e => setCalificacion(e.target.value)} id="guarderia-calificacion">
              {CALIFICACIONES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Trato hacia las mascotas:</label>
            <select className="form-select" value={tratoMascotas} onChange={e => setTratoMascotas(e.target.value)} id="guarderia-trato">
              {TRATOS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Comentarios adicionales:</label>
            <textarea className="form-textarea" placeholder="Agrega algún comentario extra..." value={comentarios} onChange={e => setComentarios(e.target.value)} id="guarderia-comentarios" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', marginTop: 24 }}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={!formIsValid || loading} id="guarderia-submit">
              {loading ? 'Publicando...' : 'Publicar →'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => router.back()}>Regresar</button>
          </div>
        </form>
      </div>
    </>
  );
}
