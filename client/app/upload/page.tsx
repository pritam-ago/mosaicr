"use client";

import { useState } from "react";
import NavbarRetro from "@/components/navbar";
import FooterRetro from "@/components/footer";
import { Upload, FileText, Sparkles } from "lucide-react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [loadingScore, setLoadingScore] = useState(false);
  const [loadingSuggest, setLoadingSuggest] = useState(false);

  // Handle file selection
  const handleFile = (f: File) => {
    setFile(f);
    setAtsScore(null);
    setSuggestions(null);
  };

  // Upload via click
  const handleFileChange = (e: any) => {
    const f = e.target.files[0];
    if (f) handleFile(f);
  };

  // Drag & drop handling
  const handleDrag = (e: any) => {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragActive(false);

    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  // Dummy ATS score request
  const fetchAtsScore = async () => {
    if (!file) return;
    setLoadingScore(true);

    // Fake server delay
    await new Promise((r) => setTimeout(r, 1500));

    setAtsScore(78); // Dummy score
    setLoadingScore(false);
  };

  // Dummy suggestion request
  const fetchSuggestions = async () =>
  {
    setLoadingSuggest(true);

    await new Promise((r) => setTimeout(r, 1500));

    setSuggestions(
      "• Add more measurable achievements.\n• Include job-specific keywords.\n• Improve summary with stronger action verbs."
    );

    setLoadingSuggest(false);
  };

  return (
    <>
      <NavbarRetro />

      <section className="min-h-screen bg-[#D9A296] relative px-6 py-16 flex justify-center">

        {/* Background Texture */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/paper-fibers.png')",
          }}
        />

        <div className="relative z-[2] w-full max-w-3xl">

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#0D0D0D] text-center mb-10 uppercase">
            Upload Your Resume
          </h1>

          {/* UPLOAD BOX */}
          <div
            onDragEnter={handleDrag}
            className={`
              rounded-xl border-4 border-[#0D0D0D] bg-[#D9D8D7]
              shadow-[8px_8px_0_#0D0D0D] p-10 cursor-pointer
              transition-all duration-300
              ${dragActive ? "bg-[#D9756C]" : ""}
            `}
            onClick={() => document.getElementById("fileInput")?.click()}
          >
            <input
              id="fileInput"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex flex-col items-center justify-center text-center text-[#0D0D0D]">
              <Upload size={50} className="mb-4" />

              <p className="text-xl font-bold">
                Click to upload or drag & drop
              </p>

              <p className="text-sm mt-2 opacity-70">
                PDF, DOC, or DOCX only
              </p>

              {file && (
                <p className="mt-4 font-semibold flex items-center gap-2">
                  <FileText size={20} /> {file.name}
                </p>
              )}
            </div>
          </div>

          {/* HANDLE DRAG OUTSIDE */}
          {dragActive && (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className="fixed inset-0 z-10"
            />
          )}

          {/* FIND ATS SCORE BUTTON */}
          <div className="mt-10 text-center">
            <button
              disabled={!file || loadingScore}
              onClick={fetchAtsScore}
              className={`
                px-10 py-4 font-bold text-[#D9D8D7] bg-[#D93A2B]
                border-4 border-[#0D0D0D] rounded-lg
                shadow-[5px_5px_0_#0D0D0D]
                transition-all
                ${!file ? "opacity-50 cursor-not-allowed" : "hover:shadow-[8px_8px_0_#0D0D0D]"}
              `}
            >
              {loadingScore ? "Calculating..." : "Find ATS Rating"}
            </button>
          </div>

          {/* ATS SCORE DISPLAY */}
          {atsScore !== null && (
            <div
              className="
              mt-10 p-6 bg-[#D9D8D7] border-4 border-[#0D0D0D]
              shadow-[6px_6px_0_#0D0D0D] rounded-xl text-center"
            >
              <h2 className="text-3xl font-extrabold text-[#0D0D0D]">
                ATS Score: {atsScore}/100
              </h2>

              <p className="mt-2 text-[#0D0D0D] opacity-80">
                This is an estimated score based on dummy analysis.
              </p>

              {/* AI SUGGESTIONS BUTTON */}
              <button
                onClick={fetchSuggestions}
                disabled={loadingSuggest}
                className="
                  mt-6 px-8 py-3 bg-[#D9756C] text-[#0D0D0D] font-bold
                  border-4 border-[#0D0D0D] rounded-lg
                  shadow-[4px_4px_0_#0D0D0D] hover:shadow-[6px_6px_0_#0D0D0D]
                  transition-all flex items-center gap-2 mx-auto
                "
              >
                <Sparkles size={18} />
                {loadingSuggest ? "Generating..." : "Get AI Suggestions"}
              </button>
            </div>
          )}

          {/* SUGGESTIONS DISPLAY */}
          {suggestions && (
            <div
              className="
                mt-6 p-6 bg-[#D9D8D7] border-4 border-[#0D0D0D]
                shadow-[6px_6px_0_#0D0D0D] rounded-xl
              "
            >
              <h3 className="text-2xl font-bold text-[#0D0D0D] mb-2">
                AI Suggestions
              </h3>

              <pre className="whitespace-pre-wrap text-[#0D0D0D]">
                {suggestions}
              </pre>
            </div>
          )}
        </div>
      </section>

      <FooterRetro />
    </>
  );
}
