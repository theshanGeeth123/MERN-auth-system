import express from 'express';
import { logout, signup, login,verifyEmail,forgotPassword } from '../Controllers/auth.controller.js';

const router = express.Router();

router.post("/signup",signup);

router.post("/login",login);

router.post("/logout",logout);

router.post("/verify-email",verifyEmail);

router.post("/forgot-password",forgotPassword);

router.post("/reset-password/:token",(req,res)=>{});

export default router;

