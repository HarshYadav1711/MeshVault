import { redirect } from "next/navigation";

import AuthForm from "@/components/auth-form";
import { getSessionFromCookies } from "@/lib/session";

export default async function LoginPage() {
  const session = await getSessionFromCookies();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-12">
      <AuthForm mode="login" />
    </main>
  );
}
