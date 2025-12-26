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


