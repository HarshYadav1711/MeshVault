import Link from "next/link";

const navItems = [
  { href: "/#features", label: "Features" },
  { href: "/#workflow", label: "Workflow" },
  { href: "/#security", label: "Security" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link href="/" className="text-base font-semibold tracking-tight text-slate-900">
          MeshVault
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-slate-900">
              {item.label}
            </a>
          ))}
        </nav>
        <Link
          href="/signup"
          className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}
