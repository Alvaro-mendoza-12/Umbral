# UMBRAL — cierre de revisión de producto

11-11-2026. Rama `codex/costume-contest`. Código revisado: `e7b984f`. **Listo para una decisión de publicación; sin merge ni cambio de la producción actual.**

**[Vista previa pública](https://umbral-review-20261111-j9u10cgko-alvaro-s-projects1.vercel.app)** · [Comparación antes/después](compare.html) · [92 capturas](after/) · [Guía para cinco adultos](USABILITY.md)

## Resultado ejecutivo

Recomiendo la versión nueva frente a la primera temática `052cbb0`: explica el propósito antes, identifica Perú/CSE y presenta una acción inequívoca. El arco se convierte en una señal compacta; los cinco accesos siguen bajo demanda. Se preservan siete vistas, ES/EN, once casillas, pasos, impresión, offline y fuentes. La comprensión de personas reales aún no se ha medido.

| Ancho | Portada temática anterior | Nueva | Reducción |
|---|---:|---:|---:|
|360 px|3825 px|1658 px|2167 px|
|390 px|3685 px|1616 px|2069 px|
|768 px|2338 px|1304 px|1034 px|
|1440 px|2296 px|1199 px|1097 px|

El mensaje, descripción, servicio y botón caben **sin scroll, a escala normal**, en 360×640, 390×844, 768×1024 y 1440×900, en español e inglés. [Geometría real de ocho casos](results/first-screen.json). Con texto al 200 % se permite desplazamiento vertical y se comprobó ausencia de recorte/desbordamiento horizontal.

## CI y pruebas

- `052cbb0`: la CI falló por DNS del espejo Ubuntu al instalar dependencias de Chromium; las E2E remotas se omitieron. No se presenta como éxito.
- `f2093cf`: corregido mediante imagen oficial de Playwright 1.65.0 fijada por digest, con navegador/dependencias incluidos. [CI aprobada](https://github.com/Alvaro-mendoza-12/Umbral/actions/runs/43037239673).
- `e7b984f`: [CI remota del código nuevo aprobada](https://github.com/Alvaro-mendoza-12/Umbral/actions/runs/43043054830). Instalación, lint, unitarias, auditoría de producción, build y E2E ejecutados. [Registro](results/github-ci.json).
- Local: **328 E2E y 30 unitarias aprobadas**, sin omitidas ni flaky; build y lint correctos. Se verificaron enlaces internos, nombres de controles, países no disponibles, detalles por teclado, texto completo en pantalla/impresión, idioma, persistencia y offline. [Resultados](results/summary.json).
- **92 capturas nuevas**: ocho vistas, primeros viewports ES/EN y estados abiertos/parciales en cuatro tamaños. La comparación local carga sus 32 pares. Capturas de respuestas abiertas se toman después de completar las animaciones para evitar fotogramas casi transparentes.

WCAG 2.2 AA se mantiene como referencia: sin violaciones detectadas en las reglas axe ejecutadas; se comprobaron foco/teclado, nombres, contraste textual/no textual, colores forzados, movimiento reducido y reflow. No es certificación integral; no se probaron lectores de pantalla ni dispositivos físicos.

## Vista pública y aislamiento

La URL anterior es un despliegue **Preview** del proyecto separado `umbral-review-20261111`, sin integración Git. Acceso anónimo comprobado: 32 combinaciones ruta/tamaño, inicio, país sin guías, ES/EN, checklist persistente, popup imprimible, manifiesto/PNG, cabeceras y ruta offline. Cero errores de página y cero peticiones a terceros en ese recorrido. [Resultado público](results/public-preview.json).

Se mantienen CSP, `nosniff`, protección de marcos y revalidación del SW; el entorno de revisión añade `noindex`. Sólo el proyecto aislado permite acceso anónimo. El proyecto original `umbral` conserva su protección, conexión a `main` y despliegue `dpl_FocecH2p4BS8BvYXn48NJC6nWZjr`. `main` permanece en `ac586fa`. [Configuración anterior](results/production-before.json), [posterior](results/production-after.json).

Prueba local alternativa desde `D:\CombiRumbo-review\umbral`, en esta rama, con Node 26:

```powershell
npm ci
npm run build
npm run preview -- --host 127.0.0.1 --port 4173
```

Abrir `http://127.0.0.1:4173`. Para offline, esperar la primera carga completa antes de desconectar. No ejecutar desde CombiRumbo ni cambiar a `main` para probar esta propuesta.

## Veredicto del adjunto

1. **Propósito inmediato:** ahora se expresa en título, descripción y servicio. La claridad humana queda pendiente de la prueba de cinco adultos.
2. **Primera pantalla:** los cuatro elementos esenciales caben en las cuatro resoluciones ES/EN, sin reducir tipografía por debajo de los mínimos comprobados.
3. **Arquitectura internacional:** registro y paquetes reales por país/procedimiento, jurisdicciones, instituciones, requisitos condicionados, pasos, idiomas manuales, fuentes, fecha y estado. No existe fallback de otro país a Perú. Las vistas actuales siguen siendo el adaptador de PE/CSE; otro país necesita su propio contenido verificado y adaptación, no una traducción legal automática. [Contrato](../costume-contest/content-architecture.md).
4. **Primera implementación:** sólo Perú/CSE está disponible, con revisión documental del 10-11-2026. Chiclayo queda dentro de orientación local, limitada al distrito `140101`. MX/CO/ES muestran que no tienen guías verificadas.
5. **Carga de lectura:** resumen y acción primero, detalles completos bajo demanda. Las pruebas recorren el texto íntegro de los cinco pasos y la hoja impresa conserva once elementos y cinco fuentes. El checklist gana altura en tablet/escritorio por sus controles de detalle: menos texto simultáneo no significa menos scroll en toda página.
6. **Identidad:** se conservan noche, iluminación cálida, puertas, posición numerada y luces de preparación. No se ha vuelto a investigar ni modificar la elección de categoría aprobada.
7. **Pendientes:** ejecutar las cinco sesiones, revisar comprensión/confianza, probar dispositivos y lectores reales, y mantener la revisión de las fuentes. La fecha documental no confirma atención de oficinas ni vigencia futura. Otros países no tienen contenido disponible.

## Decisión de publicación

La propuesta técnica y visual está preparada; la guía y [plantilla vacía](usability-record.csv) permiten validar con cinco adultos sin datos socioeconómicos. No hay entrevistas ni resultados inventados. Recomiendo esta versión para la decisión final, usando los criterios de comprensión del protocolo antes de promoverla. Producción requiere una autorización posterior; no se ha fusionado esta rama.

La base y los artefactos auténticos de Kiro permanecen atribuidos. Codex realizó la auditoría, el tema, esta reorganización UX, el paquete de contenido y la corrección de CI; no se fabricaron Specs, Steering ni Agent Hooks.
