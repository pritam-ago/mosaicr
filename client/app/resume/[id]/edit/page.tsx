"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import NavbarRetro from "@/components/navbar";
import FooterRetro from "@/components/footer";
import ResumePreview from "@/components/ResumePreview";
import { Save, Download, Palette } from "lucide-react";

export default function ResumeEditorByIdPage() {
  const { id } = useParams();

  const [saved, setSaved] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [tempFileName, setTempFileName] = useState("");

  const [resume, setResume] = useState<any>(null);

  // Load existing resume (dummy)
  useEffect(() => {
    const dummy = {
      fileName: "My Resume",
      name: "John Doe",
      title: "Software Developer",
      email: "john@example.com",
      phone: "123-456-7890",
      summary:
        "Experienced full-stack engineer with passion for building scalable systems.",
      template: "classic",
      theme: {
        accent: "#0D0D0D",
        text: "#0D0D0D",
      },
    };

    setResume(dummy);
  }, [id]);

  if (!resume) return null;

  const updateField = (key: string, value: any) =>
    setResume((prev: any) => ({ ...prev, [key]: value }));

  const updateTheme = (key: string, value: any) =>
    setResume((prev: any) => ({
      ...prev,
      theme: { ...prev.theme, [key]: value },
    }));

  const handleSave = () => {
    if (!tempFileName.trim()) return;

    updateField("fileName", tempFileName);
    setSaved(true);
    setShowSaveModal(false);
  };

  return (
    <>
      <NavbarRetro />

      <section className="min-h-screen w-full flex bg-[#D9A296] relative">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
          }}
        />

        {/* Left Panel */}
        <div
          className="
            relative z-[2] w-full md:w-[40%] p-8 
            border-r-4 border-[#0D0D0D]
            bg-[#D9D8D7] shadow-[6px_0px_0_#0D0D0D]
          "
        >
          <h2 className="text-3xl font-extrabold uppercase text-[#0D0D0D] mb-6">
            Edit Resume
          </h2>

          <div className="space-y-4">
            <Input label="Full Name" value={resume.name} onChange={(v:any)=>updateField("name", v)} />
            <Input label="Job Title" value={resume.title} onChange={(v:any)=>updateField("title", v)} />
            <Input label="Email" value={resume.email} onChange={(v:any)=>updateField("email", v)} />
            <Input label="Phone" value={resume.phone} onChange={(v:any)=>updateField("phone", v)} />
            <Textarea label="Summary" value={resume.summary} onChange={(v:any)=>updateField("summary", v)} />
          </div>

          {/* Colors */}
          <div className="mt-8">
            <h3 className="text-xl font-bold flex items-center text-black gap-2">
              <Palette />
              Theme Colors
            </h3>

            <div className="mt-4 flex gap-6">
              <ColorPicker
                label="Accent"
                value={resume.theme.accent}
                onChange={(val:any)=>updateTheme("accent", val)}
              />

              <ColorPicker
                label="Text"
                value={resume.theme.text}
                onChange={(val:any)=>updateTheme("text", val)}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-10 flex gap-4">
            <button
              onClick={() => {
                setTempFileName(resume.fileName);
                setShowSaveModal(true);
              }}
              className="
                px-6 py-3 bg-[#D93A2B] text-[#D9D8D7] font-bold rounded-lg
                border-4 border-[#0D0D0D] shadow-[4px_4px_0_#0D0D0D]
              "
            >
              <Save size={18} className="inline-block mr-2" />
              Save
            </button>

            <button
              disabled={!saved}
              className={`
                px-6 py-3 font-bold rounded-lg border-4 border-[#0D0D0D]
                shadow-[4px_4px_0_#0D0D0D]
                ${
                  saved
                    ? "bg-[#D9756C] text-black"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed opacity-60"
                }
              `}
            >
              <Download size={18} className="inline-block mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-[60%] p-10 overflow-y-auto relative z-[2]">
          <ResumePreview resume={resume} />
        </div>
      </section>

      <FooterRetro />

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-999">
          <div className="bg-[#D9D8D7] p-8 rounded-xl border-4 border-[#0D0D0D] shadow-[10px_10px_0_#0D0D0D] w-[90%] max-w-md">
            <h2 className="text-2xl font-extrabold text-[#0D0D0D] mb-4">Save As</h2>

            <input
              value={tempFileName}
              onChange={(e) => setTempFileName(e.target.value)}
              className="w-full px-4 py-3 bg-[#D9A296] border-4 border-[#0D0D0D] shadow-[4px_4px_0_#0D0D0D]"
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-5 py-2 bg-gray-400 border-4 border-[#0D0D0D]"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-5 py-2 bg-[#D93A2B] text-[#D9D8D7] font-bold border-4 border-[#0D0D0D]"
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

/* --- Reusable Components --- */
function Input({ label, value, onChange }: any) {
  return (
    <div>
      <label className="font-bold text-black">{label}</label>
      <input
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        className="
          w-full mt-1 px-4 py-2 bg-[#D9A296]
          border-4 border-[#0D0D0D] rounded-lg shadow-[3px_3px_0_#0D0D0D]
        "
      />
    </div>
  );
}

function Textarea({ label, value, onChange }: any) {
  return (
    <div>
      <label className="font-bold text-black">{label}</label>
      <textarea
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        className="
          w-full mt-1 px-4 py-2 bg-[#D9A296]
          border-4 border-[#0D0D0D] rounded-lg shadow-[3px_3px_0_#0D0D0D] h-28
        "
      />
    </div>
  );
}

function ColorPicker({ label, value, onChange }: any) {
  return (
    <div className="flex flex-col items-center">
      <label className="text-sm font-semibold text-black">{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        className="w-14 h-10 rounded-lg border-4 border-[#0D0D0D]"
      />
    </div>
  );
}
