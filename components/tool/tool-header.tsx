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
    <div className="mb-20 text-center">
      <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-zinc-950 dark:bg-zinc-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <span className="w-2 h-2 bg-orange-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(234,88,12,0.8)]" />
        {toolTranslations.expertTag}
      </div>
      <h1 className="text-5xl md:text-8xl font-black text-zinc-950 dark:text-zinc-50 tracking-tighter mb-6 leading-none animate-in fade-in slide-in-from-bottom-8 duration-700">
        {toolTranslations.pageTitle}{" "}
        <span className="text-orange-600 dark:text-orange-500 italic">
          {toolTranslations.pageTitleHighlight}
        </span>
      </h1>
      <p className="text-zinc-400 dark:text-zinc-500 text-[11px] font-black uppercase tracking-[0.4em] animate-in fade-in duration-1000 delay-200">
        {toolTranslations.pageSubtitle}
      </p>
    </div>
  )
}
