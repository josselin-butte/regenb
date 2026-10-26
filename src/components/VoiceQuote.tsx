import { useLanguage } from '@/contexts/LanguageContext';
import { getVoice } from '@/content/voices';

interface VoiceQuoteProps {
  voiceKey: string;
  variant?: 'band' | 'inline';
  /** 'sm' : citation plus discrète, à insérer sous un texte existant. */
  size?: 'default' | 'sm';
}

/**
 * Citation sourcée d'une femme, bilingue via LanguageContext.
 * Rend rien si la clé ou la langue est absente.
 */
const VoiceQuote = ({ voiceKey, variant = 'inline', size = 'default' }: VoiceQuoteProps) => {
  const { language } = useLanguage();
  const voice = getVoice(voiceKey);
  if (!voice) return null;

  const quote = voice.quote[language];
  if (!quote) return null;

  const note = voice.note[language];
  const sourceWord = language === 'fr' ? 'Source' : 'Source';
  const sourceAria =
    language === 'fr'
      ? `Source : ${voice.sourceLabel} (nouvel onglet)`
      : `Source: ${voice.sourceLabel} (opens in a new tab)`;

  const figure = (
    <figure className={variant === 'inline' ? 'max-w-[40rem]' : 'max-w-measure mx-auto'}>
      <blockquote
        lang={language}
        className={
          size === 'sm'
            ? 'border-l-2 border-accent pl-4 font-serif text-[0.9375rem] leading-snug'
            : 'border-l-2 border-accent pl-5 font-serif text-[1.25rem] leading-[1.4] md:text-[1.5rem]'
        }
      >
        <p>{quote}</p>
      </blockquote>
      <figcaption className="mt-4 pl-5 font-sans text-sm text-foreground/90">
        <cite className="not-italic font-medium text-foreground">
          {voice.name}, {voice.year}
        </cite>
        {note ? <span className="mt-1 block text-[0.8125rem]">{note}</span> : null}
        <a
          href={voice.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={sourceAria}
          className="mt-1 block w-fit text-[0.8125rem] underline underline-offset-2 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {sourceWord}
        </a>
      </figcaption>
    </figure>
  );

  if (variant === 'band') {
    return (
      <section className="w-full py-16 md:py-24">
        <div className="container">{figure}</div>
      </section>
    );
  }

  return figure;
};

export default VoiceQuote;
