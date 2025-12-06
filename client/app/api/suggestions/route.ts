export async function POST() {
  return Response.json({
    suggestions: [
      "Add measurable achievements.",
      "Optimize summary with action verbs.",
      "Include relevant skills based on job description."
    ]
  });
}
