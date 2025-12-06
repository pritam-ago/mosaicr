export default function ClassicTemplate({ resume }: any) {
  return (
    <div style={{ color: resume.theme.text }}>
      <h1 className="text-4xl font-extrabold" style={{ color: resume.theme.accent }}>
        {resume.name}
      </h1>
      <p className="text-lg font-bold opacity-80">{resume.title}</p>

      <hr className="my-4 border-[#0D0D0D]" />

      <p>{resume.email}</p>
      <p>{resume.phone}</p>

      <h2 className="mt-6 text-2xl font-bold" style={{ color: resume.theme.accent }}>
        Summary
      </h2>
      <p className="mt-2 leading-relaxed">{resume.summary}</p>
    </div>
  );
}
