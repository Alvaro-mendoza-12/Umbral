export interface TranslatedContent {
  es: string;
  en: string;
}

export interface GuideStep {
  id: number;
  title: TranslatedContent;
  content: TranslatedContent;
  sources?: OfficialSource[];
}

export interface ChecklistItem {
  id: string;
  category: TranslatedContent;
  item: TranslatedContent;
  description?: TranslatedContent;
  required: boolean;
}

export interface FAQItem {
  id: string;
  question: TranslatedContent;
  answer: TranslatedContent;
  category: TranslatedContent;
}

export interface OfficialSource {
  id: string;
  name: TranslatedContent;
  url?: string;
  verifiedDate: string;
  description?: TranslatedContent;
  isVerified: boolean;
}

export interface ULEInfo {
  name: TranslatedContent;
  city: string;
  address?: TranslatedContent;
  phone?: string;
  hours?: TranslatedContent;
  notes: TranslatedContent;
  lastVerified?: string;
}

export type Language = 'es' | 'en';

export interface ChecklistState {
  [itemId: string]: boolean;
}
