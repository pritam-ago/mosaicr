"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import NavbarRetro from "@/components/navbar";
import FooterRetro from "@/components/footer";

// All templates to display
const templates = [
  { id: "classic", name: "Classic Retro", preview: "/templates/classic.png" },
  { id: "minimal", name: "Minimal Redline", preview: "/templates/minimal.png" },
  { id: "clean", name: "Clean Header", preview: "/templates/clean.png" },
  { id: "retro", name: "Retro Frame", preview: "/templates/retro.png" },
  { id: "bold", name: "Bold Accent", preview: "/templates/bold.png" },
];

export default function GeneralTemplatesPage() {
  return (
    <>
    <NavbarRetro />
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-20 bg-[#d9a296] relative">

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
        }}
      />

      <div className="relative z-[2] text-center max-w-5xl w-full">
        
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-[#0D0D0D]">
          Choose Your Template
        </h1>

        <p className="mt-4 text-lg opacity-80 max-w-xl mx-auto font-medium">
          Select a resume template to start editing in the Mosaicr retro builder.
        </p>

        {/* Template Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 place-items-center">

          {templates.map((template) => (
            <Link
              key={template.id}
              href={`/generate/general/edit?template=${template.id}`}
              className="w-full flex justify-center"
            >
              <motion.div
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 12 }}
                className="
                  cursor-pointer bg-[#D9D8D7] p-5 rounded-2xl 
                  border-[4px] border-[#0D0D0D]
                  shadow-[8px_8px_0_#0D0D0D]
                  hover:shadow-[12px_12px_0_#0D0D0D]
                  transition-all flex flex-col items-center gap-4 w-[260px] md:w-[280px]
                "
              >
                {/* Preview Image Placeholder */}
                <div className="w-full h-64 bg-white flex items-center justify-center rounded-lg border-[3px] border-[#0D0D0D]">
                  <Image
                    src={template.preview}
                    alt={template.name}
                    width={240}
                    height={300}
                    className="object-contain rounded"
                  />
                </div>

                <h3 className="text-xl font-extrabold uppercase tracking-wide text-[#0D0D0D]">
                  {template.name}
                </h3>
              </motion.div>
            </Link>
          ))}

        </div>
      </div>
    </section>
    <FooterRetro />
    </>
  );
}
