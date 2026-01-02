import React, { useState, useMemo } from "react";
import { motion as Motion } from "framer-motion";
import { User, Mail, Lock, Loader } from "lucide-react";
import PasswordSection from "./PasswordSection";
import PasswordStatus from "./PasswordStatus";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore.js";

function SignUpPage() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { signup, error, isLoading } = useAuthStore();


    const handleSignUp = async (e) => {

        e.preventDefault();

        try {
            await signup(email, password, name);
            navigate("/verify-email");
        } catch (error) {
            console.log(error);
        }

    }

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
                            required
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
                            required
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

                    {error && (
                        <p className="text-red-500 font-semibold mt-2">
                            {error}
                        </p>
                    )}


                    {/* Password */}
                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
                        <PasswordSection password={password} setPassword={setPassword} checks={checks} />
                    </div>
                </div>

                {error && (
                    <p className="text-red-500 font-semibold mt-2">
                        {error}
                    </p>
                )}


                <PasswordStatus checks={checks} password={password} score={score} />

                <button
                    className="mt-6 w-full py-3 rounded-lg 
                    bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600
                    text-white font-semibold
                    hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/30
                    transition"

                    disabled={isLoading || !isValidPassword}

                    

                    onClick={handleSignUp}
                >
                    {isLoading ? <Loader className=" w-6 h-6 animate-spin  mx-auto" /> : "Sign Up"}
                </button>
            </div>


            <div className="bg-slate-900/50 text-center py-4 text-sm text-slate-400">
                Already have an account?{" "}
                <span onClick={() => { navigate("/login") }} className="text-sky-400 cursor-pointer hover:underline">
                    Log in
                </span>
            </div>
        </Motion.div>
    );
}

export default SignUpPage;
