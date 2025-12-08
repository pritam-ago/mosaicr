import AuthRetro from "@/components/AuthRetro";
import NavbarRetro from "@/components/navbar";
import FooterRetro from "@/components/footer";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {

  const { userId } = await auth();
  if (userId) {
    redirect("/dashboard");
  }
  return (
    <>
      <NavbarRetro />
      <AuthRetro />
      <FooterRetro />
    </>
  );
}
