'use client';

import { useState } from 'react';
import { comunidadApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const CATEGORIAS = ['Alimentación', 'Salud', 'Comportamiento', 'Higiene', 'Curiosidades'];

export default function NuevoConsejoPage() {
  const [titulo, setTitulo] = useState('');
  const [alias, setAlias] = useState('');
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);
  const [descripcion, setDescripcion] = useState('');
  const [tipoMascota, setTipoMascota] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, userId } = useAuth();
  const router = useRouter();

  const formIsValid = titulo.trim() && descripcion.trim() && tipoMascota.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formIsValid || !userId) return;

    setLoading(true);
    try {
      await comunidadApi.crear({
        titulo,
        contenido: descripcion,
        tipo: 'informativo',
        alias: alias || user?.usuario || 'Anónimo',
        categoria,
        tipoMascota,
        id_autor: userId,
      });
      toast.success('¡Consejo publicado con éxito!');
      router.push('/consejos');
    } catch {
      toast.error('Error al publicar el consejo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container" style={{ maxWidth: 600 }}>
        <h1 className="page-title">Nuevo Consejo</h1>
        <p className="page-subtitle">Comparte un consejo útil con la comunidad 🐾</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Título del consejo:</label>
            <input type="text" className="form-input" placeholder="Título aquí:" value={titulo} onChange={e => setTitulo(e.target.value)} id="consejo-titulo" />
          </div>
          <div className="form-group">
            <label className="form-label">Alias:</label>
            <input type="text" className="form-input" placeholder="Nombre aquí (opcional):" value={alias} onChange={e => setAlias(e.target.value)} id="consejo-alias" />
          </div>
          <div className="form-group">
            <label className="form-label">Categoría:</label>
            <select className="form-select" value={categoria} onChange={e => setCategoria(e.target.value)} id="consejo-categoria">
              {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Descripción:</label>
            <textarea className="form-textarea" placeholder="Escribe tu descripción:" value={descripcion} onChange={e => setDescripcion(e.target.value)} id="consejo-descripcion" />
          </div>
          <div className="form-group">
            <label className="form-label">Tipo de mascota:</label>
            <input type="text" className="form-input" placeholder="Ej: Perro, Gato, etc..." value={tipoMascota} onChange={e => setTipoMascota(e.target.value)} id="consejo-tipo-mascota" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', marginTop: 24 }}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={!formIsValid || loading} id="consejo-submit">
              {loading ? 'Publicando...' : 'Publicar →'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => router.back()}>
              Regresar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
