import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar,  AlertTriangle, TrendingUp} from "lucide-react";
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
              We monitor all major economic events and factor them into our analysis. 
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
                    Get analysis designed to capitalize on major economic releases
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
