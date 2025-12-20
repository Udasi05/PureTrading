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
import { usePopup } from "@/context/PopupContext";

export function PricingSection() {
  const { openPopup } = usePopup();

  // SAME handler used in HeroSection & FinalCTASection
  // const handleUserDetails = async ({ name, email, phone }: any) => {
  //   try {
  //     const resUser = await fetch("/api/user/create", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ name, email, phone }),
  //     });

  //     const dataUser = await resUser.json();
  //     const userId = dataUser.userId;

  //     const res = await fetch("/api/payment/create-order", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         amount: 99,
  //         planName: "Pure Trading Membership",
  //         userId,
  //       }),
  //     });

  //     const data = await res.json();

  //     const razorpay = new (window as any).Razorpay({
  //       key: data.keyId,
  //       amount: data.amount,
  //       currency: data.currency,
  //       name: "Pure Trading",
  //       description: "Membership Purchase",
  //       order_id: data.orderId,

  //       handler: function (response: any) {
  //         window.location.href =
  //           "/thank-you?paymentId=" + response.razorpay_payment_id;
  //       },

  //       prefill: {
  //         name,
  //         email,
  //         contact: phone,
  //       },

  //       theme: { color: "#10b981" },
  //     });

  //     razorpay.open();
  //   } catch (err) {
  //     console.error(err);
  //     alert("Something went wrong!");
  //   }
  // };

  const handleFreeJoin = async ({ name, email, phone }: any) => {
  try {
    const res = await fetch("/api/user/free-join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong");
      return;
    }

    // redirect to thank you
    window.location.href = "/thank-you?userId=" + data.userId;
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};


  const benefits = [
    {
      icon: BookOpen,
      title: "3 Premium Ebooks Worth ₹8800",
      description: "Comprehensive trading guides for all levels",
    },
    {
      icon: FileText,
      title: "Technical Analysis & Risk Management PDF Worth ₹2200",
      description: "Market structure, liquidity, sweep methods",
    },
    {
      icon: Target,
      title: "Daily Trading Analysis",
      description: "Entries, exits, & stop loss levels",
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Perfect RR for prop firms & real accounts",
    },
    {
      icon: TrendingUp,
      title: "Trade Rationale",
      description: "Understand the logic behind each setup",
    },
    {
      icon: SiTelegram,
      title: "Telegram Alerts",
      description: "Instant notifications",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Live target & management updates",
    },
  ];

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
          <Card className="relative p-8 border-primary/50 glow-primary overflow-visible">
            
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="px-4 py-1 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            </div>

            <div className="text-center mb-8">
              <h3 className="font-heading text-2xl font-bold mb-2">
                Pure Trading Membership
              </h3>
              <p className="text-muted-foreground">
                Complete trading analysis package
              </p>

              <div className="mt-6 flex items-center justify-center gap-4">
                <span className="text-5xl font-bold text-gradient">₹0</span>
              </div>

              <Badge variant="destructive" className="mt-3">
                <Zap className="w-3 h-3 mr-1" />
                Launch Special: Free Access
              </Badge>
            </div>

            <div className="space-y-4 mb-8">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                    <b.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{b.title}</p>
                    <p className="text-xs text-muted-foreground">{b.description}</p>
                  </div>
                  <Check className="w-4 h-4 text-primary ml-auto" />
                </div>
              ))}
            </div>

            {/* FIXED JOIN BUTTON */}
            <Button
              onClick={() => openPopup(handleFreeJoin)}
              size="lg"
              className="w-full py-6 text-lg font-semibold"
            >
              Get Started Now – ₹0 Free
            </Button>

            <p className="text-center text-xs text-muted-foreground mt-4">
              Instant access.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
