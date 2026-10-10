import { FormEvent, useState } from 'react';
import { z } from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ecoute from '@/assets/home-ecoute.webp.asset.json';

const emailSchema = z.string().trim().email();

const NewsletterSection = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailSchema.safeParse(email).success) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
  };

  return (
    <section id="letter" className="px-5 py-24 sm:px-8 sm:py-28 lg:px-12">
      <div className="mx-auto max-w-measure text-center">
        <img src={`https://regenb.lovable.app${ecoute.url}`} alt={t('image.ecoute')} width={1600} height={1200} loading="lazy" className="mx-auto mb-7 aspect-[3/2] w-full max-w-[420px] object-cover" />
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">{t('letter.kicker')}</p>
        <h2 className="mt-4 text-3xl sm:text-4xl">{t('letter.title')}</h2>
        <p className="mx-auto mt-6">{t('letter.text')}</p>

        {status === 'success' ? (
          <p role="status" className="mt-8 border border-border bg-secondary p-5 text-primary">
            {t('letter.success')}
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-8">
            <label htmlFor="letter-email" className="sr-only">
              {t('letter.label')}
            </label>
            <div className="flex flex-col sm:flex-row">
              <Input
                id="letter-email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder={t('letter.placeholder')}
                autoComplete="email"
                maxLength={255}
                aria-invalid={status === 'error'}
                aria-describedby={status === 'error' ? 'letter-error' : undefined}
                className="h-14 flex-1 border-2 border-primary bg-background text-center sm:text-left"
              />
              <Button type="submit" size="lg" className="mt-3 h-14 sm:mt-0 sm:px-10">
                {t('letter.submit')}
              </Button>
            </div>
            {status === 'error' && (
              <p id="letter-error" className="mt-3 text-sm text-destructive">
                {t('letter.error')}
              </p>
            )}
          </form>
        )}

        <p className="mt-6 text-sm text-muted-foreground">
          <a
            href="https://substack.com/@guidancefacililtation/note/p-218300000?r=3926mi&utm_medium=ios&utm_source=notes-share-action"
            target="_blank"
            rel="noopener"
            className="text-primary underline decoration-accent"
          >
            {t('letter.readLink')}
          </a>
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
