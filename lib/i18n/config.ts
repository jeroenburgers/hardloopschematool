import { type Locale } from "./types"

/**
 * Get the default locale from environment variable
 * Falls back to 'nl' if not set or invalid
 */
export function getDefaultLocale(): Locale {
  const envLocale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE

  // Validate that the locale is supported
  if (envLocale === "nl" || envLocale === "en" || envLocale === "de") {
    return envLocale
  }

  // Fallback to Dutch
  if (process.env.NODE_ENV === "development" && envLocale) {
    console.warn(
      `Invalid NEXT_PUBLIC_DEFAULT_LOCALE: "${envLocale}". Using "nl" as fallback. Supported values: nl, en, de`,
    )
  }

  return "nl"
}
