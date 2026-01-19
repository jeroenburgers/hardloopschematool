import { type Locale } from "../types"
import { routeRegistry } from "./route-implementation"
import type { RouteKey } from "./route-registry"

/**
 * Get a localized route path (without locale prefix)
 */
export function getLocalizedRoute(locale: Locale, routeKey: RouteKey): string {
  return `/${routeRegistry.getSlug(locale, routeKey)}`
}

/**
 * Get all routes for a locale (without locale prefix)
 */
export function getRoutes(locale: Locale) {
  return {
    method: getLocalizedRoute(locale, "method"),
    trainingTypes: getLocalizedRoute(locale, "trainingTypes"),
    createSchedule: getLocalizedRoute(locale, "createSchedule"),
  }
}

/**
 * Get route key from slug (reverse lookup)
 * Returns the route key (e.g., "method", "trainingTypes") based on the slug
 * Checks all locales to find the matching route key
 */
export function getRouteKeyBySlug(slug: string): RouteKey | null {
  return routeRegistry.getRouteKeyBySlug(slug)
}
