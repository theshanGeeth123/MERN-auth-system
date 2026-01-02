import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";

const EmailVerficationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const focusInput = (i) => {
    const el = inputRefs.current[i];
    if (el) el.focus();
  };

  const handleChange = (index, value) => {
    // Allow only digits
    const digitsOnly = value.replace(/\D/g, "");

    // If user pasted/typed multiple digits, spread across inputs
    if (digitsOnly.length > 1) {
      const newCode = [...code];
      let cursor = index;

      for (let i = 0; i < digitsOnly.length && cursor < 6; i++) {
        newCode[cursor] = digitsOnly[i];
        cursor++;
      }

      setCode(newCode);

      // Focus next empty (or last)
      const nextIndex = Math.min(cursor, 5);
      focusInput(nextIndex);
      return;
    }

    // Normal single digit input
    const newCode = [...code];
    newCode[index] = digitsOnly; // "" or "0-9"
    setCode(newCode);

    // Auto move forward if a digit entered
    if (digitsOnly && index < 5) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      // If current is empty, go back
      if (!code[index] && index > 0) {
        focusInput(index - 1);
        return;
      }

      // If current has a value, clear it (keeps cursor here)
      if (code[index]) {
        e.preventDefault();
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    }

    // Optional: Arrow navigation
    if (e.key === "ArrowLeft" && index > 0) focusInput(index - 1);
    if (e.key === "ArrowRight" && index < 5) focusInput(index + 1);
  };

  const handlePaste = (index, e) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text");
    const digits = (text || "").replace(/\D/g, "").slice(0, 6);

    if (!digits) return;

    const newCode = [...code];
    let cursor = index;

    for (let i = 0; i < digits.length && cursor < 6; i++) {
      newCode[cursor] = digits[i];
      cursor++;
    }

    setCode(newCode);
    focusInput(Math.min(cursor, 5));
  };

  const otp = code.join("");
  const canSubmit = otp.length === 6 && code.every((d) => d !== "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    try {
      setIsLoading(true);

      // ✅ Replace this with your real API call
      // Example:
      // await axios.post("/api/auth/verify-email", { code: otp });

      await new Promise((r) => setTimeout(r, 900)); // demo

      // Navigate after success
      navigate("/login"); // change route if you want
    } catch (err) {
      // On error: clear and focus first
      setCode(["", "", "", "", "", ""]);
      focusInput(0);
      console.error(err);
      alert("Invalid code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <Motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-center text-2xl font-bold text-sky-400 mb-6">
          Verify your Email
        </h2>

        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6} 
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={(e) => handlePaste(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold 
                  bg-gray-700 text-white border-2 border-gray-600 
                  rounded-lg focus:border-blue-500 focus:outline-none"
              />
            ))}
          </div>

          <Motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || !canSubmit}
            className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-blue-600 
              text-white font-bold py-3 px-4 rounded-lg shadow-lg
              hover:from-blue-600 hover:to-blue-700
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
              disabled:opacity-50"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </Motion.button>
        </form>
      </Motion.div>
    </div>
  );
};

export default EmailVerficationPage;
