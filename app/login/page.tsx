import AuthCard from "@/components/auth-card";

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-12">
      <AuthCard
        title="Welcome back"
        description="Sign in to access your MeshVault workspace."
        primaryLabel="Sign In"
        secondaryHref="/signup"
        secondaryLabel="Need an account? Open signup"
      />
    </main>
  );
}
