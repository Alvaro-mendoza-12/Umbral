# Procedencia: Kiro y Codex

Actualización 11-11-2026: el propietario aprobó The Illuminated Threshold. Codex implementó además la portada compacta, divulgación progresiva, paquete PE/CSE y registro internacional, estados sin guías y corrección del entorno de CI. [Informe de esta revisión](product-review/REPORT.md). Estos cambios no se atribuyen a Kiro; sus ocho artefactos originales permanecen intactos.

Revisión 10-11-2026. Este documento describe trabajo observable; no reemplaza sesiones faltantes con archivos inventados.

## Base original

El remoto contenía [`813c87a`](https://github.com/Alvaro-mendoza-12/Umbral/commit/813c87ab57084010a8cff0e431344ad6193bd786), «feat: Initial commit - UMBRAL MVP». Kiro publicó desde la copia hermana `Umbral-repo`; `umbral` aún heredaba el Git padre. Codex recuperó ese historial en `umbral/.git` y continuó en `codex/audit-kiroween`, sin reescribir aquel commit ni cambiar CombiRumbo.

La base contiene React/TypeScript/Vite, siete vistas, guía, checklist, ES/EN, recursos, PWA, iconos, scripts, tests y reportes. Se observó Kiro con Claude Sonnet 4.5 corrigiendo configuración, ejecutando Vitest/Playwright y generando capturas. El propietario confirmó implementación/publicación de Kiro. Sus reportes se conservan atribuidos, sin tomarlos como pruebas independientes.

## Artefactos auténticos

Se conservan sin cambios de contenido respecto al snapshot original:

- `.kiro/specs/umbral/requirements.md`
- `.kiro/specs/umbral/design.md`
- `.kiro/specs/umbral/tasks.md`
- `.kiro/steering/product.md`
- `.kiro/steering/architecture.md`
- `.kiro/steering/quality.md`
- `.kiro/steering/security.md`
- `.kiro/steering/ux.md`

[Comprobación de hashes](results/kiro-artifacts.json). La `.kiro` padre contiene especificaciones de transporte y no se copió. La existencia de documentos no prueba cada función de Kiro; no se rellenaron retrospectivamente casillas de tareas.

**Agent Hooks:** no se encontraron archivos ni evidencia de uso. No se reivindican. React hooks son código de aplicación, no Agent Hooks. Tampoco se reivindican MCP, Crew o pruebas de propiedades sin evidencia.

## Auditoría Codex

Antes de corregir, Codex guardó ZIP/manifest del trabajo y bundle del historial. Reprodujo seis fallos E2E móviles y revisó código, contenido, accesibilidad y PWA. Corrigió idioma, rutas inválidas, estado local incompatible, menú/foco y contraste; revisó CSE e impresión sin reconstruir la app.

Añadió regresiones y axe, actualizó dependencias afectadas y preparó Vercel/rutas/cabeceras, instalación limpia, CI y publicación. Los commits posteriores a 813c87a identifican esta auditoría. No se atribuyen a Kiro estas correcciones ni investigaciones/maquetas previas de Codex.

No se reconstruyó un historial granular inexistente ni se alteraron fechas/autores originales. Git acredita commits; el uso sustancial debe explicarse con el desarrollo y material real disponible. No se publican tokens, conversaciones personales completas o archivos de otros proyectos.
