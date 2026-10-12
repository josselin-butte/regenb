import { useLanguage } from '@/contexts/LanguageContext';

/** Placeholder for a photo the owner will upload later. 3:2 ratio, no decoration. */
const PhotoSlot = ({ slotKey }: { slotKey: string }) => {
  const { language } = useLanguage();
  return (
    <div
      className="flex aspect-[3/2] w-full items-center justify-center border border-dashed border-border bg-secondary"
      data-slot={slotKey}
    >
      <p className="px-6 text-center text-sm text-muted-foreground">
        {language === 'fr' ? 'Photo à venir' : 'Photo coming soon'}
      </p>
    </div>
  );
};

export default PhotoSlot;
