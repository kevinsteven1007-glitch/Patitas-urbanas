'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { mascotasApi, uploadApi } from '@/lib/api';
import Navbar from '@/components/Navbar';

export default function RegistrarMascotaPage() {
  const router = useRouter();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [raza, setRaza] = useState('');
  const [edadAproximada, setEdadAproximada] = useState('');
  const [genero, setGenero] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [vacunas, setVacunas] = useState('');
  const [esterilizado, setEsterilizado] = useState(false);

  // Image state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // UI state
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten archivos de imagen (JPG, PNG, WEBP, GIF).');
      return;
    }

    // Validar tamaño (5 MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar los 5 MB.');
      return;
    }

    setError('');
    setSelectedFile(file);

    // Crear preview
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImagePreview(ev.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!nombre.trim() || !especie || !raza.trim() || !ubicacion.trim()) {
      setError('Por favor completa los campos obligatorios: nombre, especie, raza y ubicación.');
      return;
    }

    if (!user) {
      setError('Debes iniciar sesión para registrar una mascota.');
      return;
    }

    setLoading(true);

    try {
      let fotoUrl = '';

      // 1. Subir imagen si se seleccionó una
      if (selectedFile) {
        setUploadingImage(true);
        const result = await uploadApi.subirImagen(selectedFile);
        fotoUrl = result.url;
        setUploadingImage(false);
      }

      // 2. Crear la mascota con los datos y la URL de la imagen
      const vacunasArray = vacunas
        .split(',')
        .map((v) => v.trim())
        .filter((v) => v.length > 0);

      await mascotasApi.crear({
        nombre: nombre.trim(),
        especie,
        raza: raza.trim(),
        edad_aproximada: edadAproximada ? Number(edadAproximada) : undefined,
        genero: genero || undefined,
        descripcion: descripcion.trim() || undefined,
        foto_url: fotoUrl || undefined,
        ubicacion: ubicacion.trim(),
        estado: 'disponible',
        id_usuario: user.uid,
        vacunas: vacunasArray.length > 0 ? vacunasArray : undefined,
        esterilizado,
        fecha_registro: new Date().toISOString(),
      });

      setSuccess(true);
      setTimeout(() => {
        router.push('/adoptame');
      }, 2000);
    } catch (err) {
      console.error('Error registrando mascota:', err);
      setError(err instanceof Error ? err.message : 'Error al registrar la mascota. Intenta de nuevo.');
    } finally {
      setLoading(false);
      setUploadingImage(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container" style={{ maxWidth: '640px' }}>
        <h1 className="page-title">Registrar Mascota</h1>
        <p className="page-subtitle">
          Publica una mascota disponible para adopción. ¡Ayúdala a encontrar un hogar! 🏡
        </p>

        {success ? (
          <div
            className="card"
            style={{
              textAlign: 'center',
              padding: '48px 24px',
              animation: 'fadeInUp 0.5s ease',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ marginBottom: '8px', color: 'var(--success-green)' }}>
              ¡Mascota registrada con éxito!
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>
              Redirigiendo a la página de adopción...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card" style={{ animation: 'fadeInUp 0.5s ease' }}>
            {error && <div className="auth-error">{error}</div>}

            {/* ── Imagen ── */}
            <div className="form-group">
              <label className="form-label">📸 Foto de la mascota</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '2px dashed #D5B8D5',
                  borderRadius: 'var(--radius-lg)',
                  padding: imagePreview ? '0' : '40px 20px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  background: imagePreview ? 'transparent' : '#FAF5FA',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {imagePreview ? (
                  <div style={{ position: 'relative' }}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: '100%',
                        height: '250px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-lg)',
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(231,76,60,0.9)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>📷</div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      Haz clic para seleccionar una foto
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '4px' }}>
                      JPG, PNG, WEBP o GIF — Máximo 5 MB
                    </p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>

            {/* ── Datos básicos ── */}
            <div className="form-group">
              <label className="form-label">Nombre *</label>
              <input
                className="form-input"
                type="text"
                placeholder="Ej: Luna, Max, Firulais..."
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Especie *</label>
                <select
                  className="form-select"
                  value={especie}
                  onChange={(e) => setEspecie(e.target.value)}
                  required
                >
                  <option value="">Seleccionar...</option>
                  <option value="Perro">🐶 Perro</option>
                  <option value="Gato">🐱 Gato</option>
                  <option value="Ave">🐦 Ave</option>
                  <option value="Conejo">🐰 Conejo</option>
                  <option value="Otro">🐾 Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Raza *</label>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Ej: Labrador, Siamés..."
                  value={raza}
                  onChange={(e) => setRaza(e.target.value)}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Edad aproximada (años)</label>
                <input
                  className="form-input"
                  type="number"
                  min="0"
                  max="30"
                  placeholder="Ej: 2"
                  value={edadAproximada}
                  onChange={(e) => setEdadAproximada(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Género</label>
                <select
                  className="form-select"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                >
                  <option value="">Seleccionar...</option>
                  <option value="Macho">♂️ Macho</option>
                  <option value="Hembra">♀️ Hembra</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Ubicación *</label>
              <input
                className="form-input"
                type="text"
                placeholder="Ej: Bogotá, Medellín, Cali..."
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-textarea"
                placeholder="Cuéntanos sobre la mascota: personalidad, historia, necesidades especiales..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Vacunas (separadas por coma)</label>
              <input
                className="form-input"
                type="text"
                placeholder="Ej: Rabia, Parvovirus, Moquillo..."
                value={vacunas}
                onChange={(e) => setVacunas(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text-light)',
                }}
              >
                <input
                  type="checkbox"
                  checked={esterilizado}
                  onChange={(e) => setEsterilizado(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--fondo-lilac-dark)' }}
                />
                ¿Está esterilizado/a?
              </label>
            </div>

            {/* ── Botones ── */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => router.back()}
                style={{ flex: 1, border: '2px solid #E2E8F0' }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ flex: 2 }}
              >
                {uploadingImage
                  ? '📤 Subiendo imagen...'
                  : loading
                    ? '⏳ Registrando...'
                    : '🐾 Registrar mascota'}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
