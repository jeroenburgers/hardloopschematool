import { AlertCircle } from "lucide-react"
import { RadioButton } from "@/components/ui/radio-button"
import type { Goal } from "@/lib/types/schedule"
import { calculatePrice, formatPrice } from "@/lib/utils/pricing"

/**
 * Step Training Weeks component
 * SOLAR: Autonomous Component - handles training weeks selection independently
 */
interface StepTrainingWeeksProps {
  selectedWeeks: number
  availableOptions: number[]
  recommendedWeeks?: number
  label: string
  goal: Goal | ""
  startDate?: string
  locale?: string
  error?: boolean
  onWeeksChange: (weeks: number) => void
}

/**
 * Calculate end date (Sunday) based on start date (Monday) and number of weeks
 * Weeks are inclusive of the start week, so end date = start + (weeks * 7) - 1
 */
function calculateEndDate(startDate: string, weeks: number): string | null {
  if (!startDate) return null
  try {
    const start = new Date(startDate)
    // Add weeks (weeks * 7 days) and subtract 1 day to get Sunday of the last week
    const end = new Date(start)
    end.setDate(start.getDate() + weeks * 7 - 1)
    return end.toISOString().split("T")[0]
  } catch {
    return null
  }
}

export function StepTrainingWeeks({
  selectedWeeks,
  availableOptions,
  recommendedWeeks,
  label,
  goal,
  startDate,
  locale = "nl",
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
          const endDate = startDate ? calculateEndDate(startDate, weeks) : null
          const endDateFormatted = endDate
            ? new Date(endDate).toLocaleDateString(locale, {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : null
          const price = calculatePrice(goal, weeks)
          const formattedPrice = price
            ? formatPrice(price, locale === "nl" ? "nl-NL" : locale === "de" ? "de-DE" : "en-US")
            : null

          return (
            <RadioButton
              key={weeks}
              checked={isSelected}
              onChange={() => onWeeksChange(weeks)}
              error={error && !isSelected}
            >
              <div className="flex flex-col items-start justify-center w-full min-h-[60px]">
                <div className="flex items-center justify-between gap-3 w-full">
                  <span className="text-sm font-semibold">{weeks} weken</span>
                  {formattedPrice && (
                    <span
                      className={`text-xs font-bold ${
                        isSelected ? "text-orange-400" : "text-zinc-500 dark:text-zinc-500"
                      }`}
                    >
                      {formattedPrice}
                    </span>
                  )}
                </div>
                {isRecommended && (
                  <span
                    className={`text-[10px] font-medium uppercase tracking-wide mt-1 ${
                      isSelected ? "text-orange-400" : "text-zinc-400 dark:text-zinc-600"
                    }`}
                  >
                    Aanbevolen
                  </span>
                )}
                {endDateFormatted && (
                  <span
                    className={`text-[9px] font-medium mt-1 ${
                      isSelected
                        ? "text-zinc-300 dark:text-zinc-400"
                        : "text-zinc-400 dark:text-zinc-600"
                    }`}
                  >
                    Tot {endDateFormatted}
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
