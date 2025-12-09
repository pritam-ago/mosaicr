"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import syncUserWithBackend from "@/utils/userSync";

export default function SignupCallbackPage() {
  const { isSignedIn, user } = useClerk();

    useEffect(() => {
        syncUserWithBackend(user).then(() => {
            redirect("/dashboard");
        });
    }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      Signing you up...
    </div>
  );
}