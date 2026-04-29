'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { mascotasApi, Mascota } from '@/lib/api';
import Navbar from '@/components/Navbar';

export default function AdoptamePage() {
  const router = useRouter();
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<'todos' | 'perro' | 'gato'>('todos');

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        setLoading(true);
        const data = await mascotasApi.listar({ estado: 'disponible' });
        setMascotas(data);
      } catch (error) {
        console.error("Error cargando mascotas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMascotas();
  }, []);

  const mascotasFiltradas = mascotas.filter(m => {
    if (filtro === 'todos') return true;
    return m.especie.toLowerCase() === filtro;
  });

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Adóptame</h1>
        <p className="page-subtitle">Encuentra a tu nuevo mejor amigo. ¡Ellos te están esperando!</p>

        {/* Botón para registrar mascota */}
        <div className="text-center mb-4">
          <button 
            className="btn btn-mint"
            onClick={() => router.push('/registrar-mascota')}
          >
            ➕ Publicar mascota en adopción
          </button>
        </div>

        {/* Filtros circulares simulados según Figma */}
        <div className="flex-row justify-center gap-2 mb-4" style={{ flexWrap: 'wrap' }}>
          <button 
            className={`btn ${filtro === 'todos' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFiltro('todos')}
            style={{ borderRadius: '999px' }}
          >
            🐾 Todos
          </button>
          <button 
            className={`btn ${filtro === 'perro' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFiltro('perro')}
            style={{ borderRadius: '999px' }}
          >
            🐶 Perros
          </button>
          <button 
            className={`btn ${filtro === 'gato' ? 'btn-primary' : 'btn-ghost'}`}
            onClick={() => setFiltro('gato')}
            style={{ borderRadius: '999px' }}
          >
            🐱 Gatos
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        ) : mascotasFiltradas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-emoji">🐕</div>
            <h3>No hay mascotas disponibles</h3>
            <p>Por el momento no hay mascotas de esta categoría buscando hogar.</p>
          </div>
        ) : (
          <div className="cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {mascotasFiltradas.map((mascota) => (
              <div key={mascota._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div 
                  style={{ 
                    height: '200px', 
                    backgroundImage: `url(${mascota.foto_url || 'https://via.placeholder.com/300?text=Mascota'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}
                />
                <h3 className="card-title">{mascota.nombre}</h3>
                <div className="card-subtitle" style={{ marginBottom: '8px' }}>
                  {mascota.raza} • {mascota.edad_aproximada ? `${mascota.edad_aproximada} años` : 'Edad desconocida'}
                </div>
                <p className="card-body" style={{ flex: 1, marginBottom: '16px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                  {mascota.descripcion || 'Sin descripción'}
                </p>
                
                <div className="card-meta-row" style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
                  📍 {mascota.ubicacion}
                </div>

                <button 
                  className="btn btn-primary btn-full"
                  onClick={() => router.push(`/adoptame/formulario/${mascota._id}`)}
                >
                  Adoptar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
