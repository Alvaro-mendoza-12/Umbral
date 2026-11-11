# UMBRAL — MVP de acompañamiento de acceso a oportunidades

11 de noviembre de 2026. Rama `codex/opportunity-companion-mvp`, creada desde `codex/costume-contest` (`ade52db`). React, TypeScript y Vite conservados. La identidad visual sigue siendo **The Illuminated Threshold**.

## Entrega

- **[Vista previa pública del MVP](https://umbral-review-20261111-gchqn5i73-alvaro-s-projects1.vercel.app)**, comprobada sin autenticación.
- Código desplegado y probado: [`24d0bacc2c8c2efdd979e6934e77eddeaaa63242`](https://github.com/Alvaro-mendoza-12/Umbral/commit/24d0bacc2c8c2efdd979e6934e77eddeaaa63242). Los commits posteriores de cierre sólo incorporan documentación y evidencias.
- Producción original: sin cambios; `main` se conserva en `ac586fa1822b44ba8f2a0232c6f1fdc858219288`.
- La publicación definitiva sigue pendiente de las pruebas humanas y de una decisión posterior explícita.

## Funcionalidades disponibles

- **Inicio por objetivos:** estudiar, trabajar, formarse, emprender o buscar apoyo familiar. Navegación principal: Inicio, Descubrir y Mi Ruta.
- **Descubrir:** filtros combinables de país, región/alcance, categoría, público y estado. Se conservan en la URL, sobreviven a la recarga y pueden limpiarse. Cambiar país restablece los demás filtros. Hay estados explícitos de país sin contenido y combinación sin resultados.
- **Fichas:** institución, destinatarios, requisitos, condiciones por confirmar, disponibilidad, fechas, pasos de preparación, fuentes oficiales y fecha de consulta. Cada registro distingue beca, servicio o procedimiento de orientación. La fuente oficial es el siguiente punto de acceso; no se determina elegibilidad.
- **Mi Ruta:** guardar varias oportunidades crea sus listas de preparación; marcar/desmarcar, añadir y eliminar tareas propias, consultar progreso y fechas, recargar y recuperar datos, quitar oportunidades, descargar un texto UTF-8 o abrir una hoja imprimible con tareas, fechas y fuentes. No se implementan cuentas ni sincronización remota. Si el almacenamiento está bloqueado, se explica y se mantiene el trabajo en memoria durante la visita.
- **CSE conservada:** ficha de apoyo familiar y acceso en `/cse` a la guía anterior, cinco pasos, once casillas, recursos, preguntas y hoja de impresión. La información de oficina sigue limitada a Chiclayo; no se presenta como beca ni beneficio.
- **ES/EN:** interfaz y fichas traducidas manualmente; los textos de tareas propias se conservan como los escribió la persona. Cambiar idioma no cambia país ni reglas.

## Contenido real

Consulta documental del **11-11-2026**. Las ocho fuentes oficiales respondieron HTTP 200; se leyó su contenido. [URLs, títulos y huellas del contenido consultado](results/source-verification.json). Un HTTP 200 por sí solo no demuestra los requisitos: el registro documenta acceso y trazabilidad, junto a la revisión de contenido descrita aquí.

| Categoría | Registro | Institución y fuente | Estado y límite |
|---|---|---|---|
| Educación | Beca 18, convocatoria 2027 | [Pronabec](https://www.pronabec.gob.pe/Beca-18/), [preparación del examen](https://www.pronabec.gob.pe/preparate/) | Inscripción al examen cerrada el 18-10-2026. El examen del 22-11-2026 es para inscritos declarados aptos; no es reapertura ni beca asegurada. |
| Empleo | Buscar trabajo en Empleos Perú | [MTPE en Gob.pe](https://www.gob.pe/23475-buscar-trabajo-en-el-portal-empleos-peru) | Servicio continuo. DNI y correo en el portal oficial; requisitos, ubicación y cierre dependen de cada vacante. No se agregan vacantes individuales. |
| Formación | Capacíta-T | [MTPE](https://www.gob.pe/institucion/mtpe/campa%C3%B1as/126727-capacita-t), [preguntas frecuentes](https://capacitacionlaboral.trabajo.gob.pe/preguntas-frecuentes/) | Catálogo continuo de cursos gratuitos. La vigencia y evaluación se revisan por curso; las rutas formativas no ofrecen un certificado conjunto. |
| Emprendimiento | Tu Empresa, orientación para formalizar | [PRODUCE](https://www.gob.pe/institucion/tuempresa/campa%C3%B1as/54791-crea-tu-empresa) | Canal digital de orientación gratuito. Documentos, atención y costos externos requieren confirmación; no hay cierre general confirmado. |
| Apoyo familiar | Preparar la primera solicitud de CSE | [OFIS](https://www.gob.pe/83555-solicitar-la-clasificacion-socioeconomica-cse-de-tu-hogar), [directorio ULE](https://www.gob.pe/90813-conocer-la-direccion-de-la-unidad-local-de-empadronamiento-de-tu-municipalidad) | Procedimiento sin convocatoria anual. La CSE no afilia automáticamente a programas. El recibo eléctrico sólo corresponde si la vivienda tiene el servicio. |

No se inventaron fechas de los servicios continuos. La próxima revisión editorial se fijó para el 11-12-2026: después, esos registros pasan a «Requiere confirmación». Una inscripción con cierre pasado permanece cerrada aunque tenga otros hitos futuros. Este control es editorial; no sustituye revisar la fuente ni hace consultas automáticas a instituciones.

El filtro de región distingue alcance nacional y registros con orientación local de Chiclayo. No simula una oferta regional que no se haya verificado. México, Colombia y España siguen preparados para incorporación futura, sin registros ficticios ni fallback a reglas peruanas.

## Implementación y conservación

`src/features/opportunities/` separa `domain/` (tipos, filtros, fechas y normalización), `data/` (jurisdicciones, instituciones, oportunidades y fuentes), `application/` (estado compartido local) y presentación en páginas/componentes. Reutiliza los estilos, accesibilidad de rutas, traducciones y utilidad de impresión existentes. `src/content/pe/cse/` mantiene el contenido anterior.

El estado de Mi Ruta tiene versión y normalización: sólo IDs publicados, pasos conocidos, valores booleanos y hasta 30 tareas de 140 caracteres por registro. React representa las tareas como texto también al imprimir. No se añaden dependencias, microservicios, OpenRouter, botones de IA ni analítica.

Los documentos, evidencias y artefactos originales de Kiro se conservan. [USABILITY.md](../product-review/USABILITY.md) y [CSV original](../product-review/usability-record.csv) permanecen sin cambios; el [resumen editable de cinco sesiones](../product-review/USABILITY-RESULTS.md) sigue vacío. No se han realizado entrevistas ni inventado resultados humanos. Ese protocolo corresponde a la revisión previa de CSE; las sesiones del nuevo MVP deben añadir descubrir, filtros, guardar y organizar Mi Ruta, registrando la versión y URL realmente usadas.

## Verificación

- Build y lint: aprobados.
- Vitest: **47/47** aprobadas. [Resultado](results/vitest.json).
- Playwright: **392/392** aprobadas, cero fallidas, omitidas o flaky. [Resultado detallado](results/playwright.json). Incluye recorridos ES/EN, filtros combinados y vacíos, países sin contenido, fichas, guardado, tareas, persistencia, descargas reales, impresión, almacenamiento bloqueado/corrupto, teclado, reflow y regresión de la CSE.
- Referencia WCAG: axe sin violaciones en las reglas ejecutadas para inicio, catálogo, ficha y Mi Ruta ES/EN, además de las vistas CSE conservadas. Reflow y texto al 200 % comprobados. No equivale a certificación de accesibilidad.
- Pantallas comprobadas en 360, 390, 768 y 1440 px; revisión visual adicional de seis capturas de 390, 768 y 1440 px. [Geometría](results/viewport-check.json), [capturas](screenshots/).
- **CI remota del código desplegado: aprobada.** [Ejecución GitHub](https://github.com/Alvaro-mendoza-12/Umbral/actions/runs/43055659333), [pasos y conclusiones](results/github-ci.json).
- **Vista pública:** ocho pruebas Playwright de recorridos completos y filtros ES/EN aprobadas en 390 px y escritorio; incluyen guardado, pasos, tareas, recarga, descarga real y documento imprimible. [Resultado](results/public/playwright.json).
- **Acceso anónimo:** 33 combinaciones de once rutas y tres tamaños, sin errores de página ni solicitudes a terceros en ese recorrido. También se comprobaron metadatos, manifiesto, CSP, `nosniff`, `noindex` del Preview y consulta/guardado de una oportunidad y Mi Ruta offline tras la carga inicial. [Resultado público](results/public-preview.json).
- **Aislamiento:** despliegue `dpl_ArxE2c9aRkqAcUi4HeUvRYTqtWbz`, entorno Preview, proyecto separado `umbral-review-20261111`, sin integración Git. El proyecto original conserva su producción `dpl_FocecH2p4BS8BvYXn48NJC6nWZjr`, protección y conexión a `main`. [Despliegue](results/deployment.json), [antes](results/production-before.json), [después](results/production-after.json), [comprobación](results/isolation.json).

La impresión se comprueba como creación de un documento completo y llamada a la impresión del navegador. No se utiliza una impresora física. Las descargas se abren y se comprueban como archivos reales. Las pruebas no crean cuentas en portales institucionales ni envían postulaciones.

WCAG 2.2 AA se usa como referencia; las comprobaciones automatizadas no son una certificación. Siguen pendientes sesiones con personas, lectores de pantalla y dispositivos físicos. El almacenamiento local puede borrarse con los datos del navegador y no se comparte entre dispositivos. Los enlaces oficiales necesitan conexión.

## Ejecutar y comprobar

Desde la raíz de este repositorio, con Node 26:

```powershell
npm ci
npm run lint
npx vitest run
npm run build
$env:UMBRAL_RESULTS_DIR = 'audit/opportunity-mvp/results'
$env:UMBRAL_SCREENSHOTS_DIR = 'audit/opportunity-mvp/screenshots'
npx playwright install chromium
npx playwright test
npm run preview -- --host 127.0.0.1 --port 4173
```

Abrir `http://127.0.0.1:4173`. La URL de Playwright por defecto es `127.0.0.1:5186`; su configuración inicia su propio servidor. Offline necesita una primera carga completa con red.

## Publicar la versión definitiva, cuando se autorice

1. Realizar las sesiones humanas, registrar hallazgos y resolver las confusiones que impidan descubrir, comprender o preparar una oportunidad. Conservar la distinción entre preparación y elegibilidad.
2. Volver a consultar las fuentes oficiales, actualizar fechas/estados y repetir las pruebas afectadas. Comprobar los resultados de CI del commit que se quiera publicar.
3. Tras la autorización explícita, revisar y fusionar esta rama a `main`. Mantener el proyecto Vercel original `umbral` y su conexión Git a `Alvaro-mendoza-12/Umbral`, rama de producción `main`; la publicación debe usar esa conexión existente. No promover el proyecto aislado de revisión como sustituto de producción.
4. Comprobar la URL de producción, rutas directas, manifiesto, guardado local y política de actualización del Service Worker. Conservar el despliegue anterior para poder revertir en Vercel si fuese necesario.

Este trabajo sólo autoriza y prepara una **vista previa**. No se ha fusionado ni promovido la rama a producción.
