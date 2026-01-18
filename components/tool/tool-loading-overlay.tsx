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
    <div className="absolute inset-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center text-center p-12 rounded-[3rem] animate-in fade-in">
      <div className="w-24 h-24 border-8 border-zinc-100 dark:border-zinc-800 border-t-orange-600 rounded-full animate-spin mb-10" />
      <h3 className="text-3xl font-black text-zinc-950 dark:text-zinc-50 mb-4 tracking-tighter">
        Analyse Voltooien...
      </h3>
      <p className="text-zinc-400 dark:text-zinc-500 font-black text-[11px] uppercase tracking-[0.4em]">
        {toolTranslations.coachLoading}
      </p>
    </div>
  )
}
