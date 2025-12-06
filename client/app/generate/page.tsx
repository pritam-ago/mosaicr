"use client";

import { motion } from "framer-motion";
import { FileText, Briefcase } from "lucide-react";
import Link from "next/link";

import NavbarRetro from "@/components/navbar";
import FooterRetro from "@/components/footer";

export default function GeneratePage() {
  return (
    <>
    <NavbarRetro />
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 bg-[#d9a296] relative">

      {/* BG TEXTURE */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
        }}
      ></div>

      {/* PAGE WRAPPER */}
      <div className="relative z-2 flex flex-col items-center text-center max-w-4xl">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#0D0D0D]"
        >
          Choose Resume Type
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-lg md:text-xl text-[#0D0D0D] opacity-80 font-medium max-w-xl"
        >
          How would you like to start your resume? Select an option below.
        </motion.p>

        {/* OPTIONS GRID */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 w-full">

          {/* GENERAL RESUME */}
          <OptionCard
            title="General Resume"
            description="Build a resume from scratch or based on your basic profile information."
            icon={FileText}
            href="/generate/general"
            color="#D93A2B"
          />

          {/* JD-BASED RESUME */}
          <OptionCard
            title="Job Description Resume"
            description="Paste a job description and let AI tailor your resume exactly for that role."
            icon={Briefcase}
            href="/generate/jd"
            color="#D9564A"
          />

        </div>
      </div>
    </section>
    <FooterRetro />
    </>
  );
}

function OptionCard({
  title,
  description,
  icon: Icon,
  href,
  color,
}: {
  title: string;
  description: string;
  icon: any;
  href: string;
  color: string;
}) {
  return (
    <Link href={href} className="h-full">
      <motion.div
        whileHover={{
          scale: 1.03,
          y: -6,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 12 }}
        className="
          h-full
          cursor-pointer
          bg-[#D9D8D7] p-8 rounded-2xl 
          border-4 border-[#0D0D0D]
          shadow-[10px_10px_0_#0D0D0D]
          hover:shadow-[14px_14px_0_#0D0D0D]
          transition-all 
          flex flex-col justify-between items-center text-center
          min-h-[380px] md:min-h-[420px]
        "
      >
        {/* TOP ICON */}
        <div
          className="
            w-20 h-20 rounded-xl 
            flex items-center justify-center
            border-4 border-[#0D0D0D]
            shadow-[5px_5px_0_#0D0D0D]
            mb-4
          "
          style={{ backgroundColor: color }}
        >
          <Icon className="w-10 h-10 text-[#D9D8D7]" />
        </div>

        {/* MIDDLE TEXT BLOCK */}
        <div className="grow flex flex-col items-center justify-center px-4">
          <h3 className="text-2xl md:text-3xl font-extrabold uppercase text-[#0D0D0D]">
            {title}
          </h3>

          <p className="text-base md:text-lg text-[#0D0D0D] opacity-80 font-medium mt-3 max-w-xs">
            {description}
          </p>
        </div>

        {/* BUTTON */}
        <div
          className="mt-6 px-6 py-2 text-lg font-bold text-[#D9D8D7] rounded-lg"
          style={{
            backgroundColor: color,
            border: "3px solid #0D0D0D",
            boxShadow: "4px 4px 0 #0D0D0D",
          }}
        >
          Continue →
        </div>
      </motion.div>
    </Link>
  );
}
