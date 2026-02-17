import { MetadataRoute } from "next"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://posme.app"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/backoffice", "/api/", "/clear-auth", "/dashboard", "/members", "/transactions"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
