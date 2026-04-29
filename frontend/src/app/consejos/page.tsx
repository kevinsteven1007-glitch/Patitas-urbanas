'use client';

import { useEffect, useState } from 'react';
import { comunidadApi, Publicacion } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import ComentariosModal from '@/components/ComentariosModal';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ConsejosPage() {
  const [consejos, setConsejos] = useState<Publicacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [comentariosTarget, setComentariosTarget] = useState<Publicacion | null>(null);
  const { user, userId, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) { router.push('/login'); return; }
    if (user) loadConsejos();
  }, [user, isLoading, router]);

  const loadConsejos = async () => {
    try {
      const data = await comunidadApi.listar('informativo');
      // Also get all and filter to include all types used as "consejos"
      const all = await comunidadApi.listar();
      // From mobile app: consejos have categoria set, recetas have tipoReceta set
      const filtered = all.filter(p => p.activo !== false && p.categoria && !p.tipoReceta);
      setConsejos(filtered.length > 0 ? filtered : data.filter(p => p.activo !== false));
    } catch {
      // If filter fails, just get all
      try {
        const all = await comunidadApi.listar();
        setConsejos(all.filter(p => p.activo !== false));
      } catch { toast.error('Error al cargar consejos'); }
    }
    setLoading(false);
  };

  const handleLike = async (pub: Publicacion) => {
    if (!userId) return;
    try {
      const updated = await comunidadApi.toggleLike(pub._id, userId);
      setConsejos(prev => prev.map(c => c._id === pub._id ? updated : c));
    } catch { toast.error('Error al dar like'); }
  };

  const handleAddComment = async (comentario: Parameters<typeof comunidadApi.agregarComentario>[1]) => {
    if (!comentariosTarget) return;
    try {
      const updated = await comunidadApi.agregarComentario(comentariosTarget._id, comentario);
      setConsejos(prev => prev.map(c => c._id === comentariosTarget._id ? updated : c));
      setComentariosTarget(updated);
      toast.success('Comentario agregado');
    } catch { toast.error('Error al comentar'); }
  };

  if (isLoading || !user) return <div className="loading-container" style={{ minHeight: '100vh' }}><div className="spinner" /></div>;

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Consejos de la Comunidad</h1>
        <p className="page-subtitle">Descubre consejos útiles para tus mascotas 🐾</p>

        {loading ? (
          <div className="loading-container"><div className="spinner" /></div>
        ) : consejos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-emoji">📝</div>
            <p>Aún no hay consejos publicados.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {consejos.map((consejo) => {
              const isLiked = userId ? consejo.likedBy?.includes(userId) : false;
              return (
                <div key={consejo._id} className="card">
                  <h3 className="card-title">{consejo.titulo}</h3>
                  <p className="card-subtitle">por {consejo.alias || 'Anónimo'}</p>
                  <p className="card-body">{consejo.contenido}</p>
                  <div className="card-meta">
                    {consejo.categoria && (
                      <div className="card-meta-row">
                        <span className="card-meta-label">Categoría:</span> {consejo.categoria}
                      </div>
                    )}
                    {consejo.tipoMascota && (
                      <div className="card-meta-row">
                        <span className="card-meta-label">Para:</span> {consejo.tipoMascota}
                      </div>
                    )}
                  </div>
                  <div className="card-actions">
                    <div className="card-actions-left">
                      <button className="like-btn" onClick={() => handleLike(consejo)} id={`like-${consejo._id}`}>
                        {isLiked ? '❤️' : '🤍'}
                      </button>
                      <span className="like-count">{consejo.likes || 0}</span>
                    </div>
                    <button className="comment-btn" onClick={() => setComentariosTarget(consejo)} id={`comment-${consejo._id}`}>
                      💬 {consejo.comentarios?.length || 0}
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
