"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Save, Download, Palette } from "lucide-react";

import NavbarRetro from "@/components/navbar";
import FooterRetro from "@/components/footer";

import ResumePreview from "@/components/ResumePreview";

export default function ResumeEditorPage() {
  const searchParams = useSearchParams();
  const initialTemplate = searchParams.get("template") || "classic";

  const [saved, setSaved] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [tempFileName, setTempFileName] = useState("");

  const [resume, setResume] = useState({
    fileName: "Untitled Resume",
    name: "John Doe",
    title: "Software Developer",
    email: "john@example.com",
    phone: "123-456-7890",
    summary:
      "A passionate developer experienced in building modern, performant applications.",
    template: initialTemplate,
    theme: {
      accent: "#0D0D0D",
      text: "#0D0D0D",
    },
  });

  const updateField = (key: string, value: any) => {
    setSaved(false);
    setResume((prev) => ({ ...prev, [key]: value }));
  };

  const updateTheme = (key: string, value: any) => {
    setSaved(false);
    setResume((prev) => ({
      ...prev,
      theme: { ...prev.theme, [key]: value },
    }));
  };

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

        {/* Background Texture */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
          }}
        />

        {/* LEFT PANEL */}
        <div
          className="
            relative z-[2]
            w-full md:w-[40%] p-8 
            border-r-4 border-[#0D0D0D]
            bg-[#D9D8D7]
            shadow-[6px_0px_0_#0D0D0D]
          "
        >
          <h2 className="text-3xl font-extrabold uppercase text-[#0D0D0D] mb-6">
            Edit Resume
          </h2>

          <div className="space-y-4">
            <InputField
              label="Full Name"
              value={resume.name}
              onChange={(e: any) => updateField("name", e.target.value)}
            />

            <InputField
              label="Job Title"
              value={resume.title}
              onChange={(e: any) => updateField("title", e.target.value)}
            />

            <InputField
              label="Email"
              value={resume.email}
              onChange={(e: any) => updateField("email", e.target.value)}
            />

            <InputField
              label="Phone"
              value={resume.phone}
              onChange={(e: any) => updateField("phone", e.target.value)}
            />

            <TextareaField
              label="Professional Summary"
              value={resume.summary}
              onChange={(e: any) => updateField("summary", e.target.value)}
            />
          </div>

          {/* THEME COLORS */}
          <div className="mt-8">
            <h3 className="text-xl font-bold flex items-center text-black gap-2">
              <Palette />
              Theme Colors
            </h3>

            <div className="mt-4 flex gap-6">
              <ColorPicker
                label="Accent"
                value={resume.theme.accent}
                onChange={(val: any) => updateTheme("accent", val)}
              />

              <ColorPicker
                label="Text"
                value={resume.theme.text}
                onChange={(val: any) => updateTheme("text", val)}
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-10 flex gap-4 items-center">
            {/* OPEN SAVE POPUP */}
            <button
              onClick={() => {
                setTempFileName(resume.fileName);
                setShowSaveModal(true);
              }}
              className="
                px-6 py-3 bg-[#D93A2B] text-[#D9D8D7] font-bold rounded-lg 
                border-4 border-[#0D0D0D] 
                shadow-[4px_4px_0_#0D0D0D] 
                hover:shadow-[6px_6px_0_#0D0D0D]
                transition-all
              "
            >
              <Save size={18} className="inline-block mr-2" />
              Save
            </button>

            {/* DOWNLOAD BUTTON */}
            <button
              disabled={!saved}
              className={`
                px-6 py-3 font-bold rounded-lg border-4 border-[#0D0D0D]
                shadow-[4px_4px_0_#0D0D0D] transition-all
                ${
                  saved
                    ? "bg-[#D9756C] text-black hover:shadow-[6px_6px_0_#0D0D0D]"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed opacity-60"
                }
              `}
            >
              <Download size={18} className="inline-block mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-[60%] p-10 overflow-y-auto relative z-[2]">
          <ResumePreview resume={resume} />
        </div>
      </section>

      <FooterRetro />

      {/* SAVE AS POPUP */}
      {showSaveModal && (
        <div className="
            fixed inset-0 z-[999] flex items-center justify-center
            bg-black/40 backdrop-blur-sm
        ">
          <div className="
            bg-[#D9D8D7] p-8 rounded-xl w-[90%] max-w-md 
            border-4 border-[#0D0D0D]
            shadow-[10px_10px_0_#0D0D0D]
          ">
            <h2 className="text-2xl font-extrabold text-[#0D0D0D] mb-4">
              Save As
            </h2>

            <input
              value={tempFileName}
              onChange={(e) => setTempFileName(e.target.value)}
              placeholder="Enter file name..."
              className="
                w-full px-4 py-3 bg-[#D9A296]
                border-4 border-[#0D0D0D] 
                shadow-[4px_4px_0_#0D0D0D]
                font-semibold outline-none
              "
            />

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="
                  px-5 py-2 bg-gray-400 text-black font-semibold
                  border-4 border-[#0D0D0D]
                  shadow-[3px_3px_0_#0D0D0D]
                "
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="
                  px-5 py-2 bg-[#D93A2B] text-[#D9D8D7] font-bold
                  border-4 border-[#0D0D0D]
                  shadow-[3px_3px_0_#0D0D0D]
                  hover:shadow-[5px_5px_0_#0D0D0D]
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

/* —————————— SUB COMPONENTS —————————— */

function InputField({ label, value, onChange }: any) {
  return (
    <div>
      <label className="font-bold text-[#0D0D0D]">{label}</label>
      <input
        value={value}
        onChange={onChange}
        className="
          w-full mt-1 px-4 py-2 bg-[#D9A296] 
          border-4 border-[#0D0D0D] rounded-lg 
          shadow-[3px_3px_0_#0D0D0D] outline-none
        "
      />
    </div>
  );
}

function TextareaField({ label, value, onChange }: any) {
  return (
    <div>
      <label className="font-bold text-[#0D0D0D]">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        className="
          w-full mt-1 px-4 py-2 bg-[#D9A296] 
          border-4 border-[#0D0D0D] rounded-lg 
          shadow-[3px_3px_0_#0D0D0D] outline-none h-28
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
        onChange={(e) => onChange(e.target.value)}
        className="w-14 h-10 rounded-lg border-4 border-[#0D0D0D]"
      />
    </div>
  );
}
