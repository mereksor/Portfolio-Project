import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-32 text-center">
      <h1 className="animate-blur-in font-display text-7xl font-bold text-ink">404</h1>
      <p className="animate-fade-up stagger-1 mt-4 text-lg text-ink-muted">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="animate-fade-up stagger-2 mt-8 bg-ink px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-crimson"
      >
        Back to Home
      </Link>
    </div>
  );
}
