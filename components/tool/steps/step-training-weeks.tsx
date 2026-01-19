import { AlertCircle } from "lucide-react"
import { RadioButton } from "@/components/ui/radio-button"

/**
 * Step Training Weeks component
 * SOLAR: Autonomous Component - handles training weeks selection independently
 */
interface StepTrainingWeeksProps {
  selectedWeeks: number
  availableOptions: number[]
  recommendedWeeks?: number
  label: string
  error?: boolean
  onWeeksChange: (weeks: number) => void
}

export function StepTrainingWeeks({
  selectedWeeks,
  availableOptions,
  recommendedWeeks,
  label,
  error = false,
  onWeeksChange,
}: StepTrainingWeeksProps) {
  return (
    <div className="space-y-4">
      <label className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-6 block">
        {label}
      </label>
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: `repeat(${availableOptions.length}, minmax(0, 1fr))` }}
      >
        {availableOptions.map((weeks) => {
          const isSelected = selectedWeeks === weeks
          const isRecommended = recommendedWeeks === weeks

          return (
            <RadioButton
              key={weeks}
              checked={isSelected}
              onChange={() => onWeeksChange(weeks)}
              error={error && !isSelected}
            >
              <div className="flex flex-col items-start justify-center w-full min-h-[60px]">
                <span className="text-sm font-semibold">{weeks} weken</span>
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
      {error && (
        <div className="flex items-start gap-2 mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">
            Selecteer het aantal weken om door te gaan.
          </p>
        </div>
      )}
    </div>
  )
}
