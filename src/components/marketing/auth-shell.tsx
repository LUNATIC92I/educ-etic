import { LogoLink } from "@/components/ui/logo-link";
import { Blob, Star } from "@/components/ui/decor";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-nightsky-500 via-[#140f36] to-nightsky-500 px-4 py-12">
      <Blob className="left-[-15%] top-[-10%] h-96 w-96 bg-electric-500/30" />
      <Blob className="bottom-[-15%] right-[-10%] h-96 w-96 bg-violet-500/30" style={{ animationDelay: "2s" }} />
      {Array.from({ length: 10 }).map((_, i) => (
        <Star key={i} style={{ left: `${(i * 41) % 100}%`, top: `${(i * 27) % 100}%`, animationDelay: `${i * 0.4}s` }} />
      ))}

      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center">
          <LogoLink />
        </div>
        <div className="glass-panel rounded-3xl border border-white/10 bg-nightsky-600/60 p-8 text-white shadow-2xl shadow-violet-900/40">
          <h1 className="font-display text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-sm text-white/70">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
        {footer ? <p className="mt-6 text-center text-sm text-white/70">{footer}</p> : null}
      </div>
    </div>
  );
}
