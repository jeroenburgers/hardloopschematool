import { type Locale } from "./types"
import { MethodPage } from "@/components/pages/method-page"
import { TrainingTypesPage } from "@/components/pages/training-types-page"
import { ExamplesPage } from "@/components/pages/examples-page"
import { CreateSchedulePage } from "@/components/pages/create-schedule-page"
import type { ComponentType } from "react"

/**
 * Route slugs per locale
 */
export const routeSlugs: Record<Locale, Record<string, string>> = {
  nl: {
    method: "onze-methode",
    trainingTypes: "trainingsvormen",
    examples: "voorbeeld-schemas",
    createSchedule: "schema-maken",
  },
  en: {
    method: "our-method",
    trainingTypes: "training-types",
    examples: "example-schedules",
    createSchedule: "create-schedule",
  },
  de: {
    method: "unsere-methode",
    trainingTypes: "trainingsformen",
    examples: "beispielplaene",
    createSchedule: "plan-erstellen",
  },
}

/**
 * Route key to component mapping
 */
export const routeComponents: Record<keyof typeof routeSlugs.nl, ComponentType> = {
  method: MethodPage,
  trainingTypes: TrainingTypesPage,
  examples: ExamplesPage,
  createSchedule: CreateSchedulePage,
}

/**
 * Get a localized route path (without locale prefix)
 */
export function getLocalizedRoute(locale: Locale, routeKey: keyof typeof routeSlugs.nl): string {
  return `/${routeSlugs[locale][routeKey]}`
}

/**
 * Get all routes for a locale (without locale prefix)
 */
export function getRoutes(locale: Locale) {
  return {
    method: getLocalizedRoute(locale, "method"),
    trainingTypes: getLocalizedRoute(locale, "trainingTypes"),
    examples: getLocalizedRoute(locale, "examples"),
    createSchedule: getLocalizedRoute(locale, "createSchedule"),
  }
}

/**
 * Get route key from slug (reverse lookup)
 * Returns the route key (e.g., "method", "trainingTypes") based on the slug
 * Checks all locales to find the matching route key
 */
export function getRouteKeyFromSlug(slug: string): keyof typeof routeSlugs.nl | null {
  // Check all locales to find the matching slug
  const locales: Locale[] = ["nl", "en", "de"]
  for (const locale of locales) {
    const slugs = routeSlugs[locale]
    for (const [key, value] of Object.entries(slugs)) {
      if (value === slug) {
        return key as keyof typeof routeSlugs.nl
      }
    }
  }
  return null
}

/**
 * Get training type key from slug (reverse lookup)
 * Returns the training type key (e.g., "progressionRun", "hillRepeats") based on the slug
 * Checks all locales to find the matching training type key
 */
export function getTrainingTypeKeyFromSlug(
  slug: string,
  translations: Record<Locale, unknown>,
): string | null {
  const locales: Locale[] = ["nl", "en", "de"]
  for (const locale of locales) {
    const types = (
      translations[locale] as {
        pages?: { trainingTypes?: { types?: Record<string, { slug?: string }> } }
      }
    )?.pages?.trainingTypes?.types
    if (!types) continue

    for (const [key, value] of Object.entries(types)) {
      const typeData = value as { slug?: string }
      if (typeData?.slug === slug) {
        return key
      }
    }
  }
  return null
}
