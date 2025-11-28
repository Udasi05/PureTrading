import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  BookOpen, 
  FileText, 
  Target, 
  TrendingUp,
  Shield,
  Zap,
  Crown
} from "lucide-react";
import { SiTelegram } from "react-icons/si";

const benefits = [
  {
    icon: BookOpen,
    title: "3 Premium Ebooks",
    description: "Comprehensive trading guides for beginners to advanced",
  },
  {
    icon: FileText,
    title: "Technical Analysis PDF",
    description: "Market structure, liquidity, swap & sweep methods explained",
  },
  {
    icon: Target,
    title: "Daily Trading Signals",
    description: "With lot sizes, entry, exit, and stop loss levels",
  },
  {
    icon: Shield,
    title: "Perfect Risk Management",
    description: "Every signal calculated for optimal risk:reward",
  },
  {
    icon: TrendingUp,
    title: "Trade Rationale",
    description: "Understand the 'why' behind every trade setup",
  },
  {
    icon: SiTelegram,
    title: "Telegram Delivery",
    description: "Instant signal notifications on your phone",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Crown className="w-3 h-3 mr-1" />
            Limited Time Offer
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join our membership and get instant access to premium trading resources
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <Card className="relative p-8 border-primary/50 glow-primary overflow-visible" data-testid="pricing-card">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="px-4 py-1 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            </div>

            <div className="text-center mb-8">
              <h3 className="font-heading text-2xl font-bold mb-2">Pure Trading Membership</h3>
              <p className="text-muted-foreground">Complete trading signals package</p>
              
              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="flex items-baseline">
                  <span className="text-2xl text-muted-foreground line-through">₹499</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold text-gradient">₹9</span>
                  <span className="text-muted-foreground">/lifetime</span>
                </div>
              </div>
              
              <Badge variant="destructive" className="mt-3">
                <Zap className="w-3 h-3 mr-1" />
                98% Discount - Limited Time!
              </Badge>
            </div>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                  data-testid={`benefit-item-${index}`}
                >
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <benefit.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{benefit.title}</p>
                    <p className="text-xs text-muted-foreground">{benefit.description}</p>
                  </div>
                  <Check className="w-4 h-4 text-primary ml-auto shrink-0" />
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="w-full py-6 text-lg font-semibold"
              asChild
              data-testid="button-pricing-cta"
            >
              <a href="/api/login">
                Get Started Now - ₹9 Only
              </a>
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-4">
              Instant access after payment. No recurring charges.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
