'use client';

import { useEffect, useState } from 'react';
import { comunidadApi, Publicacion } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import ComentariosModal from '@/components/ComentariosModal';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function RecetasPage() {
  const [recetas, setRecetas] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [comentariosTarget, setComentariosTarget] = useState<Publicacion | null>(null);
  const { user, userId, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) { router.push('/login'); return; }
    if (user) loadRecetas();
  }, [user, isLoading, router]);

  const loadRecetas = async () => {
    try {
      const all = await comunidadApi.listar();
      const filtered = all.filter(p => p.activo !== false && p.tipoReceta);
      setRecetas(filtered);
    } catch {
      toast.error('Error al cargar recetas');
    }
    setLoading(false);
  };

  const handleLike = async (pub: Publicacion) => {
    if (!userId) return;
    try {
      const updated = await comunidadApi.toggleLike(pub._id, userId);
      setRecetas(prev => prev.map(r => r._id === pub._id ? updated : r));
    } catch { toast.error('Error al dar like'); }
  };

  const handleAddComment = async (comentario: Parameters<typeof comunidadApi.agregarComentario>[1]) => {
    if (!comentariosTarget) return;
    try {
      const updated = await comunidadApi.agregarComentario(comentariosTarget._id, comentario);
      setRecetas(prev => prev.map(r => r._id === comentariosTarget._id ? updated : r));
      setComentariosTarget(updated);
      toast.success('Comentario agregado');
    } catch { toast.error('Error al comentar'); }
  };

  if (isLoading || !user) return <div className="loading-container" style={{ minHeight: '100vh' }}><div className="spinner" /></div>;

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Recetas de la Comunidad</h1>
        <p className="page-subtitle">Descubre deliciosas recetas para tu peludo 🦴</p>

        {loading ? (
          <div className="loading-container"><div className="spinner" /></div>
        ) : recetas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-emoji">🍽️</div>
            <p>Aún no hay recetas publicadas.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {recetas.map((receta) => {
              const isLiked = userId ? receta.likedBy?.includes(userId) : false;
              return (
                <div key={receta._id} className="card">
                  <h3 className="card-title">{receta.titulo}</h3>
                  <p className="card-subtitle">por {receta.alias || 'Anónimo'}</p>

                  {receta.ingredientes && (
                    <div style={{ marginBottom: 8 }}>
                      <span className="card-meta-label">Ingredientes:</span>
                      <p className="card-body">{receta.ingredientes}</p>
                    </div>
                  )}
                  {receta.preparacion && (
                    <div style={{ marginBottom: 8 }}>
                      <span className="card-meta-label">Descripción de la preparación:</span>
                      <p className="card-body">{receta.preparacion}</p>
                    </div>
                  )}

                  <div className="card-meta">
                    {receta.tipoReceta && (
                      <div className="card-meta-row">
                        <span className="card-meta-label">Tipo:</span> {receta.tipoReceta}
                      </div>
                    )}
                    {receta.tipoMascota && (
                      <div className="card-meta-row">
                        <span className="card-meta-label">Para:</span> {receta.tipoMascota}
                      </div>
                    )}
                  </div>

                  <div className="card-actions">
                    <div className="card-actions-left">
                      <button className="like-btn" onClick={() => handleLike(receta)}>
                        {isLiked ? '❤️' : '🤍'}
                      </button>
                      <span className="like-count">{receta.likes || 0}</span>
                    </div>
                    <button className="comment-btn" onClick={() => setComentariosTarget(receta)}>
                      💬 {receta.comentarios?.length || 0}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {comentariosTarget && (
        <ComentariosModal
          comentarios={comentariosTarget.comentarios || []}
          onClose={() => setComentariosTarget(null)}
          onSubmit={handleAddComment}
          titulo={`Comentarios - ${comentariosTarget.titulo}`}
        />
      )}
    </>
  );
}
