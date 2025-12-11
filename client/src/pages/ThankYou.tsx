// client/src/pages/ThankYou.tsx
import { useEffect, useState } from "react";
import { CheckCircle, Download, Send } from "lucide-react";
import { useLocation } from "wouter";

export default function ThankYou() {
  const [, navigate] = useLocation();
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pid = params.get("paymentId");
    setPaymentId(pid);
    if (!pid) {
      navigate("/");
      return;
    }

    (async () => {
      try {
        const res = await fetch(`/api/payment/verify?paymentId=${encodeURIComponent(pid)}`);
        const json = await res.json();
        if (res.ok && json.ok) {
          setVerified(true);
        } else {
          console.warn("Payment verify failed", json);
          navigate("/");
        }
      } catch (err) {
        console.error("Verify request error", err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Verifying payment...</div>;
  }
  if (!verified) return null;

  const openDownload = (key: string) => {
    // open protected download endpoint in new tab (browser will request)
    const url = `/api/download/${key}?paymentId=${encodeURIComponent(paymentId!)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white px-4">
  <div className="max-w-xl w-full bg-gray-900/40 backdrop-blur-xl border border-gray-800 rounded-3xl p-10 shadow-2xl">

    {/* Success Icon */}
    <div className="flex justify-center mb-6">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-green-500/10 border border-green-500/30">
        <CheckCircle className="text-green-400 w-12 h-12" />
      </div>
    </div>

    {/* Title */}
    <h1 className="text-4xl font-bold text-center mb-4 tracking-tight">
      Payment Successful 🎉
    </h1>

    <p className="text-center text-gray-300 text-lg mb-8">
      Welcome to <span className="text-green-400 font-semibold">Pure Trading Premium!</span>
      <br />Your membership is now active.
    </p>

    {/* Downloads */}
    <div className="space-y-4">
      <button
        className="w-full px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition border border-gray-700 text-white font-medium flex items-center justify-center gap-2"
        onClick={() => openDownload('book1')}
      >
        <Download className="w-4 h-4 text-green-400" /> Download Book 1 (PDF)
      </button>

      <button
        className="w-full px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition border border-gray-700 text-white font-medium flex items-center justify-center gap-2"
        onClick={() => openDownload('book2')}
      >
        <Download className="w-4 h-4 text-green-400" /> Download Book 2 (PDF)
      </button>

      <button
        className="w-full px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition border border-gray-700 text-white font-medium flex items-center justify-center gap-2"
        onClick={() => openDownload('book3')}
      >
        <Download className="w-4 h-4 text-green-400" /> Download Book 3 (PDF)
      </button>
    </div>

    {/* Telegram Button */}
    <button
      className="w-full mt-8 py-4 rounded-xl bg-green-500 hover:bg-green-600 transition text-black font-bold text-lg shadow-lg shadow-green-500/20"
      onClick={() => window.open("https://t.me/+qJEPE2RxT1o2ZDFl", "_blank")}
    >
      Join Telegram Community
    </button>

    {/* Note */}
    <p className="text-center text-gray-400 text-sm mt-6 leading-relaxed">
      Mail has been sent to your registered email with resources.
      <br />Check your spam folder too.
    </p>
  </div>
</div>
  );
}
