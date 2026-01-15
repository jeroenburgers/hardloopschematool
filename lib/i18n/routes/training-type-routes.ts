import { type Locale } from "../types"
import { translations } from "../index"

/**
 * Get training type key from slug (reverse lookup)
 * Returns the training type key (e.g., "progressionRun", "hillRepeats") based on the slug
 * Checks all locales to find the matching training type key
 */
export function getTrainingTypeKeyFromSlug(
  slug: string,
  translationsData: Record<Locale, unknown> = translations,
): string | null {
  const locales: Locale[] = ["nl", "en", "de"]
  for (const locale of locales) {
    const types = (
      translationsData[locale] as {
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
