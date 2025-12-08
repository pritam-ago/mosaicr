"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { useSignIn, useSignUp, useClerk } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function AuthRetro() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const { client, user } = useClerk();
  const {setActive} = useClerk();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const [pendingVerification, setPendingVerification] = useState(false);
  const [verifCode, setVerifCode] = useState("");

  /* --------------------------------------------------------
     GOOGLE LOGIN / SIGNUP 
  -------------------------------------------------------- */
  const handleGoogleLogin = async () => {
    if (!signInLoaded) return;

    await signIn!.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/dashboard",
    });
  };

  const handleGoogleSignup = async () => {
    if (!signUpLoaded) return;

    await signUp!.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/dashboard",
    });
  };

  /* --------------------------------------------------------
     EMAIL + PASSWORD SIGNUP
  -------------------------------------------------------- */
  const handleEmailSignup = async () => {
    if (!signUpLoaded) return;

    try {
      // 1. Create user
      await signUp!.create({
        emailAddress: email,
        password,
      });

      // 2. Attach full name BEFORE verification
      await signUp!.update({
        firstName: fullName.split(" ")[0] || fullName,
        lastName: fullName.split(" ")[1] || "",
      });

      // 3. Send code
      await signUp!.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(err);
      alert(err.errors?.[0]?.longMessage || "Signup failed");
    }
  };

  /* --------------------------------------------------------
     VERIFY EMAIL CODE
  -------------------------------------------------------- */
  const handleVerifyCode = async () => {
    try {
      const attempt = await signUp!.attemptEmailAddressVerification({
        code: verifCode,
      });

      if (attempt.status === "complete") {
        redirect("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.errors?.[0]?.longMessage || "Invalid verification code");
    }
  };

  /* --------------------------------------------------------
     EMAIL + PASSWORD LOGIN
  -------------------------------------------------------- */
  const handleEmailLogin = async () => {
  if (!signInLoaded) return;

  try {
    const result = await signIn!.create({
      identifier: email,
      password,
    });

    // SUCCESS
    if (result.status === "complete") {
      await setActive({ session: result.createdSessionId });
      window.location.href = "/dashboard";
      return;
    }

    // ANY OTHER STATE (handled internally by Clerk)
    console.log("Clerk intermediate state:", result);
    return;

  } catch (err: any) {
    console.error("Login error:", err);

    const message = err?.errors?.[0]?.longMessage;

    // Only show alert on REAL failures
    if (message) {
      alert(message);
    }
  }
};



  /* --------------------------------------------------------
      UI
  -------------------------------------------------------- */
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
        <h1 className="text-4xl font-extrabold uppercase tracking-tight text-[#0D0D0D] text-center">
          {mode === "login" ? "Welcome Back" : "Join Mosaicr"}
        </h1>

        <p className="text-center mt-2 text-[#0D0D0D] opacity-80 font-medium">
          {mode === "login"
            ? "Login to continue building your retro-style resume."
            : "Create an account to start crafting retro AI-powered resumes."}
        </p>

        {/* GOOGLE BUTTON */}
        {mode === "login" ? (
          <button
            onClick={handleGoogleLogin}
            className="
              w-full mt-6 py-3 
              bg-white text-[#0D0D0D] font-semibold 
              border-4 border-[#0D0D0D] 
              rounded-lg flex items-center justify-center gap-3
              shadow-[5px_5px_0_#0D0D0D]
              hover:shadow-[7px_7px_0_#0D0D0D]
              transition-all duration-300
            "
          >
            <Image src="/google.png" width={20} height={20} alt="Google" />
            Continue with Google
          </button>
        ) : (
          <button
            onClick={handleGoogleSignup}
            className="
              w-full mt-6 py-3 
              bg-white text-[#0D0D0D] font-semibold 
              border-4 border-[#0D0D0D] 
              rounded-lg flex items-center justify-center gap-3
              shadow-[5px_5px_0_#0D0D0D]
              hover:shadow-[7px_7px_0_#0D0D0D]
              transition-all duration-300
            "
          >
            <Image src="/google.png" width={20} height={20} alt="Google" />
            Signup with Google
          </button>
        )}

        {/* DIVIDER */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-2 bg-[#0D0D0D] flex-1"></div>
          <span className="font-bold text-[#0D0D0D] text-sm">OR</span>
          <div className="h-2 bg-[#0D0D0D] flex-1"></div>
        </div>

        {/* EMAIL FORM */}
        {pendingVerification ? (
          <div className="space-y-4">
            <InputField
              icon={Mail}
              placeholder="Enter verification code"
              type="text"
              value={verifCode}
              onChange={setVerifCode}
            />

            <button
              type="button"
              onClick={handleVerifyCode}
              className="
                w-full py-3 mt-2 
                bg-[#D93A2B] text-[#D9D8D7] font-bold 
                rounded-lg border-4 border-[#0D0D0D]
                shadow-[5px_5px_0_#0D0D0D]
                hover:shadow-[7px_7px_0_#0D0D0D]
                transition-all duration-300
                flex items-center justify-center gap-2
              "
            >
              Verify Email
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {mode === "signup" && (
              <InputField
                icon={User}
                placeholder="Full Name"
                type="text"
                value={fullName}
                onChange={setFullName}
              />
            )}

            <InputField
              icon={Mail}
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={setEmail}
            />

            <InputField
              icon={Lock}
              placeholder="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />

            <button
              type="button"
              onClick={mode === "login" ? handleEmailLogin : handleEmailSignup}
              className="
                w-full py-3 mt-2 
                bg-[#D93A2B] text-[#D9D8D7] font-bold 
                rounded-lg border-4 border-[#0D0D0D]
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
        )}

        {/* Switch Mode */}
        <p className="text-center mt-5 text-[#0D0D0D] font-medium text-sm">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
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

/* --------------------------------------------------------
   INPUT FIELD — NO STYLING CHANGES
-------------------------------------------------------- */
function InputField({ icon: Icon, placeholder, type, value, onChange }: any) {
  return (
    <div
      className="
      w-full flex items-center gap-3 border-4 border-[#0D0D0D] 
      rounded-lg px-4 py-3
      shadow-[4px_4px_0_#0D0D0D]
    "
    >
      <Icon className="w-5 h-5 text-[#0D0D0D]" />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-[#0D0D0D] font-medium"
      />
    </div>
  );
}
