/**
 * SEO module exports
 * Refactored according to SOLID principles:
 * - Single Responsibility: Each file has one clear purpose
 * - Open/Closed: Extensible via MetadataBuilder interface
 * - Dependency Inversion: Uses abstractions (interfaces)
 */

export { getPageMetadata, type PageType, type PageMetadataOptions } from "./page-metadata"
export { getTrainingTypeMetadata } from "./training-type-metadata"
export {
  MetadataBuilder,
  type MetadataBuilder as IMetadataBuilder,
  type MetadataContent,
} from "./metadata-builder"
