import axios from "axios";

export function useRazorpayPayment() {
async function startPayment(amount: number, planName: string) {
    try {
      // 1. Create order on backend
    const { data } = await axios.post("/api/payment/create-order", {
        amount,
        planName,
    });

    const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Pure Trading Membership",
        description: planName,
        order_id: data.orderId,

        handler: function (response: any) {
          // Payment Successful → Redirect to Thank You Page
        window.location.href = "/thank-you?paymentId=" + response.razorpay_payment_id;
        },

        modal: {
        ondismiss: function () {
            alert("Payment was cancelled. Please try again.");
        },
        },

        prefill: {
        name: "Pure Trading User",
        email: "pure.trading2727@gmail.com",
        },

        theme: {
        color: "#00EC92",
        },
    };

    const razorpay = new (window as any).Razorpay(options);

      // Payment Failed Handler
    razorpay.on("payment.failed", function (response: any) {
        console.error("Payment failed", response.error);
        alert("Payment Failed! Reason: " + response.error.description);
    });

    razorpay.open();

    } catch (error) {
    console.error("Payment error:", error);
    alert("Something went wrong. Please try again.");
    }
}

return { startPayment };
}
