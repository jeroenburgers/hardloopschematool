import type { Metadata } from "next"
import { translations, type Locale } from "./i18n"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://hardloopschematool.nl"

/**
 * Get SEO metadata for a page
 */
export function getMetadata(
  locale: Locale,
  page: "home" | "method" | "trainingTypes" | "examples" | "createSchedule",
  options?: {
    title?: string
    description?: string
    path?: string
    type?: "website" | "article"
  },
): Metadata {
  const seo = translations[locale]?.seo?.[page]
  const appName = translations[locale]?.common?.appName || "Hardloopschematool"

  const title = options?.title || seo?.title || appName
  const description =
    options?.description || seo?.description || translations[locale]?.common?.description || ""
  const url = options?.path ? `${baseUrl}${options.path}` : baseUrl

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: appName,
      locale: locale === "nl" ? "nl_NL" : locale === "de" ? "de_DE" : "en_US",
      type: options?.type || "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: {
        nl: `${baseUrl}/trainingsvormen`,
        en: `${baseUrl}/training-types`,
        de: `${baseUrl}/trainingsformen`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

/**
 * Get training type metadata
 */
export function getTrainingTypeMetadata(locale: Locale, typeKey: string, slug: string): Metadata {
  const typeData =
    translations[locale]?.pages?.trainingTypes?.types?.[
      typeKey as keyof typeof translations.nl.pages.trainingTypes.types
    ]
  const appName = translations[locale]?.common?.appName || "Hardloopschematool"
  const trainingTypesSlug = translations[locale]?.pages?.trainingTypes
    ? locale === "nl"
      ? "trainingsvormen"
      : locale === "de"
        ? "trainingsformen"
        : "training-types"
    : "training-types"

  const title = typeData?.title ? `${typeData.title} - ${appName}` : `${appName} - Training Type`
  const description = typeData?.description || typeData?.subtitle || ""
  const url = `${baseUrl}/${trainingTypesSlug}/${slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: appName,
      locale: locale === "nl" ? "nl_NL" : locale === "de" ? "de_DE" : "en_US",
      type: "article" as const,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
