import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Briefcase, Plane, Coffee } from "lucide-react";
import React from "react";


const handleJoin = async () => {
  try {
    // 1. Create Razorpay order from your backend
    const res = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 99, planName: "Pure Trading Membership" }),
    });

    const data = await res.json();

    if (!data.orderId) {
      alert("Failed to create payment order.");
      return;
    }

    // 2. Razorpay Checkout Options
    const options = {
      key: data.keyId,
      amount: data.amount,
      currency: data.currency,
      name: "Pure Trading",
      description: "Membership Purchase",
      order_id: data.orderId,

      handler: function (response: any) {
        console.log("Payment success:", response);

        // Redirect → Your thank you or dashboard
        window.location.href =
          "/thank-you?paymentId=" + response.razorpay_payment_id;
      },

      modal: {
        ondismiss: function () {
          alert("Payment cancelled. You can try again anytime.");
        },
      },

      theme: { color: "#10b981" },
    };

    // 3. Open Razorpay popup
    const razor = new (window as any).Razorpay(options);

    razor.on("payment.failed", function (response: any) {
      console.log("Payment failed:", response.error);
      alert("Payment Failed: " + response.error.description);
    });

    razor.open();
  } catch (error) {
    console.error("Payment Error:", error);
    alert("Something went wrong. Try again later!");
  }
};


const scenarios = [
  { icon: Briefcase, label: "At Office" },
  { icon: Coffee, label: "At Work" },
  { icon: Plane, label: "While Traveling" },
];

export function FinalCTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="secondary" className="mb-6">
          <Zap className="w-3 h-3 mr-1" />
          Start Today
        </Badge>
        
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Trade Without the Stress
        </h2>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          No more wondering what to analyze or how to analyze. 
          Just execute our signals and focus on what matters.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {scenarios.map((scenario, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50"
              data-testid={`scenario-${index}`}
            >
              <scenario.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">{scenario.label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleJoin}
            size="lg"
            className="px-10 py-6 text-lg font-semibold animate-pulse-glow"
            asChild
            data-testid="button-final-cta"
          >
            <a>
              Join Pure Trading at ₹99
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>

          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="line-through">₹4999</span>
            <span className="text-primary font-bold text-2xl">₹99</span>
            <Badge variant="destructive">98% OFF</Badge>
          </div>

          <p className="text-xs text-muted-foreground mt-4">
            No analysis stress. Just execute. Start your profitable journey today.
          </p>
        </div>
      </div>
    </section>
  );
}
