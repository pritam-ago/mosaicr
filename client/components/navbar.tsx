"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function NavbarRetro() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full px-6 py-4 bg-[#D9D8D7] border-b-[3px] border-[#0D0D0D] shadow-[6px_6px_0_#0D0D0D] relative z-50">
      
      {/* DESKTOP */}
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="font-extrabold md:-ml-30 text-2xl tracking-wider uppercase text-[#0D0D0D]">
          Mosaicr
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <NavItem text="Home" href="/" />
          <NavItem text="Generate" href="/generate" />
          <NavItem text="Upload" href="/upload" />
          <NavItem text="Dashboard" href="/dashboard" />

          <Link
            href="/auth"
            className="
              px-4 py-2 rounded-lg font-bold 
              bg-[#D93A2B] text-[#D9D8D7] 
              border-[3px] border-[#0D0D0D]
              shadow-[4px_4px_0_#0D0D0D]
              hover:shadow-[6px_6px_0_#0D0D0D]
              transition-all duration-300
            "
          >
            Login
          </Link>
        </div>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden p-2 border-[3px] border-[#0D0D0D] bg-[#D9A296] rounded-lg shadow-[4px_4px_0_#0D0D0D]"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="
              md:hidden mt-4 
              bg-[#D9A296] 
              border-[3px] border-[#0D0D0D] 
              shadow-[6px_6px_0_#0D0D0D] 
              rounded-xl p-5
            "
          >
            <MobileNavItem text="Home" href="/" setOpen={setOpen} />
            <MobileNavItem text="Generate" href="/generate" setOpen={setOpen} />
            <MobileNavItem text="Upload" href="/upload" setOpen={setOpen} />
            <MobileNavItem text="Dashboard" href="/dashboard" setOpen={setOpen} />

            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="
                block mt-3 px-4 py-2 text-center rounded-lg 
                bg-[#D93A2B] text-[#D9D8D7] font-bold 
                border-[3px] border-[#0D0D0D]
                shadow-[4px_4px_0_#0D0D0D]
                hover:shadow-[6px_6px_0_#0D0D0D]
                transition-all duration-300
              "
            >
              Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ---------------- COMPONENTS ---------------- */

function NavItem({ text, href }: { text: string; href: string }) {
  return (
    <Link
      href={href}
      className="
        text-lg font-semibold text-[#0D0D0D] 
        hover:text-[#D93A2B] 
        transition-all
      "
    >
      {text}
    </Link>
  );
}

function MobileNavItem({
  text,
  href,
  setOpen,
}: {
  text: string;
  href: string;
  setOpen: (v: boolean) => void;
}) {
  return (
    <Link
      href={href}
      onClick={() => setOpen(false)}
      className="
        block w-full py-2 text-lg font-semibold 
        text-[#0D0D0D] 
        hover:text-[#D93A2B] 
        border-b-2 border-[#0D0D0D] 
        last:border-b-0
        transition-all
      "
    >
      {text}
    </Link>
  );
}
