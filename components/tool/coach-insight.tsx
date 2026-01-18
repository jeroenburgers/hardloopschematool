/**
 * Coach Insight component
 * SOLAR: Separation of Concerns - displays expert insights
 */
interface CoachInsightProps {
  message: string
  title?: string
}

export function CoachInsight({ message, title = "Expert Inzicht" }: CoachInsightProps) {
  return (
    <div className="flex gap-4 p-6 bg-zinc-950 dark:bg-zinc-900 text-white rounded-[2.5rem] border border-white/10 dark:border-zinc-700/30 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-orange-600/20 dark:bg-orange-500/20 blur-3xl -mr-12 -mt-12 group-hover:bg-orange-600/30 dark:group-hover:bg-orange-500/30 transition-all duration-700" />
      <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-lg relative z-10">
        💡
      </div>
      <div className="relative z-10">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500 dark:text-orange-400 mb-1">
          {title}
        </h4>
        <p className="text-xs font-bold text-zinc-300 dark:text-zinc-400 leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  )
}
