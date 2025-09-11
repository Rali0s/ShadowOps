import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/app-shell";

// Public pages
import LandingPage from "@/pages/landing-page";
import SubscribePage from "@/pages/subscribe-page";
import NotFound from "@/pages/not-found";

// All pages are now public (no authentication required)
import ShadowFangTrainingPage from "@/pages/shadowfang-training-page";
import OpsManualPage from "@/pages/ops-manual-page";
import NeuralMatrixPage from "@/pages/neural-matrix-page";
import KSPDossier from "@/pages/ksp-dossier";
import ScientificMethodPage from "@/pages/scientific-method-page";
import EducationMaterialsPage from "@/pages/education-materials-page";
import SelfReportMethodologyPage from "@/pages/self-report-methodology";
import FrequencyGeneratorPage from "@/pages/frequency-generator-page";

function Router() {
  return (
    <Switch>
      {/* All Routes are Public - No Authentication Required */}
      <Route path="/" component={LandingPage} />
      <Route path="/subscribe" component={SubscribePage} />
      
      {/* Training and Manual Pages */}
      <Route path="/shadowfang-training" component={ShadowFangTrainingPage} />
      <Route path="/ops-manual" component={OpsManualPage} />
      <Route path="/neural-matrix" component={NeuralMatrixPage} />
      <Route path="/ksp-dossier" component={KSPDossier} />
      <Route path="/scientific-method" component={ScientificMethodPage} />
      <Route path="/education" component={EducationMaterialsPage} />
      <Route path="/methodology" component={SelfReportMethodologyPage} />
      <Route path="/frequency-generator" component={FrequencyGeneratorPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppShell>
          <Router />
          <Toaster />
        </AppShell>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;