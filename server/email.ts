import nodemailer from "nodemailer";

export const sendMembershipEmail = async (toEmail: string, paymentId: string, userName?: string) => {
try {
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,       // your email
        pass: process.env.EMAIL_PASS,       // app password
    },
    });

    const mailOptions = {
    from: `"Pure Trading" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "🎉 Welcome to Pure Trading Premium!",
    html: `
        <!doctype html>
<html>
    <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Pure Trading Premium Access</title>
    <style>
        /* General reset */
        body {
        margin: 0;
        padding: 0;
        background-color: #0b1120;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        color: #e5e7eb;
        }
        a { color: #22c55e; text-decoration: none; }
        a:hover { text-decoration: underline; }
        .btn-primary {
        display: inline-block;
        background: #22c55e;
        color: #000000 !important;
        padding: 10px 22px;
        border-radius: 999px;
        font-weight: 600;
        font-size: 14px;
        }
        .btn-secondary {
        display: inline-block;
        background: #111827;
        color: #e5e7eb !important;
        padding: 8px 16px;
        border-radius: 999px;
        font-size: 13px;
        border: 1px solid #374151;
        }
        .badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 999px;
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        background: rgba(34,197,94,0.1);
        color: #22c55e;
        }
        .tag {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 999px;
        font-size: 11px;
        background: #111827;
        color: #9ca3af;
        margin-right: 4px;
        }
        .divider {
        border-top: 1px solid #1f2937;
        margin: 24px 0;
        }
        .code {
        font-family: "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        background: #020617;
        padding: 6px 10px;
        border-radius: 6px;
        font-size: 12px;
        color: #e5e7eb;
        }
        @media only screen and (max-width: 600px) {
        .container {
            width: 100% !important;
            padding: 16px !important;
        }
        h1 { font-size: 22px !important; }
        }
    </style>
    </head>
    <body>
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
        <td align="center" style="padding: 32px 16px;">
            <table class="container" width="100%" style="max-width: 560px; background: radial-gradient(circle at top, #111827 0, #020617 55%); border-radius: 20px; border: 1px solid #111827; padding: 24px 24px 28px;">
            <!-- Header / Logo -->
            <tr>
                <td align="center" style="padding-bottom: 16px;">
                <img src="YOUR_LOGO_URL" alt="Pure Trading" width="120" style="margin-bottom: 12px;" />
                <div style="font-weight: 700; font-size: 20px; letter-spacing: 0.12em; text-transform: uppercase;">
                    <span style="color: #22c55e;">PURE</span> TRADING
                </div>
                <div style="margin-top: 6px;">
                    <span class="badge">Premium Membership Activated</span>
                </div>
                </td>
            </tr>

            <!-- Title & Intro -->
            <tr>
                <td style="padding-top: 8px;">
                <h1 style="margin: 0 0 8px; font-size: 24px; color: #f9fafb; text-align: left;">
                    Welcome${userName ? `, ${userName}` : ""} 🎉
                </h1>
                <p style="margin: 0 0 10px; font-size: 14px; color: #9ca3af; line-height: 1.6;">
                    Your <strong>Pure Trading Premium</strong> membership is now live.  
                    You’ve just unlocked professional trading guidance, forex signals, and structured learning.
                </p>
                </td>
            </tr>

            <!-- Payment Info -->
            <tr>
                <td style="padding-top: 4px;">
                <div style="background: #020617; padding: 12px 14px; border-radius: 12px; border: 1px solid #111827; font-size: 12px; color: #9ca3af;">
                    <div style="margin-bottom: 6px; font-size: 12px; color: #e5e7eb;">
                    <strong>Payment Details</strong>
                    </div>
                    <div style="margin-bottom: 4px;">
                    <span style="opacity: 0.7;">Payment ID:</span> 
                    <span class="code">${paymentId}</span>
                    </div>
                    <div>
                    <span class="tag">Status: <span style="color:#22c55e;">Success</span></span>
                    <span class="tag">Access: Immediate</span>
                    </div>
                </div>
                </td>
            </tr>

            <!-- Resources Section -->
            <tr>
                <td style="padding-top: 18px;">
                <h2 style="margin: 0 0 6px; font-size: 16px; color: #e5e7eb;">
                    📘 Your Learning Resources
                </h2>
                <p style="margin: 0 0 10px; font-size: 13px; color: #9ca3af; line-height: 1.6;">
                    Start with these PDFs to build a strong foundation. You can access them anytime:
                </p>

                <ul style="padding-left: 18px; margin: 0 0 6px; font-size: 13px; color: #d1d5db;">
                    <li>
                    <a href="YOUR_BOOK_1_URL" target="_blank">Book 1 – Basics of Forex & Market Structure</a>
                    </li>
                    <li>
                    <a href="YOUR_BOOK_2_URL" target="_blank">Book 2 – Risk Management & Psychology</a>
                    </li>
                    <li>
                    <a href="YOUR_BOOK_3_URL" target="_blank">Book 3 – Strategy & Prop Firm Preparation</a>
                    </li>
                </ul>
                </td>
            </tr>

            <!-- Telegram CTA -->
            <tr>
                <td style="padding-top: 18px;">
                <h2 style="margin: 0 0 6px; font-size: 16px; color: #e5e7eb;">
                    📢 Join the Private Telegram Community
                </h2>
                <p style="margin: 0 0 12px; font-size: 13px; color: #9ca3af; line-height: 1.6;">
                    Get daily updates, live market insights, and signals directly on Telegram.
                </p>
                <div style="text-align: left; margin-bottom: 4px;">
                    <a href="YOUR_TELEGRAM_LINK" target="_blank" class="btn-primary">
                    Join Telegram Channel
                    </a>
                </div>
                <p style="margin: 4px 0 0; font-size: 11px; color: #6b7280;">
                    Use the same Telegram account you regularly use for trading updates.
                </p>
                </td>
            </tr>

            <tr>
                <td class="divider"></td>
            </tr>

            <!-- Next Steps / Footer -->
            <tr>
                <td>
                <p style="margin: 0 0 6px; font-size: 13px; color: #9ca3af; line-height: 1.6;">
                    🔑 <strong>Next Steps:</strong>
                </p>
                <ol style="padding-left: 18px; margin: 0 0 12px; font-size: 13px; color: #d1d5db;">
                    <li>Download all 3 PDFs and go through them step-by-step.</li>
                    <li>Join the private Telegram channel using the button above.</li>
                    <li>Watch for daily signals and updates from the Pure Trading team.</li>
                </ol>

                <p style="margin: 0 0 6px; font-size: 12px; color: #6b7280;">
                    If you face any issue with access or downloads, reply to this email and we’ll assist you.
                </p>

                <p style="margin: 10px 0 0; font-size: 11px; color: #4b5563;">
                    Warm regards,<br/>
                    <strong>Pure Trading Team</strong><br/>
                    <span style="color:#6b7280;">"Trade with structure, not emotions."</span>
                </p>
                </td>
            </tr>

            </table>

            <!-- Tiny footer -->
            <table width="100%" style="max-width: 560px; margin-top: 12px;">
            <tr>
                <td style="text-align: center; font-size: 11px; color: #4b5563;">
                You received this email because you purchased a membership on PureTrading.in.<br/>
                If this wasn’t you, please contact us immediately.
                </td>
            </tr>
            </table>

        </td>
        </tr>
    </table>
    </body>
</html>
    `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to:", toEmail);

} catch (error) {
    console.error("Email Error:", error);
}
};
