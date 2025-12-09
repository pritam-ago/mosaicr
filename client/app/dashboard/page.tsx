"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import NavbarRetro from "@/components/navbar";
import FooterRetro from "@/components/footer";
import {
  MoreVertical,
  PlusCircle,
  Download,
  Edit3,
  Trash2,
  FileText,
} from "lucide-react";

import { SignedIn, SignedOut } from "@clerk/nextjs";

type ResumeItem = {
  id: number;
  name: string;
  updated: string;
};

export default function DashboardPage() {

  const [resumes, setResumes] = useState<ResumeItem[]>([
    { id: 1, name: "Software Engineer Resume", updated: "Jan 5, 2025" },
    { id: 2, name: "Backend Developer Resume", updated: "Dec 22, 2024" },
    { id: 3, name: "UI/UX Resume", updated: "Nov 10, 2024" },
  ]);

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  // For rename modal
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameId, setRenameId] = useState<number | null>(null);
  const [renameValue, setRenameValue] = useState("");

  // Refs for all dropdown roots (button + menu)
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Close dropdown when clicking anywhere outside any dropdown root
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInsideSomeDropdown = dropdownRefs.current.some(
        (ref) => ref && ref.contains(target),
      );
      if (!clickedInsideSomeDropdown) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openRename = (resume: ResumeItem) => {
    setRenameId(resume.id);
    setRenameValue(resume.name);
    setRenameOpen(true);
    setOpenMenuId(null);
  };

  const handleRenameSave = () => {
    if (!renameId || !renameValue.trim()) {
      setRenameOpen(false);
      return;
    }
    setResumes((prev) =>
      prev.map((r) =>
        r.id === renameId ? { ...r, name: renameValue.trim() } : r,
      ),
    );
    setRenameOpen(false);
  };

  const handleDelete = (id: number) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
    setOpenMenuId(null);
  };

  return (
    <>
      <NavbarRetro />
      <SignedIn>
      <section className="min-h-screen bg-[#D9A296] px-6 py-16 relative">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
          }}
        />

        <div className="relative z-2 max-w-6xl mx-auto">
          <h1 className="text-xl md:text-2xl font-extrabold text-[#0D0D0D] mb-12 uppercase">
            Your Resumes
          </h1>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Add resume card */}
            <Link
              href="/generate"
              className="
                group flex flex-col items-center justify-center
                border-4 border-[#0D0D0D] bg-[#D9D8D7]
                rounded-xl shadow-[8px_8px_0_#0D0D0D] p-10
                transition-all hover:shadow-[10px_10px_0_#0D0D0D]
              "
            >
              <PlusCircle className="w-14 h-14 text-[#0D0D0D] mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-lg font-bold text-[#0D0D0D]">
                Create New Resume
              </p>
            </Link>

            {/* Resume cards */}
            {resumes.map((resume, index) => (
              <div
                key={resume.id}
                className="
                  relative border-4 border-[#0D0D0D] bg-[#D9D8D7] rounded-xl
                  shadow-[8px_8px_0_#0D0D0D] p-6
                "
              >
                {/* Card body: click → view */}
                <Link href={`/resume/${resume.id}`}>
                  <div className="flex flex-col items-start gap-4 mt-4">
                    <FileText className="w-12 h-12 text-[#0D0D0D]" />
                    <h2 className="text-2xl font-bold text-[#0D0D0D]">
                      {resume.name}
                    </h2>
                    <p className="text-sm text-[#0D0D0D] opacity-70">
                      Last updated: {resume.updated}
                    </p>
                  </div>
                </Link>

                {/* DROPDOWN ROOT */}
                <div
                ref={(el) => {
                    dropdownRefs.current[index] = el;
                }}
                className="absolute top-4 right-4 z-30"
                onClick={(e) => e.stopPropagation()}
                >
                {/* 3 DOT BUTTON */}
                <button
                    onClick={() =>
                    setOpenMenuId(openMenuId === resume.id ? null : resume.id)
                    }
                    className="
                    p-1 rounded-md border-4 border-[#0D0D0D] bg-[#D9756C]
                    shadow-[3px_3px_0_#0D0D0D]
                    "
                >
                    <MoreVertical size={20} />
                </button>

                {/* DROPDOWN MENU */}
                {openMenuId === resume.id && (
                    <div
                    className="
                        absolute top-full right-0 mt-2
                        w-44 bg-[#D9D8D7]
                        border-4 border-[#0D0D0D] rounded-lg
                        shadow-[6px_6px_0_#0D0D0D]
                        z-50
                    "
                    >
                    <button
                        onClick={() => {
                        setOpenMenuId(null);
                        window.location.href = `/resume/${resume.id}`;
                        }}
                        className="w-full px-4 py-2 text-left font-bold hover:bg-[#D9756C]"
                    >
                        View
                    </button>

                    <button
                        onClick={() => {
                        setOpenMenuId(null);
                        window.location.href = `/resume/${resume.id}/edit`;
                        }}
                        className="w-full px-4 py-2 text-left font-bold flex items-center gap-2 hover:bg-[#D9756C]"
                    >
                        <Edit3 size={16} /> Edit
                    </button>

                    <button
                        onClick={() => {
                        setOpenMenuId(null);
                        alert("Downloading…");
                        }}
                        className="w-full px-4 py-2 text-left font-bold flex items-center gap-2 hover:bg-[#D9756C]"
                    >
                        <Download size={16} /> Download
                    </button>

                    <button
                        onClick={() => openRename(resume)}
                        className="w-full px-4 py-2 text-left font-bold hover:bg-[#D9756C]"
                    >
                        Rename
                    </button>

                    <button
                        onClick={() => handleDelete(resume.id)}
                        className="w-full px-4 py-2 text-left font-bold text-red-700 flex items-center gap-2 hover:bg-red-300"
                    >
                        <Trash2 size={16} /> Delete
                    </button>
                    </div>
                )}
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>
      </SignedIn>
      
            <SignedOut>
  <section className="min-h-screen w-full flex items-center justify-center bg-[#D9A296] relative px-6 py-20">

    {/* Background texture */}
    <div
      className="absolute inset-0 opacity-25 pointer-events-none"
      style={{
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
      }}
    />

    {/* Center Card */}
    <div
      className="
        relative z-2
        max-w-lg w-full text-center
        bg-[#D9D8D7]
        border-4 border-[#0D0D0D]
        rounded-2xl
        shadow-[12px_12px_0_#0D0D0D]
        px-10 py-14
      "
    >
      <h2 className="text-4xl font-extrabold uppercase text-[#0D0D0D]">
        Login Required
      </h2>

      <p className="mt-4 text-lg font-medium text-[#0D0D0D] opacity-80">
        You must be logged in to access your dashboard and resumes.
      </p>

      <Link
        href="/auth"
        className="
          inline-block mt-8 px-8 py-4
          bg-[#D93A2B] text-[#D9D8D7] font-bold text-lg
          border-4 border-[#0D0D0D]
          rounded-xl
          shadow-[6px_6px_0_#0D0D0D]
          hover:shadow-[8px_8px_0_#0D0D0D]
          transition-all duration-300
        "
      >
        Go to Login
      </Link>
    </div>
  </section>
</SignedOut>


      <FooterRetro />

      {/* Rename modal */}
      {renameOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-100">
          <div
            className="
              bg-[#D9D8D7] p-8 rounded-xl w-[90%] max-w-md
              border-4 border-[#0D0D0D] shadow-[10px_10px_0_#0D0D0D]
            "
          >
            <h2 className="text-2xl font-bold text-[#0D0D0D] mb-4">
              Rename Resume
            </h2>

            <input
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              className="
                w-full px-4 py-3 bg-[#D9A296]
                border-4 border-[#0D0D0D] shadow-[4px_4px_0_#0D0D0D]
                font-semibold outline-none
              "
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setRenameOpen(false)}
                className="
                  px-5 py-2 bg-gray-400 text-black font-semibold
                  border-4 border-[#0D0D0D] shadow-[3px_3px_0_#0D0D0D]
                "
              >
                Cancel
              </button>

              <button
                onClick={handleRenameSave}
                className="
                  px-5 py-2 bg-[#D93A2B] text-[#D9D8D7] font-bold
                  border-4 border-[#0D0D0D] shadow-[3px_3px_0_#0D0D0D]
                "
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
