import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useConsentSettings } from '@/contexts/ConsentContext';
import { registerOptionalService } from '@/lib/consent';

export default function ContinuoSignup() {
  const { language, lp } = useLanguage();
  const { openSettings } = useConsentSettings();
  const [enabled, setEnabled] = useState(false);
  useEffect(() => registerOptionalService('external', () => {
    setEnabled(true);
    return () => {
      // Unload immediately; let React remove its own DOM node during rendering.
      const frame = document.querySelector('iframe[data-continuo-signup]');
      if (frame instanceof HTMLIFrameElement) frame.src = 'about:blank';
      setEnabled(false);
    };
  }), []);
  const fr = language === 'fr';
  return <div className="mt-8 border-y border-border py-6">
    {enabled ? <iframe data-continuo-signup src="https://lecontinuo.substack.com/embed"
      title={fr ? 'S’abonner à Continuo sur Substack' : 'Subscribe to Continuo on Substack'}
      className="h-[420px] w-full border-0 bg-background" referrerPolicy="no-referrer" /> : <>
      <p className="text-sm text-muted-foreground">{fr
        ? 'Le formulaire d’abonnement est hébergé par Substack. Pour l’afficher ici, autorisez les contenus externes dans vos choix de cookies.'
        : 'The signup form is hosted by Substack. To display it here, allow external content in your cookie choices.'}</p>
      <Button variant="outline" className="mt-4" onClick={openSettings}>{fr ? 'Gérer mes cookies' : 'Cookie settings'}</Button>
    </>}
    <p className="mt-4 text-sm text-muted-foreground">{fr
      ? 'Substack reçoit votre adresse e-mail si vous vous abonnez et gère la confirmation. Vous pouvez vous désabonner depuis chaque lettre.'
      : 'Substack receives your email if you subscribe and handles confirmation. You can unsubscribe from any letter.'} <a href={lp('/confidentialite')} className="underline">{fr ? 'Confidentialité' : 'Privacy'}</a></p>
  </div>;
}