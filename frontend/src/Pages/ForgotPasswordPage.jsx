import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";

const ForgotPasswordPage = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    

    return (

        isLoading ? <LoadingSpinner /> :
            <Motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                {!isSubmitted ?
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-sky-500/15 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-8">

                            <h1 className="text-center text-2xl font-bold text-sky-400">
                                Forgot Password
                            </h1>
                            <p className="mt-2 text-center text-sm text-slate-400 leading-relaxed">
                                Enter your email address and we’ll send you a link to reset your
                                password.
                            </p>


                            <div className="mt-6 space-y-4">
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-950/40 border border-slate-700/70
                             text-white placeholder-slate-500
                             focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500/70
                             transition"

                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }

                                        }

                                    />
                                </div>

                                <button
                                    type="button"
                                    className="w-full py-3 rounded-lg font-semibold text-white
                           bg-gradient-to-r from-sky-600 to-blue-600
                           hover:from-sky-500 hover:to-blue-500
                           shadow-lg shadow-sky-500/15
                           transition active:scale-[0.99]"
                                >
                                    Send Reset Link
                                </button>

                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-sky-300 transition pt-1"

                                    onClick={() => {
                                        navigate("/login")
                                    }}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Login
                                </button>
                            </div>
                        </div>

                        {/* Bottom subtle strip */}
                        <div className="h-1 w-full bg-gradient-to-r from-sky-500/40 via-blue-500/30 to-indigo-500/30" />
                    </div> :

                    <Motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        className="w-full max-w-md"
                    >
                        <div className="bg-slate-900/60 backdrop-blur-xl border border-sky-500/15 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-8 text-center">
                                {/* Title */}
                                <h1 className="text-2xl font-bold text-sky-400 mb-6">
                                    Forgot Password
                                </h1>

                                {/* Icon */}
                                <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-sky-500/20 flex items-center justify-center">
                                    <Mail className="w-8 h-8 text-sky-400" />
                                </div>

                                {/* Message */}
                                <p className="text-sm text-slate-300 leading-relaxed">
                                    If an account exists for{" "}
                                    <span className="text-sky-400 font-medium">
                                        {email}
                                    </span>
                                    , you will receive a password reset link shortly.
                                </p>

                                {/* Back to login */}
                                <button
                                    type="button"
                                    className="mt-8 w-full flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-sky-300 transition"

                                    onClick={() => {
                                        navigate("/login")
                                    }}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Login
                                </button>
                            </div>

                            {/* Bottom accent */}
                            <div className="h-1 w-full bg-gradient-to-r from-sky-500/40 via-blue-500/30 to-indigo-500/30" />
                        </div>
                    </Motion.div>


                }
            </Motion.div>

    );
};

export default ForgotPasswordPage;
