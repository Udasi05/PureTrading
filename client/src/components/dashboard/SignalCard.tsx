import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Clock, Target, Shield, AlertCircle } from "lucide-react";
import type { Signal } from "@shared/schema";
import { format } from "date-fns";

interface SignalCardProps {
  signal: Signal;
}

export function SignalCard({ signal }: SignalCardProps) {
  const isBuy = signal.direction.toLowerCase() === "buy";
  const directionColor = isBuy ? "text-green-500" : "text-red-500";
  const directionBg = isBuy ? "bg-green-500/10" : "bg-red-500/10";
  const directionBorder = isBuy ? "border-green-500/20" : "border-red-500/20";

  const getStatusBadge = () => {
    switch (signal.status) {
      case "active":
        return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">Active</Badge>;
      case "closed":
        return <Badge variant="secondary">Closed</Badge>;
      case "cancelled":
        return <Badge variant="outline">Cancelled</Badge>;
      default:
        return null;
    }
  };

  const getResultBadge = () => {
    if (!signal.result) return null;
    switch (signal.result) {
      case "tp1":
      case "tp2":
      case "tp3":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            {signal.result.toUpperCase()} Hit
          </Badge>
        );
      case "sl":
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
            SL Hit
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card
      className={`p-5 ${directionBorder} hover-elevate transition-all duration-300`}
      data-testid={`signal-card-${signal.id}`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl ${directionBg} flex items-center justify-center`}>
            {isBuy ? (
              <TrendingUp className={`w-6 h-6 ${directionColor}`} />
            ) : (
              <TrendingDown className={`w-6 h-6 ${directionColor}`} />
            )}
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg">{signal.instrument}</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {signal.instrumentType}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {signal.session}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge className={`${directionBg} ${directionColor} ${directionBorder}`}>
            {signal.direction.toUpperCase()}
          </Badge>
          {getStatusBadge()}
          {getResultBadge()}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">Entry</p>
          <p className="font-mono font-bold text-primary">{signal.entryPrice}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">Stop Loss</p>
          <p className="font-mono font-bold text-destructive">{signal.stopLoss}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground mb-1">Take Profit 1</p>
          <p className="font-mono font-bold text-green-500">{signal.takeProfit1}</p>
        </div>
      </div>

      {(signal.takeProfit2 || signal.takeProfit3) && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {signal.takeProfit2 && (
            <div className="bg-muted/30 rounded-lg p-2 text-center">
              <p className="text-xs text-muted-foreground">TP2</p>
              <p className="font-mono text-sm text-green-500">{signal.takeProfit2}</p>
            </div>
          )}
          {signal.takeProfit3 && (
            <div className="bg-muted/30 rounded-lg p-2 text-center">
              <p className="text-xs text-muted-foreground">TP3</p>
              <p className="font-mono text-sm text-green-500">{signal.takeProfit3}</p>
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between bg-muted/30 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Lot Size</p>
            <p className="font-bold text-sm">{signal.lotSize}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Risk:Reward</p>
            <p className="font-bold text-sm text-primary">{signal.riskReward || "1:2"}</p>
          </div>
        </div>
      </div>

      {signal.rationale && (
        <div className="bg-accent/50 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-primary" />
            <p className="text-xs font-medium text-muted-foreground">Trade Rationale</p>
          </div>
          <p className="text-sm">{signal.rationale}</p>
        </div>
      )}

      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>
            {signal.createdAt
              ? format(new Date(signal.createdAt), "MMM d, yyyy h:mm a")
              : "Just now"}
          </span>
        </div>
      </div>
    </Card>
  );
}
