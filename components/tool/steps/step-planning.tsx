/**
 * Step Planning component
 * SOLAR: Autonomous Component - handles planning information independently
 */
interface MondayOption {
  val: string
  label: string
}

interface StepPlanningProps {
  startDate: string
  targetDays: number
  mondayOptions: MondayOption[]
  planningOptions: number[]
  startDateLabel: string
  targetDaysLabel: string
  onStartDateChange: (date: string) => void
  onTargetDaysChange: (days: number) => void
}

export function StepPlanning({
  startDate,
  targetDays,
  mondayOptions,
  planningOptions,
  startDateLabel,
  targetDaysLabel,
  onStartDateChange,
  onTargetDaysChange,
}: StepPlanningProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-4">
        <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block mb-4">
          {startDateLabel}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {mondayOptions.map((monday) => (
            <button
              key={monday.val}
              onClick={() => onStartDateChange(monday.val)}
              className={`py-4 rounded-2xl border-2 font-black text-sm transition-all ${
                startDate === monday.val
                  ? "bg-zinc-950 dark:bg-zinc-900 border-zinc-950 dark:border-zinc-800 text-white shadow-lg"
                  : "bg-white dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {monday.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 block mb-4">
          {targetDaysLabel}
        </label>
        <div className="flex gap-3">
          {planningOptions.map((num) => (
            <button
              key={num}
              onClick={() => onTargetDaysChange(num)}
              className={`w-14 h-14 rounded-2xl border-2 font-black text-lg flex items-center justify-center transition-all ${
                targetDays === num
                  ? "bg-zinc-950 dark:bg-zinc-900 border-zinc-950 dark:border-zinc-800 text-white shadow-lg"
                  : "bg-white dark:bg-zinc-900/50 border-zinc-100 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
