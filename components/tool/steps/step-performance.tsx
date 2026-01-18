import { AlertCircle } from "lucide-react"
import type { Goal as GoalType } from "@/lib/types/schedule"
import { RadioButton } from "@/components/ui/radio-button"
import { StepTargetTime } from "./step-target-time"

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
  errorDistance?: boolean
  errorTime?: boolean
  onDistanceChange: (distance: string) => void
  onTimeChange: (time: string) => void
}

export function StepPerformance({
  recentDistance,
  recentTime,
  availableGoals,
  recentDistLabel,
  recentTimeLabel,
  errorDistance = false,
  errorTime = false,
  onDistanceChange,
  onTimeChange,
}: StepPerformanceProps) {
  // Filter out "Conditie / Gezondheid" from available goals
  const filteredGoals = availableGoals.filter(
    (goal) => goal !== "Conditie / Gezondheid" && !goal.includes("Conditie / Gezondheid"),
  )

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-6 block">
          {recentDistLabel}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {filteredGoals.map((goal) => (
            <RadioButton
              key={goal}
              checked={recentDistance === goal}
              onChange={() => onDistanceChange(goal)}
              error={errorDistance && recentDistance !== goal}
            >
              <div className="flex flex-col items-start justify-center w-full min-h-[60px]">
                <span className="text-sm font-semibold">{goal}</span>
              </div>
            </RadioButton>
          ))}
        </div>
        {errorDistance && (
          <div className="flex items-start gap-2 mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              Selecteer een afstand om door te gaan.
            </p>
          </div>
        )}
      </div>
      <div className="space-y-4">
        <label className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-6 block">
          {recentTimeLabel}
        </label>
        <StepTargetTime
          value={recentTime || ""}
          placeholder="00:00:00"
          onChange={onTimeChange}
          error={errorTime}
        />
        {errorTime && (
          <div className="flex items-start gap-2 mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              Vul een tijd in om door te gaan.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
