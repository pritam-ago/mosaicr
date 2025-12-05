"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, FileText, UploadCloud, Sparkles } from "lucide-react";

import NavbarRetro from "../components/navbar";
import FooterRetro from "../components/footer";

export default function LandingRetro() {
  return (
    <>
    <NavbarRetro />
    <section
      className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-20 relative"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/paper-fibers.png")',
        }}
      />

      {/* Wrapper */}
      <div className="max-w-6xl w-full flex flex-col items-center text-center gap-10 relative z-[2]">

        {/* HERO TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight uppercase text-[#0D0D0D] leading-tight">
            Build the{" "}
            <span className="px-3 py-1 rounded-lg bg-[#D93A2B] text-[#D9D8D7] shadow-[5px_5px_0_#0D0D0D] inline-block whitespace-nowrap">
              Perfect Resume
            </span>
            {" "}
            with <span className="text-[#D93A2B] underline decoration-[#0D0D0D] decoration-[6px]">AI</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto font-medium text-[#0D0D0D] leading-relaxed">
            Mosaicr helps you craft stunning, ATS-optimized resumes using powerful AI —
            all wrapped in a clean, retro-inspired interface you'll love.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-5"
        >
          <a
            href="/generate"
            className="px-8 py-4 rounded-xl bg-[#0D0D0D] text-[#D9D8D7] font-bold text-lg shadow-[6px_6px_0_#D93A2B] hover:shadow-[8px_8px_0_#D93A2B] transition-all duration-300"
          >
            Generate Resume
          </a>

          <a
            href="/upload"
            className="px-8 py-4 rounded-xl bg-[#D9564A] text-[#D9D8D7] font-bold text-lg border-[3px] border-[#0D0D0D] shadow-[5px_5px_0_#0D0D0D] hover:translate-y-[-3px] transition-all duration-300 flex items-center gap-2"
          >
            <UploadCloud className="w-5 h-5" />
            Upload for ATS Score
          </a>
        </motion.div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 w-full">
          
          {/* CARD 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-[#D9D8D7] border-[3px] border-[#0D0D0D] rounded-2xl p-6 shadow-[8px_8px_0_#0D0D0D] hover:shadow-[12px_12px_0_#0D0D0D] transition-all"
          >
            <FileText className="w-10 h-10 text-[#D93A2B] mb-4" />
            <h3 className="text-2xl font-bold text-[#0D0D0D] uppercase">
              AI Resume Generator
            </h3>
            <p className="text-md mt-3 font-medium text-black">
              Create job-ready resumes tailored to your role, automatically filled with powerful AI suggestions.
            </p>
          </motion.div>

          {/* CARD 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-[#D9A296] border-[3px] border-[#0D0D0D] rounded-2xl p-6 shadow-[8px_8px_0_#0D0D0D] hover:shadow-[12px_12px_0_#0D0D0D] transition-all"
          >
            <Sparkles className="w-10 h-10 text-[#0D0D0D] mb-4" />
            <h3 className="text-2xl font-bold text-[#0D0D0D] uppercase">
              ATS Score & Tips
            </h3>
            <p className="text-md mt-3 font-medium">
              Upload your resume and get a complete ATS breakdown with actionable optimization suggestions.
            </p>
          </motion.div>

          {/* CARD 3 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-[#D9756C] border-[3px] border-[#0D0D0D] rounded-2xl p-6 shadow-[8px_8px_0_#0D0D0D] hover:shadow-[12px_12px_0_#0D0D0D] transition-all"
          >
            <ArrowRight className="w-10 h-10 text-[#0D0D0D] mb-4" />
            <h3 className="text-2xl font-bold text-[#0D0D0D] uppercase">
              Retro Themes & Templates
            </h3>
            <p className="text-md mt-3 font-medium">
              Choose from beautifully crafted retro-themed resume templates inspired by old-school print styles.
            </p>
          </motion.div>

        </div>
      </div>

      {/* Background Gradient */}
      <style jsx>{`
        section {
          background: radial-gradient(
            circle at bottom right,
            #D9D8D7 0%,
            #D9A296 40%,
            #D9756C 100%
          );
        }
      `}</style>
    </section>
    <FooterRetro />
    </>
  );
}
