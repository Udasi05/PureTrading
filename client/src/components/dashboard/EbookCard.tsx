import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, FileText, TrendingUp } from "lucide-react";

interface EbookCardProps {
  title: string;
  description: string;
  type: "ebook" | "pdf";
  topics?: string[];
}

export function EbookCard({ title, description, type, topics }: EbookCardProps) {
  const Icon = type === "ebook" ? BookOpen : FileText;

  return (
    <Card className="p-5 hover-elevate" data-testid={`ebook-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-heading font-bold truncate">{title}</h3>
            <Badge variant="secondary" className="text-xs shrink-0">
              {type === "ebook" ? "Ebook" : "PDF"}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
          
          {topics && topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {topics.map((topic, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {topic}
                </Badge>
              ))}
            </div>
          )}

          <Button size="sm" variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function EbooksSection() {
  const resources = [
    {
      title: "Forex Trading Fundamentals",
      description: "Complete guide to understanding forex markets and currency pairs",
      type: "ebook" as const,
      topics: ["Currency Pairs", "Market Hours", "Terminology"],
    },
    {
      title: "Risk Management Mastery",
      description: "Learn to protect your capital with proper position sizing",
      type: "ebook" as const,
      topics: ["Position Sizing", "Stop Loss", "Risk:Reward"],
    },
    {
      title: "Trading Psychology",
      description: "Master your emotions and develop a winning mindset",
      type: "ebook" as const,
      topics: ["Discipline", "Patience", "Emotional Control"],
    },
    {
      title: "Technical Analysis Guide",
      description: "Comprehensive PDF covering advanced market analysis techniques",
      type: "pdf" as const,
      topics: ["Market Structure", "Liquidity", "Swap & Sweep", "Order Flow"],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h2 className="font-heading text-xl font-bold">Your Resources</h2>
      </div>
      <div className="grid gap-4">
        {resources.map((resource, index) => (
          <EbookCard key={index} {...resource} />
        ))}
      </div>
    </div>
  );
}
