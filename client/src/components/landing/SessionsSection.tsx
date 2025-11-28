import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Sun, Building2, Moon, Zap } from "lucide-react";

const sessions = [
  {
    name: "Asian Session",
    icon: Moon,
    time: "12:00 AM - 9:00 AM IST",
    markets: ["Tokyo", "Sydney", "Singapore"],
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    description: "Lower volatility, range-bound opportunities",
  },
  {
    name: "London Session",
    icon: Building2,
    time: "1:30 PM - 10:30 PM IST",
    markets: ["London", "Frankfurt", "Paris"],
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    description: "High liquidity, breakout opportunities",
  },
  {
    name: "New York Session",
    icon: Sun,
    time: "6:30 PM - 3:30 AM IST",
    markets: ["New York", "Chicago", "Toronto"],
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    description: "Major news, high volatility moves",
  },
];

export function SessionsSection() {
  return (
    <section id="sessions" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <Clock className="w-3 h-3 mr-1" />
            24/7 Coverage
          </Badge>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Signals Across All Sessions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We cover every major trading session so you never miss a profitable opportunity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {sessions.map((session, index) => (
            <Card
              key={index}
              className={`relative p-6 ${session.borderColor} hover-elevate overflow-hidden`}
              data-testid={`session-card-${index}`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${session.bgColor} rounded-full blur-3xl opacity-50`} />
              
              <div className="relative">
                <div className={`w-14 h-14 rounded-xl ${session.bgColor} flex items-center justify-center mb-4`}>
                  <session.icon className={`w-7 h-7 ${session.color}`} />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-heading text-xl font-bold">{session.name}</h3>
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    Live
                  </Badge>
                </div>

                <p className="text-muted-foreground text-sm mb-4">{session.description}</p>

                <div className={`rounded-lg ${session.bgColor} p-3 mb-4`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className={`w-4 h-4 ${session.color}`} />
                    <span className="text-sm font-medium">{session.time}</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">Major Markets:</p>
                  <div className="flex flex-wrap gap-2">
                    {session.markets.map((market, marketIndex) => (
                      <Badge
                        key={marketIndex}
                        variant="outline"
                        className="text-xs"
                      >
                        {market}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="inline-flex items-center gap-4 p-4 bg-primary/5 border-primary/20">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="font-semibold">Trade at Office, Work, Travel - Anywhere!</p>
              <p className="text-sm text-muted-foreground">No analysis stress. Just execute our signals.</p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
