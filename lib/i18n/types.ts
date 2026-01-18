import nl from "@/locales/nl.json"
import en from "@/locales/en.json"
import de from "@/locales/de.json"

// Infer the type from the Dutch translation (our source of truth)
export type TranslationKeys = typeof nl

// Supported locales
export type Locale = "nl" | "en" | "de"

// Translation object type
export type Translations = Record<Locale, TranslationKeys>

// All translations - use type assertion to allow for language-specific keys in nested objects
export const translations = {
  nl,
  en,
  de,
} as unknown as Translations

// Helper type for nested object paths
type PathImpl<T, Key extends keyof T> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ?
        | `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof unknown[]>> & string}`
        | `${Key}.${Exclude<keyof T[Key], keyof unknown[]> & string}`
    : never
  : never

type PathImpl2<T> = PathImpl<T, keyof T> | keyof T

export type TranslationPath = PathImpl2<TranslationKeys> & string
