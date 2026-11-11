# UMBRAL: oportunidades concretas

[Abrir la nueva vista previa pública](https://umbral-review-20261111-cmxyf4wkj-alvaro-s-projects1.vercel.app)

Rama: `codex/verified-opportunities-evolution`. Commit de aplicación desplegado: `9ff9f1ea96cf8510f34bdc73f2cf8ec650a08b92`. Parte de `codex/opportunity-companion-mvp` (`03972e1`). Los commits posteriores sólo registran esta entrega y sus evidencias.

## Qué probar

La portada ofrece seis categorías. Cada ficha presenta beneficio, destinatarios, fechas y acción oficial antes de los detalles desplegables. Mi Ruta conserva tareas, progreso, fechas, descarga e impresión. País e idioma persisten por separado. Los portales generales se muestran como recursos complementarios; las convocatorias vencidas y registros sin revisión vigente no aparecen en la búsqueda inicial ni ofrecen una acción de postulación.

## Contenido y fuentes

14 oportunidades nuevas y el trámite CSE conservado. Consulta documental: **11 de noviembre de 2026**. Los enlaces de esta tabla son fuentes oficiales específicas; cada ficha incluye también el destino de solicitud/inscripción y las instrucciones para continuar.

| País | Oportunidad | Tipo y categorías |
| --- | --- | --- |
| Perú | [Promigas: auxiliar de facturación, Trujillo](https://soycapaz.conadisperu.gob.pe/jobs/vacante-196b171e) | Vacante · empleo |
| Perú | [Xylem: técnico electromecánico, San Marcos](https://soycapaz.conadisperu.gob.pe/jobs/vacante-d643c58d) | Vacante inclusiva · empleo |
| Perú | [ABC Digital, MTPE](https://capacitacionlaboral.trabajo.gob.pe/cursos/abc-digital/) | Curso · formación/tecnología |
| Perú | [InnovaSuyu, La Libertad, segunda convocatoria 2026](https://innovasuyu.proinnovate.gob.pe/concursos-regionales-2026-la-libertad-emprendimientos-innovadores-segunda-convocatoria/) | Capital semilla · emprendimiento/tecnología |
| Perú | [CSE del hogar](https://www.gob.pe/83555-solicitar-la-clasificacion-socioeconomica-cse-de-tu-hogar) | Procedimiento · apoyo familiar |
| EE. UU. | [VA: Registered Nurse, Johnson City](https://www.usajobs.gov/job/889380900) | Vacante · empleo |
| EE. UU. | [Federal Pell Grant 2026–27](https://studentaid.gov/understand-aid/types/grants/pell) | Ayuda educativa · educación |
| EE. UU. | [SBA Microloan](https://www.sba.gov/funding-programs/loans/microloans) | Préstamo · emprendimiento |
| México | [NAFIN: Mujeres Empresarias](https://www.nafin.com/portalnf/content/financiamiento/mujeres-empresarias.html) | Préstamo · emprendimiento |
| México | [UNAM: Excel 2010, curso 17](https://aprendomasplus.cuaed.unam.mx/course/view.php?id=17) | Curso · formación |
| Colombia | [SENA: English Does Work, Level 1, oferta regular](https://betowa.sena.edu.co/oferta/english-does-work-level-1?modality=V&offertype=regular&programId=188774) | Curso · formación |
| Colombia | [Fondo Emprender 168: Volver a Crecer](https://www.fondoemprender.com/SitePages/FondoEmprenderConv1682026.aspx) | Capital semilla condicionado · emprendimiento |
| España | [ENISA: Emprendedoras Digitales](https://www.enisa.es/servicios/financiacion/emprendedoras-digitales) | Préstamo · emprendimiento/tecnología |
| España | [Gestión de seguridad informática IFCT050PO, ficha 94](https://www.juntadeandalucia.es/empleoformacionytrabajoautonomo/formacion/web/buscador-de-cursos/94) | Curso · tecnología/formación |
| Internacional | [Harvard CS50x 2026](https://cs50.harvard.edu/x/2026/) | Curso · tecnología/formación/educación |

CS50x se muestra en los cinco países con su alcance internacional indicado. El selector de país describe el lugar/alcance, no determina la ciudadanía ni la elegibilidad. Cada ficha separa requisitos de residencia, autorización laboral, empresa o nacionalidad cuando la fuente los publica.

## Evidencia

- `npm run lint`, 44 pruebas unitarias y build aprobados. [Suite local: 424 pruebas aprobadas](results/playwright.json), con seis recorridos de aceptación en español/inglés y cuatro tamaños de pantalla, además de regresiones CSE, almacenamiento, impresión, offline, teclado y axe.
- [Fuentes y destinos oficiales](results/official-links.json), [comprobaciones adicionales y limitaciones de renderizado](results/official-links-followup.json). Se comprobó la identidad/contenido de los destinos; un HTTP 200 por sí solo no se trató como prueba de una convocatoria abierta. No se enviaron solicitudes ni se crearon cuentas externas.
- Capturas: [inicio móvil](screenshots/small-mobile/evolution---country=PE-es.png), [empleos en escritorio](screenshots/desktop/evolution--discover-country=PE-category=employment-es.png), [vacante móvil](screenshots/mobile/concrete-job-es.png), [educación EE. UU.](screenshots/desktop/us-education-en.png).
- [Vista pública: 24 pruebas aprobadas](results/public/playwright.json): los seis recorridos de aceptación en español/inglés a 360×640 y 1440×900. [Acceso anónimo y paquete coincidente](results/public/anonymous-and-bundle.json), [aislamiento de producción](results/isolation.json). Las últimas correcciones de texto de Xylem y fuente complementaria SENA se incluyen en el build público comprobado.

## Límites reales

- Es un catálogo editorial inicial, no exhaustivo: empleo propio en Perú y EE. UU.; México, Colombia y España tienen formación y financiación, todavía sin vacantes verificadas incorporadas. Apoyo familiar propio sólo en Perú. Las categorías vacías lo indican y no importan registros peruanos.
- Las dos vacantes peruanas proceden de una bolsa inclusiva; Xylem exige discapacidad física leve. La fuente no publica fecha de publicación ni periodicidad del salario: se indican como desconocidas. Las fechas de apertura de anuncio no se presentan como publicación.
- FAFSA en línea devolvió HTTP 200 pero falló al renderizar en Chromium automatizado; no se afirma haber completado ese portal. La acción principal abre el [formulario oficial 2026–27](https://studentaid.gov/sites/default/files/2026-27-fafsa-form.pdf), comprobado como PDF válido, con instrucciones de envío. La fuente en línea permanece como alternativa identificada.
- ENISA, NAFIN y Fondo Emprender requieren continuar el proceso indicado; no se inventa un formulario único. El curso andaluz es virtual, pero la ficha publica presentación presencial de su solicitud. UNAM advierte de indisponibilidad actual de constancias; no se promete una certificación.
- InnovaSuyu cierra el **13 de noviembre, 13:00 de Perú**. No se promete un monto individual ante cifras discrepantes de su página. Las demás fechas y horas publicadas se muestran en sus fichas. Se necesita revisión editorial posterior; no hay sincronización automática.
- Mi Ruta vive en este navegador y origen. No migra automáticamente desde otro dominio de vista previa. Sin cuentas, IA ni envío de datos a instituciones. Las sesiones humanas siguen pendientes; no hay entrevistas ni resultados inventados.

`main`, producción original, `.kiro/`, la guía CSE y los documentos originales de usabilidad se conservan. La validación automatizada no sustituye las cinco sesiones humanas ni decide la publicación definitiva.
