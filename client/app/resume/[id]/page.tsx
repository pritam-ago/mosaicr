"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarRetro from "@/components/navbar";
import FooterRetro from "@/components/footer";
import { Edit3, Download, Heart } from "lucide-react";
import ResumePreview from "@/components/ResumePreview";

export default function ResumeViewPage() {
  const { id } = useParams();
  const router = useRouter();

  const [resume, setResume] = useState<any>(null);

  // Dummy load function — replace with Supabase fetch later
  useEffect(() => {
    const dummy = {
      id,
      name: "John Doe",
      title: "Software Developer",
      email: "john@example.com",
      phone: "123-456-7890",
      summary:
        "A passionate developer experienced in JavaScript, React, and backend systems.",
      template: "classic",
      theme: {
        accent: "#0D0D0D",
        text: "#0D0D0D",
      },
    };

    setResume(dummy);
  }, [id]);

  

  if (!resume) return null;

  return (
    <>
      <NavbarRetro />

      <section className="min-h-screen bg-[#D9A296] py-16 px-6 relative">
        {/* background texture */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
          }}
        />

        <div className="relative z-[2] max-w-5xl mx-auto">

          <div className="flex justify-between items-center mb-10">
            <h1 className="text-4xl font-extrabold uppercase text-[#0D0D0D]">
              {resume.name}'s Resume
            </h1>

            <div className="flex gap-4">
              <button
                onClick={() => router.push(`/resume/${id}/edit`)}
                className="
                  px-6 py-3 bg-[#D9756C] text-[#0D0D0D] font-bold
                  border-4 border-[#0D0D0D] rounded-lg
                  shadow-[4px_4px_0_#0D0D0D] hover:shadow-[6px_6px_0_#0D0D0D]
                  flex items-center gap-2
                "
              >
                <Edit3 size={18} />
                Edit
              </button>

              <button
                onClick={() => alert('Downloading…')}
                className="
                  px-6 py-3 bg-[#D9D8D7] text-[#0D0D0D] font-bold
                  border-4 border-[#0D0D0D] rounded-lg
                  shadow-[4px_4px_0_#0D0D0D] hover:shadow-[6px_6px_0_#0D0D0D]
                  flex items-center gap-2
                "
              >
                <Download size={18} />
                Download
              </button>
            </div>
          </div>

          {/* Resume preview */}
          <div className="border-4 border-[#0D0D0D] bg-[#FFF] p-10 shadow-[8px_8px_0_#0D0D0D] rounded-xl">
            <ResumePreview resume={resume} />
          </div>

        </div>
      </section>

      <FooterRetro />
    </>
  );
}
