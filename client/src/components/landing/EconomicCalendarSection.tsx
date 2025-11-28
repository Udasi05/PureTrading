import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, AlertTriangle, TrendingUp, Clock } from "lucide-react";

const sampleEvents = [
  {
    time: "15:30 IST",
    currency: "USD",
    event: "Non-Farm Payrolls",
    impact: "high",
    forecast: "180K",
    previous: "175K",
  },
  {
    time: "17:00 IST",
    currency: "EUR",
    event: "ECB Interest Rate Decision",
    impact: "high",
    forecast: "4.25%",
    previous: "4.25%",
  },
  {
    time: "19:30 IST",
    currency: "GBP",
    event: "BoE Governor Speech",
    impact: "medium",
    forecast: "-",
    previous: "-",
  },
  {
    time: "21:00 IST",
    currency: "USD",
    event: "ISM Manufacturing PMI",
    impact: "medium",
    forecast: "48.5",
    previous: "47.8",
  },
];

const getImpactColor = (impact: string) => {
  switch (impact) {
    case "high":
      return "bg-red-500/10 text-red-500 border-red-500/20";
    case "medium":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    default:
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
  }
};

export function EconomicCalendarSection() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <Badge variant="secondary" className="mb-4">
              <Calendar className="w-3 h-3 mr-1" />
              Economic Calendar
            </Badge>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Stay Ahead of Market-Moving News
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We monitor all major economic events and factor them into our signals. 
              Never get caught off-guard by high-impact news releases.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">High-Impact Event Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    We warn you before major news events that could affect open trades
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/30">
                <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">News-Based Trading Opportunities</p>
                  <p className="text-sm text-muted-foreground">
                    Get signals designed to capitalize on major economic releases
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.forexfactory.com/calendar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover-elevate"
                data-testid="link-forex-factory"
              >
                <span className="text-sm font-medium">Forex Factory</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://www.investing.com/economic-calendar/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover-elevate"
                data-testid="link-investing"
              >
                <span className="text-sm font-medium">Investing.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <Card className="p-6" data-testid="economic-calendar-preview">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-bold">Today's Events</h3>
              <Badge variant="outline">
                <Clock className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>

            <div className="space-y-3">
              {sampleEvents.map((event, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg bg-muted/30"
                  data-testid={`event-row-${index}`}
                >
                  <div className="text-sm font-mono text-muted-foreground w-20">
                    {event.time}
                  </div>
                  <Badge variant="outline" className="w-12 justify-center">
                    {event.currency}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{event.event}</p>
                  </div>
                  <Badge className={`text-xs ${getImpactColor(event.impact)}`}>
                    {event.impact.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Data sourced from Forex Factory & Investing.com</span>
                <span>Updated live</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
