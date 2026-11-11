import { ChecklistItem } from '../types';

export const checklistItems: ChecklistItem[] = [
  // Documentos principales
  {
    id: 'dni_holder',
    category: { es: 'Documentos principales', en: 'Main documents' },
    item: { es: 'DNI vigente del jefe de familia', en: 'Valid ID of head of family' },
    description: { es: 'Original y copia', en: 'Original and copy' },
    required: true,
  },
  {
    id: 'dni_members',
    category: { es: 'Documentos principales', en: 'Main documents' },
    item: { es: 'DNI de todos los miembros adultos', en: 'ID of all adult members' },
    description: { es: 'Originales y copias', en: 'Originals and copies' },
    required: true,
  },
  // Documentos complementarios
  {
    id: 'birth_certificates',
    category: { es: 'Documentos complementarios', en: 'Complementary documents' },
    item: { es: 'Partidas de nacimiento de menores', en: 'Birth certificates of minors' },
    description: { es: 'Si hay menores en el hogar', en: 'If there are minors in the household' },
    required: false,
  },
  {
    id: 'utility_bills',
    category: { es: 'Documentos complementarios', en: 'Complementary documents' },
    item: { es: 'Recibos de luz y agua', en: 'Electricity and water bills' },
    description: { es: 'Últimos 2-3 meses', en: 'Last 2-3 months' },
    required: false,
  },
  {
    id: 'address_proof',
    category: { es: 'Documentos complementarios', en: 'Complementary documents' },
    item: { es: 'Constancia de domicilio', en: 'Proof of address' },
    description: { es: 'Si los servicios no están a tu nombre', en: 'If services are not in your name' },
    required: false,
  },
  {
    id: 'income_proof',
    category: { es: 'Documentos complementarios', en: 'Complementary documents' },
    item: { es: 'Documentos de ingresos', en: 'Income documents' },
    description: { es: 'Boletas de pago, constancias laborales', en: 'Pay stubs, work certificates' },
    required: false,
  },
  // Información del hogar
  {
    id: 'household_data',
    category: { es: 'Información del hogar', en: 'Household information' },
    item: { es: 'Datos de todos los miembros del hogar', en: 'Data of all household members' },
    description: { es: 'Nombres completos, edades, parentesco', en: 'Full names, ages, relationship' },
    required: true,
  },
  {
    id: 'address_complete',
    category: { es: 'Información del hogar', en: 'Household information' },
    item: { es: 'Dirección completa con referencia', en: 'Complete address with reference' },
    description: { es: 'Calle, número, distrito, referencias', en: 'Street, number, district, references' },
    required: true,
  },
  {
    id: 'housing_info',
    category: { es: 'Información del hogar', en: 'Household information' },
    item: { es: 'Información de la vivienda', en: 'Housing information' },
    description: { es: 'Tipo, materiales, servicios', en: 'Type, materials, services' },
    required: true,
  },
  // Información económica
  {
    id: 'income_info',
    category: { es: 'Información económica', en: 'Economic information' },
    item: { es: 'Información de ingresos del hogar', en: 'Household income information' },
    description: { es: 'Fuentes, montos aproximados', en: 'Sources, approximate amounts' },
    required: true,
  },
  {
    id: 'expenses_info',
    category: { es: 'Información económica', en: 'Economic information' },
    item: { es: 'Información de gastos principales', en: 'Main expenses information' },
    description: { es: 'Alimentación, servicios, educación, etc.', en: 'Food, services, education, etc.' },
    required: false,
  },
];
