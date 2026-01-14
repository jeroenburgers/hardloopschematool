"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  translations,
  type Locale,
  type TranslationPath,
  validateTranslations,
  getNestedValue,
  getDefaultLocale,
} from "@/lib/i18n"
import { getRouteKeyFromSlug, routeSlugs } from "@/lib/i18n/routes"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationPath) => string
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const defaultLocale = getDefaultLocale()

  const [locale, setLocaleState] = React.useState<Locale>(defaultLocale)
  const [isValidated, setIsValidated] = React.useState(false)

  // Validate translations on mount (only in development)
  React.useEffect(() => {
    if (process.env.NODE_ENV === "development" && !isValidated) {
      try {
        validateTranslations()
        setIsValidated(true)
      } catch (error) {
        console.error("Translation validation failed:", error)
      }
    }
  }, [isValidated])

  // Load locale from localStorage on mount
  React.useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale | null
    if (savedLocale && (savedLocale === "nl" || savedLocale === "en" || savedLocale === "de")) {
      setLocaleState(savedLocale)
    } else {
      setLocaleState(defaultLocale)
      localStorage.setItem("locale", defaultLocale)
    }
  }, [defaultLocale])

  const setLocale = React.useCallback(
    (newLocale: Locale) => {
      setLocaleState(newLocale)
      localStorage.setItem("locale", newLocale)

      // Update URL to reflect new locale with correct slug (without locale prefix)
      const pathSegments = pathname?.split("/").filter(Boolean) || []

      if (pathSegments.length > 0) {
        // We're on a page with a slug
        const currentSlug = pathSegments[0]
        // Find the route key from the current slug (checks all locales)
        const routeKey = getRouteKeyFromSlug(currentSlug)

        if (routeKey) {
          // Get the correct slug for the new locale
          const newSlug = routeSlugs[newLocale][routeKey]
          router.push(`/${newSlug}`)
        } else {
          // If we can't find the route key, stay on the same page
          // (might be a non-translatable route)
        }
      } else {
        // Homepage - just reload to update content
        router.refresh()
      }
    },
    [pathname, router],
  )

  const t = React.useCallback(
    (key: TranslationPath): string => {
      try {
        return getNestedValue(translations[locale], key)
      } catch (error) {
        console.error(`Translation error for key "${key}":`, error)
        return key
      }
    },
    [locale],
  )

  const value = React.useMemo(
    () => ({
      locale,
      setLocale,
      t,
    }),
    [locale, setLocale, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = React.useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
