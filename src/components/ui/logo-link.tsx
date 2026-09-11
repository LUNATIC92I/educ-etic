import Link from "next/link";
import { SITE_NAME } from "@/data/site";

export function LogoLink() {
  return (
    <Link href="/" className="flex items-center justify-center gap-2 font-display text-2xl font-bold">
      <span className="text-3xl">🚀</span>
      <span className="text-gradient-brand">{SITE_NAME}</span>
    </Link>
  );
}
