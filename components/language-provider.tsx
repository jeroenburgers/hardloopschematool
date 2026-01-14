"use client"

import * as React from "react"
import {
  translations,
  type Locale,
  type TranslationPath,
  validateTranslations,
  getNestedValue,
  getDefaultLocale,
} from "@/lib/i18n"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationPath) => string
}

const LanguageContext = React.createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
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
      // If no saved locale, use the default from environment
      setLocaleState(defaultLocale)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLocale = React.useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
  }, [])

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
