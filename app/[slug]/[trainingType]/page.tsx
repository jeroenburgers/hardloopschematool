import type { Metadata } from "next"
import { getRouteKeyFromSlug, getTrainingTypeKeyFromSlug } from "@/lib/i18n/routes"
import { translations, type Locale } from "@/lib/i18n"
import { getTrainingTypeMetadata } from "@/lib/seo"
import { getDefaultLocale } from "@/lib/i18n/config"
import { TrainingTypeDetailPageClient } from "@/components/pages/training-type-detail-page-client"

const defaultLocale = getDefaultLocale()

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; trainingType: string }>
}): Promise<Metadata> {
  const { slug, trainingType } = await params

  // Check if this is the training types page
  const routeKey = getRouteKeyFromSlug(slug)
  if (routeKey !== "trainingTypes") {
    return getTrainingTypeMetadata(defaultLocale, "", trainingType)
  }

  // Get the training type key from the slug (checks all locales)
  const typeKey = getTrainingTypeKeyFromSlug(trainingType, translations)

  if (!typeKey) {
    return getTrainingTypeMetadata(defaultLocale, "", trainingType)
  }

  // Try to detect locale from slug
  let locale: Locale = defaultLocale
  const locales: Locale[] = ["nl", "en", "de"]
  for (const loc of locales) {
    const trainingTypesSlug =
      loc === "nl" ? "trainingsvormen" : loc === "de" ? "trainingsformen" : "training-types"
    if (slug === trainingTypesSlug) {
      locale = loc
      break
    }
  }

  return getTrainingTypeMetadata(locale, typeKey, trainingType)
}

export default async function TrainingTypeDetailSlugPage({
  params,
}: {
  params: Promise<{ slug: string; trainingType: string }>
}) {
  return <TrainingTypeDetailPageClient params={params} />
}
