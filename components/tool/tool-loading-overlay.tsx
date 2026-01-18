"use client"

import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"

/**
 * Loading Overlay for Schedule Tool
 * SOLAR: Separation of Concerns - handles loading state display
 */
interface ToolLoadingOverlayProps {
  loading: boolean
}

export function ToolLoadingOverlay({ loading }: ToolLoadingOverlayProps) {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool

  if (!loading) return null

  return (
    <div className="absolute inset-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center text-center p-8 rounded-lg">
      <div className="w-16 h-16 border-4 border-zinc-100 dark:border-zinc-800 border-t-orange-600 rounded-full animate-spin mb-6" />
      <h3 className="text-xl font-bold text-zinc-950 dark:text-zinc-50 mb-2">
        Analyse Voltooien...
      </h3>
      <p className="text-zinc-400 dark:text-zinc-500 font-medium text-xs uppercase tracking-wide">
        {toolTranslations.coachLoading}
      </p>
    </div>
  )
}
