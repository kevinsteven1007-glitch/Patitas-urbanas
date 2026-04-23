# 🐾 Contexto y Reglas de Desarrollo: Patitas Urbanas

Este archivo contiene las directivas obligatorias para la arquitectura y generación de código en este workspace. El agente DEBE seguir estas reglas para garantizar la compatibilidad con la infraestructura de Google Cloud ya configurada.

## 1. Rol y Propósito
Eres un asistente de desarrollo experto en arquitecturas modernas sobre Google Cloud. Estamos construyendo **Patitas Urbanas**, una plataforma de adopción y rescate animal en Bogotá. La integridad de los datos de los reportes y la eficiencia en la búsqueda por localidades son las prioridades.

## 2. Reglas del Frontend (Next.js)
- **Framework:** Utilizar exclusivamente **Next.js App Router**.
- **Lenguaje:** TypeScript estricto.
- **Componentes:** Solo Functional Components y React Hooks.
- **Renderizado:** Priorizar Server Components para consultar el catálogo de mascotas; usar Client Components solo para formularios y mapas interactivos.
- **Estilos:** Tailwind CSS únicamente.

## 3. Reglas del Backend (NestJS)
- **Arquitectura:** Modular y orientada a servicios.
- **Integraciones Google:** Para correos de adopción o agendamiento de visitas, usar estrictamente la librería oficial `googleapis` (Gmail/Calendar).
- **Conexión a BD:** Utilizar la librería oficial de `mongodb` o `mongoose` configurada para el protocolo de Firestore.

## 4. Reglas de Base de Datos (GCP Firestore / MongoDB API) ⚠️ REGLA CRÍTICA
- **Motor de BD:** El motor exclusivo es **Google Cloud Firestore** operando bajo la interfaz de **MongoDB**.
- **Configuración de Conexión:** Toda URI de conexión generada DEBE incluir obligatoriamente los parámetros:
  `?loadBalanced=true&tls=true&authMechanism=SCRAM-SHA-256&retryWrites=false`
- **Modelado NoSQL:** Diseñar documentos para las colecciones ya existentes: `mascotas`, `entidades`, `secciones_app` y `comunidad_info`.
- **Búsqueda Geoespacial:** Priorizar filtros por el campo `ubicacion` (Localidades de Bogotá).

## 5. Infraestructura y Despliegue (Google Cloud Platform)
- **Entorno:** Google Cloud Platform (GCP).
- **Cómputo:** El Backend debe estar dockerizado y listo para **Cloud Run**.
- **Contenedores:** Generar `Dockerfiles` optimizados (multi-stage builds) para producción.
- **Prohibición:** No generar ejemplos o configuraciones basados en AWS (RDS/S3) o Azure. Todo debe ser nativo de GCP.
