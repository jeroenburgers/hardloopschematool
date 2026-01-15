import type { Metadata } from "next"
import { getPageMetadata } from "@/lib/seo"
import { getDefaultLocale } from "@/lib/i18n/config"
import { HomePage } from "@/components/pages/home-page"

const defaultLocale = getDefaultLocale()

export const metadata: Metadata = getPageMetadata(defaultLocale, "home")

export default function Home() {
  return <HomePage />
}
