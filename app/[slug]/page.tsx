import type { Metadata } from "next"
import { getRouteKeyBySlug } from "@/lib/i18n/routes"
import { getPageMetadata, type PageType } from "@/lib/seo"
import { getDefaultLocale } from "@/lib/i18n/config"
import { SlugPageClient } from "@/components/pages/slug-page-client"
import { ExampleSchedulePage } from "@/components/pages/example-schedule-page"
import { schedule5km } from "@/lib/data/example-schedules/5km-schedule"
import { schedule10km } from "@/lib/data/example-schedules/10km-schedule"
import { schedule5kmPr } from "@/lib/data/example-schedules/5km-pr-schedule"
import { scheduleMarathon } from "@/lib/data/example-schedules/marathon-schedule"

const defaultLocale = getDefaultLocale()

const schedules: Record<string, typeof schedule5km> = {
  "5km-hardloopschema": schedule5km,
  "10km-hardloopschema": schedule10km,
  "5km-pr-hardloopschema": schedule5kmPr,
  "marathon-hardloopschema": scheduleMarathon,
}

const routeToSeoPage: Record<string, PageType> = {
  method: "method",
  trainingTypes: "trainingTypes",
  createSchedule: "createSchedule",
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  // Check if it's a schedule route first
  const schedule = schedules[slug]
  if (schedule) {
    const is5km = slug.includes("5km")
    const is10km = slug.includes("10km")
    const isMarathon = slug.includes("marathon")
    const is5kmPr = slug.includes("5km-pr")

    let distance = ""
    let seoTitle = ""
    let seoDescription = ""
    let keywords: string[] = []

    if (is5kmPr) {
      distance = "5km PR"
      seoTitle = "5km PR Schema | Snelle 5km Hardloopschema onder 25 minuten"
      seoDescription = `${schedule.overview} Download dit gratis 5km PR hardloopschema met Jack Daniels methodiek en verbeter je persoonlijk record. Inclusief weekoverzicht, trainingsdetails en coach strategie.`
      keywords = [
        "5km PR schema",
        "5km persoonlijk record",
        "snelle 5km hardloopschema",
        "5km onder 25 minuten",
        "Jack Daniels 5km schema",
        "5km PR training",
        "hardloopschema 5km PR",
        "trainingsschema 5km snel",
      ]
    } else if (isMarathon) {
      distance = "Marathon"
      seoTitle = "Marathon Schema | 16 Weken Hardloopschema voor 42,2 km"
      seoDescription = `${schedule.overview} Download dit gratis marathon hardloopschema en bereid je voor op 42,2 kilometer. Inclusief weekoverzicht, trainingsdetails en coach strategie.`
      keywords = [
        "marathon schema",
        "marathon hardloopschema",
        "42.2 km schema",
        "marathon training",
        "marathon voorbereiding",
        "hardloopschema marathon",
        "trainingsschema 42 km",
        "marathon schema 16 weken",
      ]
    } else {
      distance = is5km ? "5km" : is10km ? "10km" : ""
      seoTitle = `${distance} Hardloopschema | Gratis Trainingsschema ${distance}`
      seoDescription = `${schedule.overview} Download dit gratis ${distance.toLowerCase()} hardloopschema en begin vandaag nog met trainen. Inclusief weekoverzicht, trainingsdetails en coach strategie.`
      keywords = [
        `${distance} hardloopschema`,
        `hardloopschema ${distance}`,
        `trainingsschema ${distance}`,
        `${distance} hardloop training`,
        `gratis hardloopschema ${distance}`,
        `hardloop schema ${distance}`,
        `5km schema`,
        `10km schema`,
        "hardloopschema",
        "trainingsschema hardlopen",
      ]
    }

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: [
        ...keywords,
        "hardloopschema",
        "trainingsschema hardlopen",
        "gratis hardloopschema",
      ],
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        type: "article",
      },
      alternates: {
        canonical: `https://hardloopschematool.nl/${slug}`,
      },
    }
  }

  // Check other routes
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
    const createScheduleSlug =
      loc === "nl" ? "schema-maken" : loc === "de" ? "plan-erstellen" : "create-schedule"

    if (slug === nlSlug || slug === trainingTypesSlug || slug === createScheduleSlug) {
      locale = loc
      break
    }
  }

  return getPageMetadata(locale, seoPage, {
    path: `/${slug}`,
  })
}

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Check if it's a schedule route first
  const schedule = schedules[slug]
  if (schedule) {
    // Generate structured data for SEO
    const is5km = slug.includes("5km")
    const is10km = slug.includes("10km")
    const isMarathon = slug.includes("marathon")
    const is5kmPr = slug.includes("5km-pr")

    let headline = ""
    let keywords: string[] = []

    if (is5kmPr) {
      headline = "5km PR Hardloopschema"
      keywords = ["5km PR schema", "5km persoonlijk record", "snelle 5km hardloopschema"]
    } else if (isMarathon) {
      headline = "Marathon Hardloopschema"
      keywords = ["marathon schema", "marathon hardloopschema", "42.2 km schema"]
    } else {
      const distance = is5km ? "5km" : is10km ? "10km" : ""
      headline = `${distance} Hardloopschema`
      keywords = [
        `${distance} hardloopschema`,
        `hardloopschema ${distance}`,
        `trainingsschema ${distance}`,
      ]
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline,
      description: schedule.overview,
      author: {
        "@type": "Organization",
        name: "Hardloopschematool",
      },
      publisher: {
        "@type": "Organization",
        name: "Hardloopschematool",
      },
      datePublished: new Date().toISOString(),
      dateModified: new Date().toISOString(),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://hardloopschematool.nl/${slug}`,
      },
      keywords,
    }

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ExampleSchedulePage schedule={schedule} />
      </>
    )
  }

  return <SlugPageClient params={params} />
}
