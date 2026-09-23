import { FormEvent, useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
    <section id="letter" className="border-b-2 border-primary bg-secondary px-6 py-20 sm:px-10 lg:px-16 lg:py-24 xl:px-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">{t('letter.kicker')}</span>
          <h2 className="mt-5 text-4xl font-black uppercase leading-none text-primary sm:text-6xl">{t('letter.title')}</h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary-foreground">{t('letter.text')}</p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          {status === 'success' ? (
            <p role="status" className="border-l-4 border-primary bg-background p-6 text-lg font-semibold text-primary">
              {t('letter.success')}
            </p>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="letter-email" className="mb-2 block text-sm font-semibold text-primary">{t('letter.label')}</label>
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
                  className="h-12 rounded-none border-primary"
                />
                <Button type="submit" size="lg" className="shrink-0">
                  {t('letter.submit')}<ArrowRight />
                </Button>
              </div>
              {status === 'error' && <p id="letter-error" className="mt-2 text-sm font-semibold text-destructive">{t('letter.error')}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;