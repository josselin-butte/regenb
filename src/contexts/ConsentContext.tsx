import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { onConsentChange, readConsent, refreshConsent, saveConsent, type ConsentChoices } from '@/lib/consent';

const ConsentContext = createContext<{ needsChoice: boolean; panelOpen: boolean; openSettings: () => void; closeSettings: () => void; choose: (choices: ConsentChoices) => void } | undefined>(undefined);

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [needsChoice, setNeedsChoice] = useState(() => !readConsent());
  const [panelOpen, setPanelOpen] = useState(false);
  useEffect(() => {
    const unsubscribe = onConsentChange(record => setNeedsChoice(!record));
    const check = () => refreshConsent();
    window.addEventListener('focus', check);
    const interval = window.setInterval(check, 60_000);
    return () => { unsubscribe(); window.removeEventListener('focus', check); clearInterval(interval); };
  }, []);
  const choose = (choices: ConsentChoices) => {
    saveConsent(choices);
    setNeedsChoice(false);
    setPanelOpen(false);
  };
  return <ConsentContext.Provider value={{ needsChoice, panelOpen, openSettings: () => setPanelOpen(true), closeSettings: () => setPanelOpen(false), choose }}>{children}</ConsentContext.Provider>;
}

export function useConsentSettings() {
  const context = useContext(ConsentContext);
  if (!context) throw new Error('ConsentProvider is required');
  return context;
}