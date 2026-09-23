import { FormEvent, useState } from 'react';
import { z } from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    <section id="letter" className="border-b border-border px-5 py-14 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-measure">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">{t('letter.kicker')}</p>
        <h2 className="mt-4 text-2xl sm:text-3xl">{t('letter.title')}</h2>
        <p className="mt-6">{t('letter.text')}</p>

        {status === 'success' ? (
          <p role="status" className="mt-8 border border-border p-5 text-primary">
            {t('letter.success')}
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-8">
            <label htmlFor="letter-email" className="mb-2 block text-sm font-medium text-foreground">
              {t('letter.label')}
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
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
                className="h-12 border-border bg-background"
              />
              <Button type="submit" size="lg" className="shrink-0">
                {t('letter.submit')}
              </Button>
            </div>
            {status === 'error' && (
              <p id="letter-error" className="mt-2 text-sm text-destructive">
                {t('letter.error')}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
