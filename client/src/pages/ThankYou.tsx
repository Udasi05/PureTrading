import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Send } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function ThankYou() {
const [params] = useSearchParams();
const paymentId = params.get("paymentId");
const [timer, setTimer] = useState(10);

  // Auto redirect after 10 seconds
useEffect(() => {
    const interval = setInterval(() => {
    setTimer((t) => {
        if (t <= 1) {
        window.location.href = "/dashboard";
        }
        return t - 1;
    });
    }, 1000);

    return () => clearInterval(interval);
}, []);

return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6">
    <div className="max-w-lg w-full bg-gray-900/60 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl animate-fadeIn">
        
        {/* Success Icon */}
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

        {/* PDF Downloads */}
        <div className="space-y-3">
        <Button
            variant="secondary"
            className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700"
            onClick={() => window.open("YOUR_BOOK_1_URL.pdf", "_blank")}
        >
            Download Book 1 (PDF)
            <Download className="w-4 h-4" />
        </Button>

        <Button
            variant="secondary"
            className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700"
            onClick={() => window.open("YOUR_BOOK_2_URL.pdf", "_blank")}
        >
            Download Book 2 (PDF)
            <Download className="w-4 h-4" />
        </Button>

        <Button
            variant="secondary"
            className="w-full flex items-center justify-between bg-gray-800 hover:bg-gray-700"
            onClick={() => window.open("YOUR_BOOK_3_URL.pdf", "_blank")}
        >
            Download Book 3 (PDF)
            <Download className="w-4 h-4" />
        </Button>
        </div>

        {/* Telegram Button */}
        <Button
        className="w-full mt-6 bg-green-500 hover:bg-green-600 text-black font-semibold"
        onClick={() => window.open("YOUR_TELEGRAM_INVITE_LINK", "_blank")}
        >
        Join Telegram Community
        <Send className="ml-2 w-4 h-4" />
        </Button>

        <p className="text-center text-gray-400 text-sm mt-6">
        Redirecting to dashboard in <span className="text-green-400">{timer}</span> seconds...
        </p>
    </div>
    </div>
);
}
