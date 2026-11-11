# Auditoría independiente de UMBRAL

Fecha de revisión: 10 de noviembre de 2026. Alcance: corregir y publicar la aplicación existente, sin reconstruirla, hacer investigación de mercado o alterar CombiRumbo.

## Estado ejecutivo

Implementación corregida y verificada: build, lint, 16 pruebas unitarias y 132 E2E aprobados. Se preservan identidad, siete vistas y funciones. Una instalación limpia compiló y el dominio público se comprobó sin iniciar sesión en Vercel.

## Errores encontrados y correcciones

| Hallazgo | Causa y corrección |
|---|---|
|Seis fallos móviles originales|Reproducidos:20/26 aprobados. Guía/side nav/Inicio tenían selectores obsoletos; dos recorridos no abrían el menú móvil. La persistencia de idioma era defecto real. Se corrigieron las pruebas sin ocultar fallos del producto.|
|Guía inválida rompe render|`/guide/0`, `/guide/6`, texto, decimales y ceros iniciales accedían a datos inexistentes antes del efecto. Validación estricta y recuperación a paso 1.|
|Idioma se pierde|El idioma fijo anulaba el detector. Se conserva elección ES/EN y se actualiza `html.lang`; español sigue siendo predeterminado.|
|Estado local incompatible|`null`, arrays, IDs ajenos y valores no booleanos podían romper o falsear el checklist. Se normaliza la frontera; bloqueo de almacenamiento muestra aviso y mantiene uso en memoria.|
|Navegación y foco|Overlay sin Escape/retorno de foco y posible bloqueo al redimensionar. Menú disclosure no modal, cierre/foco/resize, destinos semánticos y enlaces sin botones anidados.|
|Accesibilidad|Contraste de foco/completado y encabezado de aviso; nombres de progreso y skip-link 404. axe se ejecuta realmente, ya no se infiere contraste de visibilidad.|
|Requisitos CSE incorrectos|Se quitaron obligaciones generales inventadas de agua, partidas, domicilio o comprobantes financieros. Se contemplan DNI/CE/CPP y menores, adulto integrante, hogar y excepciones.|
|Proceso y fuente local|S100 asistido/constancia;25/40 días hábiles desde día siguiente; CSE no afilia. Directorio distrital y fecha/certeza, sin afirmar llamada/visita.|
|Impresión incompleta|Antes sólo imprimía primer párrafo por paso y otra lista. Ahora imprime cinco pasos íntegros y los mismos once elementos, fuentes/fechas y límites, usando DOM clonado.|
|Producción y dependencias|Se eliminan fuentes remotas, se añaden rutas/cabeceras Vercel y se actualizan paquetes afectados. Se preservan PNG y SW auténticos; no se inventa un fallo de iconos ya resuelto.|

## Pruebas ejecutadas

| Comprobación | Resultado local |
|---|---|
|`npm run build`|Aprobado; salida estática, manifiesto y SW generados.|
|`npm run lint`|Aprobado.|
|`npm run test -- --run`|16/16 aprobadas; setup adaptado a getter de localStorage del runner actualizado.|
|`npx playwright test` tras build|132/132 aprobadas, sin retries locales.|
|axe|Siete vistas×tres viewports con tags WCAG2/2.1/2.2 AA, más contraste de Home. Sin violaciones detectadas por esas reglas.|
|Responsive|390×844,768×1024,1440×900; comprobación adicional de reflow a 320 px.|
|Capturas|24: siete vistas y un paso de guía adicional×tres tamaños; inspección visual realizada.|
|Regresiones|Rutas inválidas, menú/Escape/resize, idioma/recarga, almacenamiento corrupto/bloqueado/borrado entre pestañas.|
|Offline|Build de producción controlado por SW, rutas no visitadas e inglés tras desconexión. No se usa dev como prueba offline.|
|Impresión|Popup real ES/EN inspeccionado: contenido completo,11 elementos y fuentes. Print se intercepta para no abrir diálogo físico/consumir papel.|

[Resumen de ejecución](results/summary.json), [Playwright](results/playwright.json), [capturas](screenshots/). No se afirma prueba en teléfono físico, lector de pantalla, impresión física, entrevistas o certificación WCAG. Las capturas no son una comparación pixel a pixel con baseline aprobada.

## Seguridad y privacidad

La auditoría npm inicial informó 20 hallazgos:2 críticos,1 alto,15 moderados y 2 bajos. Tras las actualizaciones, **dependencias de producción:0**; árbol completo:12 hallazgos de desarrollo (10 moderados,2 bajos), sin altos/críticos. No se ejecutó `audit fix --force`, ni se aplicaron downgrades sugeridos que romperían compatibilidad. Los remanentes afectan herramientas de glob/configuración de build/lint; no son una prueba de explotación del sitio estático y siguen pendientes de actualización del mantenedor.

Vite 6.4.6,Vitest 5.1 y Router 7.18.5 se actualizaron por advisories; PWA2 y plugin React compatible acompañan el cambio. La app sigue siendo React 18/TypeScript, sin backend, cuentas, pagos, OCR o carga de documentos. No se expone dev a la red. [Auditoría de dependencias](results/dependency-audit.json).

Se mantienen scripts propios en CSP, sin `unsafe-eval`; estilos inline se permiten por layout/progreso React e impresión existente, decisión documentada para evitar una refactorización innecesaria. No hay fuente Google remota ni analítica añadida. Las casillas/idioma se guardan en el dispositivo; hosting y sitios externos pueden registrar metadatos. No se promete anonimato absoluto, seguridad total ni vigencia futura offline.

## Git, `.kiro` y publicación

Raíz Git exclusiva: `D:\CombiRumbo-review\umbral`. Origen: `https://github.com/Alvaro-mendoza-12/Umbral.git`. Se conserva el commit original 813c87a y una rama de auditoría; el historial no se reescribió. Tres Specs y cinco Steering originales permanecen en `.kiro` y no están ignorados; no hay evidencia de Agent Hooks. [Atribución](ATTRIBUTION.md), [hashes](results/kiro-artifacts.json).

Se excluyen dependencias, build, secretos y `.vercel`. `tsconfig.tsbuildinfo` deja de versionarse; su copia local y el commit original se conservan. El padre y la copia original de publicación no se sustituyeron. [Verificación de estructura](results/structure.json).

**Aplicación pública:** [umbral-seven-khaki.vercel.app](https://umbral-seven-khaki.vercel.app). Proyecto Vercel `umbral`, enlazado al repositorio del propietario, raíz `.` y salida `dist`. La compilación cloud finalizó en Linux. El dominio estable permite navegador anónimo; el enlace interno de despliegue puede pedir autenticación Vercel y no es el enlace para jueces.

Se comprobaron21 combinaciones de rutas/tamaños públicas, idioma tras recarga, ruta offline, manifiesto, PNG, cabeceras y revalidación SW. Sin excepciones de página ni peticiones a terceros en ese recorrido. [Resultado público](results/public-smoke.json). Una copia limpia del commit auditado completó `npm ci` y `npm run build`; [registro](results/clean-build.json). Los logs usan UTC; la fecha de revisión corresponde a UTC-5.

GitHub se comprobó accesible sin credenciales. Los commits se incorporan por avance normal, sin force-push. El workflow se añadió; no se atribuye a CI remota un resultado antes de observarlo.

## Límites y entrega Devpost

Sin entrevistas, mejora de comprensión medida, afiliaciones o confirmación operativa ULE. La revisión normativa es documental; la fecha de página no acredita operación actual. No se garantiza resolución o acceso a programas.

Pendientes de candidatura: categoría temática defendible, video YouTube público<3 min con inglés/traducción y envío del formulario. La aplicación técnica no resuelve esos requisitos por sí sola. [Preparación y guion](KIROWEEN.md).
