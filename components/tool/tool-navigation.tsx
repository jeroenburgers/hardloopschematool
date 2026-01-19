"use client"

import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"

/**
 * Navigation Buttons for Schedule Tool
 * SOLAR: Separation of Concerns - handles navigation UI
 */
interface ToolNavigationProps {
  currentStep: number
  steps: Array<{ name: string }>
  isValid: boolean
  loading: boolean
  onBack: () => void
  onNext: () => void
  onGenerate: () => void
}

export function ToolNavigation({
  currentStep,
  steps,
  isValid,
  loading,
  onBack,
  onNext,
  onGenerate,
}: ToolNavigationProps) {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool
  const maxStep = steps.length
  const nextStepName = steps[currentStep]?.name // currentStep is 1-based
  const nextLabel = nextStepName
    ? `${toolTranslations.navigation?.nextTo || toolTranslations.next} ${nextStepName}`
    : toolTranslations.next

  return (
    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sticky bottom-0 z-40 bg-white/95 dark:bg-zinc-950/95 backdrop-blur -mx-4 sm:-mx-6 md:mx-0 px-4 sm:px-6 md:px-0">
      <div className="flex justify-start w-full sm:w-auto">
        {currentStep > 1 && (
          <button
            onClick={onBack}
            className="px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5 rounded-2xl sm:rounded-3xl font-black text-xs sm:text-sm uppercase tracking-[0.1em] transition-colors border-2 border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-zinc-50 hover:border-zinc-950 dark:hover:border-zinc-600 bg-white dark:bg-zinc-950 leading-none w-full sm:w-auto"
          >
            {toolTranslations.back}
          </button>
        )}
      </div>

      <div className="flex justify-end w-full sm:w-auto">
        <div className="flex flex-col items-end w-full sm:w-auto">
          {currentStep < maxStep ? (
            <button
              onClick={onNext}
              className="px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5 bg-orange-600 dark:bg-orange-500 text-white rounded-2xl sm:rounded-3xl font-black text-xs sm:text-sm uppercase tracking-[0.1em] hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors shadow-[0_18px_45px_-20px_rgba(0,0,0,0.35)] active:translate-y-[1px] w-full sm:w-auto"
            >
              <span className="block leading-none">{nextLabel}</span>
            </button>
          ) : (
            <button
              onClick={onGenerate}
              disabled={!isValid || loading}
              className="px-6 py-3 sm:px-8 sm:py-4 md:px-12 md:py-5 bg-orange-600 dark:bg-orange-500 text-white rounded-2xl sm:rounded-3xl font-black text-xs sm:text-sm uppercase tracking-[0.1em] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-700 dark:hover:bg-orange-600 transition-colors shadow-[0_18px_45px_-20px_rgba(0,0,0,0.35)] active:translate-y-[1px] w-full sm:w-auto"
            >
              <span className="block leading-none">{toolTranslations.generate}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
