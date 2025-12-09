import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import Landing from "@/pages/Landing";
import ThankYou from "@/pages/ThankYou";
import React from "react";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <main className="mt-16">
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/thank-you" component={ThankYou} />
      </Switch>
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
