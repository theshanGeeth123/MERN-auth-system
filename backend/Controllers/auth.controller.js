import { User } from "../Models/User.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendPasswordResetEmail, sendResetSuccessfullEmail, sendVerficationEmail, sendWelcomeEmail } from "../MailTrap/nodemailer.config.js";
import crypto from "crypto";


export const signup = async (req, res) => {

     const { email, password, name } = req.body;

     try {

          if (!email || !password || !name) {
               throw new Error("All fields are required");
          }

          const userAlreadyExists = await User.findOne({ email });

          if (userAlreadyExists) {
               return res.status(400).json({ success: false, message: "User already exists" });
          }

          const hashedPassword = await bcryptjs.hash(password, 10);

          const verfificationToken = Math.floor(100000 + Math.random() * 900000).toString();

          const user = new User({
               email,
               password: hashedPassword,
               name,
               verficationToken: verfificationToken,
               verficationTokenExpireAt: Date.now() + 24 * 60 * 60 * 1000

          })

          await user.save();

          // jwt 

          generateTokenAndSetCookie(res, user._id);

          sendVerficationEmail(user.email, verfificationToken);

          res.status(201).json({
               success: true,
               message: "User registered successfully.",
               user: {
                    ...user._doc,
                    password: undefined,
               }
          });

     } catch (error) {
          res.status(400).json({ success: false, message: error.message });
     }

}

export const verifyEmail = async (req, res) => {

     const { code } = req.body;

     try {
          const user = await User.findOne({
               verficationToken: code,
               verficationTokenExpireAt: { $gt: Date.now() }
          })

          if (!user) {
               return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
          }

          user.isVerified = true;
          user.verficationToken = undefined;
          user.verficationTokenExpireAt = undefined;

          await user.save();

          res.status(200).json({ success: true, message: "Email verified successfully" });

          await sendWelcomeEmail(user.email, user.name);

     } catch (error) {
          console.error("Error verifying email:", error);
          res.status(500).json({ success: false, message: "Server error while verifying email" });
     }

}

export const login = async (req, res) => {

     const { email, password } = req.body;

     try {

          const user = await User.findOne({ email });

          if (!user) {
               return res.status(400).json({ success: false, message: "Invalid credentials" });
          }

          const isPasswordValid = await bcryptjs.compare(password, user.password);

          if (!isPasswordValid) {
               return res.status(400).json({ success: false, message: "Invalid credentials" });
          }

          generateTokenAndSetCookie(res, user._id);

          user.lastLogin = Date.now();

          await user.save();

          res.status(200).json({
               success: true,
               message: "Logged in successfully",
               user: {
                    ...user._doc,
                    password: undefined
               }
          });

     } catch (error) {
          console.error("Error during login:", error);
          res.status(500).json({ success: false, message: error.message });
     }

}

export const logout = async (req, res) => {

     res.clearCookie("token");
     res.status(200).json({ success: true, message: "Logged out successfully" });

}

export const forgotPassword = async (req, res) => {
     const { email } = req.body;

     try {
          const user = await User.findOne({ email });

          if (!user) {
               return res.status(400).json({
                    success: false,
                    message: "User with this email does not exist"
               });
          }

          const resetToken = crypto.randomBytes(20).toString("hex");
          const resetTokenExpireAt = Date.now() + 60 * 60 * 1000; // 1 hour

          user.resetPasswordToken = resetToken;
          user.resetPasswordExpiresAt = resetTokenExpireAt;

          await user.save();

          await sendPasswordResetEmail(
               user.email,
               user.name,
               `${process.env.CLIENT_URL}/reset-password/${resetToken}`
          );

          return res.status(200).json({
               success: true,
               message: "Password reset link sent to your email"
          });

     } catch (error) {
          console.error("Error during forgot password:", error);
          return res.status(500).json({
               success: false,
               message: "Server error"
          });
     }
};


export const resetPassword = async (req, res) => {
     try {

          const token = req.params.token;
          const { password } = req.body;

          const user = await User.findOne({
               resetPasswordToken: token
          });

          if (!user) {
               return res.status(400).json({ success: false, message: "Invalid or expired password reset token" });
          }

          // update password 

          const hashedPassword = await bcryptjs.hash(password, 10);

          user.password = hashedPassword;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpiresAt = undefined;

          await user.save();

          await sendResetSuccessfullEmail(user.email, user.name);

          res.status(200).json({ success: true, message: "Password reset successfully" });


     } catch (error) {
          console.error(error);
          res.status(500).json({
               success: false,
               message: "Server error while resetting password"
          });
     }
}
