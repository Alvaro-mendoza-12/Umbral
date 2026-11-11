import type { OfficialSource, ULEInfo } from '../../../types';

export const ULE_DIRECTORY_URL = "https://www.gob.pe/90813-conocer-la-direccion-de-la-unidad-local-de-empadronamiento-de-tu-municipalidad";

export const officialSources: OfficialSource[] = [
  {
    "id": "directiva_010",
    "name": {
      "es": "RM 178-2024-MIDIS: Directiva 010-2024 del SISFOH",
      "en": "RM 178-2024-MIDIS: SISFOH Directive 010-2024"
    },
    "url": "https://www.gob.pe/institucion/midis/normas-legales/6217612-178-2024-midis",
    "description": {
      "es": "Publicada el 22-11-2024. Define hogar y solicitante, documentación, S100, asistencia y plazos (§4.1, §5.4, §6.2 y §6.4). Certeza alta documental; no confirma atención local.",
      "en": "Published 22-11-2024. Defines household and applicant, documents, S100, assistance and time limits (§4.1, §5.4, §6.2 and §6.4). High documentary certainty; does not confirm local service."
    },
    "verifiedDate": "2026-11-10",
    "isVerified": true
  },
  {
    "id": "solicitar_cse",
    "name": {
      "es": "OFIS: solicitar la CSE de tu hogar",
      "en": "OFIS: apply for your household’s CSE"
    },
    "url": "https://www.gob.pe/83555-solicitar-la-clasificacion-socioeconomica-cse-de-tu-hogar",
    "description": {
      "es": "Actualizada el 29-05-2025. Requisitos y tres pasos: solicitud, recojo de información y resultado; plazo desde el día siguiente del S100. Certeza alta documental. No se usa el color del formulario como regla universal.",
      "en": "Updated 29-05-2025. Requirements and three steps: application, information collection and result; time limit starts the day after S100. High documentary certainty. Form color is not treated as a universal rule."
    },
    "verifiedDate": "2026-11-10",
    "isVerified": true
  },
  {
    "id": "faq_midis",
    "name": {
      "es": "MIDIS: preguntas frecuentes de CSE",
      "en": "MIDIS: CSE frequently asked questions"
    },
    "url": "https://www.gob.pe/43477-el-sistema-de-focalizacion-de-hogares-sisfoh-preguntas-frecuentes",
    "description": {
      "es": "Actualizada el 22-11-2024. Aclara domicilio del DNI (CSE 16), gratuidad y ausencia de afiliación automática (IPF 1). Certeza alta sobre estas respuestas; contiene referencias institucionales y enlaces antiguos.",
      "en": "Updated 22-11-2024. Clarifies DNI address (CSE 16), free applications and no automatic enrollment (IPF 1). High certainty for these answers; contains older institutional references and links."
    },
    "verifiedDate": "2026-11-10",
    "isVerified": true
  },
  {
    "id": "consulta_cse",
    "name": {
      "es": "OFIS: consultar CSE y descargar constancia",
      "en": "OFIS: check CSE and download the certificate"
    },
    "url": "https://www.gob.pe/81970",
    "description": {
      "es": "Actualizada el 04-11-2026. Acceso al servicio oficial de consulta; ingresa allí tus datos, nunca en UMBRAL. Certeza documental alta; no probado con datos personales. Para el estado de tu solicitud, consulta con la ULE.",
      "en": "Updated 04-11-2026. Access to the official consultation service; enter your information there, never in UMBRAL. High documentary certainty; not tested with personal data. For application status, ask the ULE."
    },
    "verifiedDate": "2026-11-10",
    "isVerified": true
  },
  {
    "id": "directorio_ule",
    "name": {
      "es": "OFIS: directorio oficial de ULE",
      "en": "OFIS: official ULE directory"
    },
    "url": "https://www.gob.pe/90813-conocer-la-direccion-de-la-unidad-local-de-empadronamiento-de-tu-municipalidad",
    "description": {
      "es": "Página modificada el 05-08-2026; reporte consultado con actualización visible 06-11-2026. Esa fecha es del reporte, no una confirmación de cada fila. Certeza alta sobre lo publicado y media operativa: sin llamada ni visita.",
      "en": "Page modified 05-08-2026; the consulted report shows an update of 06-11-2026. That is the report date, not confirmation of each entry. High certainty about the published data and medium operational certainty: no phone call or visit."
    },
    "verifiedDate": "2026-11-10",
    "isVerified": true
  }
];

export const uleChiclayoInfo: ULEInfo = {
  "name": {
    "es": "ULE del distrito de Chiclayo (140101)",
    "en": "ULE for Chiclayo district (140101)"
  },
  "city": "Chiclayo",
  "address": {
    "es": "Dirección publicada: San José 1394, esquina con av. Quiñones.",
    "en": "Published address: San José 1394, at the corner of av. Quiñones."
  },
  "hours": {
    "es": "Atención publicada: lunes a viernes, 08:00–15:00.",
    "en": "Published hours: Monday to Friday, 08:00–15:00."
  },
  "notes": {
    "es": "Fuente: directorio OFIS, reporte con actualización visible 06-11-2026, consultado el 10-11-2026. Certeza documental sobre la fila publicada; atención local sin confirmar por llamada o visita. Comprueba atención antes de trasladarte.",
    "en": "Source: OFIS directory, report showing an update of 06-11-2026, consulted on 10-11-2026. Documentary certainty about the published entry; local service not confirmed by phone or visit. Check service before travelling."
  },
  "lastVerified": "2026-11-10"
};
