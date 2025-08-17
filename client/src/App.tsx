import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import Navigation from "@/components/ui/navigation";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";
import TerminalPage from "@/pages/terminal-page";
import AdvancedTerminalPage from "@/pages/advanced-terminal-page";

import AdminPage from "@/pages/admin-page";
import SubscribePage from "@/pages/subscribe-page";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/subscribe" component={SubscribePage} />
      <ProtectedRoute path="/terminal" component={TerminalPage} />
      <ProtectedRoute path="/advanced-terminal" component={AdvancedTerminalPage} />

      <ProtectedRoute path="/admin" component={AdminPage} />
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
