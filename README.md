# UMBRAL

**Entiende el trámite. Prepárate con confianza.**

Esta rama contiene el experimento **The Illuminated Threshold** para Costume Contest. [Comparación y evaluación](audit/costume-contest/REPORT.md) · [Galería local antes/después](audit/costume-contest/compare.html). `main` y la aplicación de producción conservan la versión publicada.

Guía para preparar una primera solicitud de Clasificación Socioeconómica (CSE), con contenido del distrito de Chiclayo, Perú. Conserva la implementación de Kiro: siete vistas, guía de cinco pasos, once casillas de preparación, recursos, preguntas frecuentes, español/inglés y lectura sin conexión tras la primera carga.

UMBRAL no calcula ni solicita la CSE, consulta padrones o concede beneficios. No sustituye a la ULE ni pide DNI, ingresos, domicilio o documentos. Las casillas registran preparación en el dispositivo, no requisitos obligatorios ni elegibilidad. El hosting puede registrar metadatos técnicos; no se promete anonimato absoluto.

- [Repositorio](https://github.com/Alvaro-mendoza-12/Umbral)
- [Aplicación pública](https://umbral-seven-khaki.vercel.app)
- [Auditoría y resultados](audit/REPORT.md)
- [Procedencia Kiro/Codex](audit/ATTRIBUTION.md)
- [Preparación Devpost y pendientes](audit/KIROWEEN.md)

## Ejecutar

Node.js **26.x** recomendado y usado en la auditoría; también se admite 24.15.0+ dentro de 24.x. Git tiene raíz independiente en `D:\CombiRumbo-review\umbral`; ejecutar aquí, no desde CombiRumbo.

```sh
npm ci
npm run dev
```

Abrir la URL local de Vite. No exponer el servidor de desarrollo a la red para servir producción. No se necesitan claves ni variables de entorno.

## Verificar y compilar

```sh
npm run lint
npm run test -- --run
npm run build
npx playwright install chromium
npm run test:e2e
```

`test:e2e` compila y prueba producción en un servidor aislado `127.0.0.1:5186`. Incluye navegación, idioma, almacenamiento, popup imprimible, offline y axe. Viewports:390×844,768×1024,1440×900; reflow adicional a 320 px. Son emulaciones, no teléfonos físicos.

```sh
npm run preview
```

Desarrollo no es prueba del Service Worker. Offline requiere una primera carga completa con red; los enlaces oficiales externos necesitan conexión. La fecha de consulta no garantiza vigencia futura ni atención local.

## Estructura y mantenimiento

`.kiro/` conserva Specs/Steering auténticos; `src/` tiene React, traducciones y fuentes; `public/` recursos; `tests/` Vitest/Playwright; `audit/` resultados/capturas; `vercel.json` build estático, rutas SPA y cabeceras. `.github/workflows/quality.yml` automatiza comprobaciones.

Se excluyen dependencias, `dist`, secretos, `.env` y metadatos `.vercel`. El lockfile permite instalación reproducible. Licencia [MIT](LICENSE).

Fuentes específicas, fechas y certeza están en Recursos y [`sources.ts`](src/data/sources.ts). La guía diferencia requisitos, recomendaciones y excepciones: CPP, recibo eléctrico condicionado, asistencia S100/constancia y plazos 25/40 días hábiles. La sede local procede de un directorio publicado, sin confirmación por llamada/visita.

Los archivos `INFORME_FINAL.md`, `QA-REPORT.md`, `QA-SUMMARY.md` y `RESUMEN_EJECUTIVO.md` son entregables históricos de Kiro. Sus afirmaciones no son la conclusión de la auditoría actual: consultar [audit/REPORT.md](audit/REPORT.md).

No se hicieron entrevistas ni se demuestra ahorro de visitas, afiliación o conformidad WCAG completa. La publicación técnica no certifica elegibilidad de Kiroween; categoría, video y envío siguen el documento de entrega.
