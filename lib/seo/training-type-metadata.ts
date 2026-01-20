import type { Metadata } from "next"
import { translations, type Locale } from "../i18n"
import { routeSlugs } from "../i18n/routes"
import { MetadataBuilder, type MetadataContent } from "./metadata-builder"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://hardloopschematool.nl"

/**
 * Get training type metadata
 */
export function getTrainingTypeMetadata(locale: Locale, typeKey: string, slug: string): Metadata {
  const builder = new MetadataBuilder()
  const typeData =
    translations[locale]?.pages?.trainingTypes?.types?.[
      typeKey as keyof typeof translations.nl.pages.trainingTypes.types
    ]
  const appName = translations[locale]?.common?.appName || "Hardloopschematool"
  const trainingTypesSlug = routeSlugs[locale].trainingTypes
  const defaultDescription =
    translations[locale]?.seo?.trainingTypes?.description ||
    translations[locale]?.common?.description ||
    ""

  const title = typeData?.title ? `${typeData.title} - ${appName}` : `${appName} - Training Type`
  const description = typeData?.description || typeData?.subtitle || defaultDescription
  const url = `${baseUrl}/${trainingTypesSlug}/${slug}`

  const content: MetadataContent = {
    title,
    description,
    url,
    appName,
    locale,
    type: "article",
  }

  return builder.build(content)
}
