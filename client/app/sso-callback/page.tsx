"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleRedirectCallback } = useClerk();

  useEffect(() => {
    async function process() {
      const fullParams = Object.fromEntries(searchParams.entries());

      await handleRedirectCallback(
        { ...fullParams },               // Required OAuth callback params
        async (to) => { await router.push(to); }  // Navigation handler
      );
    }

    process();
  }, [searchParams, handleRedirectCallback, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      Redirecting...
    </div>
  );
}
