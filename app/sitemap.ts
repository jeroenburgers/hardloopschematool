import type { MetadataRoute } from "next"
import { routeSlugs } from "@/lib/i18n/routes"
import { getDefaultLocale } from "@/lib/i18n/config"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://hardloopschematool.nl"
const defaultLocale = getDefaultLocale()

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = routeSlugs[defaultLocale]

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/${routes.method}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/${routes.trainingTypes}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/${routes.createSchedule}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/voorbeeldschemas`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  // Example schedule pages
  const exampleSchedules: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/5km-hardloopschema`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/10km-hardloopschema`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/5km-pr-hardloopschema`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/marathon-hardloopschema`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]

  // Multi-language routes (if needed in the future)
  const multiLanguagePages: MetadataRoute.Sitemap = []

  // Add English and German versions if they exist
  const locales: Array<"nl" | "en" | "de"> = ["nl", "en", "de"]
  locales.forEach((locale) => {
    if (locale !== defaultLocale) {
      const localeRoutes = routeSlugs[locale]
      multiLanguagePages.push(
        {
          url: `${BASE_URL}/${localeRoutes.method}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        },
        {
          url: `${BASE_URL}/${localeRoutes.trainingTypes}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.7,
        },
        {
          url: `${BASE_URL}/${localeRoutes.createSchedule}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.6,
        },
      )
    }
  })

  return [...staticPages, ...exampleSchedules, ...multiLanguagePages]
}
