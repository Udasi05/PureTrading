import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMembershipEmail(
toEmail: string,
paymentId: string,
userName?: string
) {
try {
    const html = `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pure Trading Premium</title>

    <style>
    body {
        margin: 0;
        padding: 0;
        background: #ffffff;
        font-family: Arial, Helvetica, sans-serif;
        color: #111827;
    }

    .container {
        max-width: 600px;
        margin: 0 auto;
        background: #ffffff;
        padding: 24px;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
    }

    .header {
        text-align: center;
        margin-bottom: 20px;
    }

    .title {
        color: #10b981;
        font-size: 26px;
        margin-bottom: 4px;
        font-weight: 700;
    }

    .subtitle {
        font-size: 14px;
        opacity: 0.7;
    }

    .section-title {
        font-size: 18px;
        font-weight: 600;
        margin-top: 24px;
        margin-bottom: 8px;
        color: #0f172a;
    }

    .button {
        display: inline-block;
        padding: 12px 20px;
        background: #10b981;
        color: white !important;
        font-weight: bold;
        border-radius: 8px;
        text-decoration: none;
        margin-top: 10px;
    }

    .footer {
        margin-top: 32px;
        font-size: 12px;
        text-align: center;
        color: #6b7280;
    }

    ul {
        padding-left: 18px;
    }

    a {
        color: #0ea5e9;
    }
    </style>
</head>

<body>
    <div class="container">

    <!-- HEADER -->
    <div class="header">
        <div class="title">PURE TRADING</div>
        <div class="subtitle">Premium Membership Activated 🎉</div>
    </div>

    <!-- GREETING -->
    <p style="font-size:16px;">
        Hello Trader, <br /><br />
        Your <strong>Pure Trading Premium Membership</strong> is now active.
        You now have access to our exclusive learning resources and community.
    </p>

    <!-- PAYMENT INFO -->
    <div style="
        background:#f9fafb;
        padding:14px;
        border-radius:10px;
        border:1px solid #e5e7eb;
        margin-top:16px;">
        <p style="margin:0; font-size:14px;">
        <strong>${paymentId}</strong> <span style="color:#10b981;">PAYMENT_ID_HERE</span>
        </p>
    </div>

    <!-- RESOURCES -->
    <h3 class="section-title">📘 Your Learning Resources</h3>

    <ul style="font-size:15px; line-height:1.6;">
        <li>
        <a href="https://drive.google.com/file/d/1q-rcGBZsOZXI4usfRHkCXfnSUxrdBspj/view?usp=sharing" target="_blank">
            Book 1 – Forex Basics & Market Structure
        </a>
        </li>

        <li>
        <a href="https://drive.google.com/file/d/149JYWNb84QPpJ80Kq7vI_P74udDZPM1D/view?usp=sharing" target="_blank">
            Book 2 – Trading Psychology & Risk Management
        </a>
        </li>

        <li>
        <a href="https://drive.google.com/file/d/17syWymiTO2emP5I8lnsI2sSpWI-j2HLS/view?usp=sharing" target="_blank">
            Book 3 – Trading Strategy & Prop Firm Preparation
        </a>
        </li>
    </ul>

    <!-- TELEGRAM -->
    <h3 class="section-title">📢 Join Our Premium Telegram Channel</h3>

    <p style="font-size:14px; opacity:0.9; line-height:1.5;">
        Receive daily analysis, trade updates, signal entries, and exclusive market commentary.
    </p>

    <a
        href="https://t.me/+qJEPE2RxT1o2ZDFl"
        class="button"
        target="_blank"
    >
        Join Telegram Channel
    </a>

    <!-- FOOTER -->
    <div class="footer">
        You received this email because you purchased a membership on
        <strong>PureTrading.in</strong>.
        <br />If this wasn’t you, please contact support immediately.
        <br /><br />
        © Pure Trading – Empowering Traders with Structure, Not Emotion.
    </div>
    </div>
</body>
</html>

    `;

    await resend.emails.send({
    from: "Pure Trading <noreply@puretrading.in>",
    to: toEmail,
    subject: "🎉 Your Pure Trading Premium Access is Live!",
    html,
    });

    console.log("📩 Resend Email sent to:", toEmail);
} catch (error) {
    console.error("❌ Resend Email Error:", error);
}
}
