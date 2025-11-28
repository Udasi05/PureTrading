import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Users, Clock, Zap } from "lucide-react";

const taglines = [
  "Start Your New Forex Trading Journey",
  "Pass Your PropFirm Evaluation Phases",
  "Get Clear Market Vision Today",
  "Can't Survive in Market? Join Us",
  "Achieve Consistency in Profits",
  "Overcome Your Losing Streaks",
];

const trustIndicators = [
  { icon: Users, label: "500+ Traders", value: "Active" },
  { icon: Zap, label: "Daily Signals", value: "Live" },
  { icon: Clock, label: "3 Sessions", value: "24/7" },
];

export function HeroSection() {
  const [currentTagline, setCurrentTagline] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTagline((prev) => (prev + 1) % taglines.length);
        setIsVisible(true);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center gradient-mesh dark:gradient-mesh overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-2">
              <Badge variant="secondary" className="mb-4" data-testid="badge-new">
                <Zap className="w-3 h-3 mr-1" />
                Professional Trading Signals
              </Badge>
              
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span
                  className={`block transition-all duration-300 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                  }`}
                  data-testid="text-tagline"
                >
                  {taglines[currentTagline]}
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground mt-6 max-w-xl">
                with <span className="text-gradient font-semibold">Pure Trading</span>
              </p>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
              Get premium forex signals with perfect entry/exit timing, risk management, 
              and detailed trade rationale. Cover FX, Gold, Silver, and Crypto across all major sessions.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button
                size="lg"
                className="px-8 py-6 text-lg font-semibold animate-pulse-glow"
                asChild
                data-testid="button-hero-cta"
              >
                <a href="/api/login">
                  Join at ₹9 Only
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="line-through">₹499</span>
                <span className="text-primary font-bold text-lg">₹9</span>
                <Badge variant="destructive" className="text-xs">98% OFF</Badge>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              {trustIndicators.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                  data-testid={`trust-indicator-${index}`}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative bg-card border border-border rounded-2xl p-6 shadow-2xl card-glow">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold">Live Signal</h3>
                    <p className="text-sm text-muted-foreground">EUR/USD</p>
                  </div>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  BUY
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Entry</p>
                    <p className="font-mono font-bold text-primary">1.0845</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Stop Loss</p>
                    <p className="font-mono font-bold text-destructive">1.0820</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground mb-1">Take Profit</p>
                    <p className="font-mono font-bold text-green-500">1.0895</p>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-muted/30 rounded-lg p-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Lot Size</p>
                    <p className="font-bold">0.5 Lots</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Risk:Reward</p>
                    <p className="font-bold text-primary">1:2</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Session</p>
                    <p className="font-bold">London</p>
                  </div>
                </div>

                <div className="bg-accent/50 rounded-lg p-4">
                  <p className="text-xs text-muted-foreground mb-1">Trade Rationale</p>
                  <p className="text-sm">
                    Bullish momentum confirmed after liquidity sweep below 1.0820. 
                    Strong institutional order flow detected at entry zone.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
