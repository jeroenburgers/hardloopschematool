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
      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
      : availableOptions.length === 4
        ? "grid-cols-2 sm:grid-cols-4"
        : "grid-cols-2 sm:grid-cols-3"

  return (
    <div className={`grid gap-2 sm:gap-3 ${colsClass}`}>
      {availableOptions.map((option) => (
        <RadioButton
          key={option}
          checked={selectedHealth === option}
          onChange={() => onHealthChange(option)}
        >
          <span className="text-xs sm:text-sm font-semibold">{option}</span>
        </RadioButton>
      ))}
    </div>
  )
}
