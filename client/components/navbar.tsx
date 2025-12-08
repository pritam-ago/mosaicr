"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, LogOut, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { useUser, useClerk } from "@clerk/nextjs";

export default function NavbarRetro() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* CLOSE DROPDOWN ON OUTSIDE CLICK */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="w-full px-6 py-4 bg-[#D9D8D7] border-b-[3px] border-[#0D0D0D] shadow-[6px_6px_0_#0D0D0D] relative z-50">
      
      {/* DESKTOP NAV */}
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="font-extrabold text-2xl tracking-wider uppercase text-[#0D0D0D]">
          Mosaicr
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          <NavItem text="Home" href="/" />
          <NavItem text="Generate" href="/generate" />
          <NavItem text="Upload" href="/upload" />
          {isSignedIn && (
            <NavItem text="Dashboard" href="/dashboard" />
          )}

          {/* IF NOT LOGGED IN */}
          {!isSignedIn && (
            <Link
              href="/auth"
              className="
                px-4 py-2 rounded-lg font-bold 
                bg-[#D93A2B] text-[#D9D8D7] 
                border-[3px] border-[#0D0D0D]
                shadow-[4px_4px_0_#0D0D0D]
                hover:shadow-[6px_6px_0_#0D0D0D]
                transition-all
              "
            >
              Login
            </Link>
          )}

          {/* IF LOGGED IN — PROFILE DROPDOWN */}
          {isSignedIn && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdown(!dropdown)}
                className="flex items-center gap-2 border-[3px] border-[#0D0D0D] bg-[#D9A296] px-3 py-1 rounded-lg shadow-[4px_4px_0_#0D0D0D]"
              >
                <Image
                  src={"/pfp.png"}
                  width={28}
                  height={28}
                  alt="Profile picture"
                  className="rounded-full border-[2px] border-[#0D0D0D]"
                />
                <span className="font-bold text-[#0D0D0D]">{user?.fullName || "User"}</span>
                <ChevronDown size={18} />
              </button>

              {/* DROPDOWN MENU */}
              <AnimatePresence>
                {dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="
                      absolute right-0 mt-2 w-40 
                      bg-[#D9D8D7] border-[3px] border-[#0D0D0D] 
                      rounded-lg shadow-[5px_5px_0_#0D0D0D]
                      z-20
                    "
                  >
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[#D9A296] border-b-[3px] border-[#0D0D0D]"
                      onClick={() => setDropdown(false)}
                    >
                      <User size={18} /> Profile
                    </Link>

                    <button
                      onClick={() => signOut().then(() => (window.location.href = "/"))}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-[#D9A296]"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* MOBILE HAMBURGER */}
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

            {/* Mobile login/logout */}
            {!isSignedIn ? (
              <Link
                href="/auth"
                onClick={() => setOpen(false)}
                className="
                  block mt-3 px-4 py-2 text-center rounded-lg 
                  bg-[#D93A2B] text-[#D9D8D7] font-bold 
                  border-[3px] border-[#0D0D0D]
                  shadow-[4px_4px_0_#0D0D0D]
                  hover:shadow-[6px_6px_0_#0D0D0D]
                "
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => signOut().then(() => (window.location.href = "/"))}
                className="
                  block w-full mt-3 px-4 py-2 text-center rounded-lg 
                  bg-[#D93A2B] text-[#D9D8D7] font-bold 
                  border-[3px] border-[#0D0D0D]
                  shadow-[4px_4px_0_#0D0D0D]
                "
              >
                Logout
              </button>
            )}
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
      className="text-lg font-semibold text-[#0D0D0D] hover:text-[#D93A2B] transition-all"
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
        text-[#0D0D0D] hover:text-[#D93A2B] 
        border-b-2 border-[#0D0D0D] last:border-b-0
        transition-all
      "
    >
      {text}
    </Link>
  );
}
