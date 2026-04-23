'use client';

import { useState } from 'react';
import { comunidadApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const TIPOS_RECETA = ['Snacks y premios', 'Comidas completas', 'Recetas Refrescantes', 'Especiales', 'Masticables', 'Funcionales'];
const TIPOS_MASCOTA = ['Perros', 'Gatos', 'Roedores', 'Aves', 'Otra tipo'];

export default function NuevaRecetaPage() {
  const [nombre, setNombre] = useState('');
  const [alias, setAlias] = useState('');
  const [tipoReceta, setTipoReceta] = useState(TIPOS_RECETA[0]);
  const [tipoMascota, setTipoMascota] = useState(TIPOS_MASCOTA[0]);
  const [ingredientes, setIngredientes] = useState('');
  const [preparacion, setPreparacion] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, userId } = useAuth();
  const router = useRouter();

  const formIsValid = nombre.trim() && ingredientes.trim() && preparacion.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formIsValid || !userId) return;
    setLoading(true);
    try {
      await comunidadApi.crear({
        titulo: nombre,
        contenido: preparacion,
        tipo: 'recomendacion',
        alias: alias || user?.usuario || 'Anónimo',
        tipoReceta,
        tipoMascota,
        ingredientes,
        preparacion,
        id_autor: userId,
      });
      toast.success('¡Receta publicada con éxito!');
      router.push('/recetas');
    } catch {
      toast.error('Error al publicar la receta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container" style={{ maxWidth: 600 }}>
        <h1 className="page-title">Nueva Receta</h1>
        <p className="page-subtitle">Comparte una receta deliciosa para mascotas 🦴</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre de la receta:</label>
            <input type="text" className="form-input" placeholder="Ej: Galletas de Hígado" value={nombre} onChange={e => setNombre(e.target.value)} id="receta-nombre" />
          </div>
          <div className="form-group">
            <label className="form-label">Alias (Opcional):</label>
            <input type="text" className="form-input" placeholder="Ej: ChefCanino" value={alias} onChange={e => setAlias(e.target.value)} id="receta-alias" />
          </div>
          <div className="form-group">
            <label className="form-label">Tipo de receta:</label>
            <select className="form-select" value={tipoReceta} onChange={e => setTipoReceta(e.target.value)} id="receta-tipo">
              {TIPOS_RECETA.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Tipo de mascota:</label>
            <select className="form-select" value={tipoMascota} onChange={e => setTipoMascota(e.target.value)} id="receta-mascota">
              {TIPOS_MASCOTA.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Ingredientes:</label>
            <textarea className="form-textarea" placeholder="Ingresa los ingredientes..." value={ingredientes} onChange={e => setIngredientes(e.target.value)} id="receta-ingredientes" />
          </div>
          <div className="form-group">
            <label className="form-label">Descripción de la preparación:</label>
            <textarea className="form-textarea" placeholder="Describe la preparación..." value={preparacion} onChange={e => setPreparacion(e.target.value)} style={{ minHeight: 160 }} id="receta-preparacion" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', marginTop: 24 }}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={!formIsValid || loading} id="receta-submit">
              {loading ? 'Publicando...' : 'Publicar →'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => router.back()}>Regresar</button>
          </div>
        </form>
      </div>
    </>
  );
}
