import type { MetadataRoute } from "next";
import { site, treatments } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/treatments",
    "/how-it-works",
    "/clinics",
    "/international-patients",
    "/about",
    "/contact",
    "/consultation",
    "/privacy",
    "/terms",
    "/medical-disclaimer",
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path === "/consultation" ? 0.9 : 0.7,
  }));

  const treatmentPages = treatments.map((t) => ({
    url: `${site.url}/treatments/${t.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...treatmentPages];
}
