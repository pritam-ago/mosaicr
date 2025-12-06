"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Download, Palette } from "lucide-react";
import ResumePreview from "@/components/ResumePreview";

export default function ResumeEditorPage() {
  const [resume, setResume] = useState({
    name: "John Doe",
    title: "Software Developer",
    email: "john@example.com",
    phone: "123-456-7890",
    summary: "A passionate developer with experience in building modern applications.",
    theme: {
      accent: "#D93A2B",
      border: "#0D0D0D",
      text: "#0D0D0D",
    },
  });

  const updateField = (field: string, value: any) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  const updateTheme = (key: string, value: any) => {
    setResume((prev) => ({
      ...prev,
      theme: { ...prev.theme, [key]: value },
    }));
  };

  return (
    <section className="min-h-screen w-full flex bg-[#D9D8D7]">

      {/* LEFT PANEL */}
      <div className="
        w-full md:w-[40%] p-8 
        border-r-4 border-[#0D0D0D]
        bg-[#D9D8D7]
        shadow-[6px_0px_0_#0D0D0D]
      ">
        <h2 className="text-3xl font-extrabold uppercase text-[#0D0D0D] mb-6">
          Edit Resume
        </h2>

        {/* Fields */}
        <div className="space-y-4">

          <Input label="Full Name" value={resume.name}
            onChange={(e: { target: { value: any; }; }) => updateField("name", e.target.value)} />

          <Input label="Job Title" value={resume.title}
            onChange={(e: { target: { value: any; }; }) => updateField("title", e.target.value)} />

          <Input label="Email" value={resume.email}
            onChange={(e: { target: { value: any; }; }) => updateField("email", e.target.value)} />

          <Input label="Phone" value={resume.phone}
            onChange={(e: { target: { value: any; }; }) => updateField("phone", e.target.value)} />

          <Textarea label="Summary" value={resume.summary}
            onChange={(e: { target: { value: any; }; }) => updateField("summary", e.target.value)} />

          {/* Theme Customization */}
          <div className="mt-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Palette /> Theme Colors
            </h3>

            <div className="mt-3 flex gap-4">
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
        </div>

        {/* Buttons */}
        <div className="mt-10 flex gap-4">
          <button className="
            px-5 py-3 bg-[#D93A2B] text-[#D9D8D7] font-bold rounded-lg 
            border-[3px] border-[#0D0D0D] shadow-[4px_4px_0_#0D0D0D]
          ">
            <Save className="inline-block mr-2" size={18} />
            Save
          </button>

          <button className="
            px-5 py-3 bg-[#D9756C] text-[#0D0D0D] font-bold rounded-lg 
            border-[3px] border-[#0D0D0D] shadow-[4px_4px_0_#0D0D0D]
          ">
            <Download className="inline-block mr-2" size={18} />
            Download PDF
          </button>
        </div>
      </div>

      {/* RIGHT PANEL — LIVE PREVIEW */}
      <div className="w-full md:w-[60%] p-10 overflow-y-auto">
        <ResumePreview resume={resume} />
      </div>

    </section>
  );
}

/* INPUT COMPONENTS */

function Input({ label, value, onChange }: any) {
  return (
    <div>
      <label className="font-bold text-[#0D0D0D]">{label}</label>
      <input
        value={value}
        onChange={onChange}
        className="
          w-full mt-1 px-4 py-2 bg-[#D9D8D7] 
          border-[3px] border-[#0D0D0D] rounded-lg 
          shadow-[3px_3px_0_#0D0D0D] outline-none
        "
      />
    </div>
  );
}

function Textarea({ label, value, onChange }: any) {
  return (
    <div>
      <label className="font-bold text-[#0D0D0D]">{label}</label>
      <textarea
        value={value}
        onChange={onChange}
        className="
          w-full mt-1 px-4 py-2 bg-[#D9D8D7] 
          border-[3px] border-[#0D0D0D] rounded-lg 
          shadow-[3px_3px_0_#0D0D0D] outline-none h-28
        "
      />
    </div>
  );
}

function ColorPicker({ label, value, onChange }: any) {
  return (
    <div className="flex flex-col items-center">
      <label className="text-sm font-semibold">{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-10 rounded-lg border-[3px] border-[#0D0D0D]"
      />
    </div>
  );
}
