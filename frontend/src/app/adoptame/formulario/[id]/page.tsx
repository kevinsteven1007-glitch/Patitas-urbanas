'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mascotasApi, solicitudAdopcionApi, Mascota } from '@/lib/api';
import Navbar from '@/components/Navbar';

export default function FormularioAdopcionPage() {
  const router = useRouter();
  const params = useParams();
  const idMascota = params.id as string;

  const [mascota, setMascota] = useState<Mascota | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    correo: '',
    telefono: '',
    direccion: '',
    vivienda: 'casa',
    tieneMascotas: false,
    terminos: false,
  });

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const data = await mascotasApi.obtener(idMascota);
        setMascota(data);
      } catch (err) {
        console.error("Mascota no encontrada");
      }
    };
    if (idMascota) {
      fetchMascota();
    }
  }, [idMascota]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terminos) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const solicitudData = {
        id_mascota: idMascota,
        id_solicitante: 'user_mock_123', // Hardcoded mock user ID
        id_dueno: mascota?.id_usuario || 'admin_123',
        estado: 'pendiente',
        motivo: `Solicitud de adopción enviada por: ${formData.nombreCompleto}\nCorreo: ${formData.correo}\nTeléfono: ${formData.telefono}\nDirección: ${formData.direccion}`,
        vivienda: formData.vivienda,
        tiene_mascotas: formData.tieneMascotas,
      };

      await solicitudAdopcionApi.crear(solicitudData);
      setSuccess(true);
      setTimeout(() => {
        router.push('/home');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Error al enviar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <Navbar />
        <div className="page-container flex-col items-center justify-center" style={{ minHeight: '80vh' }}>
          <div className="empty-state-emoji" style={{ fontSize: '5rem' }}>🐰</div>
          <h2 className="page-title mt-4">¡En proceso de validación!</h2>
          <p className="page-subtitle">
            Estamos evaluando la solicitud, te contactaremos en breve para darte una respuesta.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page-container" style={{ maxWidth: '600px' }}>
        <h1 className="page-title">Formulario de adopción</h1>
        {mascota && (
          <p className="page-subtitle">
            Estás a punto de solicitar adoptar a <strong>{mascota.nombre}</strong>.
          </p>
        )}

        <div className="card">
          {error && <div className="auth-error">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Nombre y Apellido</label>
              <input
                type="text"
                name="nombreCompleto"
                className="form-input"
                value={formData.nombreCompleto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                name="correo"
                className="form-input"
                value={formData.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Teléfono celular</label>
              <input
                type="text"
                name="telefono"
                className="form-input"
                value={formData.telefono}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Dirección de residencia</label>
              <input
                type="text"
                name="direccion"
                className="form-input"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Tipo de vivienda</label>
              <select name="vivienda" className="form-select" value={formData.vivienda} onChange={handleChange}>
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center' }}>
              <input
                type="checkbox"
                name="tieneMascotas"
                id="tieneMascotas"
                checked={formData.tieneMascotas}
                onChange={handleChange}
                style={{ width: 'auto', marginRight: '8px' }}
              />
              <label className="form-label" htmlFor="tieneMascotas" style={{ margin: 0 }}>
                ¿Tienes otras mascotas?
              </label>
            </div>

            <div className="form-group" style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: '20px' }}>
              <input
                type="checkbox"
                name="terminos"
                id="terminos"
                checked={formData.terminos}
                onChange={handleChange}
                style={{ width: 'auto', marginRight: '8px', marginTop: '4px' }}
              />
              <label className="form-label" htmlFor="terminos" style={{ margin: 0, fontSize: '0.8rem', lineHeight: '1.4' }}>
                Al marcar esta casilla, acepto los términos y condiciones del proceso de adopción, así como la política de privacidad de los datos suministrados.
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-full mt-6" disabled={loading || !mascota}>
              {loading ? 'Enviando...' : 'Enviar Solicitud'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
