"use client"

import { AlertCircle } from "lucide-react"
import { RadioButton } from "@/components/ui/radio-button"
import type { Goal } from "@/lib/types/schedule"
import { calculatePrice, formatPrice } from "@/lib/utils/pricing"
import { useLanguage } from "@/components/language-provider"
import { translations } from "@/lib/i18n"

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
  error = false,
  onWeeksChange,
}: StepTrainingWeeksProps) {
  const { locale: currentLocale } = useLanguage()
  const toolTranslations = translations[currentLocale].tool
  const weeksLabel = toolTranslations.weeks
  const recommendedLabel = toolTranslations.recommended
  const untilLabel = toolTranslations.until
  const errorMessage = toolTranslations.checkout.errorWeeks
  const weeksColsClass =
    availableOptions.length >= 5
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
      : availableOptions.length === 4
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

  return (
    <div className="space-y-3 sm:space-y-4">
      <label className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-4 sm:mb-6 block">
        {label}
      </label>
      <div className={`grid gap-2 sm:gap-3 ${weeksColsClass}`}>
        {availableOptions.map((weeks) => {
          const isSelected = selectedWeeks === weeks
          const isRecommended = recommendedWeeks === weeks
          const endDate = startDate ? calculateEndDate(startDate, weeks) : null
          const endDateFormatted = endDate
            ? new Date(endDate).toLocaleDateString(
                currentLocale === "nl" ? "nl-NL" : currentLocale === "de" ? "de-DE" : "en-US",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                },
              )
            : null
          const price = calculatePrice(goal, weeks)
          const formattedPrice = price
            ? formatPrice(
                price,
                currentLocale === "nl" ? "nl-NL" : currentLocale === "de" ? "de-DE" : "en-US",
              )
            : null

          return (
            <RadioButton
              key={weeks}
              checked={isSelected}
              onChange={() => onWeeksChange(weeks)}
              error={error && !isSelected}
            >
              <div className="flex flex-col items-start justify-center w-full min-h-[50px] sm:min-h-[55px] md:min-h-[60px]">
                <div className="flex items-center justify-between gap-2 sm:gap-3 w-full">
                  <span className="text-xs sm:text-xs md:text-sm font-semibold">
                    {weeks} {weeksLabel}
                  </span>
                  {formattedPrice && (
                    <span
                      className={`text-[10px] sm:text-xs font-bold ${
                        isSelected ? "text-orange-400" : "text-zinc-500 dark:text-zinc-500"
                      }`}
                    >
                      {formattedPrice}
                    </span>
                  )}
                </div>
                {isRecommended && (
                  <span
                    className={`text-[9px] sm:text-[10px] font-medium uppercase tracking-wide mt-0.5 sm:mt-1 ${
                      isSelected ? "text-orange-400" : "text-zinc-400 dark:text-zinc-600"
                    }`}
                  >
                    {recommendedLabel}
                  </span>
                )}
                {endDateFormatted && (
                  <span
                    className={`text-[8px] sm:text-[9px] font-medium mt-0.5 sm:mt-1 ${
                      isSelected
                        ? "text-zinc-300 dark:text-zinc-400"
                        : "text-zinc-400 dark:text-zinc-600"
                    }`}
                  >
                    {untilLabel} {endDateFormatted}
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
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">{errorMessage}</p>
        </div>
      )}
    </div>
  )
}
