import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Send } from "lucide-react";

export default function ThankYou() {

  // Get paymentId manually from URL
  const paymentId = new URLSearchParams(window.location.search).get("paymentId");
  const [timer, setTimer] = useState(10);

  // Auto redirect after 10 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          window.location.href = "/thank-you"; // Change to your dashboard URL
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6">
      <div className="max-w-lg w-full bg-gray-900/60 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl animate-fadeIn">

        <div className="flex justify-center mb-6">
          <CheckCircle className="text-green-400 w-16 h-16" />
        </div>

        <h1 className="text-3xl font-bold text-center mb-3">
          Payment Successful 🎉
        </h1>

        <p className="text-center text-gray-300 mb-6">
          Welcome to <span className="text-green-400 font-semibold">Pure Trading Premium</span>!
          <br />
          Your membership is now active.
        </p>

        {paymentId && (
          <div className="bg-gray-800 text-sm text-gray-300 p-3 rounded-lg mb-6">
            <strong>Payment ID:</strong> {paymentId}
          </div>
        )}

        <div className="space-y-3">
          <Button
            variant="secondary"
            className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700"
            onClick={() => window.open("https://drive.google.com/file/d/1q-rcGBZsOZXI4usfRHkCXfnSUxrdBspj/view?usp=drive_link", "_blank")}
          >
            Download Book 1 (Worth ₹800)
            <Download className="w-4 h-4" />
          </Button>

          <Button
            variant="secondary"
            className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700"
            onClick={() => window.open("", "_blank")}
          >
            Download Book 2 (Worth ₹4200)
            <Download className="w-4 h-4" />
          </Button>

          <Button
            variant="secondary"
            className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700"
            onClick={() => window.open("https://drive.google.com/file/d/149JYWNb84QPpJ80Kq7vI_P74udDZPM1D/view?usp=drive_link", "_blank")}
          >
            Download Book 3 (Worth ₹3800)
            <Download className="w-4 h-4" />
          </Button>

          <Button
            variant="secondary"
            className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700"
            onClick={() => window.open("https://drive.google.com/file/d/17syWymiTO2emP5I8lnsI2sSpWI-j2HLS/view?usp=drive_link", "_blank")}
          >
            Technical Analysis and risk Management PDF (Worth ₹2200)
            <Download className="w-4 h-4" />
          </Button>
        </div>

        <Button
          className="w-full mt-6 bg-green-500 hover:bg-green-600 text-black font-semibold"
          onClick={() => window.open("https://t.me/+qJEPE2RxT1o2ZDFl", "_blank")}
        >
          Join Telegram Community
          <Send className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
