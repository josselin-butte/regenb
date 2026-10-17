import { useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';
import { useConsentSettings } from '@/contexts/ConsentContext';
import { ACCEPT_ALL, REFUSE_ALL, readConsent, type ConsentChoices } from '@/lib/consent';
import { consentCopy } from '@/lib/consent-copy';

export default function ConsentManager() {
  const { language, lp } = useLanguage();
  const copy = consentCopy[language];
  const { needsChoice, panelOpen, openSettings, closeSettings, choose } = useConsentSettings();
  const [draft, setDraft] = useState<ConsentChoices>(REFUSE_ALL);
  const banner = useRef<HTMLElement>(null);
  const spacer = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (panelOpen) {
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const existing = readConsent();
      setDraft(existing ? { analytics: existing.analytics, external: existing.external, advertising: existing.advertising } : REFUSE_ALL);
    }
  }, [panelOpen]);
  useEffect(() => {
    if (!banner.current || !spacer.current) return;
    const observer = new ResizeObserver(entries => {
      if (spacer.current) spacer.current.style.height = `${entries[0].contentRect.height + 2}px`;
    });
    observer.observe(banner.current);
    return () => observer.disconnect();
  }, [needsChoice, panelOpen]);
  const equalButton = 'h-12 w-full whitespace-normal px-3 leading-tight';
  return <>
    {needsChoice && !panelOpen && <>
      <div ref={spacer} className="carnet-noprint" aria-hidden="true" />
      <section ref={banner} aria-labelledby="consent-title" className="consent-surface carnet-noprint fixed inset-x-0 bottom-0 z-50 max-h-[55dvh] overflow-y-auto border-t border-primary bg-background px-5 py-5 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-start justify-between gap-4">
            <h2 id="consent-title" className="text-lg">{copy.title}</h2>
            <Button variant="ghost" size="icon" className="shrink-0" aria-label={copy.close} title={copy.close} onClick={() => choose(REFUSE_ALL)}>×</Button>
          </div>
          <p className="mt-1 text-sm leading-relaxed">{copy.intro} <Link to={lp('/cookies')} className="underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{copy.more}</Link></p>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-4">
            <Button variant="outline" className={equalButton} onClick={() => choose(REFUSE_ALL)}>{copy.refuse}</Button>
            <Button variant="outline" className={equalButton} onClick={() => choose(ACCEPT_ALL)}>{copy.accept}</Button>
            <Button variant="outline" className={equalButton} onClick={openSettings}>{copy.customize}</Button>
          </div>
        </div>
      </section>
    </>}
    <Dialog.Root open={panelOpen} onOpenChange={open => { if (!open) closeSettings(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="carnet-noprint fixed inset-0 z-50 bg-foreground/30" />
        <Dialog.Content className="consent-surface carnet-noprint fixed left-1/2 top-1/2 z-50 max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto border border-primary bg-background p-5 sm:p-8" onCloseAutoFocus={event => { event.preventDefault(); if (previousFocus.current?.isConnected) previousFocus.current.focus(); }}>
          <div className="flex items-start justify-between gap-4">
            <Dialog.Title className="font-serif text-xl font-semibold">{copy.settings}</Dialog.Title>
            <Button variant="ghost" size="icon" aria-label={copy.dismiss} title={copy.dismiss} onClick={closeSettings}>×</Button>
          </div>
          <Dialog.Description className="mt-2 text-sm">{copy.description}</Dialog.Description>
          <div className="mt-6 divide-y divide-border text-sm">
            <div className="pb-5">
              <p className="font-semibold">{copy.necessary}</p><p className="mt-1 font-medium">{copy.active}</p><p className="mt-2">{copy.necessaryText}</p>
            </div>
            {(['analytics', 'external', 'advertising'] as const).map(category => <div key={category} className="py-5">
              <div className="flex items-center justify-between gap-4">
                <label htmlFor={`consent-${category}`} className="font-semibold">{copy[category]}</label>
                <Switch id={`consent-${category}`} checked={draft[category]} onCheckedChange={checked => setDraft(value => ({ ...value, [category]: checked }))} aria-describedby={`consent-${category}-description`} />
              </div>
              <p id={`consent-${category}-description`} className="mt-2">{copy[`${category}Text`]}</p>
            </div>)}
          </div>
          <p className="text-sm">{copy.renewal}</p>
          <Link to={lp('/cookies')} onClick={closeSettings} className="mt-3 inline-block text-sm underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{copy.more}</Link>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button variant="outline" className={equalButton} onClick={() => choose(REFUSE_ALL)}>{copy.refuse}</Button>
            <Button variant="outline" className={equalButton} onClick={() => choose(ACCEPT_ALL)}>{copy.accept}</Button>
            <Button variant="outline" className={`${equalButton} col-span-2`} onClick={() => choose(draft)}>{copy.save}</Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  </>;
}