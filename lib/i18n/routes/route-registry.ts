import { type Locale } from "../types"
import type { ComponentType } from "react"

/**
 * Route key type - extensible for new routes
 */
export type RouteKey = "method" | "trainingTypes" | "createSchedule"

/**
 * Interface for route configuration
 * Open/Closed Principle: New routes can be added by extending this interface
 */
export interface RouteConfig {
  slug: string
  component: ComponentType
}

/**
 * Route registry interface
 * Allows extension without modification (Open/Closed Principle)
 */
export interface IRouteRegistry {
  getSlug(locale: Locale, routeKey: RouteKey): string
  getComponent(routeKey: RouteKey): ComponentType | undefined
  getAllRoutes(locale: Locale): Record<RouteKey, string>
  getRouteKeyBySlug(slug: string): RouteKey | null
}
