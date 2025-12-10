import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, CircleDollarSign } from "lucide-react";
import { SiBitcoin } from "react-icons/si";

const instruments = [
  {
    name: "Forex (FX)",
    description: "Major, Minor & Exotic pairs",
    pairs: ["EUR/USD", "GBP/USD", "USD/JPY", "AUD/USD"],
    icon: CircleDollarSign,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
  },
  {
    name: "Gold (XAUUSD)",
    description: "Spot Gold trading analysis",
    pairs: ["XAU/USD"],
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
  },
  {
    name: "Silver (XAGUSD)",
    description: "Spot Silver trading analysis",
    pairs: ["XAG/USD"],
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <circle cx="12" cy="12" r="10" strokeWidth="2" stroke="currentColor" fill="none" />
        <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    color: "text-gray-300",
    bgColor: "bg-gray-500/10",
    borderColor: "border-gray-500/20",
  },
  {
    name: "Crypto",
    description: "Major cryptocurrencies",
    pairs: ["BTC/USD", "ETH/USD", "XRP/USD"],
    icon: SiBitcoin,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
  },
];

export function InstrumentsSection() {
  return (
    <section id="instruments" className="py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <TrendingUp className="w-3 h-3 mr-1" />
            All Major Markets
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Instruments We Cover Daily
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive analysis and analysis across all major trading instruments
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {instruments.map((instrument, index) => (
            <Card
              key={index}
              className={`p-6 ${instrument.borderColor} hover-elevate transition-all duration-300`}
              data-testid={`instrument-card-${index}`}
            >
              <div className={`w-16 h-16 rounded-xl ${instrument.bgColor} flex items-center justify-center mb-4`}>
                <instrument.icon className={`w-8 h-8 ${instrument.color}`} />
              </div>
              
              <h3 className="font-heading text-xl font-bold mb-2">{instrument.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{instrument.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {instrument.pairs.map((pair, pairIndex) => (
                  <Badge
                    key={pairIndex}
                    variant="outline"
                    className={`text-xs ${instrument.borderColor}`}
                  >
                    {pair}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Daily Analysis</span>
                  <Badge variant="secondary" className="text-xs">Active</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
