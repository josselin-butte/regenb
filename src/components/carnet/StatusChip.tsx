import { useLanguage } from '@/contexts/LanguageContext';
import type { CarnetStatus } from '@/lib/carnet';

const StatusChip = ({ status }: { status: CarnetStatus }) => {
  const { t } = useLanguage();
  return (
    <span className={`inline-block border px-2 py-0.5 text-[12px] uppercase tracking-wider ${status === 'settled' ? 'border-primary text-primary' : 'border-accent text-foreground'}`}>
      {t(`carnet.status.${status}`)}
    </span>
  );
};

export default StatusChip;
