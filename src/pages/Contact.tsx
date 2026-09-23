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
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import groupImage from '@/assets/group-nature.jpg';

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
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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
      <main className="pt-16 sm:pt-20">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-primary text-primary-foreground border-b-2 border-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl">
              <span className="text-xs font-bold uppercase tracking-widest text-accent">Josselin Butté · Contact</span>
              <h1 className="mt-5 text-5xl sm:text-7xl lg:text-8xl font-black uppercase leading-none text-primary-foreground mb-6">
                {t('contact.title')}
              </h1>
              <p className="text-lg sm:text-xl text-primary-foreground/75 max-w-2xl">
                {t('contact.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 border-2 border-primary">
              {/* Contact Info */}
              <div className="space-y-8 p-6 sm:p-10 lg:border-r-2 border-primary">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold uppercase text-primary mb-4">
                    {t('contact.info.title')}
                  </h2>
                  <p className="text-muted-foreground">
                    {t('contact.info.description')}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent text-accent-foreground">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t('contact.info.email')}</h3>
                      <a 
                        href="mailto:josselin@regenb.com" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        josselin@regenb.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent text-accent-foreground">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{t('contact.info.location')}</h3>
                      <p className="text-muted-foreground">France</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Image */}
                <div className="hidden lg:block mt-8">
                  <div className="aspect-[4/3] bg-sage/30 overflow-hidden">
                    <img 
                      src={groupImage}
                      alt="Un échange en pleine nature"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card p-6 sm:p-8 lg:p-10">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-12 space-y-6">
                    <div className="p-4 bg-accent text-accent-foreground">
                      <CheckCircle className="w-12 h-12" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold uppercase text-foreground mb-2">
                        {t('contact.success.title')}
                      </h3>
                      <p className="text-muted-foreground">
                        {t('contact.success.description')}
                      </p>
                    </div>
                    <Button onClick={handleReset} variant="outline">
                      {t('contact.success.button')}
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold uppercase text-foreground mb-6">
                      {t('contact.form.title')}
                    </h2>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                        <Button 
                          type="submit" 
                          className="w-full" 
                          size="lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <span className="animate-spin">⏳</span>
                              {t('contact.form.sending')}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              <Send className="w-4 h-4" />
                              {t('contact.form.submit')}
                            </span>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
