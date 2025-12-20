// client/src/pages/ThankYou.tsx
import { useEffect, useState } from "react";
import { CheckCircle, Download } from "lucide-react";
import { useLocation } from "wouter";

export default function ThankYou() {
  const [, navigate] = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("userId");

    if (!userId) {
      navigate("/");
      return;
    }

    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#020617] via-[#020617] to-black px-4">
      <div className="max-w-xl w-full bg-[#020617]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-10 shadow-2xl text-white">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-500/10 border border-green-500/30">
            <CheckCircle className="text-green-400 w-12 h-12" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-3">
          Welcome to Pure Trading 🎉
        </h1>

        <p className="text-center text-gray-300 text-lg mb-8">
          You’re successfully enrolled.<br />
          Access your learning resources below.
        </p>

        {/* Downloads */}
        <div className="space-y-4">
          {[
            { label: "Download Book 1", file: "/PureTrading/client/public/protected_files/book1.pdf" },
            { label: "Download Book 2", file: "/PureTrading/client/public/protected_files/book2.pdf" },
            { label: "Download Book 3", file: "/PureTrading/client/public/protected_files/book3.pdf" },
            { label: "Technical & Risk Management PDF", file: "/PureTrading/client/public/protected_files/technical-risk.pdf" },
          ].map((item) => (
            <a
              key={item.file}
              href={item.file}
              target="_blank"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition border border-gray-700 font-medium"
            >
              <Download className="w-4 h-4 text-green-400" />
              {item.label}
            </a>
          ))}
        </div>

        {/* Telegram */}
        <button
          className="w-full mt-8 py-4 rounded-xl bg-green-500 hover:bg-green-600 transition text-black font-bold text-lg shadow-lg shadow-green-500/20"
          onClick={() => window.open("https://t.me/+qJEPE2RxT1o2ZDFl", "_blank")}
        >
          Join Telegram Community
        </button>

        {/* Footer note */}
        <p className="text-center text-gray-400 text-sm mt-6">
          A welcome email has been sent to your registered email.<br />
          Please check spam if not found.
        </p>
      </div>
    </div>
  );
}
