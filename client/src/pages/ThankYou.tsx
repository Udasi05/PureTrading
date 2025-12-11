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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6">
      <div className="max-w-lg w-full bg-gray-900/60 backdrop-blur-xl border border-gray-700 rounded-2xl p-8">
        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-400 w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold text-center mb-3">Payment Successful 🎉</h1>
        <p className="text-center text-gray-300 mb-6">Welcome to Pure Trading Premium! Your membership is active.</p>

        <div className="space-y-3">
          <button className="w-full btn" onClick={() => openDownload("book1")}>
            Download Book 1 (PDF)
          </button>
          <button className="w-full btn" onClick={() => openDownload("book2")}>
            Download Book 2 (PDF)
          </button>
          <button className="w-full btn" onClick={() => openDownload("book3")}>
            Download Book 3 (PDF)
          </button>
        </div>

        <button className="w-full mt-6 btn-primary" onClick={() => window.open("https://t.me/+qJEPE2RxT1o2ZDFl", "_blank")}>
          Join Telegram Community
        </button>
        <p>
          Mail has been send to your registered email with resources. Check spam folder too.
        </p>
      </div>
    </div>
  );
}
