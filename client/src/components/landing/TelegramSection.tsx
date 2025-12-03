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
        </div>
      </div>
    </section>
  );
}
