import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { getDefaultLocale } from "@/lib/i18n/config"
import { ExampleSchedulesPage } from "@/components/pages/example-schedules-page"

const defaultLocale = getDefaultLocale()

export const metadata: Metadata = getPageMetadata(defaultLocale, "home")

export default function ExampleSchedules() {
  return <ExampleSchedulesPage />
}
