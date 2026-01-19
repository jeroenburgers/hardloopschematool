import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"

/**
 * Tool USPs component
 * SOLAR: Separation of Concerns - displays unique selling points
 */
export function ToolUSPs() {
  const { locale } = useLanguage()
  const usps = translations[locale].tool.usps

  return (
    <div className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-0">
      {[
        { key: "safeTraining", emoji: "🛡️" },
        { key: "directPlan", emoji: "⚡" },
        { key: "eliteLogic", emoji: "🎯" },
        { key: "adaptive", emoji: "🧠" },
      ].map(({ key, emoji }) => {
        const item = (usps as Record<string, { title: string; description: string }>)[key]
        if (!item) return null

        return (
          <div
            key={key}
            className="p-4 sm:p-6 bg-white dark:bg-zinc-950 rounded-xl sm:rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70 hover:border-zinc-950 dark:hover:border-zinc-600 transition-colors"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800/70 flex items-center justify-center text-base sm:text-lg flex-shrink-0">
                {emoji}
              </div>
              <div className="space-y-0.5 sm:space-y-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-zinc-50">
                  {item.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-zinc-500 dark:text-zinc-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
