'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

// ──────────────────────────────────────────
//  Configuración de cada tipo de error
// ──────────────────────────────────────────

export interface ErrorPageConfig {
  code: number;
  title: string;
  description: string;
  image: string;
  primaryButton: { label: string; action: 'home' | 'back' | 'retry' | 'custom'; href?: string };
  secondaryButton: { label: string; action: 'home' | 'back' | 'retry' | 'search' | 'custom'; href?: string };
}

export const ERROR_CONFIGS: Record<number, ErrorPageConfig> = {
  400: {
    code: 400,
    title: 'Datos inválidos',
    description:
      'Parece que olvidaste un campo obligatorio en el formulario. Por favor, revísalo y asegúrate de llenar todo para que podamos ayudarte.',
    image: '/errors/error-400.png',
    primaryButton: { label: 'Volver', action: 'back' },
    secondaryButton: { label: 'Reintentar', action: 'retry' },
  },
  404: {
    code: 404,
    title: '¡Ups! No encontramos nada',
    description:
      'Parece que esta página se ha escapado. No pudimos encontrar lo que buscabas. Intenta usar el buscador o ir al inicio.',
    image: '/errors/error-404.png',
    primaryButton: { label: 'Inicio', action: 'home' },
    secondaryButton: { label: 'Buscador', action: 'search' },
  },
  409: {
    code: 409,
    title: '¡Ya tenemos un reporte para este amiguito!',
    description:
      'Parece que ya registraste una solicitud idéntica para esta mascota. ¡No te preocupes, ya la estamos realizando!',
    image: '/errors/error-409.png',
    primaryButton: { label: 'Ver solicitud', action: 'custom', href: '/mis-publicaciones' },
    secondaryButton: { label: 'Seguir buscando', action: 'home' },
  },
  500: {
    code: 500,
    title: 'Estamos cuidando de nuestros amigos',
    description:
      'Algo salió mal en nuestro servidor. Nuestro equipo ya está trabajando para solucionarlo. Intenta de nuevo en unos momentos.',
    image: '/errors/error-500.png',
    primaryButton: { label: 'Inicio', action: 'home' },
    secondaryButton: { label: 'Reintentar', action: 'retry' },
  },
};

// ──────────────────────────────────────────
//  Componente ErrorPage
// ──────────────────────────────────────────

interface ErrorPageProps {
  code?: number;
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export default function ErrorPage({ code = 404, title, description, onRetry }: ErrorPageProps) {
  const router = useRouter();
  const config = ERROR_CONFIGS[code] ?? ERROR_CONFIGS[404];

  const displayTitle = title ?? config.title;
  const displayDesc = description ?? config.description;

  const handleAction = (action: string, href?: string) => {
    switch (action) {
      case 'home':
        router.push('/home');
        break;
      case 'back':
        router.back();
        break;
      case 'retry':
        if (onRetry) {
          onRetry();
        } else {
          window.location.reload();
        }
        break;
      case 'search':
        router.push('/home');
        break;
      case 'custom':
        if (href) router.push(href);
        break;
    }
  };

  return (
    <div className="error-page-wrapper">
      <h1 className="error-page-brand">Patitas Urbanas</h1>

      <h2 className="error-page-title">{displayTitle}</h2>

      <p className="error-page-description">{displayDesc}</p>

      <div className="error-page-image-wrapper">
        <Image
          src={config.image}
          alt={displayTitle}
          width={280}
          height={280}
          className="error-page-image"
          priority
        />
      </div>

      <div className="error-page-buttons">
        <button
          className="btn btn-primary"
          onClick={() => handleAction(config.primaryButton.action, config.primaryButton.href)}
        >
          {config.primaryButton.label}
        </button>
        <button
          className="btn btn-ghost"
          style={{ color: '#FFF', borderColor: 'rgba(255,255,255,0.3)' }}
          onClick={() => handleAction(config.secondaryButton.action, config.secondaryButton.href)}
        >
          {config.secondaryButton.label}
        </button>
      </div>
    </div>
  );
}
