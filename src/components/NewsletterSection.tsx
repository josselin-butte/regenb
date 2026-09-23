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
    <section id="letter" className="border-b border-border bg-secondary px-5 py-14 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-3">
          <p className="text-sm font-medium uppercase tracking-widest text-accent">{t('letter.kicker')}</p>
          <h2 className="mt-4 text-2xl sm:text-3xl">{t('letter.title')}</h2>
        </div>
        <div className="mt-6 lg:col-span-5 lg:mt-0">
          <p>{t('letter.text')}</p>
        </div>
        <div className="mt-8 lg:col-span-4 lg:mt-0">
          {status === 'success' ? (
            <p role="status" className="border border-border bg-background p-5 text-primary">
              {t('letter.success')}
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="letter-email" className="mb-2 block text-sm font-medium text-foreground">
                {t('letter.label')}
              </label>
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
              <Button type="submit" size="lg" className="mt-3 w-full">
                {t('letter.submit')}
              </Button>
              {status === 'error' && (
                <p id="letter-error" className="mt-2 text-sm text-destructive">
                  {t('letter.error')}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
