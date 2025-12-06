export default function MinimalTemplate({ resume }: any) {
  return (
    <div className="pl-6 border-l-[6px]" style={{ borderColor: resume.theme.accent }}>
      <h1 className="text-4xl font-bold">{resume.name}</h1>
      <p className="text-lg font-semibold opacity-70">{resume.title}</p>

      <div className="mt-3 text-sm opacity-80">
        <p>{resume.email}</p>
        <p>{resume.phone}</p>
      </div>

      <h2 className="mt-6 text-xl font-bold">Summary</h2>
      <p className="mt-1">{resume.summary}</p>
    </div>
  );
}
