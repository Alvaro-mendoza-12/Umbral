# Propuesta de producto y arquitectura

11-11-2026. Base temática: `052cbb0`. Trabajo exclusivo en `codex/costume-contest`. El propietario confirmó incluir los cambios del adjunto además del cierre de CI y usabilidad.

## Portada

«Los trámites públicos, más fáciles de entender». Una descripción breve, un selector de país, «Clasificación Socioeconómica — Perú» y una sola acción primaria: «Comenzar». El servicio y el botón deben caber con el mensaje en 360×640, 390×844, 768×1024 y 1440×900, en ES/EN.

El arco grande se convierte en una puerta compacta junto al servicio disponible. El mapa de cinco pasos permanece bajo demanda. Se mantienen noche, luz cálida, tipografía y puertas de progreso, con contenido largo sobre superficies claras. Sin alturas fijas para los contenedores de lectura. Al ampliar texto, columnas y encabezado pueden apilarse.

La divulgación progresiva conserva introducción y límites críticos visibles; los detalles completos se abren con controles nativos. Las once casillas siguen visibles. Impresión mantiene todos los pasos, casillas, condiciones, fuentes, fechas y orientación local.

## Arquitectura

País → jurisdicción → institución → procedimiento → idioma. El paquete declara requisitos condicionados, pasos, fuentes, fecha y estado documental. `src/content/pe/cse` es la fuente real utilizada por las pantallas y por la impresión; `src/data` sólo mantiene reexports compatibles. No se traduce un procedimiento de un país como equivalente de otro.

Perú publica CSE; Chiclayo es una orientación local delimitada a `140101`. México, Colombia y España son entradas planificadas sin procedimientos disponibles. País desconocido o no publicado: cero guías, nunca una sustitución automática por Perú. La selección de país se expresa en la URL de portada, no se obtiene de ubicación o datos personales. El idioma no cambia la jurisdicción.

Las vistas actuales son el adaptador de PE/CSE. Incorporar otro país requiere un paquete propio verificado, registro y adaptación de su recorrido; esto no crea automáticamente guías, traducciones o validez legal. [Contrato técnico](../costume-contest/content-architecture.md).

## Evidencia y límites

Comparación conservada con la versión temática anterior en `before/`; nuevas capturas y estados en `after/`. La comparación previa entre producción y la primera temática sigue en `../costume-contest/`.

La evaluación técnica y visual no sustituye una sesión con personas. Se prepara una prueba anónima para cinco adultos, sin información socioeconómica real, con registro vacío. No se publica en producción ni se fusiona a `main`.
