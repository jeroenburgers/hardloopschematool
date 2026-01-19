import type { Metadata } from "next"
import { translations, type Locale } from "../i18n"
import { routeSlugs } from "../i18n/routes"
import { MetadataBuilder, type MetadataContent } from "./metadata-builder"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://hardloopschematool.nl"

/**
 * Page types for SEO
 */
export type PageType = "home" | "method" | "trainingTypes" | "createSchedule"

/**
 * Options for page metadata
 */
export interface PageMetadataOptions {
  title?: string
  description?: string
  path?: string
  type?: "website" | "article"
}

/**
 * Get SEO metadata for a page
 */
export function getPageMetadata(
  locale: Locale,
  page: PageType,
  options?: PageMetadataOptions,
): Metadata {
  const builder = new MetadataBuilder()
  const seo = translations[locale]?.seo?.[page]
  const appName = translations[locale]?.common?.appName || "Hardloopschematool"

  const title = options?.title || seo?.title || appName
  const description =
    options?.description || seo?.description || translations[locale]?.common?.description || ""
  const url = options?.path ? `${baseUrl}${options.path}` : baseUrl

  const content: MetadataContent = {
    title,
    description,
    url,
    appName,
    locale,
    type: options?.type || "website",
  }

  const metadata = builder.build(content)

  // Add language alternates
  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      languages: {
        nl: `${baseUrl}/${routeSlugs.nl.trainingTypes}`,
        en: `${baseUrl}/${routeSlugs.en.trainingTypes}`,
        de: `${baseUrl}/${routeSlugs.de.trainingTypes}`,
      },
    },
  }
}
