# 🐾 Patitas Urbanas — Registro de Errores y Soluciones

Este archivo documenta los errores encontrados durante el desarrollo y sus soluciones, sirve como repositorio de troubleshooting para hacer más eficiente el trabajo.

---

## Errores Registrados

### ERROR-001: PowerShell Execution Policy bloquea npm
- **Fecha:** 2026-03-11
- **Contexto:** Al ejecutar `npm run build` en PowerShell
- **Error:** `No se puede cargar el archivo npm.ps1 porque la ejecución de scripts está deshabilitada en este sistema`
- **Causa:** La política de ejecución de PowerShell está por defecto en `Restricted`
- **Solución:** Usar `cmd /c "npm run build"` en lugar de ejecutar directamente en PowerShell. Alternativa permanente: ejecutar `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` en PowerShell como administrador.

### ERROR-003: mongoose.connection.db es undefined en Mongoose 9
- **Fecha:** 2026-03-11
- **Contexto:** Al ejecutar `test-db.ts` — la conexión era exitosa pero el acceso a `mongoose.connection.db` retornaba `undefined`
- **Error:** `Cannot read properties of undefined (reading 'db')`
- **Causa:** En Mongoose 9.x, `connection.db` no está disponible inmediatamente después de `connect()`. Es un cambio de API vs versiones anteriores.
- **Solución:** Usar `conn.connection.getClient().db()` en lugar de `mongoose.connection.db`. El `getClient()` devuelve el MongoClient nativo y `.db()` obtiene la referencia correcta.

### ERROR-002: NestJS CLI no reconocido
- **Fecha:** 2026-03-11
- **Contexto:** Al ejecutar `npm run build` sin haber instalado dependencias
- **Error:** `"nest" no se reconoce como un comando interno o externo`
- **Causa:** Las dependencias de desarrollo (`node_modules`) no estaban instaladas
- **Solución:** Ejecutar `npm install` primero para instalar todas las dependencias. Para usar el CLI sin instalación global: `npx nest build`.
