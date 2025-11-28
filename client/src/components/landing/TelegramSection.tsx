import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Zap, Clock, Shield, ArrowRight } from "lucide-react";
import { SiTelegram } from "react-icons/si";

const telegramFeatures = [
  {
    icon: Bell,
    title: "Instant Notifications",
    description: "Get signals the moment they're published",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Trade management and target updates",
  },
  {
    icon: Clock,
    title: "All Sessions Covered",
    description: "Asian, London, and New York signals",
  },
  {
    icon: Shield,
    title: "Private Channel",
    description: "Exclusive access for members only",
  },
];

export function TelegramSection() {
  return (
    <section id="telegram" className="py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">
              <SiTelegram className="w-3 h-3 mr-1" />
              Signal Delivery
            </Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Signals Delivered Straight to Telegram
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Never miss a trading opportunity. Get instant notifications with complete 
              trade details right on your phone.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {telegramFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-muted/30"
                  data-testid={`telegram-feature-${index}`}
                >
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{feature.title}</p>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button asChild data-testid="button-telegram-cta">
              <a href="/api/login">
                Join Telegram Channel
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>

          <div className="relative">
            <Card className="p-4 bg-[#1a1a2e] border-[#2d2d44] max-w-sm mx-auto">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#2d2d44]">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <SiTelegram className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-white">Pure Trading Signals</p>
                  <p className="text-xs text-gray-400">Premium Channel</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-[#232338] rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                      BUY SIGNAL
                    </Badge>
                    <span className="text-xs text-gray-400">London Session</span>
                  </div>
                  <p className="text-white font-bold mb-2">GOLD (XAUUSD)</p>
                  <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                    <div className="bg-[#1a1a2e] rounded p-2 text-center">
                      <p className="text-gray-400">Entry</p>
                      <p className="text-primary font-mono">2345.50</p>
                    </div>
                    <div className="bg-[#1a1a2e] rounded p-2 text-center">
                      <p className="text-gray-400">SL</p>
                      <p className="text-red-400 font-mono">2340.00</p>
                    </div>
                    <div className="bg-[#1a1a2e] rounded p-2 text-center">
                      <p className="text-gray-400">TP</p>
                      <p className="text-green-400 font-mono">2360.00</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    Lot: 0.3 | R:R 1:3 | Bullish momentum after liquidity grab
                  </p>
                </div>

                <div className="bg-[#232338] rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                      SELL SIGNAL
                    </Badge>
                    <span className="text-xs text-gray-400">Asian Session</span>
                  </div>
                  <p className="text-white font-bold mb-2">EUR/USD</p>
                  <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                    <div className="bg-[#1a1a2e] rounded p-2 text-center">
                      <p className="text-gray-400">Entry</p>
                      <p className="text-primary font-mono">1.0875</p>
                    </div>
                    <div className="bg-[#1a1a2e] rounded p-2 text-center">
                      <p className="text-gray-400">SL</p>
                      <p className="text-red-400 font-mono">1.0900</p>
                    </div>
                    <div className="bg-[#1a1a2e] rounded p-2 text-center">
                      <p className="text-gray-400">TP</p>
                      <p className="text-green-400 font-mono">1.0825</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">
                    Lot: 0.5 | R:R 1:2 | Resistance rejection + bearish divergence
                  </p>
                </div>
              </div>
            </Card>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
