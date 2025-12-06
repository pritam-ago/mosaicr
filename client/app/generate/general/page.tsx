"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const templates = [
  { id: "classic", name: "Classic Retro", preview: "/templates/classic.png" },
  { id: "minimal", name: "Minimal Redline", preview: "/templates/minimal.png" },
  { id: "modern", name: "Modern Blocks", preview: "/templates/modern.png" },
];

export default function GeneralTemplatesPage() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 bg-[#D9D8D7] relative">

      {/* Background Texture */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
        }}
      />

      <div className="relative z-[2] text-center max-w-5xl w-full">
        <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#0D0D0D]">
          Choose a Template
        </h1>

        <p className="mt-4 text-lg opacity-80 max-w-xl mx-auto font-medium">
          Select a template to start customizing your retro-style resume.
        </p>

        {/* Template Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-10">
          {templates.map((t, i) => (
            <Link key={t.id} href={`/generate/general/edit?template=${t.id}`}>
              <motion.div
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="
                  cursor-pointer bg-[#D9D8D7] p-5 rounded-2xl 
                  border-[4px] border-[#0D0D0D]
                  shadow-[8px_8px_0_#0D0D0D]
                  hover:shadow-[12px_12px_0_#0D0D0D]
                  transition-all flex flex-col items-center gap-4
                "
              >
                <Image
                  src={t.preview}
                  alt={t.name}
                  width={300}
                  height={400}
                  className="object-contain rounded-lg border-[3px] border-[#0D0D0D]"
                />

                <h3 className="text-xl font-extrabold uppercase tracking-wide">
                  {t.name}
                </h3>
              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
