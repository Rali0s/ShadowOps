import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/ui/navigation";
import HomePage from "@/pages/home-page";
import TerminalPage from "@/pages/terminal-page";
import AdvancedTerminalPage from "@/pages/advanced-terminal-page";
import AdminPage from "@/pages/admin-page";
import SubscribePage from "@/pages/subscribe-page";
import OpsManualPage from "@/pages/ops-manual-page";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/terminal" component={TerminalPage} />
      <Route path="/advanced-terminal" component={AdvancedTerminalPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/subscribe" component={SubscribePage} />
      <Route path="/ops-manual" component={OpsManualPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-terminal-bg text-gray-100">
          <Navigation />
          <main className="pt-0">
            <Router />
          </main>
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
