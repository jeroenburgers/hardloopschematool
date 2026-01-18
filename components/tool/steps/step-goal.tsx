import type { Goal } from "@/lib/types/schedule"
import { RadioButton } from "@/components/ui/radio-button"

/**
 * Step Goal component
 * SOLAR: Autonomous Component - handles goal selection independently
 */
interface StepGoalProps {
  selectedGoal: Goal | ""
  availableGoals: Goal[]
  goalPercentages: Record<string, number>
  socialProofText: string
  onGoalChange: (goal: Goal) => void
  error?: boolean
}

export function StepGoal({
  selectedGoal,
  availableGoals,
  goalPercentages,
  socialProofText,
  onGoalChange,
  error = false,
}: StepGoalProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {availableGoals.map((goal) => {
        const percentage = (goalPercentages as Record<string, number>)[goal] || 0
        const isSelected = selectedGoal === goal

        return (
          <RadioButton
            key={goal}
            checked={isSelected}
            onChange={() => onGoalChange(goal)}
            error={error && !isSelected}
          >
            <div className="flex flex-col items-start justify-center w-full min-h-[60px]">
              <span className="text-sm font-semibold">{goal}</span>
              {isSelected && (
                <span className="text-[10px] font-medium text-orange-400 uppercase tracking-wide mt-1">
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
