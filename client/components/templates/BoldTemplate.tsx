export default function BoldTemplate({ resume }: any) {
  return (
    <div className="space-y-4" style={{ color: resume.theme.text }}>
      <div
        className="p-5 border-[4px] rounded-xl"
        style={{
          borderColor: resume.theme.text,
          backgroundColor: resume.theme.accent,
          color: "#D9D8D7",
        }}
      >
        <h1 className="text-4xl font-extrabold">{resume.name}</h1>
        <p className="font-bold">{resume.title}</p>
      </div>

      <div>
        <p>{resume.email}</p>
        <p>{resume.phone}</p>
      </div>

      <h2 className="text-xl font-bold">Summary</h2>
      <p>{resume.summary}</p>
    </div>
  );
}
