import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/ThemeProvider";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, Sun, Moon, TrendingUp, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const handleJoin = async () => {
  try {
    const res = await fetch("/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 99 }),
    });

    const data = await res.json();

    const options = {
      key: data.keyId,
      amount: data.amount,
      currency: data.currency,
      name: "Pure Trading",
      description: "Membership Purchase",
      order_id: data.orderId,

      handler: function (response: any) {
        console.log("Payment success", response);
        alert("Payment Successful!");

        window.location.href = "/dashboard"; // optional
      },

      theme: { color: "#10b981" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment Error:", error);
    alert("Something went wrong. Try again!");
  }
};

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#instruments", label: "Instruments" },
  { href: "#sessions", label: "Sessions" },
  { href: "#telegram", label: "Telegram" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-heading text-xl font-bold" data-testid="logo-text">
              Pure Trading
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {!isAuthenticated &&
              navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
              ))}
          </div>

          <div className="flex items-center gap-3">


            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                    data-testid="button-user-menu"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user.profileImageUrl || undefined}
                        alt={user.firstName || "User"}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.firstName?.[0] || user.email?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button
                onClick={handleJoin}
                asChild
                data-testid="button-join">
                  <a>Join at ₹99</a>
                </Button>
              </div>
            )}

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button size="icon" variant="ghost" data-testid="button-mobile-menu">
                  {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col gap-6 mt-8">
                  {!isAuthenticated &&
                    navLinks.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => handleNavClick(link.href)}
                        className="text-lg font-medium text-left hover:text-primary transition-colors"
                        data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                      >
                        {link.label}
                      </button>
                    ))}
                  <div className="pt-4 border-t border-border flex flex-col gap-3">
                    {isAuthenticated ? (
                      <>
                      </>
                    ) : (
                      <>
                        <Button asChild className="w-full">
                          <a>Join at ₹99</a>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
