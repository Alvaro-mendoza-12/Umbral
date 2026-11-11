import type { ContentInstitution, ContentJurisdiction } from '../../../content';
import type { Opportunity, OpportunitySource, SourcedText } from '../domain/types';

const text = (es: string, en: string) => ({ es, en });
const item = (id: string, es: string, en: string, ...sourceIds: string[]): SourcedText => ({ id, text: text(es, en), sourceIds });
export const categories = ['education', 'employment', 'training', 'enterprise', 'family'] as const;
export const audiences = ['students', 'jobseekers', 'learners', 'entrepreneurs', 'households'] as const;
export const jurisdictions: readonly ContentJurisdiction[] = [
  { id: 'PE-national', countryCode: 'PE', level: 'national', name: text('Todo Perú', 'All of Peru') },
  { id: 'PE-140101', countryCode: 'PE', level: 'local', parentId: 'PE-national', administrativeType: 'distrito', officialCode: '140101', name: text('Chiclayo, Lambayeque (orientación local)', 'Chiclayo, Lambayeque (local guidance)') },
];
export const institutions: readonly ContentInstitution[] = [
  { id: 'pronabec', countryCode: 'PE', name: text('Pronabec · Ministerio de Educación', 'Pronabec · Ministry of Education'), role: 'scholarship-provider', sourceIds: ['beca18', 'prepare'] },
  { id: 'mtpe', countryCode: 'PE', name: text('Ministerio de Trabajo y Promoción del Empleo', 'Ministry of Labour and Employment Promotion'), role: 'service-provider', sourceIds: ['empleos', 'capacita', 'capacita-faq'] },
  { id: 'produce', countryCode: 'PE', name: text('Programa Nacional Tu Empresa · PRODUCE', 'Tu Empresa National Programme · PRODUCE'), role: 'business-guidance', sourceIds: ['empresa'] },
  { id: 'ofis', countryCode: 'PE', name: text('OFIS y ULE de tu municipalidad', 'OFIS and your municipal ULE'), role: 'classification-authority-and-local-intake', sourceIds: ['cse', 'ule'] },
];
export const sources: readonly OpportunitySource[] = [
  { id: 'beca18', institutionId: 'pronabec', title: text('Beca 18: convocatoria 2027 y cronograma', 'Beca 18: 2027 call and schedule'), url: 'https://www.pronabec.gob.pe/Beca-18/', consultedAt: '2026-11-11' },
  { id: 'prepare', institutionId: 'pronabec', title: text('Preparación para el examen de preselección', 'Preparation for the preselection exam'), url: 'https://www.pronabec.gob.pe/preparate/', consultedAt: '2026-11-11' },
  { id: 'empleos', institutionId: 'mtpe', title: text('Gob.pe: buscar trabajo en Empleos Perú', 'Gob.pe: find work through Empleos Perú'), url: 'https://www.gob.pe/23475-buscar-trabajo-en-el-portal-empleos-peru', consultedAt: '2026-11-11' },
  { id: 'capacita', institutionId: 'mtpe', title: text('MTPE: Capacíta-T', 'MTPE: Capacíta-T'), url: 'https://www.gob.pe/institucion/mtpe/campa%C3%B1as/126727-capacita-t', consultedAt: '2026-11-11' },
  { id: 'capacita-faq', institutionId: 'mtpe', title: text('Capacíta-T: preguntas frecuentes', 'Capacíta-T: frequently asked questions'), url: 'https://capacitacionlaboral.trabajo.gob.pe/preguntas-frecuentes/', consultedAt: '2026-11-11' },
  { id: 'empresa', institutionId: 'produce', title: text('PRODUCE: Crea tu empresa', 'PRODUCE: Crea tu empresa'), url: 'https://www.gob.pe/institucion/tuempresa/campa%C3%B1as/54791-crea-tu-empresa', consultedAt: '2026-11-11' },
  { id: 'cse', institutionId: 'ofis', title: text('OFIS: solicitar la CSE del hogar', 'OFIS: apply for a household CSE'), url: 'https://www.gob.pe/83555-solicitar-la-clasificacion-socioeconomica-cse-de-tu-hogar', consultedAt: '2026-11-11' },
  { id: 'ule', institutionId: 'ofis', title: text('OFIS: directorio oficial de ULE', 'OFIS: official ULE directory'), url: 'https://www.gob.pe/90813-conocer-la-direccion-de-la-unidad-local-de-empadronamiento-de-tu-municipalidad', consultedAt: '2026-11-11' },
];
const verification = { status: 'documentary', checkedAt: '2026-11-11', reviewBy: '2026-12-11' } as const;
export const opportunities: readonly Opportunity[] = [
  {
    id: 'beca-18-2027', countryCode: 'PE', jurisdictionId: 'PE-national', localGuidanceIds: [], institutionId: 'pronabec', category: 'education', audiences: ['students'], kind: 'scholarship',
    title: text('Beca 18 · convocatoria 2027', 'Beca 18 · 2027 call'),
    summary: text('Beca para estudios superiores. La inscripción al examen ya cerró; el proceso continúa para inscritos.', 'Higher education scholarship. Exam registration has closed; the process continues for registered applicants.'),
    audienceDescription: text('Peruanos en último año de secundaria o egresados, con rendimiento académico y condición de vulnerabilidad según modalidad.', 'Peruvians in their final school year or school graduates, with academic achievement and vulnerability criteria depending on the category.'),
    requirements: [
      item('nationality', 'Nacionalidad peruana y estar en el último grado de secundaria o haber egresado.', 'Peruvian nationality and being in the final school year or a school graduate.', 'beca18'),
      item('achievement', 'Acreditar rendimiento académico y vulnerabilidad o situación especial según modalidad. Revisar sus límites de edad y documentos en las bases.', 'Document academic achievement and vulnerability or special circumstances for the category. Check its age limits and documents in the rules.', 'beca18'),
    ],
    conditions: [item('conditions', 'Los límites de edad y beneficios varían por modalidad. Estar inscrito o apto para el examen no garantiza la beca.', 'Age limits and benefits vary by category. Registration or exam admission does not guarantee a scholarship.', 'beca18')],
    steps: [
      item('rules', 'Leer las bases y condiciones de la modalidad.', 'Read the rules and conditions for the category.', 'beca18'),
      item('registration', 'Si ya te inscribiste, consultar la lista de aptos y tu buzón oficial.', 'If already registered, check the admitted applicant list and official inbox.', 'beca18'),
      item('exam', 'Si figuras como apto, revisar las instrucciones y preparar el examen.', 'If admitted to the exam, review the instructions and prepare.', 'prepare'),
    ],
    availability: { status: 'closed', opensOn: '2026-10-09', closesOn: '2026-10-18', description: text('Inscripción cerrada el 18/10/2026. Las siguientes fechas corresponden a quienes ya se inscribieron; no son una reapertura.', 'Registration closed on 18 Oct 2026. The following dates apply to registered applicants; registration has not reopened.'), dates: [
      { date: '2026-10-18', label: text('Cierre de inscripción al examen', 'Exam registration deadline'), sourceId: 'beca18' },
      { date: '2026-11-11', label: text('Publicación programada de aptos', 'Scheduled admitted applicant list'), sourceId: 'beca18' },
      { date: '2026-11-22', label: text('Examen para postulantes aptos', 'Exam for admitted applicants'), sourceId: 'prepare' },
      { date: '2026-12-23', label: text('Lista programada de preseleccionados', 'Scheduled preselected applicant list'), sourceId: 'beca18' },
    ] },
    sourceIds: ['beca18', 'prepare'], officialUrl: sources[0].url, verification,
  },
  {
    id: 'empleos-peru', countryCode: 'PE', jurisdictionId: 'PE-national', localGuidanceIds: [], institutionId: 'mtpe', category: 'employment', audiences: ['jobseekers'], kind: 'service',
    title: text('Buscar trabajo en Empleos Perú', 'Find work through Empleos Perú'),
    summary: text('Portal público para buscar ofertas por puesto y ubicación. Cada vacante tiene sus propias condiciones.', 'Public portal to search jobs by role and location. Each vacancy has its own conditions.'),
    audienceDescription: text('Personas mayores de 18 años que buscan empleo.', 'People over 18 looking for work.'),
    requirements: [item('requirements', 'DNI y correo electrónico para crear la cuenta en el portal oficial.', 'DNI and email to create an account on the official portal.', 'empleos')],
    conditions: [item('conditions', 'Confirmar requisitos, ubicación y cierre de cada oferta. UMBRAL no verifica vacantes individuales ni realiza postulaciones.', 'Confirm each job’s requirements, location and deadline. UMBRAL does not verify individual vacancies or submit applications.', 'empleos')],
    steps: [
      item('profile', 'Revisar cómo crear tu perfil en el portal oficial.', 'Review how to create your profile on the official portal.', 'empleos'),
      item('search', 'Buscar por puesto y lugar de trabajo.', 'Search by role and workplace location.', 'empleos'),
      item('vacancy', 'Leer la oferta y preparar los documentos que solicite.', 'Read the vacancy and prepare the documents it requests.', 'empleos'),
    ],
    availability: { status: 'ongoing', description: text('Servicio continuo publicado. No hay un cierre general confirmado; cada oferta fija sus fechas.', 'Published ongoing service. No overall closing date is confirmed; each vacancy has its own dates.'), dates: [] },
    sourceIds: ['empleos'], officialUrl: sources[2].url, verification,
  },
  {
    id: 'capacita-t', countryCode: 'PE', jurisdictionId: 'PE-national', localGuidanceIds: [], institutionId: 'mtpe', category: 'training', audiences: ['learners', 'jobseekers'], kind: 'service',
    title: text('Capacíta-T · cursos gratuitos', 'Capacíta-T · free courses'),
    summary: text('Formación virtual para desarrollar competencias laborales, con cursos gratuitos y evaluación.', 'Online training to develop work skills, with free courses and assessments.'),
    audienceDescription: text('Personas que quieren aprender o mejorar su perfil laboral.', 'People who want to learn or improve their work skills.'),
    requirements: [item('requirements', 'Registrarse en la plataforma oficial y consultar las condiciones del curso elegido.', 'Register on the official platform and check the selected course’s conditions.', 'capacita')],
    conditions: [item('conditions', 'Algunos cursos tienen vigencia. La certificación de un curso requiere aprobar sus evaluaciones; las rutas formativas no otorgan un certificado conjunto.', 'Some courses expire. Course certification requires passing assessments; learning paths do not provide a combined certificate.', 'capacita-faq')],
    steps: [
      item('choose', 'Elegir un curso y revisar su vigencia.', 'Choose a course and check its availability.', 'capacita-faq'),
      item('register', 'Revisar el registro y las condiciones en la plataforma oficial.', 'Review registration and conditions on the official platform.', 'capacita'),
      item('learn', 'Reservar tiempo para los contenidos y evaluaciones.', 'Set aside time for the content and assessments.', 'capacita-faq'),
    ],
    availability: { status: 'ongoing', description: text('Catálogo continuo, con disponibilidad propia de cada curso. Sin fecha única de cierre confirmada.', 'Ongoing catalogue; availability varies by course. No single closing date is confirmed.'), dates: [] },
    sourceIds: ['capacita', 'capacita-faq'], officialUrl: sources[3].url, verification,
  },
  {
    id: 'tu-empresa', countryCode: 'PE', jurisdictionId: 'PE-national', localGuidanceIds: [], institutionId: 'produce', category: 'enterprise', audiences: ['entrepreneurs'], kind: 'service',
    title: text('Tu Empresa · orientación para formalizar', 'Tu Empresa · business formalisation guidance'),
    summary: text('Canal digital gratuito de acompañamiento para formalizar una micro o pequeña empresa.', 'Free digital guidance channel for formalising a micro or small business.'),
    audienceDescription: text('Personas que quieren formalizar su negocio MYPE.', 'People who want to formalise a micro or small business.'),
    requirements: [item('requirements', 'Consultar al programa qué documentos corresponden a tu tipo de negocio. La página no publica una lista universal.', 'Ask the programme which documents apply to your business type. The page does not publish a universal list.', 'empresa')],
    conditions: [item('conditions', 'Confirmar cita, documentos y costos de trámites externos. La orientación gratuita no significa que toda la constitución sea gratuita.', 'Confirm appointments, documents and external filing costs. Free guidance does not mean the entire incorporation process is free.', 'empresa')],
    steps: [
      item('channel', 'Revisar los canales del programa en la página oficial.', 'Review the programme’s channels on the official page.', 'empresa'),
      item('questions', 'Preparar preguntas sobre los pasos y documentos del negocio.', 'Prepare questions about business steps and documents.', 'empresa'),
      item('confirm', 'Consultar costos y condiciones antes de continuar con la formalización.', 'Ask about costs and conditions before proceeding with formalisation.', 'empresa'),
    ],
    availability: { status: 'ongoing', description: text('Canal de orientación publicado, sin cierre confirmado. Confirmar la atención con el programa.', 'Published guidance channel, with no confirmed closing date. Confirm service with the programme.'), dates: [] },
    sourceIds: ['empresa'], officialUrl: sources[5].url, verification,
  },
  {
    id: 'cse-peru', countryCode: 'PE', jurisdictionId: 'PE-national', localGuidanceIds: ['PE-140101'], institutionId: 'ofis', category: 'family', audiences: ['households'], kind: 'procedure',
    title: text('CSE · preparar la primera solicitud', 'CSE · prepare a first application'),
    summary: text('Orientación para solicitar la Clasificación Socioeconómica del hogar. No es una beca ni un beneficio.', 'Guidance for requesting a household Socioeconomic Classification. This is not a scholarship or a benefit.'),
    audienceDescription: text('Un integrante adulto del hogar, ante la ULE del distrito donde vive.', 'An adult household member, through the ULE in their district of residence.'),
    requirements: [item('requirements', 'Documentos de identidad del hogar y recibo eléctrico de hasta tres meses sólo si hay servicio.', 'Household identity documents and an electricity bill up to three months old only if the home has electricity.', 'cse')],
    conditions: [item('conditions', 'La CSE no afilia automáticamente a programas. Verificar la ULE competente; la orientación de oficina de esta guía sólo corresponde a Chiclayo.', 'CSE does not automatically enrol you in programmes. Check your local ULE; this guide’s office guidance applies only to Chiclayo.', 'cse', 'ule')],
    steps: [
      item('ule', 'Identificar la ULE del distrito de residencia.', 'Identify the ULE for your district of residence.', 'ule'),
      item('documents', 'Revisar documentos y dudas con la guía CSE conservada.', 'Review documents and questions with the existing CSE guide.', 'cse'),
      item('receipt', 'Preparar la consulta sobre S100 y constancia de presentación.', 'Prepare questions about S100 and the submission receipt.', 'cse'),
    ],
    availability: { status: 'ongoing', description: text('Procedimiento sin convocatoria anual. Confirmar horario y atención con la ULE; no se han comprobado por llamada.', 'Procedure without an annual application call. Confirm opening hours and service with the ULE; these have not been checked by phone.'), dates: [] },
    sourceIds: ['cse', 'ule'], officialUrl: sources[6].url, verification, guidePath: '/cse',
  },
];
