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
    <div className="flex gap-3 p-4 bg-zinc-950 dark:bg-zinc-900 text-white rounded-lg border border-white/10 dark:border-zinc-700/30 relative overflow-hidden">
      <div className="w-8 h-8 bg-white dark:bg-zinc-800 rounded-lg flex items-center justify-center text-base flex-shrink-0 relative z-10">
        💡
      </div>
      <div className="relative z-10">
        <h4 className="text-[10px] font-semibold uppercase tracking-wide text-orange-500 dark:text-orange-400 mb-1">
          {title}
        </h4>
        <p className="text-xs font-medium text-zinc-300 dark:text-zinc-400 leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  )
}
