import { translations } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n/types"

/**
 * Step Header component
 * SOLAR: Separation of Concerns - displays step header with title and subtitle
 */
interface StepHeaderProps {
  locale: Locale
  titleKey: string
  subtitleKey?: string
  showExpertTag?: boolean
}

export function StepHeader({ locale, titleKey, subtitleKey, showExpertTag }: StepHeaderProps) {
  const toolTranslations = translations[locale].tool

  return (
    <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3 sm:pb-4 mb-4 sm:mb-6">
      {showExpertTag && (
        <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 mb-2 sm:mb-3 bg-orange-600/10 dark:bg-orange-600/20 rounded-full">
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-orange-600 rounded-full" />
          <span className="text-orange-600 dark:text-orange-500 font-semibold text-[9px] sm:text-[10px] uppercase tracking-wide">
            {toolTranslations.expertTag}
          </span>
        </div>
      )}

      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-950 dark:text-zinc-50 mb-1 sm:mb-2 tracking-tight">
        {toolTranslations[titleKey as keyof typeof toolTranslations] as string}
      </h2>

      {!showExpertTag && subtitleKey && (
        <p className="text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
          {toolTranslations[subtitleKey as keyof typeof toolTranslations] as string}
        </p>
      )}
    </div>
  )
}
