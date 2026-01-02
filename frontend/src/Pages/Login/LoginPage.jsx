import React, { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock,Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

function SignUpPage() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const isLoading = true;

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-md w-full bg-slate-900/60 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-blue-500/20"
    >
      <div className="p-8">
        <h2 className="text-center text-2xl font-bold text-sky-400 mb-6">
          Welcome Back
        </h2>

        {/* Form */}
        <div className="space-y-4">


          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
            <input
              required
              type="email"
              onChange={(e)=>{
                setEmail(e.target.value);
              }}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-lg 
                            bg-slate-800/60 border border-slate-700 
                            text-white placeholder-slate-400 
                            focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                            transition"

            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-slate-400 w-5 h-5" />
            <input
              required
              type={showPassword ? "text" : "password"}
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 rounded-lg 
                            bg-slate-800/60 border border-slate-700 
                            text-white placeholder-slate-400 
                            focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                            transition"

            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-slate-400 hover:text-sky-200 transition"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>


        <div>
          <button className="text-blue-300/70 cursor-pointer pt-5">Forget Password</button>
        </div>

        <button
          className="mt-6 w-full py-3 rounded-lg 
                    bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600
                    text-white font-semibold
                    hover:opacity-90 hover:shadow-lg hover:shadow-blue-500/30
                    transition"
          disabled={isLoading}
        >
          {isLoading? <Loader  className=" w-6 h-6 animate-spin  mx-auto"/>:"Login"}
        </button>
      </div>


      <div className="bg-slate-900/50 text-center py-4 text-sm text-slate-400">
        Don't have an account?{" "}
        <span onClick={() => { navigate("/signup") }} className="text-sky-400 cursor-pointer hover:underline">
          Sign up
        </span>
      </div>
    </Motion.div>
  );
}

export default SignUpPage;
