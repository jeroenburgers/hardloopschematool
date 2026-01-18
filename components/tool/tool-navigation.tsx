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
    <div className="mt-20 grid grid-cols-1 sm:grid-cols-12 gap-4 sticky bottom-8 z-40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl p-5 rounded-[2.5rem] border-4 border-zinc-50 dark:border-zinc-900 shadow-2xl animate-in slide-in-from-bottom-8 duration-500">
      {currentStep > 1 && (
        <button
          onClick={onBack}
          className="sm:col-span-4 px-10 py-6 bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 rounded-[1.5rem] font-black text-xs uppercase tracking-widest border-2 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
        >
          {toolTranslations.back}
        </button>
      )}
      {currentStep < 7 ? (
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`${
            currentStep === 1 ? "sm:col-span-12" : "sm:col-span-8"
          } px-10 py-7 bg-zinc-950 dark:bg-zinc-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] disabled:opacity-20 hover:bg-zinc-800 dark:hover:bg-zinc-800 transition-all active:scale-95 shadow-xl`}
        >
          {toolTranslations.next}
        </button>
      ) : (
        <button
          onClick={onGenerate}
          disabled={!isValid || loading}
          className="sm:col-span-8 px-10 py-7 bg-orange-600 dark:bg-orange-500 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-orange-600/40 dark:shadow-orange-500/40 hover:bg-orange-700 dark:hover:bg-orange-600 transition-all active:scale-95"
        >
          {toolTranslations.generate}
        </button>
      )}
    </div>
  )
}
