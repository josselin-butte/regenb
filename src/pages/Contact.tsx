import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "Le nom doit contenir au moins 2 caractères" }).max(100),
  email: z.string().trim().email({ message: "Adresse e-mail invalide" }).max(255),
  subject: z.string().trim().min(5, { message: "Le sujet doit contenir au moins 5 caractères" }).max(200),
  message: z.string().trim().min(10, { message: "Le message doit contenir au moins 10 caractères" }).max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Form submitted:', data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: t('contact.toast.title'),
      description: t('contact.toast.description'),
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="border-b border-border px-5 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36 lg:px-12">
          <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-3">
              <p className="text-sm font-medium uppercase tracking-widest text-accent">Josselin Butté · Contact</p>
            </div>
            <div className="lg:col-span-9">
              <h1 className="mt-6 text-[2.1rem] leading-[1.15] sm:text-5xl lg:mt-0">{t('contact.title')}</h1>
              <p className="mt-6 max-w-measure">{t('contact.subtitle')}</p>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-secondary px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl sm:text-3xl">{t('contact.info.title')}</h2>
            <p className="mt-4 text-muted-foreground">{t('contact.info.description')}</p>
            <ul className="mt-6 space-y-2">
              <li>
                {t('contact.info.email')} —{' '}
                <a href="mailto:josselin@regenb.com" className="text-primary underline decoration-accent">
                  josselin@regenb.com
                </a>
              </li>
              <li>{t('contact.info.location')} — France</li>
            </ul>
          </div>
        </section>

        <section className="border-b border-border px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
          <div className="mx-auto max-w-measure">
            {isSubmitted ? (
              <div className="border border-border p-6">
                <h2 className="text-2xl">{t('contact.success.title')}</h2>
                <p className="mt-3 text-muted-foreground">{t('contact.success.description')}</p>
                <Button onClick={handleReset} variant="outline" className="mt-6">
                  {t('contact.success.button')}
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl sm:text-3xl">{t('contact.form.title')}</h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.name')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('contact.form.name.placeholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.email')}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder={t('contact.form.email.placeholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.subject')}</FormLabel>
                          <FormControl>
                            <Input placeholder={t('contact.form.subject.placeholder')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('contact.form.message')}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t('contact.form.message.placeholder')}
                              className="min-h-[150px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                    </Button>
                  </form>
                </Form>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
