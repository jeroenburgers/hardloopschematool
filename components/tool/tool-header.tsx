import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"

/**
 * Tool Header component
 * SOLAR: Separation of Concerns - displays tool page header
 */
export function ToolHeader() {
  const { locale } = useLanguage()
  const toolTranslations = translations[locale].tool

  return (
    <div className="mb-8 sm:mb-12 md:mb-20 text-center">
      <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-1.5 sm:py-2.5 bg-zinc-950 dark:bg-zinc-900 text-white rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-4 sm:mb-6 md:mb-8">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(234,88,12,0.8)]" />
        {toolTranslations.expertTag}
      </div>
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-zinc-950 dark:text-zinc-50 tracking-tighter mb-4 sm:mb-6 leading-none px-2">
        {toolTranslations.pageTitle}{" "}
        <span className="text-orange-600 dark:text-orange-500 italic">
          {toolTranslations.pageTitleHighlight}
        </span>
      </h1>
      <p className="text-zinc-400 dark:text-zinc-500 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em] px-2">
        {toolTranslations.pageSubtitle}
      </p>
    </div>
  )
}
