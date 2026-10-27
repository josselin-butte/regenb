import { Toaster } from "@/components/ui/toaster";
import RouteSeo from "@/components/RouteSeo";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Compass from "./pages/Compass";
import Legal, { LegacyLegalRedirect } from "./pages/Legal";
import Carnet from "./pages/Carnet";
import CarnetEntry from "./pages/CarnetEntry";
import Services from "./pages/Services";
import Etapes from "./pages/Etapes";
import NotFound from "./pages/NotFound";
import Cookies from "./pages/Cookies";
import { ConsentProvider } from '@/contexts/ConsentContext';
import ConsentManager from '@/components/ConsentManager';
import MetaPixel from '@/components/MetaPixel';
import Listening from './pages/Listening';
import Library from './pages/Library';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <ConsentProvider>
          <RouteSeo />
           <MetaPixel />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/accompagnement" element={<Services />} />
            <Route path="/etapes" element={<Etapes />} />
            <Route path="/boussole" element={<Compass />} />
            <Route path="/carnet" element={<Carnet />} />
            <Route path="/carnet/ecoutes" element={<Listening />} />
            <Route path="/carnet/bibliotheque" element={<Library />} />
            <Route path="/carnet/:slug" element={<CarnetEntry />} />
            <Route path="/legal" element={<LegacyLegalRedirect />} />
            <Route path="/mentions-legales" element={<Legal kind="notice" />} />
            <Route path="/confidentialite" element={<Legal kind="privacy" />} />
            <Route path="/cgv" element={<Legal kind="terms" />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/en" element={<Index />} />
            <Route path="/en/contact" element={<Contact />} />
            <Route path="/en/services" element={<Services />} />
            <Route path="/en/journeys" element={<Etapes />} />
            <Route path="/en/compass" element={<Compass />} />
            <Route path="/en/notebook" element={<Carnet />} />
            <Route path="/en/notebook/listening" element={<Listening />} />
            <Route path="/en/notebook/library" element={<Library />} />
            <Route path="/en/notebook/:slug" element={<CarnetEntry />} />
            <Route path="/en/legal" element={<LegacyLegalRedirect />} />
            <Route path="/en/legal-notice" element={<Legal kind="notice" />} />
            <Route path="/en/privacy" element={<Legal kind="privacy" />} />
            <Route path="/en/terms" element={<Legal kind="terms" />} />
            <Route path="/en/cookies" element={<Cookies />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ConsentManager />
          </ConsentProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
