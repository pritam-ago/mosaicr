async function syncUserWithBackend(user: any) {
  await fetch("http://localhost:8000/api/auth/sync", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    }),
  });
}

export default syncUserWithBackend;