# ---- Etapa 1: Build ----
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias primero (aprovechar caché de Docker)
COPY package*.json ./
RUN npm ci --only=production=false

# Copiar código fuente y compilar
COPY . .
RUN npm run build

# ---- Etapa 2: Producción ----
FROM node:20-alpine AS production

WORKDIR /app

# Copiar solo dependencias de producción
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copiar artefactos compilados desde la etapa de build
COPY --from=builder /app/dist ./dist

# Cloud Run usa la variable PORT
ENV PORT=3001
EXPOSE ${PORT}

# Ejecutar como usuario non-root por seguridad
USER node

CMD ["node", "dist/main.js"]
