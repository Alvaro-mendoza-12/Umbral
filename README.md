# UMBRAL

**Las oportunidades existen. Encontrar el camino no debería ser difícil.**

Esta rama evoluciona UMBRAL hacia un **acompañante internacional de acceso a oportunidades**, conservando **The Illuminated Threshold**. [Entrega de esta evolución](audit/opportunity-evolution/DELIVERY.md). `main` y la producción original conservan la versión publicada.

**[Abrir la nueva vista previa pública](https://umbral-review-20261111-cmxyf4wkj-alvaro-s-projects1.vercel.app)**. Es un Preview de revisión, sin publicación definitiva. La [vista previa anterior](https://umbral-review-20261111-nsail4u22-alvaro-s-projects1.vercel.app) conserva la fase previa.

**Versión de revisión:** seis categorías, 14 oportunidades concretas nuevas y el trámite CSE conservado. Perú, Estados Unidos, México, Colombia y España tienen contenido propio; CS50x tiene acceso internacional explícito. Las categorías sin registros lo explican. Hay vacantes específicas, cursos, ayudas y préstamos, con requisitos, fechas, fuente y acceso oficial. Mi Ruta conserva guardado, pasos, tareas propias, progreso, descarga e impresión; país e idioma persisten por separado.

La CSE permanece como un procedimiento de orientación dentro de apoyo familiar, con su guía conservada en `/cse`, cinco pasos, once casillas, recursos y preguntas frecuentes. Las fuentes son específicas de cada país; cambiar idioma no cambia jurisdicción. Español e inglés, almacenamiento local y lectura sin conexión tras la primera carga. No se incorporan cuentas ni APIs de IA.

Se conservan la [revisión de producto anterior](audit/product-review/REPORT.md), [comparación](audit/product-review/compare.html), [guía para cinco adultos](audit/product-review/USABILITY.md) y [resumen editable](audit/product-review/USABILITY-RESULTS.md). Estos documentos corresponden a la fase previa; sus URLs y cobertura no describen esta evolución. Las pruebas humanas siguen pendientes; no se han inventado sesiones ni resultados.

UMBRAL no calcula ni solicita la CSE, consulta padrones o concede beneficios. No sustituye a la ULE ni pide DNI, ingresos, domicilio o documentos. Las casillas registran preparación en el dispositivo, no requisitos obligatorios ni elegibilidad. El hosting puede registrar metadatos técnicos; no se promete anonimato absoluto.

- [Repositorio](https://github.com/Alvaro-mendoza-12/Umbral)
- [Producción original, sin cambios](https://umbral-seven-khaki.vercel.app)
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

`test:e2e` compila y prueba el build local en un servidor aislado `127.0.0.1:5186`. Incluye los seis recorridos de aceptación en español/inglés, filtros, Mi Ruta, persistencia, descarga, popup imprimible, CSE, idioma, offline y axe. Viewports: 360×640, 390×844, 768×1024 y 1440×900; reflow adicional a 320 px. Son emulaciones, no teléfonos físicos. Para conservar las evidencias de fases anteriores, establecer `UMBRAL_RESULTS_DIR=audit/opportunity-evolution/results` y `UMBRAL_SCREENSHOTS_DIR=audit/opportunity-evolution/screenshots` antes de ejecutar Playwright.

```sh
npm run preview
```

Desarrollo no es prueba del Service Worker. Offline requiere una primera carga completa con red; los enlaces oficiales externos necesitan conexión. La fecha de consulta no garantiza vigencia futura ni atención local.

## Estructura y mantenimiento

`.kiro/` conserva Specs/Steering auténticos. `src/features/opportunities/` separa dominio, datos, estado local y presentación; el contenido CSE sigue en `src/content/pe/cse/`. `public/` contiene recursos; `tests/`, Vitest/Playwright; `audit/`, resultados/capturas; `vercel.json`, build estático, rutas SPA y cabeceras. `.github/workflows/quality.yml` automatiza comprobaciones.

El catálogo se combina en `src/features/opportunities/data/catalog.ts`; `verified.ts` contiene las oportunidades nuevas y `peru.ts` conserva los registros previos. Los portales generales son complementarios. Las convocatorias cerradas y registros pendientes de revisión no aparecen en la búsqueda inicial. Las fechas y horas publicadas determinan el cierre; tras la próxima revisión editorial pasa a «Requiere confirmación» y se oculta la acción de solicitud. No hay actualización automática desde instituciones ni alertas de fechas.

Se excluyen dependencias, `dist`, secretos, `.env` y metadatos `.vercel`. El lockfile permite instalación reproducible. Licencia [MIT](LICENSE).

Fuentes específicas, fechas y certeza están en Recursos y [`sources.ts`](src/data/sources.ts). La guía diferencia requisitos, recomendaciones y excepciones: CPP, recibo eléctrico condicionado, asistencia S100/constancia y plazos 25/40 días hábiles. La sede local procede de un directorio publicado, sin confirmación por llamada/visita.

Los archivos `INFORME_FINAL.md`, `QA-REPORT.md`, `QA-SUMMARY.md` y `RESUMEN_EJECUTIVO.md` son entregables históricos de Kiro. Sus afirmaciones no son la conclusión de la auditoría actual: consultar [audit/REPORT.md](audit/REPORT.md).

No se hicieron entrevistas ni se demuestra ahorro de visitas, afiliación o conformidad WCAG completa. La publicación técnica no certifica elegibilidad de Kiroween; categoría, video y envío siguen el documento de entrega.
