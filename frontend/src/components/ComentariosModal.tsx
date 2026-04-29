'use client';

import { useState } from 'react';
import { Comentario } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

interface ComentariosModalProps {
  comentarios: Comentario[];
  onClose: () => void;
  onSubmit: (comentario: Partial<Comentario>) => Promise<void>;
  titulo?: string;
}

export default function ComentariosModal({ comentarios, onClose, onSubmit, titulo }: ComentariosModalProps) {
  const [texto, setTexto] = useState('');
  const [sending, setSending] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!texto.trim() || !user) return;
    setSending(true);
    try {
      await onSubmit({
        id_autor: user.uid,
        autorAlias: user.usuario || 'Anónimo',
        texto: texto.trim(),
      });
      setTexto('');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">💬 {titulo || 'Comentarios'}</h3>

        {comentarios.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '20px 0' }}>
            Aún no hay comentarios. ¡Sé el primero!
          </p>
        ) : (
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {comentarios.map((c, i) => (
              <div key={c._id || i} className="comment-item">
                <div className="comment-author">{c.autorAlias || 'Anónimo'}</div>
                <div className="comment-text">{c.texto}</div>
                {c.fecha && (
                  <div className="comment-date">
                    {new Date(c.fecha).toLocaleDateString('es-CO')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="comment-input-row">
          <input
            type="text"
            className="form-input"
            placeholder="Escribe un comentario..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            id="comment-input"
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSubmit}
            disabled={sending || !texto.trim()}
            id="comment-submit"
          >
            {sending ? '...' : 'Enviar'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}
