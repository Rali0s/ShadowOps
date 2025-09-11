import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AppShell } from "@/components/app-shell";

// Public pages
import LandingPage from "@/pages/landing-page";
import AuthPage from "@/pages/auth-page";
import SubscribePage from "@/pages/subscribe-page";
import NotFound from "@/pages/not-found";

// Protected pages (require subscription)
import BlackbriarTrainingPage from "@/pages/blackbriar-training-page";
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
      {/* Public Routes */}
      <Route path="/" component={LandingPage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/subscribe" component={SubscribePage} />
      
      {/* Protected Routes - Require Subscription */}
      <Route path="/blackbriar-training">
        <ProtectedRoute>
          <BlackbriarTrainingPage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/ops-manual">
        <ProtectedRoute>
          <OpsManualPage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/neural-matrix">
        <ProtectedRoute>
          <NeuralMatrixPage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/ksp-dossier">
        <ProtectedRoute>
          <KSPDossier />
        </ProtectedRoute>
      </Route>
      
      <Route path="/scientific-method">
        <ProtectedRoute>
          <ScientificMethodPage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/education">
        <ProtectedRoute>
          <EducationMaterialsPage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/methodology">
        <ProtectedRoute>
          <SelfReportMethodologyPage />
        </ProtectedRoute>
      </Route>
      
      <Route path="/frequency-generator">
        <ProtectedRoute>
          <FrequencyGeneratorPage />
        </ProtectedRoute>
      </Route>
      
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
