export default function CleanTemplate({ resume }: any) {
  return (
    <div style={{ color: resume.theme.text }}>
      <div
        className="p-4 rounded-lg"
        style={{ backgroundColor: resume.theme.accent, color: "#D9D8D7" }}
      >
        <h1 className="text-3xl font-extrabold">{resume.name}</h1>
        <p className="font-semibold">{resume.title}</p>
      </div>

      <div className="mt-4">
        <p>{resume.email}</p>
        <p>{resume.phone}</p>
      </div>

      <h2 className="mt-6 text-xl font-bold">Summary</h2>
      <p className="mt-2">{resume.summary}</p>
    </div>
  );
}
