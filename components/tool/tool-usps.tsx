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
    <div className="mt-32 grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 sm:px-0">
      <div className="p-14 bg-zinc-50 dark:bg-zinc-900/50 rounded-[4rem] border-2 border-zinc-100 dark:border-zinc-800 text-center flex flex-col items-center gap-8 group hover:border-zinc-950 dark:hover:border-zinc-600 transition-all duration-500 hover:shadow-2xl">
        <div className="w-24 h-24 bg-white dark:bg-zinc-800 rounded-3xl flex items-center justify-center text-5xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
          🛡️
        </div>
        <div className="space-y-3">
          <h4 className="text-[13px] font-black uppercase text-zinc-950 dark:text-zinc-50 tracking-[0.3em]">
            {usps.safeTraining.title}
          </h4>
          <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-relaxed">
            {usps.safeTraining.description}
          </p>
        </div>
      </div>
      <div className="p-14 bg-zinc-950 dark:bg-zinc-900 rounded-[4rem] border-2 border-zinc-800 dark:border-zinc-700 text-center flex flex-col items-center gap-8 group hover:bg-orange-600 dark:hover:bg-orange-500 hover:border-orange-500 transition-all duration-500 hover:shadow-2xl text-white">
        <div className="w-24 h-24 bg-white/10 dark:bg-zinc-800/50 rounded-3xl flex items-center justify-center text-5xl shadow-xl group-hover:scale-110 group-hover:bg-white transition-all duration-500">
          ⚡
        </div>
        <div className="space-y-3 text-white">
          <h4 className="text-[13px] font-black uppercase tracking-[0.3em]">
            {usps.directPlan.title}
          </h4>
          <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-300 group-hover:text-white/80 uppercase tracking-widest leading-relaxed">
            {usps.directPlan.description}
          </p>
        </div>
      </div>
      <div className="p-14 bg-zinc-50 dark:bg-zinc-900/50 rounded-[4rem] border-2 border-zinc-100 dark:border-zinc-800 text-center flex flex-col items-center gap-8 group hover:border-zinc-950 dark:hover:border-zinc-600 transition-all duration-500 hover:shadow-2xl">
        <div className="w-24 h-24 bg-white dark:bg-zinc-800 rounded-3xl flex items-center justify-center text-5xl shadow-xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
          🎯
        </div>
        <div className="space-y-3">
          <h4 className="text-[13px] font-black uppercase text-zinc-950 dark:text-zinc-50 tracking-[0.3em]">
            {usps.eliteLogic.title}
          </h4>
          <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest leading-relaxed">
            {usps.eliteLogic.description}
          </p>
        </div>
      </div>
    </div>
  )
}
