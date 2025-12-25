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


const emailSend = async (client) => {

  sender.sendMail(
    {
      from: `"${process.env.GMAIL_USER}`,
      to: `${client}`,
      subject: "Test Email",
      text: "Hello! This is a test email.",
    }
    , (err, info) => {
      if (err) {
        console.error("Error:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });

}

emailSend("theshangeethanjana@gmail.com");