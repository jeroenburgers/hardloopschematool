import { type Locale } from "../types"
import { MethodPage } from "@/components/pages/method-page"
import { TrainingTypesPage } from "@/components/pages/training-types-page"
import { CreateSchedulePage } from "@/components/pages/create-schedule-page"
import type { ComponentType } from "react"
import type { RouteKey, IRouteRegistry } from "./route-registry"

/**
 * Route key to component mapping
 */
const routeComponents: Record<RouteKey, ComponentType> = {
  method: MethodPage,
  trainingTypes: TrainingTypesPage,
  createSchedule: CreateSchedulePage,
}

/**
 * Route slugs per locale
 */
const routeSlugsByLocale: Record<Locale, Record<RouteKey, string>> = {
  nl: {
    method: "onze-methode",
    trainingTypes: "trainingsvormen",
    createSchedule: "schema-maken",
  },
  en: {
    method: "our-method",
    trainingTypes: "training-types",
    createSchedule: "create-schedule",
  },
  de: {
    method: "unsere-methode",
    trainingTypes: "trainingsformen",
    createSchedule: "plan-erstellen",
  },
}

/**
 * Route registry
 * Implements RouteRegistry interface following Open/Closed Principle
 */
export class RouteRegistry implements IRouteRegistry {
  getSlug(locale: Locale, routeKey: RouteKey): string {
    return routeSlugsByLocale[locale][routeKey]
  }

  getComponent(routeKey: RouteKey): ComponentType | undefined {
    return routeComponents[routeKey]
  }

  getAllRoutes(locale: Locale): Record<RouteKey, string> {
    return routeSlugsByLocale[locale]
  }

  getRouteKeyBySlug(slug: string): RouteKey | null {
    const locales: Locale[] = ["nl", "en", "de"]
    for (const locale of locales) {
      const slugs = routeSlugsByLocale[locale]
      for (const [key, value] of Object.entries(slugs) as [RouteKey, string][]) {
        if (value === slug) {
          return key
        }
      }
    }
    return null
  }
}

/**
 * Singleton instance of route registry
 */
export const routeRegistry = new RouteRegistry()

/**
 * Route slugs per locale
 * Exported for backward compatibility
 */
export const routeSlugs: Record<Locale, Record<RouteKey, string>> = routeSlugsByLocale
