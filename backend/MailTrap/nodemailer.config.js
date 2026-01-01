import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sender = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const mailOptions = {
  from: `"Your Name" <${process.env.GMAIL_USER}>`,
  to: "theshangeethanjana@gmail.com",
  subject: "Test Email",
  text: "Hello! This is a test email.",
};

// sender.sendMail(mailOptions, (err, info) => {
//   if (err) {
//     console.error("Error:", err);
//   } else {
//     console.log("Email sent:", info.response);
//   }
// });


// export const sendVerficationEmail = async (client,verfificationToken) => {

//   sender.sendMail(
//     {
//       from: `"${process.env.GMAIL_USER}`,
//       to: `${client}`,
//       subject: "Test Email",
//       text: "Your verfication code is "+verfificationToken,
//     }
//     , (err, info) => {
//       if (err) {
//         console.error("Error:", err);
//       } else {
//         console.log("Email sent:", info.response);
//       }
//     });

// }

export const sendVerficationEmail = async (client, verificationToken) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
      <table width="100%">
        <tr>
          <td align="center">
            <table width="600" style="background:#ffffff; margin-top:30px; border-radius:8px;">
              <tr>
                <td style="background:#2563eb; color:#fff; padding:20px; text-align:center;">
                  <h2>Email Verification</h2>
                </td>
              </tr>

              <tr>
                <td style="padding:30px;">
                  <p>Hello,</p>
                  <p>Please use the code below to verify your email address:</p>

                  <div style="text-align:center; margin:30px 0;">
                    <span style="
                      font-size:24px;
                      letter-spacing:4px;
                      padding:15px 30px;
                      background:#f1f5f9;
                      border-radius:6px;
                      font-weight:bold;
                    ">
                      ${verificationToken}
                    </span>
                  </div>

                  

                  <p>Regards,<br/><strong>Your App Team</strong></p>
                </td>
              </tr>

              <tr>
                <td style="background:#f1f5f9; text-align:center; padding:15px; font-size:12px;">
                  © 2025 Your App
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    await sender.sendMail({
      from: `${process.env.GMAIL_USER}>`,
      to: client,
      subject: "Verify Your Email",
      html: htmlTemplate,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error(`Failed to send verification email ${error}`);
  }


};

// sendVerficationEmail("theshangeethanjana@gmail.com", 122343);


export const sendWelcomeEmail = async (client, userName) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
      <table width="100%">
        <tr>
          <td align="center">
            <table width="600" style="background:#ffffff; margin-top:30px; border-radius:8px;">
              
              <!-- Header -->
              <tr>
                <td style="background:#16a34a; color:#fff; padding:20px; text-align:center;">
                  <h2>🎉 Email Verified Successfully</h2>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:30px;">
                  <p>Hello <strong>${userName}</strong>,</p>

                  <p>
                    Your email address has been <strong>successfully verified</strong>.
                    Welcome to our platform! 🚀
                  </p>

                  <p>
                    You can now enjoy all features of our application, including
                    secure access and personalized services.
                  </p>

                  <div style="text-align:center; margin:30px 0;">
                    <span style="
                      font-size:18px;
                      padding:12px 25px;
                      background:#dcfce7;
                      color:#166534;
                      border-radius:6px;
                      font-weight:bold;
                    ">
                      Confirmation Successful ✔
                    </span>
                  </div>

                  <p>
                    If you have any questions, feel free to reach out to our support team.
                  </p>

                  <p>
                    Regards,<br/>
                    <strong>Your App Team</strong>
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f1f5f9; text-align:center; padding:15px; font-size:12px;">
                  © 2025 Your App. All rights reserved.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    await sender.sendMail({
      from: process.env.GMAIL_USER,
      to: client,
      subject: "Welcome! Your Email is Verified 🎉",
      html: htmlTemplate,
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Failed to send welcome email: ${error.message}`);
  }
};


export const sendPasswordResetEmail = async (client, userName, resetUrl) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
      <table width="100%">
        <tr>
          <td align="center">
            <table width="600" style="background:#ffffff; margin-top:30px; border-radius:8px;">
              
              <!-- Header -->
              <tr>
                <td style="background:#dc2626; color:#fff; padding:20px; text-align:center;">
                  <h2>🔒 Password Reset Request</h2>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:30px;">
                  <p>Hello <strong>${userName}</strong>,</p>

                  <p>
                    We received a request to reset your password.
                    Click the button below to create a new password.
                  </p>

                  <div style="text-align:center; margin:30px 0;">
                    <a href="${resetUrl}" target="_blank" style="
                      display:inline-block;
                      padding:14px 30px;
                      background:#dc2626;
                      color:#ffffff;
                      text-decoration:none;
                      border-radius:6px;
                      font-size:16px;
                      font-weight:bold;
                    ">
                      Reset Password
                    </a>
                  </div>

                  <p>
                    This link will expire shortly for security reasons.  
                    If you did not request a password reset, please ignore this email.
                  </p>

                  <p>
                    Regards,<br/>
                    <strong>Your App Team</strong>
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f1f5f9; text-align:center; padding:15px; font-size:12px;">
                  © 2025 Your App. All rights reserved.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    await sender.sendMail({
      from: process.env.GMAIL_USER,
      to: client,
      subject: "Reset Your Password 🔐",
      html: htmlTemplate,
    });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
};

export const sendResetSuccessfullEmail = async (client, userName) => {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
      <table width="100%">
        <tr>
          <td align="center">
            <table width="600" style="background:#ffffff; margin-top:30px; border-radius:8px;">

              <!-- Header -->
              <tr>
                <td style="background:#16a34a; color:#fff; padding:20px; text-align:center;">
                  <h2>✅ Password Reset Successful</h2>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding:30px;">
                  <p>Hello <strong>${userName}</strong>,</p>

                  <p>
                    Your password has been successfully reset.
                    You can now log in using your new password.
                  </p>

                  <p>
                    If you did not perform this action, please contact our support team immediately
                    to secure your account.
                  </p>

                  <p>
                    Stay safe,<br/>
                    <strong>Your App Team</strong>
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background:#f1f5f9; text-align:center; padding:15px; font-size:12px;">
                  © 2025 Your App. All rights reserved.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    await sender.sendMail({
      from: process.env.GMAIL_USER,
      to: client,
      subject: "Your Password Was Reset Successfully ✅",
      html: htmlTemplate,
    });
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error(`Failed to send password reset success email: ${error.message}`);
  }
};

