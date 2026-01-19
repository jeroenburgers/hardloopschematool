import { BookOpen, Activity } from "lucide-react"
import type { Locale } from "@/lib/i18n/types"
import { getRoutes } from "@/lib/i18n/routes"
import type { TranslationPath } from "@/lib/i18n/types"

export interface MenuItem {
  href: string
  labelKey: TranslationPath
  icon: React.ComponentType<{ className?: string }>
}

/**
 * Get menu items configuration
 * Separated for Single Responsibility Principle
 */
export function getMenuItems(locale: Locale): MenuItem[] {
  const routes = getRoutes(locale)
  return [
    { href: routes.method, labelKey: "header.nav.method", icon: BookOpen },
    { href: routes.trainingTypes, labelKey: "header.nav.trainingTypes", icon: Activity },
  ]
}
