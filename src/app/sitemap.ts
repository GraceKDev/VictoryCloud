import type { MetadataRoute } from "next";
import { comics } from "@/app/lib/comics";
import { writing } from "@/app/lib/writing";

function getBaseUrl(): string {
  const explicitUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicitUrl) {
    return explicitUrl.replace(/\/$/, "");
  }

  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/art`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/comics`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/writing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/commissions`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const comicRoutes: MetadataRoute.Sitemap = comics.flatMap((comic) => {
    const comicId = String(comic.comicId);

    const chapterRoutes = comic.chapters.map((_, chapterIndex) => ({
      url: `${baseUrl}/comics/${comicId}/${chapterIndex}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [
      {
        url: `${baseUrl}/comics/${comicId}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
      ...chapterRoutes,
    ];
  });

  const writingRoutes: MetadataRoute.Sitemap = writing.flatMap((item) => {
    const writingId = String(item.writingId);

    const chapterRoutes = item.chapters.map((_, chapterIndex) => ({
      url: `${baseUrl}/writing/${writingId}/${chapterIndex}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [
      {
        url: `${baseUrl}/writing/${writingId}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      },
      ...chapterRoutes,
    ];
  });

  return [...staticRoutes, ...comicRoutes, ...writingRoutes];
}