import { Goal } from "lucide-react"
import { TimeInput } from "../time-input"
import type { Goal as GoalType } from "@/lib/types/schedule"

/**
 * Step Performance component
 * SOLAR: Autonomous Component - handles recent performance input independently
 */
interface StepPerformanceProps {
  recentDistance: string
  recentTime: string
  availableGoals: GoalType[]
  recentDistLabel: string
  recentTimeLabel: string
  onDistanceChange: (distance: string) => void
  onTimeChange: (time: string) => void
}

export function StepPerformance({
  recentDistance,
  recentTime,
  availableGoals,
  recentDistLabel,
  recentTimeLabel,
  onDistanceChange,
  onTimeChange,
}: StepPerformanceProps) {
  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="text-orange-600">
            <Goal className="w-6 h-6" />
          </div>
          <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            {recentDistLabel}
          </label>
        </div>
        <select
          value={recentDistance}
          onChange={(e) => onDistanceChange(e.target.value)}
          className="w-full bg-white dark:bg-zinc-900/50 border-4 border-zinc-100 dark:border-zinc-800 rounded-[2rem] px-8 py-6 text-3xl font-black outline-none focus:border-zinc-950 dark:focus:border-zinc-600 transition-all appearance-none cursor-pointer text-zinc-950 dark:text-zinc-50"
        >
          {availableGoals.map((goal) => (
            <option key={goal} value={goal}>
              {goal}
            </option>
          ))}
        </select>
      </div>
      <TimeInput label={recentTimeLabel} value={recentTime} onChange={onTimeChange} />
    </div>
  )
}
