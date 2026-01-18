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
}

export function StepHeader({ locale, titleKey, subtitleKey }: StepHeaderProps) {
  const toolTranslations = translations[locale].tool

  return (
    <div className="p-10 bg-zinc-50 dark:bg-zinc-900/50 border-2 border-zinc-100 dark:border-zinc-800 rounded-[3rem]">
      <h2 className="text-4xl font-black text-zinc-950 dark:text-zinc-50 mb-3 tracking-tighter">
        {toolTranslations[titleKey as keyof typeof toolTranslations] as string}
      </h2>
      {subtitleKey && (
        <p className="text-zinc-400 dark:text-zinc-500 text-[10px] font-black uppercase tracking-widest">
          {toolTranslations[subtitleKey as keyof typeof toolTranslations] as string}
        </p>
      )}
    </div>
  )
}
