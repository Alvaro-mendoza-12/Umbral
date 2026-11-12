# Contrato de contenido internacional

`src/content/index.ts` publica el registro de países y los resolutores. `getCountry(code)` normaliza el código ISO; `getAvailableProcedures(code)` devuelve sólo procedimientos publicados de ese país. `getProcedure(code, id)` devuelve el paquete o `undefined`. Un país desconocido, planificado o sin ese procedimiento nunca recibe contenido de Perú como alternativa.

Perú publica únicamente `cse`. México, Colombia y España figuran como `planned`, con `procedures: []`. Añadir un país exige su propio paquete revisado y una entrada explícita en el registro; un idioma no determina el país ni hace equivalentes sus procedimientos.

`src/content/pe/cse` conserva los bloques ES/EN, la lista de preparación y las fuentes. La introducción del paso 4 se generalizó para todos los distritos de Perú; el apartado específico de Chiclayo permanece delimitado. No se modificaron los requisitos oficiales. El paquete declara país, jurisdicción nacional, instituciones documentadas, requisitos con condiciones y referencias, pasos, idiomas mantenidos manualmente, fecha de consulta y estado `reviewed-as-of`. La orientación local de Chiclayo pertenece al distrito `140101`; no delimita la cobertura nacional ni se extiende a otros distritos. El modelo admite `needs-review` y `withdrawn`; el registro sólo ofrece paquetes revisados.

La revisión documental del 10-11-2026 no certifica vigencia futura ni atención efectiva de oficinas. Las casillas son acciones de preparación (`preparation-only`), separadas de los requisitos del procedimiento y sus condiciones. Los módulos `src/data` sólo reexportan los datos para conservar las pantallas y la impresión actuales.

`getTranslationResources(countryCode, procedureId)` combina las cadenas generales de interfaz con el paquete resuelto y devuelve `undefined` si no existe. Las rutas actuales utilizan explícitamente `PE/cse`, conservando `/guide`. Una futura pantalla de otro país debe resolver primero el par y mostrar el estado sin guías cuando no exista contenido, sin conservar o cargar la CSE peruana.
