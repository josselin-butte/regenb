import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TOPICS = ['facilitation', 'programmes', 'coaching', 'supervision', 'mediation', 'etapes'] as const;

const copy = {
  fr: {
    title: 'Écrivez-moi',
    firstName: 'Prénom', email: 'E-mail', topic: 'Ce qui vous amène', topicPlaceholder: 'Choisir…', message: 'Message',
    topics: { facilitation: 'Facilitation', programmes: 'Conception de programmes', coaching: 'Coaching', supervision: 'Supervision', mediation: 'Médiation', etapes: 'Les étapes' },
    optIn: 'Me prévenir des prochains programmes de RegenB France. Désinscription en un clic.',
    submit: 'Envoyer', sending: 'Envoi…',
    privacy: 'Vos données servent uniquement à vous répondre. Voir la ', privacyLink: 'politique de confidentialité', privacyHref: '/confidentialite',
    thanks: 'Merci, je vous réponds personnellement sous deux jours ouvrés.',
    error: "Le message n'est pas parti. Réessayez, ou écrivez-moi à josselin@regenb.com.",
    errors: { firstName: 'Indiquez votre prénom', email: 'Adresse e-mail invalide', topic: 'Choisissez une option', message: 'Écrivez quelques mots' },
  },
  en: {
    title: 'Write to me',
    firstName: 'First name', email: 'Email', topic: 'What brings you', topicPlaceholder: 'Choose…', message: 'Message',
    topics: { facilitation: 'Facilitation', programmes: 'Programme design', coaching: 'Coaching', supervision: 'Supervision', mediation: 'Mediation', etapes: 'Journeys' },
    optIn: 'Let me know about upcoming RegenB France programmes. One-click unsubscribe.',
    submit: 'Send', sending: 'Sending…',
    privacy: 'Your data is used only to reply to you. See the ', privacyLink: 'privacy policy', privacyHref: '/en/privacy',
    thanks: "Thank you. I'll reply personally within two working days.",
    error: "Your message didn't go through. Please try again, or write to josselin@regenb.com.",
    errors: { firstName: 'Enter your first name', email: 'Invalid email address', topic: 'Choose an option', message: 'Write a few words' },
  },
};

const EnquiryForm = ({ defaultTopic }: { defaultTopic?: (typeof TOPICS)[number] }) => {
  const { language } = useLanguage();
  const c = copy[language];
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [honeypot, setHoneypot] = useState('');

  const schema = z.object({
    firstName: z.string().trim().min(1, c.errors.firstName).max(100),
    email: z.string().trim().email(c.errors.email).max(255),
    topic: z.enum(TOPICS, { errorMap: () => ({ message: c.errors.topic }) }),
    message: z.string().trim().min(1, c.errors.message).max(3000),
    programmesOptIn: z.boolean(),
  });
  type Data = z.infer<typeof schema>;
  const form = useForm<Data>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: '', email: '', topic: defaultTopic, message: '', programmesOptIn: false },
  });

  const onSubmit = async (data: Data) => {
    setStatus('sending');
    const { error } = await supabase.functions.invoke('forward-to-crm', {
      body: { ...data, language, page: window.location.pathname, website: honeypot },
    });
    setStatus(error ? 'error' : 'sent');
  };

  return (
    <section className="border-t border-border px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
      <div className="mx-auto max-w-measure">
        <h2 className="text-2xl font-semibold sm:text-3xl">{c.title}</h2>
        {status === 'sent' ? (
          <p className="mt-6 border-l-2 border-accent pl-4" role="status">{c.thanks}</p>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6" noValidate>
              <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
                <label>Website<input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} name="website" /></label>
              </div>
              <FormField control={form.control} name="firstName" render={({ field }) => (
                <FormItem><FormLabel>{c.firstName}</FormLabel><FormControl><Input autoComplete="given-name" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem><FormLabel>{c.email}</FormLabel><FormControl><Input type="email" autoComplete="email" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="topic" render={({ field }) => (
                <FormItem>
                  <FormLabel>{c.topic}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder={c.topicPlaceholder} /></SelectTrigger></FormControl>
                    <SelectContent>{TOPICS.map((t) => <SelectItem key={t} value={t}>{c.topics[t]}</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem><FormLabel>{c.message}</FormLabel><FormControl><Textarea className="min-h-[140px] resize-none" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="programmesOptIn" render={({ field }) => (
                <FormItem className="flex items-start gap-3 space-y-0">
                  <FormControl><Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} className="mt-1" /></FormControl>
                  <FormLabel className="font-normal leading-snug">{c.optIn}</FormLabel>
                </FormItem>
              )} />
              <Button type="submit" size="lg" disabled={status === 'sending'}>{status === 'sending' ? c.sending : c.submit}</Button>
              {status === 'error' && <p className="text-sm text-destructive" role="alert">{c.error}</p>}
              <p className="text-sm text-muted-foreground">
                {c.privacy}<a href={c.privacyHref} className="text-primary underline decoration-accent">{c.privacyLink}</a>.
              </p>
            </form>
          </Form>
        )}
      </div>
    </section>
  );
};

export default EnquiryForm;
