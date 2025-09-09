import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/ui/navigation";
import HomePage from "@/pages/home-page";

import AuthPage from "@/pages/auth-page";
import SubscribePage from "@/pages/subscribe-page";
import OpsManualPage from "@/pages/ops-manual-page";
import NeuralMatrixPage from "@/pages/neural-matrix-page";
import KSPDossier from "@/pages/ksp-dossier";
import ScientificMethodPage from "@/pages/scientific-method-page";

import EducationMaterialsPage from "@/pages/education-materials-page";
import SelfReportMethodologyPage from "@/pages/self-report-methodology";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/subscribe" component={SubscribePage} />
      <Route path="/ops-manual" component={OpsManualPage} />
      <Route path="/neural-matrix" component={NeuralMatrixPage} />
      <Route path="/ksp-dossier" component={KSPDossier} />
      <Route path="/scientific-method" component={ScientificMethodPage} />

      <Route path="/education" component={EducationMaterialsPage} />
      <Route path="/methodology" component={SelfReportMethodologyPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <TooltipProvider>
        <div className="min-h-screen bg-terminal-bg text-gray-100">
          <Navigation />
          <main className="pt-0">
            <Router />
          </main>
          <Toaster />
        </div>
      </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
