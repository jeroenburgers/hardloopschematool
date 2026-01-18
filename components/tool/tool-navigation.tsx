"use client"

import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"

/**
 * Navigation Buttons for Schedule Tool
 * SOLAR: Separation of Concerns - handles navigation UI
 */
interface ToolNavigationProps {
  currentStep: number
  isValid: boolean
  loading: boolean
  onBack: () => void
  onNext: () => void
  onGenerate: () => void
}

export function ToolNavigation({
  currentStep,
  isValid,
  loading,
  onBack,
  onNext,
  onGenerate,
}: ToolNavigationProps) {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool

  return (
    <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-3 justify-end sticky bottom-0 z-40 bg-white dark:bg-zinc-950">
      {currentStep > 1 && (
        <button
          onClick={onBack}
          className="px-6 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 rounded-lg font-semibold text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          {toolTranslations.back}
        </button>
      )}
      {currentStep < 7 ? (
        <button
          onClick={onNext}
          className="px-12 py-5 bg-orange-600 dark:bg-orange-500 text-white rounded-3xl font-black text-sm uppercase tracking-[0.1em] hover:bg-orange-700 dark:hover:bg-orange-600 hover:scale-[1.02] transition-all shadow-xl active:scale-95"
        >
          {toolTranslations.next}
        </button>
      ) : (
        <button
          onClick={onGenerate}
          disabled={!isValid || loading}
          className="px-12 py-5 bg-orange-600 dark:bg-orange-500 text-white rounded-3xl font-black text-sm uppercase tracking-[0.1em] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-700 dark:hover:bg-orange-600 hover:scale-[1.02] transition-all shadow-xl active:scale-95 disabled:hover:scale-100"
        >
          {toolTranslations.generate}
        </button>
      )}
    </div>
  )
}
