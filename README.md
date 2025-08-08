# 1337 Admin Starter (Next.js)

Panel admin mínimo para 1337:
- Tema oscuro
- Login sencillo por token (localStorage)
- Listado y creación de eventos vía API

## Variables de entorno (Vercel)
- NEXT_PUBLIC_API_BASE_URL = https://api.1337.app
- ADMIN_TOKEN = (elige tu clave)

> En este starter, el token se pega en la pantalla de login y se guarda en localStorage. Para producción, mueve la auth al backend.

## Scripts
- dev: desarrollo local
- build: compilación
- start: producción

## Estructura
- app/: rutas (Next.js App Router)
- lib/: utilidades (API y token)
- styles/: estilos base

