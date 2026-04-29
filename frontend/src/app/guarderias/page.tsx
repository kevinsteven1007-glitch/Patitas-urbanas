'use client';

import { useEffect, useState } from 'react';
import { guarderiasApi, Guarderia, GuarderiaComentario } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function GuarderiasPage() {
  const [guarderias, setGuarderias] = useState<Guarderia[]>([]);
  const [loading, setLoading] = useState(true);
  const [comentariosTarget, setComentariosTarget] = useState<Guarderia | null>(null);
  const [comentarios, setComentarios] = useState<GuarderiaComentario[]>([]);
  const [comTexto, setComTexto] = useState('');
  const [comTitulo, setComTitulo] = useState('');
  const [comCalificacion, setComCalificacion] = useState(5);
  const [sending, setSending] = useState(false);
  const { user, userId, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) { router.push('/login'); return; }
    if (user) loadGuarderias();
  }, [user, isLoading, router]);

  const loadGuarderias = async () => {
    try {
      const data = await guarderiasApi.listar();
      setGuarderias(data.filter(g => g.activo !== false));
    } catch { toast.error('Error al cargar guarderías'); }
    setLoading(false);
  };

  const handleLike = async (g: Guarderia) => {
    if (!userId) return;
    try {
      const updated = await guarderiasApi.toggleLike(g._id, userId);
      setGuarderias(prev => prev.map(x => x._id === g._id ? updated : x));
    } catch { toast.error('Error al dar like'); }
  };

  const openComentarios = async (g: Guarderia) => {
    setComentariosTarget(g);
    try {
      const coms = await guarderiasApi.obtenerComentarios(g._id);
      setComentarios(coms);
    } catch {
      setComentarios(g.comentariosReview || []);
    }
  };

  const handleAddComment = async () => {
    if (!comentariosTarget || !comTexto.trim() || !userId) return;
    setSending(true);
    try {
      const updated = await guarderiasApi.agregarComentario(comentariosTarget._id, {
        autorId: userId,
        autorAlias: user?.usuario || 'Anónimo',
        calificacion: comCalificacion,
        titulo: comTitulo,
        texto: comTexto.trim(),
      });
      setGuarderias(prev => prev.map(x => x._id === comentariosTarget._id ? updated : x));
      setComentariosTarget(updated);
      setComentarios(updated.comentariosReview || []);
      setComTexto('');
      setComTitulo('');
      toast.success('Comentario agregado');
    } catch { toast.error('Error al comentar'); }
    setSending(false);
  };

  if (isLoading || !user) return <div className="loading-container" style={{ minHeight: '100vh' }}><div className="spinner" /></div>;

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Guardería Zone</h1>
        <p className="page-subtitle">Encuentra las mejores guarderías para tu mascota 🐕</p>

        {loading ? (
          <div className="loading-container"><div className="spinner" /></div>
        ) : guarderias.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-emoji">🏠</div>
            <p>Aún no hay guarderías publicadas.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {guarderias.map((g) => {
              const isLiked = userId ? g.likedBy?.includes(userId) : false;
              return (
                <div key={g._id} className="card">
                  <h3 className="card-title">{g.nombre}</h3>
                  <div className="card-meta" style={{ marginTop: 8 }}>
                    <div className="card-meta-row"><span className="card-meta-label">Ubicación o barrio:</span> {g.ubicacion}</div>
                    <div className="card-meta-row"><span className="card-meta-label">Dirección:</span> {g.direccion}</div>
                    <div className="card-meta-row"><span className="card-meta-label">Tipo de servicios:</span> {g.servicio}</div>
                    <div className="card-meta-row"><span className="card-meta-label">Tipo de calificación:</span> {g.calificacion}</div>
                    <div className="card-meta-row"><span className="card-meta-label">Trato hacia las mascotas:</span> {g.tratoMascotas}</div>
                    {g.comentarios && (
                      <div className="card-meta-row"><span className="card-meta-label">Comentarios adicionales:</span> {g.comentarios}</div>
                    )}
                  </div>
                  <div className="card-actions">
                    <div className="card-actions-left">
                      <button className="like-btn" onClick={() => handleLike(g)}>
                        {isLiked ? '❤️' : '🤍'}
                      </button>
                      <span className="like-count">{g.likeCount || 0}</span>
                      <button className="comment-btn" onClick={() => openComentarios(g)} style={{ marginLeft: 12 }}>
                        💬 {g.commentCount || 0}
                      </button>
                    </div>
                    {g.direccion && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(g.direccion)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--fondo-lilac-dark)', fontWeight: 600, fontSize: '0.85rem' }}
                      >
                        Ver en Mapa
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Guardería Comments Modal */}
      {comentariosTarget && (
        <div className="modal-overlay" onClick={() => setComentariosTarget(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">💬 Reseñas - {comentariosTarget.nombre}</h3>

            {comentarios.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
                Aún no hay reseñas. ¡Sé el primero!
              </p>
            ) : (
              <div style={{ maxHeight: 250, overflowY: 'auto' }}>
                {comentarios.map((c, i) => (
                  <div key={c._id || i} className="comment-item">
                    <div className="comment-author">
                      {c.autorAlias || 'Anónimo'} — {'⭐'.repeat(c.calificacion || 0)}
                    </div>
                    {c.titulo && <div style={{ fontWeight: 600, fontSize: '0.9rem', marginTop: 4 }}>{c.titulo}</div>}
                    <div className="comment-text">{c.texto}</div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input type="text" className="form-input" placeholder="Título de tu reseña" value={comTitulo} onChange={e => setComTitulo(e.target.value)} />
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <label className="form-label" style={{ margin: 0 }}>Calificación:</label>
                <select className="form-select" style={{ width: 'auto' }} value={comCalificacion} onChange={e => setComCalificacion(Number(e.target.value))}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ⭐</option>)}
                </select>
              </div>
              <div className="comment-input-row">
                <input type="text" className="form-input" placeholder="Escribe tu reseña..." value={comTexto} onChange={e => setComTexto(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddComment()} />
                <button className="btn btn-primary btn-sm" onClick={handleAddComment} disabled={sending || !comTexto.trim()}>
                  {sending ? '...' : 'Enviar'}
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setComentariosTarget(null)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
