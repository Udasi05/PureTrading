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
        <li><a href="https://drive.google.com/file/d/1q-rcGBZsOZXI4usfRHkCXfnSUxrdBspj/view?usp=drive_link">Book 1 PDF</a></li>
        <li><a href="https://drive.google.com/file/d/149JYWNb84QPpJ80Kq7vI_P74udDZPM1D/view?usp=drive_link">Book 2 PDF</a></li>
        <li><a href="https://drive.google.com/file/d/17syWymiTO2emP5I8lnsI2sSpWI-j2HLS/view?usp=drive_link">Book 3 PDF</a></li>
        </ul>

        <h3>Join the Telegram Channel</h3>
        <p><a href="https://t.me/+qJEPE2RxT1o2ZDFl">Click here to join</a></p>

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
