import { useLanguage } from '@/contexts/LanguageContext';
import { FRENCH_PREVAILS } from '@/lib/legal';

export default function LegalTranslationNotice() {
  const { language } = useLanguage();
  return language === 'en' ? <p className="mb-6 border-l-2 border-primary pl-4 text-[15px] leading-relaxed">{FRENCH_PREVAILS}</p> : null;
}