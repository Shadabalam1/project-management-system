export function generateForgotPasswordEmailTemplate(resetPasswordUrl) {
    return `
 <div style="
    width:100%;
    background:#f1f5f9;
    padding:40px 20px;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
  ">

    <!-- Main Card -->
    <div style="
      max-width:650px;
      margin:auto;
      background:#ffffff;
      border-radius:24px;
      overflow:hidden;
      box-shadow:0 10px 40px rgba(0,0,0,0.08);
    ">

      <!-- Header -->
      <div style="
        background:linear-gradient(135deg,#4f46e5,#2563eb,#06b6d4);
        padding:60px 40px;
        text-align:center;
      ">

        <h1 style="
          margin:0;
          color:#ffffff;
          font-size:38px;
          font-weight:700;
          letter-spacing:1px;
        ">
          TaskFlow
        </h1>

        <p style="
          margin-top:14px;
          color:rgba(255,255,255,0.9);
          font-size:17px;
        ">
          Secure Project Management Platform
        </p>

      </div>

      <!-- Content -->
      <div style="padding:50px 40px;">

        <p style="
          margin:0;
          color:#4f46e5;
          font-size:13px;
          font-weight:bold;
          letter-spacing:3px;
          text-transform:uppercase;
        ">
          Password Reset Request
        </p>

        <h2 style="
          margin-top:20px;
          margin-bottom:25px;
          color:#0f172a;
          font-size:36px;
          line-height:1.3;
        ">
          Reset Your Password
        </h2>

        <p style="
          color:#475569;
          font-size:17px;
          line-height:1.8;
          margin:0;
        ">
          We received a request to reset your password.
          Click the button below to securely create a new password.
        </p>

        <!-- Button -->
        <div style="
          text-align:center;
          margin:45px 0;
        ">

          <a
            href="${resetPasswordUrl}"
            style="
              display:inline-block;
              background:linear-gradient(135deg,#4f46e5,#2563eb);
              color:#ffffff;
              text-decoration:none;
              padding:18px 42px;
              border-radius:14px;
              font-size:17px;
              font-weight:bold;
            "
          >
            Reset Password
          </a>

        </div>

        <!-- Security Box -->
        <div style="
          background:#f8fafc;
          border:1px solid #e2e8f0;
          border-radius:16px;
          padding:24px;
        ">

          <p style="
            margin:0;
            color:#334155;
            font-size:15px;
            line-height:1.8;
          ">
            🔒 This password reset link will expire in
            <strong>15 minutes</strong>.
          </p>

          <p style="
            margin-top:12px;
            color:#64748b;
            font-size:15px;
            line-height:1.8;
          ">
            If you didn’t request a password reset,
            you can safely ignore this email.
          </p>

        </div>

        <!-- Manual URL -->
        <div style="margin-top:35px;">

          <p style="
            color:#64748b;
            font-size:14px;
            margin-bottom:10px;
          ">
            Or copy and paste this URL into your browser:
          </p>

          <div style="
            background:#f1f5f9;
            padding:16px;
            border-radius:12px;
            word-break:break-all;
            color:#2563eb;
            font-size:14px;
          ">
            ${resetPasswordUrl}
          </div>

        </div>

      </div>

      <!-- Footer -->
      <div style="
        background:#0f172a;
        padding:35px;
        text-align:center;
      ">

        <h3 style="
          margin:0;
          color:#ffffff;
          font-size:20px;
        ">
          TaskFlow
        </h3>

        <p style="
          color:#94a3b8;
          font-size:14px;
          line-height:1.8;
          margin-top:12px;
        ">
          Smart project collaboration with enterprise-grade security.
        </p>

        <p style="
          margin-top:22px;
          color:#64748b;
          font-size:13px;
        ">
          © 2026 TaskFlow. All rights reserved.
        </p>

      </div>

    </div>

  </div>
    `;
  }