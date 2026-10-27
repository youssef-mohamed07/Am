import type { MetadataRoute } from "next";
import { siteUrl } from "./site-config";

const languages = { en: `${siteUrl}/en`, ar: `${siteUrl}/ar` };

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteUrl}/en`, changeFrequency: "weekly", priority: 1, alternates: { languages } },
    { url: `${siteUrl}/ar`, changeFrequency: "weekly", priority: 0.9, alternates: { languages } },
  ];
}
