# UMBRAL — The Illuminated Threshold

Evaluación y experimento del 11 de noviembre de 2026. Base publicada: `ac586fa`. Rama independiente: `codex/costume-contest`. No se fusiona en `main` ni se cambia el despliegue de producción.

**Dictamen:** Costume Contest es ahora una categoría defendible para este experimento. La noche arquitectónica, el umbral y la luz forman una interfaz temática con funciones concretas de orientación. Recomiendo adoptar esta dirección para la candidatura. Esto es una evaluación de diseño y evidencia técnica; la aceptación corresponde al jurado. La confianza de las familias sigue siendo una hipótesis que requiere observación con personas.

[Comparación interactiva local](compare.html) · [Propuesta concreta](DESIGN.md) · [Resultados](results/summary.json) · [Capturas](after/)

## Las cuatro categorías

Reglas y convocatoria oficiales consultadas el 11-11-2026: [requisitos](https://kiroween.devpost.com/rules), [definiciones de categorías](https://kiroween.devpost.com/).

| Categoría | Qué exige | Evaluación honesta |
|---|---|---|
|Resurrection|Reinterpretar tecnología obsoleta.|UMBRAL no recupera una tecnología muerta. Un trámite difícil no acredita ese requisito.|
|Frankenstein|Una combinación inesperada de elementos tecnológicos aparentemente incompatibles.|React, contenidos, PWA y checklist son una combinación habitual. No se presenta como una integración extraordinaria.|
|Skeleton Crew|Una plantilla demostrada mediante dos aplicaciones distintas.|Las siete vistas pertenecen a una sola aplicación; no existen las dos aplicaciones requeridas.|
|Costume Contest|Una interfaz inquietante, pulida y memorable cuyo tema mejore la función.|El experimento introduce una arquitectura nocturna original y convierte puertas/luz en acceso, ubicación y preparación. Es la mejor defensa sin cambiar el propósito del producto.|

La interpretación de «haunting» aquí es misterio y profundidad: un paso iluminado en un espacio nocturno. No se usa terror explícito, amenazas ni estética que represente a una institución pública. Una preferencia del jurado por un tema más explícito sigue siendo posible; no se promete elegibilidad ni premio.

## Qué justifica Costume Contest

- **Umbral como acceso:** el arco de portada contiene cinco enlaces reales a los pasos. Permite consultar directamente una duda; el CTA principal se conserva antes del arco en móvil.
- **Luz como posición:** las cinco puertas de la guía muestran número, ubicación actual y «Estás aquí». Se puede saltar o retroceder. Las anteriores indican posición relativa, no tareas verificadas ni solicitudes realizadas.
- **Luz como preparación:** once segmentos se corresponden con el número de casillas realmente marcadas. Se prueban 0, 1, 2 y 11, persistencia y reinicio. El texto aclara que preparación no significa aprobación.
- **Continuidad:** la marca de puerta, las formas arqueadas, la iluminación ámbar y el foco acompañan portada, navegación, guía y checklist. El resto mantiene tipografía, paleta y jerarquía comunes, con instrucciones sobre superficies claras.
- **Autoría:** CSS y SVG originales dibujados para UMBRAL. Sin imágenes, música, fuentes descargadas o nuevas dependencias. No se fabrican artefactos de Kiro.

## Comparación con la versión actual

La versión publicada era clara y convencional: portada azul, barra continua y navegación de la guía después del contenido en móvil. La propuesta da una función reconocible al nombre UMBRAL y sitúa la ruta antes de las instrucciones. Conserva las siete vistas, textos oficiales, cinco pasos, once casillas, ES/EN, almacenamiento, impresión, enlaces y offline.

| Aspecto | Actual | Experimento |
|---|---|---|
|Orientación inicial|Un botón para empezar.|Mismo botón y mapa de cinco accesos directos.|
|Guía móvil|Navegación completa al final.|Cinco controles compactos antes del contenido.|
|Estado|Barra y número.|Barra, puertas numeradas, texto actual y contador segmentado.|
|Lectura|Superficies claras.|Se conservan; el ambiente nocturno se concentra en entrada y navegación.|
|Jerarquía|Inicio centrado y secciones largas.|Texto/recorrido en dos columnas desde 768 px; acción primero en móvil.|

Altura completa de portada en las capturas, sin atribuirla a tiempo de tarea:

| Ancho | Actual | Experimento | Diferencia |
|---|---:|---:|---:|
|390 px|3183 px|3685 px|+502 px|
|768 px|2569 px|2338 px|−231 px|
|1440 px|2548 px|2296 px|−252 px|

La guía paso 3 móvil pasa de 2430 a 2204 px y expone antes su navegación. La portada móvil tiene más desplazamiento por el mapa; ese es el coste principal. La revisión visual no encontró cortes o bloqueos en las superficies críticas a los tres tamaños. La tipografía de títulos cambia a Georgia; el cuerpo mantiene fuente de sistema y tamaño base de 16 px. La mejora de reconocimiento es una evaluación experta, no una reducción medida de errores o ansiedad.

Los JS/CSS locales suman **2821 bytes gzip adicionales** frente al build limpio de la base. No se añadieron peticiones externas ni dependencias. Es una comparación de archivos, no una medición de Core Web Vitals en dispositivos reales. [Datos reproducibles de captura y bundles](results/summary.json).

## Pruebas realmente ejecutadas

| Comprobación | Resultado |
|---|---|
|Build TypeScript/Vite/PWA|Aprobado; SW y manifiesto generados.|
|ESLint|Aprobado.|
|Vitest|16/16 aprobadas.|
|Playwright de producción|171/171 aprobadas, 0 fallos, 0 omitidas, 0 flaky; sin reintentos locales.|
|Responsive|390×844, 768×1024, 1440×900; reflow adicional de controles ES/EN a 320 px.|
|Capturas nuevas|33: 24 vistas, 6 estados de posición/preparación y 3 primeras pantallas de portada.|
|axe|Siete vistas y 404 a tres tamaños; estados EN guía/checklist con menú móvil abierto y progreso parcial. Sin violaciones de las reglas ejecutadas.|
|Interacción|Teclado real, foco, menú/Escape/resize, rutas inválidas, idiomas, datos locales corruptos/bloqueados, sincronización, impresión ES/EN y offline.|
|Tema accesible|Nombres contienen etiquetas cortas visibles; colores forzados operables; movimiento reducido elimina transiciones; límites 0/11 y aviso de no aprobación.|
|Contraste no textual|Prueba específica adicional de bordes y segmentos apagados, independiente de axe.|

Se encontraron y corrigieron durante la revisión dos bordes con contraste cercano a 2.9:1. La versión final usa `#747c75`: **3.96:1** contra fondo de página y **3.63:1** contra segmento apagado. Texto de acciones blancas sobre bronce: **6.49:1**; luz ámbar sobre noche: **10.71:1**; texto secundario sobre lectura: **5.51:1**.

**WCAG 2.2 AA:** se conservan los criterios comprobados, sin fallos detectados en estas pruebas. No es una certificación integral. No se ejecutaron lectores de pantalla, dispositivos físicos ni sesiones con usuarios. Las herramientas no pueden determinar toda la conformidad por sí solas. [Limitaciones de evaluación, W3C](https://www.w3.org/WAI/test-evaluate/tools/selecting/), [etiqueta en nombre, W3C](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html).

Los originales de `before/` se copiaron de la auditoría publicada del 10 de noviembre; no se presentan como capturas nuevas del 11. Los resultados de esta rama se guardan aparte de la auditoría anterior. [Playwright](results/playwright.json), [Vitest](results/unit.json), [registro de diseño](evidence.json).

Para repetir en PowerShell desde la raíz de UMBRAL:

```powershell
npm ci
npm run lint
npm run test -- --run
npx playwright install chromium
$env:UMBRAL_SCREENSHOTS_DIR = 'audit/costume-contest/after'
$env:UMBRAL_RESULTS_DIR = 'audit/costume-contest/results'
npm run test:e2e
```

## Recomendación y defensa de candidatura

Recomiendo esta versión para Costume Contest por la unión entre identidad y orientación. Mantengo producción en su versión actual, respetando el alcance solicitado. Antes de decidir una promoción, conviene observar a 3–5 adultos con casos ficticios: encontrar el paso actual, saltar a la solicitud, preparar dos casillas y explicar qué significa el contador. Alternar el orden de ambas versiones; registrar confusión, claridad y confianza sin pedir nombres, DNI o datos de hogares. Esa sesión no se ha realizado.

La demo debería mostrar primero la guía y su cambio de posición, después dos casillas y su contador, y al final el arco de entrada. Así demuestra función antes de hablar de atmósfera. No afirmar que navegar a un paso equivale a completar el trámite o que el diseño redujo visitas a la ULE.

Texto de defensa propuesto en inglés:

> The Illuminated Threshold turns UMBRAL into a passage from uncertainty to clarity. Its original nocturnal doorway is a working map of five preparation steps. Warm light identifies the current position, while eleven illuminated segments reflect only the items a person has checked. Numbers, clear labels and readable instruction surfaces carry the same information without relying on atmosphere or color alone.

**Atribución:** Kiro creó la base y los artefactos auténticos conservados. Codex realizó la auditoría anterior y este experimento visual, sus pruebas y comparación. No atribuir este rediseño a Kiro. Las reglas siguen exigiendo suficiente uso verificable de Kiro; el encaje visual no sustituye esa evidencia. [Procedencia original](../ATTRIBUTION.md), [reglas §4](https://kiroween.devpost.com/rules).

El video público de YouTube y el envío Devpost continúan pendientes. La elección de categoría ya cuenta con una defensa concreta en esta rama; no se modifica retrospectivamente la candidatura ni se envía un formulario.
