import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/app-shell";
import { ProtectedRoute } from "@/lib/protected-route";
import { AuthProvider } from "@/hooks/use-auth";
import "./i18n/config";

// Public pages (no authentication required)
import LandingPage from "@/pages/landing-page";
import SubscribePage from "@/pages/subscribe-page";
import DiscordLinkedRolesPage from "@/pages/discord-linked-roles";
import TermsOfServicePage from "@/pages/terms-of-service";
import PrivacyPolicyPage from "@/pages/privacy-policy";
import NotFound from "@/pages/not-found";

// Protected pages (require Discord verification + beta access OR subscription)
import ShadowFangTrainingPage from "@/pages/shadowfang-training-page";
import OpsManualPage from "@/pages/ops-manual-page";
import NeuralMatrixPage from "@/pages/neural-matrix-page";
import KSPDossier from "@/pages/ksp-dossier";
import ScientificMethodPage from "@/pages/scientific-method-page";
import EducationMaterialsPage from "@/pages/education-materials-page";
import SelfReportMethodologyPage from "@/pages/self-report-methodology";
import FrequencyGeneratorPage from "@/pages/frequency-generator-page";
import ResearchFoundationPage from "@/pages/research-foundation";

function Router() {
  return (
    <Switch>
      {/* Public Routes - No Authentication Required */}
      <Route path="/" component={LandingPage} />
      <Route path="/subscribe" component={SubscribePage} />
      <Route path="/discord/linked-roles" component={DiscordLinkedRolesPage} />
      <Route path="/terms-of-service" component={TermsOfServicePage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      
      {/* Protected Routes - Require Discord Verification OR Active Subscription */}
      <ProtectedRoute path="/shadowfang-training" component={ShadowFangTrainingPage} />
      <ProtectedRoute path="/ops-manual" component={OpsManualPage} />
      <ProtectedRoute path="/neural-matrix" component={NeuralMatrixPage} />
      <ProtectedRoute path="/ksp-dossier" component={KSPDossier} />
      <ProtectedRoute path="/scientific-method" component={ScientificMethodPage} />
      <ProtectedRoute path="/education" component={EducationMaterialsPage} />
      <ProtectedRoute path="/methodology" component={SelfReportMethodologyPage} />
      <ProtectedRoute path="/frequency-generator" component={FrequencyGeneratorPage} />
      <ProtectedRoute path="/research" component={ResearchFoundationPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <AppShell>
            <Router />
            <Toaster />
          </AppShell>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;