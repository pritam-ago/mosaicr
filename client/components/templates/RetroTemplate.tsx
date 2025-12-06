export default function RetroTemplate({ resume }: any) {
  return (
    <div
      className="p-5 border-[4px] rounded-xl"
      style={{ borderColor: resume.theme.accent }}
    >
      <h1
        className="text-4xl font-extrabold underline decoration-[4px]"
        style={{ textDecorationColor: resume.theme.accent }}
      >
        {resume.name}
      </h1>
      <p className="mt-1 text-lg font-bold opacity-80">{resume.title}</p>

      <div className="mt-3 text-sm">
        <p>{resume.email}</p>
        <p>{resume.phone}</p>
      </div>

      <h2
        className="mt-6 text-2xl font-bold"
        style={{ color: resume.theme.accent }}
      >
        Summary
      </h2>
      <p className="mt-2 leading-relaxed">{resume.summary}</p>
    </div>
  );
}
