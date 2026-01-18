import { AlertCircle } from "lucide-react"
import { RadioButton } from "@/components/ui/radio-button"

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
  recommendedDays?: number
  startDateLabel: string
  targetDaysLabel: string
  errorStartDate?: boolean
  errorTargetDays?: boolean
  onStartDateChange: (date: string) => void
  onTargetDaysChange: (days: number) => void
}

export function StepPlanning({
  startDate,
  targetDays,
  mondayOptions,
  planningOptions,
  recommendedDays,
  startDateLabel,
  targetDaysLabel,
  errorStartDate = false,
  errorTargetDays = false,
  onStartDateChange,
  onTargetDaysChange,
}: StepPlanningProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-6 block">
          {startDateLabel}
        </label>
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: `repeat(${mondayOptions.length}, minmax(0, 1fr))` }}
        >
          {mondayOptions.map((monday) => (
            <RadioButton
              key={monday.val}
              checked={startDate === monday.val}
              onChange={() => onStartDateChange(monday.val)}
              error={errorStartDate && startDate !== monday.val}
            >
              <span className="text-sm font-semibold">{monday.label}</span>
            </RadioButton>
          ))}
        </div>
        {errorStartDate && (
          <div className="flex items-start gap-2 mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              Selecteer een startdatum om door te gaan.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <label className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-6 block">
          {targetDaysLabel}
        </label>
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: `repeat(${planningOptions.length}, minmax(0, 1fr))` }}
        >
          {planningOptions.map((num) => {
            const isSelected = targetDays === num
            const isRecommended = recommendedDays === num

            return (
              <RadioButton
                key={num}
                checked={isSelected}
                onChange={() => onTargetDaysChange(num)}
                error={errorTargetDays && !isSelected}
              >
                <div className="flex flex-col items-start justify-center w-full min-h-[60px]">
                  <span className="text-sm font-semibold">{num}x per week</span>
                  {isRecommended && (
                    <span
                      className={`text-[10px] font-medium uppercase tracking-wide mt-1 ${
                        isSelected ? "text-orange-400" : "text-zinc-400 dark:text-zinc-600"
                      }`}
                    >
                      Aanbevolen
                    </span>
                  )}
                </div>
              </RadioButton>
            )
          })}
        </div>
        {errorTargetDays && (
          <div className="flex items-start gap-2 mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600 dark:text-red-400 font-medium">
              Selecteer het aantal dagen per week om door te gaan.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
