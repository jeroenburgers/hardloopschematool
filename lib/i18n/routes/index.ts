/**
 * Routes module exports
 * Refactored according to SOLID principles:
 * - Single Responsibility: Each file has one clear purpose
 * - Open/Closed: Extensible via RouteRegistry interface
 * - Dependency Inversion: Uses abstractions (interfaces)
 */

export { routeRegistry } from "./route-implementation"
export type { RouteKey, RouteConfig, IRouteRegistry } from "./route-registry"
export { getLocalizedRoute, getRoutes, getRouteKeyBySlug } from "./route-helpers"
export { routeComponents } from "./route-components"
export { getTrainingTypeKeyFromSlug } from "./training-type-routes"

// Backward compatibility: export routeSlugs
export { routeSlugs } from "./route-implementation"
