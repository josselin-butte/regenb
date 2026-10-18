import type { CarnetEntry, CarnetLang } from '@/lib/carnet';
import { getNoteAudio } from '@/lib/carnet-audio';

export default function NoteAudio({ entry, language }: { entry: CarnetEntry; language: CarnetLang }) {
  const audio = getNoteAudio(entry, language);
  if (!audio) return null;
  const duration = audio.duration?.toLocaleString(language === 'fr' ? 'fr-FR' : 'en-GB');
  const label = language === 'fr' ? 'Écouter la note' : 'Listen to this note';
  return (
    <section className="note-audio carnet-noprint mt-6 w-full max-w-[560px]" aria-label={label}>
      <div className="note-audio-frame border p-4">
        <p className="font-sans text-sm">{label}{duration ? ` · ${duration} min` : ''}</p>
        <audio key={audio.url} className="mt-3 block w-full" controls preload="none" aria-label={`${label} : ${entry.title}`}>
          <source src={audio.url} type="audio/mpeg" />
        </audio>
      </div>
      <p className="note-audio-credit mt-2 font-sans text-xs leading-relaxed">
        {language === 'fr'
          ? "La musique d'ouverture est jouée sur un Hang intégral libre de PANArt, accordé à l'oreille et signé par Sabina Schärer à Berne, le 8 novembre 2012."
          : 'The opening music is played on a PANArt Free Integral Hang, tuned by ear and signed by Sabina Schärer in Bern on 8 November 2012.'}
      </p>
    </section>
  );
}