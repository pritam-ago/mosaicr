"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

export default function AuthRetro() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-6 py-16 bg-[#d9a296] relative">

      {/* BG TEXTURE */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
        }}
      ></div>

      {/* CENTER CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="
          relative w-full max-w-md 
          bg-[#D9D8D7] 
          border-4 border-[#0D0D0D] 
          rounded-2xl 
          shadow-[10px_10px_0_#0D0D0D]
          px-8 py-10 z-2
        "
      >
        {/* TITLE */}
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-[#0D0D0D] text-center">
          {mode === "login" ? "Welcome Back" : "Join Mosaicr"}
        </h1>

        <p className="text-center mt-2 text-[#0D0D0D] opacity-80 font-medium">
          {mode === "login"
            ? "Login to continue building your retro-style resume."
            : "Create an account to start crafting retro AI-powered resumes."}
        </p>

        {/* GOOGLE BUTTON */}
        <button
          className="
            w-full mt-6 py-3 
            bg-white text-[#0D0D0D] font-semibold 
            border-[3px] border-[#0D0D0D] 
            rounded-lg flex items-center justify-center gap-3
            shadow-[5px_5px_0_#0D0D0D]
            hover:shadow-[7px_7px_0_#0D0D0D]
            transition-all duration-300
          "
        >
          <Image src="/google.png" width={20} height={20} alt="Google" />
          Continue with Google
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-2 bg-[#0D0D0D] flex-1"></div>
          <span className="font-bold text-[#0D0D0D] text-sm">OR</span>
          <div className="h-2 bg-[#0D0D0D] flex-1"></div>
        </div>

        {/* EMAIL FORM */}
        <form className="space-y-4">

          {/* NAME FIELD — SIGNUP ONLY */}
          {mode === "signup" && (
            <InputField
              icon={User}
              placeholder="Full Name"
              type="text"
            />
          )}

          <InputField
            icon={Mail}
            placeholder="Email Address"
            type="email"
          />

          <InputField
            icon={Lock}
            placeholder="Password"
            type="password"
          />

          {/* MAIN ACTION BUTTON */}
          <button
            className="
              w-full py-3 mt-2 
              bg-[#D93A2B] text-[#D9D8D7] font-bold 
              rounded-lg border-[3px] border-[#0D0D0D]
              shadow-[5px_5px_0_#0D0D0D]
              hover:shadow-[7px_7px_0_#0D0D0D]
              transition-all duration-300
              flex items-center justify-center gap-2
            "
          >
            {mode === "login" ? "Login" : "Create Account"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* SWITCH MODE */}
        <p className="text-center mt-5 text-[#0D0D0D] font-medium text-sm">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                className="text-[#D93A2B] underline font-semibold"
                onClick={() => setMode("signup")}
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                className="text-[#D93A2B] underline font-semibold"
                onClick={() => setMode("login")}
              >
                Login
              </button>
            </>
          )}
        </p>
      </motion.div>

    </section>
  );
}

/* —————————— INPUT FIELD —————————— */

function InputField({ icon: Icon, placeholder, type }: any) {
  return (
    <div className="
      w-full flex items-center gap-3 
      bg-[#D9D8D7] border-[3px] border-[#0D0D0D] 
      rounded-lg px-4 py-3
      shadow-[4px_4px_0_#0D0D0D]
    ">
      <Icon className="w-5 h-5 text-[#0D0D0D]" />
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-[#0D0D0D] font-medium"
      />
    </div>
  );
}
