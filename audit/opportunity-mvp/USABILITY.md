# UMBRAL — guía de usabilidad del acompañante de acceso a oportunidades

**Lista para moderar. Sesiones humanas: pendientes; no hay entrevistas ni resultados registrados.** Preparada el 11-11-2026 para cinco adultos. Duración prevista: 35–45 minutos por persona, con pausas si las necesita.

**Entorno único de prueba:** [vista previa pública actual](https://umbral-review-20261111-nsail4u22-alvaro-s-projects1.vercel.app). Código desplegado: `b26ba80765e86e6f78c06223adf52900bc8452f8`; cierre documental anterior: `137e57e`. Este protocolo no autoriza cambios de aplicación ni publicación.

## 1. Material listo para usar

| Material | Uso |
|---|---|
| [Hoja de observación](usability/OBSERVATION.md) | Copiar una por persona: P01–P05. Incluye contexto, tareas, ayudas, tiempos y preguntas finales. |
| [Registro de tareas y tiempos](usability/task-record.csv) | 35 filas preparadas: siete tareas por cada uno de los cinco códigos. Las celdas de resultados están vacías. |
| [Registro de errores y confusiones](usability/issues.csv) | Una fila por incidente observado; agrupar después los que describan el mismo problema. |
| [Consolidación de cinco sesiones](usability/CONSOLIDATION.md) | Matriz por participante, conteos por tarea, confusiones críticas y recomendación posterior. |
| [Comprobación de las fichas](usability/VERIFICATION.md) | Evidencia técnica de presentación y respuestas esperadas para quien modera. No son resultados humanos. |

Los CSV usan UTF-8 y separador coma. Importarlos como texto delimitado por coma si la hoja de cálculo no los separa automáticamente. Conservar los registros originales; resumir en una copia. Las guías históricas de la fase CSE permanecen intactas: este es el protocolo del MVP nuevo, sin comparación de portadas anteriores.

## 2. Objetivo y selección de participantes

Comprobar si una persona entiende para qué sirve UMBRAL, encuentra una opción adecuada a un objetivo ficticio, comprende sus condiciones y organiza su preparación. Separar comprensión inicial, ejecución de tareas y comprensión final aprendida durante el uso.

Reclutar cinco personas adultas que lean español. Procurar al menos tres franjas de edad entre `18–29`, `30–44`, `45–59` y `60 o más`, incluyendo una persona mayor de 60 cuando sea posible. Buscar dos personas de familiaridad tecnológica baja, dos media y una alta. Son objetivos de reclutamiento, no participantes ya conseguidos; documentar cualquier diferencia. La franja y la familiaridad son voluntarias; no registrar edad exacta.

- **Baja:** suele necesitar ayuda para navegar por aplicaciones nuevas.
- **Media:** usa aplicaciones habituales y aprende otras con alguna orientación.
- **Alta:** suele explorar aplicaciones nuevas y resolver dificultades por su cuenta.

No se necesita ser solicitante real de una beca, empleo o apoyo. No preguntar ingresos, situación laboral, beneficios recibidos, composición del hogar, DNI, dirección, salud ni otras circunstancias personales. Usar P01–P05 sin nombres, contactos o fotografías. No grabar audio, vídeo ni pantalla. Tomar notas de acciones y expresiones sobre la interfaz, excluyendo datos personales espontáneos.

## 3. Preparación de cada sesión

1. Preparar un moderador, una persona observadora si está disponible y un cronómetro. Si hay una sola persona, cronometrar por tarea y tomar notas breves; completar el relato al terminar cada tarea.
2. Usar un perfil de navegador exclusivo de prueba, con red, idioma español, Perú y Mi Ruta vacía. Abrir la URL indicada, sin sesión en portales institucionales. Crear un perfil limpio por participante o borrar sólo los datos del sitio en ese perfil; nunca borrar el historial o los datos del navegador personal del participante. Cerrar el perfil de prueba al finalizar.
3. Preferir el mismo móvil o ventana de 390×844 para las cinco personas. Si se usa otro dispositivo, registrar navegador, ancho aproximado, zoom y apoyos de accesibilidad; respetar las preferencias de lectura. No atribuir diferencias entre aparatos al producto sin analizarlas. Las emulaciones técnicas de 768/1440 px no sustituyen sesiones con personas.
4. Comprobar que la portada y el catálogo cargan, que aparecen los cinco registros y que las fichas conservan los tipos/estados descritos en la comprobación. Revisar cada ficha usada: si cambia un dato, registrar la desviación antes de la sesión. A partir del 12-12-2026 los servicios pueden mostrar «Requiere confirmación» por la revisión editorial; no calificarlos con una respuesta esperada antigua. Si faltan registros o el estado impide aplicar este guion, posponer ese bloque o acordar y documentar una adaptación del protocolo; no cambiar la aplicación.
5. Tener las respuestas del apartado 7 y los enlaces directos fuera de la vista del participante. No mostrarle esta guía ni explicarle la identidad del producto antes de T1.
6. Asignar los cinco objetivos ficticios de la tabla siguiente a los códigos de sesión. Asignar los códigos por sorteo, independientemente de edad y familiaridad. El objetivo es cubrir cinco categorías, no comparar cuál categoría es «más fácil» con una sola persona.

| Código de sesión previsto | Objetivo ficticio de T2 | Registro esperado en la versión actual |
|---|---|---|
| P01 | Estudiar educación superior en Perú | Beca 18 · convocatoria 2027; encontrarla no significa poder inscribirse ahora. |
| P02 | Buscar opciones para trabajar en Perú | Buscar trabajo en Empleos Perú. |
| P03 | Aprender habilidades para el trabajo | Capacíta-T · cursos gratuitos. |
| P04 | Orientarse para formalizar un pequeño negocio | Tu Empresa · orientación para formalizar. |
| P05 | Conocer un procedimiento relacionado con apoyo familiar | CSE · preparar la primera solicitud; no es un beneficio. |

## 4. Guion de moderación

### Bienvenida y consentimiento verbal, antes del cronómetro

Leer literalmente:

> «Gracias por participar. Estamos probando esta página, no tus conocimientos. Queremos saber qué se entiende y qué resulta difícil. Puedes hacer una pausa o terminar cuando quieras. Trabajaremos con situaciones inventadas; no compartas datos tuyos ni de tu familia. No realizaremos inscripciones, pagos ni envíos a instituciones durante esta sesión. Tomaremos notas sin tu nombre y no haremos grabaciones. Si puedes, cuéntanos qué estás buscando o qué esperas que ocurra. ¿Estás de acuerdo en continuar?»

Si no acepta, terminar sin ejecutar tareas ni registrar sus respuestas; dejar esa sesión como no realizada. La participación puede retirarse en cualquier momento. No explicar todavía «acompañante», los cinco sectores ni las respuestas sobre elegibilidad.

Preguntar sólo: «¿En cuál de estas franjas de edad prefieres situarte, si quieres indicarlo?» y «Cuando usas una aplicación nueva, ¿sueles necesitar bastante ayuda, alguna ayuda o explorar por tu cuenta?». Registrar las categorías generales o «prefiere no responder».

### Durante cada tarea

- Leer sólo el texto entre comillas. Dar una instrucción cada vez, especialmente en T3. No señalar botones, rutas, acordeones ni enlaces correctos.
- Dejar que lea, se equivoque y se corrija. Usar únicamente preguntas neutrales: «¿Qué estás intentando hacer?», «¿Qué esperabas que pasara?» o «¿Qué te hace pensar eso?». No sustituirlas por «¿Has visto Mi Ruta?» o «Ese botón guarda».
- Si pide confirmar si lo hace bien: «Haz lo que harías si estuvieras usando la página por tu cuenta».
- Si llega al tiempo de referencia, preguntar: «¿Prefieres seguir un poco más, recibir una pista o pasar a la siguiente tarea?». El tiempo sirve para organizar la sesión; una ejecución lenta no es un fracaso por sí sola.
- Si acepta ayuda, usar primero una pista general (**A1**) sin indicar un control. Si no basta, nombrar el área o el control (**A2**). Si hay que completar la acción por él, registrar rescate (**A3**), no éxito del participante. Anotar las palabras de la ayuda y cuándo comenzó.
- La ayuda sobre el navegador, por ejemplo cómo recargar, cuenta como ayuda y se marca además como **entorno** para no confundirla con un fallo de UMBRAL. No penalizar una preferencia de accesibilidad.
- Si se atasca una tarea anterior, preparar el punto de partida de la siguiente fuera de su tiempo y anotarlo como `setup_by_moderator=si`. Conservar el fracaso anterior. La preparación no convierte la tarea previa en éxito ni invalida automáticamente la siguiente, que se evalúa por separado.
- Si aparece información personal espontánea, no transcribirla. Si intenta realizar una solicitud o introducir documentos reales, detener esa acción y registrar la confusión sin guardar sus datos.

## 5. Las siete tareas exactas

Los tiempos son referencias operativas sin validar, no límites de aptitud. El cronómetro incluye lectura de pantalla, pensamiento en voz alta, errores y correcciones; no incluye la lectura de la instrucción por el moderador. En T3 y T4 registrar también como pausa el tiempo de leer cada bloque siguiente. Terminar cuando la persona dice que acabó y se observa el resultado, o decide pasar. No confirmar la respuesta correcta antes de registrarla.

### T1 · Entender para qué sirve — referencia: 90 segundos

**Inicio:** portada inicial. **Leer:** «Mira esta página y cuéntame con tus propias palabras para qué crees que sirve, qué podrías hacer aquí y por dónde comenzarías».

**Éxito observable:** reconoce que puede descubrir opciones y entender/preparar el acceso; encuentra al menos un objetivo relevante. No hace falta repetir el lema ni enumerar las cinco áreas. Registrar literalmente lo que interprete, incluida una interpretación limitada a CSE o la creencia de que UMBRAL concede algo. Conservar esta respuesta inicial aunque cambie al final.

### T2 · Encontrar una oportunidad — referencia: 180 segundos

**Leer sólo el caso asignado:**

- **P01:** «Imagina que una persona quiere conocer opciones para estudiar educación superior en Perú. Encuentra una opción para que pueda revisar sus condiciones y dime por qué la has elegido».
- **P02:** «Imagina que una persona quiere encontrar dónde buscar trabajo en Perú. Encuentra una opción para que pueda revisar sus condiciones y dime por qué la has elegido».
- **P03:** «Imagina que una persona quiere aprender habilidades para el trabajo. Encuentra una opción para que pueda revisar sus condiciones y dime por qué la has elegido».
- **P04:** «Imagina que una persona quiere orientarse para formalizar un pequeño negocio. Encuentra una opción para que pueda revisar sus condiciones y dime por qué la has elegido».
- **P05:** «Imagina que una persona quiere conocer un procedimiento que puede necesitar al explorar apoyos para su familia en Perú. Encuentra una opción para revisar sus condiciones y dime por qué la has elegido».

**Éxito observable:** localiza la tarjeta o ficha de la categoría adecuada y explica la relación con el objetivo. Aceptar cualquier recorrido válido. En P01, encontrar una inscripción cerrada es un descubrimiento válido; interpretar que todavía puede inscribirse es una confusión que debe registrarse aparte. En P05, no exigir que conozca de antemano qué significa CSE. Anotar el registro elegido para T4–T7.

### T3 · Usar los filtros — referencia total: 420 segundos

**Preparación, fuera del tiempo:** abrir [el catálogo sin filtros](https://umbral-review-20261111-nsail4u22-alvaro-s-projects1.vercel.app/discover?country=PE). Leer los bloques uno a uno; no leer el siguiente hasta cerrar la observación del anterior. Registrar a–d por separado en la hoja, pero cronometrar T3 completo.

1. **T3a:** «Usa los filtros para dejar sólo opciones de formación para personas que quieren aprender. Dime qué cambió en los resultados».
2. **T3b:** «Vuelve a ver todas las opciones. Después busca las que además tienen orientación local de Chiclayo. Explica qué encontraste».
3. **T3c:** «Vuelve a ver todas las opciones. Busca ahora las que tienen la inscripción cerrada y explica qué significa ese estado para alguien que no se había inscrito».
4. **T3d:** «Consulta qué hay para Colombia y explica qué encuentras. Después vuelve a las opciones disponibles de Perú».

**Éxito observable:** combina categoría y público para ver Capacíta-T; elimina filtros antes de cambiar el objetivo; identifica CSE como registro con orientación local de Chiclayo; encuentra Beca 18 cerrada; reconoce que Colombia aún no tiene contenido verificado y vuelve explícitamente a Perú. Si afirma espontáneamente que un resultado filtrado demuestra elegibilidad, registrar esa confusión para el análisis de C4; no exigir una explicación que este enunciado no pide. Si no consigue un bloque, anotar su resultado y preparar el siguiente punto de partida fuera del tiempo activo, sin borrar el fallo.

### T4 · Comprender la ficha y sus fuentes — referencia: 240 segundos

**Inicio:** ficha de la oportunidad elegida en T2. Si no la encontró, abrir el registro esperado y anotar la preparación del moderador. **Leer por partes:** «En esta opción, muéstrame quién la ofrece». Después: «¿Qué tendría que revisar o preparar esa persona? Señala también algo que deba confirmar antes de continuar». Después: «¿Dónde comprobarías que la información viene de una institución oficial? ¿Qué entiendes por la fecha de revisión que aparece?».

**Éxito observable:** identifica la institución, al menos un requisito o una condición pendiente correcta y un enlace oficial; comprende que la fecha de revisión no garantiza atención, cupo o vigencia futura. Puede leer la pantalla, sin memorizar. Para Tu Empresa, reconocer que debe consultar documentos/costos y que no hay una lista universal también es correcto; no exigir requisitos inventados. Registrar cada elemento por separado.

### T5 · Guardar en Mi Ruta — referencia: 120 segundos

**Inicio:** ficha elegida, sin guardar. Si la guardó mientras exploraba una tarea anterior, registrar esa exposición previa, quitar sólo ese registro en el perfil de prueba fuera del cronómetro y volver a la ficha; anotar `setup_by_moderator=si`. No presentar el segundo guardado como un primer descubrimiento del control.

**Leer:** «Esta persona quiere retomar más tarde la opción que acabas de revisar. Consérvala dentro de UMBRAL y muéstrame dónde la encontraría».

**Éxito observable:** guarda la opción, entra en Mi Ruta y ve la misma oportunidad con sus pasos. No basta señalar el control o decir que quedó guardada. No hace falta crear una cuenta. Si el moderador necesita guardarla para permitir T6, registrar T5 como no completada por el participante y el rescate de preparación de T6.

### T6 · Preparar pasos y recuperar el progreso — referencia: 300 segundos

**Inicio:** la oportunidad guardada en Mi Ruta, con casillas sin marcar. **Leer:** «Para este caso inventado, da por preparadas dos acciones de la lista. Añade otra acción que quieras recordar para este caso, con un texto breve y sin datos personales. Después recarga la página y comprueba qué quedó guardado. Cuéntame qué significa el progreso que ves».

**Éxito observable:** marca dos pasos originales, crea una tarea propia y, después de recargar, encuentra las mismas dos marcas y el texto añadido. Con los tres pasos originales actuales y una tarea propia habrá cuatro pasos en total; si sólo marcó los dos originales, el indicador será **2 de 4**, no 2 de 3 ni una aprobación. Si marca también la tarea propia, anotar ese estado y comprobar su persistencia; no forzar una cifra distinta de sus acciones. Si no sabe recargar, puede recibir ayuda de entorno, que se registra y clasifica como ayuda. La respuesta sobre el indicador debe referirse a preparación, no a porcentaje de elegibilidad ni solicitud enviada.

### T7 · Continuar en el portal oficial — referencia: 180 segundos

**Inicio:** Mi Ruta. **Leer:** «Ahora la persona quiere comprobar cómo seguir con esta opción fuera de UMBRAL. Encuentra dónde debería continuar, muéstrame la página a la que llegaría y explica qué tendría que confirmar allí antes de actuar. Detente antes de iniciar sesión, inscribirte o escribir datos».

**Éxito observable:** vuelve a la ficha guardada, reconoce y abre el enlace al portal institucional, identifica que ha salido de UMBRAL y explica un requisito, condición o plazo a confirmar. Para Beca 18, continuar significa consultar información oficial para el caso correspondiente; no inscribir por primera vez en un plazo cerrado. Si la web externa no carga, detener el reloj durante la incidencia. Puede contarse éxito de UMBRAL con incidencia técnica sólo si identifica por sí misma el enlace y destino correctos, reconoce que el destino pertenece a la institución y explica una condición a confirmar a partir de la ficha. Si la incidencia impide observar alguno de esos elementos, registrar `no_observada` y lo que sí se pudo comprobar; no asumir comprensión. Si hay una interpretación equivocada observable, registrarla como tal y no ocultarla como incidencia técnica.

## 6. Preguntas finales de comprensión y cierre — 5–8 minutos

Después de T7, abrir las tres fichas siguientes, una por vez. Rotar el orden para reducir el efecto de posición: P01/P04: Beca 18 → Capacíta-T → CSE; P02/P05: Capacíta-T → CSE → Beca 18; P03: CSE → Beca 18 → Capacíta-T. Este bloque mide comprensión después de usar el producto, no comprensión inicial sin exposición. No explicar las respuestas hasta registrarlas.

| Código | Ficha / pregunta para leer | Respuesta esperada, sólo para quien modera |
|---|---|---|
| C1 | Beca 18: «Esta persona nunca se había inscrito. ¿Qué puede hacer ahora con esta opción? ¿Qué te lo indica?» | La inscripción está cerrada. Los hitos posteriores son para inscritos/aptos; no implican reapertura. Puede consultar información, no inscribirse como si el plazo siguiera abierto. |
| C2 | Capacíta-T: «¿Cómo entiendes la disponibilidad de esta opción? ¿Qué tendrías que confirmar antes de elegir un curso?» | Servicio/catálogo continuo sin cierre general confirmado. La vigencia y condiciones de cada curso se consultan; «continuo» no garantiza cupo ni disponibilidad de todo curso para siempre. |
| C3 | CSE: «¿Qué se obtiene al usar esta guía y qué queda por hacer fuera de ella? ¿Hay algún apoyo ya concedido?» | Orientación para preparar una solicitud, sin beneficio concedido. ULE/autoridad competente tramitan/deciden. No es una beca ni afiliación automática. |
| C4 | «¿Qué crees que significan las marcas de Mi Ruta? ¿Qué ha pasado con una solicitud al marcar esas acciones? ¿Qué puedes concluir a partir de esas marcas y qué no puedes concluir?» | Preparación local; no se ha enviado ni aprobado una solicitud, ni se ha evaluado elegibilidad. |
| C5 | «¿Qué encontraste para Perú y para Colombia? Si cambiara el idioma, ¿cambiarían el país o sus reglas?» | Perú tiene el contenido inicial; Colombia y los otros países futuros aún no tienen información verificada. El idioma no cambia jurisdicción. |

Anotar `correcta`, `parcial`, `incorrecta` o `no_observada` **antes** de ayudas; conservar también si se corrige sola la persona o si necesita explicación. Una respuesta después de que el moderador enseñe la solución no sustituye la respuesta inicial de este bloque.

Preguntas abiertas de cierre:

1. «Después de usarla, ¿cómo explicarías UMBRAL a otra persona?»
2. «¿Qué fue lo más difícil o confuso? Muéstrame dónde ocurrió».
3. «¿En qué momento tuviste dudas sobre lo que iba a pasar?»
4. «¿Qué te ayudó a confiar en la información y qué necesitarías confirmar?»
5. «¿Qué cambiarías primero para que te resulte más fácil?»

No pedir una valoración positiva ni sugerir que las personas deberían preferir el diseño. Cerrar: «Gracias. Tus observaciones nos ayudarán a decidir qué revisar». Explicar al final las confusiones importantes que hayan quedado, sin convertir esa explicación en un resultado favorable del producto.

## 7. Respuestas de referencia para quien modera

| Registro | Institución | Requisito/condición que puede identificar | Fuente y presentación actuales |
|---|---|---|---|
| [Beca 18](https://umbral-review-20261111-nsail4u22-alvaro-s-projects1.vercel.app/opportunities/beca-18-2027) | Pronabec / Ministerio de Educación | Nacionalidad, secundaria, rendimiento y condiciones según modalidad; revisar edad/documentos en bases. | `pronabec.gob.pe`; tipo «Beca», estado «Inscripción cerrada», cierre 18-10-2026. |
| [Empleos Perú](https://umbral-review-20261111-nsail4u22-alvaro-s-projects1.vercel.app/opportunities/empleos-peru) | Ministerio de Trabajo y Promoción del Empleo | DNI y correo para el portal oficial; condiciones/cierre de cada vacante. | `gob.pe`; tipo «Servicio», estado «Servicio continuo». |
| [Capacíta-T](https://umbral-review-20261111-nsail4u22-alvaro-s-projects1.vercel.app/opportunities/capacita-t) | Ministerio de Trabajo y Promoción del Empleo | Registro y condiciones del curso; vigencia y evaluaciones. | `gob.pe` y `capacitacionlaboral.trabajo.gob.pe`; tipo «Servicio», estado «Servicio continuo». |
| [Tu Empresa](https://umbral-review-20261111-nsail4u22-alvaro-s-projects1.vercel.app/opportunities/tu-empresa) | Programa Nacional Tu Empresa / PRODUCE | Consultar documentos y costos externos del caso; no hay lista universal en la ficha. | `gob.pe`; tipo «Servicio», estado «Servicio continuo». |
| [CSE](https://umbral-review-20261111-nsail4u22-alvaro-s-projects1.vercel.app/opportunities/cse-peru) | OFIS y ULE de la municipalidad | Identidades del hogar; recibo eléctrico sólo si hay servicio; ULE del distrito. | `gob.pe`; clasificación «Procedimiento de orientación». Explica «sin convocatoria anual» y «no es una beca ni un beneficio». No se incluye entre los servicios continuos. |

**Tipo y disponibilidad son dimensiones distintas.** CSE se identifica como procedimiento de orientación; su disponibilidad se explica como «sin convocatoria anual». Registrar si la persona comprende esa naturaleza, sin explicarla antes de C3 ni dar por demostrada su claridad por una inspección técnica. No cambiar las etiquetas durante las cinco sesiones.

## 8. Tiempos, resultados y registro de incidentes

En la hoja por persona y el CSV registrar por cada T1–T7:

- `start_mm_ss` y `end_mm_ss`: posiciones del cronómetro de sesión, tomadas después de leer la instrucción y al terminar la tarea, incluida la explicación que forme parte de ella. No cronometrar dentro de la tarea el traslado del moderador a un punto de partida de rescate.
- `pause_seconds`: interrupciones ajenas al uso, problemas de red o preparación de un bloque; anotar el motivo. No pausar por lectura, duda, error o pensamiento en voz alta.
- `active_seconds = fin − inicio − pausas`. Medir segundos aproximados cuando sólo haya una persona moderando y marcarlo. `first_help_active_seconds`: tiempo activo hasta la primera ayuda; dejar vacío si no la hubo. Mantener el reloj tras ayudar para conocer el tiempo activo total.
- `help_level`: nivel máximo recibido en la tarea (`ninguna`, `A1`, `A2` o `A3`). `first_help_active_seconds` conserva el momento de la primera ayuda, aunque después aumente el nivel. Anotar la secuencia y palabras de todas las ayudas en observaciones; si fue ayuda de navegador, añadir `entorno`. Las preguntas neutrales de moderación no son ayuda. Un rescate A3 que ejecuta la solución se clasifica como `no_completa`, no como éxito con ayuda.
- `setup_by_moderator`: `si`/`no`. Describe una preparación anterior al inicio; no ocultar que una tarea previa falló.
- `outcome`: `sin_ayuda` si cumple el criterio por sí misma, aunque se corrija; `con_ayuda` si lo completa tras ayuda; `no_completa` si abandona, acaba con resultado incorrecto o el moderador ejecuta la solución; `no_observada` si no pudo intentarse por retirada, tiempo de sesión o incidencia ajena al producto. Una celda pendiente queda vacía.
- `comprehension`: `correcta`, `parcial`, `incorrecta` o `no_observada`, según la explicación anterior a una enseñanza del moderador. Separarla del éxito al pulsar controles.

Una confusión que la persona corrige por sí sola sigue registrada, aunque finalmente complete la tarea sin ayuda. Si una incidencia impide observar una tarea, excluirla de su denominador y explicar qué falta; no transformarla en éxito ni fracaso. No rellenar tiempos o respuestas desde memoria incierta: marcar «no registrado» en notas y dejar la cifra vacía.

En el registro de incidentes usar un ID (`E01`, `E02`...), tarea, pantalla, acción/frase observada, resultado esperado, ayuda y recuperación. Clasificar `kind` como `navegacion`, `filtros`, `lectura`, `estado`, `fuente`, `guardado`, `persistencia`, `progreso`, `jurisdiccion`, `portal`, `datos` o `tecnico`. Describir la causa como hipótesis, no como hecho si no está comprobada. Usar un `issue_group` común para repeticiones del mismo problema; contar personas afectadas, no clics repetidos.

| Impacto | Regla de clasificación |
|---|---|
| `critico` | Confusión persistente que puede llevar a actuar con un plazo cerrado, interpretar CSE/guardado como concesión o aprobación, aplicar reglas de otro país, o introducir datos reales en el lugar equivocado. También pérdida de progreso reproducida que impida confiar en la preparación. Una sola persona basta para revisar antes de recomendar publicación. |
| `mayor` | Impide encontrar, comprender, guardar, preparar o continuar sin ayuda; exige un rodeo importante. |
| `menor` | Duda o error recuperable por sí misma, sin impedir la tarea ni inducir una actuación equivocada. |
| `tecnico` | Red, portal externo o entorno de prueba impiden observar la tarea. No atribuirlo automáticamente a UMBRAL; investigar la causa. |

## 9. Consolidar y decidir después de las cinco sesiones

Completar la plantilla con los siete resultados y tiempos por persona, C1–C5, incidencias agrupadas y evidencia concreta. Informar fracciones como «4 de 5», con el número real observado; no extrapolar porcentajes a la población ni afirmar significación estadística. Con cinco personas se buscan problemas y patrones, no una certificación del producto.

Esta ronda evalúa el uso en español. No constituye validación humana de la versión en inglés ni de todas las combinaciones de edad, categoría o dispositivo.

Criterios propuestos antes de observar resultados:

1. **Claridad de identidad:** al menos 4 de 5 explican en T1 una utilidad de descubrir y comprender/preparar oportunidades, sin limitar UMBRAL exclusivamente a CSE. No exigir mencionar todos los sectores ni una fórmula exacta.
2. **Recorrido principal:** al menos 4 de 5 completan cada T2–T7 sin ayuda. En T3 conservar a–d para localizar el filtro problemático; éxito global exige sus cuatro bloques. Examinar separadamente ayudas de entorno. Si faltan observaciones, indicar evidencia insuficiente para el criterio, sin cambiar el denominador a cinco ni relajar el objetivo a posteriori.
3. **Comprensión esencial:** las cinco personas observadas deben distinguir en C1–C4 inscripción cerrada, servicio continuo, CSE como orientación y progreso como preparación; C5 debe descartar trasladar reglas de Perú a otro país. Una respuesta parcial o incorrecta requiere analizar la evidencia; una confusión crítica persistente bloquea recomendar publicación, aunque la navegación haya sido rápida.
4. **Patrones:** si dos o más personas tropiezan con el mismo control, etiqueta, requisito o ruta, proponer una corrección concreta basada en ese hallazgo. Revisar también un caso único de impacto alto. La lentitud por sí sola o una preferencia estética no justifican rediseñar.

Elegir una de estas recomendaciones, con justificación y evidencia:

- **Corregir y volver a probar:** hay confusión crítica o un obstáculo relevante repetido; describir el cambio mínimo a evaluar y las tareas que habría que repetir tras una autorización. No implementarlo durante estas sesiones.
- **Completar evidencia:** faltan sesiones/tareas, hubo incidencias técnicas o el patrón no está claro; completar observaciones o repetir el bloque afectado, registrando el cambio de protocolo si lo hubiera.
- **Validación de producto suficiente para solicitar una decisión de publicación:** se cumplen los criterios y no quedan confusiones críticas sin resolver. Documentar limitaciones y observaciones menores. Esto no publica la aplicación ni sustituye la autorización posterior.

Mantener la versión congelada durante las cinco sesiones. Si se autoriza una corrección después, registrar la nueva versión y volver a probar las tareas afectadas; no mezclar sus resultados con los de esta ronda. `main`, producción, diseño y funcionalidades permanecen intactos mientras se realiza la validación humana.
