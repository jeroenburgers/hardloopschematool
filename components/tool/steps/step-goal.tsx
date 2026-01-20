import type { Goal } from "@/lib/types/schedule"
import { RadioButton } from "@/components/ui/radio-button"
import { formatPrice, getMinPriceForGoal } from "@/lib/utils/pricing"

/**
 * Step Goal component
 * SOLAR: Autonomous Component - handles goal selection independently
 */
interface StepGoalProps {
  selectedGoal: Goal | ""
  availableGoals: Goal[]
  goalPercentages: Record<string, number>
  socialProofText: string
  fromLabel: string
  locale?: string
  onGoalChange: (goal: Goal) => void
  error?: boolean
}

export function StepGoal({
  selectedGoal,
  availableGoals,
  goalPercentages,
  socialProofText,
  fromLabel,
  locale = "nl-NL",
  onGoalChange,
  error = false,
}: StepGoalProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
      {availableGoals.map((goal) => {
        const percentage = (goalPercentages as Record<string, number>)[goal] || 0
        const isSelected = selectedGoal === goal
        const minPrice = getMinPriceForGoal(goal)
        const minPriceLabel = minPrice ? `${fromLabel} ${formatPrice(minPrice, locale)}` : null

        return (
          <RadioButton
            key={goal}
            checked={isSelected}
            onChange={() => onGoalChange(goal)}
            error={error && !isSelected}
          >
            <div className="flex flex-col items-start justify-center w-full min-h-[50px] sm:min-h-[60px] md:min-h-[65px]">
              <span className="text-xs sm:text-sm font-semibold leading-tight">{goal}</span>
              {minPriceLabel && (
                <span
                  className={`text-[9px] sm:text-[10px] font-medium uppercase tracking-wide mt-0.5 sm:mt-1 ${
                    isSelected
                      ? "text-zinc-300 dark:text-zinc-400"
                      : "text-zinc-400 dark:text-zinc-600"
                  }`}
                >
                  {minPriceLabel}
                </span>
              )}
              {isSelected && (
                <span className="text-[9px] sm:text-[10px] font-medium text-orange-400 uppercase tracking-wide mt-0.5 sm:mt-1">
                  {percentage}% {socialProofText}
                </span>
              )}
            </div>
          </RadioButton>
        )
      })}
    </div>
  )
}
