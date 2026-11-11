import { OfficialSource, ULEInfo } from '../types';

export const officialSources: OfficialSource[] = [
  {
    id: 'sisfoh',
    name: {
      es: 'Sistema de Focalización de Hogares (SISFOH)',
      en: 'Household Targeting System (SISFOH)',
    },
    url: 'https://www.gob.pe/sisfoh',
    description: {
      es: 'Portal oficial del SISFOH - Ministerio de Desarrollo e Inclusión Social',
      en: 'Official SISFOH portal - Ministry of Development and Social Inclusion',
    },
    verifiedDate: '2026-11-10',
    isVerified: true,
  },
  {
    id: 'midis',
    name: {
      es: 'Ministerio de Desarrollo e Inclusión Social (MIDIS)',
      en: 'Ministry of Development and Social Inclusion (MIDIS)',
    },
    url: 'https://www.gob.pe/midis',
    description: {
      es: 'Información sobre programas sociales y clasificación socioeconómica',
      en: 'Information about social programs and socioeconomic classification',
    },
    verifiedDate: '2026-11-10',
    isVerified: true,
  },
  {
    id: 'gob_pe',
    name: {
      es: 'Plataforma del Estado Peruano',
      en: 'Peruvian State Platform',
    },
    url: 'https://www.gob.pe',
    description: {
      es: 'Portal oficial con información sobre trámites gubernamentales',
      en: 'Official portal with information about government procedures',
    },
    verifiedDate: '2026-11-10',
    isVerified: true,
  },
];

export const uleChiclayoInfo: ULEInfo = {
  name: {
    es: 'Unidad Local de Empadronamiento (ULE)',
    en: 'Local Registration Unit (ULE)',
  },
  city: 'Chiclayo',
  address: {
    es: 'Cada distrito de Chiclayo cuenta con su propia ULE',
    en: 'Each district in Chiclayo has its own ULE',
  },
  hours: {
    es: 'Horario referencial: Lunes a Viernes, 8:00 AM - 1:00 PM y 2:00 PM - 5:00 PM',
    en: 'Reference schedule: Monday to Friday, 8:00 AM - 1:00 PM and 2:00 PM - 5:00 PM',
  },
  notes: {
    es: 'La ULE se encuentra en la municipalidad de tu distrito (Chiclayo, José Leonardo Ortiz, La Victoria, etc.). Cada distrito tiene su propia oficina dentro de la Gerencia de Desarrollo Social. Te recomendamos contactar directamente con tu municipalidad distrital para confirmar la ubicación exacta y horarios actualizados. Fuente: gob.pe - Verificado 2026-11-10',
    en: 'The ULE is located at your district municipality (Chiclayo, José Leonardo Ortiz, La Victoria, etc.). Each district has its own office within the Social Development Office. We recommend contacting your district municipality directly to confirm the exact location and updated schedules. Source: gob.pe - Verified 2026-11-10',
  },
  lastVerified: '2026-11-10',
};
