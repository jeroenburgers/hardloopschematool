import { RadioButton } from "@/components/ui/radio-button"

/**
 * Step Health component
 * SOLAR: Autonomous Component - handles health status selection independently
 */
interface StepHealthProps {
  selectedHealth: string
  availableOptions: string[]
  onHealthChange: (health: string) => void
}

export function StepHealth({ selectedHealth, availableOptions, onHealthChange }: StepHealthProps) {
  const colsClass =
    availableOptions.length >= 5
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
      : availableOptions.length === 4
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"

  return (
    <div className={`grid gap-2 sm:gap-3 ${colsClass}`}>
      {availableOptions.map((option) => (
        <RadioButton
          key={option}
          checked={selectedHealth === option}
          onChange={() => onHealthChange(option)}
        >
          <div className="flex items-center justify-start w-full min-h-[50px] sm:min-h-[55px] md:min-h-[60px]">
            <span className="text-xs sm:text-xs md:text-sm font-semibold text-left break-words">
              {option}
            </span>
          </div>
        </RadioButton>
      ))}
    </div>
  )
}
