import { Link } from "wouter";
import { TrendingUp, Send, Mail, Globe } from "lucide-react";
import { SiTelegram } from "react-icons/si";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-bold">Pure Trading</span>
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              Your trusted partner for professional forex signals, market analysis,
              and trading education. Start your journey to consistent profits today.
            </p>
          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5" />
            <a
              href="mailto:pure.trading2727@gmail.com"
              className="text-white hover:underline"
            >
              pure.trading2727@gmail.com
            </a>
          </div>
          </div>
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#instruments" className="text-muted-foreground hover:text-foreground transition-colors">
                  Instruments
                </a>
              </li>
              <li>
                <a href="#sessions" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sessions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © {currentYear} Pure Trading. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Language"
            >
              <Globe className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs text-muted-foreground">
            Disclaimer: This website is for educational purposes only.
            We do not provide investment advice, stock tips, or personalized financial recommendations.
            Trading in financial markets involves risk. Past performance is not indicative of future results.
          </p>

        </div>
      </div>
    </footer>
  );
}
