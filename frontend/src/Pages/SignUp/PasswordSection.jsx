import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordSection = ({ password, setPassword }) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-12 py-3 rounded-lg 
                            bg-slate-800/60 border border-slate-700 
                            text-white placeholder-slate-400 
                            focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500
                            transition"
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                value={password}
            />

            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-sky-400 transition"
            >
                {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                ) : (
                    <Eye className="w-5 h-5" />
                )}
            </button>
        </div>
    );
};

export default PasswordSection;
