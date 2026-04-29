const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://patitas-backend-566952581183.us-central1.run.app/api';

// ──────────────────────────────────────────
//  Tipos
// ──────────────────────────────────────────

export interface Comentario {
  _id?: string;
  id_autor: string;
  autorAlias: string;
  texto: string;
  fecha?: string;
}

export interface Publicacion {
  _id: string;
  titulo: string;
  contenido: string;
  tipo: string;
  alias: string;
  categoria: string;
  tipoMascota: string;
  tipoReceta: string;
  ingredientes: string;
  preparacion: string;
  id_autor: string;
  likes: number;
  likedBy: string[];
  comentarios: Comentario[];
  activo: boolean;
  createdAt?: string;
}

export interface GuarderiaComentario {
  _id?: string;
  autorId: string;
  autorAlias: string;
  calificacion: number;
  titulo: string;
  texto: string;
  fechaCreacion?: string;
}

export interface Guarderia {
  _id: string;
  nombre: string;
  ubicacion: string;
  direccion: string;
  servicio: string;
  calificacion: string;
  tratoMascotas: string;
  comentarios: string;
  autorId: string;
  likeCount: number;
  likedBy: string[];
  commentCount: number;
  comentariosReview: GuarderiaComentario[];
  activo: boolean;
  createdAt?: string;
}

export interface Usuario {
  _id?: string;
  uid: string;
  usuario: string;
  email: string;
  fechaRegistro?: string;
  activo?: boolean;
}

// ──────────────────────────────────────────
//  Helper fetch
// ──────────────────────────────────────────

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.text().catch(() => res.statusText);
    throw new Error(err || `Error ${res.status}`);
  }
  return res.json();
}

// ──────────────────────────────────────────
//  Usuarios
// ──────────────────────────────────────────

export const usuariosApi = {
  crear: (data: Partial<Usuario>) =>
    apiFetch<Usuario>('/usuarios', { method: 'POST', body: JSON.stringify(data) }),

  login: (email: string) =>
    apiFetch<Usuario>('/usuarios/login', { method: 'POST', body: JSON.stringify({ email }) }),

  obtener: (uid: string) =>
    apiFetch<Usuario | null>(`/usuarios/${uid}`),
};

// ──────────────────────────────────────────
//  Comunidad (Consejos + Recetas)
// ──────────────────────────────────────────

export const comunidadApi = {
  crear: (data: Partial<Publicacion>) =>
    apiFetch<Publicacion>('/comunidad', { method: 'POST', body: JSON.stringify(data) }),

  listar: (tipo?: string, limit?: number) => {
    const params = new URLSearchParams();
    if (tipo) params.set('tipo', tipo);
    if (limit) params.set('limit', String(limit));
    const qs = params.toString();
    return apiFetch<Publicacion[]>(`/comunidad${qs ? `?${qs}` : ''}`);
  },

  listarPorAutor: (autorId: string) =>
    apiFetch<Publicacion[]>(`/comunidad/autor/${autorId}`),

  obtener: (id: string) =>
    apiFetch<Publicacion>(`/comunidad/${id}`),

  actualizar: (id: string, data: Partial<Publicacion>) =>
    apiFetch<Publicacion>(`/comunidad/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  toggleLike: (id: string, userId: string) =>
    apiFetch<Publicacion>(`/comunidad/${id}/like`, {
      method: 'PUT',
      body: JSON.stringify({ userId }),
    }),

  agregarComentario: (id: string, comentario: Partial<Comentario>) =>
    apiFetch<Publicacion>(`/comunidad/${id}/comentarios`, {
      method: 'POST',
      body: JSON.stringify(comentario),
    }),

  eliminar: (id: string) =>
    apiFetch<Publicacion>(`/comunidad/${id}`, { method: 'DELETE' }),
};

// ──────────────────────────────────────────
//  Guarderías
// ──────────────────────────────────────────

export const guarderiasApi = {
  crear: (data: Partial<Guarderia>) =>
    apiFetch<Guarderia>('/guarderias', { method: 'POST', body: JSON.stringify(data) }),

  listar: () =>
    apiFetch<Guarderia[]>('/guarderias'),

  listarPorAutor: (autorId: string) =>
    apiFetch<Guarderia[]>(`/guarderias/autor/${autorId}`),

  obtener: (id: string) =>
    apiFetch<Guarderia>(`/guarderias/${id}`),

  actualizar: (id: string, data: Partial<Guarderia>) =>
    apiFetch<Guarderia>(`/guarderias/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  toggleLike: (id: string, userId: string) =>
    apiFetch<Guarderia>(`/guarderias/${id}/like`, {
      method: 'PUT',
      body: JSON.stringify({ userId }),
    }),

  eliminar: (id: string) =>
    apiFetch<Guarderia>(`/guarderias/${id}`, { method: 'DELETE' }),

  obtenerComentarios: (id: string) =>
    apiFetch<GuarderiaComentario[]>(`/guarderias/${id}/comentarios`),

  agregarComentario: (id: string, comentario: Partial<GuarderiaComentario>) =>
    apiFetch<Guarderia>(`/guarderias/${id}/comentarios`, {
      method: 'POST',
      body: JSON.stringify(comentario),
    }),
};

// ──────────────────────────────────────────
//  Mascotas (Adopción y Perdidas)
// ──────────────────────────────────────────

export interface Mascota {
  _id?: string;
  nombre: string;
  especie: string;
  raza: string;
  edad_aproximada?: number;
  genero?: string;
  descripcion?: string;
  foto_url?: string;
  ubicacion: string;
  estado?: string;
  id_usuario?: string;
  vacunas?: string[];
  esterilizado?: boolean;
  fecha_registro?: string;
}

export const mascotasApi = {
  crear: (data: Partial<Mascota>) =>
    apiFetch<Mascota>('/mascotas', { method: 'POST', body: JSON.stringify(data) }),

  listar: (params?: { ubicacion?: string; estado?: string }) => {
    const qs = new URLSearchParams();
    if (params?.ubicacion) qs.set('ubicacion', params.ubicacion);
    if (params?.estado) qs.set('estado', params.estado);
    const queryString = qs.toString();
    return apiFetch<Mascota[]>(`/mascotas${queryString ? `?${queryString}` : ''}`);
  },

  obtener: (id: string) =>
    apiFetch<Mascota>(`/mascotas/${id}`),
};

// ──────────────────────────────────────────
//  Solicitud de Adopción
// ──────────────────────────────────────────

export interface SolicitudAdopcion {
  _id?: string;
  id_mascota: string;
  id_solicitante: string;
  id_dueno: string;
  estado?: string;
  motivo?: string;
  vivienda?: string;
  tiene_mascotas?: boolean;
}

export const solicitudAdopcionApi = {
  crear: (data: Partial<SolicitudAdopcion>) =>
    apiFetch<SolicitudAdopcion>('/solicitud-adopcion', { method: 'POST', body: JSON.stringify(data) }),
};

// ──────────────────────────────────────────
//  Upload de Imágenes (Google Cloud Storage)
// ──────────────────────────────────────────

export const uploadApi = {
  subirImagen: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/upload/imagen`, {
      method: 'POST',
      body: formData,
      // NO incluir Content-Type header — el browser agrega el boundary automáticamente
    });
    if (!res.ok) {
      const err = await res.text().catch(() => res.statusText);
      throw new Error(err || `Error ${res.status}`);
    }
    return res.json();
  },
};

