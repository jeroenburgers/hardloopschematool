import type { Metadata } from "next"
import { getRouteKeyBySlug } from "@/lib/i18n/routes"
import { getPageMetadata, type PageType } from "@/lib/seo"
import { getDefaultLocale } from "@/lib/i18n/config"
import { SlugPageClient } from "@/components/pages/slug-page-client"

const defaultLocale = getDefaultLocale()

const routeToSeoPage: Record<string, PageType> = {
  method: "method",
  trainingTypes: "trainingTypes",
  examples: "examples",
  createSchedule: "createSchedule",
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const routeKey = getRouteKeyBySlug(slug)

  if (!routeKey) {
    return getPageMetadata(defaultLocale, "home")
  }

  const seoPage = routeToSeoPage[routeKey]
  if (!seoPage) {
    return getPageMetadata(defaultLocale, "home")
  }

  // Try to detect locale from slug by checking routeSlugs
  let locale = defaultLocale
  const locales: Array<"nl" | "en" | "de"> = ["nl", "en", "de"]
  for (const loc of locales) {
    // Check all route slugs for this locale
    const nlSlug = loc === "nl" ? "onze-methode" : loc === "de" ? "unsere-methode" : "our-method"
    const trainingTypesSlug =
      loc === "nl" ? "trainingsvormen" : loc === "de" ? "trainingsformen" : "training-types"
    const examplesSlug =
      loc === "nl" ? "voorbeeld-schemas" : loc === "de" ? "beispielplaene" : "example-schedules"
    const createScheduleSlug =
      loc === "nl" ? "schema-maken" : loc === "de" ? "plan-erstellen" : "create-schedule"

    if (
      slug === nlSlug ||
      slug === trainingTypesSlug ||
      slug === examplesSlug ||
      slug === createScheduleSlug
    ) {
      locale = loc
      break
    }
  }

  return getPageMetadata(locale, seoPage, {
    path: `/${slug}`,
  })
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  return <SlugPageClient params={params} />
}
