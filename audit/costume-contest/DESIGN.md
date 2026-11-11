# The Illuminated Threshold — experimento

Fecha: 11 de noviembre de 2026. Base: `ac586fa` en `main`. Rama: `codex/costume-contest`. No se cambia `main` ni producción.

## Contrato de diseño

La persona necesita preparar su primera solicitud de CSE sin entregar datos personales. La acción principal sigue siendo «Comenzar la guía». El contenido oficial, sus límites, las siete vistas, ES/EN, once casillas, impresión y lectura offline permanecen disponibles.

Dirección: arquitectura nocturna y luz de orientación. Un arco original contiene los cinco accesos reales a la guía; no es una ilustración que retrase el uso. En la guía, puertas numeradas sitúan a la persona y permiten cambiar de paso. En la lista, once luces representan preparación marcada, nunca aprobación administrativa.

Paleta: noche `#171d2a`, piedra `#30394b`, luz `#f3c789`, bronce `#80551d`, lectura `#f5f6f3`, orientación secundaria `#226350`. Bronce oscuro para texto/acciones sobre fondos claros; luz cálida para acciones sobre noche. Texto oscuro sobre superficies claras en instrucciones extensas.

Tipografía: Georgia para títulos principales y arquitectura editorial; Segoe UI/sistema para lectura y controles. Sin fuentes externas ni nuevas dependencias. Composición alineada a la izquierda. La portada divide explicación y recorrido; en móvil, la acción precede al arco. En guía, navegación compacta de cinco pasos por encima del contenido en móvil y lateral en escritorio.

```
Escritorio: [marca | navegación | ES EN]
            [qué preparar + CTA] [arco con cinco accesos]
Guía:       [posición 3 de 5]
            [ruta iluminada]     [instrucciones claras]
Móvil:      [marca | ES EN | menú]
            [qué preparar + CTA]
            [arco / cinco accesos]
Guía móvil: [posición][1 2 3 4 5][instrucciones][acciones]
```

La singularidad está en un mismo umbral que funciona como acceso, mapa y contador. Se descartan niebla, sustos, sonidos, calabazas, tipografías góticas, pantallas de entrada, revelado progresivo de instrucciones y movimiento ambiental. La incertidumbre se expresa en el espacio nocturno; las instrucciones permanecen completamente visibles. No se añade un cambio de tema que obligue a decidir antes de usar la guía.

## Estados y comprobaciones previstas

| Estado | Disparador y respuesta / siguiente acción |
|---|---|
|Vacío|0 de 11, todas las luces apagadas; marcar cualquier preparación, sin bloqueo.|
|Parcial|Casillas marcadas, contador y luces coinciden y persisten; se puede desmarcar.|
|Completo|11 de 11 expresa preparación; se conserva el aviso de no aprobación y el reinicio.|
|Error|Ruta inválida recupera paso 1; almacenamiento bloqueado avisa y permite uso en memoria.|
|Sin conexión|Lectura tras carga completa; estado visible y enlaces externos necesitan red.|
|Carga|App estática local, sin nueva petición o carga asíncrona introducida por el tema.|
|Permisos|No hay nuevo permiso, registro, documento, ubicación ni dato personal solicitado.|

Viewports: 390×844, 768×1024, 1440×900; reflow 320 px. Foco, numeración y texto redundantes con color. Movimiento sólo en cambios de estado y desactivado con `prefers-reduced-motion`. Comprobación adicional de colores forzados, ES/EN, menú abierto, progreso parcial, teclado e impresión. axe no equivale a certificación completa WCAG.

Las capturas previas de la revisión publicada se conservan en `before/`; las del experimento irán en `after/`. Se compararán jerarquía, ubicación de la acción, legibilidad, altura móvil y reconocimiento de estados. Sin pruebas con familias, cualquier mejora de comprensión/confianza será una hipótesis, no un resultado medido.

## Autoría

Arcos, luz y motivos se dibujan específicamente mediante CSS y SVG propios, sin imágenes, música, fuentes descargadas ni recursos de terceros añadidos. Base de aplicación y artefactos originales: Kiro. Diseño experimental y sus pruebas: Codex. No se fabrican Specs ni Agent Hooks.
