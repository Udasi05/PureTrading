import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMembershipEmail(
toEmail: string,
paymentId: string,
userName?: string
) {
try {
    const html = `
    <html>
    <body style="background:#0b1120;color:#fff;padding:20px;font-family:Arial">
        <h2>🎉 Welcome ${userName || ""} to Pure Trading Premium!</h2>
        <p>Your membership is now active.</p>
        <p><strong>Payment ID:</strong> ${paymentId}</p>

        <h3>Your Learning Resources:</h3>
        <ul>
        <li><a href="YOUR_BOOK_1_URL">Book 1 PDF</a></li>
        <li><a href="YOUR_BOOK_2_URL">Book 2 PDF</a></li>
        <li><a href="YOUR_BOOK_3_URL">Book 3 PDF</a></li>
        </ul>

        <h3>Join the Telegram Channel</h3>
        <p><a href="YOUR_TELEGRAM_LINK">Click here to join</a></p>

        <br />
        <p>Regards,<br>Pure Trading Team</p>
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
