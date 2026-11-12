# Revisión de divulgación progresiva

La revisión conserva los textos oficiales ES/EN existentes. Los detalles se reorganizan sin recortar condiciones, fuentes, fechas ni la hoja completa de impresión.

| Vista | Información inicial | Detalle y acción |
| --- | --- | --- |
| Inicio | Propuesta breve, país y primera guía. | La tarea principal concentra su rediseño y validación responsive. |
| Sobre la CSE | Definición completa, aviso de preparación y acceso a la guía. | Finalidad, ejemplos, quién puede solicitar y otras condiciones en tres desplegables. |
| Guía | Primer párrafo de cada paso, aviso de preparación/sin decisiones/sin datos personales, mapa y navegación. | Cada apartado original se abre por su título. En el paso 4, Chiclayo es orientación local separada y los cinco puntos del S100 están en «Al presentar tu solicitud». |
| Lista de preparación | Las once casillas y sus títulos permanecen visibles, con el mismo progreso y reinicio. | «Qué revisar» abre la descripción de cada acción fuera de su etiqueta, sin alterar el estado de la casilla. |
| Recursos | Acción de imprimir, nombres y enlaces de las cinco fuentes y sus fechas. | Descripción y certeza bajo demanda; sede, horario y cautelas de Chiclayo en orientación local. |
| Preguntas frecuentes | Todas las preguntas visibles. | Se conserva el acordeón de una respuesta abierta; controles de 44 px, encabezados y relación explícita con cada respuesta. |
| Página no encontrada | Mensaje breve y regreso al inicio. | Sin cambios: ya ofrece una sola acción clara. |

Los nuevos desplegables usan `details`/`summary`, foco visible y superficies de al menos 48 px. No añaden animaciones. Se conservan los colores, la tipografía, las puertas del mapa y las luces de preparación de The Illuminated Threshold.

La hoja `prep-sheet` de Recursos permanece íntegra e independiente del estado abierto/cerrado de los desplegables en pantalla: imprime los cinco pasos, las once descripciones, los datos locales y todas las fuentes con sus fechas.

Cambios intencionales para la verificación funcional: los apartados de Guía y Sobre la CSE empiezan cerrados; los detalles de cada casilla y de cada fuente empiezan cerrados; la dirección y el horario local requieren abrir «Orientación local: distrito de Chiclayo». Los enlaces oficiales de las cinco fuentes permanecen visibles. Las respuestas FAQ siguen presentes en el DOM con `hidden` cuando están cerradas y mantienen `aria-expanded`.

Las pruebas responsive, de impresión y de accesibilidad del conjunto corresponden a la validación integrada de la tarea principal; esta revisión no las sustituye.
