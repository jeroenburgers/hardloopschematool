import { translations, type Locale, type TranslationKeys } from "./types"

/**
 * Validates that all translation files have the same structure
 * Checks for missing or extra keys compared to the base translation (nl)
 */
export function validateTranslations(): void {
  const baseLocale: Locale = "nl"
  const baseTranslation = translations[baseLocale]

  const locales: Locale[] = ["nl", "en", "de"]

  for (const locale of locales) {
    if (locale === baseLocale) continue

    const translation = translations[locale]
    const issues: string[] = []

    // Check for missing and extra keys
    const missingKeys = findMissingKeys(baseTranslation, translation, "")
    const extraKeys = findMissingKeys(translation, baseTranslation, "")

    if (missingKeys.length > 0) {
      issues.push(`Missing keys in ${locale}: ${missingKeys.join(", ")}`)
    }

    if (extraKeys.length > 0) {
      issues.push(`Extra keys in ${locale}: ${extraKeys.join(", ")}`)
    }

    if (issues.length > 0) {
      console.error(`Translation validation errors for locale "${locale}":`)
      issues.forEach((issue) => console.error(`  - ${issue}`))
      throw new Error(
        `Translation validation failed for locale "${locale}". All translations must have the same structure as "${baseLocale}".`,
      )
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.log("✅ All translations validated successfully")
  }
}

/**
 * Recursively finds missing keys in target compared to source
 */
function findMissingKeys(
  source: Record<string, unknown>,
  target: Record<string, unknown>,
  prefix: string,
): string[] {
  const missing: string[] = []

  for (const key in source) {
    const fullKey = prefix ? `${prefix}.${key}` : key
    const sourceValue = source[key]
    const targetValue = target[key]

    if (!(key in target)) {
      missing.push(fullKey)
    } else if (
      typeof sourceValue === "object" &&
      sourceValue !== null &&
      !Array.isArray(sourceValue)
    ) {
      if (typeof targetValue === "object" && targetValue !== null && !Array.isArray(targetValue)) {
        missing.push(
          ...findMissingKeys(
            sourceValue as Record<string, unknown>,
            targetValue as Record<string, unknown>,
            fullKey,
          ),
        )
      } else {
        missing.push(fullKey)
      }
    }
  }

  return missing
}

/**
 * Type-safe function to get nested translation value
 */
export function getNestedValue(obj: TranslationKeys, path: string): string {
  const keys = path.split(".")
  let current: unknown = obj

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key]
    } else {
      throw new Error(`Translation key not found: ${path}`)
    }
  }

  if (typeof current !== "string") {
    throw new Error(`Translation key "${path}" does not resolve to a string`)
  }

  return current
}
