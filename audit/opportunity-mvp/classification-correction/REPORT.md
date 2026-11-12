# Corrección de clasificación antes de las cinco sesiones

11-11-2026. Rama `codex/opportunity-companion-mvp`. Código corregido: [`b26ba80765e86e6f78c06223adf52900bc8452f8`](https://github.com/Alvaro-mendoza-12/Umbral/commit/b26ba80765e86e6f78c06223adf52900bc8452f8).

**[Vista previa corregida para las sesiones](https://umbral-review-20261111-nsail4u22-alvaro-s-projects1.vercel.app)** · **[Protocolo de cinco adultos](../USABILITY.md)**.

## Cambio concreto

CSE se presenta como **Procedimiento de orientación / Guidance procedure** en catálogo, ficha, Mi Ruta, descarga de texto e impresión. Deja de incluirse en el filtro «Servicio continuo». La explicación de disponibilidad sigue indicando que es un procedimiento sin convocatoria anual; las fuentes, requisitos, fechas e identificadores guardados no cambian.

La lógica de etiqueta se comparte entre las vistas y la descarga para evitar que ésta mantenga la clasificación anterior. Se conserva el control de revisión editorial: si un registro necesita nueva revisión, se mantiene el aviso correspondiente.

| Registro | Clasificación y etiqueta comprobadas |
|---|---|
| Beca 18-2027 | Beca; inscripción cerrada. |
| Empleos Perú | Servicio; servicio continuo. |
| Capacíta-T | Servicio; servicio continuo. |
| Tu Empresa | Servicio; servicio continuo. |
| CSE | Procedimiento de orientación; sin etiqueta de servicio continuo. |

## Verificación ejecutada

- Build y lint correctos.
- **48 unitarias aprobadas**, incluidas clasificación, filtro de servicios continuos y conservación del aviso de revisión. [Resultado](vitest.json).
- **72 Playwright afectadas aprobadas**, ES/EN en 360, 390, 768 y 1440 px. Incluyen los cinco registros y la regresión de CSE en catálogo, ficha, Mi Ruta, descarga e impresión. [Resultado local](local/playwright.json).
- **12 pruebas públicas aprobadas**, ES/EN en 390, 768 y 1440 px, sobre el Preview corregido y sin autenticación. [Resultado](public/playwright.json).
- **Diez lecturas de ficha comprobadas** en navegador anónimo: cinco registros por dos idiomas. [Etiquetas observadas](../usability/presentation-check-corrected.json).
- **CI del código corregido aprobada.** [Ejecución en GitHub](https://github.com/Alvaro-mendoza-12/Umbral/actions/runs/43075810970), [registro](github-ci.json).

No se ejecutó otra auditoría general local. Las comprobaciones se concentran en la clasificación y los recorridos afectados; los resultados generales de la entrega anterior se conservan como históricos.

## Conservación y preparación de las sesiones

Sólo cambian tres archivos de aplicación para seleccionar/usar la etiqueta y excluir procedimientos del filtro de servicios, más las pruebas correspondientes. Sin cambios en CSS, diseño, componentes de navegación, datos de oportunidades, fuentes, requisitos, fechas, dependencias ni almacenamiento.

El despliegue pertenece al proyecto aislado `umbral-review-20261111`, entorno Preview. La producción original y su conexión Git a `main` se comparan antes y después; no se fusiona ni promueve la rama. [Antes](production-before.json), [después](production-after.json), [despliegue](deployment.json), [resumen de conservación](summary.json).

La guía de usabilidad apunta a este nuevo Preview y registra el código corregido. Las 35 filas de tareas y tiempos y la consolidación de cinco participantes siguen vacías. No hay sesiones humanas ni resultados inventados. Conservar esta versión durante las cinco sesiones.
