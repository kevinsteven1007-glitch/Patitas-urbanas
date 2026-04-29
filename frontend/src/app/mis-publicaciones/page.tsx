'use client';

import { useEffect, useState } from 'react';
import { comunidadApi, guarderiasApi, Publicacion, Guarderia } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

type FilterType = 'consejos' | 'recetas' | 'guarderias';

export default function MisPublicacionesPage() {
  const [misConsejos, setMisConsejos] = useState<Publicacion[]>([]);
  const [misRecetas, setMisRecetas] = useState<Publicacion[]>([]);
  const [misGuarderias, setMisGuarderias] = useState<Guarderia[]>([]);
  const [filter, setFilter] = useState<FilterType>('consejos');
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<{ tipo: string; id: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Edit modal states
  const [editTarget, setEditTarget] = useState<Publicacion | Guarderia | null>(null);
  const [editType, setEditType] = useState<'consejo' | 'receta' | 'guarderia' | null>(null);
  const [editFields, setEditFields] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const { user, userId, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) { router.push('/login'); return; }
    if (userId) loadAll();
  }, [user, userId, isLoading, router]);

  const loadAll = async () => {
    if (!userId) return;
    try {
      const allPubs = await comunidadApi.listarPorAutor(userId);
      setMisConsejos(allPubs.filter(p => p.activo !== false && p.categoria && !p.tipoReceta));
      setMisRecetas(allPubs.filter(p => p.activo !== false && p.tipoReceta));
    } catch { /* empty */ }
    try {
      const guards = await guarderiasApi.listarPorAutor(userId);
      setMisGuarderias(guards.filter(g => g.activo !== false));
    } catch { /* empty */ }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      if (deleteTarget.tipo === 'guarderia') {
        await guarderiasApi.eliminar(deleteTarget.id);
        setMisGuarderias(prev => prev.filter(g => g._id !== deleteTarget.id));
      } else {
        await comunidadApi.eliminar(deleteTarget.id);
        if (deleteTarget.tipo === 'consejo') setMisConsejos(prev => prev.filter(c => c._id !== deleteTarget.id));
        else setMisRecetas(prev => prev.filter(r => r._id !== deleteTarget.id));
      }
      toast.success('Publicación eliminada');
    } catch { toast.error('Error al eliminar'); }
    setDeleting(false);
    setDeleteTarget(null);
  };

  const openEdit = (item: Publicacion | Guarderia, type: 'consejo' | 'receta' | 'guarderia') => {
    setEditTarget(item);
    setEditType(type);
    if (type === 'consejo') {
      const p = item as Publicacion;
      setEditFields({ titulo: p.titulo, contenido: p.contenido, categoria: p.categoria, tipoMascota: p.tipoMascota, alias: p.alias });
    } else if (type === 'receta') {
      const p = item as Publicacion;
      setEditFields({ titulo: p.titulo, tipoReceta: p.tipoReceta, tipoMascota: p.tipoMascota, ingredientes: p.ingredientes, preparacion: p.preparacion, alias: p.alias });
    } else {
      const g = item as Guarderia;
      setEditFields({ nombre: g.nombre, ubicacion: g.ubicacion, direccion: g.direccion, servicio: g.servicio, calificacion: g.calificacion, tratoMascotas: g.tratoMascotas, comentarios: g.comentarios });
    }
  };

  const handleSaveEdit = async () => {
    if (!editTarget || !editType) return;
    setSaving(true);
    try {
      if (editType === 'guarderia') {
        const updated = await guarderiasApi.actualizar((editTarget as Guarderia)._id, editFields as Partial<Guarderia>);
        setMisGuarderias(prev => prev.map(g => g._id === updated._id ? updated : g));
      } else {
        const updated = await comunidadApi.actualizar((editTarget as Publicacion)._id, editFields as Partial<Publicacion>);
        if (editType === 'consejo') setMisConsejos(prev => prev.map(c => c._id === updated._id ? updated : c));
        else setMisRecetas(prev => prev.map(r => r._id === updated._id ? updated : r));
      }
      toast.success('¡Publicación actualizada!');
      setEditTarget(null);
    } catch { toast.error('Error al guardar'); }
    setSaving(false);
  };

  if (isLoading || !user) return <div className="loading-container" style={{ minHeight: '100vh' }}><div className="spinner" /></div>;

  const currentList = filter === 'consejos' ? misConsejos : filter === 'recetas' ? misRecetas : misGuarderias;

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Mis Publicaciones</h1>
        <p className="page-subtitle">Administra todo lo que has publicado 🎨</p>

        <div className="filter-bar">
          <select className="form-select" style={{ maxWidth: 280 }} value={filter} onChange={e => setFilter(e.target.value as FilterType)} id="filter-select">
            <option value="consejos">📋 Mis Consejos</option>
            <option value="recetas">🍽️ Mis Recetas</option>
            <option value="guarderias">🏠 Mis Guarderías</option>
          </select>
        </div>

        {loading ? (
          <div className="loading-container"><div className="spinner" /></div>
        ) : currentList.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-emoji">📭</div>
            <p>No tienes publicaciones en esta categoría.</p>
          </div>
        ) : (
          <div className="cards-grid">
            {filter === 'guarderias' ? (
              (misGuarderias).map(g => (
                <div key={g._id} className="card">
                  <h3 className="card-title">{g.nombre}</h3>
                  <div className="card-meta" style={{ marginTop: 4 }}>
                    <div className="card-meta-row"><span className="card-meta-label">Ubicación:</span> {g.ubicacion}</div>
                    <div className="card-meta-row"><span className="card-meta-label">Servicio:</span> {g.servicio}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                    <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => openEdit(g, 'guarderia')}>Editar</button>
                    <button className="btn btn-sm" style={{ flex: 1, background: 'var(--orange-soft)', color: 'var(--text-dark)' }} onClick={() => setDeleteTarget({ tipo: 'guarderia', id: g._id })}>Borrar</button>
                  </div>
                </div>
              ))
            ) : (
              (filter === 'consejos' ? misConsejos : misRecetas).map(pub => (
                <div key={pub._id} className="card">
                  <h3 className="card-title">{pub.titulo}</h3>
                  <p className="card-subtitle">por {pub.alias || 'Anónimo'}</p>
                  <p className="card-body" style={{ maxHeight: 80, overflow: 'hidden' }}>
                    {filter === 'consejos' ? pub.contenido : pub.ingredientes}
                  </p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                    <button className="btn btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => openEdit(pub, filter === 'consejos' ? 'consejo' : 'receta')}>Editar</button>
                    <button className="btn btn-sm" style={{ flex: 1, background: 'var(--orange-soft)', color: 'var(--text-dark)' }} onClick={() => setDeleteTarget({ tipo: filter === 'consejos' ? 'consejo' : 'receta', id: pub._id })}>Borrar</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="modal-overlay" onClick={() => !deleting && setDeleteTarget(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <h3 className="modal-title">⚠️ Confirmar eliminación</h3>
            <p style={{ marginBottom: 20, color: 'var(--text-muted)' }}>¿Estás seguro de que quieres eliminar esta publicación? Esta acción no se puede deshacer.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-danger" style={{ flex: 1 }} onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Eliminando...' : 'Borrar'}
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setDeleteTarget(null)} disabled={deleting}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editTarget && editType && (
        <div className="modal-overlay" onClick={() => !saving && setEditTarget(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <h3 className="modal-title">✏️ Editar {editType === 'consejo' ? 'Consejo' : editType === 'receta' ? 'Receta' : 'Guardería'}</h3>

            {Object.entries(editFields).map(([key, value]) => (
              <div className="form-group" key={key}>
                <label className="form-label" style={{ textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}:</label>
                {(key === 'contenido' || key === 'ingredientes' || key === 'preparacion' || key === 'comentarios') ? (
                  <textarea className="form-textarea" value={value} onChange={e => setEditFields(prev => ({ ...prev, [key]: e.target.value }))} style={{ minHeight: 80 }} />
                ) : (
                  <input type="text" className="form-input" value={value} onChange={e => setEditFields(prev => ({ ...prev, [key]: e.target.value }))} />
                )}
              </div>
            ))}

            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleSaveEdit} disabled={saving}>
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setEditTarget(null)} disabled={saving}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
