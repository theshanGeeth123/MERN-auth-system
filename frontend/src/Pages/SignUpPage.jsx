import React, { useState, useMemo, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { User, Mail, Lock } from "lucide-react";

function SignUpPage() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");


    const checks = useMemo(() => {
        return {
            minLen: password.length >= 6,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /\d/.test(password),
            special: /[^A-Za-z0-9]/.test(password),
        };
    }, [password]);


    const score = useMemo(() => {
        return Object.values(checks).filter(Boolean).length;

    }, [checks]);


    const strength = useMemo(() => {
        const percent = (score / 5) * 100;

        let label = "Very Weak";
        let colorClass = "bg-red-500";

        if (score === 2) {
            label = "Weak";
            colorClass = "bg-orange-500";
        } else if (score === 3) {
            label = "Medium";
            colorClass = "bg-yellow-500";
        } else if (score === 4) {
            label = "Strong";
            colorClass = "bg-sky-500";
        } else if (score === 5) {
            label = "Very Strong";
            colorClass = "bg-emerald-500";
        }

        return { percent, label, colorClass };
    }, [score]);

     const isValidPassword = score === 5;


    return (
        <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-md w-full bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-blue-500/20"
        >
            <div className="p-8">
                <h2 className="text-center text-2xl font-bold text-sky-400 mb-6">
                    Create Account
                </h2>

                {/* Form */}
                <div className="space-y-4">
                    {/* Full Name */}
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full pl-10 pr-4 py-3 rounded-lg 
                            bg-slate-800/60 border border-slate-700 
                            text-white placeholder-slate-400 
                            focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                            transition"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full pl-10 pr-4 py-3 rounded-lg 
                            bg-slate-800/60 border border-slate-700 
                            text-white placeholder-slate-400 
                            focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                            transition"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-3 rounded-lg 
                            bg-slate-800/60 border border-slate-700 
                            text-white placeholder-slate-400 
                            focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                            transition"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}

                            value={password}
                        />
                    </div>
                </div>


                <div className="mt-4">

                    {password.length > 0 && (
                        <>
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span>Password strength</span>
                                <span className="text-slate-200">{strength.label}</span>
                            </div>

                            <div className="h-1 w-full bg-slate-700 rounded-full mb-3">
                                <div
                                    className={`h-full ${strength.colorClass} rounded-full transition-all duration-300`}
                                    style={{ width: `${strength.percent}%` }}
                                />
                            </div>
                        </>

                    )}

                    <ul className="text-xs text-slate-400 space-y-1">
                        <li className={checks.minLen ? "text-emerald-400" : "text-slate-400"}>
                            {checks.minLen ? "✔" : "✖"} At least 6 characters
                        </li>

                        <li className={checks.upper ? "text-emerald-400" : "text-slate-400"}>
                            {checks.upper ? "✔" : "✖"} Contains uppercase letter
                        </li>

                        <li className={checks.lower ? "text-emerald-400" : "text-slate-400"}>
                            {checks.lower ? "✔" : "✖"} Contains lowercase letter
                        </li>

                        <li className={checks.number ? "text-emerald-400" : "text-slate-400"}>
                            {checks.number ? "✔" : "✖"} Contains a number
                        </li>

                        <li className={checks.special ? "text-emerald-400" : "text-slate-400"}>
                            {checks.special ? "✔" : "✖"} Contains special character
                        </li>

                    </ul>
                </div>

                <button
                    className="mt-6 w-full py-3 rounded-lg 
                    bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600
                    text-white font-semibold
                    hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/30
                    transition"

                    disabled={!isValidPassword}
                >
                    Sign Up
                </button>
            </div>

            
            <div className="bg-slate-900/50 text-center py-4 text-sm text-slate-400">
                Already have an account?{" "}
                <span className="text-sky-400 cursor-pointer hover:underline">
                    Log in
                </span>
            </div>
        </Motion.div>
    );
}

export default SignUpPage;
