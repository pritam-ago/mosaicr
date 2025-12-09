"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import NavbarRetro from "@/components/navbar";
import FooterRetro from "@/components/footer";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function SSOCallbackPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    const syncAndRedirect = async () => {
      if (!isLoaded) return;
      if (!user) {
        router.replace("/auth");
        return;
      }

      try {
        await fetch(`${API_BASE_URL}/api/auth/sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            fullName: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          }),
        });
      } catch (err) {
        console.error("Failed to sync user to backend:", err);
      } finally {
        router.replace("/dashboard");
      }
    };

    syncAndRedirect();
  }, [isLoaded, user, router]);

  return (
    <>
    <NavbarRetro />
    <section className="min-h-screen flex items-center justify-center bg-[#d9a296]">
      <p className="text-lg font-semibold text-[#0D0D0D]">
        Finishing sign-in, please wait…
      </p>
    </section>
    <FooterRetro />
    </>
  );
}
