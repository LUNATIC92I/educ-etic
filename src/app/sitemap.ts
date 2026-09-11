import type { MetadataRoute } from "next";

const STATIC_ROUTES = [
  "",
  "/courses",
  "/levels",
  "/level/beginner",
  "/level/intermediate",
  "/level/advanced",
  "/pricing",
  "/login",
  "/register",
  "/about",
  "/help",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
