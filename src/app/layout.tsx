import type { Metadata, Viewport } from "next";
import { Fredoka, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeInit } from "@/components/ui/theme-init";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "CodeKids — Apprends à créer le Web",
    template: "%s — CodeKids",
  },
  description:
    "CodeKids est la plateforme qui apprend le HTML et le CSS aux enfants de 8 à 16 ans à travers des missions, des badges et de vrais projets. Apprends à créer le Web, construis ton imagination.",
  keywords: [
    "apprendre HTML enfant",
    "apprendre CSS enfant",
    "cours HTML CSS enfant",
    "apprendre programmation enfant",
    "cours développement web enfant",
    "CodeKids",
  ],
  openGraph: {
    title: "CodeKids — Apprends à créer le Web",
    description:
      "Apprends le HTML et le CSS en t'amusant : missions, badges, XP et vrais projets pour les 8-16 ans.",
    type: "website",
    locale: "fr_FR",
    siteName: "CodeKids",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeKids — Apprends à créer le Web",
    description:
      "Apprends le HTML et le CSS en t'amusant : missions, badges, XP et vrais projets pour les 8-16 ans.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7fe" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0a1c" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${fredoka.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ck-bg text-ck-text">
        <ThemeInit />
        {children}
      </body>
    </html>
  );
}
