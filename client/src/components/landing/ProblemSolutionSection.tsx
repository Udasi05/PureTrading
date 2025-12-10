import { Card } from "@/components/ui/card";
import { 
  TrendingDown, 
  Target, 
  Eye, 
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import { usePopup } from "@/context/PopupContext";


const problems = [
  {
    icon: TrendingDown,
    title: "Facing Losing Streaks?",
    description: "Watching your account drain trade after trade without knowing what went wrong?",
  },
  {
    icon: Target,
    title: "Can't Pass PropFirm Evaluations?",
    description: "Struggling to meet the strict rules and profit targets of prop firm challenges?",
  },
  {
    icon: Eye,
    title: "No Clear Market Vision?",
    description: "Confused by market movements and unable to identify high-probability setups?",
  },
  {
    icon: ShieldAlert,
    title: "Poor Risk Management?",
    description: "Taking oversized positions and blowing accounts due to emotional trading?",
  },
];

const solutions = [
  {
    title: "Professional analysis",
    description: "Get precise entry/exit points with detailed lot sizes and stop loss levels",
  },
  {
    title: "Expert Analysis",
    description: "Understand the 'why' behind every trade with our detailed rationale",
  },
  {
    title: "Perfect Risk Management",
    description: "Each analysis comes with calculated risk:reward ratios for both (propfirms & real accounts)",
  },
  {
    title: "Daily Market Overview",
    description: "Stay ahead with comprehensive analysis of all major instruments",
  },
];

export function ProblemSolutionSection() {
  const { openPopup } = usePopup();
  const handleUserDetails = async ({ name, email, phone }: any) => {
    try {
      const resUser = await fetch("/api/user/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      const dataUser = await resUser.json();
      const userId = dataUser.userId;

      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 99,
          planName: "Pure Trading Membership",
          userId,
        }),
      });

      const data = await res.json();

      const razorpay = new (window as any).Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Pure Trading",
        description: "Membership Purchase",
        order_id: data.orderId,

        handler: function (response: any) {
          window.location.href =
            "/thank-you?paymentId=" + response.razorpay_payment_id;
        },

        prefill: {
          name,
          email,
          contact: phone,
        },

        theme: { color: "#10b981" },
      });

      razorpay.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <section id="features" className="py-24 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Are You Struggling with These?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every trader faces challenges. We've built Pure Trading to solve them all.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-heading text-xl font-semibold">The Problems</h3>
            </div>
            
            {problems.map((problem, index) => (
              <Card
                key={index}
                className="p-5 border-destructive/20 bg-destructive/5 hover-elevate"
                data-testid={`problem-card-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                    <problem.icon className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold mb-1">{problem.title}</h4>
                    <p className="text-sm text-muted-foreground">{problem.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold">Our Solutions</h3>
            </div>

            {solutions.map((solution, index) => (
              <Card
                key={index}
                className="p-5 border-primary/20 bg-primary/5 hover-elevate"
                data-testid={`solution-card-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading font-semibold mb-1">{solution.title}</h4>
                    <p className="text-sm text-muted-foreground">{solution.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            <Button
              onClick={() => openPopup(handleUserDetails)}>
              Transform your trading today
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
