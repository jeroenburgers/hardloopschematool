import type { Metadata } from "next"
import { ExampleSchedulesPage } from "@/components/pages/example-schedules-page"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://hardloopschematool.nl"

export const metadata: Metadata = {
  title: "Gratis Hardloopschema Voorbeelden | 5km, 10km & Marathon",
  description:
    "Bekijk gratis voorbeelden van professionele hardloopschema's voor 5km, 10km en marathon. Download complete trainingsschema's met weekoverzicht, trainingsdetails en coach strategie. Perfect als startpunt voor jouw hardloopdoelen.",
  keywords: [
    "hardloopschema voorbeelden",
    "gratis hardloopschema",
    "5km hardloopschema",
    "10km hardloopschema",
    "marathon schema voorbeeld",
    "trainingsschema hardlopen",
    "hardloop schema downloaden",
    "hardloopschema template",
    "hardloop trainingsplan",
    "hardloopschema starter",
  ],
  openGraph: {
    title: "Gratis Hardloopschema Voorbeelden | 5km, 10km & Marathon",
    description:
      "Bekijk gratis voorbeelden van professionele hardloopschema's. Download complete trainingsschema's met weekoverzicht en trainingsdetails.",
    type: "website",
    url: `${baseUrl}/voorbeeldschemas`,
  },
  alternates: {
    canonical: `${baseUrl}/voorbeeldschemas`,
  },
}

export default function ExampleSchedules() {
  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Hardloopschema Voorbeelden",
    description:
      "Gratis voorbeelden van professionele hardloopschema's voor verschillende afstanden en niveaus.",
    url: `${baseUrl}/voorbeeldschemas`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "5km Hardloopschema",
          url: `${baseUrl}/5km-hardloopschema`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "10km Hardloopschema",
          url: `${baseUrl}/10km-hardloopschema`,
        },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ExampleSchedulesPage />
    </>
  )
}
