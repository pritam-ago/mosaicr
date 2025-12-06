export default function ResumePreview({ resume }: any) {
  return (
    <div
      className="
        w-full max-w-[800px] mx-auto p-10 
        bg-white border-[4px] border-[#0D0D0D] 
        shadow-[10px_10px_0_#0D0D0D] rounded-xl
      "
      style={{ color: resume.theme.text }}
    >
      <h1 className="text-4xl font-extrabold" style={{ color: resume.theme.accent }}>
        {resume.name}
      </h1>
      <h2 className="text-xl font-bold opacity-80">{resume.title}</h2>

      <div className="mt-4">
        <p>{resume.email}</p>
        <p>{resume.phone}</p>
      </div>

      <h3 className="mt-6 text-2xl font-bold" style={{ color: resume.theme.accent }}>
        Summary
      </h3>
      <p className="mt-2">{resume.summary}</p>
    </div>
  );
}
