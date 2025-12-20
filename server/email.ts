import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMembershipEmail(
toEmail: string,
userId: string
) {
try {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Pure Trading Premium</title>

  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      color: #0f172a;
    }

    .wrapper {
      width: 100%;
      padding: 40px 16px;
    }

    .container {
      max-width: 640px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 14px;
      border: 1px solid #e5e7eb;
      overflow: hidden;
    }

    .header {
      padding: 28px;
      text-align: center;
      border-bottom: 1px solid #e5e7eb;
    }

    .brand {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 0.08em;
      color: #10b981;
    }

    .content {
      padding: 32px;
    }

    h1 {
      font-size: 24px;
      margin-bottom: 12px;
    }

    p {
      font-size: 15px;
      line-height: 1.6;
      color: #334155;
    }

    .section {
      margin-top: 28px;
    }

    .section-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #0f172a;
    }

    ul {
      padding-left: 18px;
      margin: 0;
    }

    ul li {
      margin-bottom: 10px;
      font-size: 15px;
    }

    a {
      color: #10b981;
      text-decoration: none;
      font-weight: 500;
    }

    .button {
      display: inline-block;
      margin-top: 14px;
      padding: 14px 22px;
      background: #10b981;
      color: #ffffff !important;
      font-size: 15px;
      font-weight: 600;
      border-radius: 8px;
      text-align: center;
    }

    .footer {
      padding: 24px;
      background: #f1f5f9;
      font-size: 12px;
      text-align: center;
      color: #64748b;
    }

    .footer strong {
      color: #0f172a;
    }

    @media (max-width: 600px) {
      .content {
        padding: 24px;
      }
    }
  </style>
</head>

<body>
  <div class="wrapper">
    <div class="container">

      <!-- HEADER -->
      <div class="header">
        <div class="brand">PURE TRADING</div>
      </div>

      <!-- CONTENT -->
      <div class="content">
        <h1>Welcome to Pure Trading Premium 🎉</h1>

        <p>
          Hello Trader,<br /><br />
          We’re excited to have you onboard. Your <strong>Pure Trading Premium</strong>
          access is now active, and you can start learning and trading with structure immediately.
        </p>

        <!-- RESOURCES -->
        <div class="section">
          <div class="section-title">📘 Your Learning Resources</div>
          <ul>
            <li>
              <a href="https://drive.google.com/file/d/1q-rcGBZsOZXI4usfRHkCXfnSUxrdBspj/view?usp=sharing" target="_blank">
                Book 1 – Forex Basics & Market Structure
              </a>
            </li>
            <li>
              <a href="https://drive.google.com/file/d/1PxF9z21MYliYJ2zirB9lv8g1BShHrXqz/view?usp=sharing" target="_blank">
                Book 2 – Trading Psychology & Risk Management
              </a>
            </li>
            <li>
              <a href="https://drive.google.com/file/d/1-ses5QBjmDOUF6YbQtKjm5PDyVjrzQPg/view?usp=sharing" target="_blank">
                Book 3 – Strategy & Prop Firm Preparation
              </a>
            </li>
            <li>
              <a href="https://drive.google.com/file/d/17syWymiTO2emP5I8lnsI2sSpWI-j2HLS/view?usp=sharing" target="_blank">
                Technical & Risk Management Guide
              </a>
            </li>
          </ul>
        </div>

        <!-- TELEGRAM -->
        <div class="section">
          <div class="section-title">📢 Join Our Private Telegram Community</div>
          <p>
            Get daily market analysis, trade setups, execution guidance,
            and real-time updates directly from the Pure Trading team.
          </p>

          <a
            href="https://t.me/+qJEPE2RxT1o2ZDFl"
            class="button"
            target="_blank"
          >
            Join Telegram Channel
          </a>
        </div>
    </div>

    <!-- FOOTER -->
    <div class="footer">
        You received this email because you signed up on <strong>PureTrading.in</strong>.<br />
        If this wasn’t you, please contact our support team immediately.<br /><br />
        © ${new Date().getFullYear()} Pure Trading. All rights reserved.
    </div>

    </div>
</div>
</body>
</html>
`;
    await resend.emails.send({
    from: "Pure Trading <support@puretrading.in>",
    to: toEmail,
    subject: "🎉 Your Pure Trading Premium Access is Live!",
    html,
    });

    console.log("📩 Resend Email sent to:", toEmail);
} catch (error) {
    console.error("❌ Resend Email Error:", error);
}
}
