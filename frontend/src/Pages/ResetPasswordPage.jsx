import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import LoadingSpinner from "../Components/LoadingSpinner";

const ResetPasswordPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    let { resetPassword, resetPError, isLoading, message } = useAuthStore();

    const { token } = useParams();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password != confirmPassword) {
            toast.error("password do not match")
            return;
        }

        try {

            await resetPassword(token, password);

            toast.success("password reset successfully...");

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Error resetting password")
        }
    }

    return (

        !isLoading ?
            <Motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <div className="rounded-2xl border border-blue-500/20 bg-slate-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                    <div className="p-8">
                        <h2 className="text-center text-2xl font-bold text-sky-400">
                            Reset Password
                        </h2>

                        <div className="mt-7 space-y-4">
                            {/* New Password */}
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="New Password"
                                    className="w-full pl-10 pr-10 py-3 rounded-lg bg-slate-950/40 border border-slate-700/70
                           text-white placeholder-slate-500
                           focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500/70
                           transition"

                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-slate-500 hover:text-sky-400 transition"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {/* Confirm New Password */}
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm New Password"
                                    className="w-full pl-10 pr-10 py-3 rounded-lg bg-slate-950/40 border border-slate-700/70
                           text-white placeholder-slate-500
                           focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500/70
                           transition"

                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(!showConfirmPassword)
                                    }
                                    className="absolute right-3 top-3.5 text-slate-500 hover:text-sky-400 transition"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </button>
                            </div>

                            {
                                  resetPError && <p className="text-red-500 font-semibold mt-2">
                                            {resetPError}
                                        </p>
                            }

                            {/* Button */}
                            <button
                                onClick={handleSubmit}
                                type="button"
                                className="w-full mt-2 py-3 rounded-lg font-semibold text-white
                         bg-gradient-to-r from-sky-500 to-blue-600
                         hover:from-sky-400 hover:to-blue-500
                         shadow-lg shadow-blue-500/20
                         active:scale-[0.99] transition"
                            >
                                Set New Password
                            </button>
                        </div>
                    </div>
                </div>
            </Motion.div> :

            <LoadingSpinner />

    );
};

export default ResetPasswordPage;
