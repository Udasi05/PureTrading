import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SignalCard } from "@/components/dashboard/SignalCard";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { EbooksSection } from "@/components/dashboard/EbookCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  TrendingUp, 
  Calendar, 
  BookOpen, 
  Zap, 
  ExternalLink,
  Clock,
  Crown 
} from "lucide-react";
import { SiTelegram } from "react-icons/si";
import type { Signal } from "@shared/schema";

export default function Dashboard() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, authLoading, toast]);

  const { data: signals, isLoading: signalsLoading } = useQuery<Signal[]>({
    queryKey: ["/api/signals"],
    enabled: isAuthenticated,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="space-y-6">
            <Skeleton className="h-10 w-48" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-96 rounded-lg" />
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const activeSignals = signals?.filter((s) => s.status === "active") || [];
  const todaySignals = signals?.filter((s) => {
    if (!s.createdAt) return false;
    const today = new Date();
    const signalDate = new Date(s.createdAt);
    return signalDate.toDateString() === today.toDateString();
  }) || [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2" data-testid="text-welcome">
                Welcome, {user?.firstName || "Trader"}!
              </h1>
              <p className="text-muted-foreground">
                Your trading signals and resources dashboard
              </p>
            </div>
            {user?.isMember ? (
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2">
                <Crown className="w-4 h-4 mr-2" />
                Premium Member
              </Badge>
            ) : (
              <Button asChild data-testid="button-upgrade">
                <a href="/api/login">
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Premium
                </a>
              </Button>
            )}
          </div>
        </div>

        <DashboardStats
          totalSignals={signals?.length || 0}
          activeSignals={activeSignals.length}
          todaySignals={todaySignals.length}
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="signals" className="w-full">
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="signals" className="gap-2">
                  <Zap className="w-4 h-4" />
                  Signals
                </TabsTrigger>
                <TabsTrigger value="resources" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  Resources
                </TabsTrigger>
                <TabsTrigger value="calendar" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Calendar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signals" className="space-y-4">
                {signalsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-64 rounded-lg" />
                    ))}
                  </div>
                ) : signals && signals.length > 0 ? (
                  <div className="space-y-4">
                    {signals.map((signal) => (
                      <SignalCard key={signal.id} signal={signal} />
                    ))}
                  </div>
                ) : (
                  <Card className="p-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-2">No Signals Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      New trading signals will appear here. Check back soon!
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Signals are posted during Asian, London, and New York sessions.
                    </p>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="resources">
                <EbooksSection />
              </TabsContent>

              <TabsContent value="calendar">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-heading font-bold">Economic Calendar</h3>
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      Live
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    View upcoming high-impact economic events that may affect your trades.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" asChild>
                      <a
                        href="https://www.forexfactory.com/calendar"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Forex Factory
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a
                        href="https://www.investing.com/economic-calendar/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Investing.com
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </a>
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="p-6 border-primary/30 bg-primary/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                  <SiTelegram className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-bold">Telegram Channel</h3>
                  <p className="text-sm text-muted-foreground">Get instant notifications</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Join our private Telegram channel to receive real-time trading signals
                directly on your phone.
              </p>
              <Button className="w-full" asChild data-testid="button-join-telegram">
                <a href="https://t.me/puretrading" target="_blank" rel="noopener noreferrer">
                  <SiTelegram className="w-4 h-4 mr-2" />
                  Join Telegram Channel
                </a>
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-heading font-bold mb-4">Trading Sessions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10">
                  <span className="text-sm font-medium">Asian</span>
                  <span className="text-xs text-muted-foreground">12:00 AM - 9:00 AM IST</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
                  <span className="text-sm font-medium">London</span>
                  <span className="text-xs text-muted-foreground">1:30 PM - 10:30 PM IST</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-orange-500/10">
                  <span className="text-sm font-medium">New York</span>
                  <span className="text-xs text-muted-foreground">6:30 PM - 3:30 AM IST</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-heading font-bold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a
                  href="https://www.forexfactory.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover-elevate"
                >
                  <span className="text-sm">Forex Factory</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>
                <a
                  href="https://www.investing.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover-elevate"
                >
                  <span className="text-sm">Investing.com</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>
                <a
                  href="https://www.tradingview.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover-elevate"
                >
                  <span className="text-sm">TradingView</span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
