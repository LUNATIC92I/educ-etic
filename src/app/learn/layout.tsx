import Link from "next/link";

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ck-bg">
      <div className="flex items-center justify-between border-b border-ck-border bg-ck-bg-elevated px-4 py-3 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="text-xl">←</span>
          <span className="text-gradient-brand">CodeKids</span>
        </Link>
        <Link href="/dashboard/progress" className="text-sm font-semibold text-electric-500 hover:underline">
          Ma progression
        </Link>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}
