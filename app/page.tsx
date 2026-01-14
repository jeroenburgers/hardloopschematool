import type { Metadata } from "next"
import { getMetadata } from "@/lib/seo"
import { getDefaultLocale } from "@/lib/i18n/config"
import { HomePage } from "@/components/pages/home-page"

const defaultLocale = getDefaultLocale()

export const metadata: Metadata = getMetadata(defaultLocale, "home")

export default function Home() {
  return <HomePage />
}
