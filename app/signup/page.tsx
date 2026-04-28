import AuthCard from "@/components/auth-card";

export default function SignupPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-12">
      <AuthCard
        title="Create account"
        description="Set up your MeshVault access for internal request operations."
        primaryLabel="Create Account"
        secondaryHref="/login"
        secondaryLabel="Already have access? Open login"
      />
    </main>
  );
}
