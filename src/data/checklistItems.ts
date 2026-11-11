import { ChecklistItem } from '../types';

// Preparation actions, not an eligibility assessment. Used on screen and in print.
export const checklistItems: ChecklistItem[] = [
  {
    "id": "dni_holder",
    "category": {
      "es": "Documentos e identidad",
      "en": "Documents and identity"
    },
    "item": {
      "es": "Identifiqué al integrante adulto que puede solicitar",
      "en": "I identified the adult household member who can apply"
    },
    "description": {
      "es": "Puede ser cualquier integrante de 18 años o más; no tiene que ser jefe de familia ni propietario.",
      "en": "Any member aged 18 or older can apply; they do not have to be the head of the family or the owner."
    },
    "required": false
  },
  {
    "id": "dni_members",
    "category": {
      "es": "Documentos e identidad",
      "en": "Documents and identity"
    },
    "item": {
      "es": "Revisé los documentos de todos los integrantes",
      "en": "I reviewed identity documents for all household members"
    },
    "description": {
      "es": "DNI, CE o CPP según corresponda, incluidos menores. Consulta con la ULE otras identificaciones o falta temporal de documentos.",
      "en": "DNI, CE or CPP as applicable, including children. Ask the ULE about other identification or temporarily missing documents."
    },
    "required": false
  },
  {
    "id": "utility_bills",
    "category": {
      "es": "Documentos e identidad",
      "en": "Documents and identity"
    },
    "item": {
      "es": "Revisé si corresponde llevar recibo eléctrico",
      "en": "I checked whether an electricity bill is needed"
    },
    "description": {
      "es": "Hasta tres meses de antigüedad, sólo si la vivienda tiene el servicio. Si no lo tiene, no se exige ese recibo.",
      "en": "No more than three months old, only if the dwelling has electricity service. Otherwise, that bill is not required."
    },
    "required": false
  },
  {
    "id": "document_questions",
    "category": {
      "es": "Documentos e identidad",
      "en": "Documents and identity"
    },
    "item": {
      "es": "Anoté mis dudas sobre documentos",
      "en": "I noted my questions about documents"
    },
    "description": {
      "es": "Pide orientación si falta alguno. Un DNI con otra dirección no obliga por sí solo a actualizarlo antes de solicitar.",
      "en": "Ask for guidance if something is missing. A different DNI address alone does not require updating it before applying."
    },
    "required": false
  },
  {
    "id": "household_data",
    "category": {
      "es": "Información para declarar ante la ULE",
      "en": "Information to declare to the ULE"
    },
    "item": {
      "es": "Revisé quiénes integran mi hogar",
      "en": "I reviewed who belongs to my household"
    },
    "description": {
      "es": "Personas que comparten vivienda y presupuesto para necesidades básicas; no necesariamente todo el edificio.",
      "en": "People who share a dwelling and a budget for basic needs; not necessarily everyone in the building."
    },
    "required": false
  },
  {
    "id": "address_complete",
    "category": {
      "es": "Información para declarar ante la ULE",
      "en": "Information to declare to the ULE"
    },
    "item": {
      "es": "Identifiqué mi distrito de residencia actual y su ULE",
      "en": "I identified my current district of residence and its ULE"
    },
    "description": {
      "es": "Consulta sede y horario antes de trasladarte. Chiclayo distrito, José Leonardo Ortiz y La Victoria tienen distintas ULE.",
      "en": "Check the location and hours before travelling. Chiclayo district, José Leonardo Ortiz and La Victoria have different ULE offices."
    },
    "required": false
  },
  {
    "id": "housing_info",
    "category": {
      "es": "Información para declarar ante la ULE",
      "en": "Information to declare to the ULE"
    },
    "item": {
      "es": "Revisé la información de mi vivienda",
      "en": "I reviewed information about my dwelling"
    },
    "description": {
      "es": "Dirección actual, referencias, características y servicios. Declara la información al personal oficial, sin ingresarla aquí.",
      "en": "Current address, landmarks, characteristics and services. Give this information to official staff without entering it here."
    },
    "required": false
  },
  {
    "id": "income_info",
    "category": {
      "es": "Información para declarar ante la ULE",
      "en": "Information to declare to the ULE"
    },
    "item": {
      "es": "Sé que debo brindar información clara, completa y veraz",
      "en": "I know I must give clear, complete and truthful information"
    },
    "description": {
      "es": "Responde al formulario oficial y pide ayuda si no recuerdas un dato. Esta guía no exige boletas de ingresos como documento adicional.",
      "en": "Answer the official form and ask for help if you do not remember something. This guide does not require income slips as an additional document."
    },
    "required": false
  },
  {
    "id": "s100_receipt",
    "category": {
      "es": "Pasos del trámite",
      "en": "Application steps"
    },
    "item": {
      "es": "Sé que puedo pedir ayuda con el S100 y recibir una constancia",
      "en": "I know I can ask for help with S100 and receive a receipt"
    },
    "description": {
      "es": "Lee el consentimiento antes de firmar y guarda la constancia de presentación. La solicitud es gratuita.",
      "en": "Read the consent before signing and keep the submission receipt. The application is free."
    },
    "required": false
  },
  {
    "id": "waiting_time",
    "category": {
      "es": "Pasos del trámite",
      "en": "Application steps"
    },
    "item": {
      "es": "Revisé el plazo previsto y dónde consultar una demora",
      "en": "I reviewed the expected time limit and where to ask about a delay"
    },
    "description": {
      "es": "Hasta 25 días hábiles urbano o 40 rural desde el día siguiente del S100, sin garantía de atención observada. Consulta con la ULE.",
      "en": "Up to 25 working days urban or 40 rural from the day after S100, without a guarantee of observed service. Ask the ULE."
    },
    "required": false
  },
  {
    "id": "official_result",
    "category": {
      "es": "Pasos del trámite",
      "en": "Application steps"
    },
    "item": {
      "es": "Sé dónde consultar mi solicitud y el resultado oficial",
      "en": "I know where to check my application and official result"
    },
    "description": {
      "es": "Estado de solicitud: ULE. CSE y constancia: servicio OFIS en Recursos. Tener CSE no afilia automáticamente ni garantiza beneficios.",
      "en": "Application status: ULE. CSE and certificate: OFIS service in Resources. Having CSE does not automatically enroll you or guarantee benefits."
    },
    "required": false
  }
];
