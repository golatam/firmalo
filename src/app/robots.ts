import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Do not block Next.js assets: Google needs CSS/JS access for rendering.
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://firmalo.io/sitemap.xml",
  };
}
