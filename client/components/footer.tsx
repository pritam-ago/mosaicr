"use client";

import { Instagram, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function FooterRetro() {
  return (
    <footer className="relative w-full bg-[#D9D8D7] border-t-[3px] border-[#0D0D0D] shadow-[0_-6px_0_#0D0D0D]">
      
      {/* BACKGROUND TEXTURE */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/paper-fibers.png")',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-12 text-[#0D0D0D]">

        {/* LOGO + DESC */}
        <div className="space-y-4">
          <div className="font-extrabold text-2xl tracking-wider uppercase text-[#0D0D0D]">
            MosaicR
          </div>

          <p className="font-medium max-w-xs leading-relaxed">
            Mosaicr helps you craft beautiful AI-powered resumes and get 
            ATS-friendly optimization tips, all wrapped in a retro design.
          </p>
        </div>

        {/* LINKS */}
        <div className="space-y-4">
          <h3 className="text-2xl font-extrabold uppercase underline decoration-[#0D0D0D] decoration-[4px]">
            Navigation
          </h3>

          <ul className="space-y-2 font-semibold">
            <li><Link href="/" className="hover:text-[#D93A2B]">Home</Link></li>
            <li><Link href="/generate" className="hover:text-[#D93A2B]">Generate</Link></li>
            <li><Link href="/upload" className="hover:text-[#D93A2B]">Upload</Link></li>
            <li><Link href="/dashboard" className="hover:text-[#D93A2B]">Dashboard</Link></li>
            <li><Link href="/login" className="hover:text-[#D93A2B]">Login</Link></li>
          </ul>
        </div>

        {/* SOCIAL & CONTACT */}
        <div className="space-y-4">
          <h3 className="text-2xl font-extrabold uppercase underline decoration-[#0D0D0D] decoration-[4px]">
            Connect
          </h3>

          <p className="font-medium leading-relaxed">
            Follow updates, new features, templates and more.
          </p>

          <div className="flex gap-4 pt-1">
            <RetroIcon href="https://instagram.com" Icon={Instagram} color="#D93A2B" />
            <RetroIcon href="https://github.com" Icon={Github} color="#D93A2B" />
            <RetroIcon href="https://linkedin.com" Icon={Linkedin} color="#D93A2B" />
            <RetroIcon href="mailto:support@mosaicr.com" Icon={Mail} color="#D93A2B" />
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t-[3px] border-[#0D0D0D] bg-[#D9A296] text-black py-4 text-center font-semibold shadow-[0_-4px_0_#0D0D0D] relative">
        © {new Date().getFullYear()} Mosaicr · All rights reserved.
      </div>

    </footer>
  );
}

/* COMPONENT FOR RETRO SOCIAL ICONS  */
function RetroIcon({ href, Icon, color }: any) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        p-2 rounded-lg
        bg-[#D9D8D7]
        border-[3px] border-[#0D0D0D]
        shadow-[4px_4px_0_#0D0D0D]
        hover:shadow-[6px_6px_0_#0D0D0D]
        transition-all duration-300
      "
    >
      <Icon className="w-5 h-5" style={{ color }} />
    </a>
  );
}
