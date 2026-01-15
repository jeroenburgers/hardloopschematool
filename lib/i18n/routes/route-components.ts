import { MethodPage } from "@/components/pages/method-page"
import { TrainingTypesPage } from "@/components/pages/training-types-page"
import { ExamplesPage } from "@/components/pages/examples-page"
import { CreateSchedulePage } from "@/components/pages/create-schedule-page"
import type { ComponentType } from "react"
import type { RouteKey } from "./route-registry"

/**
 * Route key to component mapping
 * Exported for backward compatibility
 */
export const routeComponents: Record<RouteKey, ComponentType> = {
  method: MethodPage,
  trainingTypes: TrainingTypesPage,
  examples: ExamplesPage,
  createSchedule: CreateSchedulePage,
}
