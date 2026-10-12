import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Compass from "./pages/Compass";
import Legal from "./pages/Legal";
import Carnet from "./pages/Carnet";
import CarnetEntry from "./pages/CarnetEntry";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/boussole" element={<Compass />} />
            <Route path="/carnet" element={<Carnet />} />
            <Route path="/carnet/:slug" element={<CarnetEntry />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/en" element={<Index />} />
            <Route path="/en/contact" element={<Contact />} />
            <Route path="/en/compass" element={<Compass />} />
            <Route path="/en/notebook" element={<Carnet />} />
            <Route path="/en/notebook/:slug" element={<CarnetEntry />} />
            <Route path="/en/legal" element={<Legal />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
